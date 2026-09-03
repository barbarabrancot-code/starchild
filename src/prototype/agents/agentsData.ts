import type { ConnectorId } from "./connectors";
// The Agents workspace — teammates, not chat modes.
//
// The distinction this data has to carry: an agent exists between conversations.
// It has a standing job, a schedule, apps it is allowed to touch, and a history of
// what it did while nobody was watching. A chat thread has none of that, which is
// why this is a separate area rather than a state inside the chat.
//
// FIRST DRAFT — the shapes here are the argument, not the final schema. Where the
// real product will have live state, this has one plausible snapshot.

/** Mirrors the glyph set in ../landing/c/AgentWindow. The two should become one
 *  module once the landing settles; duplicated for now so this draft doesn't drag
 *  a landing refactor along with it. */
export type AppKind =
  | "mail"
  | "slack"
  | "calendar"
  | "notion"
  | "telegram"
  | "drive"
  | "web"
  | "flights";

export type App = { name: string; kind: AppKind };

export const APPS: Record<string, App> = {
  gmail: { name: "Gmail", kind: "mail" },
  slack: { name: "Slack", kind: "slack" },
  calendar: { name: "Google Calendar", kind: "calendar" },
  notion: { name: "Notion", kind: "notion" },
  telegram: { name: "Telegram", kind: "telegram" },
  drive: { name: "Google Drive", kind: "drive" },
  web: { name: "Web", kind: "web" },
  flights: { name: "Google Flights", kind: "flights" },
};

/**
 * Five states, and they are about the agent rather than the machine. Only
 * "waiting" wants anything from you; the rest are things going fine without you,
 * and a roster where everything glows teaches people to ignore the glow.
 */
export type AgentStatus =
  | "working"
  | "waiting"
  | "scheduled"
  | "settled"
  | "paused"
  /**
   * It has something it will not do without you.
   *
   * Separate from "waiting", and the separation is the point rather than a
   * nicety. "Needs you" is an agent that would like an answer; this is an agent
   * holding a prepared order. Collapsing the two would make the roster say the
   * same word for "shall I keep watching?" and "shall I place this?", and the
   * second is the only one where not looking has a price.
   */
  | "approval";

export const STATUS_LABEL: Record<AgentStatus, string> = {
  working: "Watching",
  waiting: "Needs you",
  scheduled: "Scheduled",
  settled: "No signal yet",
  paused: "Paused",
  approval: "Needs approval",
};

/** A turn in an agent's thread. Activity and approval are not messages — they are
 *  the agent's work surfacing in the conversation, and they look different. */
export type AgentTurn =
  | { kind: "you"; text: string }
  | { kind: "agent"; text: string }
  /** what it did, in the words someone would use about their own inbox */
  | { kind: "activity"; when: string; lines: string[] }
  /** the one thing that stops and asks */
  | { kind: "approval"; text: string; detail: string; confirm: string }
  /** the lightweight "you're all set" that closes the first conversation */
  | { kind: "summary"; name: string; cadence: string; apps: string };

