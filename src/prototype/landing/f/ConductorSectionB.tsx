import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { Container } from "../../Container";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { buildCarousel } from "./ellipticalCarousel";
import openAiMark from "../../../../design/assets/images/svgs/conductor/ChatGPT.svg";
import claudeMark from "../../../../design/assets/images/svgs/conductor/Claude.svg";
import geminiMark from "../../../../design/assets/images/svgs/conductor/Gemini.svg";
import qwenMark from "../../../../design/assets/images/svgs/conductor/Qwen.svg";
import deepSeekMark from "../../../../design/assets/images/svgs/conductor/Deepseek.svg";
import grokMark from "../../../../design/assets/images/svgs/conductor/Grok-feb-2025-logo logo.svg";
import miniMaxMark from "../../../../design/assets/images/svgs/conductor/MiniMax.svg";
import kimiMark from "../../../../design/assets/images/svgs/conductor/Kimi.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Conductor.
 *
 * One ring of models with the claim standing inside it. Earlier passes put the
 * needs on the left and the models on the right with the orb between them, and
 * the geometry kept saying the wrong thing: two lit cards facing each other
 * across a middle reads as a pairing, as this-goes-with-that, which makes the
 * orb a junction rather than a decision. Splitting the composition in two was
 * the cause, so the composition is no longer split.
 *
 * What replaced it is a single carousel and one privileged slot at the top. The
 * cards lean with the ring, which means the card at twelve o'clock is the only
 * upright one — the chosen model is legible and the other eight are visibly on
 * their way past. That falls out of the geometry instead of being a state, so
 * there is nothing to keep in sync and nothing that can be lit at the wrong
 * moment.
 *
 * It is also driven rather than performed. An earlier version acted the argument
 * out on a six-beat timer, which could only say its piece once, to whoever
 * happened to be looking. Drag it, throw it, click a card or just scroll past —
 * whatever reaches the top is the answer, every time.
 */

/**
 * What it can reach.
 *
 * Every logo is the exported artwork, not a redraw. `art` is the file in
 * public/models/ and `w` is the mark's width as a fraction of the card, taken
 * off the design rather than eyeballed: OpenAI is 129.707 of 210.554, Kimi is
 * 103.523, and so on. That is what keeps nine marks of very different
 * proportions looking like one set.
 *
 * The rule behind those fractions is one height, not one width: every `w` is the
 * mark's aspect ratio times 0.1435 of the card, which is the height Gemini
 * stands at. Nine wordmarks sharing a width read as nine different sizes; nine
 * sharing a height read as a set.
 *
 * Qwen and MiniMax used to be exceptions. The old public/models/ artwork for
 * those two was flattened with the card ground baked in, so they were marked
 * `whole` and drawn edge to edge. The conductor exports replaced that artwork
 * with plain white marks and the flag outlived its reason, which is why those
 * were the only two cards with no margin around the mark. Both are ordinary
 * cards now, and `whole` is gone with them.
 *
 * `lit` is the ground the card takes when it is the chosen one. It is the
 * provider's own colour, so the answer is recognisable at a glance rather than
 * being nine identical cards that take turns going orange.
 */
const MODEL_ASSETS = {
  "openai-wordmark.svg": openAiMark,
  "claude-wordmark.svg": claudeMark,
  "gemini-wordmark.svg": geminiMark,
  "qwen-card.svg": qwenMark,
  "deepseek.svg": deepSeekMark,
  "grok.svg": grokMark,
  "minimax-card.svg": miniMaxMark,
  "kimi-wordmark.svg": kimiMark,
} as const;

type Model = { name: string; art: keyof typeof MODEL_ASSETS; w: number; brand: string };

const MODELS: Model[] = [
  { name: "OpenAI", art: "openai-wordmark.svg", w: 0.622, brand: "#10A37F" },
  { name: "Claude", art: "claude-wordmark.svg", w: 0.673, brand: "#D97757" },
  {
    name: "Gemini",
    art: "gemini-wordmark.svg",
    w: 0.628,
    brand: "linear-gradient(115deg, #4285F4 0%, #9B72CB 38%, #EA4335 72%, #FBBC05 100%)",
  },
  // No Grok. public/models/grok-wordmark.svg is the SpaceX wordmark under
  // another name — its root group is still <g id="Spacexai"> — so the entry that
  // used to be here drew SpaceX a second time and Grok never appeared at all.
  // Export real Grok artwork and it can come back as a ninth card; until then
  // naming a model the ring cannot actually show would be the worse bug.
  { name: "Qwen", art: "qwen-card.svg", w: 0.488, brand: "#615CED" },
  { name: "DeepSeek", art: "deepseek.svg", w: 0.881, brand: "#4D6BFE" },
  { name: "MiniMax", art: "minimax-card.svg", w: 0.6, brand: "#1456F0" },
  { name: "Kimi", art: "kimi-wordmark.svg", w: 0.42, brand: "#007CFF" },
  { name: "Grok", art: "grok.svg", w: 0.377, brand: "#111111" },
];

