import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pickScenario, type HeroIntent, type Scenario, type TaskCard } from "./data";
import { StepFlow } from "./StepFlow";
import { GuestSidebar } from "./GuestSidebar";
import { ProductSidebar } from "./ProductSidebar";
import { SignupGate } from "./SignupGate";
import { IntentPicker } from "./IntentPicker";
import { StarchildDot } from "./onboarding/StarchildDot";
import { PresenceOrb } from "./presence/PresenceOrb";
import { FirstMeeting, useFirstMeeting, type Tone } from "./onboarding/FirstMeeting";
import { Reactable } from "./Reactable";
import { ConductorIntroPopover } from "./onboarding/ConductorIntroPopover";
import { AgentSuggestion, AgentMade, ConnectFirst } from "./agents/ChatHandoff";
import { readRequest, sameAsk, type Request } from "./agents/readRequest";
import { useAgents } from "./agents/store";
import { ACCENTS } from "./agents/onboardingData";
import type { Agent } from "./agents/agentsData";
import type { ConnectorId } from "./agents/connectors";
import { SAVED, type SavedChat } from "./savedChats";
import { SavedThread } from "./SavedThread";
import { MarketplaceIntroPopover } from "./onboarding/MarketplaceIntroPopover";
import { AutomateIntroPopover } from "./onboarding/AutomateIntroPopover";
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

