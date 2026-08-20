import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";
import type { TaskCard } from "../data";

// Meeting Starchild, not configuring it. This runs inside the real chat — same
// chrome, same composer, same dot — and its whole job is to gather just enough to
// make the first exchange feel intentional. Everything else is learned later, in
// the conversation it turns into.
//
// There is always a way straight past it, and skipping costs the user nothing.
export type Tone = "direct" | "space";

export type MeetingResult = {
  topic?: string;
  tone?: Tone;
  /** how Starchild should open the conversation this turns into */
  opening?: string;
};

type Step = "continuity" | "guided" | "preference" | "read" | "adjust";
// `stage` marks the three questions and nothing else: the asides Starchild makes
// along the way ("Tell me what I got wrong") aren't steps and aren't counted.
type Turn = { id: string; from: "starchild" | "you"; text: string; stage?: number };

const STAGES = 3;

// Each chip is written in the user's voice, so it can't be said back verbatim —
// "Something I'm building" in Starchild's mouth is Starchild's own project. `echo`
// is the same idea in the second person, and it's what Starchild quotes.
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

function toneClause(tone: Tone) {
  return tone === "direct" ? "be direct" : "give you room to think";
}

// Free text arrives in the user's own voice and no rule can flip the person on an
// arbitrary sentence, so Starchild quotes it back instead of absorbing it into its
// own line. Chips have an echo and read as Starchild's own words.
type Topic = { echo?: string; said?: string };

function subjectOf(topic?: Topic) {
  if (topic?.echo) return `You're mainly thinking about ${topic.echo}`;
  if (topic?.said) return `You're mainly thinking about “${topic.said}”`;
  return "We haven't landed on a topic yet";
}

// No tone is a real answer, not a blank: Starchild says out loud that it will
// pick that up from how the two of you actually talk.
function readLine(topic: Topic | undefined, tone?: Tone) {
  const subject = subjectOf(topic);
  if (!tone) {
    return `Here's what I understand so far. ${subject}. I'll start there, and I'll pick up how you like me to say things as we go.`;
  }
  return `Here's what I understand so far. ${subject}, and it sounds like you'd rather I ${toneClause(tone)}. I'll start there and learn the rest as we go.`;
}

// the line the conversation actually starts on — help, not a summary
function openingFor(topic?: Topic) {
  if (!topic) return "So — what's the first thing you'd like to put in front of me?";
  // free text comes back as "that" rather than as a clause in the wrong person
  const subject = topic.echo ?? "that";
  return `Got it. Let's start there. What would have to happen this week for ${subject} to feel handled?`;
}

// Whatever they were doing as a guest, said back to them. A task card has a
// label written in Starchild's voice and is worth naming; anything typed was
// written in theirs, so it stays "something" rather than being quoted back.
function continuityLine(task?: TaskCard) {
  const what = task ? task.label.toLowerCase() : "something";
  return `You were working on ${what}. Want to keep going, or should I get to know how you like to work first?`;
}

// picking the thread back up when there's no task card to re-ask its question
const RESUME_OPENING = "Picking up where we left off — what's the next thing you need?";

let turnId = 0;
const nextId = () => `t${turnId++}`;

export function useFirstMeeting({
  task,
  fromGuest = false,
  onDone,
}: {
  /** carried over from Guest Mode, if they were in the middle of something */
  task?: TaskCard;
  /** signed up from inside the guest chat — there is a conversation to resume */
  fromGuest?: boolean;
  onDone: (result: MeetingResult) => void;
}) {
  // Anyone arriving from Guest Mode is offered their thread back first, whether
  // they got there from a task card or from something they typed. Only a brand
  // new account opens on the guided question.
  const resuming = fromGuest || !!task;
  const [step, setStep] = useState<Step>(resuming ? "continuity" : "guided");
  const [turns, setTurns] = useState<Turn[]>([
    {
      id: nextId(),
      from: "starchild",
      text: resuming ? continuityLine(task) : GUIDED_LINE,
      stage: resuming ? undefined : 0,
    },
  ]);
  const [topic, setTopic] = useState<Topic | undefined>();
  const [tone, setTone] = useState<Tone | undefined>();

  const say = (from: Turn["from"], text: string, stage?: number) =>
    setTurns((prev) => [...prev, { id: nextId(), from, text, stage }]);

  const askPreference = () => {
    say("starchild", PREFERENCE_LINE, 1);
    setStep("preference");
  };

  /** anything typed or spoken into the composer while the meeting is open */
  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    say("you", trimmed);

    const said = { said: trimmed.replace(/.$/, "") };

    if (step === "adjust") {
      setTopic(said);
      say("starchild", readLine(said, tone), 2);
      setStep("read");
      return;
    }

    setTopic(said);
    askPreference();
  };

  const choose = (label: string) => {
    say("you", label);

    if (step === "guided") {
      if (label === UNSURE) {
        // pushing a second question here would make it a questionnaire
        say("starchild", "That's fine — we can find it as we go.");
        onDone({ tone, opening: openingFor(undefined) });
        return;
      }
      setTopic({ echo: ATTENTION.find((o) => o.label === label)?.echo });
      askPreference();
      return;
    }

    if (step === "preference") {
      const picked: Tone | undefined =
        label === "More direct" ? "direct" : label === "More space" ? "space" : undefined;
      setTone(picked);
      say("starchild", readLine(topic, picked), 2);
      setStep("read");
    }
  };

  const act = (action: string) => {
    if (action === "keep-going") {
      onDone({ opening: task ? task.question : RESUME_OPENING });
      return;
    }
    if (action === "get-to-know") {
      say("starchild", GUIDED_LINE, 0);
      setStep("guided");
      return;
    }
    if (action === "adjust") {
      say("starchild", "Tell me what I got wrong.");
      setStep("adjust");
      return;
    }
    if (action === "accept") {
      onDone({ topic: topic?.echo ?? topic?.said, tone, opening: openingFor(topic) });
    }
  };

  return {
    step,
    turns,
    /** the composer feeds the meeting while it's open in a free-text step */
    acceptsText: step === "guided" || step === "adjust",
    submit,
    choose,
    act,
  };
}

