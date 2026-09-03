import { motion } from "motion/react";
import { IntroPopover, type IntroPlacement } from "./IntroPopover";

// The last of the first-run notes, hanging off the Agents item in the sidebar.
// Same treatment as the other two on purpose: three quiet notes in the same voice,
// not a tour with chapters.
//
// It replaces the old "Automate anything" note, which said the same thing about a
// capability rather than about a place. Agents is a place now, and the sentence
// that used to describe a feature is the sentence that describes the door.

/** where the runs land along the rail, as a fraction of it */
const RUNS = [0.16, 0.36, 0.56, 0.76];

// A dot that keeps travelling, leaving finished work behind it — the only claim
// the area makes that a conversation cannot. The last mark is a ring, because a
// ring is what "it needs you" looks like everywhere else in the product.
function AgentsVisual() {
  return (
    <>
      <span
        className="absolute h-px bg-white/12"
        style={{ left: 28, right: 28, top: "calc(50% + 12px)" }}
      />

      {RUNS.map((at, i) => (
        <motion.span
          key={at}
          className="absolute rounded-[1px] bg-[#f84600]"
          style={{
            width: 3,
            height: 14,
            left: `calc(28px + (100% - 56px) * ${at})`,
            top: "calc(50% - 2px)",
            transformOrigin: "bottom",
          }}
          animate={{ scaleY: [0, 0, 1, 1, 1], opacity: [0, 0, 0.85, 0.85, 0] }}
          transition={{
            duration: 4.4,
            times: [0, 0.1 + i * 0.16, 0.16 + i * 0.16, 0.92, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* the one that stopped and asked */}
      <motion.span
        className="absolute rounded-full border-[1.5px] border-[#f84600]"
        style={{ width: 13, height: 13, left: "calc(28px + (100% - 56px) * 0.93)", top: "calc(50% - 14px)" }}
        animate={{ scale: [0.4, 0.4, 1.12, 1, 1, 0.4], opacity: [0, 0, 1, 1, 1, 0] }}
        transition={{ duration: 4.4, times: [0, 0.74, 0.82, 0.86, 0.94, 1], repeat: Infinity, ease: "easeOut" }}
      />

      <motion.span
        className="absolute rounded-full bg-[#f84600]"
        style={{ width: 7, height: 7, top: "calc(50% + 9px)", boxShadow: "0 0 16px rgba(248,70,0,.6)" }}
        animate={{ left: ["24px", "calc(100% - 31px)"] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

export function AgentsIntroPopover({
  onOpen,
  onClose,
  placement = "right",
}: {
  onOpen: () => void;
  onClose: () => void;
  /** On narrow screens the sidebar is absent, so the card uses the composer as its anchor. */
  placement?: IntroPlacement;
}) {
  return (
    <IntroPopover
      placement={placement}
      visual={<AgentsVisual />}
      title="Meet your Agents"
      body="Hand something over and it keeps going on its own — checking, running, and coming back when it matters."
      ctaLabel="Open Agents"
      onCta={onOpen}
      onClose={onClose}
    />
  );
}
