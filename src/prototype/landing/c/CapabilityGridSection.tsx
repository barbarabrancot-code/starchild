import { motion } from "motion/react";
import type { ComponentType } from "react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import {
  CreateArt,
  ExploreArt,
  OrganizeArt,
  TalkArt,
  ThinkArt,
  WorkArt,
} from "./capabilityArt";

// Version C, layer 1 — breadth. Six cards answer "what can I use this for?" and
// nothing more; persistence (Agents) and intelligence (Conductor) come after.
// Where B leads with builder/market territory (Build, Trade, Monetize), C is cut
// for a general visitor: the six are things anyone already does in a day.
// Every card is still a real entry point, so clicking one drops into Guest Mode.
type Capability = {
  id: string;
  tag: string;
  title: string;
  copy: string;
  art: ComponentType<{ className?: string }>;
  task: TaskCard;
};

const CAPABILITIES: Capability[] = [
  {
    id: "talk",
    tag: "Conversation",
    title: "Talk",
    copy: "Talk things through with an AI that gets to know you.",
    art: TalkArt,
    task: {
      id: "talk-through",
      label: "Talk something through",
      basePrompt: "I want to talk something through — help me think out loud about it.",
      question: "What's on your mind?",
    },
  },
  {
    id: "think",
    tag: "Decisions",
    title: "Think",
    copy: "Work through ideas, questions, and decisions together.",
    art: ThinkArt,
    task: {
      id: "think-decision",
      label: "Think through a decision",
      basePrompt: "Help me think through this decision and show me what I might be missing.",
      question: "What are you weighing up?",
    },
  },
  {
    id: "work",
    tag: "Day to day",
    title: "Work",
    copy: "Get through what's on your plate.",
    art: WorkArt,
    task: {
      id: "work-priorities",
      label: "Sort out my week",
      basePrompt: "Help me work out what actually matters right now and what can wait.",
      question: "What's on your plate at the moment?",
    },
  },
  {
    id: "explore",
    tag: "Curiosity",
    title: "Explore",
    copy: "Learn, compare, and make sense of things.",
    art: ExploreArt,
    task: {
      id: "explore-topic",
      label: "Make sense of something",
      basePrompt: "Help me understand this properly — what matters, what doesn't, and why.",
      question: "What do you want to get to the bottom of?",
    },
  },
  {
    id: "create",
    tag: "Make",
    title: "Create",
    copy: "Turn an idea into something real.",
    art: CreateArt,
    task: {
      id: "create-idea",
      label: "Turn an idea into something real",
      basePrompt: "Turn this idea into something real I can actually use.",
      question: "Tell me the idea — a sentence is enough.",
    },
  },
  {
    id: "organize",
    tag: "Structure",
    title: "Organize",
    copy: "Bring structure to tasks, projects, and recurring work.",
    art: OrganizeArt,
    task: {
      id: "organize-work",
      label: "Get on top of things",
      basePrompt: "Help me bring some structure to everything I've got going on.",
      question: "What do you need to get on top of?",
    },
  },
];

export function CapabilityGridSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  return (
    <section className="cg-section bg-[#0a0a0a] py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 max-w-[46ch]">
            <h2
              className="text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              What Starchild can help with.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6">
          {CAPABILITIES.map(({ id, tag, title, copy, art: Art, task }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => onStartTask(task)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="cg-card col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <span className="cg-art" aria-hidden="true">
                <Art />
              </span>
              <span className="cg-tag">{tag}</span>
              <span className="cg-title-row">
                <span className="cg-title">{title}</span>
                <ArrowUpIcon className="cg-arrow size-3.5 rotate-45" />
              </span>
              <span className="cg-copy">{copy}</span>
            </motion.button>
          ))}
        </div>
      </Container>

      <style>{`
        .cg-card {
          display: flex; flex-direction: column; text-align: left; cursor: pointer;
          min-width: 0;
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,.02);
          transition: border-color .25s ease, background-color .25s ease;
        }
        .cg-card:hover { border-color: rgba(248,70,0,.42); background: rgba(255,255,255,.04); }
        .cg-card:focus-visible { outline: 2px solid rgba(248,70,0,.6); outline-offset: 2px; }

        .cg-art {
          display: block; padding: 26px 22px 10px;
          background:
            radial-gradient(120% 90% at 50% 0%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 62%),
            #060606;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .cg-svg { display: block; width: 100%; height: auto; overflow: visible; }

        .cg-tag {
          display: block; margin: 20px 22px 0;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.32);
        }
        .cg-title-row { display: flex; align-items: center; gap: 10px; margin: 8px 22px 0; }
        .cg-title {
          font-family: var(--font-google-sans); font-size: 20px; font-weight: 600; color: #fff;
        }
        .cg-arrow {
          margin-left: auto; color: rgba(255,255,255,.22); flex: none;
          transition: color .2s ease, transform .2s ease;
        }
        .cg-card:hover .cg-arrow { color: var(--color-primary); transform: rotate(45deg) translateY(-2px); }

        .cg-copy {
          display: block; margin: 8px 22px 22px; max-width: 34ch;
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.55;
          color: rgba(255,255,255,.5);
        }

        /* --- art behaviour: quiet at rest, resolving on hover --------------- */

        /* Talk: each line writes itself in, question first, then the reply */
        .cg-say {
          transform-box: fill-box; transform: scaleX(.35); opacity: .5;
          transition: transform .45s cubic-bezier(.16,1,.3,1), opacity .35s ease;
          transition-delay: calc(var(--i) * 60ms);
        }
        .cg-card:hover .cg-say { transform: scaleX(1); opacity: 1; }

        /* Think: the route through the options draws itself */
        .cg-route {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          transition: stroke-dashoffset .8s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-route { stroke-dashoffset: 0; }

        /* Work: ragged input edges snap into an ordered column */
        .cg-row {
          transform: translateX(var(--dx));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 40ms);
        }
        .cg-card:hover .cg-row { transform: translateX(0); }

        /* Explore: the sources brighten one after another as they meet */
        .cg-feed { opacity: .55; transition: opacity .35s ease; transition-delay: calc(var(--i) * 50ms); }
        .cg-card:hover .cg-feed { opacity: 1; }
        .cg-node { transform-origin: 96px 48px; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-node { transform: scale(1.35); }

        /* Create: the top face lifts clear of the baseline */
        .cg-rise { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-rise { transform: translateY(-4px); }

        /* Organize: the loose blocks land on the grid */
        .cg-block {
          transform: translate(var(--dx), var(--dy));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 45ms);
        }
        .cg-card:hover .cg-block { transform: translate(0, 0); }

        @media (prefers-reduced-motion: reduce) {
          .cg-row, .cg-block { transform: none; }
          .cg-say { transform: none; opacity: 1; }
          .cg-route { stroke-dasharray: none; stroke-dashoffset: 0; }
          .cg-rise, .cg-node, .cg-arrow, .cg-say, .cg-block { transition: none; }
        }
      `}</style>
    </section>
  );
}
