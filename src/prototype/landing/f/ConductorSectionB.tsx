import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../../Container";
import { PresenceOrb } from "../../presence/PresenceOrb";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Conductor.
 *
 * The composition is a need on the left, the models on the right, the orb
 * between them, and what comes out of it underneath. Two earlier passes got the
 * words right and the geometry wrong, in the same way twice, so it is worth
 * writing down what the mistake was.
 *
 * A line drawn from a lit card on the left to a lit card on the right does not
 * say "this went through the middle". It says these two go together — and once
 * the eye has that, the orb is a junction rather than a decision. Putting both
 * lit cards on the same horizontal axis says it a second time, and levelling
 * them with the orb says it a third. Renaming the left column from attributes to
 * tasks fixed the vocabulary and left all three intact, which is why it still
 * read as a matching interface.
 *
 * So there is no line between the sides, the two lit cards are never level with
 * each other, and neither of them sits on the orb's axis. The only thing that
 * touches the orb is a glow arriving from the left, and the only thing that
 * leaves it is light falling downward.
 *
 * The order carries the whole argument, which is why it is a sequence and not a
 * set of loops: a need becomes clear, it reaches the orb, the orb takes it, the
 * far side holds while a model is chosen, and only then does an answer appear.
 * Every one of those is after the one before it. Run them together and it is a
 * dashboard where things light up.
 *
 * Both sides orbit continuously and independently — different periods, so they
 * never look geared to each other, which would be its own kind of pairing.
 */

/** what a person arrives with. One word each: a label long enough to read as a
 *  sentence starts competing with the model names for attention. */
const NEEDS = ["Decide", "Research", "Write", "Plan", "Track", "Prepare", "Create", "Build"];

/**
 * What it can reach — the eight cards as drawn.
 *
 * Every logo is the exported artwork, not a redraw. `art` is the file in
 * public/models/ and `w` is the mark's width as a fraction of the card, taken
 * off the design rather than eyeballed: OpenAI is 129.707 of 210.554, Kimi is
 * 103.523, and so on. That is what keeps eight marks of very different
 * proportions looking like one set.
 *
 * Two of them — Qwen and MiniMax — are flattened in the file itself: the frame
 * has no children, so the mark cannot be exported on its own and what comes back
 * is the whole card, ground and all, at exactly the card's size. They are marked
 * `whole` and drawn edge to edge instead of centred inside a card. It renders
 * identically because the ground in the file is the same #3a3a3a the CSS card
 * uses. Ungroup those two in Figma and they can join the rest.
 */
type Model = { name: string; art: string; w: number; whole?: boolean };

const MODELS: Model[] = [
  { name: "OpenAI", art: "openai-wordmark.svg", w: 0.616 },
  { name: "Claude", art: "claude-wordmark.svg", w: 0.667 },
  { name: "Gemini", art: "gemini-wordmark.svg", w: 0.628 },
  { name: "Grok", art: "grok-wordmark.svg", w: 0.895 },
  { name: "Qwen", art: "qwen-card.svg", w: 1, whole: true },
  { name: "DeepSeek", art: "deepseek.svg", w: 0.857 },
  { name: "MiniMax", art: "minimax-card.svg", w: 1, whole: true },
  { name: "Kimi", art: "kimi-wordmark.svg", w: 0.492 },
];

/** the one that clarifies, and the one that lights — never at the same moment */
const LIT_NEED = 0;
const LIT_MODEL = 1;

/**
 * 0 idle · 1 a need clarifies · 2 the signal crosses · 3 the orb takes it
 * 4 a model is chosen · 5 the light falls · 6 the answer
 */
type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const BEATS: [Stage, number][] = [
  [1, 700],
  [2, 1350],
  [3, 2000],
  [4, 2600],
  [5, 3150],
  [6, 3450],
];

