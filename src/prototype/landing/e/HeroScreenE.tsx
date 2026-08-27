import { useState, type RefObject } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { SiteHeaderE } from "./SiteHeaderE";
import { OrbLoop } from "./OrbLoop";
import { STILL } from "./still";

/**
 * Version E's hero.
 *
 * D put the product's empty screen on the homepage. E keeps that idea and strips
 * it further: the orb, one line, and somewhere to type. Nothing else is in the
 * frame — no chips, no second CTA, no argument.
 *
 * What changed from D, and why:
 *
 *   · the headline drops from 30px to 22px. At hero size it was a banner making a
 *     claim; at this size it is a caption on the orb, which is what it actually
 *     is. The orb carries the weight and the line explains it.
 *
 *   · the chips are gone. They gave five ways in before anyone had been given
 *     one, which is a menu, not an invitation. The box asks a question; a question
 *     with six answers stapled under it is not a question.
 *
 *   · the send button only exists once there is something to send. On an empty
 *     box it is a control pointing at nothing.
 */
export function HeroScreenE({
  orbAnchor,
  onEnterGuest,
  onNavigateTraders,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  /** where the page's one orb sits while the hero is the section being read */
  orbAnchor: RefObject<HTMLDivElement>;
  onEnterGuest: (prompt?: string) => void;
  // Accepted so E's signature stays interchangeable with C's and D's, and
  // deliberately unwired for the same reasons they are there.
  onStartTask: (task: TaskCard) => void;
  onNavigateTraders: () => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const typed = prompt.trim().length > 0;
  const submit = () => onEnterGuest(prompt.trim() || undefined);

  return (
    <section className="hero-e relative flex min-h-screen flex-col overflow-hidden">
      <SiteHeaderE
        onNavigateHome={() => {}}
        onNavigateTraders={onNavigateTraders}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <main className="relative z-10 flex flex-1 items-center pb-24">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[560px] flex-col items-center text-center"
          >
            {/* Not the orb — the space it stands in.

                There is one orb on this page and it belongs to no section: it
                starts here and travels down as you scroll (see FlightOrb). What
                the hero owns is the claim on where it should be while the hero is
                what someone is looking at, which is all this div is. */}
            <div ref={orbAnchor} className="he-orb-slot" aria-hidden="true">
              {STILL && <OrbLoop size={180} />}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 text-[22px] leading-[1.3] font-medium text-balance text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              One AI for everything that matters to you.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="he-box mt-6 w-full"
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
                rows={3}
                placeholder="What's on your mind?"
                className="he-input"
              />

              {/* Appears with the first character and leaves with the last. On an
                  empty box it would be a button that does nothing, and a dead
                  control is worse than none. */}
              <motion.button
                type="button"
                onClick={submit}
                aria-label="Send"
                initial={false}
                animate={{ opacity: typed ? 1 : 0, scale: typed ? 1 : 0.8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ pointerEvents: typed ? "auto" : "none" }}
                className="he-send"
              >
                <ArrowUpIcon className="size-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </Container>
      </main>

      <style>{`
        /* Darker than the rest of the page on purpose: the orb is the only source
           of light in the frame, and it needs somewhere to fall off to. */
        .hero-e { background-color: #050506; }

        /* the orb is 180px and fixed to the viewport; this is the hole it sits in */
        .he-orb-slot { width: 180px; height: 180px; }

        /* the glow the orb throws into the room, sitting behind everything */
        .hero-e::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(56% 44% at 50% 40%, rgba(248,70,0,.09) 0%, rgba(248,70,0,0) 72%);
        }

        /* Taller than it needs to be for one line, deliberately. An empty box that
           looks like it expects a sentence gets a sentence; one that looks like a
           search field gets three words. */
        .he-box {
          position: relative;
          padding: 18px 20px 20px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .he-box:focus-within { border-color: rgba(255,255,255,.26); background: rgba(255,255,255,.06); }

        .he-input {
          width: 100%; resize: none; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; text-align: left;
        }
        .he-input::placeholder { color: rgba(255,255,255,.32); }

        .he-send {
          position: absolute; right: 14px; bottom: 14px;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
        }
        .he-send:hover { background: #ff5a1f; }
        .he-send:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 3px; }
      `}</style>
    </section>
  );
}
