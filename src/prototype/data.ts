import {
  CodeIcon,
  SparkleIcon,
  PencilIcon,
  GradCapIcon,
  TrendingUpIcon,
} from "./icons";

export const HERO_CHIPS = [
  "Make me a coffee shop brand",
  "Make a poster for the Odyssey movie",
  "How's the market today?",
  "Debug this Python traceback",
  "Turn this idea into a landing page",
  "Explain Conductor Mode to me",
];

export const CAPABILITY_PILLS = [
  { id: "code", label: "Code", icon: CodeIcon },
  { id: "create", label: "Create", icon: SparkleIcon },
  { id: "write", label: "Write", icon: PencilIcon },
  { id: "learn", label: "Learn", icon: GradCapIcon },
  { id: "trade", label: "Trade", icon: TrendingUpIcon },
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
  { test: /code|python|debug|sql|traceback|landing page|bug/i, scenario: CODE },
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
