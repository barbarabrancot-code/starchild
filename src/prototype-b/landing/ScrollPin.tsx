import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";

// Shared scroll-pinning for the showcase sections: the block holds still in the
// middle of the screen and the scroll walks through its examples, one per stretch,
// releasing only after the last one.
//
// Short viewports used to fall back to a plain section, which quietly turned the
// whole thing off on any laptop below ~800px of viewport — Windows display scaling
// alone puts a 1080p screen under that. The pane scales itself down to fit instead,
// so only genuinely small screens, or someone who asked for reduced motion, get
// the unpinned layout.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 560px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** Whether this viewport should pin at all. Read synchronously so the very first
 *  paint already has the track's real height — motion measures the target as it is. */
export function usePinFits() {
  const read = () =>
    typeof window !== "undefined" &&
    window.matchMedia(PIN_QUERY).matches &&
    !window.matchMedia(REDUCED_QUERY).matches;

  const [fits, setFits] = useState(read);

  useEffect(() => {
    const pin = window.matchMedia(PIN_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    const sync = () => setFits(pin.matches && !reduced.matches);

    sync();
    pin.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      pin.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return fits;
}

/** 0 → 1 across the pinned stretch: 0 the moment the pane sticks, 1 as it lets go.
 *  Read straight from the track's own position rather than through a scroll-linked
 *  animation library — the pin already changes the track's height, and a measurement
 *  taken on the same tick as the scroll can't go stale against it. */
export function usePinnedProgress(
  trackRef: RefObject<HTMLDivElement | null>,
  pinned: boolean,
  onProgress: (progress: number) => void,
) {
  const latest = useRef(onProgress);
  latest.current = onProgress;

  useEffect(() => {
    if (!pinned) return;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = -track.getBoundingClientRect().top / travel;
      latest.current(p < 0 ? 0 : p > 1 ? 1 : p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pinned, trackRef]);
}

export function useScrollPin(steps: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = usePinFits();
  const [index, setIndex] = useState(0);

  usePinnedProgress(trackRef, pinned, (p) => {
    setIndex(Math.max(0, Math.min(steps - 1, Math.floor(p * steps))));
  });

  // Clicking an example scrolls to its stretch rather than setting state directly —
  // otherwise the selection and the scroll position would immediately disagree and
  // the next wheel tick would snap the choice back.
  const selectStep = (next: number) => {
    const track = trackRef.current;
    if (!pinned || !track) {
      setIndex(next);
      return;
    }
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((next + 0.5) / steps), behavior: "smooth" });
  };

  return { trackRef, pinned, index, selectStep };
}

export function ScrollPin({
  trackRef,
  pinned,
  screens,
  children,
}: {
  trackRef: React.Ref<HTMLDivElement>;
  pinned: boolean;
  /** stretches of scroll inside the pin — one per example */
  screens: number;
  children: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Whatever is pinned has to be fully visible, and these blocks change height when
  // an example with a taller panel is selected. Measure the natural height —
  // offsetHeight ignores the transform, so this can't feed back on itself.
  useLayoutEffect(() => {
    if (!pinned) {
      setScale(1);
      return;
    }
    const el = contentRef.current;
    if (!el) return;

    const fit = () => {
      const natural = el.offsetHeight;
      const available = window.innerHeight - 32;
      setScale(natural > available ? Math.max(0.62, available / natural) : 1);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [pinned]);

  return (
    <div
      ref={trackRef}
      className={`sp-track${pinned ? " sp-track--pinned" : ""}`}
      style={{ ["--sp-screens" as string]: String(screens) }}
    >
      <div className="sp-pane">
        <div
          ref={contentRef}
          className="sp-fit"
          style={scale === 1 ? undefined : { transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>

      <style>{`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `}</style>
    </div>
  );
}
