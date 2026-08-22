import { motion } from "motion/react";
import type { ComponentType } from "react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import {
  ConductorArt,
  CreateArt,
  MarketArt,
  RunArt,
  TalkArt,
  WorkArt,
} from "./capabilityArt";

// Version C, layer 1 — breadth. Six cards answer "what can I use this for?".
// Where B leads with builder/market territory (Build, Trade, Monetize), C is cut
// for a general visitor: things anyone already does in a day, plus the two that
// are Starchild's own — Conductor Mode and the Marketplace.
// Every card is a real entry point, so clicking one drops into Guest Mode.
//
// Each card says the promise first and the mechanism second: the title is what
// the visitor gets, the line under it is how. The tag above the drawing is the
// territory, so the three read top to bottom as where / what / how.

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
    id: "conversation",
    tag: "Conversation",
    title: "Talk to an AI that remembers you.",
    copy: "Keep the context and continue without starting over.",
    art: TalkArt,
    task: {
      id: "talk-through",
      label: "Talk something through",
      basePrompt: "I want to talk something through — help me think out loud about it.",
      question: "What's on your mind?",
    },
  },
  {
    id: "conductor",
    tag: "Conductor Mode",
    title: "Get the right AI without choosing it yourself.",
    copy: "Starchild handles the model choice for each task.",
    art: ConductorArt,
    task: {
      id: "conductor-task",
      label: "Give it something to route",
      basePrompt: "Take this on and use whichever model handles it best — I don't want to pick.",
      question: "What do you need done?",
    },
  },
  {
    id: "create",
    tag: "Create",
    title: "Turn ideas into something real.",
    copy: "Move from a thought to something you can actually use.",
    art: CreateArt,
    task: {
      id: "build-idea",
      label: "Turn an idea into something real",
      basePrompt: "Turn this idea into something real I can actually use.",
      question: "Tell me the idea — a sentence is enough.",
    },
  },
  {
    id: "day-to-day",
    tag: "Day to day",
    title: "Get everyday tasks off your plate.",
    copy: "Plan, write, organize, summarize, and handle routine work faster.",
    art: WorkArt,
    task: {
      id: "work-priorities",
      label: "Sort out my week",
      basePrompt: "Help me work out what actually matters right now and what can wait.",
      question: "What's on your plate at the moment?",
    },
  },
  {
    id: "agents",
    tag: "Agents",
    title: "Hand it over and keep moving.",
    copy: "Let agents keep checking, following up, and working over time.",
    art: RunArt,
    task: {
      id: "run-task",
      label: "Take something off my plate",
      basePrompt: "Take this off my plate and run it end to end — come back to me when it's done.",
      question: "What should I take on?",
    },
  },
  {
    id: "marketplace",
    tag: "Marketplace",
    title: "Use what already works — or earn from yours.",
    copy: "Start with something ready-made, customize it, or publish your own.",
    art: MarketArt,
    task: {
      id: "market-start",
      label: "Start from something ready-made",
      basePrompt: "Show me what is already built that I could start from instead of building it myself.",
      question: "What are you trying to get done?",
    },
  },
];