export type Agent = {
  id: string;
  name: string;
  /** one line: what it is for, in the person's terms */
  role: string;
  status: AgentStatus;
  /**
   * The roster line. Not a status and not a log entry — the shortest true thing
   * the agent would say about itself right now. Character comes from the job
   * being described plainly, which is also why none of these are jokes.
   */
  mood: string;
  /** what it says at the foot of its own thread when there is nothing to answer */
  resting: string;
  /** what it last did — kept for the thread header, not the roster */
  preview: string;
  lastActive: string;
  /** identity chosen at creation — see onboardingData for why colour is safe here */
  accent?: string;
  /** still working out its job in conversation, so the composer drives a script */
  onboarding?: boolean;
  /** what it runs on, if anything */
  cadence?: string;
  /**
   * The standing instruction, in the words it was given in.
   *
   * Distinct from `role`, and the distinction is load-bearing. `role` is how the
   * agent is described to a person reading a roster; this is the rule it is
   * actually operating under, and it is the thing the main chat edits when
   * somebody says "only the ones that need a reply". Paraphrasing it on the way
   * in is how an agent ends up doing a slightly different job than was asked for,
   * so it is stored verbatim and only ever appended to.
   */
  instruction?: string;
  /**
   * Where it may reach the person, as against `tools`, which is what it may reach
   * *into*. Starchild itself is not in here: it is not a channel you can turn off,
   * it is where the agent lives. Everything in this list is an outpost.
   */
  alerts?: ConnectorId[];
  /**
   * The tickers it is responsible for.
   *
   * A list rather than prose inside the instruction, because this is the one part
   * of a market agent's job that gets edited by single items — "add PURR",
   * "remove SOL" — and a sentence cannot have one item taken out of it without
   * being rewritten. It is also what lets a second request about a token find the
   * agent that already covers that market instead of starting a rival one.
   */
  watchlist?: string[];
  /**
   * What has to be true before it interrupts you, one clause per entry.
   *
   * A list because these accumulate and are read back as a set: "price breaks
   * resistance, volume confirms, funding is acceptable, and open interest is
   * rising" is four decisions made on four different days. Held as one string
   * they could only be appended to, so the fourth amendment would produce a
   * sentence with three "and"s and no way to remove the second condition without
   * retyping the other three.
   */
  conditions?: string[];
  /**
   * Whether it must ask before it acts.
   *
   * Defaults to true wherever an agent is created, and nothing in this prototype
   * offers a way to set it false. An execution gate that can be turned off by the
   * same conversation that turns it on is not a gate; if this ever becomes
   * settable, it belongs behind an explicit, separate act of configuration and
   * not behind a sentence typed into a chat.
   */
  approval?: boolean;
  /**
   * Whether it has been asked to prepare orders at all.
   *
   * Distinct from `approval`, and conflating the two was a real mistake worth
   * naming: `approval` is the gate, and it is up on every agent from birth.
   * Gating the strategy card on it therefore meant *every* watcher eventually
   * offered a trade — the product proposing positions to someone who had only
   * ever asked to be told when a price moved.
   *
   * This is the other half: the person asked for a strategy. Both must be true
   * before anything resembling an order is drawn, and only one of them is ever
   * set by a sentence.
   */
  execution?: boolean;
  /**
   * The policy it operates under — set once, at creation, and read-only after
   * that everywhere except the drawer.
   *
   * Distinct from `conditions`, which is a single alert trigger built out of
   * clauses joined by "and". A rule is not a trigger: "Do not suggest execution
   * unless asked" is never going to be one term in an "alert when" sentence, it
   * is a standing constraint on how the agent behaves. Dedicated agents made
   * through the Agents-area form get their rules from the form, written once and
   * shown as a short list on the page — the operational half of "mission, rules,
   * activity, controls" that separates a dedicated worker from a task the main
   * chat is just holding onto.
   */
  rules?: string[];
  /** what it did last and when, for the one-line status the chat shows */
  lastChecked?: string;
  /** when it next runs, for the same line. Only set on a scheduled agent. */
  nextRun?: string;
  /** Which connectors this agent may use. Ids, not copies: the connection lives
   *  once on the account, and this is only the permission to reach it. */
  tools: ConnectorId[];
  thread: AgentTurn[];
};

/**
 * Work passing between agents, which is the one thing a roster can show that a
 * single thread cannot. One pair, played once when the workspace opens: Research
 * finishes reading and hands the write-up to Project Assistant. It is a signal
 * travelling down the roster, not a workflow diagram — the point is that they
 * talk to each other, not how.
 */
export const HANDOFF = {
  from: "research",
  to: "project",
  says: "Research Agent passed the pricing write-up to Project Assistant.",
};

/**
 * The roster a signed-in account opens with.
 *
 * Inbox Manager and Travel Watcher used to be seeded here and are deliberately
 * not, because both are agents the product is supposed to be able to *make* —
 * one from a repeated request, one from a sentence that says outright it wants
 * something watched. Shipping them pre-made meant every path that created one
 * hit the rule that says do not create a second agent for a job an agent already
 * has, and widened the seeded one instead. The rule was right; the fixture was
 * wrong.
 *
 * HYPE Watcher used to be seeded here too, and was taken back out for a reason
 * worth recording rather than quietly reverting: it was standing in for the
 * wrong tier. Under the model this account now follows, "keep watching HYPE" is
 * simple ongoing work — an active task the main agent holds, with no page of its
 * own — and a saved conversation elsewhere narrates exactly that, live-reading
 * `activeTasks` rather than the roster. Giving it a dedicated agent's page was
 * the earlier, coarser version of the product; this file no longer makes that
 * claim about it.
 *
 * Hyperliquid Funding Watcher is what a dedicated agent actually looks like
 * under the current model: stood up on purpose, from the Agents area's own
 * creation form, for a job specific enough to want a mission, a watchlist, a set
 * of standing rules, and a page to hold all of it. It is seeded as history for
 * the same reason Research Agent and the others are — work already running
 * before today — while the *creation* of one like it is a thing you can still do
 * live, right now, with "+ New agent."
 */
