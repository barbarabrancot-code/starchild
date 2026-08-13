import { motion } from "motion/react";
import { CAPABILITY_PILLS } from "./data";
import { LogoMark, PlusIcon, MicIcon, ChevronDownIcon } from "./icons";

export function HeroScreen({ onEnterChat }: { onEnterChat: () => void }) {
  return (
    <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <LogoMark className="size-7" />
          <span
            className="text-[15px] font-semibold tracking-[0.16em] text-white"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            STARCHILD
          </span>
        </div>
        <button
          type="button"
          className="rounded-full bg-[#f4511e] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_4px_16px_rgba(244,81,30,0.35)] transition-transform hover:scale-[1.03]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Log In / Sign up
        </button>
      </div>

      {/* center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center text-[32px] font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)] sm:text-[42px]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          One agent to rule all LLMs
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          role="button"
          tabIndex={0}
          onClick={onEnterChat}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onEnterChat();
          }}
          className="w-full max-w-[560px] cursor-pointer rounded-[22px] bg-white/95 p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur transition-transform hover:scale-[1.01]"
        >
          <p
            className="text-[14.5px] text-neutral-400"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Learn about the conductor algorithm, choose a task or write your own
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="flex size-8 items-center justify-center rounded-full text-neutral-500">
              <PlusIcon className="size-5" />
            </span>

            <div className="flex items-center gap-3">
              <span
                className="flex items-center gap-1 text-[13px] text-neutral-600"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Conductor Mode
                <ChevronDownIcon className="size-3 text-neutral-400" />
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-[#f4511e] text-white">
                <MicIcon className="size-4" />
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {CAPABILITY_PILLS.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              className="flex items-center gap-1.5 rounded-full bg-black/25 px-4 py-2 text-[12.5px] text-white/90 backdrop-blur-sm"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              <Icon className="size-3.5" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-section { background: #16232a; }

        .hero-bg {
          position: absolute; inset: 0;
          background-image: url("/images/Background.png");
          background-size: cover;
          background-position: center 60%;
        }

        .hero-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.18) 100%);
        }
      `}</style>
    </section>
  );
}
