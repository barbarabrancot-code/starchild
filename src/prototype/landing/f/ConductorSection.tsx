import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../../Container";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePointerLean } from "../../presence/usePointerLean";

/**
 * F's section 4 — how it decides.
 *
 * One drawing, read left to right and then down. What the product knows about
 * you on the left, what it can reach on the right, the mark in the middle, and
 * the answer falling out of the bottom of it. The traces and the beam are light
 * and wiring, so they are decoration to a screen reader and the words inside
 * them stay ordinary text.
 *
 * The composition is held by numbers rather than by eye, and it has to be:
 *
 * · Five tracks in one row — what it knows, the wire in, the mark, the wire out,
 *   the models. The two outer tracks are the same 1fr, which is what puts the mark
 *   on the centre line of the section however long the words either side run. An
 *   auto track on the left and a fixed one on the right hangs the whole drawing
 *   off to one side.
 *
 * · The elbows are in the list's track, not in the wire's. They used to share the
 *   120 beside the mark, which left the wire going in a third of the length of the
 *   wire coming out — the same drawing measuring differently on its two sides.
 *   Moved across, each wire track is 120 of straight line and 118 of it is drawn,
 *   so the two ends match and the mark still sits centred, which only holds while
 *   those two tracks stay equal.
 *
 * · The row height is fixed at 48px on the stage, because the elbows beside the
 *   list are drawn against those exact numbers: five rows of 48 make 240, and the
 *   SVG is 240 tall with a path starting on every rule. Change one and change the
 *   other.
 *
 * · The list and its elbows are lifted half a row, together. The five paths gather
 *   on the third rule, the middle of the five, and the lift is what lands that rule
 *   — and so the gather, the middle of the mark, and the wire leaving the other
 *   side — on one line.
 *
 * Two decisions about the light:
 *
 * · The mark is the source of the light in the drawing, and the two rakes at the
 *   edges are light in the room. They are kept apart: the rakes enter from off the
 *   sides, stay behind everything, and never reach the columns, so nothing in the
 *   wiring is ever lit by them. A cone that lands on the drawing is a shape lying
 *   on the page, which is the one thing light must not look like.
 *
 *   The rake is the drawn shape rather than an approximation of it —
 *   assets/feixe.svg, path and gradient unchanged. It had been rebuilt in CSS as
 *   a clipped wedge with a top-to-bottom fade and a large blur over it, and that
 *   is a different object: the drawn one is lit from the corner it enters by and
 *   falls off diagonally across itself, so it is brightest where it meets the
 *   edge of the section and gone well before the middle. A vertical fade cannot
 *   do that, and blurring a wedge to hide its edges only makes it a softer wedge.
 *   Positioned and mirrored here, and nothing else about it is touched.
 *
 * · The beam under the mark stays, and it is blurred rather than
 *   gradient-edged. It is not decoration — it is the mark throwing the answer,
 *   which is what the section is about.
 */

type Known = { label: string; icon: JSX.Element };

