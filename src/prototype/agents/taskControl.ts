import { meat, tickersIn } from "./readRequest";
import type { ActiveTask } from "./activeTasks";

/**
 * Managing an active task by talking to the main chat.
 *
 * The dedicated-agent router (`agentControl.ts`) has a full vocabulary — rename,
 * delete, reschedule, retarget channels — because a dedicated agent is a thing
 * with settings. A task has one thing worth changing from a sentence: the
 * condition it is holding. So this is the same idea at a tenth of the size, kept
 * in its own file rather than folded into the agent router, because "does this
 * sentence read as a task edit" and "does this sentence read as an agent edit"
 * are different questions asked against different rosters, and merging them
 * would mean resolving both every time either one is asked.
 */

export type TaskControl =
  | { kind: "none" }
  | { kind: "refine"; task: ActiveTask; condition: string; say: string }
  | { kind: "pause"; task: ActiveTask; say: string }
  | { kind: "resume"; task: ActiveTask; say: string };

const PAUSE = /\b(pause|hold off|hold on|stand down|stop watching|stop checking|stop for now)\b/i;
const RESUME = /\b(resume|unpause|start again|pick (it |this )?back up|keep (watching|going|at it))\b/i;
const DEICTIC = /\b(this|it|that|the task)\b/i;
const WIDENS = /\b(also|too|as well|in addition|on top of that)\b/i;
/** raising the bar — used both to recognise the sentence is aimed at the task at
 *  all, and, when nothing else is attached to it, as the whole of the ask */
const TIGHTEN = /\b(tighten|be stricter|stricter|raise the bar|higher conviction)\b/i;
const TIGHTEN_ONLY = /^(make it stricter|be stricter|tighten( it| the conditions)?)[.!]?$/i;
const CONDITION = /\b(only alert|alert me only|before alerting|before you alert|check .* before)\b/i;

function stripFiller(text: string) {
  return text
    .trim()
    .replace(/^(ok(ay)?|so|actually|hmm+|well|please|hey),?\s+/i, "")
    .replace(/^(can|could|would) you\s+/i, "")
    .replace(/\s+(instead|now|from now on|going forward)\s*[.!]?$/i, "")
    .replace(/[.!]+$/, "")
    .trim();
}

/** which task, if any, this sentence is about — same falling-confidence order as agentControl */
function whichTask(text: string, tasks: ActiveTask[], lastTouched?: string): ActiveTask | undefined {
  const low = text.toLowerCase();
  const recent = lastTouched ? tasks.find((t) => t.id === lastTouched) : undefined;

  const named = tasks.find((t) => low.includes(t.title.toLowerCase()));
  if (named) return named;

  const saidTickers = tickersIn(text);
  if (saidTickers.length > 0) {
    const holder = tasks.find((t) => (t.watchlist ?? []).some((x) => saidTickers.includes(x)));
    if (holder) return holder;
  }

  if (!recent) return undefined;

  const said = meat(text);
  if (said.size >= 2) {
    const job = meat(`${recent.condition} ${recent.title}`);
    let shared = 0;
    for (const w of said) if (job.has(w)) shared += 1;
    if (shared >= 2 && shared / said.size >= 0.4) return recent;
  }

  const aimed =
    DEICTIC.test(text) ||
    PAUSE.test(text) ||
    RESUME.test(text) ||
    WIDENS.test(text) ||
    CONDITION.test(text) ||
    TIGHTEN.test(text) ||
    saidTickers.length > 0;

  return aimed ? recent : undefined;
}

/**
 * The clause a sentence is actually adding, once the framing around it is gone.
 *
 * Not anchored to the start of the string on purpose: "Make it stricter. Only
 * alert me if open interest is rising too." carries a real clause, but it is not
 * the first thing said. A version of this that only matched at position 0 would
 * strip nothing from that sentence and hand back the whole thing, tightening
 * language included, as the "condition" — which is how a raise-the-bar sentence
 * with real content in it went missing behind a generic acknowledgment.
 */
function extractClause(said: string): string {
  let clause = stripFiller(said)
    .replace(/^(make it stricter|be stricter|tighten( it| the conditions)?)[.,]?\s*/i, "")
    .replace(/(only\s+)?alert me (only )?(if|when)\s+/i, "")
    .replace(/^also\s+/i, "")
    .replace(/^(check|look at|factor in|consider)\s+/i, "")
    .replace(/\s+before (alerting|you alert)( me)?$/i, "")
    .replace(/\s+too$/i, "")
    .trim();
  // a bare noun ("funding") reads as a fragment; give it a predicate
  if (clause && !/\s/.test(clause)) clause = `acceptable ${clause}`;
  return clause;
}

export function readTaskControl(text: string, tasks: ActiveTask[], lastTouched?: string): TaskControl {
  const said = text.trim();
  if (!said) return { kind: "none" };

  const task = whichTask(said, tasks, lastTouched);
  if (!task) return { kind: "none" };

  const title = task.title;

  if (PAUSE.test(said)) {
    return {
      kind: "pause",
      task,
      say: `Paused. I'll stop watching ${title.replace(/^Watching\s+/i, "")} until you say otherwise.`,
    };
  }
  if (RESUME.test(said)) {
    return { kind: "resume", task, say: "Back on it. Still watching for the same thing." };
  }

  /* Content first: a sentence that both raises the bar and names what to raise it
     with ("make it stricter, only alert if OI is rising too") is read for the
     clause, and "stricter" is treated as the framing around it rather than the
     content. Only a bare "tighten the conditions," with nothing to extract, falls
     through to the generic reply below. */
  if (CONDITION.test(said) || WIDENS.test(said)) {
    const clause = extractClause(said);
    if (clause) {
      const broad = /^meaningful/i.test(task.condition);
      const held = broad ? [] : task.condition.split(" + ").filter(Boolean);
      const all = [...held, clause];
      const condition = all.join(" + ");
      // The joined condition reads as a noun phrase ("acceptable funding"), right
      // for a list read by scanning. Said back as a sentence it needs a verb:
      // "I'll only alert you if acceptable funding" is not English.
      const predicate = clause.startsWith("acceptable ") ? `${clause.slice(11)} is acceptable` : clause;
      return {
        kind: "refine",
        task,
        condition,
        say: `Updated. I'll only alert you if ${predicate}.`,
      };
    }
  }

  if (TIGHTEN_ONLY.test(stripFiller(said))) {
    return {
      kind: "refine",
      task,
      condition: `${task.condition} — held to a clear signal, not a marginal one`,
      say: "Tightened. I'll only alert you once it's unambiguous.",
    };
  }

  return { kind: "none" };
}
