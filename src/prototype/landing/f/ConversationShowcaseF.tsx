import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../../Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The first thing after the hero is deliberately a single, familiar exchange.
 * The product does the organizing; the person only has to say what they need. */
export function ConversationShowcaseF() {
  const windowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(windowRef, { once: true, amount: 0.55 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timings = [140, 900, 1250, 1780, 2490];
    const timers = timings.map((delay, index) => window.setTimeout(() => setShown(index + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [isInView]);

  return (
    <section className="ctf-section" aria-labelledby="ctf-title">
      <Container>
        <motion.h2
          id="ctf-title"
          className="ctf-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Just talk. Starchild figures out the rest
        </motion.h2>

        <motion.div
          className="ctf-window"
          ref={windowRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          aria-label="An example chat where Starchild turns a request into a launch plan."
        >
          {shown >= 1 && (
            <motion.p
              className="ctf-bubble ctf-bubble--user ctf-bubble--first"
              initial={{ opacity: 0, x: 26, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              Turn this into a launch plan
            </motion.p>
          )}

          {shown >= 2 && (
            <motion.div
              className="ctf-answer ctf-answer--first"
              initial={{ opacity: 0, x: -18, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <i aria-hidden="true" />
              <p className="ctf-bubble">Let&apos;s make it happen.</p>
            </motion.div>
          )}

          {shown >= 3 && (
            <motion.div
              className="ctf-plan"
              initial={{ opacity: 0, x: -10, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4.1 1.8h5l2.8 2.8v9.6H4.1zM9.1 1.8v2.9H12" />
              </svg>
              <span>Launch plan</span>
              <b aria-hidden="true">→</b>
            </motion.div>
          )}

          {shown >= 4 && (
            <motion.p
              className="ctf-bubble ctf-bubble--user ctf-bubble--second"
              initial={{ opacity: 0, x: 26, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              What should I do first?
            </motion.p>
          )}

          {shown >= 5 && (
            <motion.div
              className="ctf-answer ctf-answer--second"
              initial={{ opacity: 0, x: -18, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <i aria-hidden="true" />
              <p className="ctf-bubble">Start with a small beta.</p>
              <span className="ctf-reaction" aria-label="cool">😎</span>
            </motion.div>
          )}
        </motion.div>
      </Container>

      <style>{`
        .ctf-section {
          padding: 122px 0 136px; overflow: hidden;
          background: transparent; font-family: var(--font-google-sans);
        }
        .ctf-title {
          max-width: 22ch; margin: 0 auto 42px; text-align: center;
          color: #fff; font-size: clamp(31px, 3.55vw, 46px); line-height: 1.1;
          font-weight: 600; letter-spacing: -.035em; text-wrap: balance;
        }
        .ctf-window {
          position: relative; box-sizing: border-box; width: min(610px, calc(100% - 32px));
          height: 312px; margin: 0 auto; overflow: hidden; border-radius: 20px;
          border: 1px solid rgba(255,255,255,.09); background: #1a1a1b;
          box-shadow: 0 24px 70px rgba(0,0,0,.24);
        }
        .ctf-window::before {
          content: ""; position: absolute; inset: -46% -26% -42% -42%; pointer-events: none;
          background: radial-gradient(circle at 46% 58%, rgba(248,70,0,.18), rgba(77,27,12,.09) 34%, transparent 66%);
        }
        .ctf-bubble { position: relative; box-sizing: border-box; width: max-content; max-width: none; margin: 0; padding: 10px 14px; border-radius: 15px; background: rgba(248,70,0,.105); color: rgba(255,255,255,.9); font-size: 14px; line-height: 1.3; white-space: nowrap; }
        .ctf-bubble--user { position: absolute; background: rgba(255,255,255,.055); color: rgba(255,255,255,.82); }
        .ctf-bubble--first { top: 38px; right: 32px; }
        .ctf-bubble--second { top: 183px; right: 32px; }
        .ctf-answer { position: absolute; display: flex; align-items: center; gap: 18px; }
        .ctf-answer > i { width: 10px; height: 10px; border-radius: 999px; background: #f84600; box-shadow: 0 0 12px rgba(248,70,0,.85); }
        .ctf-answer--first { top: 85px; left: 31px; }
        .ctf-answer--second { top: 233px; left: 31px; }
        .ctf-plan { position: absolute; top: 133px; left: 57px; display: flex; align-items: center; gap: 10px; width: 222px; box-sizing: border-box; padding: 10px 13px; border: 1px solid rgba(248,70,0,.18); border-radius: 12px; background: rgba(70,28,20,.32); color: rgba(255,255,255,.88); font-size: 14px; }
        .ctf-plan svg { width: 15px; height: 15px; fill: none; stroke: rgba(255,255,255,.7); stroke-width: 1.2; }
        .ctf-plan b { margin-left: auto; color: rgba(255,255,255,.38); font-size: 17px; font-weight: 400; line-height: .7; }
        .ctf-reaction { position: absolute; right: 8px; bottom: -15px; display: grid; place-items: center; width: 19px; height: 19px; border-radius: 999px; background: #0f1011; font-size: 12px; }
        @media (max-width: 640px) {
          .ctf-section { padding: 92px 0 100px; }
          .ctf-title { margin-bottom: 34px; }
          .ctf-window { height: 330px; border-radius: 18px; }
          .ctf-bubble { max-width: 78%; font-size: 13px; white-space: normal; }
          .ctf-bubble--first { top: 30px; right: 18px; }
          .ctf-bubble--second { top: 196px; right: 18px; }
          .ctf-answer--first { top: 83px; left: 18px; }
          .ctf-answer--second { top: 247px; left: 18px; }
          .ctf-answer { gap: 11px; }
          .ctf-plan { top: 136px; left: 43px; width: 194px; }
        }
      `}</style>
    </section>
  );
}
