import { useEffect, useRef, useState, type RefObject } from "react";
import { OrbLoop } from "./OrbLoop";
import { usePrefersReducedMotion } from "../../presence/usePresence";

/**
 * One orb for the whole page, which travels between the places that want it.
 *
 * E's hero and its conversation section both need the orb, and two separate orbs
 * would say there are two of them — the page's whole claim is that this is one
 * thing following you down it. So there is exactly one, fixed to the viewport,
 * and each section contributes an empty anchor saying where it should be while
 * that section is the one being read.
 *
 * How it moves:
 *
 *   · the target is the live viewport position of the active anchor, recomputed
 *     on every scroll frame. While a section is being scrolled its anchor moves
 *     up the screen and the orb goes with it.
 *   · the orb chases that target through a spring rather than sitting on it. Two
 *     things fall out of that for free: a slight trail while scrolling, and the
 *     bounce when the target jumps from one anchor to the next.
 *   · the handover happens when the next anchor crosses the middle of the screen,
 *     which is the point at which someone is looking at the next section rather
 *     than the last one.
 *
 * Under reduced motion the spring is gone and the orb is simply placed.
 */

export type OrbStop = {
  ref: RefObject<HTMLElement>;
  /** how big the orb is while this stop owns it */
  size: number;
};

/** how hard it pulls, how much it fights back — tuned for one overshoot, not a wobble */
const STIFFNESS = 0.11;
const DAMPING = 0.72;
/** below this the spring is asleep and there is nothing to animate */
const REST = 0.05;

/**
 * The orb is rendered once at this size and scaled to whatever a stop asks for.
 * It has to be the largest size any stop uses: scaling a small element up
 * rasterises it and the halo turns to mush, while scaling down stays clean.
 */
const BASE = 180;

export function FlightOrb({ stops }: { stops: OrbStop[] }) {
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Everything below runs on rAF and writes straight to the DOM. Held in refs
  // rather than state because a spring that re-rendered React sixty times a
  // second would be the most expensive thing on the page.
  const pos = useRef({ x: 0, y: 0, size: 0 });
  const vel = useRef({ x: 0, y: 0, size: 0 });
  const settled = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /** the anchor whose section is the one being looked at */
    const active = () => {
      const middle = window.innerHeight / 2;
      let chosen = stops[0];
      for (const stop of stops) {
        const el = stop.ref.current;
        if (!el) continue;
        // it has taken over once its anchor has risen past the middle of the screen
        if (el.getBoundingClientRect().top <= middle) chosen = stop;
      }
      return chosen;
    };

    const targetOf = (stop: OrbStop) => {
      const el = stop.ref.current;
      if (!el) return null;
      const box = el.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2, size: stop.size };
    };

    let frame = 0;

    const place = () => {
      host.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      // The orb draws itself at a fixed pixel size, so scaling is what lets one
      // instance be 180px in the hero and 96px beside a conversation without
      // remounting it — remounting would restart its physics mid-flight.
      host.style.setProperty("--flight-scale", String(pos.current.size / BASE));
    };

    const step = () => {
      const target = targetOf(active());
      if (!target) {
        frame = requestAnimationFrame(step);
        return;
      }

      if (!settled.current) {
        pos.current = { ...target };
        vel.current = { x: 0, y: 0, size: 0 };
        settled.current = true;
        setReady(true);
      } else if (reduced) {
        pos.current = { ...target };
      } else {
        for (const axis of ["x", "y", "size"] as const) {
          const away = target[axis] - pos.current[axis];
          vel.current[axis] = (vel.current[axis] + away * STIFFNESS) * DAMPING;
          if (Math.abs(vel.current[axis]) < REST && Math.abs(away) < REST) {
            pos.current[axis] = target[axis];
            vel.current[axis] = 0;
          } else {
            pos.current[axis] += vel.current[axis];
          }
        }
      }

      place();
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [stops, reduced]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="fo-host"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {/* Rendered once at its largest and scaled down, so the halo and the core
          keep their proportions to each other at every stop. There is one of these
          on the page, so the animated loop only ever has to be wired here. */}
      <OrbLoop size={BASE} />

      <style>{`
        .fo-host {
          position: fixed; top: 0; left: 0; z-index: 5;
          pointer-events: none; will-change: transform;
          transition: opacity .4s ease;
        }
        .fo-host > * {
          transform: scale(var(--flight-scale, 1));
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
