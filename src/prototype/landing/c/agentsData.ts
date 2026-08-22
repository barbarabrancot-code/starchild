import type { TaskCard } from "../../data";

// Version C, layer 2 — persistence. Three ways to hand Starchild work that keeps
// happening, each shown as an agent actually working: what it was asked once, what
// it was connected to, what it has been doing since, and where it came back.
//
// The integrations are not decoration. Every tool named in the header turns up
// again in the activity, doing something — that is the only way "connected to"
// means anything rather than being a row of badges.
//
// Deliberately plain language: none of the three tabs is called an agent. The word
// appears once, inside the product view, where it labels the thing being watched.

/** No real marks exist for any of these, so the glyph says the category and the
 *  name says the brand. A drawn approximation of someone's logo would be worse
 *  than an honest generic one. */
export type ToolKind =
  | "flights"
  | "search"
  | "telegram"
  | "mail"
  | "calendar"
  | "slack"
  | "drive"
  | "web";

export type Tool = { name: string; kind: ToolKind };

export type AgentStory = {
  id: string;
  /** the tab: a verb and an object, nothing longer */
  label: string;
  /** what the person said, once */
  request: string;
  agent: { name: string; cadence: string; tools: Tool[] };
  /** what it has done since, oldest first. The last one is what it came back for. */
  activity: { time: string; tool: Tool; action: string; result: string; hit?: boolean }[];
  /** where it reached them — the point being that they did not have to come back */
  delivery: {
    app: Tool;
    lead: string;
    title: string;
    figure: string;
    detail: string;
    cta: string;
  };
  task: TaskCard;
};

const GOOGLE_FLIGHTS: Tool = { name: "Google Flights", kind: "flights" };
const SKYSCANNER: Tool = { name: "Skyscanner", kind: "search" };
const TELEGRAM: Tool = { name: "Telegram", kind: "telegram" };
const GMAIL: Tool = { name: "Gmail", kind: "mail" };
const CALENDAR: Tool = { name: "Google Calendar", kind: "calendar" };
const SLACK: Tool = { name: "Slack", kind: "slack" };
const DRIVE: Tool = { name: "Google Drive", kind: "drive" };
const WEB: Tool = { name: "Web", kind: "web" };
const EMAIL: Tool = { name: "Email", kind: "mail" };

export const AGENT_STORIES: AgentStory[] = [
  {
    id: "watch",
    label: "Watch something",
    request: "Let me know when flights to Tokyo drop below $700.",
    agent: {
      name: "Tokyo flight watcher",
      cadence: "Checks every hour",
      tools: [GOOGLE_FLIGHTS, SKYSCANNER, TELEGRAM],
    },
    activity: [
      { time: "9:00", tool: GOOGLE_FLIGHTS, action: "Checked Google Flights", result: "Cheapest fare: $842" },
      { time: "10:00", tool: SKYSCANNER, action: "Checked Skyscanner", result: "Cheapest fare: $828" },
      { time: "11:00", tool: GOOGLE_FLIGHTS, action: "Compared 6 airlines", result: "No match yet" },
      { time: "12:00", tool: SKYSCANNER, action: "Found a fare below your target", result: "Tokyo — $684 return", hit: true },
    ],
    delivery: {
      app: TELEGRAM,
      lead: "Found a flight below $700.",
      title: "Tokyo in October",
      figure: "$684 return",
      detail: "Direct both ways · matches your dates",
      cta: "View flight",
    },
    task: {
      id: "agent-monitor",
      label: "Set up a watch for me",
      basePrompt: "Keep an eye on this for me and tell me when something meaningful changes.",
      question: "What should I be watching?",
    },
  },
  {
    id: "routine",
    label: "Run a routine",
    request: "Every Sunday, help me plan the week ahead.",
    agent: {
      name: "Week ahead",
      cadence: "Runs every Sunday",
      tools: [CALENDAR, GMAIL, SLACK],
    },
    activity: [
      { time: "18:00", tool: CALENDAR, action: "Read your calendar", result: "12 events, 3 of them clash" },
      { time: "18:01", tool: GMAIL, action: "Scanned your inbox", result: "4 threads still need you" },
      { time: "18:02", tool: CALENDAR, action: "Checked your deadlines", result: "Two both land on Friday" },
      { time: "18:03", tool: SLACK, action: "Put the week together", result: "One clear day: Thursday", hit: true },
    ],
    delivery: {
      app: SLACK,
      lead: "Your week is ready.",
      title: "Thursday is your only clear day",
      figure: "3 things to move",
      detail: "Both deadlines land on Friday · start the smaller one Tuesday",
      cta: "Open the plan",
    },
    task: {
      id: "agent-recurring",
      label: "Take this off my plate",
      basePrompt: "Run this for me on a schedule and report back when it's done.",
      question: "What's the task that keeps coming back?",
    },
  },
  {
    id: "job",
    label: "Give it a job",
    request: "Plan our trip in October. Check with me before booking anything.",
    agent: {
      name: "October trip",
      cadence: "Works in the background",
      tools: [WEB, DRIVE, EMAIL],
    },
    activity: [
      { time: "Mon", tool: DRIVE, action: "Read your trip notes", result: "Dates and budget confirmed" },
      { time: "Tue", tool: WEB, action: "Compared routes", result: "40 options, 6 inside budget" },
      { time: "Wed", tool: WEB, action: "Checked hotels for those dates", result: "3 that fit" },
      { time: "Thu", tool: EMAIL, action: "Put three options together", result: "Nothing booked yet", hit: true },
    ],
    delivery: {
      app: EMAIL,
      lead: "Three options, all inside budget.",
      title: "Best one leaves on the 14th",
      figure: "$210 saved",
      detail: "Nothing is booked — say the word and I'll confirm",
      cta: "See the options",
    },
    task: {
      id: "agent-specialist",
      label: "Give Starchild a job",
      basePrompt: "I want to hand you a job — here's what I want done and what matters to me.",
      question: "What should I take care of for you?",
    },
  },
];
