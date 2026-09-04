import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  PlusIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  PencilIcon,
  DuplicateIcon,
  TrashIcon,
  PinIcon,
} from "../icons";
import { Reactable } from "../Reactable";
import { AgentOrb } from "./AgentOrb";
import { AgentOnboarding, type NewAgent } from "./AgentOnboarding";
import { AgentPicker } from "./AgentPicker";
import { ACCENTS, FIRST_QUESTIONS, GREETING } from "./onboardingData";
import { lastAgentLine, type Agent, type AgentTurn } from "./agentsData";
import { type ConnectorId } from "./connectors";
import { useAgents } from "./store";

/**
 * Agents — a second product area, not a mode inside the chat.
 *
 * The separation is the whole point. A chat is a conversation you are having; an
 * agent is a colleague who was working while you were not here. That difference
 * has to be visible before anything is clicked: a roster on the left with a state
 * per agent, a thread on the right that already contains work you did not watch
 * happen, and no way to confuse either with the chat you came from.
 *
 * FIRST DRAFT — structure and behaviour, deliberately unpolished. What is being
 * decided here is what an agent *is* on screen, not what it finally looks like.
 */

/**
 * A row says who the agent is and what it is doing about it. The second line
 * is the last thing the agent actually said in its thread — the same "last
 * message" a messaging app's list shows under a contact's name, not a caption
 * written about it.
 */
