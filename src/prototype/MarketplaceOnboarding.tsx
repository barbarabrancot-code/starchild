import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SparkleIcon, TrendingUpIcon, SearchIcon, type IconComponent } from "./icons";

const SLIDES: { Icon: IconComponent; title: string; body: string }[] = [
  {
    Icon: SparkleIcon,
    title: "Create your own",
    body: "Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own.",
  },
  {
    Icon: TrendingUpIcon,
    title: "Sell it in the Marketplace",
    body: "List your skill and get paid every time someone puts it to work.",
  },
  {
    Icon: SearchIcon,
    title: "Or just buy one",
    body: "Skip the work — browse skills other people already built and vetted.",
  },
];

export function MarketplaceOnboarding({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  return (
    <div className="flex flex-col items-center px-2 py-8 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[176px] flex-col items-center gap-4"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-[#f4511e]/10 text-[#f4511e]">
            <slide.Icon className="size-6" />
          </div>
          <div>
            <h3
              className="text-[18px] font-semibold text-neutral-900"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {slide.title}
            </h3>
            <p
              className="mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-neutral-500"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {slide.body}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-[#f4511e]" : "w-1.5 bg-neutral-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-7 flex w-full max-w-[360px] items-center justify-between">
        <button
          type="button"
          onClick={onDone}
          className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-600"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Skip
        </button>
        <button
          type="button"
          onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}
          className="rounded-full bg-[#f4511e] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {isLast ? "Ok, let's go" : "Next"}
        </button>
      </div>
    </div>
  );
}
