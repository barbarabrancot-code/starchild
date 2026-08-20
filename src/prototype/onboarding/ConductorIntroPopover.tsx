import { motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";
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

function ConductorVisual() {
  return (
    <>
      {MARKS.map((mark) => (
        <motion.span
          key={`${mark.x},${mark.y}`}
          className="absolute rounded-full bg-white/70"
          style={{
            width: mark.size,
            height: mark.size,
            left: `calc(50% - ${mark.size / 2}px)`,
            top: `calc(50% - ${mark.size / 2}px)`,
          }}
          animate={{
            x: [mark.x, mark.x * 0.58, mark.x],
            y: [mark.y, mark.y * 0.58, mark.y],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5.2, delay: mark.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <StarchildDot state="settled" depth={1} size={13} />
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
