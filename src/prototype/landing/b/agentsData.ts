import type { TaskCard } from "../../data";

// Version B, layer 2 — persistence. Three ways to hand Starchild work that keeps
// happening. Deliberately plain language: no orchestration, no runtimes, no
// workflows. The product view carries the explanation, the copy stays short.
//
// Each example also names the tools and sources that agent works with. That is how
// integrations show up here — inside a real job, never as a wall of logos.

export type AgentPanel =
  | {
      kind: "monitor";
      agentName: string;
      cadence: string;
      /** what this agent is connected to and watching */
      sources: string[];
      checks: { time: string; text: string; hit?: boolean }[];
      alert: { heading: string; title: string; detail: string };
    }
  | {
      kind: "recurring";
      agentName: string;
      /** tools it pulls from before it runs */
      uses: string[];
      runs: string;
      outputName: string;
      output: { heading: string; items: { text: string; note: string }[] };
    }
  | {
      kind: "config";
      agentName: string;
      fields: { label: string; value: string }[];
      tools: string[];
      status: string;
    };

export type AgentExample = {
  id: string;
  label: string;
  blurb: string;
  prompt: string;
  panel: AgentPanel;
  task: TaskCard;
};

export const AGENT_EXAMPLES: AgentExample[] = [
  {
    id: "monitor",
    label: "Monitor something",
    blurb: "Keep an eye on a market, competitor, topic, or anything else that changes.",
    prompt: "Watch these competitors and tell me when one launches a new feature.",
    panel: {
      kind: "monitor",
      agentName: "Competitor watch",
      cadence: "Checking every hour",
      sources: ["Linear", "Notion", "Figma", "Changelogs & blogs"],
      checks: [
        { time: "09:00", text: "Checked 4 sources — nothing new" },
        { time: "11:00", text: "Checked 4 sources — nothing new" },
        { time: "13:20", text: "Change detected on Linear", hit: true },
      ],
      alert: {
        heading: "Worth your attention",
        title: "Linear shipped a new planning view",
        detail: "Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March.",
      },
    },
    task: {
      id: "agent-monitor",
      label: "Set up a watch for me",
      basePrompt: "Keep an eye on this for me and tell me when something meaningful changes.",
      question: "What should I be watching?",
    },
  },
  {
    id: "recurring",
    label: "Handle a recurring task",
    blurb: "Let Starchild run the same workflow for you whenever it needs to happen.",
    prompt: "Every Monday, review my updates and tell me what needs my attention.",
    panel: {
      kind: "recurring",
      agentName: "Monday review",
      uses: ["Gmail", "Slack", "Calendar", "Notion"],
      runs: "Every Monday at 9:00 AM",
      outputName: "Weekly priorities summary",
      output: {
        heading: "This Monday",
        items: [
          { text: "Client contract is unsigned", note: "renewal date is Friday" },
          { text: "Two invoices past due", note: "one is 21 days out" },
          { text: "Hiring loop is stalled", note: "waiting on your feedback" },
        ],
      },
    },
    task: {
      id: "agent-recurring",
      label: "Take this off my plate",
      basePrompt: "Run this for me on a schedule and report back when it's done.",
      question: "What's the task that keeps coming back?",
    },
  },
  {
    id: "specialist",
    label: "Build a specialized agent",
    blurb: "Give it a job, context, and the tools it needs.",
    prompt:
      "Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",
    panel: {
      kind: "config",
      agentName: "Market analyst",
      fields: [
        { label: "Goal", value: "Track meaningful competitor changes" },
        { label: "Context", value: "What our team cares about" },
        { label: "When it runs", value: "Continuously" },
      ],
      tools: ["Web", "GitHub", "Telegram", "API"],
      status: "Active · first summary tomorrow at 08:00",
    },
    task: {
      id: "agent-specialist",
      label: "Build me an agent",
      basePrompt: "Help me create an agent with a clear job, the context it needs, and the right tools.",
      question: "What job should this agent have?",
    },
  },
];