/**
 * Two laps of the eight, so the ring is a ring rather than eight cards with gaps
 * between them. Sixteen seats is 22.5° apart, which is what sets the card size
 * below: any wider and the chosen card overlaps the two beside it.
 */
const LAPS = 2;
const SEATS = Array.from({ length: LAPS }, (_, lap) =>
  MODELS.map((model) => ({ ...model, lap })),
).flat();

/**
 * The card, at 0.641 of the design's numbers.
 *
 * The design draws it 210.554 × 119.314 with a 21.933 radius, and gives the
 * chosen one a 33.247 radius — 33.247 / 21.933 is 1.516, which is where
 * LIT_SCALE comes from, and scaling rather than re-dimensioning makes the mark,
 * the radius and the padding all land on the design's active values at once.
 *
 * 0.641 is what makes the chosen card come back to 135 × 1.516 = 205 wide, which
 * is the size it is drawn at. It also has to clear its neighbours: the chosen
 * card and a resting one together span (205 + 135) / 2 = 170px, against seats
 * 2 · RING_R · sin(11.25°) = 178px apart. That 8px is the whole margin, and it
 * is why the ring holds sixteen seats rather than eighteen — at 20° apart the
 * chosen card runs into both of them, which is the one place in this composition
 * where a collision is impossible to miss.
 */
const CARD_SCALE = 0.641;
const CARD_W = 210.554 * CARD_SCALE;
const CARD_H = 119.314 * CARD_SCALE;
const CARD_R = 21.933 * CARD_SCALE;
const LIT_SCALE = 1.516;

/**
 * The ring, in pixels from the top of the stage.
 *
 * Its centre sits well below the orb, so what shows is the top of the circle
 * with the cards falling away on both sides — the claim stands in the open part
 * of it. RING_PAD is the margin the field needs beyond the rim: a card on the
 * rim has half its width outside the radius, and outside the element is outside
 * the mask.
 */
const STAGE_H = 700;
const RING_R = 520;
const RING_PAD = 140;
const RING_Y = 590;
/** the orb, and the centre of the warmth behind the claim */
const ORB_Y = 460;

/**
 * A step, and the hold after it.
 *
 * The hold is the longer of the two on purpose, and getting that backwards is
 * what made the whole thing look broken. With a slow step and a short rest the
 * ring is in transit almost all the time: the chosen card grows and lights while
 * it is still travelling, sweeps through twelve o'clock without stopping, and
 * has already begun to dim by the time it is anywhere near centred. Measured, it
 * spent every moment between +11° and −11° of the slot and none at all in it.
 *
 * So it steps quickly and then stands still. The card arrives at the top, holds
 * there long enough to be read as the answer, and only then does the ring move
 * on — which is the difference between a carousel and a thing that spins.
 */
const STEP_SECONDS = 0.9;
// Each selected model remains highlighted for 1.5 seconds before the next step.
const REST_SECONDS = 1.5;

/** pixels of scrolling that advance the ring by one card */
const SCROLL_PER_STEP = 260;

