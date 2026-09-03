import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pickScenario, type HeroIntent, type Scenario, type TaskCard } from "./data";
import { StepFlow } from "./StepFlow";
import { GuestSidebar } from "./GuestSidebar";
import { ProductSidebar } from "./ProductSidebar";
import { SignupGate } from "./SignupGate";
import { IntentPicker } from "./IntentPicker";
import { PresenceOrb } from "./presence/PresenceOrb";
import { FirstMeeting, useFirstMeeting, type Tone } from "./onboarding/FirstMeeting";
import { Reactable } from "./Reactable";
import { ConductorIntroPopover } from "./onboarding/ConductorIntroPopover";
import { ConnectFirst } from "./agents/ChatHandoff";
import { readControl, type Control } from "./agents/agentControl";
import { readTaskControl, type TaskControl } from "./agents/taskControl";
import { ActiveTaskCard } from "./agents/ActiveTaskCard";
import type { ActiveTask } from "./agents/activeTasks";
import { readRequest, sameAsk, tickersIn, type Request } from "./agents/readRequest";
import { useAgents } from "./agents/store";
import type { Agent } from "./agents/agentsData";
import type { ConnectorId } from "./agents/connectors";
import { SAVED, type SavedChat } from "./savedChats";
import { SavedThread } from "./SavedThread";
import { AgentsIntroPopover } from "./onboarding/AgentsIntroPopover";
import {
  ArrowLeftIcon,
  PlusIcon,
  MicIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  WalletIcon,
  PanelIcon,
  BracketsIcon,
  CloseIcon,
} from "./icons";

/**
 * PLACEHOLDER — not real output.
 *
 * Every scenario delivers an artifact (a poster, a table, a snippet) but none of
 * them writes anything, so there has never been a piece of Starchild prose on
 * screen to look at. This is a stand-in of roughly the right length and shape:
 * an opening line, a paragraph, a short list with lead-ins, and a closing offer —
 * enough for the type, the measure and the rhythm between blocks to be judged.
 *
 * It is deliberately generic and deliberately the same for every scenario. Replace
 * it with per-scenario copy in ../data once the design is settled; until then,
 * nothing should be read into the words.
 */
function PlaceholderAnswer() {
  return (
    <div className="ca-answer">
      <p>Here's where I'd start.</p>

      <p>
        Three things are actually holding this up, and the rest is noise until they're
        settled. I've put them in the order that unblocks the most with the least effort —
        the first one changes what the other two even look like.
      </p>

      <ul>
        <li>
          <strong>The thing you keep putting off.</strong> It's small, it's overdue, and
          it's quietly making two other decisions harder than they need to be.
        </li>
        <li>
          <strong>The one with a real deadline.</strong> Worth an hour this week rather
          than a scramble next week; the shape of it is already clear enough to start.
        </li>
        <li>
          <strong>Everything else.</strong> None of it needs you today, and deciding that
          on purpose is what stops it sitting in the back of your head.
        </li>
      </ul>

      <p>
        Want me to turn this into something you can work through, or go deeper on any one
        of them?
      </p>

      <style>{`
        .ca-answer {
          display: flex; flex-direction: column; gap: 16px;
          font-family: var(--font-google-sans);
          font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.78);
        }

        .ca-answer p { margin: 0; }
        .ca-answer strong { font-weight: 600; color: #fff; }

        /* the marker sits in the gutter rather than indenting the text, so the list
           keeps the same left edge as the paragraphs around it */
        .ca-answer ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .ca-answer li { position: relative; padding-left: 18px; }
        .ca-answer li::before {
          content: ""; position: absolute; left: 0; top: 10px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(248,70,0,.75);
        }
      `}</style>
    </div>
  );
}

/**
 * One entry in the conversation an agent's existence starts.
 *
 * "said" is Starchild confirming a change; "card" is the agent as it now stands.
 * A card is repeated after every amendment rather than mutated in place further
 * up, because the interesting thing about an amendment is the before and the
 * after, and a card that quietly rewrites itself above the fold shows neither.
 */
/**
 * What this account has asked for before today.
 *
 * The repeat signal is behavioural — it counts how often the same favour has been
 * asked — which means it is worthless on a session that starts from nothing. A
 * signed-in account in this prototype is meant to have been in use for a while,
 * so it starts with a short history, the same way the roster and the sidebar do.
 *
 * Two phrasings of one ask, and they are checked rather than assumed. A first
 * pass here was written loosely — "go through João's emails and tell me what
 * matters" — and `sameAsk` scored it below the bar, correctly: it shares one
 * content word with the third ask. The lesson is not that the bar is too high. It
 * is that a made-up history is easy to write in a way that quietly turns the
 * feature it is meant to demonstrate off, and the only way to know is to run the
 * matcher against it.
 *
 * Note that spelling is not normalised: "summarise" and "summarize" are two
 * different words to the stemmer, so a history written in one spelling will not
 * match an ask typed in the other.
 */
export const ASKED_BEFORE = [
  "Check João's emails and summarize anything important",
  "Can you check the emails from João and summarize what's important?",
];

// The signed-in demo starts with this exact market-check pattern already in its
// history, so typing it again — "Can you check HYPE again and tell me if
// anything meaningful changed?" — is what demonstrates a repeated request
// becoming an active-task suggestion, live rather than only as a recording.
const TRADING_ASKED_BEFORE = [
  "Check HYPE and tell me if anything meaningful changed.",
  "Can you check on HYPE and let me know if anything meaningful changed?",
];

/**
 * One entry in the conversation an active task's existence starts.
 *
 * "said" is Starchild confirming a change; "taskCard" is the task as it now
 * stands. Repeated after every amendment rather than mutated in place further
 * up, because the interesting thing about an amendment is the before and the
 * after, and a card that quietly rewrites itself above the fold shows neither.
 *
 * There is no agent-shaped equivalent here on purpose. A dedicated agent is
 * never brought into being by this conversation any more — see `applyControl`
 * — and what it contributes to a live exchange is a short confirmation line,
 * nothing heavier. Its own findings are read back on its page and, in the
 * demonstrations this account ships with, in the conversation they were
 * reported in — the difference rule 4 exists to keep visible.
 */
type TailBody =
  | { kind: "you"; text: string }
  | { kind: "said"; text: string }
  | { kind: "taskCard"; taskId: string }
  | { kind: "taskHandled"; taskId: string }
  | { kind: "taskUpdate"; taskId: string; found: string };

type Tail = TailBody & { id: number };

