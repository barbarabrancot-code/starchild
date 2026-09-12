import { motion } from "motion/react";
import processingIndicator from "../../../../design/assets/images/svgs/Character_Processing_Indicator_300px_Dark_00000 1.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/** H's closing invitation: one companion, one promise and one next step. */
export function FinalCtaSectionH({ onStartFree }: { onStartFree: () => void }) {
  return (
    <section className="section section--lg final-h" aria-labelledby="final-h-title">
      <div className="container">
        <div className="final-h__layout">
          <motion.div
            className="final-h__orb"
            initial={{ opacity: 0, scale: 0.9, x: -16 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <img className="final-h__orb-placeholder" src={processingIndicator} alt="Starchild is ready to help" />
          </motion.div>

          <div className="final-h__content">
            <motion.div
              className="final-h__panel"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            >
              <h2 id="final-h-title">Let me help you out</h2>
              <p>So you can get off work earlier today and, have a<br className="final-h__desktop-break" /> nicer dinner with your loved ones</p>
            </motion.div>
            <motion.button
              className="final-h__cta"
              type="button"
              onClick={onStartFree}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            >
              Try now for free
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        .final-h { min-height: min(100svh, 620px); display: grid; align-items: center; }
        .final-h__layout {
          display: grid; grid-template-columns: minmax(300px, 1fr) minmax(0, 410px);
          align-items: center; gap: clamp(var(--space-7), 7vw, var(--space-10));
          width: min(100%, 860px); margin-inline: auto;
        }
        .final-h__orb { display: flex; justify-content: center; }
        .final-h__orb-placeholder { display: block; width: 300px; height: 300px; object-fit: contain; }
        .final-h__content { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-5); }
        .final-h__panel {
          width: 100%; padding: var(--space-6);
          border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
          background: color-mix(in srgb, var(--color-brand) 38%, var(--bg-surface-alt));
        }
        .final-h__panel h2 {
          margin: 0; color: var(--text-primary); font-family: var(--font-display);
          font-size: clamp(2rem, 1.52rem + 2vw, 2.5rem); font-weight: var(--weight-regular);
          line-height: 1.05; letter-spacing: -0.045em;
        }
        .final-h__panel p {
          margin: var(--space-3) 0 0; color: var(--text-primary); font-size: var(--text-sm);
          line-height: 1.25; letter-spacing: var(--tracking-normal);
        }
        .final-h__cta {
          display: inline-flex; align-items: center; gap: var(--space-2); min-height: 36px;
          padding: var(--space-2) var(--space-3); border: 1px solid var(--color-brand);
          border-radius: var(--radius-full); background: transparent; color: var(--text-brand); cursor: pointer;
          font-family: var(--font-body); font-size: var(--text-sm); line-height: 1;
          transition: background var(--duration-base) var(--ease-out), transform var(--duration-fast) var(--ease-out);
        }
        .final-h__cta:hover { background: color-mix(in srgb, var(--color-brand) 12%, transparent); }
        .final-h__cta:active { transform: translateY(1px); }
        .final-h__cta:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
        .final-h__cta svg { width: 16px; height: 16px; stroke: currentColor; }

        @media (max-width: 640px) {
          .final-h { min-height: 0; }
          .final-h__layout { grid-template-columns: 1fr; gap: var(--space-7); }
          .final-h__orb-placeholder { width: 230px; height: 230px; margin-block: -18px; }
          .final-h__content { width: 100%; align-items: stretch; }
          .final-h__panel { padding: var(--space-5); }
          .final-h__desktop-break { display: none; }
        }
      `}</style>
    </section>
  );
}
