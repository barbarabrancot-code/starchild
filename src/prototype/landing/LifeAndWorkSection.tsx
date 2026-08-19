import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRIMARY_USE_CASES, type TaskCard } from "../data";
import { ArrowUpIcon } from "../icons";
import { Container } from "../Container";
import { ProductWindow } from "./ProductWindow";

export function LifeAndWorkSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  const [activeId, setActiveId] = useState(PRIMARY_USE_CASES[0].id);
  const active = PRIMARY_USE_CASES.find((u) => u.id === activeId) ?? PRIMARY_USE_CASES[0];

  return (
    <section className="uc-section bg-[#0a0a0a] py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 max-w-[46ch]">
            <p
              className="text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Ok, it gets me — but for what?
            </p>
            <h2
              className="mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              What Starchild can help with.
            </h2>
          </div>
        </div>

        {/* Level 1 — pick a use case, the product view follows */}
        <div className="mt-14 grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col gap-2 lg:col-span-4">
            {PRIMARY_USE_CASES.map((useCase) => {
              const isActive = useCase.id === activeId;
              return (
                <button
                  key={useCase.id}
                  type="button"
                  onClick={() => setActiveId(useCase.id)}
                  aria-pressed={isActive}
                  className={`uc-tab${isActive ? " uc-tab--active" : ""}`}
                >
                  <span className="uc-tab-title">{useCase.label}</span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden"
                      >
                        <span className="uc-tab-blurb">{useCase.blurb}</span>
                        <span className="uc-tab-example">{useCase.example}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}

            <button type="button" onClick={() => onStartTask(active.task)} className="uc-try">
              {active.task.label}
              <ArrowUpIcon className="size-3.5 rotate-45" />
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ProductWindow useCase={active} />
          </div>
        </div>

      </Container>

      <style>{`
        .uc-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 16px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .uc-tab:hover { background: rgba(255,255,255,.03); }
        .uc-tab--active { border-left-color: var(--color-primary); background: rgba(255,255,255,.04); }

        .uc-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .uc-tab--active .uc-tab-title { color: #fff; }

        .uc-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }
        .uc-tab-example {
          display: block; margin-top: 10px; font-family: var(--font-google-sans);
          font-size: 13px; color: rgba(255,255,255,.4);
        }

        .uc-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .uc-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .uc-try { margin-left: 0; }
        }
      `}</style>
    </section>
  );
}
