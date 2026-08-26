import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PresenceOrb, type OrbState } from "../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../presence/usePresence";

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

type Step = "guided" | "preference" | "read";
// `stage` marks the three questions and nothing else: the asides Starchild makes
// along the way ("Tell me what I got wrong") aren't steps and aren't counted.
type Turn = { id: string; from: "starchild" | "you"; text: string; stage?: number };

/*
  Two questions, not three. What Starchild understood used to be the third, with
  "Looks right" and "Adjust" under it — which asked someone to sign off on a
  sentence about themselves before anything had happened. It is a remark now: said
  once, at the end, and the conversation simply carries on. Nobody has to agree
  with it, and if it is wrong the next thing they say fixes it, which is how being
  read wrong works everywhere else.
*/
const STAGES = 2;

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

// The buttons that move the meeting along, and the words on them. Kept here rather
// than inline so the label that goes into the transcript is literally the label
// that was clicked — the two drifting apart is exactly how a choice ends up
// recorded as something the person didn't say.
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

let turnId = 0;
const nextId = () => `t${turnId++}`;

export function useFirstMeeting({ onDone }: { onDone: (result: MeetingResult) => void }) {
  /*
    Everyone starts on the same question.

    Arriving from Guest Mode used to be met with "want to keep going, or should I
    get to know you first?" — a choice between two good things, asked at the one
    moment someone has just committed. It made keeping their work sound like an
    alternative to being understood, when it is neither: the conversation is
    already saved, it is in the sidebar, and it will still be there afterwards.
    Nothing was being decided, so nothing needed asking. The flag survives only
    to say that once, under the first question.
  */
  const [step, setStep] = useState<Step>("guided");
  const [turns, setTurns] = useState<Turn[]>([
    { id: nextId(), from: "starchild", text: GUIDED_LINE, stage: 0 },
  ]);
  const [topic, setTopic] = useState<Topic | undefined>();
  const [tone, setTone] = useState<Tone | undefined>();

  const say = (from: Turn["from"], text: string, stage?: number) =>
    setTurns((prev) => [...prev, { id: nextId(), from, text, stage }]);

  // An answer used to be met with Starchild's next line in the same tick, which
  // read as a form advancing rather than as being listened to. Now the answer
  // lands on its own and Starchild takes a moment over it — the dot is what fills
  // that moment. Reduced motion keeps a beat, but only enough to keep the order
  // of events legible.
  const timers = useRef<number[]>([]);
  const reduced = usePrefersReducedMotion();
  const CONSIDER_MS = reduced ? 160 : 760;

  // bound, not passed by reference: clearTimeout detached from window throws
  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const consider = (then: () => void) => {
    timers.current.push(window.setTimeout(then, CONSIDER_MS));
  };

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

    setTopic(said);
    consider(askPreference);
  };

  const choose = (label: string) => {
    say("you", label);

    if (step === "guided") {
      if (label === UNSURE) {
        // pushing a second question here would make it a questionnaire
        consider(() => {
          say("starchild", "That's fine — we can find it as we go.");
          onDone({ tone, opening: openingFor(undefined) });
        });
        return;
      }
      setTopic({ echo: ATTENTION.find((o) => o.label === label)?.echo });
      consider(askPreference);
      return;
    }

    if (step === "preference") {
      const picked: Tone | undefined =
        label === "More direct" ? "direct" : label === "More space" ? "space" : undefined;
      setTone(picked);
      // Said, and then done. The pause between the two is the whole of the
      // ceremony — the line is a remark on the way past, not a checkpoint.
      consider(() => {
        say("starchild", readLine(topic, picked));
        setStep("read");
        consider(() =>
          onDone({ topic: topic?.echo ?? topic?.said, tone: picked, opening: openingFor(topic) }),
        );
      });
    }
  };

  return {
    step,
    turns,
    /** the composer feeds the meeting while it's open in a free-text step */
    acceptsText: step === "guided",
    submit,
    choose,
  };
}

type Meeting = ReturnType<typeof useFirstMeeting>;

export function FirstMeeting({ meeting }: { meeting: Meeting }) {
  const { step, turns, choose } = meeting;
  const last = turns[turns.length - 1];
  const thinking = last?.from === "you";

  /*
    One presence, at the size it has everywhere else it has the screen to itself.

    Every Starchild line used to carry its own small dot, which read as a list of
    speakers rather than as one thing paying attention — and the first thing
    someone saw after signing up was a paragraph, not the product's face. Now the
    orb sits above the conversation the way it does on the hero and on the empty
    screen, and the lines below it are simply what it is saying.
  */
  const orbState: OrbState = thinking ? "working" : step === "read" ? "resolved" : "listening";

  return (
    <div className="flex w-full max-w-[560px] flex-col items-center">
      <PresenceOrb state={orbState} size={124} />

      <div className="mt-9 flex w-full flex-col gap-6">
        {turns.map((turn) =>
          turn.from === "starchild" ? (
            <motion.div
              key={turn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              // Centred under the orb, not ranged left beside it. The question is
              // the only thing on the screen and it is what the orb is asking —
              // hung off the left edge it read as the first line of a document
              // that happened to have a logo above it.
              className="text-center"
            >
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

      {/* one row of choices at a time, never a wall of them */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex w-full flex-wrap justify-center gap-2.5"
        >

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
