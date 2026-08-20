import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { CONTEXT_SIGNALS } from "../data";
import { Container } from "../Container";
import { StarchildDot } from "../onboarding/StarchildDot";
import { ScrollPin, usePinFits, usePinnedProgress } from "./ScrollPin";

// native SVG dimensions, so each wordmark keeps its aspect ratio at LOGO_HEIGHT.
// Grok is intentionally absent: the only xAI wordmark we hold (Spacexai.svg) reads
// as "SPACE✕", which in a list of AI models is mistaken for SpaceX. Swap it in here
// once a real Grok wordmark lands in public/images/carousel/.
const MODELS: { file: string; w: number; h: number }[] = [
  { file: "OpenAI.svg", w: 148, h: 40 },
  { file: "Claude.svg", w: 160, h: 34 },
  { file: "Frame374.svg", w: 151, h: 34 }, // Gemini
  { file: "Frame375.svg", w: 137, h: 40 }, // Qwen
  { file: "Deepseek.svg", w: 206, h: 33 },
  { file: "Kimi.svg", w: 118, h: 40 },
];

const LOGO_HEIGHT = 16;

const BENEFITS = [
  { title: "No model-hopping", desc: "Stop guessing which AI to use." },
  { title: "Better context", desc: "The model gets the information it actually needs." },
  { title: "Less waste", desc: "Starchild can avoid sending unnecessary context to expensive models." },
  { title: "Always adapting", desc: "As models change, you don't have to rebuild your workflow around them." },
];

// scroll windows for each movement
const IN_START = 0.06, IN_END = 0.46; // You + Models → Conductor
const OUT_START = 0.56, OUT_END = 0.92; // Conductor → Result

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

type Point = { x: number; y: number };
type Anchors = { you: Point; models: Point; conductor: Point; result: Point };

type Box = { left: number; top: number; width: number; height: number };

/** Position of `el` inside the stage, in layout pixels. The pinned pane may be
 *  scaled down to fit a short viewport, and the dots are positioned in unscaled
 *  pixels inside it — so every measurement is divided back out by that scale. */
function boxIn(el: Element, stage: DOMRect, scale: number): Box {
  const r = el.getBoundingClientRect();
  return {
    left: (r.left - stage.left) / scale,
    top: (r.top - stage.top) / scale,
    width: r.width / scale,
    height: r.height / scale,
  };
}

/** Point on `box` nearest to `target` — gives the edge a dot should leave from,
 *  and works unchanged when the row stacks vertically on small screens. */
function edgeToward(box: Box, target: Point): Point {
  return {
    x: Math.max(box.left, Math.min(target.x, box.left + box.width)),
    y: Math.max(box.top, Math.min(target.y, box.top + box.height)),
  };
}

function Panel({
  label,
  innerRef,
  children,
}: {
  label: string;
  innerRef: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div className="ky-panel" ref={innerRef}>
      <p className="ky-panel-label">{label}</p>
      {children}
    </div>
  );
}

