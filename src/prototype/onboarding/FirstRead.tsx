import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StarchildDot } from "./StarchildDot";
import { composeFirstRead, type Answers } from "./questions";
import { Container } from "../Container";

type Reaction = "yes" | "partly" | "no";

// What the user says back is stored as context too — a "not really" is a signal,
// not a failure state, so it changes how Starchild opens the conversation.
const ACKNOWLEDGEMENT: Record<Reaction, string> = {
  yes: "Good. I'll start from there.",
  partly: "Noted — I'll hold it loosely and adjust as we talk.",
  no: "Then I had it wrong. I'll let you lead and build it back up from what you say.",
};

export function FirstRead({
  answers,
  onContinue,
}: {
  answers: Answers;
  onContinue: (read: string, reaction: Reaction | "edited") => void;
}) {
  const [read, setRead] = useState(() => composeFirstRead(answers));
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(read);
  const [reaction, setReaction] = useState<Reaction | "edited" | null>(null);

  function react(next: Reaction) {
    setReaction(next);
    setTimeout(() => onContinue(read, next), 1400);
  }

  function saveEdit() {
    const next = draft.trim() || read;
    setRead(next);
    setEditing(false);
    setReaction("edited");
    setTimeout(() => onContinue(next, "edited"), 1400);
  }

  return (
    <div className="fr-screen relative flex min-h-screen flex-col overflow-hidden">
      <Container className="relative z-10 flex flex-1 flex-col">
        <div className="py-8">
          <StarchildDot state={reaction ? "settled" : "thinking"} depth={1} size={14} />
        </div>

        <div className="flex flex-1 items-center pb-24">
          <div className="grid w-full grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Here's what I think I understand so far
              </motion.p>

              {editing ? (
                <div className="mt-7">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-[20px] border border-white/20 bg-white/[0.04] p-5 text-[20px] leading-[1.55] text-white focus:border-white/40 focus:outline-none"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                    autoFocus
                  />
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      Save what I changed
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(read);
                        setEditing(false);
                      }}
                      className="rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/75 transition-colors hover:bg-white/10"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <motion.p
                  key={read}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 max-w-[62ch] text-[21px] leading-[1.55] text-white sm:text-[24px]"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {read}
                </motion.p>
              )}

              <AnimatePresence mode="wait">
                {!editing && !reaction && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.5 }}
                    className="mt-10 flex flex-wrap gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => react("yes")}
                      className="rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      This feels like me
                    </button>
                    {(["partly", "no"] as Reaction[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => react(option)}
                        className="rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10"
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {option === "partly" ? "Partly" : "Not really"}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      Edit what Starchild understood
                    </button>
                  </motion.div>
                )}

                {reaction && (
                  <motion.p
                    key="ack"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mt-10 text-[16px] text-white/60"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    {reaction === "edited" ? "Thanks — that's more accurate than what I had." : ACKNOWLEDGEMENT[reaction]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      <style>{`.fr-screen { background: radial-gradient(circle at 30% 20%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }`}</style>
    </div>
  );
}
