import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HERO_CHIPS, pickScenario, type Scenario, type TaskCard } from "./data";
import { StepFlow } from "./StepFlow";
import { GuestSidebar } from "./GuestSidebar";
import { SignupGate } from "./SignupGate";
import { StarchildDot } from "./onboarding/StarchildDot";
import { ArrowLeftIcon, LogoMark, PlusIcon, MicIcon, ArrowUpIcon, ChevronDownIcon } from "./icons";

export function ChatScreen({
  onBack,
  onOpenMarketplace,
  onRequestSignup,
  initialMessage,
  openingMessage,
  task,
  isGuest = false,
}: {
  onBack: () => void;
  onOpenMarketplace: () => void;
  onRequestSignup?: () => void;
  initialMessage?: string;
  /** Starchild speaks first — used after onboarding so the chat is never an empty box. */
  openingMessage?: string;
  /** Came from a hero task card: Starchild asks one question, then runs with this context. */
  task?: TaskCard;
  isGuest?: boolean;
}) {
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [scenario, setScenario] = useState<Scenario | null>(initialMessage ? pickScenario(initialMessage) : null);
  const [delivered, setDelivered] = useState(false);
  const [value, setValue] = useState("");
  const guest = isGuest;
  const [tasksRemaining, setTasksRemaining] = useState(initialMessage ? 1 : 2);
  const [gate, setGate] = useState<{ heading: string; sub: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function openGate(heading: string, sub: string) {
    setGate({ heading, sub });
  }

  function choose(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (guest && tasksRemaining <= 0) {
      openGate(
        "Keep going with Starchild.",
        "You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.",
      );
      return;
    }
    setMessage(trimmed);
    // On a task card the user only supplies the missing detail ("BTC"), so the
    // standing context is what actually routes the work — their reply alone wouldn't.
    setScenario(pickScenario(task ? `${task.basePrompt} ${trimmed}` : trimmed));
    if (guest) setTasksRemaining((r) => r - 1);
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    const t = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(t);
  }, [message, delivered]);

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {guest ? (
        <GuestSidebar
          tasksRemaining={tasksRemaining}
          onLockedFeature={() =>
            openGate("Keep what you just created.", "Create your free account to save this project and unlock the full Starchild experience.")
          }
        />
      ) : (
        <div className="hidden w-14 shrink-0 flex-col items-center border-r border-black/[0.06] pt-6 md:flex">
          <LogoMark className="size-6" />
        </div>
      )}

      {gate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setGate(null);
          }}
        >
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
            <SignupGate
              heading={gate.heading}
              sub={gate.sub}
              ctaLabel="Create free account"
              showForm={false}
              onContinue={() => {
                setGate(null);
                onRequestSignup?.();
              }}
            />
          </div>
        </div>
      )}

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center gap-3 border-b border-black/[0.05] px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onBack}
            className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/[0.05]"
            aria-label="Back"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <span
            className="text-[13.5px] font-medium text-neutral-500"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Conductor Mode
          </span>
        </header>

        <div className="flex-1 overflow-y-auto">
          {message === null ? (
            <div className="flex min-h-full flex-col items-center justify-center gap-5 px-5 py-10">
              {openingMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[560px]"
                >
                  {task && (
                    <p
                      className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {task.label}
                    </p>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="mt-1 shrink-0">
                      <StarchildDot state="settled" depth={1} size={9} />
                    </span>
                    <p
                      className="text-[17px] leading-relaxed text-neutral-800"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {openingMessage}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <p
                    className="text-[15px] text-neutral-500"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Pick a starting point, or write your own.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex w-full max-w-[560px] flex-wrap justify-center gap-2"
                  >
                    {HERO_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => choose(chip)}
                        className="shrink-0 rounded-full border border-black/10 px-3.5 py-1.5 text-[12.5px] whitespace-nowrap text-neutral-600 transition-colors hover:border-black/20 hover:bg-black/[0.03]"
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {chip}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[560px] rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") choose(value);
                  }}
                  placeholder={openingMessage ? "Answer however you like…" : "Learn about the conductor algorithm, choose a task or write your own"}
                  className="w-full bg-transparent text-[14.5px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                  autoFocus={Boolean(openingMessage)}
                />

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/[0.05]"
                    aria-label="Add attachment"
                  >
                    <PlusIcon className="size-5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-[13px] text-neutral-600"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      Conductor Mode
                      <ChevronDownIcon className="size-3 text-neutral-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => choose(value || "Explain Conductor Mode to me")}
                      className="flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105"
                      aria-label="Send"
                    >
                      {value.trim() ? <ArrowUpIcon className="size-4" /> : <MicIcon className="size-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0">
              <div className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm bg-neutral-100 px-4 py-2.5 text-[14.5px] text-neutral-800"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {message}
                </div>
              </div>

              <StepFlow
                scenario={scenario!}
                onMonetize={onOpenMarketplace}
                onStep={scrollToBottom}
                onDone={() => setDelivered(true)}
              />

              {delivered && guest && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[#f84600]/25 bg-[#f84600]/[0.06] px-5 py-4"
                >
                  <div>
                    <p className="text-[13.5px] font-medium text-neutral-900" style={{ fontFamily: "var(--font-google-sans)" }}>
                      Keep what you just created.
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-neutral-500" style={{ fontFamily: "var(--font-google-sans)" }}>
                      Create your free account to save this project and unlock the full Starchild experience.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openGate("Keep what you just created.", "Create your free account to save this project and unlock the full Starchild experience.")
                    }
                    className="shrink-0 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Create free account
                  </button>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {message !== null && (
          <div className="shrink-0 border-t border-black/[0.05] px-5 py-4 sm:px-8">
            <div className="mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <button
                type="button"
                className="flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-black/[0.05]"
                aria-label="Add attachment"
              >
                <PlusIcon className="size-4" />
              </button>
              <input
                disabled
                placeholder={delivered ? "Monetize, meet the marketplace" : "Ask Conductor anything…"}
                className="flex-1 bg-transparent text-[13.5px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-google-sans)" }}
              />
              <span
                className="flex items-center gap-1 text-[12.5px] text-neutral-500"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Conductor Mode
                <ChevronDownIcon className="size-3 text-neutral-400" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#f84600] text-white">
                <MicIcon className="size-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
