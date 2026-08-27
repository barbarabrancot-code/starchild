import { motion } from "motion/react";
import type { RefObject } from "react";
import { Container } from "../../Container";
import { ArrowUpIcon, DocumentIcon } from "../../icons";
import { OrbLoop } from "./OrbLoop";
import { STILL, reveal } from "./still";

/**
 * Section 2 — the conversation the hero's box leads to.
 *
 * The hero asks "what's on your mind?" and then the page has to answer the
 * question that raises: what happens after I type. This is that, played rather
 * than described — no heading, no caption, no claim. Four turns and the thing it
 * made.
 *
 * The orb is not rendered here. It arrives from the hero under its own power (see
 * FlightOrb) and parks against the anchor this section contributes, which is why
 * the panel has a gutter down its left side with nothing in it.
 */

type Turn =
  | { who: "you"; text: string }
  | { who: "ai"; text: string }
  /** what the conversation produced — the one turn that is an object, not a line */
  | { who: "made"; label: string };

const TURNS: Turn[] = [
  { who: "you", text: "Turn this idea into a launch plan." },
  { who: "ai", text: "Let's make it happen." },
  { who: "made", label: "Launch plan" },
  { who: "you", text: "What should I do first?" },
  { who: "ai", text: "Start with a small beta." },
];

export function ConversationSection({ orbAnchor }: { orbAnchor: RefObject<HTMLDivElement> }) {
  return (
    <section className="cv-section">
      <Container>
        <div className="cv-panel">
          {/* The orb's parking space. Empty by design: the thing that fills it
              flies in from the hero and is fixed to the viewport, so this only
              has to say where. */}
          <div className="cv-gutter">
            <div ref={orbAnchor} className="cv-anchor" aria-hidden="true">
              {STILL && <OrbLoop size={96} />}
            </div>
          </div>

          <div className="cv-turns">
            {TURNS.map((turn, i) => (
              <motion.div
                key={i}
                {...reveal({
                  initial: { opacity: 0, y: 14 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.6 },
                  transition: { duration: 0.5, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] },
                })}
                className={turn.who === "you" ? "cv-row cv-row--mine" : "cv-row"}
              >
                {turn.who === "made" ? (
                  // Not a bubble. What a conversation produces is a thing you can
                  // open, and dressing it as speech would make it another remark.
                  <button type="button" className="cv-made">
                    <DocumentIcon className="size-4" />
                    <span>{turn.label}</span>
                    <ArrowUpIcon className="cv-made-go size-4 rotate-90" />
                  </button>
                ) : (
                  <p className={turn.who === "you" ? "cv-bubble cv-bubble--mine" : "cv-bubble"}>
                    {turn.text}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .cv-section { position: relative; padding: 40px 0 120px; background: #050506; }

        .cv-panel {
          position: relative; display: flex; gap: 24px;
          max-width: 960px; margin: 0 auto;
          padding: 56px 48px 64px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, rgba(255,255,255,.028) 0%, rgba(255,255,255,.012) 100%);
        }

        /* Wide enough for the orb at the size it shrinks to, plus the room its
           halo needs — the halo is most of what makes it read as lit, and a
           gutter cut to the core would clip it. */
        /* 96px of orb plus the room its halo needs. Cut to the core the halo
           laps over the first bubble, and the halo is most of what makes the thing
           read as lit rather than as a printed circle. */
        .cv-gutter { flex: none; width: 132px; }
        .cv-anchor {
          width: 96px; height: 96px;
          /* level with the first thing Starchild says, not with the top of the
             panel: it is answering, so it belongs beside its own first line */
          margin-top: 50px;
        }

        .cv-turns { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 18px; }
        .cv-row { display: flex; justify-content: flex-start; }
        .cv-row--mine { justify-content: flex-end; }

        /* A tail, because this is a picture of a conversation rather than a
           conversation — the shape is doing the work a real thread gets from
           being live. */
        .cv-bubble {
          position: relative; max-width: 70%; margin: 0;
          padding: 14px 20px; border-radius: 22px;
          background: #1c1c1f;
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.45; color: rgba(255,255,255,.92);
        }
        .cv-bubble::after {
          content: ""; position: absolute; bottom: 0; width: 18px; height: 18px;
          background: inherit;
          -webkit-mask-image: radial-gradient(circle at 100% 0, transparent 18px, #000 18.5px);
          mask-image: radial-gradient(circle at 100% 0, transparent 18px, #000 18.5px);
          left: -8px; border-bottom-left-radius: 4px;
        }
        .cv-bubble--mine { background: #232326; }
        .cv-bubble--mine::after {
          left: auto; right: -8px;
          -webkit-mask-image: radial-gradient(circle at 0 0, transparent 18px, #000 18.5px);
          mask-image: radial-gradient(circle at 0 0, transparent 18px, #000 18.5px);
          border-bottom-left-radius: 0; border-bottom-right-radius: 4px;
        }

        .cv-made {
          display: flex; align-items: center; gap: 14px; cursor: pointer;
          min-width: 300px; max-width: 70%;
          padding: 15px 18px; border-radius: 18px;
          border: 1px solid rgba(255,255,255,.1); background: #141416;
          font-family: var(--font-google-sans); font-size: 16px; color: #fff;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .cv-made:hover { border-color: rgba(255,255,255,.24); background: #191a1c; }
        .cv-made > svg:first-child { color: rgba(255,255,255,.55); flex: none; }
        .cv-made span { flex: 1; text-align: left; }
        /* points along the row, not up out of it — this opens, it does not send */
        .cv-made-go { color: rgba(255,255,255,.45); flex: none; }

        @media (max-width: 780px) {
          .cv-panel { padding: 40px 22px 48px; gap: 14px; border-radius: 24px; }
          .cv-gutter, .cv-anchor { width: 64px; }
          .cv-anchor { height: 64px; margin-top: 52px; }
          .cv-bubble { font-size: 15.5px; max-width: 84%; }
          .cv-made { min-width: 0; max-width: 84%; font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
