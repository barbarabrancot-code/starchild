import { useEffect, useRef, useState, type RefObject } from "react";
import { OrbLoop } from "./OrbLoop";
import type { OrbState } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import { LEAN_EASE, leanTarget } from "../../presence/usePointerLean";

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
 * On top of the travelling, three things make it read as attending rather than
 * animating. All three are derived from motion the orb is already doing, so none
 * of them is a separate effect that could fall out of step with the rest:
 *
 *   · A lean toward the pointer. Small, capped, and heavily damped — it notices
 *     where you are without following you, which is the difference between a
 *     presence and a cursor trail.
 *   · A stretch along the direction of travel, scaled by speed. A body that moves
 *     fast and stays perfectly round reads as a sprite being repositioned.
 *   · Settling. When the spring is done the stretch unwinds and the lean relaxes,
 *     so it comes to rest rather than stopping.
 *
 * Under reduced motion the spring, the lean and the stretch are all gone and the
 * orb is simply placed.
 */

/**
 * A stop is only a place. How big the orb is there is the anchor's own size,
 * measured every frame — which is what lets the hero's anchor shrink from 180 to
 * an avatar beside a reply without anyone telling the orb about it.
 */
export type OrbStop = {
  /** where the orb goes while this stop owns it */
  ref: RefObject<HTMLElement>;
  /**
   * The element whose arrival means this stop has taken over. Defaults to the
   * anchor itself, which is only right while the anchor stays put.
   *
   * Section 2's anchor moves down the scene as the conversation plays. Judged by
   * the anchor, the section handed the orb back to the hero the moment that
   * anchor passed the middle of the screen on its way down — so the orb shot off
   * the top of the page halfway through the scene it was narrating. The section
   * decides when it owns the orb; the anchor only decides where.
   */
  zone?: RefObject<HTMLElement>;
  /**
   * Whether the orb paints over the page here or behind it.
   *
   * It has to be both. Coming out of the hero it sinks behind the conversation
   * panel — that occlusion is the whole transition, and it only works if the panel
   * is in front. Once inside the section it is a mark on the conversation, which
   * has to be in front of the panel or it is not visible at all.
   */
  above?: boolean;
  /**
   * How far down the window this stop's zone has to have climbed before it takes
   * over, as a fraction of the viewport height. Half by default, which is right
   * for a section: you are looking at it once it is past the middle.
   *
   * A stop that exists only to be passed through wants a much later number. The
   * departure slot below the conversation is 380px of nothing, and waiting for it
   * to reach the middle meant the orb arrived there already most of the way off
   * the top of the screen — the move happened, and none of it was visible.
   */
  at?: number;
  /**
   * A box the anchor has to stay inside to be worth flying to.
   *
   * The orb is fixed to the viewport, so it is not clipped by anything its anchor
   * scrolls inside — without this, an anchor that scrolls up out of a masked
   * thread takes the orb with it and it comes to rest over the header, which the
   * mask exists to prevent.
   */
  clip?: RefObject<HTMLElement>;
};

/** how hard it pulls, how much it fights back — tuned for one overshoot, not a wobble */
const STIFFNESS = 0.11;
const DAMPING = 0.72;

/** speed at which the stretch reaches its cap, and the cap itself */
const STRETCH_AT = 26;
const STRETCH_MAX = 0.07;
/** below this the spring is asleep and there is nothing to animate */
const REST = 0.05;

/**
 * The orb is rendered once at this size and scaled to whatever a stop asks for.
 * It has to be the largest size any stop uses: scaling a small element up
 * rasterises it and the halo turns to mush, while scaling down stays clean.
 */
const BASE = 180;