export function CapabilityGridSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  return (
    <section className="cg-section bg-[#0a0a0a] pt-[var(--section-gap)] pb-[var(--section-pad)]">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 max-w-[46ch]">
            <h2
              className="text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              What Starchild can help with.
            </h2>
          </div>
        </div>

        {/* The tag sits above the drawing rather than under it: with no card around
            the column, something has to anchor its top edge, and a small label there
            is what makes six drawings read as a set of plates rather than as art
            floating in the page. */}
        <div className="cg-grid">
          {CAPABILITIES.map(({ id, tag, title, copy, art: Art, task }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => onStartTask(task)}
              // Opacity only. The rules between the columns are borders on these
              // buttons, so anything that moves would slide six hairlines into place
              // one after another — the entrance would be the grid assembling itself.
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="cg-card"
            >
              <span className="cg-tag">{tag}</span>
              <span className="cg-art" aria-hidden="true">
                <Art />
              </span>
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
        .cg-section { --cg-rule: rgba(255,255,255,.08); }

        /* Columns divided by hairlines instead of six boxes. The rules run the full
           height, through the drawing and the text alike, which is what holds the
           six together as one plate rather than as a row of tiles. */
        .cg-grid {
          margin-top: 56px;
          display: grid; grid-template-columns: 1fr;
          border-top: 1px solid var(--cg-rule);
        }
        @media (min-width: 640px) { .cg-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .cg-grid { grid-template-columns: repeat(3, 1fr); } }

        .cg-card {
          display: flex; flex-direction: column; text-align: left; cursor: pointer;
          min-width: 0; padding: 24px 30px 34px;
          border: 0; border-bottom: 1px solid var(--cg-rule);
          background: none;
          transition: background-color .3s ease;
        }
        /* the wash is the only thing standing in for the old border — enough to
           say "this is a target", not enough to put the box back */
        .cg-card:hover { background: rgba(255,255,255,.022); }
        .cg-card:focus-visible { outline: 2px solid rgba(248,70,0,.6); outline-offset: -2px; }

        /* No rule at the outer left edge: the block starts flush with the page. Set
           per breakpoint because which cards begin a row changes with the columns. */
        @media (min-width: 640px) {
          .cg-card { border-left: 1px solid var(--cg-rule); }
          .cg-card:nth-child(2n + 1) { border-left: 0; }
        }
        @media (min-width: 1024px) {
          .cg-card:nth-child(2n + 1) { border-left: 1px solid var(--cg-rule); }
          .cg-card:nth-child(3n + 1) { border-left: 0; }
        }

        .cg-tag {
          display: block;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.26);
        }

        /* The drawing gets the room it never had inside a card, and no panel behind
           it: on the page's own black it reads as a diagram, which is what it is. */
        .cg-art {
          display: flex; align-items: center; justify-content: center;
          padding: 34px 0 40px; min-height: 200px;
        }
        .cg-svg { display: block; width: 100%; max-width: 264px; height: auto; overflow: visible; }

        /* The titles are full sentences and wrap, so the row aligns to the top and
           the arrow is nudged down to sit on the first line rather than floating
           at the middle of a two-line block. */
        .cg-title-row { display: flex; align-items: flex-start; gap: 8px; }
        .cg-title {
          font-family: var(--font-google-sans); font-size: 19px; font-weight: 600; color: #fff;
          line-height: 1.32; text-wrap: balance;
        }
        .cg-arrow {
          color: rgba(255,255,255,.22); flex: none; margin-top: 5px;
          transition: color .2s ease, transform .2s ease;
        }
        .cg-card:hover .cg-arrow { color: var(--color-primary); transform: rotate(45deg) translateY(-2px); }

        .cg-copy {
          display: block; margin-top: 10px; max-width: 32ch;
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          letter-spacing: var(--tracking-body);
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

        /* Run for me: the dot carries on round the track and the covered arc
           follows it. Both are driven off the same angle — 90deg at rest, 315deg
           on hover — so the arc always ends exactly under the dot. The track is
           2*pi*28 = 175.9 long, hence the dasharray. */
        .cg-run { transform-origin: 80px 48px; transform: rotate(-90deg); }
        .cg-run-arc {
          stroke-dasharray: 175.9; stroke-dashoffset: 131.9;
          transition: stroke-dashoffset .9s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-run-arc { stroke-dashoffset: 22; }
        .cg-run-dot {
          transform-origin: 80px 48px; transform: rotate(90deg);
          transition: transform .9s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-run-dot { transform: rotate(315deg); }

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

        /* Marketplace: one module lifts off the shelf, leaving its slot open */
        .cg-lift { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-lift { transform: translateY(-15px); }

        @media (prefers-reduced-motion: reduce) {
          .cg-row { transform: none; }
          .cg-say { transform: none; opacity: 1; }
          .cg-run-arc, .cg-run-dot { transition: none; }
          .cg-rise, .cg-node, .cg-arrow, .cg-say, .cg-lift { transition: none; }
        }
      `}</style>
    </section>
  );
}
