import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../../Container";
import conductorAsset from "../../../../assets/conductor.svg";
/* The same drawing with its line art inverted. Two files and a CSS swap rather
   than one file and a filter: the drawing is near-white lines plus one orange
   fill, and every filter that lifts the lines also moves the orange. */
import conductorLightAsset from "../../../../assets/conductor-light.svg";
import leftBeamAsset from "../../../../assets/feixe1.svg";
import rightBeamAsset from "../../../../assets/feixe 2.svg";
import conductorBeamAsset from "../../../../assets/feixe conductor.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What it knows about you, scattered across the beam rather than stacked in it.
 *
 * Rows of pills were a menu — five equal chips, evenly spaced, reading as things
 * you could pick. These are not choices, they are what the light is already
 * falling on, and a loose constellation says that where a tidy grid says the
 * opposite.
 *
 * The positions are percentages of the box below and they are irregular on
 * purpose: five points on an even grid is a table with the lines rubbed out, and
 * the eye finds the pattern anyway.
 *
 * x is the left edge — of the dot and of the first letter, which are the same
 * edge. It was the centre until the dot moved off centre, and centring meant a
 * label's position depended on how long the word was: rename "Tools" to
 * "Connected tools" and the point it marks slides left. Nudge these if the copy
 * changes; nothing here is derived and nothing else depends on them.
 */
const CONTEXT = [
  { label: "Context", x: 21, y: 6 },
  { label: "Goals", x: 71, y: 21 },
  { label: "Tools", x: 5, y: 46 },
  { label: "Preferences", x: 43, y: 56 },
  { label: "Current task", x: 19, y: 88 },
];
const MODELS = [
  { name: "OpenAI", logo: "openai" },
  { name: "SpaceX", logo: "spacex" },
  { name: "DeepSeek", logo: "deepseek" },
  { name: "Qwen", logo: "" },
];

/** Landing A's conductor is an atmosphere, not a process diagram. Context and
 * models arrive from opposite sides; the Conductor stays as the quiet source. */
