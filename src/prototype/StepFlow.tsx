import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Scenario } from "./data";
import { Deliverable } from "./Deliverable";
import { CheckIcon, InfoIcon } from "./icons";

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

const MODEL_ICON_SRC: Record<string, string> = {
  gemini: `${ICON_BASE}gemini.svg`,
  openai: `${ICON_BASE}openai.svg`,
  xai: `${ICON_BASE}xai.svg`,
  deepseek: `${ICON_BASE}deepseek.svg`,
  "ai-generic": `${ICON_BASE}ai-generic.svg`,
};

// One quiet line under the result: what happened, then what it delivered, then
// what it saved. The comparison behind the number is a detail, so it waits behind
// the info icon — on hover with a mouse, on tap on touch.
function TokenStat({ stat }: { stat: Scenario["stat"] }) {
  const { withoutTokens, withTokens } = stat;
  const [open, setOpen] = useState(false);
  const [fine, setFine] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const saved = withoutTokens - withTokens;

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // the small delay is what lets the pointer cross the gap into the panel
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div className="relative self-start">
      <div className="flex items-center gap-2.5">
        <span className="size-1.5 shrink-0 rounded-full bg-[#f84600]" aria-hidden="true" />
        <p className="text-[13px] text-white/60" style={{ fontFamily: "var(--font-google-sans)" }}>
          Saved{" "}
          <span className="font-medium text-white/90 tabular-nums">
            {/* pinned: the UI is English, so a pt-BR browser must not render 9,100 as "9.100" */}
            {saved.toLocaleString("en-US")}
          </span>{" "}
          tokens with Conductor Mode
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onPointerEnter={fine ? openNow : undefined}
          onPointerLeave={fine ? closeSoon : undefined}
          onFocus={fine ? openNow : undefined}
          onBlur={fine ? closeSoon : undefined}
          aria-expanded={open}
          aria-label="How this saving was estimated"
          className="rounded-full p-0.5 text-[#f84600]/60 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70"
        >
          <InfoIcon className="size-4" />
        </button>
      </div>

      {open &&
        (fine ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={openNow}
            onPointerLeave={closeSoon}
            role="tooltip"
            className="absolute bottom-[calc(100%+10px)] left-0 z-40 w-[min(300px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-4 shadow-2xl"
          >
            <SavingsDetail />
          </motion.div>
        ) : (
          <TokenStatDialog onClose={() => setOpen(false)} />
        ))}
    </div>
  );
}

// the panel itself — same content whether it arrives on hover or on tap
function SavingsDetail() {
  return (
    <>
      <p
        className="text-[13.5px] font-medium text-white/90"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        Conductor Mode routes each step to the AI that fits it best.
      </p>
      <p
        className="mt-1 text-[11.5px] text-white/35"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        That means less unnecessary token usage and less wasted context.
      </p>
    </>
  );
}

function TokenStatDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Estimated savings on this task"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[320px] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl"
      >
        <SavingsDetail />

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

export function StepFlow({
  scenario,
  onStep,
  onDone,
  showSavings = false,
}: {
  scenario: Scenario;
  onStep?: () => void;
  onDone?: () => void;
  /** Guest Mode only: what Conductor Mode saved is an argument for signing up, and
   *  an account holder has already been made it. */
  showSavings?: boolean;
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
    <div className="relative flex flex-col gap-3.5 py-1 pl-1">
      <div className="absolute top-1 bottom-1 left-[7px] w-px bg-white/12" aria-hidden="true">
        <motion.div
          className="w-px bg-[#f84600]"
          initial={{ height: 0 }}
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* A running status, not an explanation: titles only, ticked as they pass.
          Each step's `sub` is still in the scenario data, unused here. */}
      {steps.slice(0, visible).map((step, i) => {
        const isActive = i === visible - 1 && !showFinal;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-4"
          >
            <span
              className={`relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full ${
                isActive ? "border-2 border-[#f84600] bg-[#0a0a0a]" : "bg-[#0a0a0a]"
              }`}
            >
              {isActive ? (
                <motion.span
                  className="size-1.5 rounded-full bg-[#f84600]"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              ) : (
                <CheckIcon className="size-3.5 text-[#f84600]" />
              )}
            </span>
            <div className="flex-1">
              <p
                className={`text-[14.5px] font-medium ${isActive ? "text-white" : "text-white/55"}`}
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {step.title}
              </p>

              {i === 0 && isActive && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {models.map((m) => (
                    <span
                      key={m.name}
                      className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5"
                    >
                      <img src={MODEL_ICON_SRC[m.icon]} alt="" className="size-3.5 object-contain" />
                      <span
                        className="text-[11.5px] font-medium text-white/80"
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {m.name}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* what happened → what it delivered → what it saved, in that order */}
      {showFinal && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-start gap-4"
        >
          <span className="relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]">
            <CheckIcon className="size-3.5 text-[#f84600]" />
          </span>
          <div className="flex flex-1 flex-col gap-4">
            <p
              className="text-[14.5px] font-medium text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Done.
            </p>
            {deliverable.kind !== "none" && <Deliverable deliverable={deliverable} />}
            {showSavings && <TokenStat stat={stat} />}
          </div>
        </motion.div>
      )}
    </div>
  );
}
