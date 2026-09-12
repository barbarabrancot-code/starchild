import { useState } from "react";
import { motion } from "motion/react";
import processingIndicator from "../../../../design/assets/images/svgs/Character_Processing_Indicator_300px_Dark_00000 1.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * H's opening is deliberately one conversation, not a navigation surface:
 * the mark identifies the room, the orb makes it feel inhabited, and the one
 * field gives the visitor the next thing to do.
 */
export function HeroScreenH({
  onEnterGuest,
  onNavigateHome,
}: {
  onEnterGuest: (prompt?: string) => void;
  onNavigateHome: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const hasPrompt = prompt.trim().length > 0;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasPrompt) onEnterGuest(prompt.trim());
  };

  return (
    <section className="hero-h" aria-labelledby="hero-h-title">
      <div className="hero-h__glow" aria-hidden="true" />

      <motion.header
        className="hero-h__header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="hero-h__header-inner">
          <button className="hero-h__brand" type="button" onClick={onNavigateHome}>
            Starchild
          </button>
        </div>
      </motion.header>

      <main className="hero-h__content">
        <motion.div
          className="hero-h__orb"
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          <img className="hero-h__orb-placeholder" src={processingIndicator} alt="Starchild is ready to help" />
        </motion.div>

        <motion.h1
          className="hero-h__title"
          id="hero-h-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          Hey, I&apos;m Starchild, you seem tired, I can fix that
        </motion.h1>

        <motion.form
          className="hero-h__prompt"
          onSubmit={submit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
        >
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Mind sharing me with your struggles?"
            aria-label="Tell Starchild what is on your mind"
          />
          <button type="submit" aria-label="Send prompt">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </motion.form>
      </main>

      <style>{`
        .hero-h {
          position: relative;
          /* The glow carries behind the next section's peek. The page supplies
             the dark base, so the hero itself must not end it with a black slab. */
          overflow: visible;
          background: transparent;
          isolation: isolate;
        }
        .hero-h__glow {
          position: absolute; z-index: 0; inset: 0 0 -220px;
          pointer-events: none;
          background: radial-gradient(ellipse 70% 120% at -8% 50%, color-mix(in srgb, var(--color-brand) 38%, transparent) 0%, transparent 64%);
        }
        .hero-h__header {
          position: absolute; z-index: 1; inset: 0 0 auto;
          padding-top: 38px;
        }
        .hero-h__header-inner { width: min(calc(100% - 48px), 852px); margin-inline: auto; }
        .hero-h__brand {
          border: 0; padding: 0; background: transparent; cursor: pointer;
          color: var(--text-primary); font-family: var(--font-display);
          font-size: 1.25rem; font-weight: var(--weight-regular); line-height: 1;
          letter-spacing: -0.05em; text-transform: uppercase;
        }
        .hero-h__brand:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
        .hero-h__content {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          /* The hero is content-sized. It must end after the composer instead
             of reserving a viewport of empty ground underneath it. */
          padding: clamp(170px, 20vw, 230px) 24px 96px;
          text-align: center;
        }
        .hero-h__orb { display: flex; justify-content: center; }
        .hero-h__orb-placeholder { width: 112px; height: 112px; object-fit: contain; }
        .hero-h__title {
          max-width: 680px; margin: 84px 0 0;
          color: var(--text-primary); font-family: var(--font-display);
          font-size: clamp(1.5rem, 1.32rem + 0.72vw, 1.75rem);
          font-weight: var(--weight-regular); line-height: 1.18;
          letter-spacing: -0.035em;
        }
        .hero-h__prompt {
          display: flex; align-items: center; gap: 12px;
          width: min(100%, 524px); min-height: 48px; margin-top: 28px;
          padding: 5px 7px 5px 20px; border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full); background: var(--bg-surface);
          transition: border-color var(--duration-base) var(--ease-out);
        }
        .hero-h__prompt:focus-within { border-color: var(--focus-ring); outline: 2px solid var(--focus-ring); outline-offset: 2px; }
        .hero-h__prompt input {
          min-width: 0; flex: 1; border: 0; outline: 0; background: transparent;
          color: var(--text-primary); font-family: var(--font-body); font-size: var(--text-sm);
        }
        .hero-h__prompt input::placeholder { color: var(--text-secondary); opacity: 1; }
        .hero-h__prompt button {
          display: grid; place-items: center; flex: 0 0 auto;
          width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%;
          background: var(--color-brand); color: var(--color-text-1); cursor: pointer;
          transition: background var(--duration-base) var(--ease-out), transform var(--duration-fast) var(--ease-out);
        }
        .hero-h__prompt button:hover { background: var(--color-brand-hover); }
        .hero-h__prompt button:active { transform: translateY(1px); }
        .hero-h__prompt button:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
        .hero-h__prompt svg { width: 19px; height: 19px; stroke: currentColor; }

        @media (max-width: 640px) {
          .hero-h__glow { bottom: -140px; }
          .hero-h__header { padding-top: 28px; }
          .hero-h__header-inner { width: min(calc(100% - 40px), 852px); }
          .hero-h__brand { font-size: 1.0625rem; }
          .hero-h__content { padding-top: clamp(150px, 28svh, 190px); }
          .hero-h__title { margin-top: 56px; font-size: 1.5rem; }
          .hero-h__prompt { margin-top: 24px; }
        }
      `}</style>
    </section>
  );
}
