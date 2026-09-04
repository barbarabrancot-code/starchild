import { useEffect, useRef } from "react";
import { usePresenceDot, useDriftAim, usePrefersReducedMotion } from "../presence/usePresence";
import type { Temperament } from "../presence/presence";

export type DotState = "idle" | "listening" | "acknowledging" | "thinking" | "settled";

/**
 * Starchild, in the flow of a page.
 *
 * The dot has no face and performs nothing. What it has is the same behaviour
 * every other orange dot in the product has — notice, react, lose balance a
 * little, catch up, recompose — scaled down to something that can sit next to a
 * line of text. See ../presence/presence.ts for the physics itself.
 *
 * Two rules hold this together. Nothing loops: a state change fires one beat and
 * the dot then returns to being a dot, because a dot that is always moving stops
 * meaning anything. And nothing moves far: the whole vocabulary here is a couple
 * of pixels of lean and a few percent of scale.
 */

/** how the body carries itself in each state */
const TEMPERAMENT: Record<DotState, Temperament> = {
  idle: "composed",
  listening: "attentive",
  acknowledging: "attentive",
  thinking: "unsettled",
  settled: "composed",
};

/** where it holds itself. Positive y is toward the composer, which is always below. */
const LEAN: Record<DotState, [number, number]> = {
  idle: [0, 0],
  listening: [0, 2.6], // leaning toward what is being typed
  acknowledging: [0, 1.2],
  thinking: [0, 0], // the drift takes over instead
  settled: [0, 0],
};

/**
 * The one-shot beat a state change fires, as a CSS animation. Each says
 * something: taking a choice in, working, having got it. None of them repeat.
 */
const BEAT: Record<DotState, string | null> = {
  idle: null,
  listening: "sd-attend .42s cubic-bezier(.16,1,.3,1)",
  acknowledging: "sd-acknowledge .52s cubic-bezier(.34,.8,.3,1)",
  thinking: "sd-consider .72s cubic-bezier(.4,0,.2,1)",
  settled: "sd-recompose .62s cubic-bezier(.16,1,.3,1)",
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
  const reduced = usePrefersReducedMotion();
  const beatRef = useRef<HTMLSpanElement>(null);

  const { ref: coreRef, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: TEMPERAMENT[state],
    // idle keeps the faintest breath so it reads as alive rather than as an
    // icon; once it has settled on something it holds almost perfectly still
    breath: state === "idle" ? 0.03 : 0.012,
  });

  // aim follows the state, except while thinking, where the drift owns the aim
  useEffect(() => {
    if (state === "thinking") return;
    const [x, y] = LEAN[state];
    controller.aim(x, y);
  }, [controller, state]);

  useDriftAim(controller, state === "thinking", 3.2, reduced);

  // Restart the beat on every state change. Clearing the animation and forcing a
  // reflow is what makes it replay when the same state is re-entered.
  useEffect(() => {
    const el = beatRef.current;
    const beat = BEAT[state];
    if (!el || !beat || reduced) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = beat;
  }, [state, reduced]);

  const glow = 10 + depth * 26;
  const haloOpacity = 0.1 + depth * 0.22;
  const haloSize = size * (2 + depth * 0.9);

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size * 3, height: size * 3 }}
    >
      {/* halo — how much Starchild knows so far, not something it is doing */}
      <span
        aria-hidden="true"
        className="sd-halo"
        style={{
          width: haloSize,
          height: haloSize,
          opacity: haloOpacity,
        }}
      />
      <span ref={beatRef} className="sd-beat">
        <span
          ref={coreRef}
          aria-hidden="true"
          className="sd-core"
          style={{ width: size, height: size, boxShadow: `0 0 ${glow}px rgba(248,70,0,.7)` }}
        />
      </span>
    </span>
  );
}
