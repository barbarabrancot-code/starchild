// Every option carries the three things the brief demands:
//   `label`    → what the user picks
//   `context`  → what Starchild stores about them
//   `behavior` → what actually changes in how Starchild responds
// If an option can't fill all three, it doesn't belong in the flow.

export type Choice = {
  id: string;
  label: string;
  context: string;
  behavior: string;
};

export type Answers = {
  stage?: string;
  focus?: string;
  style?: string;
  tone: number; // 0 = gentle … 100 = direct
  initiative: number; // 0 = give me space … 100 = give me clear steps
  startingPoint?: string;
};

export const EMPTY_ANSWERS: Answers = { tone: 50, initiative: 50 };

export const STAGE_CHOICES: Choice[] = [
  {
    id: "building",
    label: "Building something of my own",
    context: "Founder or solo builder",
    behavior: "Bias toward momentum and shipping over analysis",
  },
  {
    id: "team",
    label: "Working with a team or company",
    context: "Works inside an organization",
    behavior: "Account for stakeholders and existing process",
  },
  {
    id: "studying",
    label: "Studying and exploring",
    context: "Learning phase, low commitment",
    behavior: "Explain the reasoning, not just the answer",
  },
  {
    id: "changing",
    label: "Changing direction",
    context: "In transition",
    behavior: "Hold options open before narrowing",
  },
  {
    id: "caring",
    label: "Taking care of other people",
    context: "Limited discretionary time",
    behavior: "Keep suggestions short and low-effort",
  },
  {
    id: "energy",
    label: "Trying to regain energy",
    context: "Low capacity right now",
    behavior: "One step at a time, never a backlog",
  },
];

export const FOCUS_CHOICES: Choice[] = [
  { id: "work", label: "Work and direction", context: "Career focus", behavior: "Lead with work-shaped examples" },
  { id: "own", label: "Building something of my own", context: "Personal project focus", behavior: "Prioritize build and launch help" },
  { id: "money", label: "Money and security", context: "Financial focus", behavior: "Be concrete about tradeoffs and numbers" },
  { id: "people", label: "Relationships and family", context: "Personal life focus", behavior: "Stay conversational, avoid task framing" },
  { id: "health", label: "Health and energy", context: "Wellbeing focus", behavior: "Respect capacity, avoid pressure" },
  { id: "life", label: "The kind of life I want", context: "Direction-level focus", behavior: "Ask before advising" },
  { id: "unsure", label: "I'm not sure yet", context: "Focus not yet named", behavior: "Help name it before solving it" },
];

export const STYLE_CHOICES: Choice[] = [
  {
    id: "alone",
    label: "Think it through on my own",
    context: "Internal processor",
    behavior: "Give enough context to decide alone; don't flood with options",
  },
  {
    id: "talk",
    label: "Talk until I understand what I think",
    context: "External processor",
    behavior: "Ask more than assert; reflect back what you hear",
  },
  {
    id: "act",
    label: "Start doing something and figure it out",
    context: "Learns by moving",
    behavior: "Offer a first step, not a full plan",
  },
  {
    id: "research",
    label: "Research until I feel prepared",
    context: "Needs groundwork first",
    behavior: "Bring sources and context up front",
  },
  {
    id: "pause",
    label: "Put it aside until I have more energy",
    context: "Avoids under load",
    behavior: "Keep it small; never present a pile of work",
  },
];

// ---------------------------------------------------------------------------
// First Read — composed from the answers, never a fixed paragraph.
// Tone is deliberately tentative: an observation offered, not a verdict.
// ---------------------------------------------------------------------------

const STAGE_PHRASE: Record<string, string> = {
  building: "in a stretch where you're trying to build something of your own",
  team: "working inside a team, with other people's plans in the mix",
  studying: "in an exploring phase, still gathering more than deciding",
  changing: "somewhere in the middle of changing direction",
  caring: "carrying a fair amount for other people right now",
  energy: "trying to get your energy back before taking on more",
};

const FOCUS_PHRASE: Record<string, string> = {
  work: "work and where it's heading",
  own: "the thing you're trying to build",
  money: "money and feeling secure",
  people: "the people close to you",
  health: "your health and energy",
  life: "what kind of life you actually want",
  unsure: "something you haven't quite put words to yet",
};

const STYLE_PHRASE: Record<string, { observation: string; consequence: string }> = {
  alone: {
    observation: "You tend to work things out on your own before saying them out loud",
    consequence: "so I'll try to give you enough to decide with, without burying you in options",
  },
  talk: {
    observation: "You seem to find what you think by talking it through",
    consequence: "so I'll ask more than I assert, and play back what I'm hearing",
  },
  act: {
    observation: "You'd rather start moving and adjust than plan it all first",
    consequence: "so I'll aim at a first step instead of a finished plan",
  },
  research: {
    observation: "You like to feel prepared before you commit to something",
    consequence: "so I'll bring the groundwork up front rather than after",
  },
  pause: {
    observation: "You tend to set things down when they get heavy",
    consequence: "so I'll keep things small and won't hand you a pile",
  },
};

const USEFULNESS: Record<string, string> = {
  work: "helping you get clearer on the direction before you commit to it",
  own: "helping you turn the idea into something that actually moves",
  money: "helping you lay the tradeoffs out plainly",
  people: "being somewhere you can think out loud without it becoming a task",
  health: "helping you protect your capacity while things still move",
  life: "helping you name what matters before we touch what to do",
  unsure: "helping you name the thing first — the rest gets easier after that",
};

export function composeFirstRead(answers: Answers): string {
  const stage = answers.stage ? STAGE_PHRASE[answers.stage] : "in the middle of something you're still shaping";
  const focus = answers.focus ? FOCUS_PHRASE[answers.focus] : "a few things at once";
  const style = answers.style ? STYLE_PHRASE[answers.style] : STYLE_PHRASE.alone;
  const useful = answers.focus ? USEFULNESS[answers.focus] : "helping you find the first thread to pull";

  const toneNote =
    answers.tone > 65
      ? "I'll keep it direct"
      : answers.tone < 35
        ? "I'll keep it gentle"
        : "I'll keep the tone even";
  const initiativeNote =
    answers.initiative > 65
      ? "and give you clear steps"
      : answers.initiative < 35
        ? "and leave you room to steer"
        : "and follow your lead on how much structure you want";

  return [
    `You seem to be ${stage}, and lately ${focus} has been taking up most of the space.`,
    `${style.observation}, ${style.consequence}.`,
    `${toneNote}, ${initiativeNote}.`,
    `Right now I might be most useful by ${useful}.`,
  ].join(" ");
}

// The opening line of the first conversation — seeded, never an empty box.
export function composeOpeningQuestion(answers: Answers): string {
  if (answers.startingPoint && answers.startingPoint.trim()) {
    return `You mentioned "${answers.startingPoint.trim()}". What's made that feel more present lately?`;
  }
  const focus = answers.focus ?? "unsure";
  const openers: Record<string, string> = {
    work: "You said work and direction has been taking up space. What's the part of it you keep circling back to?",
    own: "You said you're trying to build something of your own. Where is it stuck right now?",
    money: "You said money and security has been on your mind. What decision is it attached to?",
    people: "You said the people close to you have been taking up space. Want to just talk it through?",
    health: "You said your energy has been the thing. What's been draining most of it?",
    life: "You said you've been thinking about what kind of life you want. What made that feel louder recently?",
    unsure: "You weren't sure what's taking up the space yet. Want to start by just describing your week?",
  };
  return openers[focus] ?? openers.unsure;
}
