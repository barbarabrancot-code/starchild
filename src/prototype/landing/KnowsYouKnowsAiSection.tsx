import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "../Container";
import { Presence, frameTransform, type Frame } from "../presence/presence";
import { ScrollPin, usePinFits, usePinnedProgress } from "./ScrollPin";

/**
 * `size` is the rendered height, tuned per mark rather than shared: these logos
 * run from 7:1 (SpaceX) to 1:1 (Z), so one height would make the wide ones
 * enormous and the square one a speck.
 */
type Mark = { name: string; file: string; w: number; h: number; size: number };

// Split across the two rows by width, so neither row is all long wordmarks — the
// rows travel at similar pixel speeds and read as one field rather than two.
const ROW_A: Mark[] = [
  { name: "OpenAI", file: "OpenAI.svg", w: 148, h: 40, size: 24 },
  { name: "SpaceX AI", file: "Spacexai.svg", w: 215, h: 29, size: 19 },
  { name: "Claude", file: "Claude.svg", w: 160, h: 34, size: 24 },
  { name: "Gemini", file: "Frame374.svg", w: 151, h: 34, size: 24 },
  { name: "Kimi", file: "Kimi.svg", w: 118, h: 40, size: 24 },
];

const ROW_B: Mark[] = [
  { name: "DeepSeek", file: "Deepseek.svg", w: 206, h: 33, size: 21 },
  { name: "Qwen", file: "Frame375.svg", w: 137, h: 40, size: 24 },
  { name: "MiniMax", file: "Frame376.svg", w: 177, h: 42, size: 24 },
  // a square badge at the wordmarks' nominal height outweighs them, because their
  // height is mostly air above and below the letterforms and its is all mark
  { name: "Z", file: "Zai.svg", w: 40, h: 40, size: 22 },
];

/** How many times each row's set is laid down. Two would be enough for the loop
 *  itself, but not to fill a wide column — the track has to be at least twice the
 *  window on every viewport or the seam becomes a visible gap. */
const REPEATS = 4;

/** Four pieces of live context — the four things being said about you. No icon
 *  and no pill: the panel opposite is a field of logos, so this side stays as
 *  plain language, which is the contrast the section is built on. */
const YOU_LINES = [
  "what matters to you",
  "how you like to be helped",
  "what you're working through",
  "what you keep coming back to",
];

const BENEFITS = [
  { title: "No model-hopping", desc: "Stop guessing which AI to use." },
  { title: "Better context", desc: "The model gets the information it actually needs." },
  { title: "Less waste", desc: "Starchild can avoid sending unnecessary context to expensive models." },
  { title: "Always adapting", desc: "As models change, you don't have to rebuild your workflow around them." },
];

// scroll windows for each movement
// A short lead-in while each dot surfaces from its own side, then the crossing.
// The lead-in used to be a third of the section because there was a reading to
// watch; with nothing on show it only has to exist, not be sat through.
const READ_START = 0.04, READ_END = 0.20;
const IN_START = 0.24, IN_END = 0.58; // You + Models → Conductor
const OUT_START = 0.66, OUT_END = 0.96; // Conductor → Result

// Where the Conductor changes what it is doing. The gap between ABSORB and
// DECIDE is the pause, and the pause is the part that has to be there: an
// instant reconciliation would read as a lookup, and a lookup is not judgment.
const ABSORB = 0.56, DECIDE = 0.62;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Position along a polyline. Each hop is eased on its own, so the dot settles
 *  at every stop instead of sliding through them at a constant rate — that pause
 *  is the difference between reading something and passing over it. */
function along(points: Point[], t: number): Point {
  const hops = points.length - 1;
  if (hops < 1) return points[0];
  const s = clamp01(t) * hops;
  const i = Math.min(hops - 1, Math.floor(s));
  const f = easeInOut(s - i);
  return {
    x: lerp(points[i].x, points[i + 1].x, f),
    y: lerp(points[i].y, points[i + 1].y, f),
  };
}

/** what the Conductor is doing, which is all the centre dot ever has to say */
type Phase = "waiting" | "absorbing" | "deciding" | "resolving" | "resolved";

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

/**
 * Put a line where it belongs and then hide it behind its own length. Nothing is
 * drawn up front — the only thing that ever reveals a path here is a dot
 * physically walking it.
 */
