import { CATALOG, type ConnectorId } from "./connectors";

/**
 * Telling an errand from a job.
 *
 * The whole distinction between the two product areas rests here: Chat is "do this
 * now", an Agent is "keep doing this for me". Getting that wrong in either
 * direction is expensive, but not symmetrically so — a missed suggestion costs one
 * click in the Agents area, while a wrongly created agent leaves someone with a
 * standing thing in their account that they did not ask for and may not notice.
 *
 * So this reads conservatively. It only says "recurring" when the person said
 * something that has no one-time meaning: a schedule, a duration, a standing
 * condition to watch for. "Summarize these emails" is an errand even though an
 * agent could do it. And it never acts on the answer — the most it can do is put a
 * question on screen. Creating is always a click someone made on purpose.
 */

export type Request = {
  /** does this imply responsibility that outlives the answer */
  recurring: boolean;
  /**
   * How many times this has now been asked for, counting this one. Asking the
   * same favour twice is a habit that nobody happened to phrase as a standing
   * job — which makes it a better signal than the words, not a weaker one,
   * because it is behaviour rather than grammar.
   */
  repeats: number;
  /** the schedule in the person's own words, when they gave one */
  cadence?: string;
  /** what the agent would be for, in one line, using their words not ours */
  summary: string;
  /** a name to propose — editable everywhere it is shown */
  name: string;
  /** the tools the request reaches for, whether or not they are connected */
  needs: ConnectorId[];
};

/**
 * Phrases that only get said when someone means "and keep doing it". A bare verb
 * is never enough: "check my calendar" is an errand, "check my calendar every
 * morning" is a job, and the difference is entirely in what was added.
 */