type Meeting = ReturnType<typeof useFirstMeeting>;

export function FirstMeeting({ meeting, fromGuest = false }: { meeting: Meeting; fromGuest?: boolean }) {
  const { step, turns, choose, act } = meeting;
  const last = turns[turns.length - 1];
  const thinking = last?.from === "you";
  // Only under the opening question — whether that's "keep going?" or the guided
  // one — and gone the moment they answer. It's a reassurance, not a banner.
  const showGuestNote = fromGuest && turns.length === 1;

  return (
    <div className="w-full max-w-[560px]">
      <div className="flex flex-col gap-6">
        {turns.map((turn) =>
          turn.from === "starchild" ? (
            <motion.div
              key={turn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3"
            >
              <span className="mt-1.5 shrink-0">
                <StarchildDot state={thinking ? "thinking" : "settled"} depth={1} size={9} />
              </span>
              <div>
                {/* quiet enough to skip, there for anyone wondering how much is left */}
                {turn.stage !== undefined && (
                  <p
                    className="mb-1.5 text-[10px] font-medium tracking-[0.16em] text-white/25 uppercase"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    {`${turn.stage + 1} of ${STAGES}`}
                  </p>
                )}
                <p
                  className="text-[17px] leading-relaxed text-white/90"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {turn.text}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key={turn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="self-end rounded-[16px_16px_4px_16px] bg-white/[0.07] px-4 py-2.5 text-[15px] text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {turn.text}
            </motion.p>
          ),
        )}
      </div>

      {/* Answering anything here reads like walking away from what they were in
          the middle of. It isn't, and saying so is cheaper than a confirm. */}
      {showGuestNote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-5 text-[12.5px] text-white/35"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Your guest conversation is saved either way.
        </motion.p>
      )}

      {/* one row of choices at a time, never a wall of them */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-wrap gap-2.5 ${showGuestNote ? "mt-3" : "mt-7"}`}
        >
          {step === "continuity" && (
            <>
              <Choice primary onClick={() => act("keep-going")}>Keep going</Choice>
              <Choice onClick={() => act("get-to-know")}>Get to know me</Choice>
            </>
          )}

          {step === "guided" && (
            <>
              {ATTENTION.map(({ label }) => (
                <Choice key={label} onClick={() => choose(label)}>
                  {label}
                </Choice>
              ))}
              {/* the way past the question, kept last so it reads as an out */}
              <Choice onClick={() => choose(UNSURE)}>{UNSURE}</Choice>
            </>
          )}

          {step === "preference" && (
            <>
              <Choice onClick={() => choose("More direct")}>More direct</Choice>
              <Choice onClick={() => choose("More space")}>More space</Choice>
              {/* not knowing is allowed — this is the one Starchild can learn on its own */}
              <Choice onClick={() => choose("Let's see as we go")}>Let's see as we go</Choice>
            </>
          )}

          {step === "read" && (
            <>
              <Choice primary onClick={() => act("accept")}>Looks right</Choice>
              <Choice onClick={() => act("adjust")}>Adjust</Choice>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Choice({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-[13.5px] transition-colors ${
        primary
          ? "bg-[#f84600] text-white hover:scale-[1.02]"
          : "border border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35 hover:text-white"
      }`}
      style={{ fontFamily: "var(--font-google-sans)" }}
    >
      {children}
    </button>
  );
}