export function KnowsYouKnowsAiSection({
  // Version C ends the section on the diagram: the four benefits restate in words
  // what the choreography has just shown, and C is deliberately the shorter page.
  showBenefits = true,
}: { showBenefits?: boolean } = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const conductorRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const anchors = useRef<Anchors | null>(null);

  // dot A (from You), dot B (from Models), dot C (the single result)
  const ax = useMotionValue(0), ay = useMotionValue(0), aOp = useMotionValue(0);
  const bx = useMotionValue(0), by = useMotionValue(0), bOp = useMotionValue(0);
  const cx = useMotionValue(0), cy = useMotionValue(0), cOp = useMotionValue(0);

  const [merged, setMerged] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [reduced, setReduced] = useState(false);
  // pinned: the diagram holds still on screen and the scroll drives the whole
  // choreography. Same rule as the showcase sections — where it can't pin, the
  // animation plays as the section passes by instead.
  const pinned = usePinFits();

  // unpinned fallback: the choreography plays as the section crosses the viewport
  const { scrollYProgress: flowProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.85", "end 0.55"],
  });

  useEffect(() => {
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMode = () => setReduced(reducedMq.matches);
    syncMode();
    reducedMq.addEventListener("change", syncMode);

    const measure = () => {
      const stage = stageRef.current;
      const you = youRef.current, models = modelsRef.current;
      const cond = conductorRef.current, res = resultRef.current;
      if (!stage || !you || !models || !cond || !res) return;

      const s = stage.getBoundingClientRect();
      const scale = stage.offsetWidth ? s.width / stage.offsetWidth : 1;

      const c = boxIn(cond, s, scale);
      const conductor = { x: c.left + c.width / 2, y: c.top + c.height / 2 };
      const r = boxIn(res, s, scale);

      anchors.current = {
        conductor,
        you: edgeToward(boxIn(you, s, scale), conductor),
        models: edgeToward(boxIn(models, s, scale), conductor),
        result: { x: r.left + r.width / 2, y: r.top },
      };
    };

    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      reducedMq.removeEventListener("change", syncMode);
    };
  }, []);

  // the stage moves when pinning switches on or off, so the anchors have to be
  // re-read before the next dot position is computed
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pinned]);

  const applyProgress = (p: number) => {
    const a = anchors.current;
    if (!a) return;

    // both dots share one progress value — they must arrive together, because the
    // point is that your context and the model pool carry equal weight
    const inb = easeInOut(clamp01((p - IN_START) / (IN_END - IN_START)));
    const outb = easeInOut(clamp01((p - OUT_START) / (OUT_END - OUT_START)));

    ax.set(lerp(a.you.x, a.conductor.x, inb));
    ay.set(lerp(a.you.y, a.conductor.y, inb));
    bx.set(lerp(a.models.x, a.conductor.x, inb));
    by.set(lerp(a.models.y, a.conductor.y, inb));

    // born on departure, gone as they land inside the Conductor
    const pairOp = inb <= 0 ? 0 : inb > 0.94 ? (1 - inb) / 0.06 : Math.min(1, inb / 0.08);
    aOp.set(pairOp);
    bOp.set(pairOp);

    cx.set(lerp(a.conductor.x, a.result.x, outb));
    cy.set(lerp(a.conductor.y, a.result.y, outb));
    cOp.set(outb <= 0 ? 0 : outb > 0.93 ? (1 - outb) / 0.07 : Math.min(1, outb / 0.08));

    setMerged(inb > 0.9);
    setDelivered(outb > 0.88);
  };

  // pinned: progress comes from the track itself, same as the showcase sections
  usePinnedProgress(trackRef, pinned, applyProgress);
  useMotionValueEvent(flowProgress, "change", (p) => {
    if (!pinned) applyProgress(p);
  });

  // reduced motion: skip the choreography, show the end state
  const showResult = reduced || delivered;

  return (
    <section className="ky-section bg-[#0a0a0a] py-24 md:py-32">
      {/* While pinned, the track supplies the scroll distance and the pane inside it
          holds the headline and the diagram still until the choreography finishes. */}
      <ScrollPin trackRef={trackRef} pinned={pinned} screens={2}>
          <Container>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 mx-auto max-w-[52ch] text-center">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              It knows you. It knows AI.
            </motion.h2>
            <p
              className="mt-5 text-[16px] leading-relaxed text-white/60"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Starchild learns how you work and chooses the right AI for each task.
            </p>
          </div>
        </div>

        {/* the equation: YOU ● →  ● CONDUCTOR  ← ● AI   then  ↓ ● RESULT */}
        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="ky-stage" ref={stageRef}>
              <div className="ky-flow">
                <Panel label="You" innerRef={youRef}>
                  <ul className="ky-list">
                    {CONTEXT_SIGNALS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Panel>

                <div className={`ky-conductor${merged ? " ky-conductor--hit" : ""}`} ref={conductorRef}>
                  <StarchildDot state={merged ? "thinking" : "idle"} depth={merged ? 1 : 0.35} size={16} />
                  <p className="ky-conductor-label">Conductor</p>
                </div>

                <Panel label="Available models" innerRef={modelsRef}>
                  <div className="ky-logos">
                    {MODELS.map((model) => (
                      <img
                        key={model.file}
                        src={`${import.meta.env.BASE_URL}images/carousel/${model.file}`}
                        alt=""
                        style={{ height: LOGO_HEIGHT, width: LOGO_HEIGHT * (model.w / model.h) }}
                      />
                    ))}
                  </div>
                </Panel>
              </div>

              <div className={`ky-result${showResult ? " ky-result--lit" : ""}`} ref={resultRef}>
                <p className="ky-result-label">Result</p>
                <p className="ky-result-text">
                  One answer, routed to the right model.
                </p>
              </div>

              {/* travelling dots. No rails, no trails — just the dot crossing the gap. */}
              {!reduced && (
                <div className="ky-dots" aria-hidden="true">
                  <motion.span className="ky-dot" style={{ x: ax, y: ay, opacity: aOp }} />
                  <motion.span className="ky-dot" style={{ x: bx, y: by, opacity: bOp }} />
                  <motion.span className="ky-dot ky-dot--result" style={{ x: cx, y: cy, opacity: cOp }} />
                </div>
              )}
                </div>
              </div>
            </div>
          </Container>
      </ScrollPin>

      {showBenefits && (
      <Container>
        {/* benefits */}
        <div className="mt-20 grid grid-cols-12 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <div className="ky-benefit">
                <h3 className="ky-benefit-title">{benefit.title}</h3>
                <p className="ky-benefit-desc">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
      )}

      <style>{`
        .ky-section { --ky-border: rgba(255,255,255,.1); --ky-accent: var(--color-primary); }

        .ky-stage { position: relative; }

        /* gap replaces the old connector elements — the paths are invisible now */
        .ky-flow { display: flex; align-items: stretch; justify-content: center; gap: 72px; }

        .ky-panel {
          flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 16px;
          border: 1px solid var(--ky-border); border-radius: 16px; padding: 26px 24px;
          background: rgba(255,255,255,.02);
        }
        .ky-panel-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.4); margin: 0;
        }

        .ky-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ky-list li {
          font-family: var(--font-google-sans); font-size: 14.5px; color: rgba(255,255,255,.85);
          display: flex; align-items: center; gap: 9px;
        }
        .ky-list li::before {
          content: ""; width: 4px; height: 4px; border-radius: 999px;
          background: var(--ky-accent); flex: none;
        }

        .ky-logos {
          display: flex; flex-wrap: wrap; align-items: center; align-content: center;
          gap: 18px 22px; flex: 1;
        }
        .ky-logos img { display: block; object-fit: contain; opacity: .75; }

        .ky-conductor {
          flex: 0 0 150px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 6px; border-radius: 999px;
          transition: box-shadow .5s ease;
        }
        /* the moment both inputs land */
        .ky-conductor--hit { box-shadow: 0 0 46px 6px rgba(248,70,0,.18); }
        .ky-conductor-label {
          font-family: var(--font-google-sans); font-size: 11.5px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #fff; margin: 0;
        }

        .ky-dots { position: absolute; inset: 0; pointer-events: none; }
        .ky-dot {
          position: absolute; top: 0; left: 0; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
          border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 10px rgba(248,70,0,.85), 0 0 26px rgba(248,70,0,.35);
          will-change: transform;
        }
        .ky-dot--result { width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; }

        /* before the dot lands this is a quiet placeholder, not an empty orange box */
        .ky-result {
          max-width: 520px; margin: 56px auto 0; text-align: center;
          border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 22px 26px;
          background: transparent;
          transition: border-color .5s ease, background-color .5s ease, box-shadow .5s ease;
        }
        .ky-result--lit {
          border-color: rgba(248,70,0,.5);
          background: rgba(248,70,0,.06);
          box-shadow: 0 0 40px rgba(248,70,0,.1);
        }
        .ky-result-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.25); margin: 0 0 10px;
          transition: color .5s ease;
        }
        .ky-result--lit .ky-result-label { color: var(--ky-accent); }
        /* content settles in when the dot lands, rather than being there all along */
        .ky-result-text {
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; margin: 0;
          opacity: 0; transform: translateY(6px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .ky-result--lit .ky-result-text { opacity: 1; transform: none; }

        .ky-benefit {
          display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid var(--ky-border); padding-top: 20px; height: 100%;
        }
        .ky-benefit-title {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: #fff; margin: 0;
        }
        .ky-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.6;
          color: rgba(255,255,255,.55); margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .ky-result-text { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .ky-flow { flex-direction: column; align-items: stretch; gap: 40px; }
          .ky-conductor { flex-basis: auto; padding: 4px 0; }
          .ky-result { margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}
