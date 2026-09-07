import { useEffect } from "react";
import { motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";

export type MobileIntroStep = "conductor" | "agents";

const COPY: Record<MobileIntroStep, { title: string; body: string }> = {
  conductor: {
    title: "Meet Conductor Mode",
    body: "Starchild chooses the right AI for each task, so you don't have to.",
  },
  agents: {
    title: "Meet your Agents",
    body: "Hand something over and it keeps going on its own — checking, running, and coming back when it matters.",
  },
};

/**
 * The first-run tour has two anchored desktop notes. On a phone their anchors
 * are either covered by the keyboard or out of reach, so this is a small,
 * centred sequence instead: one thought at a time, a clear progress signal,
 * and no feature of the product competing for the same thumb.
 */
export function MobileIntroTour({
  step,
  onNext,
  onClose,
}: {
  step: MobileIntroStep;
  onNext: () => void;
  onClose: () => void;
}) {
  const isLast = step === "agents";
  const copy = COPY[step];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-5" role="presentation">
      <motion.section
        key={step}
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-intro-title"
        className="w-full max-w-[328px] overflow-hidden rounded-[22px] border border-white/10 bg-[#1a1a1c] shadow-[0_24px_70px_rgba(0,0,0,.5)]"
      >
        <div className="relative flex h-[132px] items-center justify-center overflow-hidden bg-white/[0.035]" aria-hidden="true">
          {step === "conductor" ? <ConductorIllustration /> : <AgentsIllustration />}
        </div>

        <div className="px-5 pb-4 pt-[18px]" style={{ fontFamily: "var(--font-google-sans)" }}>
          <h2 id="mobile-intro-title" className="text-[16px] font-semibold text-white">{copy.title}</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{copy.body}</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-label={`Step ${step === "conductor" ? 1 : 2} of 2`}>
              {(["conductor", "agents"] as const).map((name) => (
                <span
                  key={name}
                  className={`h-1.5 rounded-full transition-all ${name === step ? "w-5 bg-[#f84600]" : "w-1.5 bg-white/25"}`}
                />
              ))}
            </div>

            {isLast ? (
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 items-center gap-1.5 rounded-full bg-[#f84600] px-3.5 text-[12.5px] font-medium text-white transition-transform active:scale-95"
              >
                Got it
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next"
                className="flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform active:scale-95"
              >
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function ConductorIllustration() {
  return (
    <div className="relative flex size-24 items-center justify-center">
      {[
        [12, 18, 5], [78, 22, 4], [20, 74, 4], [76, 70, 5],
      ].map(([left, top, size], index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white/60"
          style={{ left, top, width: size, height: size }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2.4, delay: index * 0.22, repeat: Infinity }}
        />
      ))}
      <StarchildDot state="acknowledging" depth={0.8} size={16} />
    </div>
  );
}

function AgentsIllustration() {
  return (
    <div className="relative h-24 w-56">
      <StarchildDot state="acknowledging" depth={0.65} size={12} />
      <motion.span
        className="absolute left-8 top-2 h-9 w-32 rounded-2xl rounded-bl-md bg-white/[0.16]"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
      />
      <motion.span
        className="absolute right-1 top-12 h-8 w-28 rounded-2xl rounded-br-md bg-[#f84600]/50"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.38 }}
      />
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.8 4.2 3.8 3.8-3.8 3.8" />
    </svg>
  );
}
