import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon, ArrowUpIcon, ChevronDownIcon, SettingsIcon } from "../icons";
import { Reactable } from "../Reactable";
import { AgentOrb } from "./AgentOrb";
import { AgentOnboarding, type NewAgent } from "./AgentOnboarding";
import { AgentPicker } from "./AgentPicker";
import { ACCENTS, FIRST_QUESTIONS, GREETING } from "./onboardingData";
import { AppIcon } from "./AppIcon";
import { HANDOFF, STATUS_LABEL, type Agent, type AgentTurn } from "./agentsData";
import { ConnectorPicker } from "./ConnectorPicker";
import { BY_ID, type ConnectorId } from "./connectors";
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
 * A row says who the agent is and what it is doing about it — not what it last
 * logged. The second line is the shortest true thing it would say about itself,
 * which is where the character lives: "Still reading." is a personality and a
 * status at once, and it needed no adjectives to become one.
 */
const AgentRow = ({
  agent,
  active,
  nudged,
  onSelect,
  innerRef,
}: {
  agent: Agent;
  active: boolean;
  /** just been handed work by another agent */
  nudged: boolean;
  onSelect: () => void;
  innerRef: (el: HTMLButtonElement | null) => void;
}) => (
  <button
    ref={innerRef}
    type="button"
    onClick={onSelect}
    className={`ag-row${active ? " ag-row--on" : ""}${nudged ? " ag-row--nudged" : ""}`}
  >
    <span className="ag-row-orb" style={agent.accent ? { ["--agent-accent"]: agent.accent } as React.CSSProperties : undefined}>
      <AgentOrb status={agent.status} size={8} accent={agent.accent} />
    </span>
    <span className="ag-row-body">
      <span className="ag-row-top">
        <span className="ag-row-name">{agent.name}</span>
        <span className="ag-row-time">{agent.lastActive}</span>
      </span>
      <span className="ag-row-mood">{agent.mood}</span>
    </span>
  </button>
);

