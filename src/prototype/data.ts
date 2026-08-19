import {
  SparkleIcon,
  GradCapIcon,
  ScaleIcon,
  FolderIcon,
  CodeIcon,
  BoltIcon,
  TrendingUpIcon,
  DollarIcon,
  type IconComponent,
} from "./icons";

export const HERO_CHIPS = [
  "Make me a coffee shop brand",
  "Make a poster for the Odyssey movie",
  "How's the market today?",
  "Debug this Python traceback",
  "Turn this idea into a landing page",
  "Explain Conductor Mode to me",
];

// Hero hierarchy: chip = intention · card = ready task · field = total freedom.
// A card is an action, not a category — it carries the standing context Starchild
// works from, plus the single thing it still needs before it can start.
export type TaskCard = {
  id: string;
  label: string;
  /** loaded as the task's context — never displayed as if the user typed it */
  basePrompt: string;
  /** the one question Starchild asks before running anything */
  question: string;
};

export type HeroIntent = {
  id: string;
  label: string;
  icon: IconComponent;
  badge?: string;
  tasks: TaskCard[];
};

export const HERO_INTENTS: HeroIntent[] = [
  {
    id: "build",
    label: "Build",
    icon: CodeIcon,
    tasks: [
      {
        id: "dashboard",
        label: "Create a dashboard",
        basePrompt: "Build a dashboard that tracks what matters and keeps itself up to date.",
        question: "Happy to. What should the dashboard track?",
      },
      {
        id: "idea-to-tool",
        label: "Turn an idea into a tool",
        basePrompt: "Turn this idea into a working tool I can actually use.",
        question: "Tell me the idea — a sentence is enough.",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: GradCapIcon,
    tasks: [
      {
        id: "company",
        label: "Research a company",
        basePrompt: "Research this company and tell me what actually matters about it.",
        question: "Which company should I look into?",
      },
      {
        id: "competitors",
        label: "Compare competitors",
        basePrompt: "Compare these competitors and show me where they genuinely differ.",
        question: "Who should I put side by side?",
      },
      {
        id: "topic",
        label: "Investigate a topic",
        basePrompt: "Investigate this topic and come back with a real answer, not a pile of links.",
        question: "What topic do you want me to dig into?",
      },
    ],
  },
  {
    id: "trade",
    label: "Trade",
    icon: TrendingUpIcon,
    tasks: [
      {
        id: "market",
        label: "Analyze the market",
        basePrompt:
          "Analyze the current market and help me understand the most important movements and what may be driving them.",
        question: "Sure. What market or asset do you want me to analyze?",
      },
      {
        id: "trading-flow",
        label: "Automate a trading workflow",
        basePrompt: "Set up a trading workflow that runs and reports back without me watching it.",
        question: "What should the workflow watch for?",
      },
    ],
  },
  {
    id: "automate",
    label: "Automate",
    icon: BoltIcon,
    tasks: [
      {
        id: "recurring",
        label: "Automate a recurring task",
        basePrompt: "Take this recurring task off my plate and run it on a schedule.",
        question: "What's the task that keeps coming back?",
      },
      {
        id: "monitor",
        label: "Monitor something for me",
        basePrompt: "Keep watch on this and tell me when something worth knowing changes.",
        question: "What should I keep an eye on?",
      },
    ],
  },
  {
    id: "monetize",
    label: "Monetize",
    icon: DollarIcon,
    badge: "NEW",
    tasks: [
      {
        id: "sell-skill",
        label: "Sell a skill",
        basePrompt: "Package this into a skill other people can buy and put to work.",
        question: "What kind of skill or workflow do you want to turn into something sellable?",
      },
      {
        id: "productize",
        label: "Turn a workflow into a product",
        basePrompt: "Turn this workflow into something I can publish and charge for.",
        question: "Which workflow do you want to productize?",
      },
    ],
  },
];

export const GUEST_FEATURES = {
  available: ["Conversation", "Conductor Mode", "Research & tasks", "Browse Marketplace"],
  // each locked item doubles as a pitch for what an account is actually for
  locked: [
    "Save memory & context",
    "Conversation history",
    "Continue on Desktop",
    "Run tasks 24/7",
    "Automations",
    "Publish & monetize",
    "Integrations",
    "Buy from Marketplace",
  ],
};

// ---------------------------------------------------------------------------
// "What Starchild can help with" — two levels.
// Level 1: three broad use cases, each with a real product view behind it.
// Level 2: compact extras that widen the perceived range without competing.
// Deliberately non-crypto up top: these three carry the "useful to anyone" job.
// ---------------------------------------------------------------------------

export type DemoResult =
  | { kind: "list"; heading: string; items: { text: string; note: string }[] }
  | { kind: "compare"; columns: [string, string]; rows: { label: string; a: string; b: string }[] }
  | { kind: "dashboard"; tiles: { label: string; value: string; delta?: string }[]; bars: number[] };

export type PrimaryUseCase = {
  id: string;
  label: string;
  blurb: string;
  example: string;
  prompt: string;
  steps: string[];
  result: DemoResult;
  task: TaskCard;
};

export const PRIMARY_USE_CASES: PrimaryUseCase[] = [
  {
    id: "work",
    label: "Work",
    blurb: "Get through what's actually on your plate — sorted, drafted, or moved forward.",
    example: "“I'm behind on a launch. What matters today?”",
    prompt: "I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",
    steps: [
      "Reading what's already committed this week",
      "Weighing what moves the launch against what can wait",
      "Drafting the two messages you still owe people",
    ],
    result: {
      kind: "list",
      heading: "Today, in order",
      items: [
        { text: "Send the delay note to the client", note: "blocks two other people" },
        { text: "Lock the launch copy", note: "everything downstream waits on this" },
        { text: "Move the pricing review to Friday", note: "not load-bearing for Thursday" },
      ],
    },
    task: {
      id: "work-priorities",
      label: "Sort out my week",
      basePrompt: "Help me work out what actually matters right now and what can wait.",
      question: "What's on your plate at the moment?",
    },
  },
  {
    id: "research",
    label: "Research",
    blurb: "A real answer — compared, sourced, and put together rather than handed to you as links.",
    example: "“Compare these three tools for my team.”",
    prompt: "Compare the three main project tools for a 12-person team. We care about cost and onboarding.",
    steps: [
      "Routing to a model with live search",
      "Pulling current pricing and limits from each vendor",
      "Double-checking the numbers before handing them over",
    ],
    result: {
      kind: "compare",
      columns: ["Linear", "Asana"],
      rows: [
        { label: "Cost / 12 seats", a: "$96/mo", b: "$131/mo" },
        { label: "Time to onboard", a: "~2 days", b: "~1 week" },
        { label: "Best for", a: "Shipping software", b: "Cross-team ops" },
      ],
    },
    task: {
      id: "research-compare",
      label: "Compare my options",
      basePrompt: "Compare these options properly and show me where they genuinely differ.",
      question: "What should I compare?",
    },
  },
  {
    id: "build",
    label: "Build",
    blurb: "Turn an idea into something that actually runs, without assembling the parts yourself.",
    example: "“Make my sales sheet into a dashboard.”",
    prompt: "Turn our sales sheet into a dashboard I can check every morning.",
    steps: [
      "Routing to a model tuned for code",
      "Wiring the spreadsheet up as a live source",
      "Running it once to make sure the numbers hold",
    ],
    result: {
      kind: "dashboard",
      tiles: [
        { label: "Revenue", value: "$48.2k", delta: "+12%" },
        { label: "Deals won", value: "31", delta: "+4" },
        { label: "Avg. cycle", value: "18d", delta: "−3d" },
      ],
      bars: [28, 35, 31, 44, 39, 52, 47, 58, 54, 68, 63, 84],
    },
    task: {
      id: "build-dashboard",
      label: "Build me a dashboard",
      basePrompt: "Build a dashboard that tracks what matters and keeps itself up to date.",
      question: "What should the dashboard track?",
    },
  },
];

// Level 2 — never repeats Work / Research / Build. Each one is a real entry point,
// not a label: clicking drops you into Guest Mode on that task.
export const SECONDARY_USE_CASES: { id: string; label: string; icon: IconComponent; task: TaskCard }[] = [
  {
    id: "ideas",
    label: "Ideas",
    icon: SparkleIcon,
    task: {
      id: "idea-shape",
      label: "Shape a rough idea",
      basePrompt: "Take this half-formed idea and help me shape it into something real.",
      question: "What's the idea? Rough is fine.",
    },
  },
  {
    id: "decisions",
    label: "Decisions",
    icon: ScaleIcon,
    task: {
      id: "decision-weigh",
      label: "Think through a decision",
      basePrompt: "Help me think through this decision and get clearer on what matters in it.",
      question: "What are you weighing up?",
    },
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderIcon,
    task: {
      id: "project-resume",
      label: "Pick a project back up",
      basePrompt: "Help me pick this project back up and work out the next move.",
      question: "Which project do you want to get back into?",
    },
  },
  {
    id: "trade",
    label: "Trade",
    icon: TrendingUpIcon,
    task: {
      id: "trade-market",
      label: "Read the market",
      basePrompt:
        "Analyze the current market and help me understand the most important movements and what may be driving them.",
      question: "What market or asset should I look at?",
    },
  },
  {
    id: "automate",
    label: "Automate",
    icon: BoltIcon,
    task: {
      id: "automate-recurring",
      label: "Take a task off my plate",
      basePrompt: "Take this recurring task off my plate and run it on a schedule.",
      question: "What's the task that keeps coming back?",
    },
  },
  {
    id: "monetize",
    label: "Monetize",
    icon: DollarIcon,
    task: {
      id: "monetize-skill",
      label: "Turn this into a product",
      basePrompt: "Package this into a skill other people can buy and put to work.",
      question: "What do you want to turn into something sellable?",
    },
  },
];

// what "It gets to know how you work" teases before the five-question onboarding
export const CONTEXT_SIGNALS = [
  "Your priorities",
  "How you like to receive help",
  "Recurring projects",
  "What you're trying to work through",
];

export type Step = { title: string; sub: string };
export type ModelBadge = { name: string; icon: string };

export type Deliverable =
  | { kind: "poster"; title: string; subtitle: string }
  | { kind: "brand"; name: string; tagline: string; colors: string[] }
  | { kind: "market"; rows: { label: string; value: string; up: boolean }[] }
  | { kind: "code"; language: string; snippet: string }
  | { kind: "none" };

export type Scenario = {
  id: string;
  models: ModelBadge[];
  steps: [Step, Step, Step, Step];
  deliverable: Deliverable;
  stat: { withoutLabel: string; withoutTokens: number; withLabel: string; withTokens: number };
};

const IMAGE: Scenario = {
  id: "image",
  models: [{ name: "Gemini", icon: "gemini" }],
  steps: [
    {
      title: "Conductor Mode is choosing the best model",
      sub: "A poster is a visual, creative job — so it's routed to a model actually built to compose images, not just describe them.",
    },
    {
      title: "Assembling the right tools",
      sub: "Plus a quick, cheap research pass first, so the details are real — Odysseus doesn't end up looking generic.",
    },
    {
      title: "Getting the advisor opinion",
      sub: "A fast visual check before it reaches you: is the composition solid, is the text legible?",
    },
    {
      title: "Delivering",
      sub: "Here's your poster — and what it actually cost, below.",
    },
  ],
  deliverable: {
    kind: "poster",
    title: "THE ODYSSEY",
    subtitle: "a journey home, twenty years in the making",
  },
  stat: { withoutLabel: "One model for everything", withoutTokens: 12800, withLabel: "Conductor Mode", withTokens: 4600 },
};

const DESIGN: Scenario = {
  id: "design",
  models: [
    { name: "ChatGPT", icon: "openai" },
    { name: "Gemini", icon: "gemini" },
  ],
  steps: [
    {
      title: "Conductor Mode is choosing the best model",
      sub: "A brand is really two jobs — naming and voice go to a model sharp with language, the logo direction goes to a visual one.",
    },
    {
      title: "Assembling the right tools",
      sub: "The color palette is genuinely easy, so it's handed to something fast and cheap instead of a heavyweight.",
    },
    {
      title: "Getting the advisor opinion",
      sub: "One more pass checks that the name, palette, and logo direction actually agree with each other.",
    },
    {
      title: "Delivering",
      sub: "Here's your starter brand kit — and what it actually cost, below.",
    },
  ],
  deliverable: {
    kind: "brand",
    name: "Wanderlight Coffee",
    tagline: "Slow mornings, strong coffee.",
    colors: ["#6b4a34", "#e7bd8f", "#2f2a25", "#f4511e"],
  },
  stat: { withoutLabel: "One model for everything", withoutTokens: 15400, withLabel: "Conductor Mode", withTokens: 5800 },
};

const TRADING: Scenario = {
  id: "trading",
  models: [{ name: "Grok", icon: "xai" }],
  steps: [
    {
      title: "Conductor Mode is choosing the best model",
      sub: "Numbers matter more than eloquence here, so it's routed to a model actually wired to live market data, not one guessing from memory.",
    },
    {
      title: "Assembling the right tools",
      sub: "A live data feed pulls today's real figures — not a plausible-sounding hallucination.",
    },
    {
      title: "Getting the advisor opinion",
      sub: "This is the kind of task where being wrong actually costs you, so the numbers get double-checked before delivery.",
    },
    {
      title: "Delivering",
      sub: "Here's today's snapshot — and what it actually cost, below.",
    },
  ],
  deliverable: {
    kind: "market",
    rows: [
      { label: "S&P 500", value: "+0.4%", up: true },
      { label: "BTC", value: "-1.2%", up: false },
      { label: "10Y Yield", value: "4.28%", up: true },
    ],
  },
  stat: { withoutLabel: "One model for everything", withoutTokens: 9600, withLabel: "Conductor Mode", withTokens: 3900 },
};

const CODE: Scenario = {
  id: "code",
  models: [{ name: "DeepSeek", icon: "deepseek" }],
  steps: [
    {
      title: "Conductor Mode is choosing the best model",
      sub: "Debugging needs a model actually tuned for code — not a generalist that's merely fluent in it.",
    },
    {
      title: "Assembling the right tools",
      sub: "It also gets a sandbox: a place to actually run the fix and see if it works, instead of just predicting it.",
    },
    {
      title: "Getting the advisor opinion",
      sub: "The result gets checked before it reaches you, catching the kind of bug that looks fine at a glance.",
    },
    {
      title: "Delivering",
      sub: "Here's your fix — and what it actually cost, below.",
    },
  ],
  deliverable: {
    kind: "code",
    language: "python",
    snippet: `def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`,
  },
  stat: { withoutLabel: "One model for everything", withoutTokens: 13200, withLabel: "Conductor Mode", withTokens: 4900 },
};

const GENERIC: Scenario = {
  id: "generic",
  models: [{ name: "the right model", icon: "ai-generic" }],
  steps: [
    {
      title: "Conductor Mode is choosing the best model",
      sub: "It reads your whole request, then matches it to a model actually built for that kind of work — not just the \"smartest\" one available.",
    },
    {
      title: "Assembling the right tools",
      sub: "It grabs only what that specific job needs — nothing you're not using, nothing you're paying for and not touching.",
    },
    {
      title: "Getting the advisor opinion",
      sub: "On anything that actually matters, a second pass quietly checks the work before you ever see it.",
    },
    {
      title: "Delivering",
      sub: "That's the whole trick — and here's what it saves, below.",
    },
  ],
  deliverable: { kind: "none" },
  stat: { withoutLabel: "Always the top model", withoutTokens: 14200, withLabel: "Conductor Mode", withTokens: 5100 },
};

const SCENARIOS: { test: RegExp; scenario: Scenario }[] = [
  { test: /poster|image|odyssey|artwork|illustration/i, scenario: IMAGE },
  { test: /coffee|brand|logo/i, scenario: DESIGN },
  { test: /market|trading|trade|stock|crypto/i, scenario: TRADING },
  { test: /code|python|debug|sql|traceback|landing page|bug|dashboard/i, scenario: CODE },
];

export const EXAMPLE_SCENARIOS: { prompt: string; scenario: Scenario }[] = [
  { prompt: "Make a poster for the Odyssey movie", scenario: IMAGE },
  { prompt: "Make me a coffee shop brand", scenario: DESIGN },
  { prompt: "How's the market today?", scenario: TRADING },
  { prompt: "Debug this Python traceback", scenario: CODE },
];

export function pickScenario(text: string): Scenario {
  const match = SCENARIOS.find(({ test }) => test.test(text));
  return match?.scenario ?? GENERIC;
}

export const CATEGORIES = ["All", "Writing", "Design", "Code", "Marketing"];

export type MarketplaceSkill = {
  id: string;
  title: string;
  price: string;
  category: string;
  blurb: string;
  provider: string;
  mine?: boolean;
};

export const MARKETPLACE_SEED: MarketplaceSkill[] = [
  {
    id: "resume-rewrite",
    title: "Resume Rewrite",
    price: "$4",
    category: "Writing",
    blurb: "Turns any resume into something a recruiter actually reads.",
    provider: "Ana R.",
  },
  {
    id: "logo-concepts",
    title: "Logo Concept Pack",
    price: "$9",
    category: "Design",
    blurb: "Five logo directions from one product description.",
    provider: "Studio Nine",
  },
  {
    id: "sql-fixer",
    title: "SQL Query Fixer",
    price: "$3",
    category: "Code",
    blurb: "Feed it a broken query, get back one that runs.",
    provider: "Kevin M.",
  },
  {
    id: "market-brief",
    title: "Daily Market Brief",
    price: "$6",
    category: "Marketing",
    blurb: "A verified snapshot of the numbers that matter, every morning.",
    provider: "Data Master",
  },
];
