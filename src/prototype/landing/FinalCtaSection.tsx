import { motion } from "motion/react";
import { Container } from "../Container";

export function FinalCtaSection({ onStartFree }: { onStartFree: () => void }) {
  const headline = "Meet Starchild.";
  const ctaLabel = "Meet Starchild";

  return (
    <section className="bg-[#0a0a0a] py-28 text-center md:py-36">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col items-center gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[22ch] text-[36px] leading-[1.12] font-semibold text-white sm:text-[48px]"
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
              className="rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {ctaLabel}
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}