export const AGENTS: Agent[] = [
  {
    id: "funding-watcher",
    name: "Hyperliquid Funding Watcher",
    role: "Tracks funding rates across the user's Hyperliquid watchlist.",
    status: "working",
    mood: "No unusual funding changes yet.",
    resting: "Hyperliquid Funding Watcher has nothing new to report.",
    preview: "No unusual funding changes yet",
    lastActive: "2h ago",
    // PURR joined this list at 13:42 via the main chat — see the activity entry
    // below. The watchlist reflects that now; scenario 6's four-ticker list was
    // the state at creation, before the delegation this seed also demonstrates.
    watchlist: ["HYPE", "SOL", "ETH", "BTC", "PURR"],
    rules: [
      "Alert when funding becomes unusually positive or negative.",
      "Include market context before alerting.",
      "Do not suggest execution unless asked.",
    ],
    // The account already has Telegram connected — see INITIAL_CONNECTIONS — and
    // this was picked as a channel on purpose in the creation form, per
    // scenario 6, rather than defaulted the way a task's alerts are not.
    alerts: ["telegram"],
    instruction: "Track funding rates across my watchlist and alert me when conditions become unusual.",
    lastChecked: "last checked funding rates 2 hours ago",
    tools: [],
    thread: [
      { kind: "you", text: "Track funding rates across my watchlist and alert me when conditions become unusual." },
      {
        kind: "agent",
        text: "Got it. I'll watch HYPE, SOL, ETH and BTC and only interrupt you when funding actually moves out of the ordinary.",
      },
      {
        kind: "activity",
        when: "13:42",
        lines: ["PURR added to watchlist from main chat."],
      },
      {
        kind: "activity",
        when: "13:55",
        lines: [
          "Unusual funding detected on HYPE.",
          "Funding moved unusually positive.",
          "Market context added.",
          "Alert sent to Starchild and Telegram.",
        ],
      },
    ],
  },
  {
    id: "wallet-tracker",
    name: "Wallet Tracker",
    role: "Watches a wallet's on-chain activity and flags transfers worth knowing about.",
    status: "working",
    mood: "Nothing unusual since yesterday.",
    resting: "Wallet Tracker is still watching.",
    preview: "Nothing unusual since yesterday",
    lastActive: "40m ago",
    watchlist: ["HYPE"],
    rules: [
      "Alert on transfers over $10,000.",
      "Flag new counterparties the wallet has not interacted with before.",
      "Do not suggest execution unless asked.",
    ],
    alerts: ["telegram"],
    instruction: "Watch this wallet's on-chain activity and flag anything worth knowing about.",
    lastChecked: "last checked 40 minutes ago",
    tools: ["hyperliquid"],
    thread: [
      { kind: "you", text: "Keep an eye on this wallet and let me know if anything unusual moves through it." },
      { kind: "agent", text: "Got it. I'll watch it and only flag transfers that are actually worth your attention." },
    ],
  },
  {
    id: "research",
    name: "Research Agent",
    role: "Digs into things properly and comes back with the shape of it",
    status: "working",
    mood: "Still reading.",
    resting: "Research Agent is still reading.",
    preview: "Reading 9 sources on the pricing question",
    lastActive: "3m ago",
    tools: ["notion", "gdrive"],
    thread: [
      { kind: "you", text: "Look into how the AI tools people actually pay for are priced. I want the pattern, not a list." },
      { kind: "agent", text: "I'll work through it and come back with what the pattern is rather than a table of everyone." },
      {
        kind: "activity",
        when: "In progress",
        lines: ["Read 9 sources", "Pulled pricing from 14 products", "Writing it up in Notion"],
      },
    ],
  },
  {
    id: "project",
    name: "Project Assistant",
    role: "Keeps the week honest and tells you what slipped",
    status: "scheduled",
    mood: "Keeps an eye on what slips.",
    resting: "Project Assistant is waiting for Monday.",
    preview: "Next run Monday, 9:00",
    lastActive: "Friday",
    cadence: "Every Monday at 9:00",
    tools: ["gmail", "gcal", "notion"],
    thread: [
      { kind: "you", text: "Every Monday, tell me where the project actually is — not where the board says it is." },
      { kind: "agent", text: "I'll go through the calendar and the docs each Monday and give you the honest version." },
      {
        kind: "activity",
        when: "Last Monday",
        lines: ["Read the calendar and Notion", "3 tasks moved for the second week running", "Posted the summary to Slack"],
      },
      { kind: "agent", text: "One thing worth saying out loud: the design review has moved twice. It's the only thing blocking two other tasks." },
    ],
  },
  {
    id: "trading",
    name: "Trading Agent",
    role: "Watches your positions and steps in only where you allowed it",
    status: "paused",
    mood: "Watching, not acting.",
    resting: "Trading Agent is paused. Nothing will be placed.",
    preview: "Paused — you turned execution off",
    lastActive: "2 days ago",
    tools: ["telegram"],
    thread: [
      { kind: "you", text: "Pause anything that touches execution. Keep watching, just don't act." },
      { kind: "agent", text: "Paused. I'll keep monitoring and tell you what I see, but I won't place anything." },
      {
        kind: "activity",
        when: "Since then",
        lines: ["Monitoring 4 positions", "No orders placed", "2 alerts sent"],
      },
    ],
  },
];
