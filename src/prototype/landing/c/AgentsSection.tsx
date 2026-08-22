import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { usePresenceDot } from "../../presence/usePresence";
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

  // Persistence, shown as stability rather than as a loop. The dot moves to
  // whichever job is selected — notices it, overshoots it a little, recovers —
  // and then simply stays on it. Nothing about "always working" is communicated
  // by movement; it is communicated by the dot still being there afterwards.
  const listRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const placed = useRef(false);
  const { ref: markerRef, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: "curious",
    breath: 0, // it holds perfectly still once it has arrived
    offsetX: -3.5,
    offsetY: -3.5,
  });

  useEffect(() => {
    const measure = () => {
      const host = listRef.current;
      const tab = tabsRef.current[index];
      if (!host || !tab) return;
      const h = host.getBoundingClientRect();
      const t = tab.getBoundingClientRect();
      const x = t.left - h.left;
      const y = t.top - h.top + t.height / 2;
      // on the first pass it belongs where it is, not arriving from the corner
      if (placed.current) controller.aim(x, y);
      else {
        controller.place(x, y);
        placed.current = true;
      }
    };

    measure();
    // the blurb opening under the selected job changes every tab's height
    const settle = window.setTimeout(measure, 320);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("resize", measure);
    };
  }, [controller, index]);

  return (
    <section className="ag-section bg-[#0a0a0a] py-[var(--section-pad)]">
      <ScrollPin trackRef={trackRef} pinned={pinned} screens={AGENT_EXAMPLES.length}>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 max-w-[52ch]">
            <p
              className="text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Agents
            </p>
            <h2
              className="mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[44px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Let Starchild keep things moving for you.
            </h2>
            <p
              className="mt-5 text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Powered by agents that work across the tools and sources you already use.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6">
          <div ref={listRef} className="relative col-span-12 flex flex-col gap-2 lg:col-span-4">
            <span ref={markerRef} className="ag-marker" aria-hidden="true" />
            {AGENT_EXAMPLES.map((example, i) => {
              const isActive = i === index;
              return (
                <button
                  key={example.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
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
        /* the rail no longer carries the accent — the dot on it does */
        .ag-tab--active { border-left-color: rgba(255,255,255,.28); background: rgba(255,255,255,.04); }

        /* Starchild, sitting on whichever job is selected. Its position comes
           from the presence body, so there is no transition here to fight it. */
        .ag-marker {
          position: absolute; top: 0; left: 0; z-index: 1;
          width: 7px; height: 7px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.8), 0 0 24px rgba(248,70,0,.3);
          pointer-events: none; will-change: transform;
        }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: var(--color-text-body); }

        .ag-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; letter-spacing: var(--tracking-body); color: var(--color-text-body);
        }

        .ag-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: var(--color-text-body);
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
