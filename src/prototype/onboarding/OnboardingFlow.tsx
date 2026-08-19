import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StarchildDot, type DotState } from "./StarchildDot";
import {
  EMPTY_ANSWERS,
  FOCUS_CHOICES,
  STAGE_CHOICES,
  STYLE_CHOICES,
  type Answers,
  type Choice,
} from "./questions";
import { Container } from "../Container";

const TOTAL_STEPS = 5;

export function OnboardingFlow({ onComplete }: { onComplete: (answers: Answers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [dotState, setDotState] = useState<DotState>("idle");

  const depth = step / TOTAL_STEPS;

  function advance() {
    if (step >= TOTAL_STEPS - 1) {
      setDotState("thinking");
      setTimeout(() => onComplete(answers), 700);
      return;
    }
    setStep((s) => s + 1);
    setDotState("idle");
  }

  // a pick registers visibly before the screen moves — every choice feels consequential
  function pick(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setDotState("acknowledging");
    setTimeout(advance, 460);
  }

  function finish(startingPoint?: string) {
    const next = { ...answers, startingPoint };
    setAnswers(next);
    setDotState("thinking");
    setTimeout(() => onComplete(next), 700);
  }

  return (
    <div className="ob-screen relative flex min-h-screen flex-col overflow-hidden">
      <Container className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between py-8">
          <StarchildDot state={dotState} depth={depth} size={14} />
          <div className="flex items-center gap-3">
            <span className="text-[12px] tracking-[0.14em] text-white/35" style={{ fontFamily: "var(--font-google-sans)" }}>
              {step + 1} / {TOTAL_STEPS}
            </span>
            <button
              type="button"
              onClick={step >= TOTAL_STEPS - 1 ? () => finish(undefined) : advance}
              className="text-[12.5px] text-white/40 transition-colors hover:text-white/80"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Skip
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center pb-24">
          <div className="grid w-full grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <ChoiceStep
                    key="stage"
                    question="What stage are you in right now?"
                    choices={STAGE_CHOICES}
                    selected={answers.stage}
                    onHoverChange={(hovering) => setDotState(hovering ? "listening" : "idle")}
                    onPick={(id) => pick("stage", id)}
                  />
                )}
                {step === 1 && (
                  <ChoiceStep
                    key="focus"
                    question="What's been taking up the most space in your mind lately?"
                    choices={FOCUS_CHOICES}
                    selected={answers.focus}
                    onHoverChange={(hovering) => setDotState(hovering ? "listening" : "idle")}
                    onPick={(id) => pick("focus", id)}
                  />
                )}
                {step === 2 && (
                  <ChoiceStep
                    key="style"
                    question="When something is difficult, what do you usually do first?"
                    choices={STYLE_CHOICES}
                    selected={answers.style}
                    onHoverChange={(hovering) => setDotState(hovering ? "listening" : "idle")}
                    onPick={(id) => pick("style", id)}
                  />
                )}
                {step === 3 && (
                  <SliderStep
                    key="sliders"
                    answers={answers}
                    onChange={(patch) => {
                      setAnswers((prev) => ({ ...prev, ...patch }));
                      setDotState("listening");
                    }}
                    onContinue={advance}
                  />
                )}
                {step === 4 && <OpenStep key="open" onFinish={finish} onFocusChange={(f) => setDotState(f ? "listening" : "idle")} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      <style>{`.ob-screen { background: radial-gradient(circle at 22% 12%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }`}</style>
    </div>
  );
}

const stepMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="max-w-[20ch] text-[32px] leading-[1.14] font-semibold text-white sm:text-[42px]"
      style={{ fontFamily: "var(--font-google-sans)" }}
    >
      {children}
    </h2>
  );
}

