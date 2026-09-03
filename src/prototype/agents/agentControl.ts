import { meat, tickersIn } from "./readRequest";
import type { Agent } from "./agentsData";
import type { ConnectorId } from "./connectors";

/**
 * Managing an agent by talking to the main chat.
 *
 * The product argument this file exists to make: creating an agent must not move
 * you. If the only place to change a standing job is the page that job lives on,
 * then "keep watching Tokyo flights" quietly costs you the conversation you were
 * having — and the second thing anyone says about an agent is almost always an
 * amendment, not a new subject.
 *
 * So the chat stays the control surface. This reads an ordinary sentence, decides
 * whether it was about an agent and which one, and returns the change to make
 * plus the sentence Starchild says back. It never applies anything itself: the
 * caller owns the roster, and a router that also wrote to it would be impossible
 * to reason about at the one moment it matters, which is when it guesses wrong.
 *
 * It is heuristic, and deliberately narrow. Everything here is keyed off phrasings
 * that have no second meaning — a bare "stop" against a matched agent, an explicit
 * channel name, a money amount where the agent already had one. Anything it is not
 * sure about comes back as `none` and is answered as an ordinary message, because
 * the cost of the two mistakes is not the same: missing an amendment wastes a
 * sentence, while inventing one silently rewrites a job someone is relying on.
 */

export type Control =
  | { kind: "none" }
  /** tickers in or out of what the agent is responsible for */
  | { kind: "watchlist"; agent: Agent; add: string[]; remove: string[]; say: string }
  /** another clause that has to hold before it is allowed to interrupt you */
  | { kind: "condition"; agent: Agent; add: string; say: string }
  /** the execution gate. Only ever raised, never lowered — see the field's own note */
  | { kind: "approval"; agent: Agent; say: string }
  /** the standing instruction changes — the common case, and the reason for all this */
  | { kind: "refine"; agent: Agent; instruction: string; say: string }
  | { kind: "pause"; agent: Agent; say: string }
  | { kind: "resume"; agent: Agent; say: string }
  | { kind: "rename"; agent: Agent; name: string; say: string }
  | { kind: "alerts"; agent: Agent; add: ConnectorId[]; remove: ConnectorId[]; say: string }
  | { kind: "schedule"; agent: Agent; cadence: string; say: string }
  | { kind: "delete"; agent: Agent; say: string }
  /** "what have you checked", "why did you alert me" — answered, nothing written */
  | { kind: "status"; agent: Agent; say: string };

/** the channels an agent can be told to shout on, by the words people use for them */
const CHANNELS: { id: ConnectorId; label: string; test: RegExp }[] = [
  { id: "telegram", label: "Telegram", test: /\btelegram\b/i },
  { id: "slack", label: "Slack", test: /\bslack\b/i },
  { id: "gmail", label: "Email", test: /\b(e-?mail|inbox)\b/i },
];

