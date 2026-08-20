import { AnimatePresence, motion } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { ScrollPin, useScrollPin } from "../ScrollPin";
import { AGENT_EXAMPLES } from "./agentsData";
import { AgentWindow } from "./AgentWindow";

// Same interaction model as version A's use-case showcase: pick on the left, the
// product view on the right follows. What changed is the job of the section — the
// grid above is "what can Starchild help me with right now", this one is "what can
// it keep doing for me over time".
//
// Nothing here is called an agent in the copy: the word only appears inside the
// product view, where it labels the thing the visitor has just watched work. They
// learn the term from the UI instead of having to know it to read the headline.
// The section pins while you scroll through the three examples.
export function AgentsSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  const { trackRef, pinned, index, selectStep } = useScrollPin(AGENT_EXAMPLES.length);
  const active = AGENT_EXAMPLES[index];

  return (
    <section className="ag-section bg-[#0a0a0a] pb-24 md:pb-32">
      <ScrollPin trackRef={trackRef} pinned={pinned} screens={AGENT_EXAMPLES.length}>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 max-w-[52ch]">
            <p
              className="text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Do it once.
            </p>
            <h2
              className="mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Let Starchild keep things moving for you.
            </h2>
            <p
              className="mt-5 text-[15px] leading-[1.6] text-white/40"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Give it something to keep track of, repeat, or take care of over time.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col gap-2 lg:col-span-4">
            {AGENT_EXAMPLES.map((example, i) => {
              const isActive = i === index;
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => selectStep(i)}
                  aria-pressed={isActive}
                  className={`ag-tab${isActive ? " ag-tab--active" : ""}`}
                >
                  <span className="ag-tab-title">{example.label}</span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden"
                      >
                        <span className="ag-tab-blurb">{example.blurb}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}

            <button type="button" onClick={() => onStartTask(active.task)} className="ag-try">
              {active.task.label}
              <ArrowUpIcon className="size-3.5 rotate-45" />
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <AgentWindow example={active} />
          </div>
        </div>
      </Container>
      </ScrollPin>

      <style>{`
        .ag-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 16px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-tab:hover { background: rgba(255,255,255,.03); }
        .ag-tab--active { border-left-color: var(--color-primary); background: rgba(255,255,255,.04); }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: #fff; }

        .ag-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }

        .ag-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .ag-try { margin-left: 0; }
        }
      `}</style>
    </section>
  );
}