/** What the agent did, as the person would describe it — never a tool call log. */
function ActivityBlock({ when, lines }: { when: string; lines: string[] }) {
  return (
    <div className="ag-bubble ag-activity">
      <p className="ag-activity-when">{when}</p>
      <ul>
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
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
  if (turn.kind === "activity") return <ActivityBlock when={turn.when} lines={turn.lines} />;
  if (turn.kind === "approval") return <ApprovalBlock {...turn} />;
  if (turn.kind === "summary") return <SummaryBlock {...turn} />;

  const mine = turn.kind === "you";
  return (
    <Reactable align={mine ? "right" : "left"} onReply={() => onReply(turn.text)}>
      <div className={`ag-bubble ag-msg${mine ? " ag-msg--mine" : ""}`}>{turn.text}</div>
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
  const { roster, addAgent, updateAgent, setAgentTools } = useAgents();

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
  /** the connector sheet, opened from the drawer */
  const [managing, setManaging] = useState(false);
  /** everything true about the agent that is not part of the conversation */
  const [drawer, setDrawer] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const agent = roster.find((a) => a.id === activeId) ?? roster[0];
  // Arriving from a chat that just made one: open on it. Being dropped on someone
  // else's thread straight after creating an agent reads as the creation failing.
  useEffect(() => { if (focusId) setActiveId(focusId); }, [focusId]);
  /* Onboarding is for someone who has never done this, and someone with agents
     plainly has. The stored flag only decides it for an empty roster — without the
     second half, clearing site data would show the intro to an established account. */
  const setup = making || (!onboarded && roster.length === 0);
  /** how far through the three opening questions the new agent has got */
  const [asked, setAsked] = useState(0);

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
  const rowsRef = useRef<HTMLDivElement>(null);
  const rowEls = useRef<Record<string, HTMLButtonElement | null>>({});
  const [signal, setSignal] = useState<{ from: number; to: number } | null>(null);
  const [nudged, setNudged] = useState<string | null>(null);
  const [handedOff, setHandedOff] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || setup || roster.length < 2) return;

    const start = window.setTimeout(() => {
      const host = rowsRef.current;
      const a = rowEls.current[HANDOFF.from];
      const b = rowEls.current[HANDOFF.to];
      if (!host || !a || !b) return;

      const top = host.getBoundingClientRect().top;
      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top - top + 17; // where the orb sits inside a row
      };
      setSignal({ from: centre(a), to: centre(b) });
      setHandedOff(true);
    }, 4200);

    return () => window.clearTimeout(start);
  }, [setup, roster.length]);

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

        <div className="ag-rows" ref={rowsRef}>
          {/* the signal itself — one dot, in the gutter the orbs already occupy */}
          <AnimatePresence>
            {signal && (
              <motion.span
                key="signal"
                className="ag-signal"
                aria-hidden="true"
                initial={{ top: signal.from, opacity: 0, scale: 0.5 }}
                animate={{ top: signal.to, opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1], times: [0, 0.15, 0.75, 1] }}
                onAnimationComplete={() => {
                  setSignal(null);
                  setNudged(HANDOFF.to);
                  window.setTimeout(() => setNudged(null), 900);
                }}
              />
            )}
          </AnimatePresence>

          {roster.length === 0 && (
            <div className="ag-empty">
              <p className="ag-empty-title">No agents yet.</p>
              <p className="ag-empty-body">This is where they'll live, each with its own thread.</p>
            </div>
          )}

          {roster.map((a) => (
            <AgentRow
              key={a.id}
              agent={a}
              active={a.id === agent.id}
              nudged={nudged === a.id}
              innerRef={(el) => { rowEls.current[a.id] = el; }}
              onSelect={() => setActiveId(a.id)}
            />
          ))}
        </div>

        {/* said once, quietly, and only after it has happened */}
        <AnimatePresence>
          {handedOff && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="ag-handoff-note"
            >
              {HANDOFF.says}
            </motion.p>
          )}
        </AnimatePresence>
      </aside>

      {/* Same slot as the thread, for the same reason setup uses it: the roster
          stays put, so whichever way this ends — an existing agent or a new one —
          the answer lands where the person was already looking. */}
      {picking && !setup && (
        <AgentPicker
          roster={roster}
          onPick={(id) => { setActiveId(id); setPicking(false); }}
          // Straight into the thread. The full setup screen exists for someone who
          // has never had an agent and needs the concept; for the second one, the
          // name is the only thing they have decided, and the agent asks the rest.
          onCreate={(name) => { setPicking(false); birth(name?.trim() || "New agent"); }}
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
            <AgentOrb status={agent.status} size={11} halo accent={agent.accent} />
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

          {/* The bottom of a thread is where an agent is most obviously not a chat:
              there is nothing to reply to, and something is still going on. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="ag-resting"
          >
            <AgentOrb status={agent.status} size={6} />
            {agent.resting}
          </motion.p>
        </motion.div>

        {/* In place, over the thread, rather than a page of its own: the question
            being answered is "what may *this* agent reach", and the answer is only
            legible next to the agent it is about. */}
        {managing && (
          <div className="ag-sheet">
            <div className="ag-sheet-head">
              <p className="ag-sheet-title">Tools {agent.name} can use</p>
              <button type="button" className="ag-sheet-close" onClick={() => setManaging(false)}>
                Done
              </button>
            </div>
            <ConnectorPicker
              enabled={agent.tools}
              onToggle={(next) => setAgentTools(agent.id, next)}
            />
          </div>
        )}

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
                <button type="button" className="ag-drawer-x" onClick={() => setDrawer(false)} aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="ag-drawer-orb">
                <AgentOrb status={agent.status} size={34} halo accent={agent.accent} />
              </div>

              <label className="ag-field">
                <span className="ag-field-label">Name</span>
                <input
                  className="ag-field-in"
                  value={agent.name}
                  onChange={(e) => updateAgent(agent.id, (a) => ({ ...a, name: e.target.value }))}
                />
              </label>

              <label className="ag-field">
                <span className="ag-field-label">What it does</span>
                <textarea
                  className="ag-field-in"
                  rows={3}
                  value={agent.role}
                  onChange={(e) => updateAgent(agent.id, (a) => ({ ...a, role: e.target.value }))}
                />
              </label>

              <div className="ag-field">
                <span className="ag-field-label">Colour</span>
                {/* The one look decision, made where there is finally something to
                    look at. Status stays carried by form and motion, so a tide-blue
                    agent that needs you is still a ring. */}
                <div className="ag-swatches">
                  {Object.entries(ACCENTS).map(([id, c]) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={c.name}
                      aria-pressed={agent.accent === c.hex}
                      onClick={() => updateAgent(agent.id, (x) => ({ ...x, accent: c.hex }))}
                      className={`ag-swatch${agent.accent === c.hex ? " ag-swatch--on" : ""}`}
                      style={{ ["--pick" as string]: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="ag-field">
                <span className="ag-field-label">Right now</span>
                {/* Not a pill. Everything else pill-shaped in this column is
                    something you press, and a status is the one thing here that is
                    only ever read — so it is a dot and a word, the same two parts
                    the roster uses to say the same thing. */}
                <p className={`ag-state ag-state--${agent.status}`}>
                  <i aria-hidden="true" />
                  {STATUS_LABEL[agent.status]}
                </p>
                {agent.cadence && (
                  <p className="ag-cadence">
                    {/* the smallest possible sign that a schedule is a live thing and
                        not a printed fact — one dot, going round slowly */}
                    <span className="ag-tick" aria-hidden="true"><i /></span>
                    {agent.cadence}
                  </p>
                )}
              </div>

              <div className="ag-field">
                <span className="ag-field-head">
                  Connected tools
                  {/* On the label rather than under the chips: a pill button sitting
                      with the chips reads as a seventh connector nobody enabled. */}
                  <button
                    type="button"
                    className="ag-gear"
                    aria-label="Manage connectors"
                    title="Manage connectors"
                    onClick={() => setManaging(true)}
                  >
                    <SettingsIcon className="size-[18px]" />
                  </button>
                </span>
                {/* chips, not rows: what an agent can reach is something you read at
                    a glance. Changing it is a different act, and it has a button. */}
                <div className="ag-chips">
                  {agent.tools.map((id) => (
                    <span key={id} className="ag-chip">
                      <AppIcon kind={BY_ID[id].kind} className="size-3.5" />
                      {BY_ID[id].name}
                    </span>
                  ))}
                  {agent.tools.length === 0 && <span className="ag-chip ag-chip--none">Nothing yet</span>}
                </div>
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
        .ag-row-name { flex: 1; font-size: 14px; font-weight: 500; color: #fff; }
        .ag-row-time { flex: none; font-size: 11px; color: rgba(255,255,255,.3); }
        .ag-row-mood {
          font-size: 12.5px; line-height: 1.4; color: rgba(255,255,255,.42);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ag-row--on .ag-row-mood { color: rgba(255,255,255,.55); }

        .ag-empty { padding: 18px 10px 8px; display: flex; flex-direction: column; gap: 7px; }
        .ag-empty-title { margin: 0; font-size: 14px; font-weight: 500; color: rgba(255,255,255,.6); }
        .ag-empty-body { margin: 0; font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.32); }

        /* ---------- roster motion ---------- */

        .ag-rows { position: relative; }
        .ag-row-orb { flex: none; margin-top: 5px; }

        /* the signal travelling between two agents, in the gutter the orbs sit in */
        .ag-signal {
          position: absolute; left: 18px; z-index: 2; pointer-events: none;
          width: 6px; height: 6px; margin-top: -3px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.9), 0 0 22px rgba(248,70,0,.35);
        }

        /* the receiving agent takes a beat. One shot, a few percent — any more and
           it reads as an error rather than as being handed something. */
        .ag-row--nudged { animation: ag-nudge .9s cubic-bezier(.16,1,.3,1); }
        @keyframes ag-nudge {
          0% { background: rgba(248,70,0,.14); }
          100% { background: rgba(255,255,255,0); }
        }

        .ag-handoff-note {
          margin: 4px 16px 0; font-size: 11.5px; line-height: 1.5;
          color: rgba(255,255,255,.3);
        }

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

        .ag-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.015);
        }
        .ag-drawer-in {
          width: 316px; height: 100%; overflow-y: auto;
          padding: 14px 20px 30px; display: flex; flex-direction: column; gap: 18px;
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
        /* A 32px target with an 18px glyph. It was 14px in a 20px box, which is
           under every hit-target floor there is and read as a smudge next to an
           11px label. The negative margin keeps the row the height of the label,
           so the target grew without the layout moving. */
        .ag-gear {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; margin: -9px -7px -9px 0;
          border: 0; border-radius: 8px; background: none; cursor: pointer;
          color: rgba(255,255,255,.5);
          transition: color .15s ease, background-color .15s ease;
        }
        .ag-gear:hover { color: #fff; background: rgba(255,255,255,.09); }
        .ag-gear:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }
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

        .ag-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .ag-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 11px; border-radius: 999px;
          border: 1px solid rgba(248,70,0,.32); background: rgba(248,70,0,.09);
          font-size: 12px; color: rgba(255,255,255,.88);
        }
        .ag-chip svg { color: var(--color-primary); }
        .ag-chip--none {
          border-color: rgba(255,255,255,.12); border-style: dashed; background: none;
          color: rgba(255,255,255,.3);
        }

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
          width: fit-content; align-self: flex-start;
          max-width: 560px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
        }

        .ag-msg { font-size: 14.5px; line-height: 1.55; color: rgba(255,255,255,.9); }
        .ag-msg--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
        }

        /* Work, not talk — said by the kicker and the list, not by the container. */
        .ag-activity { padding-top: 12px; padding-bottom: 13px; }
        .ag-activity-when {
          margin: 0 0 7px; font-size: 11.5px; letter-spacing: .06em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .ag-activity ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .ag-activity li { font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.62); }

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

        .ag-sheet {
          flex: none; margin: 0 24px 4px; padding: 16px 18px 18px;
          border-radius: 16px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(20,20,22,.96);
          display: flex; flex-direction: column; gap: 12px;
        }
        .ag-sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ag-sheet-title { margin: 0; font-size: 14px; font-weight: 600; }
        .ag-sheet-close {
          padding: 5px 14px; border-radius: 999px; cursor: pointer;
          border: 0; background: var(--color-primary); color: #fff;
          font-family: inherit; font-size: 12.5px; font-weight: 500;
        }

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
          .ag-row--nudged { animation: none; }
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
