import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Presence, frameTransform, type Frame, type Temperament } from "./presence";

/**
 * React side of the presence system. Nothing here decides how the dot behaves —
 * that is all in ./presence. These are the wires: one hook to read the motion
 * preference, and one to hang a Presence off a DOM node and drive its transform.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export type PresenceController = {
  /** point the body at a place, in the element's own offset space */
  aim: (x: number, y: number) => void;
  /** put it there with no travel */
  place: (x: number, y: number) => void;
  setTemperament: (next: Temperament) => void;
  /** nudge it off balance where it stands */
  unbalance: (strength?: number) => void;
  /** wake the loop after aiming from outside a render */
  wake: () => void;
};

export type UsePresenceDotOptions = {
  temperament?: Temperament;
  seed?: number;
  breath?: number;
  /** offset baked into every transform — centres a dot on its own box */
  offsetX?: number;
  offsetY?: number;
  /** called once a frame, after the transform is written */
  onFrame?: (frame: Frame) => void;
  /** stop the loop while the element is off screen */
  observe?: boolean;
};

/**
 * Attach a body to an element and let it live there. The element's transform is
 * written directly rather than through React state — this runs at frame rate and
 * a re-render per frame would be both slower and pointless.
 *
 * The loop parks itself as soon as the body is genuinely quiet and wakes on the
 * next aim, so a settled dot costs nothing.
 */
export function usePresenceDot<T extends HTMLElement>(options: UsePresenceDotOptions = {}): {
  ref: RefObject<T>;
  controller: PresenceController;
} {
  const {
    temperament = "composed",
    seed,
    breath = 0.022,
    offsetX = 0,
    offsetY = 0,
    onFrame,
    observe = true,
  } = options;

  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  // one body per mount — the seed must not be redrawn on every render or the
  // asymmetry would flicker instead of being this particular dot's character
  const presence = useMemo(
    () => new Presence({ temperament, seed, breath, reduced }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  useEffect(() => {
    presence.setReduced(reduced);
    presence.setTemperament(temperament);
  }, [presence, reduced, temperament]);

  const wake = useCallback(() => {
    if (runningRef.current || !visibleRef.current) return;
    runningRef.current = true;

    const tick = (now: number) => {
      const frame = presence.step(now);
      const el = ref.current;
      if (el) el.style.transform = frameTransform(frame, offsetX, offsetY);
      onFrameRef.current?.(frame);

      // park when there is truly nothing left to draw. With a breath there always
      // is, so the visibility gate below is what stops those.
      if (presence.isQuiet(frame) || !visibleRef.current) {
        runningRef.current = false;
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [presence, offsetX, offsetY]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // a dot nobody can see does not need to be alive
    let observer: IntersectionObserver | undefined;
    if (observe && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) wake();
        },
        { threshold: 0 },
      );
      observer.observe(el);
    }

    const onVisibility = () => {
      visibleRef.current = !document.hidden;
      if (!document.hidden) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    wake();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
    };
  }, [wake, observe]);

  const controller = useMemo<PresenceController>(
    () => ({
      aim: (x, y) => {
        presence.aim(x, y);
        wake();
      },
      place: (x, y) => {
        presence.place(x, y);
        wake();
      },
      setTemperament: (next) => presence.setTemperament(next),
      unbalance: (strength) => {
        presence.unbalance(strength);
        wake();
      },
      wake,
    }),
    [presence, wake],
  );

  return { ref, controller };
}

/**
 * A slow, irregular drift target — what a body aims at while it is working
 * something out. Not an oscillation: it holds a position, then moves, then holds
 * again, so the movement reads as thought rather than as a loading indicator.
 */
export function useDriftAim(
  controller: PresenceController,
  active: boolean,
  radius = 3.4,
  reduced = false,
) {
  useEffect(() => {
    if (!active || reduced) return;
    let timer: number;

    const next = () => {
      const angle = Math.random() * Math.PI * 2;
      const reach = radius * (0.35 + Math.random() * 0.65);
      controller.aim(Math.cos(angle) * reach, Math.sin(angle) * reach);
      // the pause is the point — it is judging, not pulsing
      timer = window.setTimeout(next, 380 + Math.random() * 620);
    };

    timer = window.setTimeout(next, 120);
    return () => window.clearTimeout(timer);
  }, [controller, active, radius, reduced]);
}
