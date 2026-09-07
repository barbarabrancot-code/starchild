import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";
import { usePrefersReducedMotion } from "../presence/usePresence";
import { IntroPopover, type IntroPlacement } from "./IntroPopover";

// The last of the first-run notes, hanging off the Agents item in the sidebar.
// Same treatment as the other two on purpose: three quiet notes in the same voice,
// not a tour with chapters.
//
// It replaces the old "Automate anything" note, which said the same thing about a
// capability rather than about a place. Agents is a place now, and the sentence
// that used to describe a feature is the sentence that describes the door.

// An agent is still a conversation — the one thing this whole area could let
// someone forget. So the visual says exactly that: Starchild says something
// (a blank bubble — the words aren't the point), you answer, done. One beat,
// not a loop, same as Conductor's own visual.
type Beat = "waiting" | "said" | "replied";

function AgentsVisual() {
  const reduced = usePrefersReducedMotion();
  const [beat, setBeat] = useState<Beat>("waiting");

  useEffect(() => {
    if (reduced) {
      setBeat("replied");
      return;
    }
    const said = window.setTimeout(() => setBeat("said"), 500);
    const replied = window.setTimeout(() => setBeat("replied"), 1650);
    return () => {
      window.clearTimeout(said);
      window.clearTimeout(replied);
    };
  }, [reduced]);

  return (
    <>
      <span className="absolute" style={{ left: 20, top: 32 }}>
        <StarchildDot
          state={beat === "waiting" ? "idle" : beat === "replied" ? "settled" : "acknowledging"}
          depth={beat === "waiting" ? 0.25 : 0.6}
          size={11}
        />
      </span>
      {/* Starchild's side — blank on purpose, the same reason Conductor's marks
          are unnamed: what it said isn't the point here, that it's a message is. */}
      <motion.span
        aria-hidden="true"
        className="absolute rounded-2xl bg-white/[0.14]"
        style={{ left: 54, top: 18, width: 128, height: 32 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={beat === "waiting" ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* the reply, in the one colour this whole vocabulary reserves for you */}
      <motion.span
        aria-hidden="true"
        className="absolute rounded-2xl bg-[#f84600]/45"
        style={{ left: 108, top: 58, width: 108, height: 28 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={beat === "replied" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
