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
export type AgentStatus = "working" | "waiting" | "scheduled" | "settled" | "paused";

export const STATUS_LABEL: Record<AgentStatus, string> = {
  working: "Working now",
  waiting: "Needs you",
  scheduled: "Scheduled",
  settled: "Done for now",
  paused: "Paused",
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

export const AGENTS: Agent[] = [
  {
    id: "inbox",
    name: "Inbox Manager",
    role: "Keeps your inbox down to what actually needs you",
    status: "waiting",
    mood: "Four replies, ready when you are.",
    resting: "Inbox Manager has done what it can without you.",
    preview: "4 replies drafted — waiting for you",
    lastActive: "12m ago",
    cadence: "Every morning at 8:00",
    tools: ["gmail", "slack", "gcal"],
    thread: [
      { kind: "you", text: "Keep on top of my inbox. Draft replies for anything routine, but don't send anything without me." },
      { kind: "agent", text: "Got it. I'll go through it every morning and leave the drafts for you to look over." },
      {
        kind: "activity",
        when: "This morning, 8:00",
        lines: ["Checked Gmail", "Reviewed 12 emails", "Drafted 4 replies", "Left 2 for you — they looked personal"],
      },
      {
        kind: "approval",
        text: "4 replies ready to send",
        detail: "Two scheduling confirmations, an invoice acknowledgement and a polite no. Nothing that commits you to anything.",
        confirm: "Review and send",
      },
    ],
  },
  {
    id: "travel",
    name: "Travel Watcher",
    role: "Watches fares on the trips you're thinking about",
    status: "working",
    mood: "Waiting for the price to move.",
    resting: "Travel Watcher is keeping an eye on prices.",
    preview: "Tokyo — $684, down from $828",
    lastActive: "just now",
    cadence: "Checks every hour",
    tools: ["telegram"],
    thread: [
      { kind: "you", text: "Let me know when flights to Tokyo drop below $700." },
      { kind: "agent", text: "I'll keep an eye on it and message you the moment it does." },
      {
        kind: "activity",
        when: "Today",
        lines: ["Checked 6 airlines, hourly", "Cheapest went $842 → $828 → $684", "Dropped below your $700", "Alert sent to Telegram"],
      },
      { kind: "agent", text: "Tokyo in October is $684 return — direct both ways, and it lands inside the dates you gave me. Want me to keep watching in case it falls further?" },
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
