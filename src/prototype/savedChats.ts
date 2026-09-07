import type { ConnectorId } from "./agents/connectors";

/**
 * Conversations this account already had, kept as transcripts.
 *
 * These are recordings, not scripts to be re-run. The signed-in user of this
 * prototype has been using Starchild for a while — the agent roster arrives seeded
 * for the same reason — and the thing that is only visible in a history is a
 * pattern: the same favour asked twice, weeks apart, in a conversation nobody
 * would sit and re-type to see.
 *
 * The suggestion at the end of one is written rather than derived, because a
 * recorded conversation is data. Live typing still goes through readRequest, which
 * spots the same pattern on its own.
 */

export type SavedTurn =
  /** the person. No reactions here — that is an Agent-thread thing, where
   *  Starchild is the one other voice in the conversation; the main chat
   *  never carries one. */
  | { who: "you"; text: string }
  /** Starchild */
  | { who: "ai"; text: string }
  /** a tool being connected mid-task, kept in the transcript because it happened */
  | { who: "connected"; app: ConnectorId; note: string }
  /** time passing between one ask and the next — the whole point of the second one */
  | { who: "gap"; text: string }
  /**
   * What Starchild worked out before answering — the status line itself, not
   * a generic "show reasoning" label, so the collapsed row already says the
   * one true thing ("Checking your Gmail connection now.") rather than
   * announcing that something is hidden behind it. `lines` is folded away
   * until clicked open — true and worth keeping, just not something reading
   * the transcript should mean reading through.
   */
  | { who: "reasoning"; label: string; lines: string[] }
  /** the agent came back with something, mid-transcript rather than only on its own page */
  | { who: "signal"; agentId: string; found: string; tightenLabel?: string; detailsLabel?: string }
  /** what the same finding looked like somewhere that is not Starchild */
  | { who: "external"; agentId: string; headline: string; detail: string }
  /** the same idea as "signal", for an active task — read live from `activeTasks` */
  | { who: "taskUpdate"; taskId: string; found: string }
  /** the moment before a connector gets added — see ConnectorChoice */
  | { who: "connectorChoice" }
  /**
   * A small orange dot and one line — what's now watching, changed, or worth
   * a look, without the weight of a card. Purely informative: status lines
   * are for awareness, never a button — see StatusLine. If something needs a
   * decision, that's a "decision" turn instead, not a click waiting to reveal one.
   */
  | { who: "status"; label: string }
  /**
   * The one thing that stops and asks — a real decision, not an update. The
   * modal is on screen the moment this turn is, never gated behind a click:
   * the bubble right before it already said why a decision is needed, so
   * asking someone to click again just to see the choice would be asking
   * twice.
   */
  | {
      who: "decision";
      title: string;
      subtitle?: string;
      options: { letter: string; label: string; desc?: string }[];
      /** already decided, read back out of history — renders collapsed, not waiting for a click */
      picked?: string;
    }
  /** a connector actually landing, mid-conversation — see ConnectorAdded */
  | { who: "connectorAdded"; id: ConnectorId };

export type SavedChat = {
  id: string;
  /** what the sidebar calls it */
  title: string;
  when: string;
  turns: SavedTurn[];
  /**
   * What Starchild noticed, and what it would make. `because` is the sentence that
   * has to be checkable — the person remembers doing the thing it names.
   */
  offer?: {
    because: string;
    name: string;
    role: string;
    prompt?: string;
    tools: ConnectorId[];
    cadence?: string;
  };
};

