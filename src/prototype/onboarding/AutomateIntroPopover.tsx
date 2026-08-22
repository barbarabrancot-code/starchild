import { motion } from "motion/react";
import { IntroPopover } from "./IntroPopover";

// The third and last of the first-run notes, hanging off Work in the sidebar. Same
// treatment as the Conductor and Marketplace ones: three quiet notes in one voice,
// not a tour with chapters.
//
// It comes last on purpose. Conductor is how a single answer gets made, Marketplace
// is what other people have made, and this is the one that only makes sense once
// both have landed — work that keeps happening without being asked each time.

/** the trigger, then the run: one thing repeating on its own, on a loop that is the
 *  point rather than an idle animation */
const BEATS = [0, 1, 2, 3];

function AutomateVisual() {
  return (
    <>
      {/* the standing instruction */}
      <motion.span
        className="absolute rounded-[3px] bg-[#f84600]"
        style={{
          width: 10,
          height: 10,
          left: "calc(50% - 5px - 62px)",
          top: "calc(50% - 5px)",
          boxShadow: "0 0 20px rgba(248,70,0,.5)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* what it sets off, again and again, each one a little behind the last */}
      {BEATS.map((n) => (
        <motion.span
          key={n}
          className="absolute rounded-full bg-white/70"
          style={{
            width: 5,
            height: 5,
            left: "calc(50% - 2.5px - 62px)",
            top: "calc(50% - 2.5px)",
          }}
          animate={{ x: [0, 124], opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            duration: 3.2,
            times: [0, 0.15, 0.8, 1],
            delay: n * 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* where it lands, every time */}
      <span
        className="absolute rounded-[2px] bg-white/25"
        style={{ width: 6, height: 6, left: "calc(50% - 3px + 62px)", top: "calc(50% - 3px)" }}
      />
    </>
  );
}

export function AutomateIntroPopover({
  onExplore,
  onClose,
}: {
  onExplore: () => void;
  onClose: () => void;
}) {
  return (
    <IntroPopover
      placement="right"
      visual={<AutomateVisual />}
      title="Automate anything"
      body="Hand Starchild something that repeats and it keeps doing it — on a schedule, or whenever something changes."
      ctaLabel="See how"
      onCta={onExplore}
      onClose={onClose}
    />
  );
}
