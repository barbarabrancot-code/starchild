import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../../Container";
import conductorAsset from "../../../../assets/conductor.svg";
import leftBeamAsset from "../../../../assets/feixe1.svg";
import rightBeamAsset from "../../../../assets/feixe 2.svg";
import conductorBeamAsset from "../../../../assets/feixe conductor.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTEXT = ["Context", "Goals", "Tools", "Preferences", "Current task"];
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

          <motion.div
            className="cda-context"
            initial={{ opacity: 0, x: -22 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
          >
            {CONTEXT.map((item) => <span key={item}>{item}</span>)}
          </motion.div>

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
              <img src={conductorAsset} alt="" />
            </div>
            <img className="cda-answer-beam" src={conductorBeamAsset} alt="" aria-hidden="true" />
            <p>The right model.<br />The right answer.</p>
          </motion.div>
        </div>
      </Container>

      <style>{`
        .cda-section { position: relative; overflow: hidden; padding: 0 0 72px; background: transparent; font-family: var(--font-google-sans); }
        .cda-shell { position: relative; z-index: 1; min-height: 700px; background: transparent; isolation: isolate; }
        .cda-heading { position: relative; z-index: 3; padding-top: 30px; text-align: center; }
        .cda-heading p { margin: 0 0 10px; color: #f84600; font-size: 15px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
        .cda-heading h2 { margin: 0; color: #fff; font-size: 42px; line-height: 70px; font-weight: 500; letter-spacing: 0; }
        .cda-rake { position: absolute; z-index: 0; top: 74px; width: 50vw; height: 310px; object-fit: fill; pointer-events: none; }
        .cda-rake--left { left: 0; }
        .cda-rake--right { right: 0; transform: scaleX(-1); }
        .cda-context, .cda-models { position: absolute; z-index: 2; top: 170px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; max-width: 240px; }
        .cda-context { left: 15.5%; justify-content: center; }
        .cda-context span { padding: 6px 12px; border: 1px solid rgba(242,242,242,.08); border-radius: 999px; background: rgba(242,242,242,.30); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); color: rgba(255,255,255,.94); font-size: 14px; line-height: 1; white-space: nowrap; }
        .cda-context span:last-child { margin-inline: 22px; }
        .cda-models { right: 10%; display: grid; width: 250px; max-width: 25vw; gap: 16px; }
        .cda-model-mask { width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%); }
        .cda-model-track { display: flex; align-items: center; gap: 34px; width: max-content; padding-right: 34px; animation: cda-model-marquee 26s linear infinite; }
        .cda-model-mask--reverse .cda-model-track { animation-direction: reverse; }
        .cda-models:hover .cda-model-track { animation-play-state: paused; }
        @keyframes cda-model-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cda-model { display: inline-flex; align-items: center; gap: 7px; color: rgba(255,255,255,.82); font-size: 14px; font-weight: 600; white-space: nowrap; }
        .cda-model img { display: block; width: auto; height: 17px; max-width: 86px; filter: grayscale(1) brightness(2); opacity: .82; }
        .cda-model b { display: grid; place-items: center; width: 18px; height: 18px; color: rgba(255,255,255,.82); font-size: 21px; font-weight: 400; }
        .cda-core { position: absolute; z-index: 3; top: 176px; left: calc(50% - 155px); width: 310px; height: 350px; text-align: center; }
        .cda-orb { position: relative; z-index: 2; width: 150px; height: 150px; margin: 0 auto; }
        .cda-orb > img { display: block; width: 100%; height: 100%; }
        .cda-answer-beam { position: absolute; z-index: 1; top: 102px; left: 50%; width: 410px; height: auto; transform: translateX(-50%); pointer-events: none; }
        .cda-core p { position: relative; z-index: 2; margin: 45px 0 0; color: #fff; font-size: 16px; line-height: 1.28; font-weight: 500; }
        @media (max-width: 900px) {
          .cda-shell { min-height: 650px; }
          .cda-rake { top: 86px; width: 62vw; height: 310px; }
          .cda-context { left: 8%; }
          .cda-models { right: 5%; width: 220px; }
        }
        @media (max-width: 680px) {
          .cda-section { padding: 0 0 70px; }
          .cda-shell { min-height: 660px; }
          .cda-heading { padding-top: 30px; }
          .cda-heading p { font-size: 12px; }
          .cda-heading h2 { font-size: 38px; line-height: 48px; }
          .cda-rake { top: 126px; width: 116vw; height: 280px; }
          .cda-rake--left { left: -42%; }
          .cda-rake--right { right: -42%; }
          .cda-context, .cda-models { top: 132px; transform: none; }
          .cda-context { left: 50%; width: 270px; max-width: calc(100% - 32px); transform: translateX(-50%); }
          .cda-context span { padding: 6px 11px; font-size: 13px; }
          .cda-context span:last-child { margin-inline: 28px; }
          .cda-models { top: 438px; left: 50%; right: auto; width: min(280px, calc(100% - 36px)); max-width: none; transform: translateX(-50%); gap: 16px; }
          .cda-model { font-size: 14px; }
          .cda-model img { height: 17px; }
          .cda-core { top: 220px; }
        }
        @media (prefers-reduced-motion: reduce) { .cda-model-track { animation: none; } }
      `}</style>
    </section>
  );
}
