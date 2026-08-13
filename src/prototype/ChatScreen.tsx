import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HERO_CHIPS, pickScenario, type Scenario } from "./data";
import { StepFlow } from "./StepFlow";
import { ArrowLeftIcon, LogoMark, PlusIcon, MicIcon, ArrowUpIcon, ChevronDownIcon } from "./icons";

export function ChatScreen({
  onBack,
  onOpenMarketplace,
}: {
  onBack: () => void;
  onOpenMarketplace: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [delivered, setDelivered] = useState(false);
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  function choose(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessage(trimmed);
    setScenario(pickScenario(trimmed));
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    const t = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(t);
  }, [message, delivered]);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="hidden w-14 shrink-0 flex-col items-center border-r border-black/[0.06] pt-6 md:flex">
        <LogoMark className="size-6" />
      </div>

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
                  placeholder="Learn about the conductor algorithm, choose a task or write your own"
                  className="w-full bg-transparent text-[14.5px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                  style={{ fontFamily: "var(--font-google-sans)" }}
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
                      className="flex size-9 items-center justify-center rounded-full bg-[#f4511e] text-white transition-transform hover:scale-105"
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
              <span className="flex size-8 items-center justify-center rounded-full bg-[#f4511e] text-white">
                <MicIcon className="size-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
