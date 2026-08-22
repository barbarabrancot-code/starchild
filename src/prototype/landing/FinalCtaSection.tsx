import { motion } from "motion/react";
import { ArrowUpIcon } from "../icons";
import { Container } from "../Container";

// The closing line is the one thing that differs between the landings that share
// this section, so it's a prop. The default is the line the Conductor section used
// to close on — it lands harder here, right above the button, so it isn't repeated
// back there.
const DEFAULT_HEADLINE = "The best AI for the job changes constantly. Starchild keeps up.";

export function FinalCtaSection({
  onStartFree,
  headline = DEFAULT_HEADLINE,
}: {
  onStartFree: () => void;
  headline?: string;
}) {
  const ctaLabel = "Meet Starchild";

  return (
    <section className="bg-[#0a0a0a] py-[var(--section-pad)] text-center">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col items-center gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {headline}
            </motion.h2>
            <motion.button
              type="button"
              onClick={onStartFree}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {ctaLabel}
            </motion.button>

            {/* Placeholder: the pricing page doesn't exist yet, so this deliberately
                goes nowhere. Wire it up when there's a page to send people to. */}
            <motion.button
              type="button"
              onClick={() => {}}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="group -mt-3 flex items-center gap-2 text-[14px] text-[var(--color-text-body)] transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              See pricing
              <ArrowUpIcon className="size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]" />
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}
