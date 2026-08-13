import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Scenario } from "./data";
import { Deliverable } from "./Deliverable";

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

const MODEL_ICON_SRC: Record<string, string> = {
  gemini: `${ICON_BASE}gemini.svg`,
  openai: `${ICON_BASE}openai.svg`,
  xai: `${ICON_BASE}xai.svg`,
  deepseek: `${ICON_BASE}deepseek.svg`,
  "ai-generic": `${ICON_BASE}ai-generic.svg`,
};

function TokenStat({ stat }: { stat: Scenario["stat"] }) {
  const { withoutLabel, withoutTokens, withLabel, withTokens } = stat;
  const pct = Math.round((1 - withTokens / withoutTokens) * 100);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-[#fbfaf8] p-5">
      <p
        className="text-[11px] font-semibold tracking-[0.1em] text-neutral-400 uppercase"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Estimated savings on this task
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {[
          { label: withoutLabel, tokens: withoutTokens, accent: false },
          { label: withLabel, tokens: withTokens, accent: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span
              className="w-[132px] shrink-0 text-[12.5px] text-neutral-600"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {row.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <motion.div
                className={`h-full rounded-full ${row.accent ? "bg-[#f4511e]" : "bg-neutral-300"}`}
                initial={{ width: 0 }}
                animate={{ width: `${(row.tokens / withoutTokens) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              />
            </div>
            <span
              className="w-[74px] shrink-0 text-right text-[12.5px] tabular-nums text-neutral-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {row.tokens.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-[13.5px] font-medium text-neutral-800"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        ~{pct}% fewer tokens burned on this exact task.
      </p>
      <p
        className="mt-1 text-[11.5px] text-neutral-400 italic"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        Illustrative estimate for this demo — not a live token count.
      </p>
    </div>
  );
}

export function StepFlow({
  scenario,
  onMonetize,
  onStep,
  onDone,
}: {
  scenario: Scenario;
  onMonetize: () => void;
  onStep?: () => void;
  onDone?: () => void;
}) {
  const { steps, models, deliverable, stat } = scenario;
  const [visible, setVisible] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    setVisible(0);
    setShowFinal(false);
  }, [scenario]);

  useEffect(() => {
    onStep?.();
    if (visible >= steps.length) {
      const t = setTimeout(() => {
        setShowFinal(true);
        onDone?.();
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, steps]);

  const progressPct = showFinal ? 100 : (Math.min(visible, steps.length) / steps.length) * 100;

  return (
    <div className="relative flex flex-col gap-6 py-1 pl-1">
      <div className="absolute top-1 bottom-1 left-[7px] w-px bg-neutral-200" aria-hidden="true">
        <motion.div
          className="w-px bg-[#f4511e]"
          initial={{ height: 0 }}
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {steps.slice(0, visible).map((step, i) => {
        const isActive = i === visible - 1 && !showFinal;
        const isLastStep = i === steps.length - 1;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-4"
          >
            <span
              className={`relative z-10 mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                isActive || (isLastStep && showFinal)
                  ? "border-[#f4511e] bg-white"
                  : "border-neutral-300 bg-white"
              }`}
            >
              {isActive && (
                <motion.span
                  className="size-1.5 rounded-full bg-[#f4511e]"
                  animate={visible === steps.length ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
              {isLastStep && showFinal && <span className="size-1.5 rounded-full bg-[#f4511e]" />}
            </span>
            <div className="flex-1">
              <p
                className="text-[14.5px] font-medium text-neutral-900"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {step.title}
              </p>
              <p
                className="mt-1 text-[13px] leading-relaxed text-neutral-500"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {step.sub}
              </p>

              {i === 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {models.map((m) => (
                    <span
                      key={m.name}
                      className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 py-1 pr-2.5 pl-1.5"
                    >
                      <img src={MODEL_ICON_SRC[m.icon]} alt="" className="size-3.5 object-contain" />
                      <span
                        className="text-[11.5px] font-medium text-neutral-700"
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {m.name}
                      </span>
                    </span>
                  ))}
                </div>
              )}

              {isLastStep && showFinal && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 flex flex-col gap-4"
                >
                  {deliverable.kind !== "none" && <Deliverable deliverable={deliverable} />}
                  <TokenStat stat={stat} />
                  <div>
                    <button
                      type="button"
                      onClick={onMonetize}
                      className="rounded-full border border-[#f4511e]/30 bg-[#f4511e]/[0.07] px-4 py-2 text-[13px] font-medium text-[#f4511e] transition-colors hover:bg-[#f4511e]/[0.12]"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      Make a skill and monetize
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
