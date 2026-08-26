import { useEffect, useRef } from "react";
import { usePresenceDot, usePrefersReducedMotion } from "./presence/usePresence";

/**
 * What Starchild is doing, in one grey line.
 *
 * It used to be the whole working: a rail, a tick per stage, the models it was
 * choosing between, a log of what each step had done. All true, and all of it
 * asking someone to read a process while they wait for an answer. The process is
 * still there — it just isn't the thing on screen any more.
 *
 * The line is the same shape as the answer that replaces it, so nothing jumps when
 * it does. And the orb beside it is the same presence as everywhere else in the
 * product, at the smallest size it still reads at: this is a thing thinking, not a
 * spinner reporting that a request is in flight.
 */

/** the dot draws a slow figure it never repeats exactly — see the aim loop below */
const DRIFT = 2.2;
const DRIFT_EVERY = 900;

function ThinkingOrb() {
  const reduced = usePrefersReducedMotion();
  const { ref, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: "unsettled",
    breath: 0.05,
  });
  const timer = useRef(0);

  useEffect(() => {
    if (reduced) return;

    // Working, expressed as a body that has not settled: it keeps being pulled
    // somewhere slightly new and keeps not quite arriving. A loop of fixed frames
    // would say "busy"; this says "not done yet", which is the true thing.
    const wander = () => {
      const angle = Math.random() * Math.PI * 2;
      controller.aim(Math.cos(angle) * DRIFT, Math.sin(angle) * DRIFT);
      timer.current = window.setTimeout(wander, DRIFT_EVERY * (0.7 + Math.random() * 0.6));
    };
    wander();

    return () => window.clearTimeout(timer.current);
  }, [controller, reduced]);

  return (
    <span className="tl-orb" aria-hidden="true">
      <span className="tl-halo" />
      <span ref={ref} className="tl-core" />
    </span>
  );
}

export function ThinkingLine({ label }: { label: string }) {
  return (
    <div className="tl-row" role="status" aria-live="polite">
      <ThinkingOrb />
      {/* keyed on the label so a change crossfades rather than swapping mid-word */}
      <span key={label} className="tl-label">
        {label}
      </span>

      <style>{`
        .tl-row {
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-google-sans);
        }

        /* Sized to the line it sits on, not to the orb it descends from: any bigger
           and the wait starts announcing itself. */
        .tl-orb {
          position: relative; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px;
        }
        .tl-halo {
          position: absolute; width: 34px; height: 34px; border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle, rgba(248,70,0,.34) 0%, rgba(248,70,0,0) 68%);
          animation: tl-breathe 2.4s ease-in-out infinite;
        }
        .tl-core {
          display: block; width: 9px; height: 9px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.6);
          will-change: transform;
        }
        @keyframes tl-breathe {
          0%, 100% { opacity: .5; transform: scale(.9); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        /* Grey, and the same size as body copy. It is a status, and a status that
           competes with the answer underneath it has misunderstood its job. */
        .tl-label {
          font-size: 14.5px; line-height: 1.5; color: rgba(255,255,255,.42);
          animation: tl-in .45s cubic-bezier(.16,1,.3,1);
        }
        @keyframes tl-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tl-halo, .tl-label { animation: none; }
          .tl-halo { opacity: .8; transform: none; }
        }
      `}</style>
    </div>
  );
}
