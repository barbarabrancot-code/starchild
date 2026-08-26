import { useState } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { IntentPicker } from "../../IntentPicker";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { SiteHeaderC } from "../c/SiteHeaderC";
import { HERO_INTENTS_C } from "../c/heroIntents";

// Version D's hero. C argues its case with a headline on the left and a system of
// orbiting models on the right; D removes the argument and shows the thing.
//
// One presence on an empty screen, a line under it, and somewhere to type. It is
// the product's own empty state, at full size, on the homepage — so the first
// thing anyone sees is what they will see again the moment they sign in. Nothing
// is claimed here that the interface does not already do.
//
// No pixel mesh and no orbital system: the orb is the only lit thing, and putting
// anything else in the frame would be competing with it.
export function HeroScreenD({
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
  // Accepted to keep D's signature interchangeable with C's, deliberately unwired
  // for the same reasons: the header has no Conductor Mode link, and Marketplace
  // is a placeholder rather than a way into the modal.
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const submit = () => onEnterGuest(prompt.trim() || undefined);

  return (
    <section className="hero-d relative flex min-h-screen flex-col overflow-hidden">
      <SiteHeaderC
        onNavigateHome={() => {}}
        onNavigateTraders={onNavigateTraders}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* pb-20 is the 80px of floor the composition sits above; min-h-screen keeps
          the section at 100vh without clipping if a short viewport makes the column
          taller than the screen. */}
      <main className="relative z-10 flex flex-1 items-center pb-20">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[600px] flex-col items-center text-center"
          >
            {/* The same presence that runs the product, at the size it gets when it
                has the screen to itself. It leans toward the composer as soon as
                anything is typed — the page is already listening before you have
                pressed anything.

                Mounted bare, exactly as ChatScreen mounts it. It was wrapped in a
                motion.div for a fade, and any ancestor with a transform becomes the
                containing block for everything absolutely positioned inside it — so
                the halo stopped resolving against .orb-root and went to its static
                position instead, dragging the whole assembly off centre. */}
            <div className="flex justify-center">
              <PresenceOrb state={prompt.trim() ? "listening" : "resting"} size={150} />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 text-[26px] leading-[1.2] font-semibold text-balance text-white sm:text-[30px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              One AI for everything that matters to you
            </motion.h1>

            {/* Taller than C's single line: an empty box that looks like it expects
                a sentence gets a sentence, and one that looks like a search field
                gets three words. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-7 w-full rounded-[22px] border border-white/12 bg-white/[0.06] p-4 text-left backdrop-blur-sm transition-colors focus-within:border-white/30"
            >
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  // Enter sends, Shift+Enter breaks the line — the same contract the
                  // composer inside the product uses
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                rows={2}
                placeholder="What's on your mind?"
                className="w-full resize-none bg-transparent text-[16px] leading-[1.5] text-white placeholder:text-white/35 focus:outline-none"
                style={{ fontFamily: "var(--font-google-sans)" }}
              />
              <div className="mt-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={submit}
                  className="flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  Meet Starchild
                  <ArrowUpIcon className="size-3.5 rotate-90" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.48 }}
              className="mt-6 flex justify-center"
            >
              <IntentPicker onStartTask={onStartTask} intents={HERO_INTENTS_C} />
            </motion.div>
          </motion.div>
        </Container>
      </main>

      <style>{`
        /* Darker than the rest of the page on purpose: the orb is the only source
           of light in the frame, and it needs somewhere to fall off to. */
        .hero-d { background-color: #050506; }

        /* the glow the orb throws into the room, sitting behind everything */
        .hero-d::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(58% 45% at 50% 42%, rgba(248,70,0,.09) 0%, rgba(248,70,0,0) 72%);
        }
      `}</style>
    </section>
  );
}
