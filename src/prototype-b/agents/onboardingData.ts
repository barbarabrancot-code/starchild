import type { AppKind } from "./agentsData";

// What the first-run onboarding offers. Copy and options live here so neither
// requires reading JSX to change.

/**
 * The accents an agent can be given.
 *
 * A note on the one tension in this screen: orange means something everywhere else
 * in Starchild — active, alive, needs you — so letting an agent be teal risks
 * spending that meaning on decoration. It doesn't, because status is never carried
 * by colour here: it is carried by form and motion (a ring for waiting, a wander
 * for working, stillness and grey for paused). The accent says *who*; the form
 * says *what is happening*. Ember stays the default, so the common case is still
 * the brand.
 *
 * Deliberately muted. A saturated set would read as a toy.
 */
export const ACCENTS = {
  ember: { name: "Ember", hex: "#f84600" },
  amber: { name: "Amber", hex: "#d08a1c" },
  moss: { name: "Moss", hex: "#5b8c62" },
  tide: { name: "Tide", hex: "#4a7fa5" },
  plum: { name: "Plum", hex: "#8a5f95" },
  ash: { name: "Ash", hex: "#8d8a86" },
} as const;

export type AccentId = keyof typeof ACCENTS;

/** Optional, and offered after the name field rather than before it: a template is
 *  a shortcut for people who want one, not a decision everyone has to make. */
export const TEMPLATES = [
  { id: "project", name: "Project Assistant", gets: "Tells you what actually moved." },
  { id: "inbox", name: "Inbox Manager", gets: "Drafts the routine replies." },
  { id: "travel", name: "Travel Watcher", gets: "Watches a fare and tells you." },
  { id: "research", name: "Research Agent", gets: "Reads properly, comes back with the shape." },
] as const;

/**
 * The connectors, as one flat searchable list. Grouping helped when the list was
 * per-agent and short; at account level with fifteen of them, search is what people
 * actually use.
 *
 * NOTE — no brand marks exist in the project, so each tile shows a category glyph
 * and the name. Real logos are the highest-value asset gap on this screen.
 */
export const TOOLS: { name: string; kind: AppKind }[] = [
  { name: "Google Workspace", kind: "mail" },
  { name: "Slack", kind: "slack" },
  { name: "Notion", kind: "notion" },
  { name: "Salesforce", kind: "web" },
  { name: "Microsoft 365", kind: "mail" },
  { name: "LinkedIn", kind: "web" },
  { name: "Zoom", kind: "calendar" },
  { name: "GitHub", kind: "drive" },
  { name: "Jira", kind: "drive" },
  { name: "Figma", kind: "drive" },
  { name: "HubSpot", kind: "web" },
  { name: "Canva", kind: "drive" },
  { name: "Google Calendar", kind: "calendar" },
  { name: "Gmail", kind: "mail" },
  { name: "Telegram", kind: "telegram" },
];

/**
 * The first conversation, which is where the job actually gets defined.
 *
 * Two follow-ups, not three: the greeting already asks one ("what do you want me
 * on first?"), so three more would make four questions, and four questions is a
 * questionnaire. One at a time, in the order a colleague would ask them.
 */
export const FIRST_QUESTIONS = [
  "How often should I check?",
  "And should I ask you before I act on anything?",
];

export const GREETING = (who: string) => [
  `Hey ${who}. Good to meet you.`,
  "What do you want me on first?",
];
