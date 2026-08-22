import { useState } from "react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { AGENT_STORIES } from "./agentsData";
import { AgentWindow } from "./AgentWindow";

// Same interaction model as version A's use-case showcase: pick on the left, the
// product view on the right follows. What changed is the job of the section — the
// grid above is "what can Starchild help me with right now", this one is "what can
// it keep doing for me over time".
//
// Nothing here is called an agent in the copy: the word only appears inside the
// product view, where it labels the thing the visitor has just watched work. They
// learn the term from the UI instead of having to know it to read the headline.
// The section no longer pins: you pick an example, and scrolling just scrolls.
export function AgentsSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  // Selection is a click and nothing else. It used to be driven by scroll
  // position through a pinned track, which meant the section held the viewport
  // and spent screens of scroll distance before it would let you past.
  const [index, setIndex] = useState(0);
  const active = AGENT_STORIES[index];

  return (
    <section className="ag-section bg-[#0a0a0a] py-[var(--section-pad)]">
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
              Ask once. An agent keeps checking, using the tools you connect, and brings you back
              what matters.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 flex flex-col gap-2 lg:col-span-4">
            {AGENT_STORIES.map((example, i) => {
              const isActive = i === index;
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={isActive}
                  className={`ag-tab${isActive ? " ag-tab--active" : ""}`}
                >
                  <span className="ag-tab-title">{example.label}</span>
                </button>
              );
            })}

            <button type="button" onClick={() => onStartTask(active.task)} className="ag-try">
              {active.task.label}
              <ArrowUpIcon className="size-3.5 rotate-45" />
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <AgentWindow story={active} />
          </div>
        </div>
      </Container>

      <style>{`
        .ag-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 14px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-tab:hover { background: rgba(255,255,255,.03); }
        /* The rail is the selection. A dot travelling between the tabs said the
           same thing with a moving part, and a moving part next to three words is
           one more thing to track than the choice deserves. */
        .ag-tab--active {
          border-left-color: var(--color-primary);
          background: rgba(255,255,255,.04);
        }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: #fff; }

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
