import type { AppKind } from "./agentsData";

/**
 * One catalog, one connection layer, for the whole of Starchild.
 *
 * There are three states and they are deliberately different words, because
 * conflating any two of them is how integration UIs become confusing:
 *
 *   available   — it exists in the catalog. Nothing has happened.
 *   connected   — you authenticated it once, for your account.
 *   enabled     — a particular agent is allowed to use it.
 *
 * You connect Gmail to Starchild once. After that, letting an agent use it is a
 * permission, not another login — which is why nothing here is per-agent except
 * the list of ids on the agent itself.
 */

export type ConnectorId =
  | "gmail"
  | "gcal"
  | "gdrive"
  | "notion"
  | "slack"
  | "telegram"
  | "github"
  | "jira"
  | "figma"
  | "salesforce"
  | "hubspot"
  | "linkedin"
  | "zoom"
  | "ms365"
  | "hyperliquid";

export type Connector = {
  id: ConnectorId;
  name: string;
  /** which glyph stands in for it — see AppIcon */
  kind: AppKind;
  /** one line, so a row means something without being opened */
  what: string;
  /**
   * What enabling it lets an agent do, in the words of the person granting it.
   * These are the permissions screen: "Read your mail" is a sentence someone can
   * agree or disagree with, "gmail.readonly" is not.
   */
  grants: string[];
};

export const CATALOG: Connector[] = [
  { id: "gmail", name: "Gmail", kind: "mail", what: "Mail", grants: ["Read your mail", "Draft replies", "Send only with your approval"] },
  { id: "gcal", name: "Google Calendar", kind: "calendar", what: "Calendar", grants: ["See your events", "Suggest times", "Create events with your approval"] },
  { id: "gdrive", name: "Google Drive", kind: "drive", what: "Files", grants: ["Read files you share with it", "Create new documents"] },
  { id: "notion", name: "Notion", kind: "notion", what: "Docs and databases", grants: ["Read pages you share", "Write to pages you choose"] },
  { id: "slack", name: "Slack", kind: "slack", what: "Team messages", grants: ["Read channels you choose", "Post as itself, never as you"] },
  { id: "telegram", name: "Telegram", kind: "telegram", what: "Messages to you", grants: ["Send you messages", "Never read your other chats"] },
  { id: "github", name: "GitHub", kind: "drive", what: "Code and issues", grants: ["Read repositories you choose", "Comment on issues"] },
  { id: "jira", name: "Jira", kind: "drive", what: "Tickets", grants: ["Read issues", "Move and comment with your approval"] },
  { id: "figma", name: "Figma", kind: "drive", what: "Design files", grants: ["Read files you share", "Leave comments"] },
  { id: "salesforce", name: "Salesforce", kind: "web", what: "Customers", grants: ["Read records you choose", "Update only with your approval"] },
  { id: "hubspot", name: "HubSpot", kind: "web", what: "Contacts and deals", grants: ["Read contacts and deals", "Log activity"] },
  { id: "linkedin", name: "LinkedIn", kind: "web", what: "Your network", grants: ["Read your feed and messages", "Never post as you"] },
  { id: "zoom", name: "Zoom", kind: "calendar", what: "Meetings", grants: ["See your meetings", "Read recordings you share"] },
  { id: "ms365", name: "Microsoft 365", kind: "mail", what: "Mail and files", grants: ["Read your mail and files", "Draft, never send"] },
  { id: "hyperliquid", name: "Hyperliquid", kind: "flights", what: "Market data and positions", grants: ["Read prices, funding and open interest", "Read your positions", "Never place an order"] },
];

export const BY_ID: Record<ConnectorId, Connector> = Object.fromEntries(
  CATALOG.map((c) => [c.id, c]),
) as Record<ConnectorId, Connector>;

/** What the account has actually authenticated. One row per connector, ever. */
export type Connection = {
  id: ConnectorId;
  /** the account it was authenticated as — the thing people forget and need to check */
  account: string;
  since: string;
};

export const INITIAL_CONNECTIONS: Connection[] = [
  { id: "gmail", account: "barbara@starchild.ai", since: "connected in March" },
  { id: "gcal", account: "barbara@starchild.ai", since: "connected in March" },
  { id: "notion", account: "Starchild workspace", since: "connected in April" },
  { id: "slack", account: "Starchild · #general", since: "connected in April" },
  { id: "telegram", account: "@barbara", since: "connected last week" },
  { id: "hyperliquid", account: "0x4a91…e02c", since: "connected last week" },
];