export function ChatScreen({
  onBack,
  intents,
  onRequestSignup,
  onLogIn,
  onLearned,
  initialMessage,
  openingMessage,
  task,
  isGuest = false,
  area = "chat",
  onSwitchArea,
  onOpenAgent,
  onOpenJob,
  focusTaskId,
  onFocusedTask,
  focusChatId,
  onFocusedChat,
  railed = false,
  onToggleRail,
  skipMeeting = false,
  onGuestWork,
  extraConversations = [],
}: {
  /** a guest asked for something — the app keeps it so the account can have it */
  onGuestWork?: (chat: SavedChat) => void;
  /** conversations this session produced, ahead of the seeded history */
  extraConversations?: SavedChat[];
  /** opened at the signed-in app rather than walked to — see ConductorApp */
  skipMeeting?: boolean;
  /** an agent was made from this conversation and the person wants to go and see it */
  onOpenAgent?: (id: string) => void;
  /** the same idea for a Job — "View job" sends the person to the Jobs area now,
   *  the same way "Open agent" always has, rather than opening anything in chat */
  onOpenJob?: (id: string) => void;
  /** set by the Jobs area's own "Back to chat", so this screen can pick up
   *  editing exactly the job someone was just looking at over there */
  focusTaskId?: string;
  /** called once `focusTaskId` has been acted on, so returning to Jobs and back
   *  again does not silently re-focus the composer on a job nobody asked for */
  onFocusedTask?: () => void;
  /** set by the Chat/Agents/Connectors/Jobs shell when a saved conversation is
   *  opened from the sidebar while this screen is hidden behind one of those
   *  areas — the sidebar there has no transcript of its own to show it in */
  focusChatId?: string;
  onFocusedChat?: () => void;
  /** the nav sidebar is down to icons — owned by the app, since two screens share it */
  railed?: boolean;
  onToggleRail?: () => void;
  /** which product area the shell is showing — the sidebar switch reads it */
  area?: "chat" | "agents" | "connectors" | "jobs";
  onSwitchArea?: (next: "chat" | "agents" | "connectors" | "jobs") => void;
  onBack: () => void;
  /** opened from the signed-in sidebar */
  /** the hero chips of the landing this visitor came from — Guest Mode reopens the
   *  same picker, so it has to offer the same choices. Defaults to HERO_INTENTS. */
  intents?: HeroIntent[];
  onRequestSignup?: () => void;
  onLogIn?: () => void;
  /** what the first meeting learned, kept by the app rather than by the chat */
  onLearned?: (learned: { topic?: string; tone?: Tone }) => void;
  initialMessage?: string;
  /** Starchild speaks first — used after onboarding so the chat is never an empty box. */
  openingMessage?: string;
  /** Came from a hero task card: Starchild asks one question, then runs with this context. */
  task?: TaskCard;
  isGuest?: boolean;
}) {
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [scenario, setScenario] = useState<Scenario | null>(initialMessage ? pickScenario(initialMessage) : null);
  const [delivered, setDelivered] = useState(false);
  const [value, setValue] = useState("");
  /** the message a reply is being written against — a quote, not a thread */
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const guest = isGuest;
  const [tasksRemaining, setTasksRemaining] = useState(initialMessage ? 1 : 2);
  const [gate, setGate] = useState<{ heading: string; sub: string } | null>(null);
  const [meetingOver, setMeetingOver] = useState(skipMeeting);
  // The two first-run notes arrive after the meeting: how an answer is made, then
  // how work can keep going on its own. Agents also gets a composer-anchored card
  // on small screens, where the sidebar does not exist.
  //
  // There was a third, about the Marketplace, sitting between them. It hung off
  // the Marketplace item in the rail, and when that block of navigation came out
  // the note lost the only thing it could point at. So the run is two, and the
  // Marketplace is reached from the landing pages instead.
  const [intro, setIntro] = useState<"conductor" | "agents" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // A task can also be picked here, not only on the landing page — the empty state
  // carries the same chips. Either way it lands in the same place: Starchild asks
  // its one question, and the card's context is what routes the work afterwards.
  const [activeTask, setActiveTask] = useState<TaskCard | undefined>(task);
  const [opening, setOpening] = useState<string | undefined>(openingMessage);

  /* ── Chat is "do this now"; an Agent is "keep doing this for me". Everything
     below exists to keep that line from blurring, and all of it stays inert unless
     the person's own words crossed it. ── */

  const { isConnected, roster, updateAgent, removeAgent, activeTasks, addTask, updateTask } = useAgents();
  /** what the last message turned out to be asking for */
  const [request, setRequest] = useState<Request | null>(null);
  /**
   * Tools the task reaches for that the account has not authenticated yet. While
   * this is non-empty the work is genuinely blocked, so the run does not start —
   * a progress bar over a missing login is a lie about what is happening.
   */
  const [pending, setPending] = useState<ConnectorId[]>([]);
  /**
   * Everything asked for in this account, across conversations — deliberately not
   * cleared by "New chat", because the same request turning up in three separate
   * chats is the strongest version of the signal, not a weaker one.
   */
  const [askedBefore, setAskedBefore] = useState<string[]>(() => (isGuest ? [] : TRADING_ASKED_BEFORE));
  /**
   * "Not now" is a real answer about a request, not about a wording. It is matched
   * back the same way repeats are found — otherwise saying no and then asking the
   * same thing in slightly different words gets the question asked again, which is
   * how a product learns to be ignored.
   */
  const [declined, setDeclined] = useState<string[]>([]);
  /** the active task this conversation produced, if the person asked for one —
   *  gates the suggestion the same way `made` used to for a full agent */
  const [madeTask, setMadeTask] = useState<ActiveTask | null>(null);
  /**
   * The conversation that happens *about* an active task, after there is one.
   *
   * Kept apart from the main answer above it rather than merged into one
   * transcript, because the two are answering different questions. The answer is
   * what you asked; this is the standing job you now have and every amendment you
   * have made to it. Interleaving them would bury the second one inside the first
   * the moment anyone scrolled.
   */
  const [tail, setTail] = useState<Tail[]>([]);
  /** the agent a bare "pause this" refers to — the last one anybody touched */
  const [lastAgentId, setLastAgentId] = useState<string | undefined>();
  /** the same idea, for an active task */
  const [lastTaskId, setLastTaskId] = useState<string | undefined>();
  /** set by "Edit here" or "Edit": the composer becomes that thing's editor, and
   *  says so. Exactly one of these two is ever set — accepting an agent and a
   *  task at once has no meaning, since they never overlap in what they refer to. */
  const [editing, setEditing] = useState<Agent | null>(null);
  const [editingTask, setEditingTask] = useState<ActiveTask | null>(null);
  const tailId = useRef(0);
  const nextTail = () => (tailId.current += 1);

  /**
   * "Back to chat" from the Jobs area, arriving here.
   *
   * The composer is the editor for a job the same way it always has been —
   * what changed is where the request to focus one can come from. This mirrors
   * `focusId` on AgentsWorkspace: a prop rather than something this screen
   * decided on its own, because the decision was made on the other page.
   */
  useEffect(() => {
    if (!focusTaskId) return;
    const t = activeTasks.find((x) => x.id === focusTaskId);
    if (t) {
      setEditingTask(t);
      setLastTaskId(t.id);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    onFocusedTask?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTaskId]);

  /**
   * The same hand-off, for a saved conversation opened from the sidebar while
   * this screen was hidden behind Jobs, Agents or Connectors. That sidebar has
   * no transcript of its own to open one into — it only ever borrows this
   * screen's, the same one visible from Chat — so it hands over which one and
   * this screen does the actual opening, exactly as `openSaved` already does
   * for a click made from right here.
   */
  useEffect(() => {
    if (!focusChatId) return;
    const chat = [...extraConversations, ...SAVED].find((c) => c.id === focusChatId);
    if (chat) openSaved(chat);
    onFocusedChat?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusChatId]);

  const pushTail = (entry: TailBody) =>
    setTail((prev) => [...prev, { ...entry, id: nextTail() }]);
  /** the saved conversation being read back, if any */
  const [reading, setReading] = useState<SavedChat | null>(null);

  /**
   * Opening something that already happened. The transcript is restored, not
   * replayed — the work was done at the time, and running it again would be a lie
   * about what is on screen. Everything that was in the conversation comes back,
   * the tool that got connected halfway through included.
   */
  function openSaved(chat: SavedChat) {
    setReading(chat);
    setMessage(null);
    setScenario(null);
    setDelivered(false);
    setOpening(undefined);
    setActiveTask(undefined);
    setMadeTask(null);
    setPending([]);
    setValue("");
    setMeetingOver(true);
  }

  /**
   * Simple ongoing work, brought into being by the main agent itself.
   *
   * This is the only way anything standing gets created from a chat any more.
   * What it makes is deliberately smaller than what `createAgent` used to make:
   * a title and a condition, nothing that would earn a page of its own. Rule
   * five still applies — a market or a subject already being watched is widened
   * rather than duplicated — and widening is announced the same way it always
   * was, because a task whose condition changed without anyone being told is a
   * task nobody trusts either.
   */
  function createActiveTask(spec: { title: string; condition: string; watchlist?: string[]; origin: string }) {
    const tickers = spec.watchlist ?? [];
    const existing = activeTasks.find(
      (t) =>
        t.title.toLowerCase() === spec.title.toLowerCase() ||
        (tickers.length > 0 && (t.watchlist ?? []).some((x) => tickers.includes(x))) ||
        sameAsk(t.condition, spec.condition),
    );
    if (existing) {
      updateTask(existing.id, (t) => ({
        ...t,
        condition: [...t.condition.split(/\s+\+\s+/), spec.condition]
          .filter(
            (condition, index, conditions) =>
              conditions.findIndex((candidate) => candidate.trim().toLowerCase() === condition.trim().toLowerCase()) === index,
          )
          .join(" + "),
        status: t.status === "paused" ? t.status : "active",
      }));
      setMadeTask(existing);
      setLastTaskId(existing.id);
      return { task: existing, widened: true };
    }

    const task: ActiveTask = {
      id: `t${Date.now()}`,
      title: spec.title,
      status: "active",
      condition: spec.condition,
      watchlist: tickers.length ? tickers : undefined,
      lastChecked: "Set up just now — first check due shortly",
      origin: spec.origin,
    };
    addTask(task);
    setMadeTask(task);
    setLastTaskId(task.id);
    return { task, widened: false };
  }

  /**
   * The moment a task comes back with something.
   *
   * Scripted, and only armed for a task whose condition has an actual market
   * event in it: a threshold is the one kind of standing condition that can be
   * *met*, so it is the only one where an unprompted message is the main agent
   * doing its job rather than interrupting. Everything it finds is written onto
   * the task itself — `activity` is what "View details" expands in place — and
   * announced once in the conversation that made the task, which is the only
   * place this kind of work reports. There is no second copy anywhere.
   */
  function armTaskFinding(task: ActiveTask) {
    if (!/breakout|resistance|volume|funding|open interest|price|market/i.test(task.condition)) return;
    const mark = (task.watchlist ?? [])[0] ?? "the market";

    window.setTimeout(() => {
      const activity = {
        when: "Today",
        lines: [
          `Checked ${mark} market data every 15 minutes`,
          "Resistance tested 3 times",
          "Volume increased 38% above recent average",
          "Open interest is rising",
          "Funding remains neutral",
          "No confirmed breakout yet",
        ],
      };
      updateTask(task.id, (t) => ({ ...t, status: "possible-setup", lastChecked: "3 minutes ago", activity }));

      pushTail({
        kind: "taskUpdate",
        taskId: task.id,
        found: `${mark} update: possible setup forming. Price is testing resistance, volume is rising, open interest is increasing, and funding remains neutral.`,
      });
      scrollToBottom();
    }, 9000);
  }

  /** HH:MM, the timestamp style a dedicated agent's own activity log uses for
   *  something that just happened, as against `lastChecked`'s looser prose. */
  function nowStamp() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  /**
   * Apply what the router read, and say so — in two places, not one.
   *
   * The router decides, this writes. Keeping the two apart means the one thing
   * worth auditing later — what a sentence was taken to mean — is readable
   * without also reading how a roster is mutated.
   *
   * Every branch below also appends one line to the agent's own activity log.
   * That line, not a card, is what the main chat leaves behind on a dedicated
   * agent's page — rule 8's whole argument: a delegated change is state that
   * moved, recorded where the agent lives, not a second copy of the exchange
   * that moved it. The chat gets a short confirmation and nothing heavier.
   */
  function applyControl(c: Control) {
    if (c.kind === "none") return;
    const id = c.agent.id;
    setLastAgentId(id);
    let logLine: string | undefined;

    switch (c.kind) {
      case "refine":
        updateAgent(id, (a) => ({ ...a, instruction: c.instruction }));
        logLine = "Instructions updated from main chat.";
        break;
      case "pause":
        updateAgent(id, (a) => ({ ...a, status: "paused", mood: "Paused by you." }));
        logLine = "Paused from main chat.";
        break;
      case "resume":
        updateAgent(id, (a) => ({ ...a, status: "working", mood: "Back on it." }));
        logLine = "Resumed from main chat.";
        break;
      case "rename":
        updateAgent(id, (a) => ({ ...a, name: c.name }));
        logLine = `Renamed to "${c.name}" from main chat.`;
        break;
      case "alerts":
        updateAgent(id, (a) => ({
          ...a,
          alerts: [...(a.alerts ?? []).filter((x) => !c.remove.includes(x)), ...c.add.filter((x) => !(a.alerts ?? []).includes(x))],
        }));
        logLine = "Notification channels changed from main chat.";
        break;
      case "schedule":
        updateAgent(id, (a) => ({ ...a, cadence: c.cadence, nextRun: c.cadence }));
        logLine = `Schedule changed to ${c.cadence} from main chat.`;
        break;
      case "watchlist": {
        updateAgent(id, (a) => ({
          ...a,
          watchlist: [
            ...(a.watchlist ?? []).filter((t) => !c.remove.includes(t)),
            ...c.add.filter((t) => !(a.watchlist ?? []).includes(t)),
          ],
        }));
        // Scenario 7's own line, generalised: whichever of add/remove actually
        // has something in it is the half worth logging.
        if (c.add.length) logLine = `${c.add.join(", ")} added to watchlist from main chat.`;
        else if (c.remove.length) logLine = `${c.remove.join(", ")} removed from watchlist from main chat.`;
        break;
      }
      case "condition":
        updateAgent(id, (a) => ({ ...a, conditions: [...(a.conditions ?? []), c.add] }));
        logLine = "Alert condition updated from main chat.";
        break;
      case "approval":
        updateAgent(id, (a) => ({ ...a, approval: true, execution: true }));
        logLine = "Execution enabled from main chat.";
        break;
      case "delete":
        removeAgent(id);
        setLastAgentId(undefined);
        break;
      case "status":
        break;
    }

    if (logLine) {
      const line = logLine;
      updateAgent(id, (a) => ({ ...a, thread: [...a.thread, { kind: "activity", when: nowStamp(), lines: [line] }] }));
    }

    pushTail({ kind: "said", text: c.say });
    setTimeout(scrollToBottom, 80);
  }

  /**
   * The task-scoped twin of `applyControl` — no activity log, because a task has
   * nowhere else for one to live. The card is re-shown after every amendment
   * instead: the interesting thing about "also check funding" is the condition
   * before it and the condition after, and that comparison only reads if the
   * whole thing is on screen again rather than mutating silently above the fold.
   */
  function applyTaskControl(c: TaskControl) {
    if (c.kind === "none") return;
    const id = c.task.id;
    setLastTaskId(id);

    switch (c.kind) {
      case "refine":
        updateTask(id, (t) => ({ ...t, condition: c.condition }));
        break;
      case "pause":
        updateTask(id, (t) => ({ ...t, status: "paused" }));
        break;
      case "resume":
        updateTask(id, (t) => ({ ...t, status: "active" }));
        break;
    }

    pushTail({ kind: "said", text: c.say });
    pushTail({ kind: "taskCard", taskId: id });
    setTimeout(scrollToBottom, 80);
  }

  /**
   * Handed up, not kept here. A guest who signs up gets a new ChatScreen, so
   * anything this one is holding goes with it — and the promise being made on the
   * way out is that their work survives.
   */
  function keepGuestWork(said: string) {
    onGuestWork?.({
      id: `guest-${Date.now()}`,
      title: said.length > 38 ? `${said.slice(0, 38).trimEnd()}…` : said,
      when: "Just now",
      turns: [
        { who: "you", text: said },
        {
          who: "ai",
          text: "Here's where I'd start. Three things are holding this up, and the rest is noise until they're settled.",
        },
      ],
    });
  }

  // A guest who arrived from the homepage composer never went through choose() —
  // their message came in as a prop and was on screen before this component had a
  // say. Without this, the one conversation a guest is most likely to have is the
  // one that would not have been kept.
  //
  // Latched, because StrictMode runs mount effects twice in development and this
  // one appends to a list — without the latch the same conversation is filed
  // under two ids, which looks exactly like a bug in the feature it is
  // demonstrating.
  const kept = useRef(false);
  useEffect(() => {
    if (kept.current || !guest || !initialMessage) return;
    kept.current = true;
    keepGuestWork(initialMessage.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openGate(heading: string, sub: string) {
    setGate({ heading, sub });
  }

  function startTask(next: TaskCard) {
    setActiveTask(next);
    setOpening(next.question);
  }

  // The first authenticated visit opens on the meeting instead of a blank chat.
  // It ends by handing back an opening line — or nothing at all, if they skipped.
  const meeting = useFirstMeeting({
    onDone: ({ topic, tone, opening: next }) => {
      onLearned?.({ topic, tone });
      setMeetingOver(true);
      setIntro("conductor");
      if (next) setOpening(next);
    },
  });
  const meetingOpen = !guest && !meetingOver && message === null && !openingMessage;
  // the signed-in home — reached after the meeting, and again on every New chat
  const atHome = !guest && message === null && !opening && !meetingOpen && !reading;
  // The composer sits in the middle of an empty screen because it's the only thing
  // to do there. The moment something appears above it to read — an answer given to
  // the meeting, Starchild's opening line, a task under way — it drops to the bottom
  // and stays out of the way. "New chat" empties the screen and brings it back.
  const pinComposer =
    message !== null ||
    Boolean(reading);
  const meetingTakesText = meetingOpen && meeting.acceptsText;

  function choose(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (guest && tasksRemaining <= 0) {
      openGate(
        "Keep going with Starchild.",
        "You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.",
      );
      return;
    }
    /* ── is this about a dedicated agent, or an active task, that already exists? ──
       A bare "only summarise the ones that need a reply" or "pause this" is a
       complete sentence about a standing thing and a nonsense question on its
       own — reading either as a fresh request would answer it as one, which is
       the exact failure this whole layer exists to prevent.

       Both routers are tried; which one goes first is decided by which kind of
       thing this conversation was just talking about, not by a fixed rule that
       favours one tier over the other. That distinction is not cosmetic: a
       dedicated agent's name is often built from ordinary words — Hyperliquid
       *Funding* Watcher — and "also check funding before alerting me," said
       right after creating an active task that has nothing to do with that
       agent, would otherwise be read as naming it. Whichever was last touched
       gets first refusal on an ambiguous sentence; a sentence that genuinely
       names the other one still finds it, because a name match does not depend
       on this ordering at all.
    */
    const agentInFocus = Boolean(lastAgentId ?? editing?.id);
    const taskInFocus = Boolean(lastTaskId ?? editingTask?.id);
    const tryTaskFirst = taskInFocus && !agentInFocus;

    const tryAgent = () => {
      if (guest || roster.length === 0) return false;
      const control = readControl(trimmed, roster, lastAgentId ?? editing?.id);
      if (control.kind === "none") return false;
      setValue("");
      setEditing(null);
      pushTail({ kind: "you", text: trimmed });
      window.setTimeout(() => applyControl(control), 520);
      return true;
    };
    const tryTask = () => {
      if (guest || activeTasks.length === 0) return false;
      const taskControl = readTaskControl(trimmed, activeTasks, lastTaskId ?? editingTask?.id);
      if (taskControl.kind === "none") return false;
      setValue("");
      setEditingTask(null);
      pushTail({ kind: "you", text: trimmed });
      window.setTimeout(() => applyTaskControl(taskControl), 520);
      return true;
    };

    if (tryTaskFirst ? tryTask() || tryAgent() : tryAgent() || tryTask()) return;

    setMessage(trimmed);
    setReading(null);
    // the composer outlives the send now, so it has to be emptied by hand
    setValue("");
    // On a task card the user only supplies the missing detail ("BTC"), so the
    // standing context is what actually routes the work — their reply alone wouldn't.
    const full = activeTask ? `${activeTask.basePrompt} ${trimmed}` : trimmed;
    setScenario(pickScenario(full));

    if (guest) keepGuestWork(trimmed);
    // Read once, on send. Guest Mode has no account to connect anything to and no
    // Agents area to put anything in, so it reads nothing at all.
    if (!guest) {
      const req = readRequest(full, askedBefore);
      setAskedBefore((prev) => [...prev, full]);
      setRequest(req);
      setPending(req.needs.filter((id) => !isConnected(id)));
      setMadeTask(null);
      setTail([]);

      /*
        Said outright, so acted on.

        This file used to hold that creating is always a click somebody made on
        purpose, and against a *guess* that still stands — a pattern we noticed is
        our inference, and inferences get confirmed. But "keep watching HYPE and
        let me know if it breaks resistance with volume" is not an inference. The
        person specified a standing thing to watch and a condition, and answering
        that with "shall I?" is asking them to say it twice.

        The two signals stay separate for exactly this reason: `recurring` is
        their words, `repeats` is our observation, and only the first one is
        allowed to create anything. And what it is now allowed to create is
        smaller than it used to be — an active task, held by the main agent,
        never a dedicated agent with a page. That is the one thing this whole
        model does not let a sentence decide on its own; see the Agents-area
        creation form for the door that is still open on purpose.
      */
      const blocked = req.needs.some((id) => !isConnected(id));
      if (req.recurring && !blocked) {
        const { task, widened } = createActiveTask({
          title: req.name,
          condition: req.summary,
          watchlist: tickersIn(full),
          origin: full,
        });
        window.setTimeout(() => {
          pushTail({ kind: "taskHandled", taskId: task.id });
          if (!widened) armTaskFinding(task);
          scrollToBottom();
        }, 1400);
      }
    }
    if (guest) setTasksRemaining((r) => r - 1);
  }

  // "New chat" is the way back to the home screen: nothing carried, nothing asked
  // again. The meeting doesn't reopen — that already happened.
  function newChat() {
    setMessage(null);
    setScenario(null);
    setDelivered(false);
    setValue("");
    setOpening(undefined);
    setActiveTask(undefined);
    setRequest(null);
    setPending([]);
    setMadeTask(null);
    setTail([]);
    setEditing(null);
    setEditingTask(null);
    setLastAgentId(undefined);
    setLastTaskId(undefined);
    setReading(null);
    // askedBefore and declined survive: both are things the account knows, not
    // things this conversation knows.
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    const t = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(t);
  }, [message, delivered]);

  // The suggestion and the connect card both arrive after their own delay, by
  // which time the page has finished scrolling for the answer. A question that
  // lands below the fold has not been asked.
  /**
   * Two independent signals, and either is enough: the person described something
   * ongoing, or they have now asked for the same thing three times. Neither
   * creates anything — both only put a question on screen.
   */
  /**
   * Two signals for a live conversation — the person described something ongoing,
   * or they have now asked for the same favour twice — and, for one being read
   * back, whatever that transcript recorded. None of them creates anything.
   */
  const worthOffering = Boolean(request && (request.recurring || request.repeats >= 2));
  const offering =
    !guest &&
    !madeTask &&
    (reading
      ? Boolean(reading.offer)
      : delivered && worthOffering && !declined.some((no) => sameAsk(no, request?.summary ?? "")));
  useEffect(() => {
    if (!offering && !madeTask && pending.length === 0) return;
    const t = setTimeout(scrollToBottom, 620);
    return () => clearTimeout(t);
  }, [offering, madeTask, pending.length]);

  // One composer, rendered in one of two places. In Guest Mode it's pinned to the
  // bottom of the screen and everything else moves around it; signed in, it sits in
  // the middle of the empty state until there's a conversation to sit under.
  const composerBox = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30"
    >
      {/* Inside the composer rather than above it: what you are replying to is
          part of the message you are writing, and a bar floating over the box
          would read as a notification about it instead. */}
      <AnimatePresence initial={false}>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-3 flex items-start gap-2.5 border-l-2 border-[#f84600] pl-3">
              <p
                className="min-w-0 flex-1 truncate text-[13px] text-white/45"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {replyTo}
              </p>
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="shrink-0 rounded-full p-0.5 text-white/35 transition-colors hover:text-white"
                aria-label="Cancel reply"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          // while the meeting is open the composer answers Starchild
          // rather than starting a task — same box, same gesture
          if (meetingTakesText) {
            meeting.submit(value);
            setValue("");
            return;
          }
          choose(value);
        }}
        placeholder={
          // "Edit here" does not open an editor. It says out loud that the box
          // already under your hands is one.
          editing
            ? `Tell me what to change about ${editing.name}…`
            : editingTask
              ? `Tell me what to change about ${editingTask.title}…`
              : meetingTakesText
            ? "Tell me anything…"
            : opening
              ? "Answer however you like…"
              : atHome
                ? "Ask me anything…"
                : guest && message === null
                  ? // The three shapes a first message can take, said inside the box
                    // that takes it. As a line of its own it was a caption nobody
                    // needed; in here it is the answer to "like what?" at the moment
                    // the question comes up, and it leaves when they start typing.
                    "Ask, explore, or hand something over."
                  : "Ask anything, or pick one above"
        }
        className="w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
        autoFocus={Boolean(opening)}
      />

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]"
          aria-label="Add attachment"
        >
          <PlusIcon className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          {/* the selector is the popover's anchor, and stays lit while it's open */}
          <div className="relative">
            <button
              type="button"
              className={`-mx-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[13px] transition-colors duration-300 ${
                intro === "conductor"
                  ? "bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40"
                  : "text-white/55"
              }`}
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Conductor Mode
              <ChevronDownIcon
                className={`size-3 ${intro === "conductor" ? "text-[#f84600]/70" : "text-white/35"}`}
              />
            </button>

            {intro === "conductor" && !guest && (
              <ConductorIntroPopover onClose={() => setIntro("agents")} />
            )}
            {intro === "agents" && !guest && (
              <div className="lg:hidden">
                <AgentsIntroPopover
                  placement="above-right"
                  onOpen={() => {
                    setIntro(null);
                    onSwitchArea?.("agents");
                  }}
                  onClose={() => setIntro(null)}
                />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => choose(value || "Explain Conductor Mode to me")}
            className="flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105"
            aria-label="Send"
          >
            {value.trim() ? <ArrowUpIcon className="size-4" /> : <MicIcon className="size-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0a0a0a]">
      {guest ? (
        <GuestSidebar
          onLockedFeature={() => onRequestSignup?.()}
        />
      ) : (
        <ProductSidebar
          area={area}
          onSwitchArea={onSwitchArea}
          collapsed={railed}
          onToggleCollapsed={onToggleRail}
          onNewChat={newChat}
          conversations={[...extraConversations, ...SAVED]}
          openConversation={reading?.id}
          onOpenConversation={openSaved}
          intro={
            intro === "agents" && !guest
              ? {
                  label: "Agents",
                  node: (
                    <AgentsIntroPopover
                      // going there ends the run: someone who has arrived is no
                      // longer being introduced to anything
                      onOpen={() => {
                        setIntro(null);
                        onSwitchArea?.("agents");
                      }}
                      onClose={() => setIntro(null)}
                    />
                  ),
                }
              : undefined
          }
        />
      )}

      {gate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setGate(null);
          }}
        >
          <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl">
            <SignupGate
              heading={gate.heading}
              sub={gate.sub}
              ctaLabel="Create free account"
              showForm={false}
              onContinue={() => {
                setGate(null);
                onRequestSignup?.();
              }}
            />
          </div>
        </div>
      )}

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        {guest ? (
          <header className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={onBack}
              className="flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]"
              aria-label="Back"
            >
              <ArrowLeftIcon className="size-4" />
            </button>
            {/* Where you are, not what routed the answer. Conductor Mode is a thing
                that happens to a message and it has its own label on the composer;
                up here it was answering a question nobody asked, while the one
                someone would ask — why does this look cut down — went unanswered. */}
            <span
              className="text-[13.5px] font-medium text-white/55"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Guest mode
            </span>

            {/* same pair as the site header — a guest can create the account from
                here too, without going back to the homepage first */}
            {guest && (
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => (onLogIn ?? onRequestSignup)?.()}
                  className="px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => onRequestSignup?.()}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  Sign up
                </button>
              </div>
            )}
          </header>
        ) : (
          // The signed-in top bar: the wordmark, what the account has left to
          // spend, and the view controls. No back arrow — this is the product,
          // not a detour from the site. The wordmark is the way out.
          <header className="relative flex shrink-0 items-center justify-end gap-3 px-6 py-4">
            <button
              type="button"
              onClick={onBack}
              className="absolute left-1/2 -translate-x-1/2 text-[19px] font-semibold tracking-[0.17em] text-white transition-opacity hover:opacity-75"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              STARCHILD
            </button>

            <span
              className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/85"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              <WalletIcon className="size-4 text-white/45" />
              $190
            </span>

            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white"
              aria-label="Toggle panel"
            >
              <PanelIcon className="size-[18px]" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white"
              aria-label="Developer view"
            >
              <BracketsIcon className="size-[18px]" />
            </button>
            <span className="size-2.5 rounded-full bg-emerald-400" title="Connected" />
          </header>
        )}

        <div className="flex-1 overflow-y-auto">
          {/* A transcript counts as something on screen even though nothing was
              typed into this session — so it takes the conversation branch, not the
              empty-screen one. */}
          {message === null && !reading ? (
            <div className="flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10">
              {opening && !guest ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex w-full max-w-[560px] flex-col items-center"
                >
                  {activeTask && (
                    <p
                      className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {activeTask.label}
                    </p>
                  )}
                  <PresenceOrb state="resolved" size={124} />
                  <div className="mt-9 text-center">
                    <p
                      className="text-[17px] leading-relaxed text-white/90"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {opening}
                    </p>
                  </div>
                </motion.div>
              ) : guest ? (
                // The same screen an account holder gets, with a different thing to
                // say. A visitor who is shown a cut-down version of the empty state
                // has been told the product is cut down before they have used it —
                // and Guest Mode's argument is the opposite: this is the real thing,
                // you just have not kept it yet.
                //
                // Arriving from a suggestion on the homepage lands here too, on the
                // same screen, with the choice carried in: the label of what they
                // picked, and Starchild's one question about it in place of the
                // standing invitation. Dropping them somewhere that looked
                // different would read as having left the product rather than
                // having gone one step into it.
                <motion.div
                  key={opening ? "asked" : "open"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <PresenceOrb state={value.trim() ? "listening" : "resting"} size={124} />

                  {/* No label above the question. The question is already about the
                      thing they picked, so the label was restating a choice they
                      had just made — and doing it in the loudest colour on the
                      screen, above the sentence that actually needs answering.

                      Not "let's get to work": nobody arrives here with work, and
                      being told to get to it is the wrong thing to hear on a first
                      visit. This asks for whatever they already have — or, if they
                      have already said what kind of thing it is, for the one detail
                      that is still missing. */}
                  <h1
                    className="mt-9 max-w-[18ch] text-center text-[34px] leading-[1.15] font-semibold text-white"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    {opening ?? <>Start with whatever&rsquo;s on your mind.</>}
                  </h1>
                </motion.div>
              ) : meetingOpen ? (
                // First authenticated entry: Starchild is already there. No empty
                // box, no setup screen — the onboarding is this conversation, and
                // it can be walked past in one click.
                <FirstMeeting meeting={meeting} />
              ) : (
                // Starchild itself, at rest and waiting. The whole screen is one
                // question, so there is nothing to read before starting.
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  {/* The same presence that was on the landing page, at the size
                      it gets when it has the screen to itself. It is at rest
                      until something is being typed, and then it comes closer —
                      it does not loop while nothing is happening. */}
                  <PresenceOrb state={value.trim() ? "listening" : "resting"} size={124} />
                  <h1
                    className="mt-9 text-[34px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Let's get to work
                  </h1>
                  {/* Subtle on purpose — a caption under the heading, not a second
                      one. The model this names (answer, act, or keep something
                      running) is the same one the rest of the screen argues for;
                      this just says it once, in passing, rather than teaching it. */}
                  <p
                    className="mt-2 text-[13.5px] text-white/35"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Chat with your Chief Agent. Ask anything. It can answer, act, or keep things running.
                  </p>
                </motion.div>
              )}

              {!pinComposer && composerBox}

              {/* Under the field, not over it. Above, they were the first thing on
                  the screen and read as the only way in — a menu you had to pick
                  from. Below, the box is the offer and they are the shortcut for
                  someone who would rather not think of one.

                  And gone entirely once one has been picked on the homepage. They
                  are the question "what kind of thing?", and re-offering it under
                  Starchild's follow-up would make the answer look undecided — as
                  though the choice already made had not counted. */}
              {!pinComposer && guest && !activeTask && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[620px]"
                >
                  <IntentPicker onStartTask={startTask} align="center" intents={intents} />
                </motion.div>
              )}

              {!pinComposer && !guest && (
                <p
                  className="-mt-2 text-center text-[12px] text-white/30"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  AI can make mistakes. Please verify important information.
                </p>
              )}
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0">
              {/* Read back out of history: every turn of it, as it happened. Its
                  agent cards are live, not frozen — the same reason the ones in
                  the tail below are: an edit made anywhere shows up everywhere. */}
              {reading && (
                <SavedThread
                  chat={reading}
                  onReply={setReplyTo}
                  onOpenAgent={(id) => onOpenAgent?.(id)}
                  onEditAgent={(id) => {
                    const agent = roster.find((a) => a.id === id);
                    if (agent) setEditing(agent);
                    setLastAgentId(id);
                    inputRef.current?.focus();
                  }}
                  onEditTask={(id) => {
                    const task = activeTasks.find((t) => t.id === id);
                    if (task) setEditingTask(task);
                    setLastTaskId(id);
                    inputRef.current?.focus();
                  }}
                />
              )}

              {!reading && (
              <div className="ca-user-turn">
                <Reactable align="right" onReply={() => setReplyTo(message)}>
                  <div
                    className="max-w-full rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    {message}
                  </div>
                </Reactable>
              </div>
              )}

              {/* Blocked, and honestly so: what this needs is not connected, so
                  nothing is running yet. Asked here, answered here, and the work
                  carries on here. */}
              {!reading && pending.length > 0 && (
                <div className="ca-assistant-turn">
                  <ConnectFirst needs={pending} onReady={() => { setPending([]); scrollToBottom(); }} />
                </div>
              )}

              {/* The answer goes inside the flow rather than after it, so the run and
                  the answer it produced stay one block on the page. */}
              {!reading && pending.length === 0 && (
              <div className="ca-assistant-turn">
                <StepFlow
                  scenario={scenario!}
                  onStep={scrollToBottom}
                  onDone={() => setDelivered(true)}
                >
                  {delivered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-7"
                    >
                      {/* Starchild's turn is reactable too. Only reacting to your own
                          messages would make the gesture a note-to-self. */}
                      <Reactable onReply={() => setReplyTo("Starchild's answer")}>
                        <PlaceholderAnswer />
                      </Reactable>
                    </motion.div>
                  )}
                </StepFlow>
              </div>
              )}

              {/* Asked, never assumed. A one-time request never reaches this line,
                  and a standing one only ever gets a question with two answers.

                  The reason is a message like any other — it is Starchild
                  noticing a pattern, and it reads as a message because that is
                  what it is. What stays inside the card is only the thing being
                  offered: a title and a condition, in the same shape the card
                  will keep once it is real. Reused for a saved conversation's own
                  offer too — under this model an inbox watch is exactly the same
                  kind of simple ongoing work a market watch is, so the same
                  suggestion serves both rather than one being agent-shaped and
                  the other task-shaped. */}
              {offering && (reading?.offer || request) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="ca-offer"
                  >
                    <p className="ca-offer-copy">
                      {reading?.offer?.because ??
                        (request && request.repeats >= 2
                          ? `You've asked me to check this a few times. Want me to keep watching it for meaningful changes?`
                          : `It would keep going for you and update you here.`)}
                    </p>
                    <div className="ca-offer-actions">
                      <button
                        type="button"
                        className="ca-offer-go"
                        onClick={() => {
                      const spec = reading?.offer
                        ? {
                            title: reading.offer.name,
                            condition: reading.offer.role,
                            origin: reading.offer.prompt ?? reading.offer.role,
                          }
                        : { title: request!.name, condition: request!.summary, watchlist: tickersIn(request!.summary), origin: request!.summary };
                      const { task, widened } = createActiveTask(spec);
                      pushTail({ kind: "taskHandled", taskId: task.id });
                      if (!widened) armTaskFinding(task);
                      setTimeout(scrollToBottom, 60);
                        }}
                      >
                        Handle it for me
                      </button>
                      <button
                        type="button"
                        className="ca-offer-quiet"
                        onClick={() =>
                          reading
                            ? setReading({ ...reading, offer: undefined })
                            : setDeclined((d) => [...d, request!.summary])
                        }
                      >
                        Not now
                      </button>
                    </div>
                  </motion.div>
              )}

              {/* Made on purpose, said plainly, and the conversation does not move.

                  Everything below is the conversation about the agent: what you
                  told it, what Starchild did about it, and the agent as it stands
                  after each change. It is the argument the whole feature makes —
                  that an ongoing job is something you keep talking to, not
                  somewhere you go. */}
              {(offering || tail.length > 0) && (
                <style>{`
                  /* The conversation that carries on after an agent exists.

                     Deliberately not bubbles on both sides. Two rows of bubbles
                     would make this look like a second chat running underneath
                     the first one, when it is the same chat still going — an
                     amendment about an agent is not a different kind of thing
                     from the question that came before it. Alignment and weight
                     separate the voices, and that is as much as it needs. */
                  .ca-you {
                    align-self: flex-end; max-width: 480px; margin: 0;
                    padding: 10px 15px; border-radius: 16px 16px 4px 16px;
                    background: rgba(248,70,0,.14);
                    font-family: var(--font-google-sans);
                    font-size: 14.5px; line-height: 1.55; color: rgba(255,255,255,.92);
                  }
                  .ca-said {
                    max-width: 520px; margin: 0;
                    font-family: var(--font-google-sans);
                    font-size: 15px; line-height: 1.6; color: #fff !important;
                  }
                  .ca-user-turn + .ca-assistant-turn, .ca-you + .ca-said { margin-top: 36px; }
                  .ca-offer {
                    display: flex; flex-direction: column; gap: 20px; width: 100%;
                    box-sizing: border-box; padding: 24px 26px; border-radius: 18px;
                    background: #151515; font-family: var(--font-google-sans);
                  }
                  .ca-offer-copy {
                    margin: 0; color: #fff;
                    font-size: 16px; line-height: 1.5; letter-spacing: -.01em;
                  }
                  .ca-offer-actions { display: flex; align-items: center; gap: 22px; }
                  .ca-offer-go {
                    border-radius: 999px; padding: 9px 16px; background: rgba(248,70,0,.18);
                    color: #f84600; font: inherit; font-size: 14px; font-weight: 600;
                    transition: background .18s, transform .18s;
                  }
                  .ca-offer-go:hover { background: rgba(248,70,0,.28); transform: translateY(-1px); }
                  .ca-offer-quiet { color: rgba(255,255,255,.35); font: inherit; font-size: 14px; font-weight: 600; }
                  .ca-offer-quiet:hover { color: rgba(255,255,255,.7); }
                  .ca-handled {
                    display: flex; flex-direction: column; gap: 20px; width: 100%;
                    box-sizing: border-box; padding: 24px 26px; border-radius: 18px;
                    background: #151515; font-family: var(--font-google-sans);
                  }
                  .ca-handled-title { margin: 0; color: #fff; font-size: 14px; line-height: 1.55; }
                  .ca-handled-actions { display: flex; align-items: center; gap: 30px; }
                  .ca-handled-go {
                    border-radius: 999px; padding: 9px 16px; background: rgba(248,70,0,.18);
                    color: #f84600; font: inherit; font-size: 14px; font-weight: 600;
                    transition: background .18s, transform .18s;
                  }
                  .ca-handled-go:hover { background: rgba(248,70,0,.28); transform: translateY(-1px); }
                  .ca-handled-quiet { color: rgba(255,255,255,.35); font: inherit; font-size: 14px; font-weight: 600; }
                  .ca-handled-quiet:hover { color: rgba(255,255,255,.7); }
                  @media (max-width: 640px) {
                    .ca-offer { gap: 20px; padding: 22px; }
                    .ca-offer-copy { font-size: 16px; }
                    .ca-offer-actions { gap: 22px; }
                    .ca-offer-go, .ca-offer-quiet { font-size: 14px; }
                    .ca-handled { gap: 20px; padding: 22px; }
                    .ca-handled-title { font-size: 14px; }
                    .ca-handled-actions { gap: 22px; }
                    .ca-handled-go, .ca-handled-quiet { font-size: 14px; }
                  }
                `}</style>
              )}

              {tail.map((entry) => {
                if (entry.kind === "you") {
                  return (
                    <motion.p
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="ca-you"
                    >
                      {entry.text}
                    </motion.p>
                  );
                }

                if (entry.kind === "said") {
                  return (
                    <motion.p
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="ca-said"
                    >
                      {entry.text}
                    </motion.p>
                  );
                }

                const subject = activeTasks.find((t) => t.id === entry.taskId);
                if (!subject) return null;

                if (entry.kind === "taskHandled" || entry.kind === "taskCard") {
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="ca-handled"
                    >
                      <p className="ca-handled-title">
                        Handled. I&apos;ll keep watching {subject.title.replace(/^Watching\s+/i, "")} and update you here when something meaningful changes.
                      </p>
                      <div className="ca-handled-actions">
                        <button type="button" className="ca-handled-go" onClick={() => onOpenJob?.(subject.id)}>
                          Check it out
                        </button>
                        <button
                          type="button"
                          className="ca-handled-quiet"
                          onClick={() => setTail((items) => items.filter((item) => item.id !== entry.id))}
                        >
                          Dismiss
                        </button>
                      </div>
                    </motion.div>
                  );
                }

                // taskUpdate — the sentence and the card are two different
                // things: the sentence is what happened, the card (with "View
                // details" now live, since armTaskFinding wrote `activity` onto
                // the task) is where it lives afterward.
                return (
                  <div key={entry.id} className="flex flex-col gap-3">
                    <p className="ca-said">{entry.found}</p>
                    <ActiveTaskCard
                      task={subject}
                      onEdit={() => {
                        setEditingTask(subject);
                        setLastTaskId(subject.id);
                        inputRef.current?.focus();
                      }}
                      onPause={() =>
                        applyTaskControl({
                          kind: "pause",
                          task: subject,
                          say: `Paused. I'll stop watching ${subject.title.replace(/^Watching\s+/i, "")} until you say otherwise.`,
                        })
                      }
                      onKeepWatching={() =>
                        applyTaskControl({ kind: "resume", task: subject, say: "Still watching. I'll tell you if it moves again." })
                      }
                      onViewJob={() => onOpenJob?.(subject.id)}
                    />
                  </div>
                );
              })}

              {/* The ask still comes last and on its own — result, then what it
                  saved, then, past a rule and a delay, what to do next. What
                  changed is its weight: as quiet text it read as a footnote and
                  got skipped, so it is now the accent button it always was in
                  intent. Still one line, still below the rule: the separation was
                  what kept it from competing with the delivery, not the greyness. */}
              {delivered && guest && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 border-t border-white/[0.08] pt-6"
                >
                  <button
                    type="button"
                    onClick={() => onRequestSignup?.()}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#f84600] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#ff5a1f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f84600] active:translate-y-px"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Create a free account to keep this
                    {/* the arrow leans out on hover — the only movement on the
                        button, so the colour does not have to shout as well */}
                    <ArrowUpIcon className="size-3.5 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Where the composer lives depends on whether anything has been said yet.
            On an empty screen it's the middle of the page, because it's the only
            thing to do; once there's a conversation it pins to the bottom and
            everything else scrolls behind it. */}
        {pinComposer && (
          <div className="shrink-0 px-5 py-4 sm:px-8">
            <div className="mx-auto w-full max-w-[560px]">
              {composerBox}

              {!guest && (
                <p
                  className="mt-2.5 text-center text-[12px] text-white/30"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  AI can make mistakes. Please verify important information.
                </p>
              )}
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
