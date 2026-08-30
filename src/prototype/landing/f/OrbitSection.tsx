import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Container } from "../../Container";
import { AppIcon } from "../../agents/AppIcon";
import { BY_ID, type ConnectorId } from "../../agents/connectors";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import { usePointerLean } from "../../presence/usePointerLean";
import connectorsBackground from "../../../../assets/background connectors svg.svg";

/**
 * F's section 3 — what it plugs into.
 *
 * Carried over from E, with two changes and one addition.
 *
 * The claim is "works with what you use", and the shape argues it better than
 * the sentence does: Starchild in the middle, the tools going round it. Not a
 * logo wall — a logo wall says "we integrate with these", which is a list. This
 * says the tools are in orbit around the thing, which is the actual
 * relationship.
 *
 * The system assembles rather than arriving assembled. On entering the section
 * the rings draw, then the connectors land one at a time with their wires, and
 * only once they are all in does the whole thing start turning. Six logos fading
 * up together is a slide; six arriving in order is a system being built, and it
 * is also simply easier to follow.
 *
 * What is different here:
 *
 * · The orb is this section's own. E has one presence that flies down the page
 *   and this section borrows it, so it renders a seat rather than an orb. F has
 *   no flight, so the seat is filled here — and with the plain orb, not the
 *   hero's face. A face at the centre of six things arranged around it is two
 *   focal points in one figure.
 *
 * · The panel is cut concave, top and bottom. It is the only section on F with a
 *   ground of its own, and a straight-edged band would read as a stripe laid
 *   over the page. Scooped, the sections above and below lean into it and the
 *   three read as one column rather than as three slabs stacked.
 *
 *   Done with a mask rather than by painting the page colour over the corners:
 *   the panel genuinely stops there, so anything ever put behind it shows
 *   through the cut instead of being covered by a shape the same colour as the
 *   page — which is the version that breaks the first time the background is not
 *   flat.
 *
 * Two decisions kept from E:
 *
 *   · The names come from the product's own connector catalogue, so the section
 *     cannot drift from what the app actually connects to. Add one there and it
 *     is one line here.
 *   · Hovering pauses the whole system. A tooltip pinned to a moving target is a
 *     thing you have to chase, and nobody should have to chase a label.
 */

/** six with six different glyphs — two that draw the same shape read as a mistake */
const IN_ORBIT: ConnectorId[] = ["gmail", "gcal", "gdrive", "notion", "slack", "telegram"];

/** one full turn, slow enough that nobody watches it and nothing is ever still */
const PERIOD = "52s";

/**
 * One connector on the ring — its brand mark, or the glyph it falls back to.
 *
 * Which it is, is decided by whether public/connectors/<id>.svg loads, not by a
 * list kept here: adding a brand is putting the file in the folder and nothing
 * else, and until it is there the chip keeps the glyph rather than showing a
 * broken image or a logo drawn from memory. Two of the six are in that state
 * today.
 *
 * The chip underneath follows, and it has to. A mark stands on a white disc: the
 * six are full-colour company marks and every one of them is drawn to sit on
 * white, so the disc is what stops the pale ones dissolving and the dark ones
 * going to mud. It is also what makes the six read as one set — the logos
 * differ, the ground they stand on does not.
 *
 * A glyph keeps the dark chip, because a monochrome light-on-dark glyph on a
 * white disc is an invisible chip. So the fallback is not only a different mark,
 * it is a different chip, and the section stays legible on the day a file is
 * missing rather than losing a node to a white circle.
 *
 * Hover follows too. Behind a white disc a bright halo has no edge and reads as a
 * smudge on the ring rather than as the one node being pointed at, so the discs
 * take a tight accent ring with the falloff behind it.
 */