export function FlightOrb({
  stops,
  /** the hero holds a conversation now, and the orb is the one having it */
  state = "resting",
}: {
  stops: OrbStop[];
  state?: OrbState;
}) {
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Everything below runs on rAF and writes straight to the DOM. Held in refs
  // rather than state because a spring that re-rendered React sixty times a
  // second would be the most expensive thing on the page.
  const pos = useRef({ x: 0, y: 0, size: 0 });
  const vel = useRef({ x: 0, y: 0, size: 0 });
  const settled = useRef(false);
  /** whether the active anchor is currently somewhere the orb is allowed to be */
  const inside = useRef(true);
  /** in front of the page, or behind it — see OrbStop.above */
  const layer = useRef("1");
  /** where the pointer is, and how far the orb has got around to caring */
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const lean = useRef({ x: 0, y: 0 });

  // Tracked passively and read on the frame loop rather than driving one — a
  // pointer handler that wrote to state would re-render the page on every mouse
  // move for the sake of a nine-pixel offset.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => { pointer.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { pointer.current = null; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /** the anchor whose section is the one being looked at */
    const active = () => {
      let chosen = stops[0];
      for (const stop of stops) {
        const el = (stop.zone ?? stop.ref).current;
        if (!el) continue;
        // it has taken over once its zone has risen past its own mark on the screen
        const mark = window.innerHeight * (stop.at ?? 0.5);
        if (el.getBoundingClientRect().top <= mark) chosen = stop;
      }
      return chosen;
    };

    const targetOf = (stop: OrbStop) => {
      const el = stop.ref.current;
      if (!el) return null;
      const box = el.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2, size: box.width };
    };

    let frame = 0;

    /** false when the anchor has scrolled out of the box that confines it */
    const withinClip = (stop: OrbStop) => {
      const box = stop.clip?.current;
      const el = stop.ref.current;
      if (!box || !el) return true;
      const b = box.getBoundingClientRect();
      const a = el.getBoundingClientRect();
      const mid = a.top + a.height / 2;
      return mid > b.top && mid < b.bottom;
    };

    const place = () => {
      const { x: lx, y: ly } = lean.current;

      // Stretch along whichever way it is going, by how fast. Written as a scale
      // on the two axes rather than a rotation, so the halo stays concentric.
      const vx = vel.current.x;
      const vy = vel.current.y;
      const speed = Math.hypot(vx, vy);
      const pull = reduced ? 0 : Math.min(speed / STRETCH_AT, 1) * STRETCH_MAX;
      const along = speed > 0.01 ? Math.abs(vy) / speed : 0;
      const sx = 1 + pull * (1 - along) - pull * along * 0.5;
      const sy = 1 + pull * along - pull * (1 - along) * 0.5;

      host.style.transform =
        `translate3d(${pos.current.x + lx}px, ${pos.current.y + ly}px, 0)` +
        ` translate(-50%, -50%) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
      // The orb draws itself at a fixed pixel size, so scaling is what lets one
      // instance be 180px in the hero and 96px beside a conversation without
      // remounting it — remounting would restart its physics mid-flight.
      host.style.setProperty("--flight-scale", String(pos.current.size / BASE));
      host.style.opacity = inside.current ? "1" : "0";
      host.style.zIndex = layer.current;
    };

    const step = () => {
      const stop = active();
      inside.current = withinClip(stop);
      layer.current = stop.above ? "6" : "1";
      const target = targetOf(stop);
      if (!target) {
        frame = requestAnimationFrame(step);
        return;
      }

      // Where the pointer is, and how much of that the orb has taken on. It eases
      // toward the lean rather than jumping to it, and eases back to nothing when
      // the pointer leaves — which is what makes it read as delayed attention
      // instead of a magnet.
      if (!reduced) {
        const at = pointer.current;
        // The falloff and the numbers live in ../../presence/usePointerLean, so
        // the orbs that do not fly lean exactly the way this one does.
        const want = at
          ? leanTarget(at.x - pos.current.x, at.y - pos.current.y)
          : { x: 0, y: 0 };
        lean.current.x += (want.x - lean.current.x) * LEAN_EASE;
        lean.current.y += (want.y - lean.current.y) * LEAN_EASE;
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
      <OrbLoop size={BASE} state={state} />

      <style>{`
        .fo-host {
          position: fixed; top: 0; left: 0;
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
