import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Container } from "../../Container";
import { ConnectorMark } from "../../agents/ConnectorMark";
import { BY_ID, type ConnectorId } from "../../agents/connectors";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import { STILL, reveal } from "./still";

/**
 * Section 5 — what it plugs into.
 *
 * The claim is "works with what you use", and the shape argues it better than the
 * sentence does: Starchild in the middle, the tools going round it. Not a logo
 * wall — a logo wall says "we integrate with these", which is a list. This says
 * the tools are in orbit around the thing, which is the actual relationship.
 *
 * The system assembles rather than arriving assembled. On entering the section
 * the rings draw, then the connectors land one at a time with their wires, and
 * only once they are all in does the whole thing start turning. Six logos fading
 * up together is a slide; six arriving in order is a system being built, and it
 * is also simply easier to follow.
 *
 * The orb at the centre is the page's orb, flown in from the conversation — this
 * section contributes an anchor the same way the others do. That is the whole
 * argument of the composition made literal: the thing you were talking to is the
 * thing the tools are arranged around.
 *
 * Three decisions:
 *
 *   · The names come from the product's own connector catalogue, so the section
 *     cannot drift from what the app actually connects to. Add one there and it is
 *     one line here.
 *   · Hovering pauses the whole system. A tooltip pinned to a moving target is a
 *     thing you have to chase, and nobody should have to chase a label.
 *   · The rings are dotted and tilted rather than flat circles. Flat, six icons on
 *     one ring reads as a wheel; tilted, it reads as a sphere, and a sphere is
 *     what "everything around you" looks like.
 */

/** six with six different glyphs — two that draw the same shape read as a mistake */
const IN_ORBIT: ConnectorId[] = ["gmail", "gcal", "gdrive", "notion", "slack", "telegram"];

/** one full turn, slow enough that nobody watches it and nothing is ever still */
const PERIOD = "52s";