function Chip({
  id,
  on,
  onEnter,
  onLeave,
}: {
  id: ConnectorId;
  on: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const c = BY_ID[id];
  const [drawn, setDrawn] = useState(true);

  return (
    <button
      type="button"
      className={`orbf-chip${drawn ? " orbf-chip--brand" : ""}${on ? " orbf-chip--on" : ""}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={c.name}
    >
      {drawn ? (
        <img
          className="orbf-logo"
          src={`${import.meta.env.BASE_URL}connectors/${id}.svg`}
          alt=""
          onError={() => setDrawn(false)}
        />
      ) : (
        <AppIcon kind={c.kind} className="size-[22px]" />
      )}
    </button>
  );
}

export function OrbitSection() {
  const reduced = usePrefersReducedMotion();
  const [over, setOver] = useState<ConnectorId | null>(null);

  const stage = useRef<HTMLDivElement>(null);
  const seen = useInView(stage, { once: true, amount: 0.5 });

  /** the body noticing where you are — version E's lean, same numbers */
  const leanRef = usePointerLean<HTMLSpanElement>();

  /**
   * How much of the system is up: 0 nothing, 1 the rings, then one more per
   * connector. Staged rather than staggered by CSS delay so the orbit can wait
   * for the last one — a system that starts turning before it is built reads as
   * a loop that happened to be running when you arrived.
   */
  const [built, setBuilt] = useState(reduced ? IN_ORBIT.length + 1 : 0);

  useEffect(() => {
    if (reduced || !seen) return;
    const timers = [window.setTimeout(() => setBuilt(1), 120)];
    IN_ORBIT.forEach((_, i) => {
      timers.push(window.setTimeout(() => setBuilt(i + 2), 520 + i * 190));
    });
    return () => timers.forEach(window.clearTimeout);
  }, [seen, reduced]);

  const whole = built > IN_ORBIT.length;

  return (
    <section className="orbf-section">
      <div className="orbf-panel">
        <Container>
          <div className="orbf-grid">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="orbf-title"
            >
              Works with what
              <br />
              you already use.
            </motion.h2>

            <div
              ref={stage}
              className={`orbf-stage${over || !whole ? " orbf-stage--held" : ""}`}
              onMouseLeave={() => setOver(null)}
            >
              {/* the signal between the centre and each tool, drawn as that tool
                  arrives — one line per connector, never all at once */}

              {/* The rings, as ellipses at different tilts. Dotted because a solid
                  orbit is a diagram and a dotted one is a path. */}
              <svg className="orbf-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                {[
                  { rx: 168, ry: 168, rot: 0, o: 0.5 },
                  { rx: 168, ry: 68, rot: -18, o: 0.34 },
                  { rx: 168, ry: 68, rot: 62, o: 0.34 },
                  { rx: 168, ry: 68, rot: 118, o: 0.28 },
                ].map((ring, i) => (
                  <ellipse
                    key={i}
                    className={`orbf-ring${built >= 1 ? " orbf-ring--in" : ""}`}
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

              {/* The lean goes on a wrapper inside the core, because the core's
                  own transform is what centres it on the rings. */}
              <div className="orbf-core" aria-hidden="true">
                <span ref={leanRef} className="orbf-lean">
                  <PresenceOrb state={over ? "listening" : "resting"} size={112} />
                </span>
              </div>

              <div className="orbf-spin">
                {IN_ORBIT.map((id, i) => {
                  const c = BY_ID[id];
                  const on = over === id;
                  return (
                    <div
                      key={id}
                      className={`orbf-arm${built >= i + 2 ? " orbf-arm--in" : ""}`}
                      style={{ ["--a" as string]: `${i * 60}deg` }}
                    >
                      <div className="orbf-hold">
                        <Chip
                          id={id}
                          on={on}
                          onEnter={() => setOver(id)}
                          onLeave={() => setOver(null)}
                        />

                        <AnimatePresence>
                          {on && (
                            <motion.span
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, transition: { duration: 0.12 } }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="orbf-tip"
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
      </div>

      <style>{`
        .orbf-section { position: relative; background: transparent; }

        /* ---------- the concave panel ----------

           Two half-ellipses taken out of a single mask layer, one at each
           horizontal edge. Each is exactly as wide as the panel, so the cut runs
           out to nothing at all four corners: any narrower and the curve ends in
           a step partway along the edge, which reads as a mistake rather than a
           shape.

           --bite is the depth at the deepest point, and it is the only number to
           change. It scales with the viewport because the scoop is a proportion
           of the width it spans — fixed at 110px it is a gentle curve on a
           desktop and a bitten-off corner on a phone.

           The panel is a touch lighter than the page, and that difference is what
           the mask is for. On a ground identical to the page there is nothing to
           cut. */
        .orbf-panel {
          position: relative; display: grid; align-items: center;
          min-height: 100vh; padding-block: 96px;
          background: url(${connectorsBackground}) center / 100% 100% no-repeat;
        }

        .orbf-grid {
          display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px;
          max-width: 1080px; margin: 0 auto;
        }
        /* The system on the left, the sentence answering it on the right. Placed
           by column rather than by source order, so the headline stays first in
           the markup — which is what a screen reader reads and what the stacked
           phone layout puts on top. */
        .orbf-stage { grid-area: 1 / 1; }
        .orbf-title {
          grid-area: 1 / 2;
          margin: 0; font-family: var(--font-google-sans);
          font-size: 56px; line-height: 70px; font-weight: 500; letter-spacing: 0; color: #fff;
        }

        /* ---------- the system ---------- */

        .orbf-stage {
          position: relative; justify-self: center;
          width: 400px; height: 400px;
        }
        .orbf-rings, .orbf-wires {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }

        /* Each ring wipes itself on as the section arrives. Drawn rather than
           faded, so it reads as being laid down. */
        .orbf-ring {
          stroke-dasharray: 2 7; stroke-dashoffset: 0;
          opacity: 0; transition: opacity .7s ease;
        }
        .orbf-ring--in { opacity: 1; }

        /* The wires rotate with the system, so they are inside the spinning group
           in spirit — but they are drawn on the static layer and share its angle,
           which is cheaper than six more animated elements. */
        .orbf-wires { animation: orbf-spin ${PERIOD} linear infinite; }
        .orbf-stage--held .orbf-wires { animation-play-state: paused; }
        .orbf-wire {
          /* faint enough to read as signal rather than as structure — six solid
             spokes is a network diagram, which is the one thing this must not be */
          stroke: rgba(248,70,0,.26); stroke-width: 1;
          stroke-dasharray: 168; stroke-dashoffset: 168;
          transition: stroke-dashoffset .6s cubic-bezier(.16,1,.3,1);
        }
        .orbf-wire--in { stroke-dashoffset: 0; }

        /* Each connector drops into its place on the ring rather than fading in
           where it already was — the arrival is the point. */
        .orbf-arm--in .orbf-chip { transform: scale(1); }
        .orbf-arm:not(.orbf-arm--in) .orbf-chip { transform: scale(.4); }

        .orbf-core {
          position: absolute; top: 50%; left: 50%;
          width: 112px; height: 112px;
          transform: translate(-50%, -50%);
        }
        .orbf-lean { display: block; will-change: transform; }

        /* One element carries the rotation and every arm hangs off it, so the six
           can never drift out of formation with each other.

           Both of these are stage-sized, and six of the arms are stacked on top of
           each other — left hit-testable, the topmost one swallows every pointer
           event on the section and no chip is ever reachable. */
        .orbf-spin {
          position: absolute; inset: 0; pointer-events: none;
          animation: orbf-spin ${PERIOD} linear infinite;
        }
        .orbf-arm {
          position: absolute; inset: 0; pointer-events: none;
          transform: rotate(var(--a));
          opacity: 0; transition: opacity .5s ease;
        }
        .orbf-arm--in { opacity: 1; }

        /* Undoes both the arm's angle and the system's rotation, so the chip and
           its label stay upright the whole way round. */
        .orbf-hold {
          position: absolute; left: 50%; margin-left: -26px;
          /* 42% is the rings' rx as a share of the 400-unit viewBox, so the chips
             sit on the outer ring at any stage size rather than at its edge */
          top: calc(50% - 42% - 26px);
          width: 52px; height: 52px;
          transform: rotate(calc(var(--a) * -1));
          animation: orbf-unspin ${PERIOD} linear infinite;
        }

        @keyframes orbf-spin { to { transform: rotate(360deg); } }
        @keyframes orbf-unspin { to { transform: rotate(calc(var(--a) * -1 - 360deg)); } }

        /* Held still while a label is up. A tooltip pinned to something that keeps
           moving is a thing you have to chase. */
        .orbf-stage--held .orbf-spin,
        .orbf-stage--held .orbf-hold { animation-play-state: paused; }

        .orbf-chip {
          pointer-events: auto;
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.1);
          background: #141416; color: rgba(255,255,255,.82);
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .orbf-chip:hover, .orbf-chip--on {
          border-color: rgba(248,70,0,.75);
          transform: scale(1.08);
          box-shadow: 0 0 26px rgba(248,70,0,.35);
        }

        /* The disc a full-colour mark stands on — see the note on Chip. The
           border goes with it: an accent-tinted hairline around a white circle
           reads as a ring someone drew, not as the edge of the chip. */
        .orbf-chip--brand {
          background: #fff;
          border-color: rgba(255,255,255,.16);
        }
        .orbf-chip--brand:hover, .orbf-chip--brand.orbf-chip--on {
          border-color: transparent;
          box-shadow: 0 0 0 2px #f84600, 0 0 24px rgba(248,70,0,.32);
        }

        /* 30 in a 52 chip is the proportion the mark takes in the product's own
           connector rows. The marks are square and carry their own padding, so
           nothing is inset further here. */
        .orbf-logo { width: 30px; height: 30px; display: block; }
        .orbf-chip:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        /* White, like the chip it belongs to. A dark card next to a white one
           reads as a second element arriving rather than the chip saying its own
           name — and on this ground the pair is the only white in the section, so
           they have to be the same white. No backdrop blur: the card is opaque,
           and blurring behind something you cannot see through is work for
           nothing. */
        .orbf-tip {
          position: absolute; left: calc(100% + 12px); top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 1px;
          width: max-content; max-width: 200px;
          padding: 8px 12px; border-radius: 10px;
          border: 1px solid rgba(0,0,0,.06); background: #fff;
          box-shadow: 0 12px 30px rgba(0,0,0,.5);
          font-family: var(--font-google-sans); font-size: 11.5px;
          color: rgba(10,10,11,.55); text-align: left; pointer-events: none;
        }
        .orbf-tip strong { font-size: 13px; font-weight: 500; color: #0a0a0b; }

        @media (prefers-reduced-motion: reduce) {
          .orbf-spin, .orbf-hold, .orbf-wires { animation: none; }
        }

        @media (max-width: 940px) {
          .orbf-panel { padding-block: 90px; }
          .orbf-grid { grid-template-columns: 1fr; gap: 56px; justify-items: center; text-align: center; }
          .orbf-stage, .orbf-title { grid-area: auto; }
          .orbf-title { font-size: 38px; line-height: 48px; }
          .orbf-stage { width: 320px; height: 320px; }
          /* the label would run off the edge on the right-hand chips */
          .orbf-tip { left: 50%; top: calc(100% + 10px); transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
