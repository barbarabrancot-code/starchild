import { motion } from "motion/react";

/** Reserved 16:9 slot for the Conductor video until the final asset is ready. */
export function VideoPlaceholderSection() {
  return (
    <section className="section video-slot-section" aria-label="Video section">
      <div className="container">
        <motion.div
          className="video-slot"
          role="img"
          aria-label="Video placeholder"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="video-slot__play" aria-hidden="true" />
          <span className="video-slot__label">Video</span>
        </motion.div>
      </div>

      <style>{`
        .video-slot {
          display: grid; place-items: center; align-content: center; gap: var(--space-3);
          width: 100%; aspect-ratio: 16 / 9; min-height: 240px;
          border: 1px dashed var(--border-strong); border-radius: var(--radius-xl);
          background: repeating-linear-gradient(45deg, var(--bg-surface), var(--bg-surface) 12px, var(--bg-surface-alt) 12px, var(--bg-surface-alt) 24px);
          color: var(--text-secondary);
        }
        .video-slot__play {
          width: 52px; height: 52px; border: 1px solid var(--border-strong); border-radius: 50%;
          display: grid; place-items: center;
        }
        .video-slot__play::after {
          content: ""; margin-left: 3px; border-top: 7px solid transparent; border-bottom: 7px solid transparent;
          border-left: 10px solid var(--text-brand);
        }
        .video-slot__label {
          font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
}
