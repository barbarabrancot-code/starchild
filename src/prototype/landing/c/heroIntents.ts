import { SparkleIcon, GradCapIcon, CodeIcon, BriefcaseIcon, FolderIcon } from "../../icons";
import type { HeroIntent } from "../../data";

// Version C's hero chips. Same shape and behaviour as the shared HERO_INTENTS —
// chip opens ready-made task cards — but cut for a general visitor: no Trade and
// no Monetize, and no "NEW" badge on anything. They echo the six cards further
// down the page, so the chip you press and the card you scroll to agree.
export const HERO_INTENTS_C: HeroIntent[] = [
  {
    id: "talk",
    label: "Talk",
    icon: SparkleIcon,
    tasks: [
      {
        id: "talk-through",
        label: "Talk something through",
        basePrompt: "I want to talk something through — help me think out loud about it.",
        question: "What's on your mind?",
      },
      {
        id: "talk-decision",
        label: "Help me decide",
        basePrompt: "Help me think through this decision and show me what I might be missing.",
        question: "What are you weighing up?",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: GradCapIcon,
    tasks: [
      {
        id: "research-topic",
        label: "Look into something",
        basePrompt: "Look into this properly and come back with a real answer, not a pile of links.",
        question: "What should I dig into?",
      },
      {
        id: "research-compare",
        label: "Compare my options",
        basePrompt: "Compare these options properly and show me where they genuinely differ.",
        question: "What should I put side by side?",
      },
    ],
  },
  {
    id: "build",
    label: "Build",
    icon: CodeIcon,
    tasks: [
      {
        id: "build-idea",
        label: "Turn an idea into something real",
        basePrompt: "Turn this idea into something real I can actually use.",
        question: "Tell me the idea — a sentence is enough.",
      },
      {
        id: "build-dashboard",
        label: "Create a dashboard",
        basePrompt: "Build a dashboard that tracks what matters and keeps itself up to date.",
        question: "What should the dashboard track?",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    icon: BriefcaseIcon,
    tasks: [
      {
        id: "work-priorities",
        label: "Sort out my week",
        basePrompt: "Help me work out what actually matters right now and what can wait.",
        question: "What's on your plate at the moment?",
      },
      {
        id: "work-draft",
        label: "Draft something I owe someone",
        basePrompt: "Help me write the thing I've been putting off sending.",
        question: "Who's it for, and what does it need to say?",
      },
    ],
  },
  {
    id: "organize",
    label: "Organize",
    icon: FolderIcon,
    tasks: [
      {
        id: "organize-work",
        label: "Get on top of things",
        basePrompt: "Help me bring some structure to everything I've got going on.",
        question: "What do you need to get on top of?",
      },
      {
        id: "organize-project",
        label: "Bring order to a project",
        basePrompt: "Take this project and give it a structure I can actually follow.",
        question: "What's the project?",
      },
    ],
  },
];
