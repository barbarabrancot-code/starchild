import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

// The shell both first-run notes share: a visual, a short title, one line, and a
// way out on each side. It hangs off the thing it describes and never covers the
// product — the interface stays live underneath, so this reads as one important
// thing to know rather than a step you have to get through.
export type IntroPlacement = "below-right" | "above-right" | "right";

const PLACEMENT: Record<IntroPlacement, { outer: string; caret: string }> = {
  "below-right": {
    outer: "absolute top-[calc(100%+14px)] right-0 z-40",
    caret: "-top-[7px] right-5 border-t border-l",
  },
  // for anchors that sit low on the screen — the composer, once it's pinned
  "above-right": {
    outer: "absolute bottom-[calc(100%+14px)] right-0 z-40",
    caret: "-bottom-[7px] right-5 border-r border-b",
  },
  right: {
    outer: "absolute top-1/2 left-[calc(100%+14px)] z-40 -translate-y-1/2",
    caret: "top-1/2 -left-[7px] -mt-1.5 border-b border-l",
  },
};

export function IntroPopover({
  placement,
  visual,
  title,
  body,
  ctaLabel,
  onCta,
  onClose,
}: {
  placement: IntroPlacement;
  visual: ReactNode;
  title: string;
  body: string;
  ctaLabel: string;
  /** defaults to closing — pass one when the button should also do something */
  onCta?: () => void;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const place = PLACEMENT[placement];

  // Esc, or a click anywhere else. No overlay to catch it — the product stays
  // live underneath, so whatever they clicked also does what it normally does.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: MouseEvent) => {
      const card = cardRef.current;
      /*
        A card with no box is not on screen, and a note that is not on screen has
        no business dismissing anything.

        The same note gets mounted twice — once on its sidebar anchor and once on
        the composer, because the sidebar does not exist on a narrow screen — and
        CSS hides whichever one does not apply. Both were still listening here,
        so the hidden twin saw every click as a click outside itself and closed
        the run. Including the click on the visible twin's own button: the close
        lands on mousedown, the card unmounts, and the mouseup arrives at nothing.
        The button appeared dead when in fact it was never pressed.
      */
      if (!card || (card.offsetWidth === 0 && card.offsetHeight === 0)) return;
      if (!card.contains(e.target as Node)) onClose();
    };
    window.addEventListener("keydown", onKey);
    // the click that opened nothing shouldn't close it on the same tick
    const t = setTimeout(() => document.addEventListener("mousedown", onDown), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.removeEventListener("mousedown", onDown);
    };
  }, [onClose]);

  return (
    // positioning is the wrapper's job, so the card is free to animate its transform
    <div className={place.outer}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-label={title}
        className="relative w-[292px] rounded-2xl border border-white/10 bg-[#1a1a1c] shadow-[0_20px_50px_rgba(0,0,0,.55)]"
      >
        {/* points back at whatever it's describing */}
        <span
          aria-hidden="true"
          className={`absolute size-3 rotate-45 rounded-[3px] border-white/10 bg-[#1a1a1c] ${place.caret}`}
        />

        <div
          className="relative flex h-[96px] items-center justify-center overflow-hidden rounded-t-2xl bg-white/[0.03]"
          aria-hidden="true"
        >
          {visual}
        </div>

        <div className="p-4">
          <h2 className="text-[14.5px] font-semibold text-white" style={{ fontFamily: "var(--font-google-sans)" }}>
            {title}
          </h2>
          <p
            className="mt-1.5 text-[12.5px] leading-relaxed text-white/55"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {body}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-[12.5px] text-white/40 transition-colors hover:text-white/70"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onCta ?? onClose}
              className="rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