function ChoiceStep({
  question,
  choices,
  selected,
  onPick,
  onHoverChange,
}: {
  question: string;
  choices: Choice[];
  selected?: string;
  onPick: (id: string) => void;
  onHoverChange: (hovering: boolean) => void;
}) {
  return (
    <motion.div {...stepMotion}>
      <StepHeading>{question}</StepHeading>
      <div className="mt-10 flex flex-wrap gap-3">
        {choices.map((choice, i) => {
          const isSelected = selected === choice.id;
          return (
            <motion.button
              key={choice.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => onHoverChange(true)}
              onMouseLeave={() => onHoverChange(false)}
              onFocus={() => onHoverChange(true)}
              onBlur={() => onHoverChange(false)}
              onClick={() => onPick(choice.id)}
              className={`rounded-full border px-5 py-3 text-[14.5px] transition-colors ${
                isSelected
                  ? "border-[#f84600] bg-[#f84600] text-white"
                  : "border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40 hover:bg-white/[0.07]"
              }`}
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {choice.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function SliderRow({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div
        className="mb-3 flex items-center justify-between text-[13px] text-white/50"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        <span className={value < 40 ? "text-white" : ""}>{leftLabel}</span>
        <span className={value > 60 ? "text-white" : ""}>{rightLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ob-slider w-full"
        aria-label={`${leftLabel} to ${rightLabel}`}
      />
    </div>
  );
}

function SliderStep({
  answers,
  onChange,
  onContinue,
}: {
  answers: Answers;
  onChange: (patch: Partial<Answers>) => void;
  onContinue: () => void;
}) {
  // live echo of what the sliders actually mean — the feedback is the reward
  const preview =
    (answers.tone > 65 ? "I'll say the thing plainly" : answers.tone < 35 ? "I'll go easy on the delivery" : "I'll keep the tone even") +
    (answers.initiative > 65
      ? ", and hand you clear steps."
      : answers.initiative < 35
        ? ", and leave you room to steer."
        : ", and follow your lead on structure.");

  return (
    <motion.div {...stepMotion}>
      <StepHeading>How should Starchild work with you?</StepHeading>

      <div className="mt-10 flex max-w-[560px] flex-col gap-9">
        <SliderRow leftLabel="Gentle" rightLabel="Direct" value={answers.tone} onChange={(tone) => onChange({ tone })} />
        <SliderRow
          leftLabel="Give me space"
          rightLabel="Give me clear steps"
          value={answers.initiative}
          onChange={(initiative) => onChange({ initiative })}
        />
      </div>

      <motion.p
        key={preview}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-9 max-w-[46ch] text-[15px] text-white/55 italic"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        “{preview}”
      </motion.p>

      <button
        type="button"
        onClick={onContinue}
        className="mt-10 rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        That's right
      </button>

      <style>{`
        .ob-slider { -webkit-appearance: none; appearance: none; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(248,70,0,.85), rgba(255,255,255,.18)); outline: none; }
        .ob-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px;
          border-radius: 999px; background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
        .ob-slider::-moz-range-thumb { width: 22px; height: 22px; border: none; border-radius: 999px;
          background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
      `}</style>
    </motion.div>
  );
}

function OpenStep({
  onFinish,
  onFocusChange,
}: {
  onFinish: (startingPoint?: string) => void;
  onFocusChange: (focused: boolean) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <motion.div {...stepMotion}>
      <StepHeading>What's something you'd like help thinking through right now?</StepHeading>
      <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-google-sans)" }}>
        It can be something small, practical, personal, or something you're still trying to understand.
      </p>

      <div className="mt-8 max-w-[620px] rounded-[20px] border border-white/12 bg-white/[0.04] p-4 focus-within:border-white/30">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => onFocusChange(true)}
          onBlur={() => onFocusChange(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onFinish(value);
            }
          }}
          rows={2}
          placeholder="One sentence is enough…"
          className="w-full resize-none bg-transparent text-[15.5px] text-white placeholder:text-white/30 focus:outline-none"
          style={{ fontFamily: "var(--font-google-sans)" }}
          autoFocus
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onFinish(value)}
          disabled={!value.trim()}
          className="rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03] disabled:opacity-35 disabled:hover:scale-100"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => onFinish(undefined)}
          className="rounded-full border border-white/20 px-6 py-3.5 text-[14px] text-white/75 transition-colors hover:bg-white/10"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          I'm not sure yet
        </button>
      </div>
    </motion.div>
  );
}