function layTrail(line: SVGLineElement | null, from: Point, to: Point, drawn: boolean) {
  if (!line) return 0;
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  line.setAttribute("x1", `${from.x}`);
  line.setAttribute("y1", `${from.y}`);
  line.setAttribute("x2", `${to.x}`);
  line.setAttribute("y2", `${to.y}`);
  line.style.strokeDasharray = `${len}`;
  line.style.strokeDashoffset = drawn ? "0" : `${len}`;
  return len;
}

/** Uncover the stretch the dot has already covered, by projecting the dot back
 *  onto its segment. What is behind it stays drawn. */
function trace(line: SVGLineElement | null, len: number, from: Point, to: Point, frame: Frame) {
  if (!line || len <= 0) return;
  const along = (frame.x - from.x) * (to.x - from.x) + (frame.y - from.y) * (to.y - from.y);
  line.style.strokeDashoffset = `${(len * (1 - clamp01(along / (len * len)))).toFixed(2)}`;
}

/**
 * One direction of travel. The set is laid down REPEATS times and the track slides
 * by exactly half its width, which lands it on an identical copy of itself — that
 * is what makes the loop seamless rather than a jump every lap.
 */
function MarqueeRow({ marks, reverse }: { marks: Mark[]; reverse?: boolean }) {
  return (
    <div className="ky-marquee">
      <div className={`ky-track${reverse ? " ky-track--reverse" : ""}`}>
        {Array.from({ length: REPEATS }).flatMap((_, copy) =>
          marks.map((mark) => (
            <img
              key={`${copy}-${mark.file}`}
              className="ky-mark"
              src={`${import.meta.env.BASE_URL}images/carousel/${mark.file}`}
              // only the first pass is named; the rest are the same logos again and
              // a screen reader should not hear the roster four times
              alt={copy === 0 ? mark.name : ""}
              style={{ height: mark.size, width: mark.size * (mark.w / mark.h) }}
            />
          )),
        )}
      </div>
    </div>
  );
}

