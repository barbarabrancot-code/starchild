/**
 * Lightweight ongoing work, owned by the main chat.
 *
 * This is deliberately not an `Agent`. An agent has a mission, a set of rules, a
 * history, notification channels and a page of its own — it is a worker you
 * decided, on purpose, to stand up. Most of what the main chat notices does not
 * deserve any of that: "keep watching HYPE" is a thing to remember, not a
 * colleague to hire. Giving it the full weight of an agent is how a product ends
 * up with forty agents a year in, most of them one sentence that never needed a
 * page.
 *
 * So an active task is the smaller of the two things this account can have
 * standing. It has a condition, a status, and nothing else that would make it
 * heavy — no watchlist of tools, no notification-channel picker, no controls
 * beyond editing the condition and pausing it. It reports in exactly one place,
 * which is here, in the conversation that made it. `ActiveTaskCard` is where the
 * shape of that shows.
 */

export type ActiveTaskStatus = "active" | "paused" | "possible-setup" | "needs-input";

export const TASK_STATUS_LABEL: Record<ActiveTaskStatus, string> = {
  active: "Active",
  paused: "Paused",
  "possible-setup": "Possible setup",
  "needs-input": "Needs input",
};

export type ActiveTask = {
  id: string;
  /** "Watching HYPE" — a verb and a subject, never a name someone would put on a
   *  business card. That register is reserved for agents. */
  title: string;
  status: ActiveTaskStatus;
  /**
   * What has to be true before it says anything, as one line rather than a list.
   * "Meaningful market changes only" for a broad ask, "Resistance break + volume
   * confirmation + acceptable funding" once it has been given real terms — either
   * way it is read as a single sentence, because a task this small does not
   * warrant the ceremony of a bulleted rule set.
   */
  condition: string;
  /** the tickers it is reading, when the request named any */
  watchlist?: string[];
  lastChecked?: string;
  /** how often it checks — shown on the detail panel; edited by the same kind of
   *  sentence ("make it hourly") a dedicated agent's schedule is */
  frequency?: string;
  /**
   * The same idea as `frequency`, in the register a scheduled job wants rather
   * than a market watcher. "Daily at 09:00" and "Every 15 minutes" are the same
   * *kind* of fact — the Jobs modal shows whichever of the two a given job has,
   * since a condition-based watcher and a recurring calendar sync answer "how
   * often" in different but equally human sentences.
   */
  schedule?: string;
  /** when it will next run, in the same loose prose as everything else here */
  nextRun?: string;
  /** how many times it has actually run — absent, not zero, for something that
   *  does not run on a schedule (a condition-based watcher has nothing to count) */
  runs?: number;
  /** the sentence that created it, kept so a later ask about the same subject can find it */
  origin: string;
  /** filled in once it has something to show — "View details" expands this in place */
  activity?: { when: string; lines: string[] };
  /**
   * The job's own short log — what happened to *it*, not what it observed in the
   * market. "Funding condition added" belongs here; "Volume increased 38%" belongs
   * in `activity`. Kept separate because they answer different questions on the
   * detail panel: one is the job's history, the other is its latest finding.
   */
  history?: string[];
};

/**
 * What a signed-in account already has the main agent holding onto — mirrors
 * `AGENTS` in agentsData.ts for the same reason: this account is meant to have
 * been in use for a while, so it opens with a short history rather than an
 * empty list nobody can picture. The saved "Watching HYPE" conversation reads
 * the first of these live, the same way it reads the dedicated agent seed live
 * — a card that only ever showed what was true when the conversation happened
 * would go stale the instant somebody edited the task from anywhere else.
 */
export const ACTIVE_TASKS: ActiveTask[] = [
  {
    id: "watching-hype",
    title: "Watching HYPE breakout",
    status: "possible-setup",
    condition: "Resistance break + volume confirmation + acceptable funding + open interest is rising",
    watchlist: ["HYPE"],
    lastChecked: "3 minutes ago",
    frequency: "Every 15 minutes",
    origin: "Keep watching HYPE and let me know if it breaks resistance with volume.",
    history: [
      "Created from main chat",
      "Funding condition added",
      "Open interest condition added",
      "Last checked 3 minutes ago",
      "No confirmed breakout yet",
    ],
    activity: {
      when: "Today",
      lines: [
        "Checked HYPE market data every 15 minutes",
        "Resistance tested 3 times",
        "Volume increased 38% above recent average",
        "Open interest is rising",
        "Funding remains neutral",
        "No confirmed breakout yet",
      ],
    },
  },
  {
    id: "flamengo-calendar",
    title: "Flamengo → Google Calendar",
    status: "active",
    condition: "Add Flamengo's next match to my calendar",
    schedule: "Daily at 09:00",
    nextRun: "Tomorrow at 09:00",
    runs: 0,
    origin: "Every day, check if Flamengo has a match and put it on my calendar.",
  },
  {
    id: "faq-update",
    title: "Site FAQ — biweekly update",
    status: "active",
    condition: "Refresh the FAQ page from recent support conversations",
    schedule: "Every 2 weeks",
    nextRun: "In 9 days",
    runs: 6,
    origin: "Every couple of weeks, go through recent support chats and update the FAQ page.",
  },
  {
    id: "morning-brief",
    title: "Morning market brief",
    status: "active",
    condition: "Summarize the watchlist every morning at 8:00",
    frequency: "Every morning at 8:00",
    schedule: "Every day at 08:00",
    nextRun: "Tomorrow at 08:00",
    runs: 22,
    origin: "Give me a quick summary of my watchlist every morning.",
  },
  {
    id: "wallet-check",
    title: "Wallet activity check",
    status: "paused",
    condition: "Only alert on transfers over $10,000",
    schedule: "Every hour",
    runs: 118,
    origin: "Let me know if anything moves in and out of my wallet.",
  },
];
