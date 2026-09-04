import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";
import { usePrefersReducedMotion } from "../presence/usePresence";
import { IntroPopover } from "./IntroPopover";

// One thing to know before continuing — not another onboarding step. It hangs off
// the Conductor Mode selector in the composer, pointing down at the control it
// describes — the composer sits at the bottom of the screen by then, so the note
// has to open upward to stay on it. Nothing about routing, tokens or models: the only mental model it
// leaves behind is "I ask, Starchild picks who answers."

// Four abstract marks — the models, unnamed on purpose. They drift inward toward
// the dot and back out: selection, not a diagram. Offsets are from the centre.
const MARKS = [
  { x: -52, y: -18, size: 6, delay: 0 },
  { x: 50, y: -24, size: 4, delay: 0.7 },
  { x: -36, y: 25, size: 4, delay: 1.4 },
  { x: 45, y: 21, size: 5, delay: 2.1 },
];

// A glimpse of how Starchild behaves, not a feature animation: the marks come in
// once, the dot notices them, takes a moment, absorbs them and recomposes. Then
// it is over. It used to loop forever, which made it wallpaper — and a presence
// that is always moving is not noticing anything.
type Beat = "waiting" | "noticing" | "resolved";

function ConductorVisual() {
  const reduced = usePrefersReducedMotion();
  const [beat, setBeat] = useState<Beat>("waiting");

  useEffect(() => {
    if (reduced) {
      setBeat("resolved");
      return;
    }
    // arrive → register → settle. The gap between the last two is the judgment.
    const noticing = window.setTimeout(() => setBeat("noticing"), 1450);
    const resolved = window.setTimeout(() => setBeat("resolved"), 2250);
    return () => {
      window.clearTimeout(noticing);
      window.clearTimeout(resolved);
    };
  }, [reduced]);

  return (
    <>
      {!reduced &&
        MARKS.map((mark) => (
          <motion.span
            key={`${mark.x},${mark.y}`}
            className="absolute rounded-full bg-white/70"
            style={{
              width: mark.size,
              height: mark.size,
              left: `calc(50% - ${mark.size / 2}px)`,
              top: `calc(50% - ${mark.size / 2}px)`,
            }}
            initial={{ x: mark.x, y: mark.y, opacity: 0 }}
            animate={{ x: mark.x * 0.22, y: mark.y * 0.22, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.05, delay: mark.delay * 0.2, ease: [0.32, 0.72, 0.3, 1] }}
          />
        ))}
      <StarchildDot
        state={beat === "waiting" ? "idle" : beat === "noticing" ? "acknowledging" : "settled"}
        depth={beat === "waiting" ? 0.4 : 1}
        size={13}
      />
    </>
  );
}

export function ConductorIntroPopover({ onClose }: { onClose: () => void }) {
  return (
    <IntroPopover
      placement="above-right"
      visual={<ConductorVisual />}
      title="Meet Conductor Mode"
      body="Starchild chooses the right AI for each task, so you don't have to."
      ctaLabel="Got it"
      onClose={onClose}
    />
  );
}
