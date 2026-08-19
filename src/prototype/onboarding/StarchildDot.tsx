import { motion } from "motion/react";

export type DotState = "idle" | "listening" | "acknowledging" | "thinking" | "settled";

// The dot is a presence, not a character — no face, no bounce, no personality tricks.
// It breathes when waiting, tightens when it registers a choice, and opens up as
// Starchild accumulates context. `depth` (0–1) is how much it knows so far.
const STATE: Record<DotState, { scale: number[]; opacity: number[]; duration: number }> = {
  idle: { scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75], duration: 3.4 },
  listening: { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85], duration: 2.2 },
  acknowledging: { scale: [1, 0.86, 1.04, 1], opacity: [1, 1, 1, 1], duration: 0.5 },
  thinking: { scale: [1, 1.18, 0.94, 1], opacity: [1, 0.7, 1, 1], duration: 1.1 },
  settled: { scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9], duration: 4.6 },
};

export function StarchildDot({
  state = "idle",
  depth = 0,
  size = 18,
}: {
  state?: DotState;
  depth?: number;
  size?: number;
}) {
  const motionSpec = STATE[state];
  const glow = 10 + depth * 26;
  const haloOpacity = 0.1 + depth * 0.22;

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
      {/* halo — grows as Starchild learns more about the user */}
      <motion.span
        aria-hidden="true"
        className="absolute rounded-full"
        style={{ background: "radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)" }}
        animate={{
          width: size * (2 + depth * 0.9),
          height: size * (2 + depth * 0.9),
          opacity: haloOpacity,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        aria-hidden="true"
        className="relative rounded-full bg-[#f84600]"
        style={{ width: size, height: size, boxShadow: `0 0 ${glow}px rgba(248,70,0,.7)` }}
        animate={{ scale: motionSpec.scale, opacity: motionSpec.opacity }}
        transition={{
          duration: motionSpec.duration,
          repeat: state === "acknowledging" ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
