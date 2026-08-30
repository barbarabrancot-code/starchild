import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePresence";

/**
 * The lean toward the pointer — the orb noticing where you are.
 *
 * Small, capped and heavily damped, which is the whole character of it: it
 * notices you without following you, and that delay is the difference between a
 * presence and a cursor trail. It also eases back to nothing when the pointer
 * leaves, so it comes to rest rather than stopping.
 *
 * Version E does this inside FlightOrb, composed into the same transform as the
 * flight spring and the stretch. The numbers and the falloff live here so the
 * orbs that do not fly can have the identical behaviour and cannot drift from it
 * later — FlightOrb reads them from this file too.
 */

/** the furthest it will lean toward the pointer, in px. Noticing, not following. */
export const LEAN_MAX = 9;
/** how far away the pointer stops mattering — most of a screen, because a reach
 *  that only covers the orb's own neighbourhood produces a lean of about a pixel */
export const LEAN_REACH = 1000;
/** how slowly the lean catches up — the delay is the whole character of it */
export const LEAN_EASE = 0.045;

/**
 * How far the body wants to be pushed, given where the pointer is relative to it.
 *
 * Eased rather than linear: a linear falloff spends most of its range near zero,
 * so the orb barely moves for any pointer that is not on top of it, which is
 * every pointer.
 */
export function leanTarget(dx: number, dy: number): { x: number; y: number } {
  const away = Math.hypot(dx, dy);
  if (away <= 1 || away >= LEAN_REACH) return { x: 0, y: 0 };
  const strength = Math.sqrt(1 - away / LEAN_REACH) * LEAN_MAX;
  return { x: (dx / away) * strength, y: (dy / away) * strength };
}

/**
 * Hang the lean off an element. Returns the ref to put on it.
 *
 * The element is written to directly rather than through state — this runs at
 * frame rate, and a re-render per mouse move for the sake of nine pixels is the
 * most expensive way to draw them. It owns that element's transform completely,
 * so give it a wrapper of its own rather than a node something else is already
 * transforming.
 *
 * The loop parks as soon as the body has arrived where the pointer wants it, and
 * wakes on anything that could move either of them — the pointer, or the page
 * scrolling the orb to a new place under it.
 */
export function usePointerLean<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const pointer = { at: null as { x: number; y: number } | null };
    const lean = { x: 0, y: 0 };
    let running = false;
    let frame = 0;

    const step = () => {
      const box = el.getBoundingClientRect();
      const at = pointer.at;
      const want = at
        ? leanTarget(at.x - (box.left + box.width / 2), at.y - (box.top + box.height / 2))
        : { x: 0, y: 0 };

      lean.x += (want.x - lean.x) * LEAN_EASE;
      lean.y += (want.y - lean.y) * LEAN_EASE;
      el.style.transform = `translate3d(${lean.x.toFixed(2)}px, ${lean.y.toFixed(2)}px, 0)`;

      // arrived: nothing left to draw until something moves
      if (Math.abs(want.x - lean.x) < 0.01 && Math.abs(want.y - lean.y) < 0.01) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      pointer.at = { x: event.clientX, y: event.clientY };
      wake();
    };
    const onLeave = () => {
      pointer.at = null;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    // the orb moving under a still pointer is the same event as the pointer moving
    window.addEventListener("scroll", wake, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", wake);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return ref;
}
