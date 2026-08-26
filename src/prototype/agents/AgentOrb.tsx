import { useEffect, useRef } from "react";
import { usePresenceDot, useDriftAim, usePrefersReducedMotion } from "../presence/usePresence";
import type { Temperament } from "../presence/presence";
import type { AgentStatus } from "./agentsData";

/**
 * An agent's presence, in the same grammar as every other orange dot in the
 * product — the physics body from ../presence, not a new set of keyframes.
 *
 * The personality is in the body, which is the point: a working agent is a dot
 * that keeps being pulled somewhere and keeps not quite arriving; a paused one
 * holds perfectly still and loses its colour. Nothing here has a face, and none of
 * it is drawn — it is the same dot behaving differently because its situation is
 * different.
 *
 * Only `waiting` is allowed to want anything. It is the one state drawn as a ring
 * rather than a fill: it is asking, not doing, and an unfilled shape reads as
 * unfinished in a way a brighter dot never would.
 */

const TEMPERAMENT: Record<AgentStatus, Temperament> = {
  working: "unsettled",
  waiting: "attentive",
  scheduled: "composed",
  settled: "composed",
  paused: "composed",
};

/** how alive each one is at rest — paused has no breath at all */
const BREATH: Record<AgentStatus, number> = {
  working: 0.055,
  waiting: 0.03,
  scheduled: 0.022,
  settled: 0.014,
  paused: 0,
};

/** the one-shot a state change fires. None of them repeat. */
const BEAT: Record<AgentStatus, string | null> = {
  working: "ao-stir .6s cubic-bezier(.4,0,.2,1)",
  waiting: "ao-signal .7s cubic-bezier(.34,.8,.3,1)",
  scheduled: null,
  settled: "ao-settle .66s cubic-bezier(.16,1,.3,1)",
  paused: "ao-dim .5s ease",
};

export function AgentOrb({
  status,
  size = 8,
  /** the agent's own colour. Status is never carried by hue here — it is carried
   *  by form and motion — so a teal agent that needs you is still a ring. */
  accent,
  /** the header's orb gets the atmosphere; the roster's does not */
  halo = false,
}: {
  status: AgentStatus;
  size?: number;
  accent?: string;
  halo?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const beatRef = useRef<HTMLSpanElement>(null);

  const { ref, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: TEMPERAMENT[status],
    breath: BREATH[status],
  });

  // Working is the only one that wanders. Everything else holds its place, which
  // is what makes the wandering mean something.
  useDriftAim(controller, status === "working", 1.5, reduced);

  useEffect(() => {
    if (status === "working") return;
    controller.aim(0, 0);
  }, [controller, status]);

  // replay on every state change — clearing and reflowing is what restarts it
  useEffect(() => {
    const el = beatRef.current;
    const beat = BEAT[status];
    if (!el || !beat || reduced) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = beat;
  }, [status, reduced]);

  return (
    <span
      className={`ao-root ao-root--${status}`}
      style={{ width: size, height: size, ["--accent" as string]: accent ?? "var(--color-primary)" }}
      aria-hidden="true"
    >
      {halo && <span className="ao-halo" style={{ width: size * 3.6, height: size * 3.6 }} />}
      <span ref={beatRef} className="ao-beat">
        <span ref={ref} className="ao-core" style={{ width: size, height: size }} />
      </span>

      <style>{`
        .ao-root {
          position: relative; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .ao-beat { position: relative; display: inline-flex; transform-origin: center; }
        .ao-core {
          display: block; border-radius: 999px; background: var(--accent);
          will-change: transform;
        }

        /* the atmosphere the selected agent sits in */
        .ao-halo {
          position: absolute; border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 68%);
        }

        .ao-root--working .ao-core { box-shadow: 0 0 9px rgba(248,70,0,.65); }

        /* asking, not doing: a ring reads as unfinished in a way a brighter dot
           never would, and it needs no extra colour to say so */
        .ao-root--waiting .ao-core {
          background: transparent;
          border: 2px solid var(--accent);
          box-shadow: 0 0 9px rgba(248,70,0,.5);
        }

        .ao-root--scheduled .ao-core { background: color-mix(in srgb, var(--accent) 55%, transparent); }
        .ao-root--settled .ao-core { background: color-mix(in srgb, var(--accent) 78%, transparent); }
        /* no colour and no breath — it is not doing anything and should not pretend */
        .ao-root--paused .ao-core { background: rgba(255,255,255,.26); }
        .ao-root--paused .ao-halo { display: none; }

        /* one-shot beats, none of them looping */
        @keyframes ao-stir {
          0% { transform: scale(1); }
          40% { transform: scale(.93); }
          100% { transform: scale(1); }
        }
        @keyframes ao-signal {
          0% { transform: scale(1); }
          30% { transform: scale(1.22); }
          62% { transform: scale(.97); }
          100% { transform: scale(1); }
        }
        @keyframes ao-settle {
          0% { transform: scale(1.1); }
          58% { transform: scale(.98); }
          100% { transform: scale(1); }
        }
        @keyframes ao-dim {
          0% { opacity: .9; }
          100% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ao-beat { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
