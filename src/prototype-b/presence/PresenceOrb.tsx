import { useEffect, useRef } from "react";
import { usePresenceDot, useDriftAim, usePrefersReducedMotion } from "./usePresence";
import type { Temperament } from "./presence";

/**
 * Starchild at full size — the product's empty screen, where the dot is the only
 * thing on the page and has room to actually behave.
 *
 * It is the same presence as the small one next to a line of chat, and that is
 * the point: someone who came in from the landing page should recognise it. What
 * changes at this size is only the scale of the reaction, never its grammar.
 */

export type OrbState =
  /** nobody has said anything yet */
  | "resting"
  /** something is being typed — it comes closer and holds still */
  | "listening"
  /** working: off balance, slow to commit, recovering */
  | "working"
  /** it has got it */
  | "resolved";

const TEMPERAMENT: Record<OrbState, Temperament> = {
  resting: "composed",
  listening: "attentive",
  working: "unsettled",
  resolved: "composed",
};

/** how far it leans. Down is toward the composer, which is always below it. */
const LEAN: Record<OrbState, [number, number]> = {
  resting: [0, 0],
  listening: [0, 9],
  working: [0, 0], // the drift owns the aim instead
  resolved: [0, 0],
};

const BEAT: Record<OrbState, string | null> = {
  resting: null,
  listening: "orb-attend .52s cubic-bezier(.16,1,.3,1)",
  working: "orb-consider .8s cubic-bezier(.4,0,.2,1)",
  resolved: "orb-recompose .74s cubic-bezier(.16,1,.3,1)",
};

export function PresenceOrb({
  state = "resting",
  size = 124,
  className,
}: {
  state?: OrbState;
  size?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const beatRef = useRef<HTMLSpanElement>(null);

  const { ref, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: TEMPERAMENT[state],
    breath: state === "resting" ? 0.026 : 0.01,
  });

  useEffect(() => {
    if (state === "working") return;
    const [x, y] = LEAN[state];
    controller.aim(x, y);
  }, [controller, state]);

  // at this size the drift has to be proportionally smaller, or it reads as pacing
  useDriftAim(controller, state === "working", size * 0.045, reduced);

  // Restart the beat by clearing it and forcing a reflow. Remounting on a key
  // would be shorter, but it would also swap out the node the body is living on.
  useEffect(() => {
    const el = beatRef.current;
    const beat = BEAT[state];
    if (!el || !beat || reduced) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = beat;
  }, [state, reduced]);

  return (
    <span className={`orb-root${className ? ` ${className}` : ""}`} style={{ width: size, height: size }}>
      <span aria-hidden="true" className="orb-halo" style={{ width: size * 2.25, height: size * 2.25 }} />
      <span ref={beatRef} className="orb-beat">
        <span
          ref={ref}
          aria-hidden="true"
          className="orb-core"
          style={{ width: size, height: size, boxShadow: `0 0 ${size * 0.56}px rgba(248,70,0,.45)` }}
        />
      </span>
    </span>
  );
}
