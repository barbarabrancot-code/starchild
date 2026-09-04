/**
 * What Starchild says on the homepage.
 *
 * The hero now holds a real exchange instead of handing off to Guest Mode, which
 * means it needs replies. Four of them, chosen by what the person is plainly
 * asking for, and one that admits it does not know yet.
 *
 * Two rules they all follow, and the section falls apart without either:
 *
 *   · None of them claims to have done the work. A landing page that fakes a
 *     finished answer has lied about the product before anyone has used it. Each
 *     one says how it would go at it and asks for the thing it would need — which
 *     is what the real product does on a first message anyway.
 *   · Each ends somewhere different. Four replies that all close on a question
 *     read as one reply with the nouns swapped.
 */

export type Reply = {
  /** what the grey line says while it is thinking */
  thinking: string;
  text: string;
};

const REPLIES: { match: RegExp; reply: Reply }[] = [
  {
    // making something
    match: /\b(make|build|design|write|draft|poster|logo|name|copy|brand|deck|site|app)\b/i,
    reply: {
      thinking: "Getting a feel for it…",
      text: "I'd settle the shape before the words. Tell me the one thing someone should leave with and I'll work up three directions — you'll know which is right the moment you see them beside each other.",
    },
  },
  {
    // finding something out
    match: /\b(find|research|compare|look|read|study|analy[sz]e|why|which|best|options?)\b/i,
    reply: {
      thinking: "Working out where to look…",
      text: "I'll read properly rather than skim, and come back with the three things that actually differ between the options — plus the one everyone gets wrong. Point me at what you've already ruled out so I don't spend the time twice.",
    },
  },
  {
    // getting a mess in order
    match: /\b(plan|organi[sz]e|schedule|week|launch|priorit|todo|task|deadline|calendar)\b/i,
    reply: {
      thinking: "Laying it out…",
      text: "Let's get it out of your head first. Anything with a date on it goes in one pile and everything else in the other, and I'll come back with the order that unblocks the most for the least effort. Usually one thing is holding up three.",
    },
  },
  {
    // handing something over to run on its own
    match: /\b(watch|monitor|track|remind|every|daily|weekly|keep an eye|alert|notify)\b/i,
    reply: {
      thinking: "Working out what to watch…",
      text: "That's the kind of thing I'd rather take on than be asked for. Give me what counts as worth interrupting you over and I'll go quiet until it happens — no digest, no summary of nothing.",
    },
  },
];

const FALLBACK: Reply = {
  thinking: "Reading it properly…",
  text: "Give me the messy version rather than the tidy one — I get further with what's actually bothering you than with a clean brief. What's the part you keep going back to?",
};

export function replyTo(said: string): Reply {
  return REPLIES.find(({ match }) => match.test(said))?.reply ?? FALLBACK;
}