const ONGOING: RegExp[] = [
  /\bevery\s+(morning|afternoon|evening|night|day|week|month|hour|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
  /\beach\s+(morning|day|week|month|monday|tuesday|wednesday|thursday|friday)\b/i,
  /\b(daily|weekly|monthly|nightly|hourly)\b/i,
  /\bkeep\s+(an eye|track|tabs|me posted|watching|following|checking|doing|going)/i,
  /\b(watch|monitor|track)\b/i,
  /\blet me know\s+(if|when|as soon as|whenever)\b/i,
  /\b(alert|notify|ping|warn)\s+me\b/i,
  /\bfrom now on\b/i,
  /\bgoing forward\b/i,
  /\bevery time\b/i,
  /\bwhenever\b/i,
  /\buntil (they|he|she|it|someone|we)\b/i,
  /\bon an ongoing basis\b/i,
  /\bremind me\b/i,
];

/** and the ones that say the opposite loudly enough to overrule a soft match */
const ONCE: RegExp[] = [/\bjust (this )?once\b/i, /\bone[- ]off\b/i, /\bfor now\b/i];

/** the cadence, lifted whole so the card can quote it back rather than paraphrase */
const CADENCE: RegExp[] = [
  /\bevery\s+(?:other\s+)?(?:morning|afternoon|evening|night|day|week|month|hour|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
  /\beach\s+(?:morning|day|week|month|monday|tuesday|wednesday|thursday|friday)\b/i,
  /\b(?:daily|weekly|monthly|nightly|hourly)\b/i,
];

/**
 * What a request reaches for. Deliberately by the words people use rather than by
 * product name alone — nobody types "Google Calendar", they type "my calendar".
 */
const REACHES: Record<string, ConnectorId> = {
  email: "gmail", emails: "gmail", inbox: "gmail", mail: "gmail", gmail: "gmail",
  reply: "gmail", replies: "gmail",
  calendar: "gcal", schedule: "gcal", meeting: "gcal", meetings: "gcal", agenda: "gcal",
  drive: "gdrive", document: "gdrive", doc: "gdrive", docs: "gdrive", file: "gdrive", files: "gdrive",
  notion: "notion",
  slack: "slack", channel: "slack",
  telegram: "telegram",
  github: "github", repo: "github", "pull request": "github",
  jira: "jira", ticket: "jira", tickets: "jira",
  figma: "figma",
  salesforce: "salesforce",
  hubspot: "hubspot",
  linkedin: "linkedin",
  zoom: "zoom",
};

/**
 * Tickers.
 *
 * A known list first, then any short all-caps run that is not an English word
 * people shout. The known list is not there to be exhaustive — it is there so
 * "sol" and "eth" in an ordinary lowercase sentence are still found, which no
 * casing rule can do.
 */
const KNOWN_TICKERS = ["HYPE", "SOL", "ETH", "BTC", "PURR", "ARB", "OP", "DOGE", "AVAX", "LINK", "SUI"];
const NOT_TICKERS = new Set(["I", "A", "OK", "TP", "SL", "OI", "AND", "OR", "IF", "THE", "USD", "PNL", "API", "ATH"]);

export function tickersIn(text: string): string[] {
  const found = new Set<string>();
  for (const t of KNOWN_TICKERS) {
    if (new RegExp(`\\b${t}\\b`, "i").test(text)) found.add(t);
  }
  for (const m of text.matchAll(/\b[A-Z]{2,6}\b/g)) {
    if (!NOT_TICKERS.has(m[0])) found.add(m[0]);
  }
  return [...found];
}

const BY_NAME = new Map(CATALOG.map((c) => [c.name.toLowerCase(), c.id]));

function connectorsIn(text: string): ConnectorId[] {
  const low = ` ${text.toLowerCase()} `;
  const found = new Set<ConnectorId>();
  for (const [word, id] of Object.entries(REACHES)) {
    if (new RegExp(`[^a-z]${word}[^a-z]`).test(low)) found.add(id);
  }
  for (const [name, id] of BY_NAME) {
    if (low.includes(name)) found.add(id);
  }
  return [...found];
}

/** their sentence with the schedule taken out of it, so the card can put it back once */
function core(text: string, cadence?: string) {
  let s = text.trim().replace(/^(please|could you|can you|hey,?)\s+/i, "");
  if (cadence) s = s.replace(new RegExp(cadence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "");
  s = s.replace(/\s{2,}/g, " ").replace(/^[,\s]+|[,\s.]+$/g, "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Titles are proposed, never imposed — the person can always say "rename it" or
 * just type over what shows in the suggestion card. What this proposes is a
 * title for an *active task*, and the register matters: "Watching HYPE" reads as
 * something the main agent is holding onto, where "HYPE Watcher" reads as a
 * colleague with a business card. The second register is reserved for a
 * dedicated agent, and a dedicated agent is never named by this function any
 * more — it is named by hand, in the Agents-area form, because standing an agent
 * up is the one act in this model that is never guessed at.
 */
function propose(text: string, needs: ConnectorId[]): string {
  // Markets first, and named after the thing itself: "Watching HYPE" tells a
  // trader what it is at a glance, where a generic "Watching this" would need
  // opening to mean anything.
  const tickers = tickersIn(text);
  // A condition specific enough to name gets named — "Watching HYPE breakout"
  // says what the job is holding for, which a bare "Watching HYPE" does not.
  // Anything vaguer than that ("tell me if anything meaningful changed") stays
  // bare, because there is nothing truer yet to call it.
  if (tickers.length === 1 && /\b(breakout|resistance|support|breaks? (above|below)|breaking out)\b/i.test(text)) {
    return `Watching ${tickers[0]} breakout`;
  }
  if (tickers.length === 1) return `Watching ${tickers[0]}`;
  if (tickers.length > 1) return `Watching ${tickers.slice(0, 3).join(", ")}`;

  const t = text.toLowerCase();
  if (/\bfollow(ing)?[- ]up\b|\buntil (they|he|she|it)\b/.test(t)) return "Following up";
  if (/\bfunding\b/.test(t)) return "Watching funding";
  if (/\b(open interest|liquidation|orderbook|order book)\b/.test(t)) return "Watching order flow";
  if (/\bwallet|address|whale\b/.test(t)) return "Watching that wallet";
  if (/\b(flights?|fares?|airlines?|trips?)\b/.test(t)) return "Watching flights";
  if (/\b(prices?|markets?|stocks?|tickers?)\b/.test(t)) return "Watching prices";
  if (/\breport\b/.test(t)) return "Keeping that report going";
  if (needs.includes("gmail")) return "Watching your inbox";
  if (needs.includes("gcal")) return "Watching your calendar";
  if (needs.includes("slack")) return "Watching Slack";
  if (needs.includes("github")) return "Watching the repo";
  return "Keeping an eye on this";
}

/**
 * Words that carry the request. Everything else is politeness and grammar, and
 * keeping it would make two ways of asking the same thing look like two things.
 */
const STOP = new Set([
  "the", "a", "an", "my", "our", "your", "me", "you", "i", "we", "it", "this", "that", "these", "those",
  "to", "for", "of", "on", "in", "at", "with", "from", "and", "or", "but", "so",
  "can", "could", "would", "will", "please", "just", "again", "do", "does", "did",
  "is", "are", "was", "be", "been", "have", "has", "had", "get", "got", "make",
  "all", "any", "some", "what", "when", "how", "now", "then", "today", "again",
  "which", "ones", "one", "also", "over", "into", "about", "them", "there", "here",
]);

/**
 * Enough stemming to see through inflection, and no more. Someone asking the same
 * thing twice writes "what needs a reply" and then "what needs replying to" — two
 * spellings of one word, which a raw token match reads as two different requests.
 * A real stemmer would be overkill for deciding whether to ask a question.
 */
function stem(w: string): string {
  if (w.endsWith("ies") && w.length > 4) return `${w.slice(0, -3)}y`;
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("es") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);
  return w;
}

export function meat(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map(stem),
  );
}

/**
 * Two asks are the same ask when most of what one is about is also what the other
 * is about. Measured against the shorter of the two on purpose: "summarise my
 * emails" and "summarise my important emails from this morning" are one request
 * asked twice, and a symmetric measure would call them different.
 */
export function sameAsk(a: string, b: string): boolean {
  const A = meat(a);
  const B = meat(b);
  // Two words minimum on both sides, and two in common. Without this floor a
  // one-word ask matches anything containing that word — "check my calendar" and
  // "put a meeting in my calendar" would score a perfect 1.0 and be counted as
  // the same request, which is how a feature like this earns its distrust.
  if (Math.min(A.size, B.size) < 2) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared += 1;
  return shared >= 2 && shared / Math.min(A.size, B.size) >= 0.6;
}

export function readRequest(text: string, before: string[] = []): Request {
  const said = text.trim();
  const recurring = !ONCE.some((r) => r.test(said)) && ONGOING.some((r) => r.test(said));
  // First letter down, the rest left alone: "Every morning" reads wrong mid-sentence
  // and "every monday" reads wrong anywhere.
  const found = CADENCE.map((r) => said.match(r)?.[0]).find(Boolean);
  const cadence = found ? found.charAt(0).toLowerCase() + found.slice(1) : undefined;
  const needs = connectorsIn(said);
  const body = core(said, cadence);

  return {
    recurring,
    repeats: before.filter((old) => sameAsk(old, said)).length + 1,
    cadence,
    summary: cadence ? `${body}, ${cadence}` : body,
    name: propose(said, needs),
    needs,
  };
}
