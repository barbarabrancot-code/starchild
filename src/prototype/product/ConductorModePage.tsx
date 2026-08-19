import { useRef } from "react";
import { motion } from "motion/react";
import { ConductorModeSection } from "../../components/ConductorModeSection";
import { SiteHeader } from "../SiteHeader";
import { ConductorExamplesSection } from "./ConductorExamplesSection";
import { FinalCtaSection } from "../landing/FinalCtaSection";
import { Container } from "../Container";

export function ConductorModePage({
  onNavigateHome,
  onOpenMarketplace,
  onTry,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onOpenMarketplace: () => void;
  onTry: (prompt?: string) => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const examplesRef = useRef<HTMLDivElement>(null);

  function scrollToExamples() {
    examplesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-[#0a0a0a]">
      <div className="cmp-hero relative overflow-hidden pb-20">
        <SiteHeader
          onNavigateHome={onNavigateHome}
          onNavigateConductorMode={() => {}}
          onOpenMarketplace={onOpenMarketplace}
          onLogIn={onLogIn}
          onSignUp={onSignUp}
        />

        <Container className="relative z-10 mt-16">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 text-center lg:col-span-8 lg:col-start-3">
              <p
                className="text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Product · Conductor Mode
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                One conductor. Every model, tool, and task.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the
                result when it matters, and hands you one response — no juggling apps, no picking models yourself.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-9 flex flex-wrap items-center justify-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => onTry()}
                  className="rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  Try Conductor Mode
                </button>
                <button
                  type="button"
                  onClick={scrollToExamples}
                  className="rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  See examples
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            <span>Skills</span>
            <span className="text-white/20">·</span>
            <span>Tools</span>
            <span className="text-white/20">·</span>
            <span>Runs 24/7</span>
          </motion.div>
        </Container>

        <style>{`.cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }`}</style>
      </div>

      <ConductorModeSection onTryConductorMode={() => onTry()} />

      <div ref={examplesRef}>
        <ConductorExamplesSection onTryExample={(prompt) => onTry(prompt)} />
      </div>

      <FinalCtaSection onStartFree={() => onTry()} />
    </div>
  );
}