export function ConductorSectionB() {
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, { once: true, amount: 0.35 });
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    if (!seen) return;
    const timers = BEATS.map(([s, ms]) => window.setTimeout(() => setStage(s), ms));
    return () => timers.forEach(window.clearTimeout);
  }, [seen]);

  return (
    <section ref={sectionRef} className="cdb-section" aria-labelledby="cdb-title">
      <Container>
        <motion.div
          className="cdb-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={seen ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p>Conductor</p>
          <h2 id="cdb-title">It knows you. It knows AI.</h2>
        </motion.div>

        <div className="cdb-stage">
          {/* Two orbits, centred on the orb and turning at different rates. Each
              is a full circle with only its own side showing — the mask is on the
              still wrapper, not on the turning one, so a card fades out as it
              reaches the middle rather than crossing it. */}
          {/* The needs. Words, because a need is what somebody would say. */}
          <div className="cdb-orbit cdb-orbit--left">
            <div className="cdb-spin cdb-spin--left">
              {NEEDS.map((label, i) => (
                <span key={label} className="cdb-seat" style={{ ["--a" as string]: `${(360 / NEEDS.length) * i}deg` }}>
                  <span className={`cdb-card cdb-card--left${i === LIT_NEED && stage >= 1 ? " is-lit" : ""}`}>
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* The models. Cards, because a model is a thing with a mark. */}
          <div className="cdb-orbit cdb-orbit--right">
            <div className={`cdb-spin cdb-spin--right${stage >= 3 && stage < 6 ? " is-holding" : ""}`}>
              {MODELS.map((model, i) => (
                <span key={model.name} className="cdb-seat" style={{ ["--a" as string]: `${(360 / MODELS.length) * i}deg` }}>
                  <span
                    className={`cdb-card cdb-card--right${model.whole ? " is-whole" : ""}${i === LIT_MODEL && stage >= 4 ? " is-lit" : ""}`}
                    role="img"
                    aria-label={model.name}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}models/${model.art}`}
                      alt=""
                      style={{ width: `${model.w * 100}%` }}
                    />
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* The signal. Not a line between two cards — a glow that comes off the
              left side and goes into the orb, and stops existing once it lands. */}
          <span className={`cdb-signal${stage >= 2 ? " is-on" : ""}`} aria-hidden="true" />

          <div className={`cdb-orb${stage >= 3 ? " is-taking" : ""}`} aria-hidden="true">
            <PresenceOrb state={stage >= 3 && stage < 6 ? "working" : "resting"} size={140} />
          </div>

          {/* What leaves the orb goes down, not sideways. The answer is below it
              because that is where the light falls. */}
          <span className={`cdb-spill${stage >= 5 ? " is-on" : ""}`} aria-hidden="true" />
          <motion.p
            className="cdb-answer"
            initial={{ opacity: 0, y: 8 }}
            animate={stage >= 6 ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE }}
          >
            The right AI,
            <br />
            for what you need.
          </motion.p>
        </div>
      </Container>

      <style>{`
        .cdb-section { position: relative; padding: 96px 0 104px; background: transparent; font-family: var(--font-google-sans); overflow: hidden; }

        .cdb-heading { position: relative; z-index: 3; text-align: center; }
        .cdb-heading p {
          margin: 0 0 10px; color: var(--lf-accent-ink);
          font-size: 13px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
        }
        .cdb-heading h2 {
          margin: 0; color: var(--lf-ink);
          font-size: 42px; line-height: 1.16; font-weight: 500; letter-spacing: -.01em;
        }

        /* --cdb-r is the orbit radius and the only number the geometry needs. The
           field is twice it plus room for a card, so nothing is clipped by the
           section as it comes round. */
        .cdb-stage {
          position: relative; height: 660px; margin-top: 20px;
          --cdb-r: 300px;
          /* room for the widest card to hang off the rim without being clipped */
          --cdb-pad: 190px;
        }

        /* ---------- the two orbits ---------- */

        /* The field is the circle plus a card's worth of margin on every side.
           Sized to the circle exactly, a card sitting on the rim has half its
           width outside the element — and outside the element is outside the
           mask, so it was being cut in half at the very place it is meant to be
           seen. --cdb-pad is that margin. */
        .cdb-orbit {
          position: absolute; top: 50%; left: 50%;
          width: calc((var(--cdb-r) + var(--cdb-pad)) * 2);
          height: calc((var(--cdb-r) + var(--cdb-pad)) * 2);
          margin: calc((var(--cdb-r) + var(--cdb-pad)) * -1) 0 0 calc((var(--cdb-r) + var(--cdb-pad)) * -1);
          pointer-events: none;
        }

        /* Opaque at the outside edge and transparent toward the middle, which is
           the opposite of what it said before: a card is visible while it is out
           on its own side and fades as it comes round toward the orb, so it never
           crosses the centre. The mask is on the still layer — on the turning one
           it turns with the cards and nothing ever fades. */
        .cdb-orbit--left {
          -webkit-mask-image: linear-gradient(to left, transparent 0 46%, #000 62%);
          mask-image: linear-gradient(to left, transparent 0 46%, #000 62%);
        }
        .cdb-orbit--right {
          -webkit-mask-image: linear-gradient(to right, transparent 0 46%, #000 62%);
          mask-image: linear-gradient(to right, transparent 0 46%, #000 62%);
        }

        .cdb-spin { position: absolute; inset: 0; }
        /* Different periods on purpose. Two orbits turning at one rate look
           geared to each other, which is the pairing this section is trying to
           stop implying. */
        .cdb-spin--left { animation: cdb-turn 88s linear infinite; }
        .cdb-spin--right { animation: cdb-turn 71s linear infinite; }
        /* Held, not stopped dead: the far side pauses while the choice is made,
           which is what makes the choice look like it took a moment. */
        .cdb-spin.is-holding { animation-play-state: paused; }

        .cdb-seat {
          position: absolute; top: 50%; left: 50%;
          transform: rotate(var(--a)) translateX(var(--cdb-r));
        }

        /* Upright the whole way round, so a label is never read at an angle. The
           counter-turn has to be animated at the same period as the turn it is
           undoing, and in the same direction. */
        .cdb-card {
          position: absolute; top: 50%; left: 50%;
          display: block;
          /* Quiet. They are what was available, not what happened. */
          opacity: .28;
          transform: translate(-50%, -50%) rotate(calc(var(--a) * -1));
          transition: opacity .6s ease, border-color .6s ease, background-color .6s ease, color .6s ease, box-shadow .6s ease, scale .6s cubic-bezier(.16,1,.3,1);
        }

        /* The needs stay words. */
        .cdb-card--left {
          padding: 11px 16px; border-radius: 11px;
          border: 1px solid rgba(var(--lf-ink-rgb), calc(.07 + .93 * var(--lf-lift-e)));
          background: rgba(var(--lf-ink-rgb), calc(.04 + .96 * var(--lf-lift-f)));
          color: rgba(var(--lf-ink-rgb), calc(.55 + .45 * var(--lf-lift-t)));
          font-size: 14px; white-space: nowrap;
        }

        /* ---------- the model cards ----------

           210.554 × 119.314 with a 21.933 radius, which are the file's numbers
           rather than rounded ones — at this size the difference is invisible and
           the provenance is not, and the next person to open the design should
           find the same figures.

           The chosen state is the same card scaled by 1.516 rather than a second
           card with its own dimensions. That number is not chosen either: the
           design's active radius is 33.247, and 33.247 / 21.933 is 1.516. Scaling
           makes the mark, the radius and the padding all land on the design's
           active values at once, which no amount of hand-set widths would. */
        .cdb-card--right {
          display: grid; place-items: center; overflow: hidden;
          width: 210.554px; height: 119.314px;
          border-radius: 21.933px;
          background: #3a3a3a;
        }
        .cdb-card--right img { display: block; height: auto; }
        /* Qwen and MiniMax are the whole card in one file — see the note on
           MODELS — so they fill it instead of sitting inside it. */
        .cdb-card--right.is-whole img { width: 100%; height: 100%; }

        /* Orange, and the mark on it is white in the file for exactly this. */
        .cdb-card--right.is-lit {
          background: #ce6339;
          scale: 1.516;
          box-shadow: 0 0 46px rgba(var(--lf-accent-rgb), calc(.26 * var(--lf-glow)));
        }
        .cdb-card--left { animation: cdb-unturn-left 88s linear infinite; }
        .cdb-card--right { animation: cdb-unturn-right 71s linear infinite; }
        .cdb-spin.is-holding .cdb-card { animation-play-state: paused; }

        /* The need does not go orange. It becomes legible — the accent is kept
           for the orb, the chosen model and the signal, so that three things and
           not five are carrying it. */
        .cdb-card--left.is-lit {
          opacity: 1;
          border-color: rgba(var(--lf-ink-rgb), calc(.22 + .78 * var(--lf-lift-e)));
          background: var(--lf-surface);
          color: var(--lf-ink);
        }
        .cdb-card.is-lit { opacity: 1; }

        @keyframes cdb-turn { to { transform: rotate(360deg); } }
        @keyframes cdb-unturn-left {
          from { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1)); }
          to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg)); }
        }
        @keyframes cdb-unturn-right {
          from { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1)); }
          to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg)); }
        }

        /* ---------- the signal in ---------- */

        /* A soft streak that crosses from the left field into the orb and is gone.
           It is not anchored to a card, and that is deliberate: anchored, it
           would be a line from one card to the middle, and a line from one card
           is the beginning of a line between two. */
        .cdb-signal {
          position: absolute; top: 50%; left: calc(50% - 300px);
          width: 230px; height: 76px;
          transform: translateY(-50%);
          border-radius: 999px;
          background: radial-gradient(closest-side at 20% 50%,
            rgba(var(--lf-accent-rgb), calc(.5 * var(--lf-glow))), transparent 100%);
          filter: blur(18px);
          opacity: 0;
        }
        .cdb-signal.is-on { animation: cdb-travel 900ms cubic-bezier(.32,0,.2,1) forwards; }
        @keyframes cdb-travel {
          0% { opacity: 0; translate: -40px 0; }
          35% { opacity: 1; }
          100% { opacity: 0; translate: 250px 0; }
        }

        /* ---------- the orb ---------- */

        .cdb-orb {
          position: absolute; top: 50%; left: 50%; z-index: 2;
          transform: translate(-50%, -50%);
        }
        .cdb-orb.is-taking { animation: cdb-pulse 1s cubic-bezier(.16,1,.3,1); }
        @keyframes cdb-pulse {
          0% { scale: 1; }
          34% { scale: 1.08; }
          100% { scale: 1; }
        }

        /* ---------- what comes out ---------- */

        .cdb-spill {
          position: absolute; top: calc(50% + 42px); left: 50%; z-index: 1;
          width: 400px; height: 280px;
          transform: translateX(-50%);
          clip-path: polygon(43% 0, 57% 0, 100% 100%, 0 100%);
          background: linear-gradient(to bottom,
            rgba(var(--lf-accent-rgb), calc(.3 * var(--lf-glow))) 0%,
            rgba(var(--lf-accent-rgb), calc(.11 * var(--lf-glow))) 44%,
            transparent 92%);
          filter: blur(16px);
          opacity: 0; transition: opacity .8s ease;
        }
        .cdb-spill.is-on { opacity: 1; }

        .cdb-answer {
          position: absolute; top: calc(50% + 176px); left: 50%; z-index: 2;
          width: 320px; margin: 0;
          transform: translateX(-50%);
          text-align: center; color: var(--lf-ink);
          font-size: 21px; line-height: 1.3; font-weight: 500;
        }

        @media (prefers-reduced-motion: reduce) {
          .cdb-spin, .cdb-card { animation: none; }
          .cdb-orb.is-taking { animation: none; }
          .cdb-signal.is-on { animation: none; opacity: .8; }
        }

        /* The orbits are 600 across and the answer is 320: below this they start
           sharing pixels. The orbits go and the three things that carry the
           argument stay. */
        @media (max-width: 1240px) {
          .cdb-orbit { display: none; }
          .cdb-stage { height: 420px; }
          .cdb-signal { display: none; }
        }

        @media (max-width: 760px) {
          .cdb-heading h2 { font-size: 32px; }
          .cdb-stage { height: 380px; }
          .cdb-answer { width: 100%; font-size: 19px; }
        }
      `}</style>
    </section>
  );
}
