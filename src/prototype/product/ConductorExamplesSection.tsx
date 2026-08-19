import { motion } from "motion/react";
import { EXAMPLE_SCENARIOS } from "../data";
import { ArrowUpIcon } from "../icons";
import { Container } from "../Container";

const DELIVERABLE_LABEL: Record<string, string> = {
  poster: "Poster",
  brand: "Brand kit",
  market: "Market snapshot",
  code: "Code fix",
  none: "Answer",
};

export function ConductorExamplesSection({ onTryExample }: { onTryExample: (prompt: string) => void }) {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 mx-auto max-w-[46ch] text-center">
            <p
              className="text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              See it in action
            </p>
            <h2
              className="mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Real prompts, run for real.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-google-sans)" }}>
              Click one and watch Conductor Mode pick a model, use tools, and deliver.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          {EXAMPLE_SCENARIOS.map(({ prompt, scenario }, i) => (
            <motion.button
              key={scenario.id}
              type="button"
              onClick={() => onTryExample(prompt)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6"
            >
              <div>
                <p className="text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
                  {DELIVERABLE_LABEL[scenario.deliverable.kind]}
                </p>
                <p className="mt-2 text-[15.5px] font-medium text-white" style={{ fontFamily: "var(--font-google-sans)" }}>
                  "{prompt}"
                </p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105">
                <ArrowUpIcon className="size-4 rotate-45" />
              </span>
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  );
}
