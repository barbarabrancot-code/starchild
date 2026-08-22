import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { SiteHeaderC } from "./SiteHeaderC";
import { Container } from "../../Container";
import { IntentPicker } from "../../IntentPicker";
import { PixelMesh } from "./PixelMesh";
import { OrbitalSystem } from "./OrbitalSystem";
import { HERO_INTENTS_C } from "./heroIntents";

// Version C's hero. Same entry points as A/B — prompt box and intent chips both
// drop into Guest Mode — but stripped to one headline, and the monolith
// photograph and its spotlight reveal are gone: the background is a live pixel
// mesh that drifts on its own and lights up and deforms under the pointer.
export function HeroScreenC({
  onEnterGuest,
  onStartTask,
  onNavigateTraders,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  onNavigateTraders: () => void;
  onNavigatePricing: () => void;
  // Still accepted, still passed in, deliberately not wired: C's header has no
  // Conductor Mode link, and its Marketplace item is a placeholder rather than a
  // way into the modal. Restoring either is wiring the handler to a button again.
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const heroRef = useRef<HTMLElement>(null);

  return <section ref={heroRef} className="hero-c relative flex min-h-screen flex-col overflow-hidden">
    <PixelMesh targetRef={heroRef} />
    {/* keeps the mesh from competing with the copy on the left and fading the seam at the fold */}
    <div className="hero-c-vignette" aria-hidden="true" />
    {/* A second, deeper scrim under the orbital system. The first one is aimed at
        the copy on the left, which left the field at its brightest exactly where
        the symbols and their labels have to be read. It sits below the content
        layer, so it quiets the particles without touching the orbit itself. */}
    <div className="hero-c-orbit-scrim" aria-hidden="true" />
    <SiteHeaderC
      onNavigateHome={() => {}}
      onNavigateTraders={onNavigateTraders}
      onNavigatePricing={onNavigatePricing}
      onLogIn={onLogIn}
      onSignUp={onSignUp}
    />
    <main className="relative z-10 flex flex-1 items-center pb-20">
      <Container className="w-full">
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 lg:col-span-7">
            <CompanionHero onEnterGuest={onEnterGuest} onStartTask={onStartTask} />
          </div>

          {/* The right-hand claim: many models, one thing coordinating them.
              Hidden below lg — under the chips it would push the field off the
              fold, and the copy already takes the full width there. */}
          <div className="hidden lg:col-span-5 lg:block">
            <OrbitalSystem />
          </div>
        </div>
      </Container>
    </main>
    <style>{`
      .hero-c { background-color: #07090a; }

      /* the mesh paints its own dot in place of the cursor, but never over
         things you need to aim at. Only set once a fine pointer is confirmed. */
      .hero-c--fine { cursor: none; }
      .hero-c--fine input, .hero-c--fine textarea { cursor: text; }
      .hero-c--fine button, .hero-c--fine a, .hero-c--fine [role="button"] { cursor: pointer; }

      /* enough scrim to keep the copy readable over the particle field, and a
         darker top so the field reads as receding rather than papered on */
      .hero-c-vignette {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background:
          radial-gradient(110% 85% at 20% 48%, rgba(7,9,10,.82) 0%, rgba(7,9,10,.38) 44%, rgba(7,9,10,0) 74%),
          linear-gradient(180deg, rgba(7,9,10,.85), rgba(7,9,10,.15) 34%, rgba(7,9,10,.7));
      }

      /* Only where the orbit is. It reaches almost opaque at the centre so the
         core, the hairline rings and the provider names sit on near-black, and
         falls off to nothing well before the edge so the field still reads as
         one continuous thing rather than as a hole cut in it. Below lg the
         orbit is not rendered, so neither is this. */
      .hero-c-orbit-scrim { display: none; }
      @media (min-width: 1024px) {
        .hero-c-orbit-scrim {
          display: block;
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          /* Wide enough to actually clear the orbit. The first attempt was a
             44%×50% pool that fell off before the top-right corner and the right
             edge, which is exactly where the field was still competing with the
             outer symbols and their labels. This reaches the full height of the
             hero and runs off the right side, and it holds near-opaque most of
             the way out instead of fading immediately. It stops short of the
             copy column, so the left half of the field is untouched. */
          background: radial-gradient(58% 72% at 76% 50%,
            rgba(7,9,10,.97) 0%,
            rgba(7,9,10,.94) 46%,
            rgba(7,9,10,.72) 72%,
            rgba(7,9,10,.3) 88%,
            rgba(7,9,10,0) 100%);
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
    {/* Headline, then one line under it. Still no eyebrow — what the subhead
        does is put into words the claim the orbital system on the right is
        making in pictures, so the two halves of the hero say the same thing. */}
    <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]" style={{ fontFamily: "var(--font-google-sans)" }}>One AI for everything that matters to you.</motion.h1>

    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="mt-5 max-w-[520px] text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-[var(--color-text-body)]" style={{ fontFamily: "var(--font-google-sans)" }}>Powered by leading AI models.</motion.p>

    {/* data-presence tells the dot what it is near — see PixelMesh. Over the
        field it is at its most curious; here it comes in closer and steadies, as
        if listening to what is being typed. */}
    <motion.div data-presence="input" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }} className="mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30">
      <input
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => { if (event.key === "Enter") submit(); }}
        placeholder="What's on your mind?"
        className="w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none"
        style={{ fontFamily: "var(--font-google-sans)" }}
      />
      <div className="mt-4 flex items-center justify-end">
        <button type="button" data-presence="cta" onClick={submit} className="flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]" style={{ fontFamily: "var(--font-google-sans)" }}>
          Meet Starchild
          <ArrowUpIcon className="size-3.5 rotate-90" />
        </button>
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.28 }} className="mt-6">
      <IntentPicker onStartTask={onStartTask} intents={HERO_INTENTS_C} />
    </motion.div>
  </div>;
}
