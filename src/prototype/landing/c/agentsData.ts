import type { TaskCard } from "../../data";

// Version C, layer 2 — persistence. Three ways to hand Starchild work that keeps
// happening. Deliberately plain language: none of the three is called an agent,
// and none of them needs the visitor to know the word. The product view is where
// "Agents" appears, so the term is learned from the thing rather than taught.
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
    label: "Keep an eye on something",
    blurb: "Starchild can follow what changes and bring you what matters.",
    prompt: "Let me know when flights to Tokyo drop below $700.",
    panel: {
      kind: "monitor",
      agentName: "Tokyo flights",
      cadence: "Checking every hour",
      sources: ["Google Flights", "Skyscanner", "Airlines", "Fare alerts"],
      checks: [
        { time: "09:00", text: "Checked 6 airlines — cheapest $842" },
        { time: "13:00", text: "Checked 6 airlines — cheapest $828" },
        { time: "17:40", text: "Dropped below your $700", hit: true },
      ],
      alert: {
        heading: "Worth your attention",
        title: "Tokyo in October — $684 return",
        detail: "Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted.",
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
    label: "Take care of a routine",
    blurb: "Let Starchild handle something you do again and again.",
    prompt: "Every Sunday, help me plan the week ahead.",
    panel: {
      kind: "recurring",
      agentName: "Week ahead",
      uses: ["Calendar", "Gmail", "Notes", "Reminders"],
      runs: "Every Sunday at 6:00 PM",
      outputName: "Plan for the week",
      output: {
        heading: "This week",
        items: [
          { text: "Thursday is your only clear day", note: "the one to protect" },
          { text: "Two deadlines both land on Friday", note: "start the smaller one Tuesday" },
          { text: "Dentist still isn't booked", note: "third week it's slipped" },
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
    label: "Give it a job",
    blurb: "Tell Starchild what you want done, what matters, and when to step in.",
    prompt: "Plan our trip in October. You know the budget and the dates — check with me before booking anything.",
    panel: {
      kind: "config",
      agentName: "October trip",
      fields: [
        { label: "The job", value: "Plan the trip end to end" },
        { label: "What matters", value: "Budget, the dates, who's coming" },
        { label: "When to step in", value: "Ask me before booking anything" },
      ],
      tools: ["Web", "Gmail", "Calendar", "Maps"],
      status: "Active · first plan ready tomorrow",
    },
    task: {
      id: "agent-specialist",
      label: "Give Starchild a job",
      basePrompt: "I want to hand you a job — here's what I want done and what matters to me.",
      question: "What should I take care of for you?",
    },
  },
];