function Panel({
  label,
  innerRef,
  className = "",
  children,
}: {
  label: string;
  innerRef: React.Ref<HTMLDivElement>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`ky-panel ${className}`} ref={innerRef}>
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

  // The three paths, one per leg of the journey. They exist from the start and
  // are simply invisible until a dot has actually been there.
  const trailsRef = useRef<SVGSVGElement>(null);
  const trailARef = useRef<SVGLineElement>(null);
  const trailBRef = useRef<SVGLineElement>(null);
  const trailCRef = useRef<SVGLineElement>(null);
  const lengths = useRef({ a: 0, b: 0, c: 0 });

  // The two in-panel routes, and the things standing along them. Both are
  // measured, not authored: the lines and the logos are laid out by CSS, and the
  // dot goes wherever they ended up.
  // Both sides work the same way: the dot comes out of the middle of whatever the
  // input is and leaves. Neither side is toured or lit on the way — the chips and
  // the marks hold one state and stay in it.
  const chipsRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const routes = useRef<{ a: Point[]; b: Point[] }>({ a: [], b: [] });

  // dot A (from You), dot B (from Models), dot C (the single result). Each is a
  // body with its own weight rather than a value being tweened along a line: the
  // scroll says where they are wanted, they decide how they get there.
  const dotARef = useRef<HTMLSpanElement>(null);
  const dotBRef = useRef<HTMLSpanElement>(null);
  const dotCRef = useRef<HTMLSpanElement>(null);
  const bodies = useRef<{ a: Presence; b: Presence; c: Presence } | null>(null);
  /** latest scroll position, read by the frame loop rather than acted on directly */
  const progress = useRef(0);

  const [phase, setPhase] = useState<Phase>("waiting");
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

      const anchor: Anchors = {
        conductor,
        you: edgeToward(boxIn(you, s, scale), conductor),
        models: edgeToward(boxIn(models, s, scale), conductor),
        result: { x: r.left + r.width / 2, y: r.top },
      };
      anchors.current = anchor;

      // Where each dot surfaces: the middle of its own input. Nothing is toured on
      // the way out — the run to the Conductor is the only thing on show.
      const origin = (el: Element | null): Point[] => {
        if (!el) return [];
        const b = boxIn(el, s, scale);
        return [{ x: b.left + b.width / 2, y: b.top + b.height / 2 }];
      };

      // Each route ends where its trail begins, so the crossing picks up exactly
      // where the dot surfaced.
      routes.current = {
        a: [...origin(chipsRef.current), anchor.you],
        b: [...origin(fieldRef.current), anchor.models],
      };

      // The pane may be scaled down to fit a short viewport, and the anchors are
      // in unscaled pixels — so the SVG takes that same unscaled box as its
      // viewBox and the two coordinate systems stay the same one.
      const svg = trailsRef.current;
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);
        // reduced motion has no dots to draw the paths, so the paths are just there
        const still = reducedMq.matches;
        lengths.current = {
          a: layTrail(trailARef.current, anchor.you, anchor.conductor, still),
          b: layTrail(trailBRef.current, anchor.models, anchor.conductor, still),
          c: layTrail(trailCRef.current, anchor.conductor, anchor.result, still),
        };
      }
    };

    measure();
    window.addEventListener("resize", measure);
    // The stage changes shape without the window doing so — fonts landing, the
    // pinned pane rescaling. A trail laid out against the old geometry would
    // visibly miss both of its endpoints, so re-lay it whenever the stage moves.
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      reducedMq.removeEventListener("change", syncMode);
    };
  }, []);

  // the stage moves when pinning switches on or off, so the anchors have to be
  // re-read before the next dot position is computed
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pinned]);

  // The frame loop. Scroll is the clock, but it is not the animation: every frame
  // it works out where each dot is *wanted* and hands that to the body, which
  // arrives in its own time. That gap — aim here, body still back there — is the
  // whole reason the two dots read as travelling rather than as being drawn.
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    // The two arriving dots are deliberately the same body with the same seed:
    // decorrelating them, which is usually the right instinct, is exactly what
    // breaks the mirror here. The result dot keeps its own.
    bodies.current ??= {
      a: new Presence({ temperament: "attentive", seed: 0.21, breath: 0 }),
      b: new Presence({ temperament: "attentive", seed: 0.21, breath: 0 }),
      c: new Presence({ temperament: "attentive", seed: 0.44, breath: 0 }),
    };
    const { a: bodyA, b: bodyB, c: bodyC } = bodies.current;

    let frame = 0;
    let placed = false;
    let running = false;

    const tick = (now: number) => {
      const anchor = anchors.current;
      if (!anchor) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const p = progress.current;
      // Each dot has two lives. First it works its own side — down the lines, around
      // the field — and only then does it set off. The reading is what makes the
      // crossing afterwards read as a conclusion rather than as an animation.
      const readT = clamp01((p - READ_START) / (READ_END - READ_START));
      // One value for both crossings. Your context and the pool of models weigh the
      // same, so they leave together, travel together and land together — any
      // stagger makes one of the two look like the one that actually mattered.
      const inward = easeInOut(clamp01((p - IN_START) / (IN_END - IN_START)));
      const out = easeInOut(clamp01((p - OUT_START) / (OUT_END - OUT_START)));

      const restA = along(routes.current.a, readT);
      const restB = along(routes.current.b, readT);

      const aimAx = lerp(restA.x, anchor.conductor.x, inward);
      const aimAy = lerp(restA.y, anchor.conductor.y, inward);
      const aimBx = lerp(restB.x, anchor.conductor.x, inward);
      const aimBy = lerp(restB.y, anchor.conductor.y, inward);
      const aimCx = lerp(anchor.conductor.x, anchor.result.x, out);
      const aimCy = lerp(anchor.conductor.y, anchor.result.y, out);

      // first frame with real anchors: start on the aim, not at the origin
      if (!placed) {
        placed = true;
        bodyA.place(aimAx, aimAy);
        bodyB.place(aimBx, aimBy);
        bodyC.place(aimCx, aimCy);
      }

      bodyA.aim(aimAx, aimAy, now);
      bodyB.aim(aimBx, aimBy, now);
      bodyC.aim(aimCx, aimCy, now);

      // Born at the edge of its own panel, gone as it lands inside the Conductor.
      // Nothing is visible while the reading happens: inside the cards the dot is
      // just a cursor tracking over content, and the content brightening on its own
      // says the same thing more quietly. It only becomes a body once it carries
      // something across the gap.
      const fadeOut = inward > 0.94 ? (1 - inward) / 0.06 : 1;
      const arrivingOp = inward <= 0 ? 0 : Math.min(1, inward / 0.05) * fadeOut;
      const resultOp = out <= 0 ? 0 : out > 0.93 ? (1 - out) / 0.07 : Math.min(1, out / 0.08);

      // one step per body per frame: the frame is both where the dot is and how
      // much of its line has been earned
      const frameA = bodyA.step(now);
      const frameB = bodyB.step(now);
      const frameC = bodyC.step(now);

      const write = (el: HTMLSpanElement | null, frame: Frame, opacity: number) => {
        if (!el) return;
        el.style.transform = frameTransform(frame);
        el.style.opacity = `${clamp01(opacity)}`;
      };
      write(dotARef.current, frameA, arrivingOp);
      write(dotBRef.current, frameB, arrivingOp);
      write(dotCRef.current, frameC, resultOp);


      // Traced from the dot's own position rather than from the scroll, so a path
      // can never run ahead of the thing supposedly making it.
      trace(trailARef.current, lengths.current.a, anchor.you, anchor.conductor, frameA);
      trace(trailBRef.current, lengths.current.b, anchor.models, anchor.conductor, frameB);
      trace(trailCRef.current, lengths.current.c, anchor.conductor, anchor.result, frameC);

      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // nothing runs while the diagram is off screen
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()), {
      threshold: 0,
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduced]);

  const applyProgress = (p: number) => {
    progress.current = p;

    const out = clamp01((p - OUT_START) / (OUT_END - OUT_START));

    // The Conductor's own state. It notices the arrival, takes a moment over it,
    // and only then resolves — the moment it is doing all of this is the point of
    // the section, so it gets its own phase rather than a single "merged" flag.
    setPhase(
      out > 0.88 ? "resolved"
        : out > 0 ? "resolving"
        : p >= DECIDE ? "deciding"
        : p >= ABSORB ? "absorbing"
        : "waiting",
    );
    setDelivered(out > 0.88);
  };

  // pinned: progress comes from the track itself, same as the showcase sections
  usePinnedProgress(trackRef, pinned, applyProgress);
  useMotionValueEvent(flowProgress, "change", (p) => {
    if (!pinned) applyProgress(p);
  });

  // reduced motion: skip the choreography, show the end state
  const showResult = reduced || delivered;

  return (
    <section className="ky-section bg-[#0a0a0a] py-[var(--section-pad)]">
      {/* While pinned, the track supplies the scroll distance and the pane inside it
          holds the headline and the diagram still until the choreography finishes. */}
      <ScrollPin trackRef={trackRef} pinned={pinned} screens={2.1}>
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
              className="mt-5 text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]"
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
                <Panel label="You" innerRef={youRef} className="ky-panel--you">
                  <div className="ky-lines" ref={chipsRef}>
                    {YOU_LINES.map((line) => (
                      <p key={line} className="ky-line">{line}</p>
                    ))}
                  </div>
                </Panel>

                {/* One dot, and nothing drawn around it. It waits, takes both
                    arrivals in at once, loses its balance over them for a moment,
                    and only then resolves — that beat is what separates deciding
                    from looking something up. */}
                <div className="ky-conductor" data-phase={reduced ? "resolved" : phase} ref={conductorRef}>
                  <p className="ky-conductor-label">Conductor</p>
                  <span className="ky-aura" aria-hidden="true" />
                  <span className="ky-core" aria-hidden="true" />
                </div>

                <Panel label="Available models" innerRef={modelsRef} className="ky-panel--models">
                  <div className="ky-marquees" ref={fieldRef}>
                    <MarqueeRow marks={ROW_A} />
                    <MarqueeRow marks={ROW_B} reverse />
                  </div>
                </Panel>
              </div>

              <div className={`ky-result${showResult ? " ky-result--lit" : ""}`} ref={resultRef}>
                <p className="ky-result-label">Result</p>
                <p className="ky-result-text">
                  One answer, routed to the right model.
                </p>
              </div>

              {/* The paths. Same three journeys the dots make, revealed only in
                  their wake — see trace() above. */}
              <svg className="ky-trails" ref={trailsRef} aria-hidden="true">
                <line ref={trailARef} className="ky-trail" />
                <line ref={trailBRef} className="ky-trail" />
                <line ref={trailCRef} className="ky-trail" />
              </svg>

              {/* Travelling dots. No rails, no arrows, no trails — just the dot
                  crossing the gap. Their transforms are written by the frame loop
                  above, which is why there is no motion value on them. */}
              {!reduced && (
                <div className="ky-dots" aria-hidden="true">
                  <span ref={dotARef} className="ky-dot" />
                  <span ref={dotBRef} className="ky-dot" />
                  <span ref={dotCRef} className="ky-dot ky-dot--result" />
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
        .ky-section { --ky-border: rgba(255,255,255,.08); --ky-accent: var(--color-primary); }

        .ky-stage { position: relative; }

        /* Wide enough that the dot stands in open space rather than being pinched
           between two rounded corners. The gap is the path — nothing is drawn in
           it until a dot has been through. */
        .ky-flow {
          display: flex; align-items: stretch; justify-content: center;
          gap: clamp(48px, 5.5vw, 104px);
        }

        /* Outlines, not plates. A fill here is lighter than the page, which turns
           the gap between the two panels into a dark rounded shape framing the
           centre — the one thing the centre must not have. */
        .ky-panel--you, .ky-panel--models { flex: 1 1 0; }

        .ky-panel {
          min-width: 0; display: flex; flex-direction: column; gap: 26px;
          border: 1px solid var(--ky-border); border-radius: 18px; padding: 30px 30px 32px;
          background: transparent;
        }
        .ky-panel-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.42); margin: 0;
        }


        /* Flush left and hugging their own text, so the column reads as four
           separate things rather than as a block of copy. */
        /* Without the pill the lines can sit closer — the gap was spacing borders
           apart, not text. Colour and tracking come from the page's body tokens
           so this reads as the same voice as the rest of the site. */
        .ky-lines { display: flex; flex-direction: column; align-items: flex-start; gap: 13px; }
        .ky-line {
          margin: 0;
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.4;
          letter-spacing: var(--tracking-body);
          color: var(--color-text-body);
        }

        .ky-marquees {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          gap: 34px;
        }

        /* The mask is what turns a strip into a window: the marks do not stop at an
           edge, they thin out and are gone, so what is off screen reads as more of
           the same rather than as the end of a list. */
        .ky-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%);
        }

        .ky-track { display: flex; width: max-content; will-change: transform; }

        /* Two rows, opposite ways, and deliberately not the same duration: matched
           speeds make the pair read as one mechanism running backwards against
           itself. Different ones read as a field with things moving in it. */
        .ky-track { animation: ky-slide 46s linear infinite; }
        .ky-track--reverse { animation-duration: 36s; animation-direction: reverse; }

        /* Half the track is exactly one set, so this lands on an identical copy. */
        @keyframes ky-slide {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        /* The spacing lives on the item, not as a flex gap on the track. With a gap
           the two halves of the loop are not the same width — there is one extra
           gap where they join — and translating by exactly -50% would slip a few
           pixels every lap until the seam showed. */
        .ky-mark {
          flex: none; display: block; object-fit: contain;
          margin-right: 68px;
          /* The wordmarks ship at #AEB4BC with white details, so brightening them
             only ever gets to a pale grey. Crushing to black first and inverting
             takes every opaque pixel to pure white and leaves the alpha alone —
             then opacity, not colour, is what sets how present they are. */
          filter: brightness(0) invert(1);
          opacity: .8; transition: opacity .35s ease;
        }
        @media (hover: hover) { .ky-mark:hover { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .ky-track { animation: none; }
        }

        /* No plate, no ring, no label. Anything drawn around it turns it back
           into an icon, and this is meant to be the one live thing on the page. */
        /* The one mass on the stage. Big enough that the arriving dots read as
           being taken into something, rather than as three dots meeting. */
        .ky-conductor {
          /* above the travelling dots, so they slide under it instead of crossing it:
             at this size the small dot would otherwise track orange-on-orange right
             across the face of the big one. Occluded, it reads as taken in. */
          position: relative; z-index: 3;
          flex: 0 0 clamp(128px, 12vw, 176px);
          display: flex; align-items: center; justify-content: center;
        }

        /* Above the dot, and out of the flow. In the flow it would push the dot
           off the row's centre line, and the two horizontal paths are drawn to
           wherever the dot is — the whole diagram would sit crooked. */
        .ky-conductor-label {
          position: absolute; left: 50%; bottom: calc(50% + 58px); z-index: 1;
          transform: translateX(-50%); white-space: nowrap;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ky-accent); margin: 0;
        }

        /* What the Conductor gives off once it has an answer — not the dot's
           shadow. Its own element, so it can open on a slower curve than the core
           scales on, and so the falloff is a real gradient rather than a blur. */
        .ky-aura {
          position: absolute; left: 50%; top: 50%;
          width: 52px; height: 52px; margin: -26px 0 0 -26px;
          border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle,
            rgba(248,70,0,.65) 0%,
            rgba(248,70,0,.34) 26%,
            rgba(248,70,0,.13) 46%,
            rgba(248,70,0,.03) 62%,
            rgba(248,70,0,0) 75%);
          opacity: 0; transform: scale(1);
          transition: opacity .9s ease, transform 1.1s cubic-bezier(.16,1,.3,1);
        }

        .ky-core {
          width: 52px; height: 52px; border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 30px rgba(248,70,0,.34);
          transition: transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s ease;
        }
        /* present, but not yet doing anything */
        .ky-conductor[data-phase="waiting"] .ky-core {
          transform: scale(.84); box-shadow: 0 0 20px rgba(248,70,0,.22);
        }
        /* both inputs land: a little bigger, a little brighter. At this size the
           percentages have to come down — the same 1.24 that read as a breath on
           a 20px dot reads as a button being pressed on this one. */
        .ky-conductor[data-phase="absorbing"] .ky-core {
          transform: scale(1.14); box-shadow: 0 0 34px rgba(248,70,0,.42);
        }
        .ky-conductor[data-phase="deciding"] .ky-core {
          transform: scale(1.07); box-shadow: 0 0 30px rgba(248,70,0,.4);
        }
        .ky-conductor[data-phase="resolving"] .ky-core {
          transform: scale(1.06); box-shadow: 0 0 30px rgba(248,70,0,.4);
        }
        /* Where it stays. The answer is out, and the Conductor does not go back to
           being a small quiet dot — it holds bigger, and the spread moves off the
           core's box-shadow onto the aura, which is the thing doing the emitting. */
        .ky-conductor[data-phase="resolved"] .ky-core {
          transform: scale(1.18); box-shadow: 0 0 20px rgba(248,70,0,.5);
        }

        /* opening as the decision forms, wide open once it has landed */
        .ky-conductor[data-phase="absorbing"] .ky-aura { opacity: .45; transform: scale(1.9); }
        .ky-conductor[data-phase="deciding"] .ky-aura { opacity: .55; transform: scale(2.1); }
        .ky-conductor[data-phase="resolving"] .ky-aura { opacity: .8; transform: scale(2.5); }
        .ky-conductor[data-phase="resolved"] .ky-aura { opacity: 1; transform: scale(2.8); }

        /* The absorption, on the Conductor itself rather than on its dot: it is
           knocked very slightly off centre as the two land, and recovers. One
           shot, a few pixels — any more and it stops reading as composure. */
        .ky-conductor[data-phase="absorbing"] { animation: ky-absorb .78s cubic-bezier(.34,.7,.28,1); }
        @keyframes ky-absorb {
          0% { transform: translate3d(0,0,0); }
          26% { transform: translate3d(-2.5px, 1.5px, 0); }
          58% { transform: translate3d(1.5px, -1px, 0); }
          100% { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ky-conductor[data-phase="absorbing"] { animation: none; }
        }
        /* The path, only ever behind the dot that made it: one hairline, no dashes
           and no arrowheads. layTrail() hides it, trace() gives it back. */
        .ky-trails {
          position: absolute; inset: 0; width: 100%; height: 100%;
          overflow: visible; pointer-events: none;
        }
        .ky-trail { fill: none; stroke: rgba(248,70,0,.4); stroke-width: 1; stroke-linecap: round; }

        .ky-dots { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .ky-dot {
          position: absolute; top: 0; left: 0; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
          border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 10px rgba(248,70,0,.85), 0 0 26px rgba(248,70,0,.35);
          /* the loop owns both of these from its first frame on */
          opacity: 0; will-change: transform, opacity;
        }
        .ky-dot--result { width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; }

        /* before the dot lands this is a quiet placeholder, not an empty orange box */
        .ky-result {
          position: relative; z-index: 1;
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
          color: var(--color-text-body); margin: 0;
          opacity: 0; transform: translateY(6px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .ky-result--lit .ky-result-text { opacity: 1; transform: none; }

        .ky-benefit {
          display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid var(--ky-border); padding-top: 20px; height: 100%;
        }
        .ky-benefit-title {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: var(--color-text-body); margin: 0;
        }
        .ky-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.6;
          color: var(--color-text-body); margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .ky-result-text { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .ky-flow { flex-direction: column; align-items: stretch; gap: 56px; }
          /* stacked, the label has no row height to hang in — the slot has to
             carry both it and the dot itself */
          .ky-conductor { flex-basis: auto; min-height: 152px; }
          .ky-result { margin-top: 56px; }
        }
      `}</style>
    </section>
  );
}
