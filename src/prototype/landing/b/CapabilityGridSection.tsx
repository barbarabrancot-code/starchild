import { motion } from "motion/react";
import type { ComponentType } from "react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import {
  AutomateArt,
  BuildArt,
  MonetizeArt,
  ResearchArt,
  TradeArt,
  WorkArt,
} from "./capabilityArt";

// Version B, layer 1 — breadth. Six cards answer "what can I use this for?" and
// nothing more; persistence (Agents) and intelligence (Conductor) come after.
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
    id: "work",
    tag: "Day to day",
    title: "Work",
    copy: "Get through what's actually on your plate — sorted, drafted, or moved forward.",
    art: WorkArt,
    task: {
      id: "work-priorities",
      label: "Sort out my week",
      basePrompt: "Help me work out what actually matters right now and what can wait.",
      question: "What's on your plate at the moment?",
    },
  },
  {
    id: "research",
    tag: "Answers",
    title: "Research",
    copy: "Find, compare, and make sense of information without stitching everything together yourself.",
    art: ResearchArt,
    task: {
      id: "research-compare",
      label: "Compare my options",
      basePrompt: "Compare these options properly and show me where they genuinely differ.",
      question: "What should I compare?",
    },
  },
  {
    id: "build",
    tag: "Make",
    title: "Build",
    copy: "Turn an idea into something functional — a tool, dashboard, workflow, or project.",
    art: BuildArt,
    task: {
      id: "build-dashboard",
      label: "Build me a dashboard",
      basePrompt: "Build a dashboard that tracks what matters and keeps itself up to date.",
      question: "What should the dashboard track?",
    },
  },
  {
    id: "trade",
    tag: "Markets",
    title: "Trade",
    copy: "Understand what the market is doing and act on what matters.",
    art: TradeArt,
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
    tag: "Runs itself",
    title: "Automate",
    copy: "Take repetitive work off your plate and let Starchild keep it moving.",
    art: AutomateArt,
    task: {
      id: "automate-recurring",
      label: "Take a task off my plate",
      basePrompt: "Take this recurring task off my plate and run it on a schedule.",
      question: "What's the task that keeps coming back?",
    },
  },
  {
    id: "monetize",
    tag: "Distribute",
    title: "Monetize",
    copy: "Turn what you build into something other people can use — and pay for.",
    art: MonetizeArt,
    task: {
      id: "monetize-skill",
      label: "Turn this into a product",
      basePrompt: "Package this into a skill other people can buy and put to work.",
      question: "What do you want to turn into something sellable?",
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

        /* Work: ragged input edges snap into an ordered column */
        .cg-row {
          transform: translateX(var(--dx));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 40ms);
        }
        .cg-card:hover .cg-row { transform: translateX(0); }

        /* Research: the feeds brighten one after another as they meet */
        .cg-feed { opacity: .55; transition: opacity .35s ease; transition-delay: calc(var(--i) * 50ms); }
        .cg-card:hover .cg-feed { opacity: 1; }
        .cg-node { transform-origin: 96px 48px; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-node { transform: scale(1.35); }

        /* Build: the top face lifts clear of the baseline */
        .cg-rise { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-rise { transform: translateY(-4px); }

        /* Trade: the ring keeps turning, faster when you look at it */
        .cg-orbit { transform-origin: 80px 48px; animation: cg-spin 16s linear infinite; }
        .cg-orbit--slow { animation-duration: 24s; animation-direction: reverse; }
        .cg-card:hover .cg-orbit { animation-duration: 7s; }
        .cg-card:hover .cg-orbit--slow { animation-duration: 11s; }
        @keyframes cg-spin { to { transform: rotate(360deg); } }

        /* Automate: a short bright segment runs the path without stopping */
        .cg-travel {
          stroke-dasharray: 20 240; stroke-dashoffset: 260;
          animation: cg-run 5s linear infinite;
        }
        .cg-card:hover .cg-travel { animation-duration: 2.6s; }
        @keyframes cg-run { to { stroke-dashoffset: 0; } }

        /* Monetize: the thing you made reaches further out */
        .cg-branch { opacity: .5; transition: opacity .35s ease; transition-delay: calc(var(--i) * 45ms); }
        .cg-card:hover .cg-branch { opacity: 1; }
        .cg-dest { transition: transform .4s cubic-bezier(.16,1,.3,1); transition-delay: calc(var(--i) * 45ms); }
        .cg-card:hover .cg-dest { transform: translateX(4px); }

        @media (prefers-reduced-motion: reduce) {
          .cg-orbit, .cg-travel { animation: none; }
          .cg-row { transform: none; }
          .cg-rise, .cg-dest, .cg-node, .cg-arrow { transition: none; }
        }
      `}</style>
    </section>
  );
}
