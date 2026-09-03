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
  /** the person */
  | { who: "you"; text: string }
  /** Starchild */
  | { who: "ai"; text: string }
  /** a tool being connected mid-task, kept in the transcript because it happened */
  | { who: "connected"; app: ConnectorId; note: string }
  /** time passing between one ask and the next — the whole point of the second one */
  | { who: "gap"; text: string }
  /**
   * A dedicated agent, at the point in the story where it exists.
   *
   * Rendered live — reading the real roster, not a snapshot frozen at the moment
   * this line was written — for the same reason the chat's own inline card does:
   * a card that only ever showed what was true when the conversation happened
   * would go stale the instant somebody edited the agent from anywhere else, and
   * a saved conversation whose cards silently lie is worse than one that has none.
   */
  | { who: "made"; agentId: string }
  /** the agent came back with something, mid-transcript rather than only on its own page */
  | { who: "signal"; agentId: string; found: string; tightenLabel?: string; detailsLabel?: string }
  /** what the same finding looked like somewhere that is not Starchild */
  | { who: "external"; agentId: string; headline: string; detail: string }
  /** the same idea as "made", for an active task rather than a dedicated agent —
   *  read live from `activeTasks` */
  | { who: "taskCard"; taskId: string }
  /** the same idea as "signal", for an active task */
  | { who: "taskUpdate"; taskId: string; found: string };

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

      { who: "you", text: "Also check funding before alerting me." },
      {
        who: "ai",
        text: "Updated. I'll only alert you if funding conditions are acceptable too.",
      },

      { who: "you", text: "Make it stricter. Only alert me if open interest is rising too." },
      {
        who: "ai",
        text: "Updated. I'll only alert you if resistance breaks with volume confirmation, acceptable funding, and rising open interest.",
      },

      // Everything above is talk; this is the task those sentences actually
      // produced. Read live, so it shows the condition exactly as the
      // conversation left it rather than a copy frozen at the moment this line
      // was written.
      { who: "taskCard", taskId: "watching-hype" },

      { who: "gap", text: "A few minutes later" },

      {
        who: "taskUpdate",
        taskId: "watching-hype",
        found:
          "HYPE update: possible setup forming. Price is testing resistance, volume is rising, open interest is increasing, and funding remains neutral.",
      },
    ],
  },

  /*
    Scenarios 7 and 8 — the main chat talking to a dedicated agent that already
    exists, rather than making one.

    The shape here is the whole point being demonstrated: the first exchange is
    two lines of plain text, no card, because a delegated change is a sentence,
    not a conversation the dedicated agent's page needs a second copy of — open
    Hyperliquid Funding Watcher afterward and the same change is sitting there as
    one line in its activity log, timestamped, not replayed as a transcript.
    Only when the agent itself found something does a card appear here at all,
    and even then it is three actions, not four: "Open agent" for depth, not
    "View details" for an expansion that has nowhere to expand to in a main chat
    that was never holding this agent's history to begin with.
  */
  {
    id: "funding-watcher-delegate",
    title: "Funding watchlist",
    when: "Today",
    turns: [
      { who: "you", text: "Add PURR to the funding watchlist." },
      { who: "ai", text: "Sent to Hyperliquid Funding Watcher. PURR is now part of the funding watchlist." },

      { who: "gap", text: "Thirteen minutes later" },

      {
        who: "signal",
        agentId: "funding-watcher",
        found: "Hyperliquid Funding Watcher found unusual funding on HYPE. Open the agent for details, or keep watching.",
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

      { who: "gap", text: "Two days later" },

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
