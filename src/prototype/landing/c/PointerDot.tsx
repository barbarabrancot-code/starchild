import { useEffect, useRef } from "react";
import { Presence, frameTransform } from "../../presence/presence";

/**
 * The orange dot, for the whole page rather than just the hero.
 *
 * The hero already replaced the cursor with one, painted by PixelMesh, because the
 * dot has to interact with the field it moves over. Past the fold that stopped and
 * the arrow came back — which read as the presence being a hero effect rather than
 * how the page behaves. This carries it the rest of the way.
 *
 * It is the same body with the same physics: it notices the pointer, falls behind,
 * overshoots and recomposes. What it is not is a follower glued to the cursor —
 * that would just be a differently shaped arrow.
 */

/** matches the hero's, so nothing changes size at the fold */
const DOT_SIZE = 14;

/** how fast it fades in and out of the hero's keeping, per frame */
const HANDOVER = 0.14;

export function PointerDot({
  /** where another dot is already being drawn — inside it, this one stands down */
  yieldTo = ".hero-c",
}: {
  yieldTo?: string;
}) {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // No cursor to replace on touch, and hiding it there would leave nothing at
    // all. Reduced motion keeps the arrow: a body with lag is exactly the kind of
    // movement that setting is asking not to have.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("pd-on");

    const body = new Presence({ temperament: "attentive", seed: 0.37, breath: 0 });
    let placed = false;
    let shown = 0;
    let want = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const el = event.target instanceof Element ? event.target : null;
      // PixelMesh draws its own dot inside the hero, and two of them a few pixels
      // apart is worse than none. Whichever is on duty, one is always at the pointer.
      want = el?.closest(yieldTo) ? 0 : 1;

      // first move: drop it where the cursor already is rather than flying in
      if (!placed) {
        body.place(event.clientX, event.clientY);
        placed = true;
      }
      body.aim(event.clientX, event.clientY);
    };

    const onOut = (event: PointerEvent) => {
      // only when it actually leaves the window, not on every element boundary
      if (!event.relatedTarget) want = 0;
    };

    const tick = (now: number) => {
      const el = dotRef.current;
      if (el && placed) {
        shown += (want - shown) * HANDOVER;
        el.style.transform = frameTransform(body.step(now), -DOT_SIZE / 2, -DOT_SIZE / 2);
        el.style.opacity = `${shown}`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      root.classList.remove("pd-on");
    };
  }, [yieldTo]);

  return (
    <>
      <span ref={dotRef} className="pd-dot" aria-hidden="true" />

      <style>{`
        /* Every cursor declaration on the page has to go, including the ones
           Tailwind writes onto buttons, so this is one of the few places where
           !important is the honest tool rather than a workaround. Text fields keep
           their caret — losing it makes a field feel broken to type in. */
        .pd-on,
        .pd-on *:not(input):not(textarea):not([contenteditable]) { cursor: none !important; }

        /* Fixed, not absolute: it follows the viewport coordinates the pointer is
           reported in, so it stays put under the cursor while the page scrolls. */
        .pd-dot {
          position: fixed; top: 0; left: 0; z-index: 90; pointer-events: none;
          width: ${DOT_SIZE}px; height: ${DOT_SIZE}px; border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0; will-change: transform;
        }
      `}</style>
    </>
  );
}
