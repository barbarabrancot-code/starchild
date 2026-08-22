import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Scenario } from "./data";
import { Deliverable } from "./Deliverable";
import { CheckIcon, InfoIcon } from "./icons";
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

// Two things on this run need explaining to someone meeting them for the first
// time, and both explanations are the same shape: a question, then a plain answer.
// Plain is the whole point — "routing system" is as technical as either is allowed
// to get, and each ends on the consequence rather than on the mechanism.
const CONDUCTOR_INFO = {
  title: "What is Conductor Mode?",
  body:
    "Conductor Mode chooses the best AI for each part of the task and uses only the context it needs.",
};

// One icon on that line, not two. The result needs explaining and so does the word
// "tokens", but a second ⓘ beside the first is clutter on the very line the section
// is trying to make readable — so the definition rides along as a footnote.
const SAVED_INFO = {
  title: "What does this mean?",
  body:
    "Conductor Mode avoided unnecessary token usage by choosing the right model and using only the " +
    "context this task needed.",
  note: "Tokens are the units AI uses to process text — fewer usually means less waste and lower cost.",
};

function InfoBody({ title, body, note }: { title: string; body: string; note?: string }) {
  return (
    <>
      <p
        className="text-[13.5px] font-medium text-white/90"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        {title}
      </p>
      <p
        className="mt-1.5 text-[12.5px] leading-[1.55] text-white/45"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        {body}
      </p>
      {note && (
        <p
          className="mt-2.5 border-t border-white/[0.07] pt-2.5 text-[11.5px] leading-[1.5] text-white/30"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {note}
        </p>
      )}
    </>
  );
}

/**
 * The ⓘ beside a term. On a mouse it is a tooltip on hover; on touch, where there
 * is no hover to speak of, the same words arrive as a dialog you dismiss. Two
 * presentations, one piece of content — an explanation that only exists on one
 * kind of device is not an explanation.
 *
 * `drop` is not styling: a tip at the top of the run has to open downward and one
 * at the bottom upward, or it opens straight off the edge of the conversation.
 */
function InfoTip({
  title,
  body,
  note,
  drop = "down",
}: {
  title: string;
  body: string;
  note?: string;
  drop?: "down" | "up";
}) {
  const [open, setOpen] = useState(false);
  const [fine, setFine] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // the small delay is what lets the pointer cross the gap into the panel
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onPointerEnter={fine ? openNow : undefined}
        onPointerLeave={fine ? closeSoon : undefined}
        onFocus={fine ? openNow : undefined}
        onBlur={fine ? closeSoon : undefined}
        aria-expanded={open}
        aria-label={title}
        className="rounded-full p-0.5 text-[#f84600]/55 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70"
      >
        <InfoIcon className="size-4" />
      </button>

      {open &&
        (fine ? (
          <motion.div
            initial={{ opacity: 0, y: drop === "down" ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={openNow}
            onPointerLeave={closeSoon}
            role="tooltip"
            className={`absolute left-0 z-40 w-[min(320px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-4 text-left shadow-2xl ${
              drop === "down" ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"
            }`}
          >
            <InfoBody title={title} body={body} note={note} />
          </motion.div>
        ) : (
          <InfoDialog title={title} body={body} note={note} onClose={() => setOpen(false)} />
        ))}
    </span>
  );
}

function InfoDialog({
  title,
  body,
  note,
  onClose,
}: {
  title: string;
  body: string;
  note?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[320px] rounded-2xl border border-white/10 bg-[#111112] p-5 text-left shadow-2xl"
      >
        <InfoBody title={title} body={body} note={note} />

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

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
  showSavings = false,
  children,
}: {
  scenario: Scenario;
  onStep?: () => void;
  onDone?: () => void;
  /** Guest Mode only: what Conductor Mode saved is an argument for signing up, and
   *  an account holder has already been made it. */
  showSavings?: boolean;
  /** The written answer, rendered inside this component rather than after it. A
   *  sticky element only holds within its own container, so for the Conductor Mode
   *  header to survive the scroll down through the response, the response has to be
   *  in the same box. That is the whole reason this prop exists. */
  children?: React.ReactNode;
}) {
  const { models, deliverable, stat } = scenario;
  const saved = stat.withoutTokens - stat.withTokens;
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
      {/* Sticky, and the ⓘ is the reason. Left at the top of a long answer, the
          explanation scrolls away exactly when someone starts wondering what they
          are looking at; held here it stays one hover away for as long as the
          response is on screen. The background is opaque on purpose — the run
          scrolls under it, and a translucent bar would show the timeline through
          the name. */}
      <div className="sticky top-0 z-20 -mx-1 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 bg-[#0a0a0a] px-1 pt-1 pb-3">
        <span className="flex items-center gap-1.5">
          <p
            className="text-[17px] font-semibold text-white"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Conductor Mode
          </p>
          <InfoTip {...CONDUCTOR_INFO} />
        </span>

        {/* The outcome rides in the header rather than closing the timeline. It is
            the one line worth still having on screen three paragraphs into the
            answer, and down in the run it would scroll away with everything else —
            which is the same reason the name is up here. */}
        {showFinal && showSavings && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1.5"
          >
            <p
              className="text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Saved{" "}
              {/* the one number on the screen, so it is allowed to be the one thing
                  in the accent. Pinned to en-US: the UI is English, and a pt-BR
                  browser would otherwise render 9,100 as "9.100". */}
              <span className="text-[19px] font-semibold text-[#f84600] tabular-nums">
                {saved.toLocaleString("en-US")}
              </span>{" "}
              tokens
            </p>
            <InfoTip {...SAVED_INFO} />
          </motion.span>
        )}
      </div>

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