const KNOWS: Known[] = [
  {
    label: "Context",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="11" height="4" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2.5" y="9.5" width="11" height="4" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
  {
    label: "Goals",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
  {
    label: "Tools",
    icon: (
      <path
        d="M10.4 2.6a3.6 3.6 0 00-4.6 4.6l-3.2 3.2a1.3 1.3 0 001.8 1.8l3.2-3.2a3.6 3.6 0 004.6-4.6L10.2 6.2 8.4 4.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Current task",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.4 8.2l1.9 1.9 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Preferences",
    icon: (
      <>
        <path d="M2.5 5h11M2.5 11h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="5" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10.5" cy="11" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
];

/** the models it picks between, and the file each one's mark lives in */
const MODELS = [
  { name: "OpenAI", logo: "openai" },
  { name: "xAI", logo: "spacex" },
  { name: "DeepSeek", logo: "deepseek" },
  { name: "Qwen", logo: "qwen" },
  { name: "Claude", logo: "claude" },
  { name: "Kimi", logo: "kimi" },
];

/**
 * One mark, or the name it was written with.
 *
 * Adding a brand is putting the SVG in public/models/ and nothing else: until
 * that file is there the slide keeps its wordmark rather than showing a broken
 * image or a logo drawn from memory. Qwen has no file yet, and reads as "Qwen".
 */
function Model({ name, logo }: { name: string; logo: string }) {
  const [drawn, setDrawn] = useState(true);

  if (!drawn) return <li className="cd-model">{name}</li>;

  return (
    <li className="cd-model">
      <img
        src={`${import.meta.env.BASE_URL}models/${logo}.svg`}
        alt=""
        onError={() => setDrawn(false)}
      />
    </li>
  );
}

/**
 * One rake — assets/feixe.svg, as drawn.
 *
 * Held as a component rather than as two copies of the markup because the two
 * sides are the same object seen from opposite edges: the right one is the left
 * one mirrored in CSS, so there is one shape to change and it cannot go out of
 * step with itself.
 *
 * The gradient's id carries the side. Two SVGs in one document sharing an
 * internal id are one gradient, and which of the two definitions wins is not
 * something worth finding out later.
 */
function Rake({ side }: { side: "l" | "r" }) {
  const paint = "cd-feixe-" + side;
  const crop = "cd-feixe-crop-" + side;

  return (
    <svg
      className={"cd-rake cd-rake--" + side}
      width="1016"
      height="966"
      viewBox="0 0 1016 966"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g clipPath={"url(#" + crop + ")"}>
        <path
          d="M-83.439 71.4309C-103.525 42.8778 -81.0133 3.88705 -46.2428 7.00521L907.748 92.5575C937.581 95.2329 954.569 127.954 939.593 153.894L536.688 851.745C521.712 877.685 484.88 879.333 467.647 854.835L-83.439 71.4309Z"
          fill={"url(#" + paint + ")"}
          fillOpacity="0.48"
        />
      </g>
      <defs>
        <radialGradient
          id={paint}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(565.166 339.494 -266.64 457.347 89.1322 128.114)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F84600" />
          <stop offset="0.879513" stopColor="#F84600" stopOpacity="0" />
        </radialGradient>
        <clipPath id={crop}>
          <rect width="1016" height="966" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ConductorSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageVisible = useInView(stageRef, { once: true, amount: 0.2 });
  const leanRef = usePointerLean<HTMLSpanElement>();

  return (
    <section className="cd-section">
      {/* Two rakes of light entering at the edges — see the note above. They are
          behind everything by source order, and nothing in the drawing depends on
          where they land. */}

      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="cd-title"
        >
          It knows you. It knows AI.
        </motion.h2>

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`cd-stage${stageVisible ? " cd-stage--active" : ""}`}
        >
          {/* ---------- what it knows about you ----------
              The list and the elbows are one block, because they are one drawing:
              every path starts on a rule of the list, so anything that moves the
              list has to move them with it. */}
          <div className="cd-side">
            <ul className="cd-knows">
              {KNOWS.map((k) => (
                <li key={k.label} className="cd-known">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                    {k.icon}
                  </svg>
                  {k.label}
                </li>
              ))}
            </ul>

            {/* Five traces leaving the underline of each word and gathering into
                one. Fixed 82 × 240 — five rows of 48, the same 240 the list is —
                so every path starts exactly on a rule, and the bundle lands on
                the middle one. The 82 is the width the two elbows need and
                nothing more: everything past the gather is the wire, and the wire
                is measured against the one on the far side of the mark. */}
            <svg
              className="cd-trace cd-elbows"
              viewBox="0 0 82 240"
              width="82"
              height="240"
              aria-hidden="true"
              focusable="false"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path className="cd-draw" pathLength="1" d="M0 48H50A16 16 0 0166 64V128A16 16 0 0082 144" />
                <path className="cd-draw" pathLength="1" d="M0 96H50A16 16 0 0166 112V128A16 16 0 0082 144" />
                <path className="cd-draw" pathLength="1" d="M0 144H82" />
                <path className="cd-draw" pathLength="1" d="M0 192H50A16 16 0 0066 176V160A16 16 0 0182 144" />
                <path className="cd-draw" pathLength="1" d="M0 240H50A16 16 0 0066 224V160A16 16 0 0182 144" />
              </g>
            </svg>
          </div>

          {/* The wire in. Mirror of the wire out: same length, same terminal, the
              dot on the end nearest the mark. */}
          <svg
            className="cd-trace cd-trace--in"
            viewBox="0 0 120 20"
            width="120"
            height="20"
            aria-hidden="true"
            focusable="false"
          >
            <path className="cd-draw" pathLength="1" d="M0 10H118" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="118" cy="10" r="2.5" fill="currentColor" />
          </svg>

          {/* ---------- the mark, and what falls out of it ---------- */}
          <div className="cd-core">
            <span className="cd-label">Conductor</span>

            <span className="cd-orb-entry" aria-hidden="true">
              <span ref={leanRef} className="cd-mark">
                <PresenceOrb state="resting" size={138} />
              </span>
            </span>

            <span className="cd-beam" aria-hidden="true" />
            <p className="cd-answer">
              An answer that understands
              <br />
              the task — and you.
            </p>
          </div>

          {/* The wire out. Same 120 track as the wire in, because the mark only
              lands on the centre line of the section if the wiring either side of
              it measures the same — and the same 118 of drawn line, because two
              ends of one drawing at two different lengths read as a mistake. */}
          <svg
            className="cd-trace cd-trace--out"
            viewBox="0 0 120 20"
            width="120"
            height="20"
            aria-hidden="true"
            focusable="false"
          >
            <path className="cd-draw" pathLength="1" d="M2 10H120" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="2" cy="10" r="2.5" fill="currentColor" />
          </svg>

          {/* ---------- what it can reach ----------
              A closed box, and the carousel runs inside it. The box is what the
              trace arrives at, so it has to be a thing with an edge all the way
              round — an open frame reads as a piece of the drawing that failed to
              finish. */}
          <div className="cd-models">
            <p className="sr-only">
              Starchild reaches OpenAI, xAI, DeepSeek, Qwen, Claude and Kimi, and picks
              between them for each task.
            </p>

            {/* Two equal marquees make the choice of models feel active without
                turning the model rail into the dominant part of the diagram. */}
            <div className="cd-marquee" aria-hidden="true">
              <ul className="cd-track">
                {[...MODELS, ...MODELS].map((m, i) => (
                  <Model key={`${m.logo}-${i}`} name={m.name} logo={m.logo} />
                ))}
              </ul>
            </div>
            <div className="cd-marquee cd-marquee--reverse" aria-hidden="true">
              <ul className="cd-track">
                {[...MODELS, ...MODELS].map((m, i) => (
                  <Model key={`${m.logo}-${i}`} name={m.name} logo={m.logo} />
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        .cd-section {
          position: relative; overflow: hidden;
          /* so the rakes can sit under the drawing without falling behind the
             section's own ground — a negative layer needs a context to be
             negative inside of */
          isolation: isolate;
          padding: 100px 0;
          background: transparent;
          font-family: var(--font-google-sans);
        }

        /* ---------- the two rakes ----------

           The drawn shape at its own proportion — 1016 × 966, scaled by width and
           given the height that goes with it, so nothing in it stretches. All
           that is decided here is where each one enters and how much of it the
           section keeps.

           They hang a little above the top edge and a little outside the side
           edge, which puts the corner the gradient is hot at just off the page.
           What is left on the page is the shape falling away from that corner,
           and the section's own overflow does the cropping — the same job the
           artboard was doing around the original.

           Behind the drawing on a layer of their own, so nothing in the wiring is
           measured against them. */
        .cd-rake {
          position: absolute; top: -70px; z-index: -1;
          width: 760px; height: 723px;
          pointer-events: none;
        }
        /* One shape, entered from either side. The right is the left mirrored, so
           on both of them the corner it is lit from is the corner it comes in
           through. */
        .cd-rake--l { left: -150px; }
        .cd-rake--r { right: -150px; transform: scaleX(-1); }

        .cd-title {
          margin: 0 0 80px;
          text-align: center;
          font-size: 48px; line-height: 70px; font-weight: 500;
          letter-spacing: 0; color: #fff; text-wrap: balance;
        }

        /* Five tracks in one row — see the note above for why the outer two are
           the same 1fr. */
        .cd-stage {
          --row: 48px;
          position: relative;
          display: grid;
          grid-template-columns: minmax(min-content, 1fr) 120px auto 120px minmax(0, 1fr);
          align-items: center;
          max-width: 1030px; margin-inline: auto;
          padding-bottom: 120px;
        }

        /* ---------- what it knows ---------- */

        /* The list and its elbows, lifted half a row together — see the note
           above for what the lift is for. One transform on the pair rather than
           one each: they are drawn against each other, so they must never be able
           to drift apart. */
        .cd-side {
          display: flex; align-items: center; justify-content: flex-end;
          transform: translateY(calc(var(--row) / -2));
        }

        .cd-knows {
          position: relative; flex: 1; margin: 0; padding: 0; list-style: none;
        }

        .cd-known {
          display: flex; align-items: center; gap: 8px;
          height: var(--row); padding-right: 32px;
          border-bottom: 1px solid rgba(248,70,0,.32);
          font-size: 18px; letter-spacing: 0; color: #fff;
          white-space: nowrap;
        }
        .cd-known svg { color: #f84600; flex: none; }

        /* ---------- traces ---------- */

        .cd-trace {
          position: relative; flex: none;
          color: rgba(248,70,0,.32);
          /* the last path runs along the bottom edge of the box, and half a
             stroke of it falls outside */
          overflow: visible;
        }
        /* the stretch into the mark, and the one out of it, are the live ends —
           so both terminals are full accent rather than line colour */
        .cd-trace circle { color: #f84600; }
        .cd-draw { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
        .cd-trace circle { opacity: 0; }
        .cd-stage--active .cd-draw { animation: cd-trace-draw .74s cubic-bezier(.16, 1, .3, 1) forwards; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(1) { animation-delay: .06s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(2) { animation-delay: .13s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(3) { animation-delay: .20s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(4) { animation-delay: .27s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(5) { animation-delay: .34s; }
        .cd-stage--active .cd-trace--in .cd-draw { animation-delay: .68s; }
        .cd-stage--active .cd-trace--out .cd-draw { animation-delay: 1.15s; }
        .cd-stage--active .cd-trace circle { animation: cd-node-in .25s ease-out forwards; }
        .cd-stage--active .cd-trace--in circle { animation-delay: 1.36s; }
        .cd-stage--active .cd-trace--out circle { animation-delay: 1.83s; }
        @keyframes cd-trace-draw { to { stroke-dashoffset: 0; opacity: 1; } }
        @keyframes cd-node-in { to { opacity: 1; } }

        /* ---------- the mark ---------- */

        .cd-core {
          position: relative; display: grid; place-items: center;
          width: 190px; height: 190px;
        }

        .cd-label {
          position: absolute; top: -56px;
          font-size: 12px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          /* Orange, not the amber every other eyebrow takes: this one names the
             mark directly under it rather than labelling a section. */
          color: #f84600; white-space: nowrap;
        }

        .cd-orb-entry {
          display: grid; place-items: center;
          width: 138px; height: 138px;
          opacity: 1; transform: scale(1);
        }
        .cd-mark { position: relative; display: inline-flex; z-index: 1; }

        /* ---------- the answer ----------
           The beam leaves the bottom of the mark and widens as it falls. Blurred
           rather than gradient-edged: a cone with a hard clipped edge reads as a
           shape lying on the page, not as light coming off something. */

        .cd-beam {
          position: absolute; top: 62%; left: 50%;
          width: 380px; height: 260px;
          transform: translateX(-50%) scaleY(.14); transform-origin: 50% 0; pointer-events: none;
          clip-path: polygon(41% 0, 59% 0, 100% 100%, 0 100%);
          background: linear-gradient(to bottom,
            rgba(248,70,0,.42) 0%,
            rgba(248,70,0,.20) 38%,
            rgba(248,70,0,.07) 68%,
            transparent 96%);
          filter: blur(12px);
          opacity: 0;
        }
        .cd-stage--active .cd-beam { animation: cd-beam-in .9s cubic-bezier(.16, 1, .3, 1) 1.14s forwards; }
        @keyframes cd-beam-in { to { opacity: 1; transform: translateX(-50%) scaleY(1); } }

        .cd-answer {
          position: absolute; top: calc(62% + 130px); left: 50%;
          width: 300px; margin: 0;
          transform: translateX(-50%);
          text-align: center; letter-spacing: 0;
          font-size: 16px; font-weight: 500; color: #fff;
          opacity: 0;
        }
        .cd-stage--active .cd-answer { animation: cd-answer-in .5s ease-out 1.52s forwards; }
        @keyframes cd-answer-in { to { opacity: 1; } }

        /* ---------- what it can reach ---------- */

        .cd-models {
          position: relative;
          display: grid; gap: 16px;
          padding-block: 18px;
          border: 1px solid rgba(248,70,0,.32);
          border-radius: 12px;
          overflow: hidden;
        }

        .cd-marquee {
          position: relative; overflow: hidden;
          /* Soft at both ends, so a logo enters and leaves rather than appearing
             and vanishing against the border it is passing. */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%);
        }

        .cd-track {
          display: flex; align-items: center; gap: 56px;
          width: max-content; margin: 0; padding: 0; list-style: none;
          animation: cd-marquee 34s linear infinite;
        }

        .cd-marquee--reverse .cd-track { animation-name: cd-marquee-reverse; }

        /* Travels exactly one half of the doubled list, so the restart lands
           where the first slide already was and the seam is not visible. */
        @keyframes cd-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes cd-marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .cd-models:hover .cd-track { animation-play-state: paused; }

        .cd-model {
          flex: none; white-space: nowrap;
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,.55);
        }
        .cd-model img { height: 22px; width: auto; display: block; }

        @media (prefers-reduced-motion: reduce) {
          .cd-track { animation: none; }
          .cd-draw { stroke-dashoffset: 0; opacity: 1; }
          .cd-trace circle, .cd-orb-entry, .cd-beam, .cd-answer { opacity: 1; animation: none; }
          .cd-orb-entry { transform: scale(1); }
          .cd-beam { transform: translateX(-50%) scaleY(1); }
        }

        /* Below this the five-track row cannot hold: the traces are drawn at a
           fixed 120 wide and the mark is 190, so the two text columns are what
           gets squeezed, and "Current task" is the first thing to wrap. The
           drawing stacks instead — the wiring is what goes, because a trace that
           has to bend around a column break is no longer describing a path. */
        @media (max-width: 1000px) {
          .cd-section { padding: 60px 0; }
          /* Scaled with the section rather than left at desktop size, where two
             760-wide shapes on a 700-wide page overlap down the middle and stop
             being two lights. */
          .cd-rake { width: 460px; height: 437px; top: -40px; }
          .cd-rake--l { left: -110px; }
          .cd-rake--r { right: -110px; }
          .cd-title { font-size: 38px; line-height: 48px; margin-bottom: 56px; }
          .cd-stage {
            grid-template-columns: minmax(0, 1fr);
            justify-items: center; gap: 40px;
            padding-bottom: 80px;
          }
          .cd-side { display: block; transform: none; }
          .cd-trace { display: none; }
          .cd-known { padding-right: 0; min-width: 200px; }
          .cd-models { width: 100%; }
        }
      `}</style>
    </section>
  );
}
