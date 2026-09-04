import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Scenario } from "./data";
import { Deliverable } from "./Deliverable";
import { ThinkingLine } from "./ThinkingLine";

/**
 * What happens between pressing send and getting an answer.
 *
 * Two things, in this order. First a sentence — Starchild saying it has the
 * request and what it is about to do — which arrives almost instantly and stays,
 * because it is a turn in the conversation rather than a loading state. Then one
 * grey line under it, saying what is happening now, which leaves when the answer
 * arrives.
 *
 * What used to be here was the working: a rail, a tick per stage, the models being
 * chosen between, a log of what each step had done. All of it true, and all of it
 * asking someone to read a process while they waited. The process still runs; it
 * just isn't the thing on screen.
 */

type Run = {
  /** the sentence, said once — specific to what was asked, and never eager */
  ack: string;
  /** what it is doing, in the words someone would use about their own task */
  stages: string[];
};

/**
 * Written per scenario because a generic acknowledgement is worse than none: "I'll
 * take a look" after a specific request reads as a machine that did not read it.
 * The stages say what is happening to the person's thing, not what the system is
 * doing to itself — no model names, no tool names, no routing.
 */
const RUNS: Record<string, Run> = {
  image: {
    ack: "Got it — I'll work up a poster and show you where I land.",
    stages: ["Reading what you're after…", "Working up the artwork…", "Putting it together…"],
  },
  design: {
    ack: "Sure — I'll pull a name, a look and a palette together for it.",
    stages: ["Getting a feel for it…", "Trying a few directions…", "Putting it together…"],
  },
  trading: {
    ack: "Okay — let me see what the market's doing and pull out what matters.",
    stages: ["Checking the numbers…", "Comparing against last week…", "Putting the answer together…"],
  },
  code: {
    ack: "I'll read through this and work out what's going wrong.",
    stages: ["Reading through it…", "Tracing where it breaks…", "Putting the answer together…"],
  },
};

const FALLBACK: Run = {
  ack: "I'll take a look and work through this for you.",
  stages: ["Looking through it…", "Pulling out what matters…", "Putting the answer together…"],
};

/** near enough to instant that the interface feels like it heard you */
const ACK_AT = 180;
/** the sentence gets read before anything else moves */
const THINK_AT = 820;
/** how long each stage holds — long enough to read, short enough not to be a wait */
const STAGE_MS = 1150;
/** the beat between the last stage and the answer */
const SETTLE_MS = 600;

export function StepFlow({
  scenario,
  restored = false,
  onStep,
  onDone,
  children,
}: {
  scenario: Scenario;
  /** Reopened from history. The run already happened, so replaying it would say
   *  the work is being done now — the answer is simply there. */
  restored?: boolean;
  onStep?: () => void;
  onDone?: () => void;
  /** The written answer, rendered inside this component rather than after it, so
   *  the run and the answer it produced stay one block on the page. */
  children?: React.ReactNode;
}) {
  const { deliverable } = scenario;
  const run = RUNS[scenario.id] ?? FALLBACK;

  const [acked, setAcked] = useState(restored);
  /** -1 until the status line starts */
  const [stage, setStage] = useState(-1);
  const [done, setDone] = useState(restored);

  useEffect(() => {
    if (restored) {
      setAcked(true);
      setDone(true);
      onDone?.();
      return;
    }

    setAcked(false);
    setStage(-1);
    setDone(false);

    const timers = [
      window.setTimeout(() => setAcked(true), ACK_AT),
      ...run.stages.map((_, i) =>
        window.setTimeout(() => setStage(i), THINK_AT + i * STAGE_MS),
      ),
      window.setTimeout(() => {
        setDone(true);
        onDone?.();
      }, THINK_AT + run.stages.length * STAGE_MS + SETTLE_MS),
    ];

    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, restored]);

  // keep the conversation pinned to the bottom as each piece lands
  useEffect(() => {
    onStep?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acked, stage, done]);

  return (
    <div className="flex flex-col gap-4">
      {/* Said once, and it stays: this is Starchild's first line of the reply, not
          a placeholder that the answer replaces. */}
      <AnimatePresence>
        {acked && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] leading-[1.6] text-white/80"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {run.ack}
          </motion.p>
        )}
      </AnimatePresence>

      {/* `mode="wait"` so the line is gone before the answer starts arriving —
          overlapping them would read as two things happening at once, when what
          actually happened is that one became the other. */}
      <AnimatePresence mode="wait">
        {stage >= 0 && !done && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <ThinkingLine label={run.stages[Math.min(stage, run.stages.length - 1)]} />
          </motion.div>
        )}
      </AnimatePresence>

      {done && deliverable.kind !== "none" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-1"
        >
          <Deliverable deliverable={deliverable} />
        </motion.div>
      )}

      {children}
    </div>
  );
}