export function ConductorSectionA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="cda-section" aria-labelledby="cda-title">
      <img className="cda-rake cda-rake--left" src={leftBeamAsset} alt="" aria-hidden="true" />
      <img className="cda-rake cda-rake--right" src={rightBeamAsset} alt="" aria-hidden="true" />

      <Container>
        <div className="cda-shell">
          <motion.div
            className="cda-heading"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p>Conductor mode</p>
            <h2 id="cda-title">It knows you. It knows AI.</h2>
          </motion.div>

          {/* A list, because that is what it is: the five things it has on you.
              They arrive one at a time rather than together — five points fading
              up at once is a slide, five landing in order is something being
              noticed. */}
          <ul className="cda-context">
            {CONTEXT.map((item, i) => (
              <motion.li
                key={item.label}
                className="cda-known"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.45, delay: 0.24 + i * 0.09, ease: EASE }}
              >
                <span className="cda-dot" aria-hidden="true" />
                {item.label}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="cda-models"
            initial={{ opacity: 0, x: 22 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            aria-label="OpenAI, SpaceX, DeepSeek and Qwen models"
          >
            {([false, true] as const).map((reverse) => (
              <div
                key={String(reverse)}
                className={reverse ? "cda-model-mask cda-model-mask--reverse" : "cda-model-mask"}
                aria-hidden="true"
              >
                <div className="cda-model-track">
                  {[...MODELS, ...MODELS].map((model, index) => (
                    <span className="cda-model" key={`${model.name}-${index}`}>
                      {model.logo ? (
                        <img src={`${import.meta.env.BASE_URL}models/${model.logo}.svg`} alt="" />
                      ) : (
                        <><b>✧</b>{model.name}</>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="cda-core"
            initial={{ opacity: 0, scale: 0.82, y: 14 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            <div className="cda-orb" aria-hidden="true">
              <span className="cda-art" />
            </div>
            <img className="cda-answer-beam" src={conductorBeamAsset} alt="" aria-hidden="true" />
            <p>The right model.<br />The right answer.</p>
          </motion.div>
        </div>
      </Container>

      <style>{`
        .cda-section { position: relative; overflow: hidden; padding: 56px 0 96px; background: transparent; font-family: var(--font-google-sans); }
        .cda-shell { position: relative; z-index: 1; min-height: 680px; background: transparent; isolation: isolate; }
        .cda-heading { position: relative; z-index: 3; padding-top: 72px; text-align: center; }
        .cda-heading p { margin: 0 0 10px; color: var(--lf-accent-ink); font-size: 15px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
        .cda-heading h2 { margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }
        .cda-rake { position: absolute; z-index: 0; top: 128px; width: min(65vw, 1165px); height: auto; opacity: .8; filter: blur(4px); pointer-events: none; }
        .cda-rake--left { left: 0; }
        .cda-rake--right { right: 0; }
        .cda-context, .cda-models { position: absolute; z-index: 2; top: 260px; display: flex; align-items: center; gap: 10px; max-width: 240px; }
        /* A field the points are placed in, not a stack they sit in — so it
           overrides the flex the two columns otherwise share. */
        .cda-context {
          left: 13%; display: block; width: 300px; height: 250px; max-width: 32vw;
          margin: 0; padding: 0; list-style: none;
        }
        /* The dot sits over the first letter, not over the middle of the word.
           Centred, it read as a bullet the label hangs from; on the left edge the
           pair reads as one mark with its name written under it, and the five of
           them line up as points rather than as five centred captions. */
        .cda-known {
          position: absolute;
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          color: #fff;
          font-family: var(--font-family-Font-1, "Google Sans");
          font-size: 18px;
          font-style: normal;
          font-weight: var(--font-weight-400, 400);
          line-height: 1.28;
          letter-spacing: 0;
          white-space: nowrap;
        }
        /* Small and lit. The glow is what keeps a 7px dot from disappearing into
           a beam that is already orange — on the light ground the beam is paler
           and the dot carries itself, so the halo is only there for the dark. */
        .cda-dot {
          width: 7px; height: 7px; margin-left: 1px; border-radius: 999px;
          background: var(--lf-accent);
          box-shadow: 0 0 12px rgba(var(--lf-accent-rgb), calc(.85 * var(--lf-glow)));
        }
        /* The left edge is where it was — the distance from the centre is the
           thing that was already right. What changes is that the width now stops
           at the page's own margin instead of being a number that happened to fit
           at one viewport: the block starts at 50% + 250 of the shell, so the room
           left to the container's edge is exactly 50% - 250, and taking the
           smaller of that and 520 means the row narrows rather than crossing the
           gutter. The mask is 100% of this, so it narrows with it. */
        .cda-models {
          top: 339px; left: calc(50% + 250px); right: auto;
          display: grid; width: min(520px, calc(50% - 250px)); max-width: none; gap: 18px;
        }
        .cda-model-mask {
          width: 100%; overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }
        .cda-model-track { display: flex; align-items: center; gap: 46px; width: max-content; padding-right: 46px; animation: cda-model-marquee 26s linear infinite; }
        .cda-model-mask--reverse .cda-model-track { animation-direction: reverse; }
        .cda-models:hover .cda-model-track { animation-play-state: paused; }
        @keyframes cda-model-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cda-model { display: inline-flex; align-items: center; gap: 7px; color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); font-size: 17px; font-weight: 600; white-space: nowrap; }
        .cda-model img { display: block; width: auto; height: 21px; max-width: 100px; filter: grayscale(1) brightness(2); opacity: .82; }
        .cda-model b { display: grid; place-items: center; width: 18px; height: 18px; color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); font-size: 21px; font-weight: 400; }
        .cda-core { position: absolute; z-index: 3; top: 274px; left: calc(50% - 155px); width: 310px; height: 350px; text-align: center; }
        .cda-orb { position: relative; z-index: 2; width: 190px; height: 190px; margin: 0 auto; transform-origin: 50% 50%; animation: cda-breathe 5.6s ease-in-out infinite; will-change: transform; }
        /* The drawing itself. A background rather than an <img> so the light
           ground can swap the file from CSS — see the rule under .lf[data-lf] in
           LandingPageF. */
        .cda-art {
          display: block; width: 100%; height: 100%;
          background: url(${conductorAsset}) center / contain no-repeat;
        }
        .lf[data-lf="light"] .cda-art {
          background-image: url(${conductorLightAsset});
        }
        .cda-answer-beam { position: absolute; z-index: 1; top: 0; left: 50%; width: 560px; max-width: none; height: 420px; object-fit: fill; opacity: .9; transform: translateX(-50%); pointer-events: none; }
        .cda-core p { position: relative; z-index: 2; margin: 84px 0 0; color: var(--lf-ink); font-size: 18px; line-height: 1.28; font-weight: 500; }
        @keyframes cda-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @media (max-width: 900px) {
          .cda-shell { min-height: 720px; }
          .cda-rake { top: 150px; width: 76vw; }
          .cda-context { left: 8%; width: 260px; height: 220px; }
          .cda-models { left: calc(50% + 180px); right: auto; width: min(380px, calc(50% - 180px)); }
        }
        @media (max-width: 680px) {
          .cda-section { padding: 32px 0 70px; }
          .cda-shell { min-height: 710px; }
          .cda-heading { padding-top: 54px; }
          .cda-heading p { font-size: 12px; }
          .cda-heading h2 { font-size: 38px; line-height: 48px; }
          .cda-rake { top: 164px; width: 116vw; }
          .cda-rake--left { left: -42%; }
          .cda-rake--right { right: -42%; }
          .cda-context, .cda-models { top: 174px; transform: none; }
          .cda-context { left: 50%; width: 250px; height: 200px; max-width: calc(100% - 32px); transform: translateX(-50%); }
          .cda-known { gap: 8px; }
          .cda-models { top: 488px; left: 50%; right: auto; width: min(310px, calc(100% - 36px)); max-width: none; transform: translateX(-50%); gap: 16px; }
          .cda-model { font-size: 14px; }
          .cda-model img { height: 17px; }
          .cda-core { top: 282px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cda-model-track, .cda-orb { animation: none; }
        }
      `}</style>
    </section>
  );
}
