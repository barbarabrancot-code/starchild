import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../../Container";
import { AppIcon } from "../../agents/AppIcon";
import { BY_ID, type ConnectorId } from "../../agents/connectors";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { STILL, reveal } from "./still";

/**
 * Section 5 — what it plugs into.
 *
 * The claim is "works with what you use", and the shape argues it better than the
 * sentence does: Starchild in the middle, the tools going round it. Not a logo
 * wall — a logo wall says "we integrate with these", which is a list. This says
 * the tools are in orbit around the thing, which is the actual relationship.
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

export function ConnectorsOrbitSection() {
  const [over, setOver] = useState<ConnectorId | null>(null);

  return (
    <section className="co-section">
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
            className={`co-stage${over ? " co-stage--held" : ""}${STILL ? " co-stage--still" : ""}`}
            onMouseLeave={() => setOver(null)}
          >
            {/* The rings, as three ellipses at different tilts. Dotted because a
                solid orbit is a diagram and a dotted one is a path. */}
            <svg className="co-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
              {[
                { rx: 168, ry: 168, rot: 0, o: 0.5 },
                { rx: 168, ry: 68, rot: -18, o: 0.34 },
                { rx: 168, ry: 68, rot: 62, o: 0.34 },
                { rx: 168, ry: 68, rot: 118, o: 0.28 },
              ].map((ring, i) => (
                <ellipse
                  key={i}
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

            <div className="co-core">
              <PresenceOrb state={over ? "listening" : "resting"} size={112} />
            </div>

            <div className="co-spin">
              {IN_ORBIT.map((id, i) => {
                const c = BY_ID[id];
                const on = over === id;
                return (
                  <div key={id} className="co-arm" style={{ ["--a" as string]: `${i * 60}deg` }}>
                    <div className="co-hold">
                      <button
                        type="button"
                        className={`co-chip${on ? " co-chip--on" : ""}`}
                        onMouseEnter={() => setOver(id)}
                        onFocus={() => setOver(id)}
                        onBlur={() => setOver(null)}
                        aria-label={c.name}
                      >
                        <AppIcon kind={c.kind} className="size-[22px]" />
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
        .co-rings { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

        .co-core {
          position: absolute; top: 50%; left: 50%;
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
