import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Scenario } from "./data";
import { Deliverable } from "./Deliverable";
import { CheckIcon } from "./icons";
import { usePresenceDot, useDriftAim, usePrefersReducedMotion } from "./presence/usePresence";
import type { Temperament } from "./presence/presence";

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

const MODEL_ICON_SRC: Record<string, string> = {
  gemini: `${ICON_BASE}gemini.svg`,
  openai: `${ICON_BASE}openai.svg`,
  xai: `${ICON_BASE}xai.svg`,
  deepseek: `${ICON_BASE}deepseek.svg`,
  "ai-generic": `${ICON_BASE}ai-generic.svg`,
};

/**
 * Conductor Mode running, as the dot sees it. The step titles say what is
 * happening in words; this says it in behaviour, and it is the same behaviour the
 * dot has everywhere else in the product.
 *
 * Which beat a step gets comes from where it sits in the run, because every
 * scenario is written in the same three movements: pick who should do this,
 * gather what they need, check the result before handing it over.
 */
type StepPhase = "choosing" | "gathering" | "checking" | "delivering";

const STEP_TEMPERAMENT: Record<StepPhase, Temperament> = {
  choosing: "curious",
  gathering: "attentive",
  checking: "unsettled",
  delivering: "composed",
};

/** choosing looks along the row of models it is about to name; the rest hold still */
const STEP_LEAN: Record<StepPhase, [number, number]> = {
  choosing: [2.4, 0],
  gathering: [0, 0],
  checking: [0, 0],
  delivering: [0, 0],
};

const STEP_BEAT: Record<StepPhase, string> = {
  choosing: "sd-attend .42s cubic-bezier(.16,1,.3,1)",
  gathering: "sd-acknowledge .52s cubic-bezier(.34,.8,.3,1)", // pulling inward
  checking: "sd-consider .72s cubic-bezier(.4,0,.2,1)", // hesitating, rebalancing
  delivering: "sd-recompose .62s cubic-bezier(.16,1,.3,1)",
};

function StepPresence({ phase }: { phase: StepPhase }) {
  const reduced = usePrefersReducedMotion();
  const beatRef = useRef<HTMLSpanElement>(null);

  const { ref, controller } = usePresenceDot<HTMLSpanElement>({
    temperament: STEP_TEMPERAMENT[phase],
    breath: 0.02,
  });

  useEffect(() => {
    if (phase === "checking") return;
    const [x, y] = STEP_LEAN[phase];
    controller.aim(x, y);
  }, [controller, phase]);

  useDriftAim(controller, phase === "checking", 1.6, reduced);

  useEffect(() => {
    const el = beatRef.current;
    if (!el || reduced) return;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = STEP_BEAT[phase];
  }, [phase, reduced]);

  return (
    <span ref={beatRef} className="sd-beat">
      <span
        ref={ref}
        aria-hidden="true"
        className="sd-core"
        style={{ width: 6, height: 6, boxShadow: "0 0 8px rgba(248,70,0,.7)" }}
      />
    </span>
  );
}

/**
 * The run, as three things worth understanding rather than as a task log.
 *
 * The first two are what Conductor Mode does; the third is what that got you, which
 * is why it is a state in the flow and not a statistic parked underneath it. A
 * saving printed below the timeline reads as a boast about the product. Printed as
 * the last thing the process arrives at, it reads as the consequence of the two
 * steps above it — which is the whole argument.
 *
 * Titles only. A sentence under each one explained the same three things twice over
 * — once here and again in the tooltips — and the component is read at a glance,
 * beside an answer someone actually came for. The explanation is one hover away;
 * the run itself only has to be scannable.
 */
const FLOW: { title: string; phase: StepPhase }[] = [
  { title: "Choosing the right model", phase: "choosing" },
  { title: "Using only what it needs", phase: "gathering" },
];

/** what the progress line is measured against */
const TOTAL_STATES = FLOW.length;

export function StepFlow({
  scenario,
  onStep,
  onDone,
  children,
}: {
  scenario: Scenario;
  onStep?: () => void;
  onDone?: () => void;
  /** The written answer, rendered inside this component rather than after it, so
   *  the run and the answer it produced stay one block on the page. */
  children?: React.ReactNode;
}) {
  const { models, deliverable } = scenario;
  const [visible, setVisible] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    setVisible(0);
    setShowFinal(false);
  }, [scenario]);

  useEffect(() => {
    onStep?.();
    if (visible >= FLOW.length) {
      const t = setTimeout(() => {
        setShowFinal(true);
        onDone?.();
      }, 700);
      return () => clearTimeout(t);
    }
    // longer than it was: each state now carries a sentence, and a state that
    // leaves before it can be read is decoration
    const t = setTimeout(() => setVisible((v) => v + 1), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const progressPct = showFinal ? 100 : (Math.min(visible, FLOW.length) / TOTAL_STATES) * 100;

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col gap-3 py-1 pl-1">
        <div className="absolute top-1 bottom-1 left-[7px] w-px bg-white/12" aria-hidden="true">
          <motion.div
            className="w-px bg-[#f84600]"
            initial={{ height: 0 }}
            animate={{ height: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Each state says what is happening and, underneath, why it matters. No
            numbering: three rows on a progress line are already ordered, and "Step 1"
            would be the component describing itself instead of the work. */}
        {FLOW.slice(0, visible).map((state, i) => {
          const isActive = i === visible - 1 && !showFinal;
          return (
            <motion.div
              key={state.title}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start gap-4"
            >
              <span
                className={`relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full ${
                  isActive ? "border-2 border-[#f84600] bg-[#0a0a0a]" : "bg-[#0a0a0a]"
                }`}
              >
                {isActive ? (
                  // was a pulse on a loop, which said only "busy". This is the
                  // presence doing the actual step, and it stops when the step does.
                  <StepPresence phase={state.phase} />
                ) : (
                  <CheckIcon className="size-3.5 text-[#f84600]" />
                )}
              </span>
              <div className="flex-1">
                <p
                  className={`text-[16px] font-medium ${isActive ? "text-white" : "text-white/55"}`}
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {state.title}
                </p>

                {i === 0 && isActive && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {models.map((m) => (
                      <span
                        key={m.name}
                        className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5"
                      >
                        <img src={MODEL_ICON_SRC[m.icon]} alt="" className="size-3.5 object-contain" />
                        <span
                          className="text-[11.5px] font-medium text-white/80"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          {m.name}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        </div>

      {showFinal && deliverable.kind !== "none" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <Deliverable deliverable={deliverable} />
        </motion.div>
      )}

      {children}
    </div>
  );
}