export function ConductorSectionB() {
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, { once: true, amount: 0.35 });

  const cardRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (!section || cards.length !== SEATS.length || cards.some((el) => !el)) return;
    const targets = cards as HTMLSpanElement[];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * Exactly one card is ever chosen, and it is always the one standing at the
     * top of the ring.
     *
     * The carousel's own onActivate/onDeactivate cannot express that, because
     * they fire at the halfway point between two seats — so the highlight jumps
     * to a card that is still 11° short of the top and rides in with it, while
     * the one it took over from is 11° past and still fading. For most of a step
     * that reads as two half-lit cards and none of them where the eye is looking.
     *
     * Tying it to the step instead — dim when the ring starts turning, light
     * whatever has arrived when it stops — means the highlight only ever exists
     * on a card that is stationary at the top. The ring goes quiet while it
     * turns, which is honest: mid-turn there is no answer yet.
     *
     * Scale is GSAP's rather than the stylesheet's, and it has to be: CSS's
     * standalone `scale` property is composed before `transform`, so it would
     * multiply the x/y the carousel writes and push the chosen card outward off
     * its own orbit. Driving both through one transform keeps them separate.
     */
    let litEl: HTMLElement | null = null;

    const light = (el: HTMLElement) => {
      if (litEl === el) return;
      litEl = el;
      el.classList.add("is-lit");
      gsap.to(el, { scale: LIT_SCALE, duration: 0.42, ease: "power2.out", overwrite: "auto" });
    };

    const dim = () => {
      const el = litEl;
      if (!el) return;
      litEl = null;
      el.classList.remove("is-lit");
      gsap.to(el, { scale: 1, duration: 0.32, ease: "power2.out", overwrite: "auto" });
    };

    const carousel = buildCarousel(targets, {
      radiusX: RING_R,
      radiusY: RING_R,
      // twelve o'clock, which with rotateItems is the one slot that reads level
      activeAngle: -90,
      rotateItems: true,
      draggable: !reduced,
      autoAdvance: reduced ? undefined : REST_SECONDS,
      stepVars: { duration: STEP_SECONDS, ease: "power2.inOut" },
      // Clicking a card brings it up the way the ring already turns, even when
      // going the other way round would be shorter — see the note on onScroll.
      onClick: (el, self) => self.to(el, { duration: 1, ease: "power2.out" }, "ccw"),
      onStart: dim,
      onStop: light,
    });

    // The helper never fires a callback for the card it starts on: its initial
    // active element already equals the one it is asked to settle on, so the
    // change it watches for does not happen. Without this the ring opens with
    // nothing chosen and stays that way until the first step lands — which is
    // most of the time anybody spends looking at it.
    light(carousel.activeElement());

    // Scrolling turns it — always the same way, whichever way the page is going.
    //
    // Mapping scroll direction onto rotation direction was worse than it sounds:
    // reading down the page and then nudging back up made the ring stop and run
    // backwards, so the models appeared to un-choose themselves. Nobody asked it
    // to reverse; they just scrolled.
    //
    // It advances by distance travelled rather than per event, because a step is
    // now short: firing one on every scroll event would restart the tween sixty
    // times a second and the ring would never come to rest at all, which is the
    // problem the short step exists to fix.
    let onScreen = false;
    let lastY = window.scrollY;
    let travelled = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (onScreen) {
        travelled += Math.abs(y - lastY);
        if (travelled >= SCROLL_PER_STEP) {
          travelled = 0;
          carousel.next();
        }
      }
      lastY = y;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        lastY = window.scrollY;
      },
      { threshold: 0 },
    );
    io.observe(section);

    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      carousel.kill();
      gsap.killTweensOf(targets);
      // kill() does not deactivate, so the chosen card would keep its class and
      // its transform into the next mount — which StrictMode makes routine in dev.
      targets.forEach((el) => el.classList.remove("is-lit"));
      gsap.set(targets, { clearProps: "transform" });
    };
  }, []);

  return (
    <section ref={sectionRef} className="cdb-section" aria-labelledby="cdb-title">
      <Container>
        <div className="cdb-stage">
          <span className="cdb-halo" aria-hidden="true" />

          <div className="cdb-ring">
            <div className="cdb-track">
              {SEATS.map((model, i) => (
                <span
                  key={`${model.name}-${model.lap}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="cdb-card"
                  style={{ ["--brand" as string]: model.brand }}
                  // The second lap is the same nine again, so it is named once.
                  {...(model.lap === 0
                    ? { role: "img", "aria-label": model.name }
                    : { "aria-hidden": true })}
                >
                  <img
                    src={MODEL_ASSETS[model.art]}
                    alt=""
                    draggable={false}
                    style={{ width: `${model.w * 100}%` }}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Two elements, and they have to stay two: the centring lives on the
              outer one because Motion writes the inner one's transform outright
              on every frame, and a translateX(-50%) written in CSS next to it is
              simply overwritten — which parks the whole claim half its own width
              to the right of the ring it is supposed to stand inside. */}
          <div className="cdb-core">
            <motion.div
              className="cdb-core-in"
              initial={{ opacity: 0, y: 14 }}
              animate={seen ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <p className="cdb-eyebrow">Your request. A model picked for the task.</p>
              <h2 id="cdb-title">Not sure which model to use?</h2>
              <p className="cdb-body">
                Starchild can pick the best AI model
                <br />
                for your task, saves money and time
              </p>
              <PresenceOrb state="resting" size={36} className="cdb-orb" />
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        /* The stage supplies the visual breathing room. Keeping the outer padding
           compact stops this carousel from creating a second, oversized gap before
           the 200px rhythm that separates landing sections. */
        .cdb-section { position: relative; padding: 48px 0 56px; background: transparent; font-family: var(--font-google-sans); overflow: hidden; }

        .cdb-stage { position: relative; height: ${STAGE_H}px; }

        /* ---------- the ring ---------- */

        /* Centred on RING_Y rather than on the stage, so what the stage shows is
           the top of the circle and the claim stands in the open middle of it. */
        .cdb-ring {
          position: absolute; top: ${RING_Y}px; left: 50%; z-index: 1;
          width: ${(RING_R + RING_PAD) * 2}px;
          height: ${(RING_R + RING_PAD) * 2}px;
          margin: ${-(RING_R + RING_PAD)}px 0 0 ${-(RING_R + RING_PAD)}px;
          pointer-events: none;
          /* Solid over the top of the circle and gone by the bottom of it: cards
             dissolve as they come round past the horizontal instead of piling up
             underneath the claim. The mask is on the still field, not the turning
             track — on the turning one it turns with the cards and nothing ever
             fades. */
          -webkit-mask-image: linear-gradient(to bottom, #000 0 44%, transparent 62%);
          mask-image: linear-gradient(to bottom, #000 0 44%, transparent 62%);
        }
        .cdb-track { position: absolute; inset: 0; }

        /* Stacked at the centre and spread from there by the carousel, which owns
           the transform outright — no translate, no rotate and no scale in here,
           or they would compose with what it writes. */
        .cdb-card {
          position: absolute; top: 50%; left: 50%; z-index: 1;
          display: grid; place-items: center; overflow: hidden;
          width: ${CARD_W}px; height: ${CARD_H}px;
          border-radius: ${CARD_R}px;
          background: var(--brand);
          /* Quiet brand colours show the available models without competing
             with the selected card. */
          opacity: .52;
          pointer-events: auto;
          cursor: grab;
          will-change: transform;
          transition: opacity .34s ease, background .34s ease;
        }
        .cdb-card:active { cursor: grabbing; }
        .cdb-card img { display: block; height: auto; user-select: none; }
        /* The chosen card resolves to its provider's own ground. */
        .cdb-card.is-lit {
          z-index: 2;
          opacity: 1;
          background: var(--brand);
        }
        .cdb-card.is-lit img { filter: brightness(0) invert(1); }

        /* ---------- what stands inside it ---------- */

        .cdb-halo {
          position: absolute; top: ${ORB_Y}px; left: 50%; z-index: 0;
          width: 560px; height: 400px;
          transform: translate(-50%, -50%);
          background: radial-gradient(closest-side,
            rgba(var(--lf-accent-rgb), calc(.13 * var(--lf-glow))), transparent 100%);
          filter: blur(34px);
          pointer-events: none;
        }

        /* Wide enough for the headline to hold one line — it is 620px set — while
           the supporting line is capped much shorter so it breaks where it is
           written to break, under the headline rather than across its full width. */
        .cdb-core {
          position: absolute; top: 316px; left: 50%; z-index: 3;
          width: 100%; max-width: 700px;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .cdb-core-in {
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }
        .cdb-eyebrow {
          margin: 0 0 13px; color: var(--lf-accent-ink);
          font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
        }
        /* This file is shared with the archived versions on app.html, so the
           rule above stays as those versions set it and the design system's
           subtitle role is added behind data-ds rather than replacing it.

           text-transform alone gives full capitals — it rewrites the characters
           before the font ever sees them, and nothing downstream knows the line
           was sentence case. all-small-caps is the other half: it asks Google
           Sans for c2sc, which the file carries, so the capitals come back at
           x-height. Tracking comes down with them — .16em was set to open up
           full caps and is too much once they are small. */
        .lf[data-ds] .cdb-eyebrow {
          font-variant-caps: all-small-caps;
          font-size: var(--text-sm);
          font-weight: var(--weight-medium);
          letter-spacing: var(--tracking-wide);
          color: var(--text-brand);
        }
        .cdb-core h2 {
          margin: 0; color: var(--lf-ink);
          font-size: 38px; line-height: 1.16; font-weight: 500; letter-spacing: -.01em;
        }
        .cdb-body {
          margin: 12px 0 0; max-width: 280px;
          color: rgba(var(--lf-ink-rgb), calc(.62 + .38 * var(--lf-lift-t)));
          font-size: 13px; line-height: 1.45;
        }
        .cdb-orb { margin-top: 8px; }

        @media (prefers-reduced-motion: reduce) {
          .cdb-card { cursor: default; }
        }

        /* The ring is 1135 across at the rim. Below this it stops fitting the
           gutters, so it goes and the claim it was arranged around stays — at
           full size, rather than scaled down until the body copy is unreadable. */
        @media (max-width: 1280px) {
          .cdb-ring { display: none; }
          .cdb-stage { height: 320px; }
          .cdb-core { top: 50%; transform: translate(-50%, -50%); }
          .cdb-halo { top: 50%; width: 480px; height: 340px; }
        }

        @media (max-width: 760px) {
          .cdb-core h2 { font-size: 28px; }
        }
      `}</style>
    </section>
  );
}