export const SAVED: SavedChat[] = [
  /*
    Scenarios 3 and 4, one conversation, about the task the account already has
    — `watching-hype` in the seeded `ACTIVE_TASKS`. Scenario 2 is deliberately
    not retold here: it is better shown live than replayed, because its whole
    point is a suggestion someone acts on, and this account's own history
    already sets that up — type "Can you check HYPE again and tell me if
    anything meaningful changed?" into the composer and the same repeat
    detection that wrote this transcript's realism fires for real.

    Running scenario 2's creation moment through this SAME market right before
    scenario 3's would also have collided with rule five: a second "watch HYPE"
    request would have widened the task scenario 2 just made rather than
    starting the specific, freshly-worded one scenario 3's copy describes. Kept
    apart, each scenario stays the thing it is actually demonstrating.
  */
  {
    id: "hype-watching-story",
    title: "Watching HYPE",
    when: "Today",
    turns: [
      { who: "you", text: "Keep watching HYPE and let me know if it breaks resistance with volume." },
      {
        who: "ai",
        text: "Got it. I'll watch HYPE for a resistance break with volume confirmation and update you here.",
      },
      { who: "status", label: "Watching HYPE breakout" },

      { who: "you", text: "Also check funding before alerting me." },
      {
        who: "ai",
        text: "Updated. I'll only alert you if funding conditions are acceptable too.",
      },
      { who: "status", label: "Watching · funding added" },

      { who: "you", text: "Make it stricter. Only alert me if open interest is rising too." },
      {
        who: "ai",
        text: "Updated. I'll only alert you if resistance breaks with volume confirmation, acceptable funding, and rising open interest.",
      },
      { who: "status", label: "Watching · stricter conditions" },

      { who: "gap", text: "11:26" },

      // Awareness, not a decision — nothing here needs an answer, so it's a
      // status line and nothing more.
      {
        who: "taskUpdate",
        taskId: "watching-hype",
        found:
          "HYPE update: possible setup forming. Price is testing resistance, volume is rising, open interest is increasing, and funding remains neutral. It has not confirmed the breakout yet, so I'll keep watching.",
      },

      { who: "gap", text: "13:40" },

      // Now it is a decision — so the modal is just here, not behind a click
      // on a status line pretending it might not be.
      {
        who: "ai",
        text: "HYPE confirmed the breakout. I prepared a possible long strategy, but I need your approval before placing anything.",
      },
      {
        who: "decision",
        title: "What should I do?",
        options: [
          { letter: "A", label: "Approve strategy", desc: "Place the order with the proposed entry, stop loss, and take profit" },
          { letter: "B", label: "Edit strategy", desc: "Adjust entry, risk, stop loss, or take profit first" },
          { letter: "C", label: "Reject", desc: "Do not place the trade" },
        ],
      },
    ],
  },

  /*
    Scenarios 7 and 8 — the main chat talking to a dedicated agent that already
    exists, rather than making one.

    The shape here is the whole point being demonstrated: the first exchange is
    two lines of plain text, no card, because a delegated change is a sentence,
    not a conversation the dedicated agent's page needs a second copy of — open
    Travel Watcher afterward and the same change is sitting there as one line
    in its activity log, timestamped, not replayed as a transcript. Only when
    the agent itself found something does a card appear here at all, and even
    then it is three actions, not four: "Open agent" for depth, not "View
    details" for an expansion that has nowhere to expand to in a main chat that
    was never holding this agent's history to begin with.
  */
  {
    id: "travel-watcher-delegate",
    title: "Travel watchlist",
    when: "Today",
    turns: [
      { who: "you", text: "Add flights to Brazil to the travel watchlist." },
      { who: "ai", text: "Sent to Travel Watcher. Flights to Brazil are now part of the watchlist." },

      { who: "gap", text: "14:47" },

      {
        who: "signal",
        agentId: "travel",
        found: "Travel Watcher found a fare drop to Brazil. Open the agent for details, or keep watching.",
        detailsLabel: "Open agent",
      },
    ],
  },

  /*
    A one-off, and the most recent thing in the history for exactly that reason:
    it is the scenario meant to be read first, and it exists to draw the line the
    rest of this file lives on the other side of. "Analyze HYPE today" is a
    question with an answer, not a standing condition — nothing about it survives
    past being read, so nothing here reaches for an `offer`. A history where
    every conversation turns into an agent would make the suggestion look like
    something that happens to everything, and the whole point is that it does not.
  */
  {
    id: "hype-analysis",
    title: "Analyze HYPE",
    when: "Today",
    turns: [
      { who: "you", text: "Analyze HYPE today. What changed?" },
      {
        who: "ai",
        text: "HYPE is up today with stronger volume and neutral funding. The move looks momentum-driven, but it has not confirmed a clean breakout yet.",
      },
    ],
  },
  /*
    Adding a connector to an agent that already exists, asked and answered
    inside the conversation rather than by leaving it for the agent's own
    settings page. Cut off right at the open choice, the same way
    "hype-analysis" is cut off at its own answer — the point being
    demonstrated is the card, not a resolution nothing here actually decided.
  */
  {
    id: "add-connector",
    title: "Add a connector",
    when: "Today",
    turns: [
      { who: "you", text: "Can you add a connector to Research Agent?" },
      { who: "ai", text: "Sure. Which one do you want to plug in?" },
      { who: "connectorChoice" },
    ],
  },
  /*
    The other half of "connect a tool mid-task", and now the fuller version of
    it: not the one-line "connected" "joao" folds into its own request, but
    what actually happens when the thing being asked for turns out to need a
    tool nobody has connected yet — the reasoning, the decision to go ahead
    (rendered picked, since this is history being read back), the connector
    actually landing, and Starchild picking the conversation back up once it
    has.
  */
  {
    id: "check-mail",
    title: "Check my mail",
    when: "Today",
    turns: [
      { who: "ai", text: "Hey! What can I help you with today?" },
      { who: "you", text: "can you check my mail" },
      { who: "ai", text: "I'll help you check your mail." },
      {
        who: "reasoning",
        label: "Checking your Gmail connection now.",
        lines: [
          "You don't have Gmail connected yet — your connections list is empty, so there's nothing for me to check.",
          "To set it up, I can send you a connect prompt. It's a one-time OAuth flow (you'll sign in with your Google account in a popup on the web app), and after that I can read, search, draft, and send email whenever you ask.",
        ],
      },
      { who: "ai", text: "Want me to trigger the Gmail connection now?" },
      { who: "you", text: "Yes, connect my Gmail" },
      {
        who: "decision",
        title: "Connect the Gmail connector?",
        options: [
          { letter: "A", label: "Yes, connect" },
          { letter: "B", label: "Not now" },
        ],
        picked: "A",
      },
      { who: "ai", text: "Connecting Gmail now — a card should appear below for you to authorize the Google account." },
      { who: "connectorAdded", id: "gmail" },
      { who: "ai", text: "Gmail connected. Want me to look at your inbox now?" },
    ],
  },
  {
    id: "joao",
    title: "Emails to João",
    when: "Today",
    turns: [
      { who: "you", text: "Send an email to João asking if he can review the deck before Friday." },
      {
        who: "ai",
        text: "Happy to. I'll need your mail for that — connect Gmail and I'll write it and show you before it goes.",
      },
      { who: "connected", app: "gmail", note: "Connected as barbara@starchild.ai" },
      {
        who: "ai",
        text: "Sent. I asked him to look at the deck before Friday and to flag anything he'd change.",
      },

      { who: "gap", text: "Thu, Sep 3 09:14" },

      { who: "you", text: "Send João another email — ask whether he's had a chance to look at the deck yet." },
      { who: "ai", text: "Sent. I kept it short and asked if he's had a look." },
    ],
    // Task-shaped, not agent-shaped: under this model, checking João's replies a
    // few times is exactly the "simple ongoing work" that stays with the main
    // agent — no page of its own, just a title and a condition the main chat
    // holds onto. Structurally the same `offer` field a dedicated-agent offer
    // used to fill; `tools`/`cadence` go unused for a task and stay only because
    // narrowing the type for one saved chat was not worth the churn.
    offer: {
      because:
        "You've asked me to check João's emails a few times. Want me to keep watching for new replies and summarize what needs your attention?",
      name: "Watching João's inbox",
      role: "Watches new replies from João and summarizes what needs your attention.",
      prompt: "Keep watching João's inbox for new replies and summarize what needs my attention. Update me here when something meaningful changes.",
      tools: ["gmail"],
      cadence: "every couple of days",
    },
  },

];