const AgentRow = ({
  agent,
  active,
  pinned,
  onSelect,
  onContextMenu,
}: {
  agent: Agent;
  active: boolean;
  pinned: boolean;
  onSelect: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
    onContextMenu={onContextMenu}
    className={`ag-row${active ? " ag-row--on" : ""}`}
  >
    <span className="ag-row-orb" style={agent.accent ? { ["--agent-accent"]: agent.accent } as React.CSSProperties : undefined}>
      <AgentOrb status={agent.status} size={8} accent={agent.accent} still />
    </span>
    <span className="ag-row-body">
      <span className="ag-row-top">
        <span className="ag-row-name">{agent.name}</span>
        {/* Pinned is read here, not as a badge elsewhere — the row's own
            position already says so; this is just why. */}
        {pinned && <span className="ag-row-pin" aria-label="Pinned" title="Pinned" />}
        <span className="ag-row-time">{agent.lastActive}</span>
      </span>
      <span className="ag-row-mood">{lastAgentLine(agent)}</span>
    </span>
  </button>
);

/** The floating menu a right-click opens — the same four things any list of
 *  named things offers, none invented for agents specifically. */
function AgentRowMenu({
  x,
  y,
  pinned,
  onEdit,
  onDuplicate,
  onDelete,
  onPin,
  onClose,
}: {
  x: number;
  y: number;
  pinned: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onPin: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="ag-ctx" style={{ left: x, top: y }} role="menu">
      <button type="button" role="menuitem" onClick={onEdit}>
        <PencilIcon className="size-3.5" /> Edit profile
      </button>
      <button type="button" role="menuitem" onClick={onDuplicate}>
        <DuplicateIcon className="size-3.5" /> Duplicate
      </button>
      <div className="ag-ctx-sep" />
      <button type="button" role="menuitem" className="ag-ctx-danger" onClick={onDelete}>
        <TrashIcon className="size-3.5" /> Delete
      </button>
      <div className="ag-ctx-sep" />
      <button type="button" role="menuitem" onClick={onPin}>
        <PinIcon className="size-3.5" /> {pinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
}

/** The one turn that stops and asks. It is the only thing in the thread with a
 *  button, because it is the only thing that cannot proceed without you. */
function ApprovalBlock({ text, detail, confirm }: { text: string; detail: string; confirm: string }) {
  const [decided, setDecided] = useState<"approved" | "held" | null>(null);

  return (
    <div className={`ag-bubble ag-approval${decided ? " ag-approval--done" : ""}`}>
      <p className="ag-approval-title">{text}</p>
      <p className="ag-approval-detail">{detail}</p>

      {decided ? (
        <p className="ag-approval-state">
          {decided === "approved" ? "Approved — sending now." : "Held. Nothing was sent."}
        </p>
      ) : (
        <div className="ag-approval-actions">
          <button type="button" onClick={() => setDecided("approved")} className="ag-btn ag-btn--go">
            {confirm}
          </button>
          <button type="button" onClick={() => setDecided("held")} className="ag-btn">
            Not yet
          </button>
        </div>
      )}
    </div>
  );
}

/** The end of the first conversation. Three facts, no buttons: the job is already
 *  set, and a confirmation that asked for another click would undo the feeling of
 *  having simply told someone what you wanted. */
function SummaryBlock({ name, cadence, apps }: { name: string; cadence: string; apps: string }) {
  return (
    <div className="ag-bubble ag-summary">
      <p className="ag-summary-lead">You're all set.</p>
      <p className="ag-summary-name">{name}</p>
      <p className="ag-summary-line">{cadence}</p>
      <p className="ag-summary-line">Connected to {apps}</p>
    </div>
  );
}

function Turn({ turn, onReply }: { turn: AgentTurn; onReply: (quote: string) => void }) {
  // Activity notices are not something said to you — they don't render here,
  // the way a system notice in a messenger doesn't sit in the message column.
  if (turn.kind === "activity") return null;
  if (turn.kind === "approval") return <ApprovalBlock {...turn} />;
  if (turn.kind === "summary") return <SummaryBlock {...turn} />;

  const mine = turn.kind === "you";
  return (
    <Reactable
      align={mine ? "right" : "left"}
      reaction={turn.kind === "you" ? turn.reaction : undefined}
      onReply={() => onReply(turn.text)}
    >
      <div className={`ag-msg-col${mine ? " ag-msg-col--mine" : ""}`}>
        <div className={`ag-bubble ag-msg${mine ? " ag-msg--mine" : ""}`}>{turn.text}</div>
        {turn.at && <span className="ag-msg-time">{turn.at}</span>}
      </div>
    </Reactable>
  );
}

export function AgentsWorkspace({
  /** which agent to open on — set when one was just created from a conversation */
  focusId,
}: {
  focusId?: string;
} = {}) {
  /**
   * The roster is state so setup has somewhere to put a new agent. It starts
   * seeded, because the prototype's signed-in user is meant to have been using
   * this for a while — `?agents=empty` starts it bare so the first-run intro and
   * the empty state can be reviewed without deleting anything.
   */
  const { roster, addAgent, updateAgent, removeAgent } = useAgents();

  /**
   * The onboarding runs once ever. After that, clicking Agents opens the workspace
   * directly — which is the whole point of it being onboarding rather than a
   * screen. `?agents=empty` clears the flag so it can be reviewed again.
   */
  const [onboarded, setOnboarded] = useState(() => {
    if (typeof window === "undefined") return true;
    if (new URLSearchParams(window.location.search).get("agents") === "empty") return false;
    try { return window.localStorage.getItem("starchild.agents.onboarded") === "1"; } catch { return false; }
  });

  /** open on its own when there is nothing yet; opened by hand from + New agent */
  const [making, setMaking] = useState(false);
  /**
   * "+" opens a search field, not a form. Someone reaching for it may want an
   * agent that already exists — and until they have typed, neither they nor we
   * know which. See AgentPicker.
   */
  const [picking, setPicking] = useState(false);
  const startPicking = () => setPicking(true);
  const [activeId, setActiveId] = useState<string>(focusId ?? "");
  /** rows kept at the top of the roster, most recently pinned first — a display
   *  order, not a fact about the agent, so it lives here rather than on `Agent`. */
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  /** the row a right-click opened, and where */
  const [rowMenu, setRowMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  /** everything true about the agent that is not part of the conversation */
  const [drawer, setDrawer] = useState(false);
  /** deletion needs an explicit second action; it is the only irreversible control here */
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const agent = roster.find((a) => a.id === activeId) ?? roster[0];
  useEffect(() => { setConfirmingDelete(false); }, [agent?.id]);
  // Arriving from a chat that just made one: open on it. Being dropped on someone
  // else's thread straight after creating an agent reads as the creation failing.
  useEffect(() => { if (focusId) setActiveId(focusId); }, [focusId]);
  /* Onboarding is for someone who has never done this, and someone with agents
     plainly has. The stored flag only decides it for an empty roster — without the
     second half, clearing site data would show the intro to an established account. */
  const setup = making || (!onboarded && roster.length === 0);
  /** how far through the three opening questions the new agent has got */
  const [asked, setAsked] = useState(0);

  const deleteAgent = () => {
    if (!agent) return;
    const next = roster.find((candidate) => candidate.id !== agent.id);
    removeAgent(agent.id);
    setActiveId(next?.id ?? "");
    setDrawer(false);
    setConfirmingDelete(false);
    setReplyTo(null);
    setDraft("");
  };

  /** A row's own copy — same fields, a fresh id, a name that says so. Starts
   *  paused: a duplicate is a template someone meant to change before it runs
   *  loose doing the same job as the one it was copied from. */
  const duplicateAgent = (source: Agent) => {
    const copy: Agent = {
      ...source,
      id: `a${Date.now()}`,
      name: `${source.name} (copy)`,
      status: "paused",
      mood: "Paused — just duplicated.",
      thread: [{ kind: "agent", text: `I'm a copy of ${source.name}, paused until you tell me what to change.` }],
    };
    addAgent(copy);
    setActiveId(copy.id);
  };

  const togglePin = (id: string) =>
    setPinnedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));

  const orderedRoster = pinnedIds.length
    ? [...roster].sort((a, b) => Number(pinnedIds.includes(b.id)) - Number(pinnedIds.includes(a.id)))
    : roster;

  /**
   * Every agent starts the same way: named, empty-handed, and talking. A colour
   * and a set of tools are not things anyone can answer well before the job has
   * been described, which is why neither is asked for here — both are one click
   * away in the agent's own panel, once there is an agent to look at.
   */
  const birth = (name: string, tools: ConnectorId[] = [], accent: string = ACCENTS.ember.hex) => {
    const agent: Agent = {
      id: `a${Date.now()}`,
      name,
      role: "Working out its job with you",
      status: "working",
      mood: "Just started. Getting its bearings.",
      resting: `${name} is waiting on you.`,
      preview: "Say what you want it on",
      lastActive: "just now",
      accent,
      onboarding: true,
      tools,
      thread: GREETING("Bárbara").map((text) => ({ kind: "agent", text }) as const),
    };
    addAgent(agent);
    setActiveId(agent.id);
    setAsked(0);
    setDrawer(false);
    setOnboarded(true);
    try { window.localStorage.setItem("starchild.agents.onboarded", "1"); } catch { /* private mode */ }
  };

  const created = (made: NewAgent) => {
    birth(made.name, made.tools, ACCENTS[made.accent].hex);
    setMaking(false);
  };

  /**
   * The other way an agent starts existing, as against `birth`, which walks
   * through a scripted three-question conversation. This one exists the
   * moment it's visible: a blank thread and a name, added to the roster
   * straight away rather than held as a draft — the drawer beside it is
   * already the same form that edits any agent, so there is no separate
   * "finish creating" step, only a blank agent you start filling in.
   */
  const startNewAgent = (name?: string) => {
    const trimmed = name?.trim() || "New agent";
    const agent: Agent = {
      id: `a${Date.now()}`,
      name: trimmed,
      role: "",
      status: "working",
      mood: "Just created.",
      resting: `${trimmed} is waiting on you.`,
      preview: "Say what you want it on",
      lastActive: "just now",
      accent: ACCENTS.ember.hex,
      tools: [],
      thread: [],
    };
    addAgent(agent);
    setActiveId(agent.id);
    setDrawer(false);
  };

  /**
   * The composer. For a new agent this drives the opening conversation — three
   * questions, one at a time, then a summary — which is why the job is never asked
   * for in a form: the last screen of setup is a colleague saying hello.
   */
  const send = () => {
    const text = draft.trim();
    if (!text || !agent) return;
    setDraft("");

    const said: AgentTurn = { kind: "you", text };
    updateAgent(agent.id, (a) => ({ ...a, thread: [...a.thread, said] }));

    if (!agent.onboarding) return;

    const step = asked;
    setAsked(step + 1);

    window.setTimeout(() => {
      updateAgent(agent.id, (a) => {
          const next: AgentTurn =
            step < FIRST_QUESTIONS.length
              ? { kind: "agent", text: FIRST_QUESTIONS[step] }
              : {
                  kind: "summary",
                  name: a.name,
                  cadence: "Checks every Monday",
                  apps: "Notion, Google Calendar and Slack",
                };
          const done = step >= FIRST_QUESTIONS.length;
          return {
            ...a,
            onboarding: !done,
            role: done ? "Keeps an eye on what you asked for" : a.role,
            mood: done ? "Ready. Waiting for Monday." : a.mood,
            status: done ? "scheduled" : a.status,
            cadence: done ? "Every Monday at 9:00" : a.cadence,
            thread: [...a.thread, next],
          };
      });
    }, 900);
  };

  /**
   * One agent handing work to another, played once shortly after the workspace
   * opens. A signal travels down the gutter the orbs sit in, from one row to the
   * other, and the receiver takes a beat when it lands. It runs once and never
   * again: a loop would turn the one thing a roster can show — that they talk to
   * each other — into wallpaper.
   */
  return (
    <div className="ag-workspace">
      {/* the roster — who is working for you, and which of them needs something */}
      <aside className="ag-list">
        <div className="ag-list-head">
          <p className="ag-list-title">Agents</p>
          <button type="button" className="ag-new" aria-label="Find or create an agent" onClick={startPicking}>
            <PlusIcon className="size-4" />
          </button>
        </div>

        <div className="ag-rows">
          {/* the signal itself — one dot, in the gutter the orbs already occupy */}
          {roster.length === 0 && (
            <div className="ag-empty">
              <p className="ag-empty-title">No agents yet.</p>
              <p className="ag-empty-body">This is where they'll live, each with its own thread.</p>
            </div>
          )}

          {orderedRoster.map((a) => (
            <AgentRow
              key={a.id}
              agent={a}
              active={a.id === agent.id}
              pinned={pinnedIds.includes(a.id)}
              onSelect={() => setActiveId(a.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                setRowMenu({ id: a.id, x: e.clientX, y: e.clientY });
              }}
            />
          ))}

          {/* Sits in whatever room the roster hasn't filled, pushed to the
              bottom by the column's own flex rather than pinned there — a
              short roster gets a caption under it with breathing room; a long
              one just scrolls past this before it ever comes into view. Said
              once, and only here, because this is the one screen where
              "dedicated" actually means something: it is not true of a Job,
              and saying so next to the roster that is the reason it is true
              is the cheapest place to make the distinction land. */}
          {roster.length > 0 && (
            <div className="ag-list-note">
              <p className="ag-list-note-title">Dedicated agents live here.</p>
              <p className="ag-list-note-body">Use them when a task needs its own rules, tools, and history.</p>
            </div>
          )}
        </div>
      </aside>

      {rowMenu && (() => {
        const row = roster.find((a) => a.id === rowMenu.id);
        if (!row) return null;
        return (
          <AgentRowMenu
            x={rowMenu.x}
            y={rowMenu.y}
            pinned={pinnedIds.includes(row.id)}
            onEdit={() => { setActiveId(row.id); setDrawer(true); setRowMenu(null); }}
            onDuplicate={() => { duplicateAgent(row); setRowMenu(null); }}
            onDelete={() => {
              const next = roster.find((candidate) => candidate.id !== row.id);
              removeAgent(row.id);
              if (activeId === row.id) setActiveId(next?.id ?? "");
              setPinnedIds((prev) => prev.filter((id) => id !== row.id));
              setRowMenu(null);
            }}
            onPin={() => { togglePin(row.id); setRowMenu(null); }}
            onClose={() => setRowMenu(null)}
          />
        );
      })()}

      {/* Same slot as the thread, for the same reason setup uses it: the roster
          stays put, so whichever way this ends — an existing agent or a new one —
          the answer lands where the person was already looking. */}
      {picking && !setup && (
        <AgentPicker
          roster={roster}
          onPick={(id) => { setActiveId(id); setPicking(false); }}
          // A real, blank agent, added to the roster immediately rather than
          // held as a draft — filling in what it does happens the same way
          // editing any agent does, from the door its name already is.
          onCreate={(name) => {
            startNewAgent(name);
            setPicking(false);
          }}
          onClose={() => setPicking(false)}
        />
      )}

      {/* Setup replaces the thread and leaves the roster standing: the layout gets
          learned before there is anything in it, so the first agent appears
          somewhere already familiar. */}
      {setup && (
        <AgentOnboarding
          // Same test as `setup`, and for the same reason: the concept intro is for
          // someone who has never had an agent, and a roster is proof they have.
          firstTime={!onboarded && roster.length === 0}
          onCancel={() => { setMaking(false); setOnboarded(true); }}
          onDone={created}
        />
      )}

      {/* the agent itself: who it is, what it can touch, and everything it has done */}
      {!setup && !picking && agent && (
      <section className="ag-thread">
        {/* The schedule, the state and the tools are facts about the agent, not
            about the conversation — sat up here permanently they were a panel you
            had to read past every time to reach the thread. The header keeps only
            the thing that answers "who am I talking to"; the rest is a click away,
            behind the name. */}
        <header className="ag-head">
          <button
            type="button"
            className={`ag-id${drawer ? " ag-id--open" : ""}`}
            onClick={() => setDrawer((v) => !v)}
            aria-expanded={drawer}
          >
            {/* halo only here: the selected agent is the one that gets to feel awake */}
            <AgentOrb status={agent.status} size={11} halo accent={agent.accent} still />
            <span className="ag-head-name">{agent.name}</span>
            <ChevronDownIcon className="ag-id-chev size-3.5" />
          </button>
        </header>

        <motion.div
          key={agent.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="ag-turns"
        >
          {agent.thread.map((turn, i) => (
            <Turn key={i} turn={turn} onReply={setReplyTo} />
          ))}

          {/* An agent that has come back with something has asked a question, and
              a question with no answers under it is a dead end. These are the same
              three the chat offers on the same moment — deliberately, because a
              person who paused it from the conversation yesterday should not have
              to learn a second set of words for it here.

              Only while it is waiting. A permanent row of controls under every
              thread would be a toolbar, and a toolbar is what this page is trying
              not to be. */}
          {agent.status === "waiting" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="ag-answers"
            >
              <button
                type="button"
                className="ag-answer"
                onClick={() =>
                  updateAgent(agent.id, (a) => ({ ...a, status: "working", mood: "Still watching." }))
                }
              >
                Keep watching
              </button>
              <button
                type="button"
                className="ag-answer"
                onClick={() => setDrawer(true)}
              >
                Change threshold
              </button>
              <button
                type="button"
                className="ag-answer ag-answer--quiet"
                onClick={() =>
                  updateAgent(agent.id, (a) => ({ ...a, status: "paused", mood: "Paused by you." }))
                }
              >
                Pause
              </button>
            </motion.div>
          )}

        </motion.div>

        <div className="ag-composer">
          {replyTo && (
            <div className="ag-quote">
              <p>{replyTo}</p>
              <button type="button" onClick={() => setReplyTo(null)} aria-label="Cancel reply">
                ✕
              </button>
            </div>
          )}
          <div className="ag-composer-row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder={`Message ${agent.name}…`}
              className="ag-input"
            />
            <button type="button" className="ag-send" aria-label="Send" onClick={send}>
              <ArrowUpIcon className="size-4" />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* A column, not an overlay. It is reference you keep open while reading the
          thread — and enabling a tool from here should visibly change the chips,
          which it cannot do if the panel covering them has to be dismissed first. */}
      <AnimatePresence>
        {!setup && !picking && agent && drawer && (
          <motion.aside
            key="drawer"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 316, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="ag-drawer"
          >
            <div className="ag-drawer-in">
              <div className="ag-drawer-top">
                <p className="ag-drawer-kicker">Agent</p>
                <button
                  type="button"
                  className="ag-drawer-x"
                  onClick={() => { setDrawer(false); setConfirmingDelete(false); }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="ag-drawer-orb">
                <AgentOrb status="working" size={34} halo accent={agent.accent} still />
              </div>

              <label className="ag-field">
                <span className="ag-field-label">Name</span>
                <input
                  className="ag-field-in"
                  value={agent.name}
                  onChange={(e) => updateAgent(agent.id, (a) => ({ ...a, name: e.target.value }))}
                />
              </label>

              {/* One field, not two. What it does and the rule it runs under used to
                  be separate, on the theory that they drift apart the moment anyone
                  amends the job from a chat — but a roster description and an
                  operating instruction reading differently is confusing more often
                  than it is informative, so this is now the one thing the agent
                  would say if asked what it's doing. Editing here and saying it in
                  the chat are the same act on the same field. */}
              <label className="ag-field">
                <span className="ag-field-label">Mission</span>
                <textarea
                  className="ag-field-in"
                  rows={3}
                  value={agent.instruction ?? agent.role}
                  onChange={(e) => updateAgent(agent.id, (a) => ({ ...a, instruction: e.target.value }))}
                />
              </label>

              {/* What has to hold before it interrupts you. Read-only here on
                  purpose — a condition is a clause in a running sentence ("breakout,
                  and volume confirms, and funding is acceptable"), and editing one
                  clause out of a sentence in a text box is worse than just saying
                  the change: "only alert me if funding is acceptable too" is
                  already the whole interface for this. */}
              {(agent.conditions?.length ?? 0) > 0 && (
                <div className="ag-field">
                  <span className="ag-field-label">Alerts when</span>
                  <p className="ag-conditions">{agent.conditions!.join(", and ")}</p>
                </div>
              )}

              <div className="ag-field">
                <span className="ag-field-label">Colour</span>
                {/* The one look decision, made where there is finally something to
                    look at. Status stays carried by form and motion, so a tide-blue
                    agent that needs you is still a ring. */}
                <div className="ag-swatches">
                  {Object.entries(ACCENTS).map(([id, c]) => {
                    const on = agent.accent === c.hex;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-label={c.name}
                        aria-pressed={on}
                        onClick={() => updateAgent(agent.id, (x) => ({ ...x, accent: c.hex }))}
                        className={`ag-swatch${on ? " ag-swatch--on" : ""}`}
                        style={{ ["--pick" as string]: c.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="ag-danger-zone">
                {confirmingDelete ? (
                  <>
                    <p>Delete {agent.name}? This cannot be undone.</p>
                    <div>
                      <button type="button" onClick={() => setConfirmingDelete(false)}>Cancel</button>
                      <button type="button" className="ag-delete-confirm" onClick={deleteAgent}>Delete agent</button>
                    </div>
                  </>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="ag-pause"
                      onClick={() =>
                        updateAgent(agent.id, (a) =>
                          a.status === "paused"
                            ? { ...a, status: "working", mood: "Back on it." }
                            : { ...a, status: "paused", mood: "Paused by you." },
                        )
                      }
                    >
                      {agent.status === "paused" ? "Resume agent" : "Pause agent"}
                    </button>
                    <button type="button" className="ag-delete" onClick={() => setConfirmingDelete(true)}>
                      Delete agent
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style>{`
        .ag-workspace {
          display: flex; flex: 1; min-width: 0; min-height: 0;
          font-family: var(--font-google-sans); color: #fff;
        }

        /* ---------- roster ---------- */

        .ag-list {
          display: flex; flex-direction: column; flex: none; width: 272px;
          border-right: 1px solid rgba(255,255,255,.08);
        }
        .ag-list-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 16px 12px;
        }
        .ag-list-title {
          margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }
        .ag-new {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border: 0; border-radius: 999px; cursor: pointer;
          background: none; color: rgba(255,255,255,.45);
          transition: background-color .15s ease, color .15s ease;
        }
        .ag-new:hover { background: rgba(255,255,255,.07); color: #fff; }

        .ag-rows { flex: 1; overflow-y: auto; padding: 0 8px; display: flex; flex-direction: column; gap: 2px; }

        .ag-row {
          display: flex; align-items: flex-start; gap: 10px; width: 100%;
          padding: 11px 10px; border: 0; border-radius: 10px; cursor: pointer;
          background: none; text-align: left;
          transition: background-color .15s ease;
        }
        .ag-row:hover { background: rgba(255,255,255,.04); }
        .ag-row--on { background: rgba(255,255,255,.07); }
        .ag-row-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
        .ag-row-top { display: flex; align-items: baseline; gap: 8px; }
        .ag-row-name { flex: 1; font-size: 14px; font-weight: 400; color: #fff; }
        .ag-row-time { flex: none; font-size: 11px; color: rgba(255,255,255,.3); }
        .ag-row-mood {
          font-size: 12.5px; line-height: 1.4; color: rgba(255,255,255,.42);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ag-row--on .ag-row-mood { color: rgba(255,255,255,.55); }
        .ag-row-pin {
          flex: none; width: 5px; height: 5px; border-radius: 999px;
          background: var(--color-primary);
        }

        /* The right-click menu — fixed to the cursor, not the row, so it never
           has to guess which edge of the sidebar has room. */
        .ag-ctx {
          position: fixed; z-index: 50; min-width: 172px; padding: 6px;
          border-radius: 12px; border: 1px solid rgba(255,255,255,.1);
          background: #1c1c1e; box-shadow: 0 20px 50px rgba(0,0,0,.55);
          display: flex; flex-direction: column; gap: 1px;
          font-family: var(--font-google-sans);
        }
        .ag-ctx button {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 8px 10px; border: 0; border-radius: 8px; cursor: pointer;
          background: none; text-align: left;
          font-family: inherit; font-size: 13.5px; color: rgba(255,255,255,.85);
        }
        .ag-ctx button:hover { background: rgba(255,255,255,.07); }
        .ag-ctx-danger { color: #ff8a70 !important; }
        .ag-ctx-danger:hover { background: rgba(248,70,0,.12) !important; }
        .ag-ctx-sep { height: 1px; margin: 5px 4px; background: rgba(255,255,255,.08); }

        .ag-empty { padding: 18px 10px 8px; display: flex; flex-direction: column; gap: 7px; }
        .ag-empty-title { margin: 0; font-size: 14px; font-weight: 500; color: rgba(255,255,255,.6); }
        .ag-empty-body { margin: 0; font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.32); }

        /* Same shape as .ag-empty — a title line over a quieter body line —
           but this one shows alongside a roster that already has agents in
           it, so it reads as a footnote about the screen rather than a state
           the screen is in. Pushed to the bottom of whatever room .ag-rows
           has not used by its own flex, not by a fixed position. */
        .ag-list-note { margin-top: auto; padding: 18px 10px 14px; display: flex; flex-direction: column; gap: 6px; }
        .ag-list-note-title { margin: 0; font-size: 13px; font-weight: 500; color: #fff; }
        .ag-list-note-body { margin: 0; font-size: 12px; line-height: 1.5; color: rgba(255,255,255,.24); }

        /* ---------- roster motion ---------- */

        .ag-row-orb { flex: none; margin-top: 5px; }

        /* the signal travelling between two agents, in the gutter the orbs sit in */
        /* the receiving agent takes a beat. One shot, a few percent — any more and
           it reads as an error rather than as being handed something. */

        /* ---------- thread ---------- */

        .ag-thread { display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0; }

        /* The selected agent is awake, and this is the whole of how that is said:
           a soft warmth behind the name, going nowhere. No animation — presence is
           not the same as activity, and only one of the two should move. */
        .ag-head {
          position: relative; isolation: isolate;
          display: flex; align-items: center; gap: 12px; padding: 12px 24px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        /* the name is the door to everything else, so it has to read as pressable
           without becoming a button-shaped thing sat in a header */
        .ag-id {
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          margin-left: -9px; padding: 6px 12px 6px 9px; border: 0; border-radius: 999px;
          background: none; font-family: inherit;
          transition: background-color .16s ease;
        }
        .ag-id:hover, .ag-id--open { background: rgba(255,255,255,.06); }
        .ag-id:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .ag-id-chev { color: rgba(255,255,255,.28); transition: transform .24s ease, color .16s ease; }
        .ag-id:hover .ag-id-chev { color: rgba(255,255,255,.55); }
        .ag-id--open .ag-id-chev { transform: rotate(180deg); color: rgba(255,255,255,.55); }
        .ag-head::before {
          content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: radial-gradient(46% 120% at 8% 50%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 70%);
        }
        .ag-head-name { font-size: 16px; font-weight: 600; color: #fff; }

        /* ---------- drawer ---------- */

        /* Tickers as marks, same treatment as the chat card — no fill, no border —
           but clickable here, since removing one from the page is a control this
           screen owns. */
        .ag-marks { display: flex; flex-wrap: wrap; gap: 6px 12px; }
        .ag-mark {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 600; letter-spacing: .04em;
          color: rgba(255,255,255,.72); transition: color .2s;
        }
        .ag-mark span { font-size: 11px; color: rgba(255,255,255,.3); }
        .ag-mark:hover { color: #fff; }
        .ag-mark:hover span { color: rgba(255,255,255,.6); }

        .ag-conditions { margin: 0; font-size: 13px; line-height: 1.55; color: rgba(255,255,255,.65); }

        .ag-rules { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .ag-rules li {
          position: relative; padding-left: 13px; font-size: 13px; line-height: 1.5;
          color: rgba(255,255,255,.65);
        }
        .ag-rules li::before {
          content: ""; position: absolute; left: 0; top: 7px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(255,255,255,.28);
        }

        .ag-alerts { display: flex; flex-wrap: wrap; gap: 6px; }
        .ag-alert {
          border-radius: 999px; padding: 5px 11px; font-size: 12.5px;
          background: rgba(255,255,255,.06); color: rgba(255,255,255,.6);
          transition: background .2s, color .2s;
        }
        .ag-alert:hover:not(:disabled) { background: rgba(255,255,255,.11); color: #fff; }
        .ag-alert--on { background: rgba(248,70,0,.16); color: #ff7a45; }
        .ag-alert:disabled { opacity: .35; cursor: not-allowed; }
        .ag-alerts-note { margin: 8px 0 0; font-size: 11.5px; line-height: 1.5; color: rgba(255,255,255,.3); }

        /* A control, so it looks like one — but the quietest kind, sitting next to
           a delete that is reversible where delete is not. */
        .ag-pause {
          background: rgba(255,255,255,.06) !important; color: rgba(255,255,255,.7) !important;
          transition: background .2s, color .2s;
        }
        .ag-pause:hover { background: rgba(255,255,255,.12) !important; color: #fff !important; }

        .ag-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.015);
        }
        .ag-drawer-in {
          width: 316px; height: 100%; overflow-y: auto;
          padding: 14px 20px 30px; display: flex; flex-direction: column; gap: 30px;
        }
        .ag-drawer-top { display: flex; align-items: center; justify-content: space-between; }
        .ag-drawer-kicker {
          margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ag-drawer-x {
          border: 0; background: none; cursor: pointer; padding: 2px 4px;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.35);
        }
        .ag-drawer-x:hover { color: #fff; }
        .ag-drawer-orb { display: flex; justify-content: center; padding: 10px 0 4px; }

        .ag-field { display: flex; flex-direction: column; gap: 8px; }
        .ag-field-label, .ag-field-head {
          font-size: 11px; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ag-field-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        /* editable, because the two things someone opens this for are what it is
           called and what it is for */
        .ag-field-in {
          width: 100%; padding: 10px 13px; border-radius: 11px; resize: none;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
          font-family: inherit; font-size: 13.5px; line-height: 1.5; color: #fff;
          transition: border-color .16s ease;
        }
        .ag-field-in:focus { outline: none; border-color: rgba(255,255,255,.32); }

        .ag-swatches { display: flex; flex-wrap: wrap; gap: 8px; }
        .ag-swatch {
          width: 22px; height: 22px; border-radius: 999px; cursor: pointer; padding: 0;
          background: var(--pick); border: 2px solid transparent;
          box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset;
          transition: box-shadow .15s ease;
        }
        .ag-swatch:hover { box-shadow: 0 0 0 2px rgba(255,255,255,.3); }
        .ag-swatch--on { border-color: #fff; }

        .ag-danger-zone {
          padding-top: 18px; border-top: 1px solid rgba(255,255,255,.08);
        }
        .ag-danger-zone > p { margin: 0 0 10px; font-size: 12.5px; line-height: 1.45; color: rgba(255,255,255,.48); }
        .ag-danger-zone > div { display: flex; gap: 8px; }
        .ag-danger-zone button {
          border: 1px solid rgba(255,255,255,.14); border-radius: 999px; background: none; cursor: pointer;
          padding: 7px 11px; font-family: inherit; font-size: 12.5px; color: rgba(255,255,255,.68);
        }
        .ag-delete { border-color: rgba(255,111,94,.38) !important; color: #ff9a8c !important; }
        .ag-delete:hover { border-color: rgba(255,111,94,.75) !important; background: rgba(255,81,59,.1) !important; color: #ffd1ca !important; }
        .ag-delete-confirm { border-color: #e24c3a !important; background: #e24c3a !important; color: #fff !important; }
        .ag-delete-confirm:hover { background: #f35a47 !important; }

        .ag-state {
          margin: 0; display: flex; align-items: center; gap: 8px;
          font-size: 13.5px; color: rgba(255,255,255,.6);
        }
        .ag-state i {
          width: 6px; height: 6px; border-radius: 999px; flex: none;
          background: rgba(255,255,255,.3);
        }
        .ag-state--working i, .ag-state--scheduled i { background: var(--color-primary); }
        /* waiting is a ring here too — the one state that means it is on you */
        .ag-state--waiting { color: var(--color-primary); }
        .ag-state--waiting i { background: none; box-shadow: 0 0 0 1.5px var(--color-primary) inset; }
        .ag-cadence {
          margin: 0; display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: rgba(255,255,255,.45);
        }
        /* One dot going slowly round, at the size where you notice it only if you
           look. It is the difference between a schedule that exists and one that
           is running. */
        .ag-tick { position: relative; width: 10px; height: 10px; flex: none; }
        .ag-tick i {
          position: absolute; top: 50%; left: 50%; width: 3px; height: 3px;
          margin: -1.5px 0 0 -1.5px; border-radius: 999px;
          background: rgba(248,70,0,.75);
          transform-origin: 1.5px 1.5px;
          animation: ag-orbit 5.5s linear infinite;
        }
        @keyframes ag-orbit {
          from { transform: rotate(0deg) translateX(3.5px); }
          to { transform: rotate(360deg) translateX(3.5px); }
        }

        /* what is going on when there is nothing to answer */
        /* Aligned with the agent's own words above them, not centred and not
           right-aligned: they are answers to the thing it just said. */
        .ag-answers { display: flex; flex-wrap: wrap; gap: 7px; padding: 2px 0 4px; }
        .ag-answer {
          border-radius: 999px; padding: 6px 13px; font-size: 12.5px;
          background: rgba(255,255,255,.07); color: rgba(255,255,255,.78);
          transition: background .2s, color .2s;
        }
        .ag-answer:hover { background: rgba(255,255,255,.13); color: #fff; }
        .ag-answer--quiet { background: none; color: rgba(255,255,255,.42); }
        .ag-answer--quiet:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.8); }

        .ag-resting {
          display: flex; align-items: center; gap: 9px; margin: 6px 0 0;
          font-size: 13px; color: rgba(255,255,255,.3);
        }


        .ag-turns {
          flex: 1; overflow-y: auto; padding: 24px;
          display: flex; flex-direction: column; gap: 18px;
        }

        /*
          One shell for everything in the thread.

          The blocks used to be told apart by their container — a rule for work, a
          rule for the receipt, a card for the ask — which quietly said that only
          some of it was the agent talking. All of it is. The agent is the one
          thing on this screen with a voice, so what it did and what it decided
          arrive the same way as what it said, and the difference between them is
          carried by what is inside the bubble.
        */
        .ag-bubble {
          /* hugs its text: the blocks are direct children of a flex column, so without
             this they stretch to the cap and a three-line receipt reads as wide as
             the longest sentence in the thread */
          width: fit-content;
          max-width: 560px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
        }

        .ag-msg { font-size: 14.5px; line-height: 1.55; color: rgba(255,255,255,.9); }
        .ag-msg--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14);
        }

        /* wraps a bubble and its send time, so the time can sit on the same
           side as the bubble it belongs to without widening the row itself */
        .ag-msg-col { display: flex; flex-direction: column; gap: 4px; width: fit-content; align-items: flex-start; }
        .ag-msg-col--mine { align-items: flex-end; }
        .ag-msg-time { font-size: 11px; padding: 0 4px; color: rgba(255,255,255,.32); }

        /* Work, not talk — a system notice, not a turn from a speaker, so it reads
           the way a messenger's own "you changed the group name" does: centred,
           small, out of the left/right column the conversation itself sits in. */
        .ag-activity {
          align-self: center; max-width: 420px; margin: 4px 0;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          text-align: center;
        }
        .ag-activity-when {
          margin: 0; font-size: 10.5px; letter-spacing: .08em;
          text-transform: uppercase; color: rgba(255,255,255,.26);
        }
        .ag-activity-line {
          margin: 0; padding: 7px 14px; border-radius: 999px;
          background: rgba(255,255,255,.06); color: rgba(255,255,255,.55);
          font-size: 12.5px; line-height: 1.5;
        }

        /* A receipt, so no button — the job is already set, and a confirmation
           asking for one more click would undo the feeling of having simply told
           someone what you wanted. */
        .ag-summary {
          display: flex; flex-direction: column; gap: 2px;
          padding-top: 13px; padding-bottom: 15px;
        }
        .ag-summary-lead { margin: 0 0 6px; font-size: 13px; color: var(--color-primary); }
        .ag-summary-name { margin: 0; font-size: 16px; font-weight: 600; }
        .ag-summary-line { margin: 0; font-size: 13.5px; color: rgba(255,255,255,.5); }

        /* The one that keeps a colour of its own: it is the only turn that cannot
           proceed without you, and that is worth being findable in a scrollback. */
        .ag-approval {
          max-width: 520px; padding: 16px 18px 18px;
          border: 1px solid rgba(248,70,0,.35); background: rgba(248,70,0,.07);
        }
        .ag-approval--done { border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.03); }
        .ag-approval-title { margin: 0; font-size: 15px; font-weight: 600; }
        .ag-approval-detail { margin: 6px 0 0; font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,.55); }
        .ag-approval-state { margin: 14px 0 0; font-size: 13px; color: rgba(255,255,255,.5); }
        .ag-approval-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

        .ag-btn {
          padding: 8px 16px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.18); background: none;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.8);
          transition: background-color .15s ease;
        }
        .ag-btn:hover { background: rgba(255,255,255,.07); }
        .ag-btn--go {
          border-color: transparent; background: var(--color-primary); color: #fff; font-weight: 500;
        }
        .ag-btn--go:hover { background: #ff5a1f; }

        /* ---------- composer ---------- */

        .ag-composer { flex: none; padding: 14px 24px 20px; }
        .ag-quote {
          display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
          padding-left: 11px; border-left: 2px solid var(--color-primary);
        }
        .ag-quote p {
          margin: 0; flex: 1; min-width: 0; font-size: 12.5px; color: rgba(255,255,255,.45);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ag-quote button {
          flex: none; border: 0; background: none; cursor: pointer;
          font-size: 12px; color: rgba(255,255,255,.35);
        }
        .ag-quote button:hover { color: #fff; }

        .ag-composer-row {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 8px 8px 18px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          transition: border-color .2s ease;
        }
        .ag-composer-row:focus-within { border-color: rgba(255,255,255,.3); }
        .ag-input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14.5px; color: #fff;
        }
        .ag-input::placeholder { color: rgba(255,255,255,.32); }
        .ag-send {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
          transition: transform .15s ease;
        }
        .ag-send:hover { transform: scale(1.05); }

        @media (prefers-reduced-motion: reduce) {
          .ag-tick i { animation: none; }
          .ag-send:hover { transform: none; }
        }

        /* Below this the roster and the thread stop fitting side by side. The
           roster wins the top of the screen — knowing who needs you matters more
           than reading one thread. */
        @media (max-width: 900px) {
          .ag-workspace { flex-direction: column; }
          .ag-list { width: auto; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.08); }
          .ag-rows { flex-direction: row; overflow-x: auto; padding-bottom: 8px; }
          .ag-row { width: 240px; flex: none; }
        }
      `}</style>
    </div>
  );
}
