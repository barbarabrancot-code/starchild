import { useEffect, useRef, type RefObject } from "react";

// dot chases the pointer, light trails the dot — the small lag is what makes it
// read as a lamp being carried rather than a sprite pinned to the cursor
const DOT_EASE = 0.34;
const LIGHT_EASE = 0.15;

const MASK_SIZE = 860; // px; the lit copy is revealed through a mask this wide
const GLOW_SIZE = 560;
const DOT_SIZE = 14;

/**
 * Dark base image + a brighter, warmer copy of the same image revealed through a
 * radial mask that follows the pointer. The reveal is a real re-exposure of the
 * photograph, not an orange gradient laid on top, so edges and surface come back
 * where the light lands and nowhere else.
 *
 * Renders nothing on touch/coarse pointers.
 */
export function HeroSpotlight({ targetRef, image }: { targetRef: RefObject<HTMLElement | null>; image: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = targetRef.current;
    const root = rootRef.current;
    if (!host || !root) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return; // touch: no cursor to follow, so no effect

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // target (pointer), dot, and light each have their own position
    let tx = 0, ty = 0;
    let dx = 0, dy = 0;
    let lx = 0, ly = 0;
    let seeded = false;
    let frame = 0;

    const paint = () => {
      dotRef.current?.style.setProperty("transform", `translate3d(${dx - DOT_SIZE / 2}px, ${dy - DOT_SIZE / 2}px, 0)`);
      glowRef.current?.style.setProperty("transform", `translate3d(${lx - GLOW_SIZE / 2}px, ${ly - GLOW_SIZE / 2}px, 0)`);
      // moving mask-position keeps the gradient itself static, so it stays cacheable
      litRef.current?.style.setProperty("--mx", `${lx - MASK_SIZE / 2}px`);
      litRef.current?.style.setProperty("--my", `${ly - MASK_SIZE / 2}px`);
    };

    const tick = () => {
      dx += (tx - dx) * DOT_EASE;
      dy += (ty - dy) * DOT_EASE;
      lx += (dx - lx) * LIGHT_EASE;
      ly += (dy - ly) * LIGHT_EASE;
      paint();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!seeded) {
        // first move: drop everything at the pointer so it doesn't fly in from 0,0
        seeded = true;
        dx = lx = tx;
        dy = ly = ty;
        paint();
        if (reduced) return;
        frame = requestAnimationFrame(tick);
      }
      if (reduced) {
        dx = lx = tx;
        dy = ly = ty;
        paint();
      }
    };

    const onEnter = () => root.classList.add("hs-on");
    const onLeave = () => {
      root.classList.remove("hs-on");
      cancelAnimationFrame(frame);
      frame = 0;
      seeded = false;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    host.classList.add("hs-host");

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.classList.remove("hs-host");
      cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div ref={rootRef} className="hs-root" aria-hidden="true">
      {/* light sits under the copy — it is lighting the photograph, not the text */}
      <div className="hs-light-layer">
        <div ref={litRef} className="hs-lit" />
        <div ref={glowRef} className="hs-glow" />
      </div>
      {/* the dot stands in for the cursor, so it has to clear everything */}
      <div className="hs-cursor-layer">
        <div ref={dotRef} className="hs-dot" />
      </div>

      <style>{`
        .hs-root { position: absolute; inset: 0; pointer-events: none; }
        .hs-light-layer { position: absolute; inset: 0; z-index: 1; }
        .hs-cursor-layer { position: absolute; inset: 0; z-index: 20; }

        /* the same photograph, re-exposed: brighter, warmer, and only where the mask is */
        .hs-lit {
          position: absolute; inset: 0;
          background-image: url("${image}");
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: brightness(2.9) contrast(1.06) sepia(.62) saturate(2.9) hue-rotate(-16deg);
          opacity: 0;
          transition: opacity .45s ease;
          --mx: -9999px; --my: -9999px;
          -webkit-mask-image: radial-gradient(circle closest-side,
            rgba(0,0,0,.95) 0%, rgba(0,0,0,.62) 30%, rgba(0,0,0,.22) 55%, transparent 76%);
          mask-image: radial-gradient(circle closest-side,
            rgba(0,0,0,.95) 0%, rgba(0,0,0,.62) 30%, rgba(0,0,0,.22) 55%, transparent 76%);
          -webkit-mask-size: ${MASK_SIZE}px ${MASK_SIZE}px;
          mask-size: ${MASK_SIZE}px ${MASK_SIZE}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${GLOW_SIZE}px; height: ${GLOW_SIZE}px;
          border-radius: 999px;
          background: radial-gradient(circle,
            rgba(248,70,0,.20) 0%, rgba(248,70,0,.09) 34%, rgba(248,70,0,.03) 58%, transparent 72%);
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity .45s ease;
          will-change: transform;
        }

        .hs-dot {
          position: absolute; top: 0; left: 0;
          width: ${DOT_SIZE}px; height: ${DOT_SIZE}px;
          border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0;
          transition: opacity .3s ease;
          will-change: transform;
        }

        .hs-on .hs-lit { opacity: 1; }
        .hs-on .hs-glow { opacity: 1; }
        .hs-on .hs-dot { opacity: 1; animation: hs-breathe 3.6s ease-in-out infinite; }

        @keyframes hs-breathe {
          0%, 100% { scale: 1; }
          50% { scale: 1.16; }
        }

        /* the dot stands in for the cursor, but never over things you need to aim at */
        .hs-host { cursor: none; }
        .hs-host input, .hs-host textarea { cursor: text; }
        .hs-host button, .hs-host a, .hs-host [role="button"] { cursor: pointer; }

        @media (prefers-reduced-motion: reduce) {
          .hs-on .hs-dot { animation: none; }
          .hs-lit, .hs-glow, .hs-dot { transition: none; }
        }
      `}</style>
    </div>
  );
}
