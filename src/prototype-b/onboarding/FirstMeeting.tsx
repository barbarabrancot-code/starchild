import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PresenceOrb, type OrbState } from "../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../presence/usePresence";

export type Tone = "direct" | "space";

export type MeetingResult = {
  topic?: string;
  tone?: Tone;
  opening?: string;
};

type Step = "guided" | "preference";
type Question = { id: string; text: string; stage: number };
type Topic = { echo?: string; said?: string };

const STAGES = 2;
const ATTENTION: { label: string; echo: string }[] = [
  { label: "Work", echo: "work" },
  { label: "Something I'm building", echo: "something you're building" },
  { label: "A decision", echo: "a decision you're weighing" },
  { label: "Too much on my plate", echo: "how much is on your plate" },
  { label: "Something personal", echo: "something personal" },
];
const UNSURE = "I'm not sure yet";
const GUIDED_LINE = "What's taking up most of your attention lately?";
const PREFERENCE_LINE =
  "One thing that helps me work better with you: do you want me to be more direct, or give you more room to think things through?";

function openingFor(topic?: Topic) {
  if (!topic) return "So - what's the first thing you'd like to put in front of me?";
  return `Got it. Let's start there. What would have to happen this week for ${topic.echo ?? "that"} to feel handled?`;
}

let questionId = 0;
const question = (text: string, stage: number): Question => ({ id: `q${questionId++}`, text, stage });

/**
 * The first meeting is deliberately ephemeral. A choice is retained as context,
 * but never displayed as a transcript: question two replaces question one, then
 * the completed meeting gives way to the opening conversation.
 */
export function useFirstMeeting({ onDone }: { onDone: (result: MeetingResult) => void }) {
  const [step, setStep] = useState<Step>("guided");
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => question(GUIDED_LINE, 0));
  const [topic, setTopic] = useState<Topic>();
  const [thinking, setThinking] = useState(false);
  const timers = useRef<number[]>([]);
  const reduced = usePrefersReducedMotion();
  const considerMs = reduced ? 160 : 760;

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const consider = (next: () => void) => {
    timers.current.push(window.setTimeout(next, considerMs));
  };

  const askPreference = () => {
    setCurrentQuestion(question(PREFERENCE_LINE, 1));
    setStep("preference");
    setThinking(false);
  };

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTopic({ said: trimmed.replace(/.$/, "") });
    setThinking(true);
    consider(askPreference);
  };

  const choose = (label: string) => {
    if (step === "guided") {
      const selected = label === UNSURE ? undefined : { echo: ATTENTION.find((option) => option.label === label)?.echo };
      setTopic(selected);
      setThinking(true);
      consider(askPreference);
      return;
    }

    const tone: Tone | undefined =
      label === "More direct" ? "direct" : label === "More space" ? "space" : undefined;
    setThinking(true);
    consider(() => onDone({ topic: topic?.echo ?? topic?.said, tone, opening: openingFor(topic) }));
  };

  return {
    step,
    currentQuestion,
    thinking,
    acceptsText: step === "guided" && !thinking,
    submit,
    choose,
  };
}

type Meeting = ReturnType<typeof useFirstMeeting>;

export function FirstMeeting({ meeting }: { meeting: Meeting }) {
  const { step, currentQuestion, thinking, choose } = meeting;
  // A choice changes the question, not the composition. Keeping the orb in its
  // listening state avoids a second visual gesture during that quiet beat.
  const orbState: OrbState = "listening";

  return (
    <div className="flex w-full max-w-[560px] flex-col items-center">
      <PresenceOrb state={orbState} size={124} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          // The reserved height is the largest current answer set: two rows of
          // chips. Questions can replace one another without moving the orb or
          // composer, even when their copy and number of choices differ.
          className="mt-9 flex min-h-[180px] w-full flex-col items-center"
        >
            <div className="text-center">
              <p
                className="mb-1.5 text-[10px] font-medium tracking-[0.16em] text-[#f84600] uppercase"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {`${currentQuestion.stage + 1} of ${STAGES}`}
              </p>
              <p className="text-[17px] leading-relaxed text-white/90" style={{ fontFamily: "var(--font-google-sans)" }}>
                {currentQuestion.text}
              </p>
            </div>

            <div className={`mt-7 flex w-full flex-wrap justify-center gap-2.5 ${thinking ? "pointer-events-none" : ""}`}>
              {step === "guided" ? (
                <>
                  {ATTENTION.map(({ label }) => (
                    <Choice key={label} onClick={() => choose(label)}>{label}</Choice>
                  ))}
                  <Choice onClick={() => choose(UNSURE)}>{UNSURE}</Choice>
                </>
              ) : (
                <>
                  <Choice onClick={() => choose("More direct")}>More direct</Choice>
                  <Choice onClick={() => choose("More space")}>More space</Choice>
                  <Choice onClick={() => choose("Let's see as we go")}>Let's see as we go</Choice>
                </>
              )}
            </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Choice({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-[13.5px] text-white/80 transition-colors hover:border-white/35 hover:text-white"
      style={{ fontFamily: "var(--font-google-sans)" }}
    >
      {children}
    </button>
  );
}