const PAUSE = /\b(pause|hold off|hold on|stand down|stop watching|stop checking|stop for now)\b/i;
const RESUME = /\b(resume|unpause|start again|pick (it |this )?back up|keep (watching|going|at it))\b/i;
const DELETE = /\b(delete|get rid of|shut (it|this) down|remove (this|it|the) agent)\b/i;
const RENAME = /\b(?:rename|call)\s+(?:it|this|that)?\s*(?:to|as)?\s+["“]?([^"”.!?]{2,40})["”]?/i;
const STATUS =
  /\b(status|how('s| is) it going|what (have you|did you) (check|do)|show (me )?what you checked|why did you (alert|ping|tell)|when did you last)\b/i;

/**
 * The shapes an amendment comes in.
 *
 * Needed because an amendment very often shares no words at all with the job it
 * amends — "include nearby airports too" has nothing lexically in common with
 * "watching Tokyo flights below $700", and every subject-overlap measure in the
 * world scores that pair at zero. What connects them is not vocabulary, it is
 * that one was said immediately after the other.
 */
const AMENDS =
  /^(don'?t|never|ignore|skip|include|add|use|check|watch|track|summari[sz]e|draft|tell|send|make|change|set|only|just|also|drop|stop including)\b/i;

/** an amendment that widens the job rather than replacing it */
const WIDENS = /\b(also|too|as well|in addition|on top of that)\b/i;
/** …and one that narrows it */
const NARROWS = /\b(only|just|nothing but)\b/i;

const CADENCE =
  /\b(?:every\s+(?:other\s+)?(?:morning|afternoon|evening|night|day|week|month|hour|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|each\s+(?:morning|day|week|month)|daily|weekly|monthly|nightly|hourly)\b/i;

const MONEY = /\$\s?\d[\d,]*(?:\.\d{2})?/;

/** the request is about what must hold before an alert, not about what to watch */
const CONDITION =
  /\b(only alert|alert me only|before alerting|before you alert|check .* before)\b/i;
/** raising the bar on the conditions already there, rather than adding one */
const TIGHTEN = /\b(tighten|be stricter|stricter|raise the bar|higher conviction)\b/i;

/** handing over the ability to act, with the gate left up */
const APPROVAL =
  /\b(ask me before|check with me before|approval|approve before|don'?t place|never place|before placing|before you place)\b/i;

/** "this", "it", "that agent" — a reference to whatever was last on screen */
const DEICTIC = /\b(this|it|that|the agent)\b/i;

/**
 * Which agent is being talked about.
 *
 * Three ways, in falling order of confidence: it was named; the sentence points at
 * something ("pause this") and there is a something to point at; or what the
 * sentence is about overlaps what an agent's standing job is about. The last one
 * is the loosest and carries the highest bar, because it is the only one that can
 * attach an amendment to an agent nobody mentioned.
 */
function whichAgent(text: string, roster: Agent[], lastTouched?: string): Agent | undefined {
  const low = text.toLowerCase();

  const named = roster.find((a) => low.includes(a.name.toLowerCase()));
  if (named) return named;

  /*
    A distinctive word out of the name — "travel watcher" said as "the watcher",
    "Inbox Manager" as "inbox". Words shared with half the roster are skipped, or
    "agent" alone would match whoever happens to be first.

    Tickers are excluded, and that exclusion is load-bearing. An agent called
    "HYPE Breakout Watcher" contains a market, and mentioning that market is not
    the same act as naming the agent: "also watch PURR if it starts moving like
    HYPE" is about a comparison, and matching the name on "HYPE" sent a new token
    to the single-asset agent instead of to the watchlist that was already a
    watchlist. A market named in a name is a market.
  */
  const tickerWords = new Set(tickersIn(text).map((t) => t.toLowerCase()));
  const distinctive = roster.find((a) =>
    a.name
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (w) =>
          w.length > 3 &&
          !tickerWords.has(w) &&
          roster.filter((o) => o.name.toLowerCase().includes(w)).length === 1,
      )
      .some((w) => new RegExp(`\\b${w}\\b`).test(low)),
  );
  if (distinctive) return distinctive;

  const recent = lastTouched ? roster.find((a) => a.id === lastTouched) : undefined;

  /*
    A ticker the agent is already responsible for.

    Stronger than the prose overlap below and checked before it, because a ticker
    is an identifier rather than a word: "watch PURR the way you watch HYPE"
    shares almost no vocabulary with "tracks HYPE, SOL and ETH for meaningful
    changes", and yet there is no doubt at all which agent it is about. This is
    what stops a second request about a market someone already watches from
    becoming a second agent watching the same market.
  */
  const saidTickers = tickersIn(text);
  if (saidTickers.length > 0) {
    /* When more than one agent holds the market, the broadest wins. A new token
       belongs on the list that is already a list — a single-asset agent is about
       that asset specifically, and pushing a second market into it quietly
       changes what it is. Ties fall to the first, which is the newest. */
    const holders = roster
      .filter((a) => (a.watchlist ?? []).some((t) => saidTickers.includes(t)))
      .sort((a, b) => (b.watchlist ?? []).length - (a.watchlist ?? []).length);
    if (holders[0]) return holders[0];
  }

  /*
    Subject overlap, and only once a conversation about an agent is already
    happening.

    Without that condition this is actively harmful rather than merely loose.
    "Can you check João's emails again and summarise anything important?" overlaps
    an existing Inbox Manager almost perfectly — so a cold opening message would
    be read as an amendment, silently rewritten into that agent's standing
    instruction, and answered with "Updated." instead of an answer. The person
    asked a question and got their agent quietly edited.

    Naming an agent is always enough, because naming it is unambiguous. Overlap is
    an inference, and an inference is only safe here as a way of resolving *which*
    agent an ongoing exchange is about — never as a way of deciding that an
    exchange is about an agent at all. What the overlap case should produce on a
    cold message is a remark that the agent already covers it, which is the
    caller's job and not a rewrite.
  */
  const said = meat(text);
  if (recent && said.size >= 2) {
    let best: { agent: Agent; score: number } | undefined;
    for (const agent of roster) {
      const job = meat(`${agent.instruction ?? ""} ${agent.role} ${agent.name}`);
      let shared = 0;
      for (const w of said) if (job.has(w)) shared += 1;
      const score = shared / said.size;
      if (shared >= 2 && score >= 0.4 && (!best || score > best.score)) best = { agent, score };
    }
    if (best) return best.agent;
  }

  /*
    Nothing named and nothing overlapping — so fall back to what was last being
    discussed, but only for a sentence that is plainly aimed at an agent.

    This sits *below* the overlap check rather than above it, and the order is the
    whole of the logic. "Only summarise emails that need a reply", said right after
    a conversation about Travel Watcher, is about the inbox: it says so, and what a
    sentence is about beats what the previous sentence was about. Context is the
    tie-breaker for sentences that carry no subject of their own — "pause this",
    "make it daily", "include nearby airports too" — and it is a tie-breaker, never
    an override.
  */
  if (!recent) return undefined;

  const aimed =
    DEICTIC.test(text) ||
    PAUSE.test(text) ||
    RESUME.test(text) ||
    DELETE.test(text) ||
    STATUS.test(text) ||
    AMENDS.test(stripFiller(text)) ||
    CONDITION.test(text) ||
    TIGHTEN.test(text) ||
    APPROVAL.test(text) ||
    tickersIn(text).length > 0 ||
    channelsIn(text).length > 0 ||
    (MONEY.test(text) && MONEY.test(recent.instruction ?? recent.role));

  return aimed ? recent : undefined;
}

/** the sentence with the throat-clearing taken off the front */
function stripFiller(text: string) {
  return text
    .trim()
    .replace(/^(ok(ay)?|so|actually|hmm+|well|please|hey),?\s+/i, "")
    .replace(/^(can|could|would) you\s+/i, "")
    .replace(/\s+(instead|now|from now on|going forward)\s*[.!]?$/i, "")
    .replace(/[.!]+$/, "")
    .trim();
}

/** an imperative turned into something Starchild can say about the agent */
function asWill(text: string) {
  const s = stripFiller(text);
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function channelsIn(text: string) {
  return CHANNELS.filter((c) => c.test.test(text));
}

function listOf(labels: string[]) {
  if (labels.length <= 1) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

export function readControl(text: string, roster: Agent[], lastTouched?: string): Control {
  const said = text.trim();
  if (!said) return { kind: "none" };

  const agent = whichAgent(said, roster, lastTouched);
  if (!agent) return { kind: "none" };

  const name = agent.name;

  /* ── channels first ──
     "stop Telegram alerts" contains a stop and a channel, and it is a channel
     change. Reading it as a pause would silently switch the whole agent off,
     which is the most expensive misreading available here. */
  const channels = channelsIn(said);
  if (channels.length > 0) {
    const off = /\b(stop|no more|turn off|disable|don'?t|quit)\b/i.test(said);
    const labels = listOf(channels.map((c) => c.label));
    if (off) {
      return {
        kind: "alerts",
        agent,
        add: [],
        remove: channels.map((c) => c.id),
        say: `Done. ${name} will stop sending to ${labels}. You'll still get everything here.`,
      };
    }
    return {
      kind: "alerts",
      agent,
      add: channels.map((c) => c.id),
      remove: [],
      say: `Done. ${name} will send to ${labels} as well as here.`,
    };
  }

  const rename = said.match(RENAME);
  if (rename) {
    const next = rename[1].trim();
    return { kind: "rename", agent, name: next, say: `Renamed. ${name} is now ${next}.` };
  }

  if (DELETE.test(said)) {
    return {
      kind: "delete",
      agent,
      say: `${name} is gone. Everything it found is still in this conversation.`,
    };
  }

  if (PAUSE.test(said)) {
    return {
      kind: "pause",
      agent,
      say: `Paused. ${name} will stop checking until you say otherwise — nothing it has found is lost.`,
    };
  }

  if (RESUME.test(said)) {
    return { kind: "resume", agent, say: `${name} is running again.` };
  }

  if (STATUS.test(said)) {
    return {
      kind: "status",
      agent,
      say: agent.lastChecked
        ? `${name} ${agent.lastChecked}.`
        : `${name} hasn't had anything to report yet.`,
    };
  }

  /* ── the execution gate ──
     Read before anything else that could match, because a sentence containing
     "ask me before placing anything" must never be absorbed into a generic
     instruction rewrite. Raising the gate is the one amendment where being
     approximately right is not good enough. */
  if (APPROVAL.test(said)) {
    return {
      kind: "approval",
      agent,
      say: `Got it. ${name} will prepare the strategy and ask for your approval before any order is placed.`,
    };
  }

  /* ── the watchlist ──
     Named tickers that the agent does not already hold are additions; the
     removal wording is explicit because dropping a market someone is trading is
     not something to infer from "not". */
  const tickers = tickersIn(said);
  if (tickers.length > 0 && !CONDITION.test(said)) {
    const held = agent.watchlist ?? [];
    const dropping = /\b(remove|drop|stop watching|take off|no longer)\b/i.test(said);
    if (dropping) {
      const gone = tickers.filter((t) => held.includes(t));
      if (gone.length > 0) {
        return {
          kind: "watchlist",
          agent,
          add: [],
          remove: gone,
          say: `Removed ${listOf(gone)} from ${name}. Still on ${listOf(held.filter((t) => !gone.includes(t))) || "nothing"}.`,
        };
      }
    }
    const fresh = tickers.filter((t) => !held.includes(t));
    if (fresh.length > 0) {
      return {
        kind: "watchlist",
        agent,
        add: fresh,
        remove: [],
        say: `I added ${listOf(fresh)} to ${name}. I'll hold it to the same conditions you're using for the rest.`,
      };
    }
  }

  /* ── raising the bar on what is already there ── */
  if (TIGHTEN.test(said)) {
    const held = agent.conditions ?? [];
    return {
      kind: "condition",
      agent,
      add: "the signal is unambiguous",
      say: held.length
        ? `Tightened. ${name} will want ${listOf(held)} to hold clearly, not marginally, before it interrupts you.`
        : `Tightened. ${name} will wait for an unambiguous signal before it interrupts you.`,
    };
  }

  /* ── another condition on the alert ──
     Two shapes, said two ways. "Only alert me if X" gives a clause that stands on
     its own; "check X before alerting me" gives a noun, and reading the noun back
     as though it were a clause produced "only alert you if check funding". The
     second shape gets a predicate so the list it joins stays a list of sentences. */
  if (CONDITION.test(said)) {
    const onlyIf = /\b(only alert|alert me only)\b/i.test(said);
    let clause = stripFiller(said)
      .replace(/^(only\s+)?alert me (only )?(if|when)\s+/i, "")
      .replace(/^also\s+/i, "")
      .replace(/^(check|look at|factor in|consider)\s+/i, "")
      .replace(/\s+before (alerting|you alert)( me)?$/i, "")
      .replace(/\s+too$/i, "")
      .trim();
    /* The bare noun is what the "include X before alerting" sentence wants; the
       predicated version is what the list of conditions wants. Using one for both
       produced "will include funding checks out before sending an alert". */
    const bare = clause;
    if (!onlyIf && !/\s/.test(clause)) clause = `${clause} checks out`;

    const all = [...(agent.conditions ?? []), clause];
    return {
      kind: "condition",
      agent,
      add: clause,
      say:
        all.length > 1
          ? `Updated. I'll only alert you if ${listOf(all)}.`
          : `Updated. ${name} will include ${bare} before sending an alert.`,
    };
  }

  const cadence = said.match(CADENCE)?.[0];
  if (cadence && /\b(make it|change it to|switch to|run|check)\b/i.test(said)) {
    const spoken = cadence.toLowerCase();
    return {
      kind: "schedule",
      agent,
      cadence: spoken.charAt(0).toUpperCase() + spoken.slice(1),
      say: `Updated. ${name} will run ${spoken}.`,
    };
  }

  /* ── an amendment to the standing job ──
     Everything left that matched an agent is a change to what it is doing. Three
     shapes, and they differ in what happens to the instruction already there. */
  const current = agent.instruction ?? agent.role;

  // A number replacing a number. "Make the alert threshold $650 instead" is not a
  // new rule, it is the same rule with one figure moved, and appending it would
  // leave the agent holding two thresholds and no way to tell which one is live.
  const amount = said.match(MONEY)?.[0];
  const had = current.match(MONEY)?.[0];
  if (amount && had && amount !== had && !WIDENS.test(said)) {
    return {
      kind: "refine",
      agent,
      instruction: current.replace(MONEY, amount),
      say: `Updated. ${name} will now alert you below ${amount.replace(/\s/g, "")}.`,
    };
  }

  // Widening: the old job survives and the new clause is added to it. This is the
  // one that keeps a second request from becoming a second agent.
  if (WIDENS.test(said)) {
    const clause = stripFiller(said.replace(WIDENS, "")).replace(/^(watch|track|monitor|include|add)\s+/i, "");
    // The first word only. Two words reached for a noun phrase and came back with
    // half of one — "hotels in" — which reads as a typo rather than as a summary.
    const subject = clause.split(/\s+/)[0];
    return {
      kind: "refine",
      agent,
      instruction: `${current} and ${clause}`,
      say: `I added ${subject} to ${name} rather than making a second agent for it.`,
    };
  }

  // Narrowing or plain restatement: the new sentence is the job now.
  if (NARROWS.test(said) || AMENDS.test(stripFiller(said))) {
    return {
      kind: "refine",
      agent,
      instruction: stripFiller(said),
      say: `Updated. ${name} will ${asWill(said)}.`,
    };
  }

  return { kind: "none" };
}