export function ChatScreen({
  onBack,
  onOpenMarketplace,
  intents,
  onRequestSignup,
  onLogIn,
  onLearned,
  initialMessage,
  openingMessage,
  task,
  isGuest = false,
  cameFromGuest = false,
  area = "chat",
  onSwitchArea,
  onOpenAgent,
  railed = false,
  onToggleRail,
  skipMeeting = false,
}: {
  /** opened at the signed-in app rather than walked to — see ConductorApp */
  skipMeeting?: boolean;
  /** an agent was made from this conversation and the person wants to go and see it */
  onOpenAgent?: (id: string) => void;
  /** the nav sidebar is down to icons — owned by the app, since two screens share it */
  railed?: boolean;
  onToggleRail?: () => void;
  /** which product area the shell is showing — the sidebar switch reads it */
  area?: "chat" | "agents" | "connectors";
  onSwitchArea?: (next: "chat" | "agents" | "connectors") => void;
  onBack: () => void;
  /** opened from the signed-in sidebar */
  onOpenMarketplace: () => void;
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
  /** signed up from inside the guest chat — the meeting says their work survived */
  cameFromGuest?: boolean;
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
  // The two first-run notes, shown one after the other the moment the meeting
  // ends: the first thing they send is about to be routed, and nothing so far has
  // told them by what, or that there's a Marketplace behind the sidebar.
  // How a single answer is made → what other people have made → work that keeps
  // happening on its own. Three notes, in the order they become useful.
  const [intro, setIntro] = useState<"conductor" | "marketplace" | "automate" | null>(null);
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

  const { isConnected, addAgent } = useAgents();
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
  const [askedBefore, setAskedBefore] = useState<string[]>([]);
  /**
   * "Not now" is a real answer about a request, not about a wording. It is matched
   * back the same way repeats are found — otherwise saying no and then asking the
   * same thing in slightly different words gets the question asked again, which is
   * how a product learns to be ignored.
   */
  const [declined, setDeclined] = useState<string[]>([]);
  /** the agent this conversation produced, if the person asked for one */
  const [made, setMade] = useState<Agent | null>(null);
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
    setMade(null);
    setPending([]);
    setValue("");
    setMeetingOver(true);
  }

  /**
   * Only what the job needs. The conversation may have wandered; the agent
   * inherits the objective, the schedule and the tools that objective reaches for,
   * and nothing else. Connections already belong to the account, so what happens
   * here is a permission rather than a second login.
   */
  function createAgent(job: { name: string; role: string; tools: ConnectorId[]; cadence?: string }) {
    const tools = job.tools.filter((id) => isConnected(id));
    const agent: Agent = {
      id: `a${Date.now()}`,
      name: job.name,
      role: job.role,
      status: "scheduled",
      mood: job.cadence ? `Set up. Runs ${job.cadence}.` : "Set up. Watching from here.",
      resting: `${job.name} has nothing to report yet.`,
      preview: "Just created",
      lastActive: "just now",
      accent: ACCENTS.ember.hex,
      cadence: job.cadence,
      tools,
      thread: [
        // The objective in the person's own words. Paraphrasing it here is how an
        // agent ends up quietly doing a slightly different job than was asked for.
        { kind: "you", text: job.role },
        {
          kind: "agent",
          text: job.cadence
            ? `Got it. I'll do this ${job.cadence} and tell you what I find.`
            : "Got it. I'll keep at this and tell you when something changes.",
        },
        { kind: "agent", text: "I'll check with you first before anything I can't undo." },
      ],
    };
    addAgent(agent);
    setMade(agent);
  }

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
    task: guest ? undefined : task,
    fromGuest: cameFromGuest,
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
    Boolean(reading) ||
    (!guest && (Boolean(opening) || (!meetingOver && meeting.turns.length > 1)));
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
    setMessage(trimmed);
    setReading(null);
    // the composer outlives the send now, so it has to be emptied by hand
    setValue("");
    // On a task card the user only supplies the missing detail ("BTC"), so the
    // standing context is what actually routes the work — their reply alone wouldn't.
    const full = activeTask ? `${activeTask.basePrompt} ${trimmed}` : trimmed;
    setScenario(pickScenario(full));
    // Read once, on send. Guest Mode has no account to connect anything to and no
    // Agents area to put anything in, so it reads nothing at all.
    if (!guest) {
      const req = readRequest(full, askedBefore);
      setAskedBefore((prev) => [...prev, full]);
      setRequest(req);
      setPending(req.needs.filter((id) => !isConnected(id)));
      setMade(null);
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
    setMade(null);
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
    !made &&
    (reading
      ? Boolean(reading.offer)
      : delivered && worthOffering && !declined.some((no) => sameAsk(no, request?.summary ?? "")));
  useEffect(() => {
    if (!offering && !made && pending.length === 0) return;
    const t = setTimeout(scrollToBottom, 620);
    return () => clearTimeout(t);
  }, [offering, made, pending.length]);

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
          meetingTakesText
            ? "Tell me anything…"
            : opening
              ? "Answer however you like…"
              : atHome
                ? "Ask me anything…"
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
              // dismissing it hands over to the Marketplace note
              <ConductorIntroPopover onClose={() => setIntro("marketplace")} />
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
          tasksRemaining={tasksRemaining}
          onLockedFeature={() => onRequestSignup?.()}
        />
      ) : (
        <ProductSidebar
          area={area}
          onSwitchArea={onSwitchArea}
          collapsed={railed}
          onToggleCollapsed={onToggleRail}
          onNewChat={newChat}
          onOpenMarketplace={onOpenMarketplace}
          conversations={SAVED}
          openConversation={reading?.id}
          onOpenConversation={openSaved}
          intro={
            intro === "marketplace" && !guest
              ? {
                  label: "Marketplace",
                  node: (
                    <MarketplaceIntroPopover
                      onExplore={() => {
                        // exploring ends the run: someone who has gone off to look
                        // around is no longer being introduced to anything
                        setIntro(null);
                        onOpenMarketplace();
                      }}
                      // dismissing it hands over to the last note
                      onClose={() => setIntro("automate")}
                    />
                  ),
                }
              : intro === "automate" && !guest
                ? {
                    label: "Work",
                    node: (
                      <AutomateIntroPopover
                        onExplore={() => setIntro(null)}
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
            <span
              className="text-[13.5px] font-medium text-white/55"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Conductor Mode
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
              {opening ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[560px]"
                >
                  {activeTask && (
                    <p
                      className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {activeTask.label}
                    </p>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="mt-1 shrink-0">
                      <StarchildDot state="settled" depth={1} size={9} />
                    </span>
                    <p
                      className="text-[17px] leading-relaxed text-white/90"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {opening}
                    </p>
                  </div>
                </motion.div>
              ) : guest ? (
                // same picker as the hero: the visitor keeps choosing where they left off
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[620px]"
                >
                  <IntentPicker onStartTask={startTask} align="center" intents={intents} />
                </motion.div>
              ) : meetingOpen ? (
                // First authenticated entry: Starchild is already there. No empty
                // box, no setup screen — the onboarding is this conversation, and
                // it can be walked past in one click.
                <FirstMeeting meeting={meeting} fromGuest={cameFromGuest} />
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
                </motion.div>
              )}

              {!pinComposer && composerBox}

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
              {/* Read back out of history: every turn of it, as it happened. */}
              {reading && <SavedThread chat={reading} onReply={setReplyTo} />}

              {!reading && (
              <Reactable align="right" onReply={() => setReplyTo(message)}>
                <div
                  className="max-w-full rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {message}
                </div>
              </Reactable>
              )}

              {/* Blocked, and honestly so: what this needs is not connected, so
                  nothing is running yet. Asked here, answered here, and the work
                  carries on here. */}
              {!reading && pending.length > 0 && (
                <ConnectFirst needs={pending} onReady={() => { setPending([]); scrollToBottom(); }} />
              )}

              {/* The answer goes inside the flow rather than after it, so the run and
                  the answer it produced stay one block on the page. */}
              {!reading && pending.length === 0 && (
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
              )}

              {/* Asked, never assumed. A one-time request never reaches this line,
                  and a standing one only ever gets a question with two answers. */}
              {offering && (reading?.offer || request) && (
                <AgentSuggestion
                  request={reading ? undefined : (request ?? undefined)}
                  because={reading?.offer?.because}
                  onCreate={() => {
                    const job = reading?.offer ?? {
                      name: request!.name,
                      role: request!.summary,
                      tools: request!.needs,
                      cadence: request!.cadence,
                    };
                    createAgent(job);
                    setTimeout(scrollToBottom, 60);
                  }}
                  onDismiss={() =>
                    reading
                      ? setReading({ ...reading, offer: undefined })
                      : setDeclined((d) => [...d, request!.summary])
                  }
                />
              )}

              {/* Made on purpose, said plainly, and the conversation does not move. */}
              {made && <AgentMade agent={made} onOpen={() => onOpenAgent?.(made.id)} />}

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