export function ConnectorsOrbitSection({
  orbAnchor,
  orbZone,
}: {
  /** the centre — filled by the page's one orb, flown in from the conversation */
  orbAnchor?: RefObject<HTMLDivElement>;
  orbZone?: RefObject<HTMLElement>;
} = {}) {
  const reduced = usePrefersReducedMotion();
  const [over, setOver] = useState<ConnectorId | null>(null);

  const stage = useRef<HTMLDivElement>(null);
  const seen = useInView(stage, { once: true, amount: 0.5 });

  /**
   * How much of the system is up: 0 nothing, 1 the rings, then one more per
   * connector. Staged rather than staggered by CSS delay so the orbit can wait
   * for the last one — a system that starts turning before it is built reads as
   * a loop that happened to be running when you arrived.
   */
  const [built, setBuilt] = useState(STILL || reduced ? IN_ORBIT.length + 1 : 0);

  useEffect(() => {
    if (STILL || reduced || !seen) return;
    const timers = [window.setTimeout(() => setBuilt(1), 120)];
    IN_ORBIT.forEach((_, i) => {
      timers.push(window.setTimeout(() => setBuilt(i + 2), 520 + i * 190));
    });
    return () => timers.forEach(window.clearTimeout);
  }, [seen, reduced]);

  const whole = built > IN_ORBIT.length;

  return (
    <section className="co-section" ref={orbZone as RefObject<HTMLElement>}>
      <Container>
        <div className="co-grid">
          <motion.h2
            {...reveal({
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.6 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            })}
            className="co-title"
          >
            Works with
            <br />
            what you use.
          </motion.h2>

          <div
            ref={stage}
            className={`co-stage${over || !whole ? " co-stage--held" : ""}${STILL ? " co-stage--still" : ""}`}
            onMouseLeave={() => setOver(null)}
          >
            {/* The rings, as three ellipses at different tilts. Dotted because a
                solid orbit is a diagram and a dotted one is a path. */}
            {/* the signal between the centre and each tool, drawn as that tool
                arrives — one line per connector, never all at once */}
            <svg className="co-wires" viewBox="0 0 400 400" fill="none" aria-hidden="true">
              {IN_ORBIT.map((id, i) => (
                <line
                  key={id}
                  className={`co-wire${built >= i + 2 ? " co-wire--in" : ""}`}
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="32"
                  transform={`rotate(${i * 60} 200 200)`}
                />
              ))}
            </svg>

            <svg className="co-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
              {[
                { rx: 168, ry: 168, rot: 0, o: 0.5 },
                { rx: 168, ry: 68, rot: -18, o: 0.34 },
                { rx: 168, ry: 68, rot: 62, o: 0.34 },
                { rx: 168, ry: 68, rot: 118, o: 0.28 },
              ].map((ring, i) => (
                <ellipse
                  key={i}
                  className={`co-ring${built >= 1 ? " co-ring--in" : ""}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  cx="200"
                  cy="200"
                  rx={ring.rx}
                  ry={ring.ry}
                  transform={`rotate(${ring.rot} 200 200)`}
                  stroke="var(--color-primary)"
                  strokeOpacity={ring.o}
                  strokeWidth="1"
                  strokeDasharray="2 7"
                />
              ))}
            </svg>

            {/* The seat, not the orb. The page's one orb flies in from the
                conversation and fills it — see FlightOrb. Without an anchor this
                section would draw a second one, and the page's claim that there is
                a single presence would end here. */}
            <div ref={orbAnchor} className="co-core" aria-hidden="true">
              {(STILL || !orbAnchor) && <PresenceOrb state={over ? "listening" : "resting"} size={112} />}
            </div>

            <div className="co-spin">
              {IN_ORBIT.map((id, i) => {
                const c = BY_ID[id];
                const on = over === id;
                return (
                  <div
                    key={id}
                    className={`co-arm${built >= i + 2 ? " co-arm--in" : ""}`}
                    style={{ ["--a" as string]: `${i * 60}deg` }}
                  >
                    <div className="co-hold">
                      <button
                        type="button"
                        className={`co-chip${on ? " co-chip--on" : ""}`}
                        onMouseEnter={() => setOver(id)}
                        onFocus={() => setOver(id)}
                        onBlur={() => setOver(null)}
                        aria-label={c.name}
                      >
                        <ConnectorMark id={id} className="size-[22px]" />
                      </button>

                      <AnimatePresence>
                        {on && (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="co-tip"
                          >
                            <strong>{c.name}</strong>
                            {c.what}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .co-section { position: relative; overflow: hidden; padding: 130px 0; background: #050506; }

        .co-grid {
          display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px;
          max-width: 1080px; margin: 0 auto;
        }
        .co-title {
          margin: 0; font-family: var(--font-google-sans);
          font-size: 44px; line-height: 1.12; font-weight: 600; color: #fff;
        }

        /* ---------- the system ---------- */

        .co-stage {
          position: relative; justify-self: center;
          width: 400px; height: 400px;
        }
        .co-rings, .co-wires {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }

        /* Each ring wipes itself on as the section arrives. Drawn rather than
           faded, so it reads as being laid down. */
        .co-ring {
          stroke-dasharray: 2 7; stroke-dashoffset: 0;
          opacity: 0; transition: opacity .7s ease;
        }
        .co-ring--in { opacity: 1; }

        /* The wires rotate with the system, so they are inside the spinning group
           in spirit — but they are drawn on the static layer and share its angle,
           which is cheaper than six more animated elements. */
        .co-wires { animation: co-spin  linear infinite; }
        .co-stage--held .co-wires { animation-play-state: paused; }
        .co-stage--still .co-wires { animation: none; }
        .co-wire {
          /* faint enough to read as signal rather than as structure — six solid
             spokes is a network diagram, which is the one thing this must not be */
          stroke: rgba(248,70,0,.26); stroke-width: 1;
          stroke-dasharray: 168; stroke-dashoffset: 168;
          transition: stroke-dashoffset .6s cubic-bezier(.16,1,.3,1);
        }
        .co-wire--in { stroke-dashoffset: 0; }

        /* Each connector drops into its place on the ring rather than fading in
           where it already was — the arrival is the point. */
        .co-arm {
          opacity: 0;
          transition: opacity .5s ease;
        }
        .co-arm--in { opacity: 1; }
        .co-arm--in .co-chip { transform: scale(1); }
        .co-arm:not(.co-arm--in) .co-chip { transform: scale(.4); }

        /* The anchor is the footprint: FlightOrb sizes the orb from the box it is
           flying to, so a seat with no width scales it to nothing. It landed dead
           centre and was invisible. */
        .co-core {
          position: absolute; top: 50%; left: 50%;
          width: 112px; height: 112px;
          transform: translate(-50%, -50%);
        }

        /* One element carries the rotation and every arm hangs off it, so the six
           can never drift out of formation with each other. */
        /* Both of these are stage-sized, and six of the arms are stacked on top of
           each other — left hit-testable, the topmost one swallows every pointer
           event on the section and no chip is ever reachable. */
        .co-spin {
          position: absolute; inset: 0; pointer-events: none;
          animation: co-spin ${PERIOD} linear infinite;
        }
        .co-arm {
          position: absolute; inset: 0; pointer-events: none;
          transform: rotate(var(--a));
        }
        /* Undoes both the arm's angle and the system's rotation, so the chip and
           its label stay upright the whole way round. */
        .co-hold {
          position: absolute; left: 50%; margin-left: -26px;
          /* 42% is the rings' rx as a share of the 400-unit viewBox, so the chips
             sit on the outer ring at any stage size rather than at its edge */
          top: calc(50% - 42% - 26px);
          width: 52px; height: 52px;
          transform: rotate(calc(var(--a) * -1));
          animation: co-unspin ${PERIOD} linear infinite;
        }

        @keyframes co-spin { to { transform: rotate(360deg); } }
        @keyframes co-unspin { to { transform: rotate(calc(var(--a) * -1 - 360deg)); } }

        /* Held still while a label is up. A tooltip pinned to something that keeps
           moving is a thing you have to chase. */
        .co-stage--held .co-spin,
        .co-stage--held .co-hold { animation-play-state: paused; }

        .co-chip {
          pointer-events: auto;
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.1);
          background: #141416; color: rgba(255,255,255,.82);
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .co-chip:hover, .co-chip--on {
          border-color: rgba(248,70,0,.75);
          transform: scale(1.08);
          box-shadow: 0 0 26px rgba(248,70,0,.35);
        }
        .co-chip:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        .co-tip {
          position: absolute; left: calc(100% + 12px); top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 1px;
          width: max-content; max-width: 200px;
          padding: 8px 12px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(26,26,28,.96);
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 30px rgba(0,0,0,.6);
          font-family: var(--font-google-sans); font-size: 11.5px;
          color: rgba(255,255,255,.5); text-align: left; pointer-events: none;
        }
        .co-tip strong { font-size: 13px; font-weight: 500; color: #fff; }

        /* Stopped at zero, so the six chips import at the angles they were laid
           out at rather than wherever the clock had reached. The arm still turns
           and .co-hold still counters it, so each chip lands upright on the ring. */
        .co-stage--still .co-spin,
        .co-stage--still .co-hold { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .co-spin, .co-hold { animation: none; }
        }

        @media (max-width: 940px) {
          .co-section { padding: 90px 0; }
          .co-grid { grid-template-columns: 1fr; gap: 56px; justify-items: center; text-align: center; }
          .co-title { font-size: 34px; }
          .co-stage { width: 320px; height: 320px; }
          /* the label would run off the edge on the right-hand chips */
          .co-tip { left: 50%; top: calc(100% + 10px); transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
