import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "./data";
import { ArrowUpIcon } from "./icons";
import { StarchildDot } from "./onboarding/StarchildDot";
import { HeroSpotlight } from "./HeroSpotlight";
import { SiteHeader } from "./SiteHeader";
import { Container } from "./Container";
import { IntentPicker } from "./IntentPicker";

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/monolito.png`;

export function HeroScreen({
  onEnterGuest,
  onStartTask,
  onNavigateConductorMode,
  onOpenMarketplace,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const heroRef = useRef<HTMLElement>(null);

  return <section ref={heroRef} className="hero-section relative flex min-h-screen flex-col overflow-hidden">
    <HeroSpotlight targetRef={heroRef} image={HERO_IMAGE} />
    <div className="hero-vignette" aria-hidden="true" />
    <SiteHeader
      onNavigateHome={() => {}}
      onNavigateConductorMode={onNavigateConductorMode}
      onOpenMarketplace={onOpenMarketplace}
      onLogIn={onLogIn}
      onSignUp={onSignUp}
    />
    <main className="relative z-10 flex flex-1 items-center pb-20">
      <Container className="w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <CompanionHero onEnterGuest={onEnterGuest} onStartTask={onStartTask} />
          </div>
        </div>
      </Container>
    </main>
    <style>{`
      /* The monolith sits on the right of the frame and the left is near-black,
         which is exactly where the hero copy lives — so it's anchored right and
         a scrim keeps the text side solid when cover-cropping shifts it inward. */
      .hero-section {
        background-color: #07090a;
        background-image: url("${import.meta.env.BASE_URL}images/monolito.png");
        background-size: cover;
        background-position: center right;
        background-repeat: no-repeat;
      }
      .hero-vignette {
        position: absolute; inset: 0; pointer-events: none;
        background:
          linear-gradient(90deg, rgba(7,9,10,.94) 0%, rgba(7,9,10,.6) 40%, rgba(7,9,10,0) 68%),
          linear-gradient(180deg, rgba(0,0,0,.3), transparent 32%, rgba(0,0,0,.35));
      }
      @media (max-width: 1023px) {
        /* on narrow screens the crop pushes the monolith over the copy — push it back out */
        .hero-section { background-position: 78% center; }
        .hero-vignette {
          background:
            linear-gradient(90deg, rgba(7,9,10,.96) 0%, rgba(7,9,10,.82) 55%, rgba(7,9,10,.5) 100%),
            linear-gradient(180deg, rgba(0,0,0,.3), transparent 32%, rgba(0,0,0,.35));
        }
      }
    `}</style>
  </section>;
}

function CompanionHero({
  onEnterGuest,
  onStartTask,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const submit = () => onEnterGuest(prompt.trim() || undefined);

  return <div>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-5 flex items-center gap-2">
      <StarchildDot state="idle" size={10} />
      <span className="text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>An AI that gets to know you</span>
    </motion.div>
    <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]" style={{ fontFamily: "var(--font-google-sans)" }}>Starchild understands your context — and helps you get things done.</motion.h1>
    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72" style={{ fontFamily: "var(--font-google-sans)" }}>You don't need the perfect question. Start anywhere — no account needed.</motion.p>

    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }} className="mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30">
      <input
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => { if (event.key === "Enter") submit(); }}
        placeholder="What's on your mind?"
        className="w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
      />
      <div className="mt-4 flex items-center justify-end">
        <button type="button" onClick={submit} className="flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]" style={{ fontFamily: "var(--font-google-sans)" }}>
          Meet Starchild
          <ArrowUpIcon className="size-3.5 rotate-90" />
        </button>
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.28 }} className="mt-6">
      <IntentPicker onStartTask={onStartTask} />
    </motion.div>
  </div>;
}
