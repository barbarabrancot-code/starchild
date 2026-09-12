import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import macUi from "../../../../design/assets/images/svgs/macui.svg";
import processingIndicator from "../../../../design/assets/images/svgs/Character_Processing_Indicator_300px_Dark_00000 1.svg";

gsap.registerPlugin(ScrollTrigger);

/**
 * The four claims, dealt one at a time.
 *
 * A pinned section that holds the page still while four cards are dealt onto a
 * stack: the next one slides up from below and covers the one before it, which
 * shrinks a little as it goes under. When the last card has landed the pin
 * releases and the page carries on.
 *
 * Why this rather than four cards in a row: a row is read as a list and skimmed
 * in one glance, which is the right shape for four features and the wrong one
 * for four claims that each need a sentence. Dealing them costs the reader the
 * scroll they were going to spend on this section anyway and buys each card a
 * moment where it is the only thing on the screen.
 *
 * ---------------------------------------------------------------------------
 * The deal runs at every viewport size. On mobile, the pin uses one stable
 * screen (`svh`) rather than relying on the browser chrome's changing viewport,
 * so each card gets its moment without a jump as the address bar moves.
 *
 * The only gate is prefers-reduced-motion. The CSS below repeats that condition
 * exactly: cards must leave the flow only while the timeline exists, or they
 * would pile up invisibly with nothing to deal them.
 */

type Card = {
  /** the support-scale index, not a heading — see the note on .sc-index */
  index: string;
  title: string;
  subtitle?: string;
  body: string;
  visual?: "website";
};

const CARDS: Card[] = [
  {
    index: "01",
    title: "Website",
    subtitle: "Design and development",
    body: "Connect supported apps to give Starchild more context for your task",
    visual: "website",
  },
  {
    index: "02",
    title: "Everything you already use",
    body: "Forty-odd connectors, so the work happens where it lives — your drive, your inbox, your calendar — instead of being pasted back and forth.",
  },
  {
    index: "03",
    title: "It remembers",
    body: "What you are working on, how you like it done, what you said last week. You stop re-explaining yourself at the start of every conversation.",
  },
  {
    index: "04",
    title: "Work that continues without you",
    body: "Hand a job to an agent and close the tab. It keeps going, and tells you when there is something only you can decide.",
  },
];

/** How much scroll each card past the first is given, as a share of the
 *  viewport. Under about 60 the deal reads as a jump cut; over about 110 the
 *  section starts to feel stuck. */
const SCROLL_PER_CARD = 85;

/** How far a card shrinks once it is covered. Small on purpose: enough to put
 *  it behind the new one, not enough to read as the card moving away. */
const COVERED_SCALE = 0.97;

export function StackedCardsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* gsap.context scopes every selector below to this section and, more to the
       point, records everything created inside it so one revert() undoes the
       lot — the timeline, the ScrollTrigger, the pin spacer it injects into the
       DOM and the inline transforms left on the cards. React 18 mounts effects
       twice in development, so anything less than that leaves a second pinned
       copy of the section behind. */
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".sc-card");
        if (cards.length < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            /* A function so it is recomputed on refresh rather than frozen at
               whatever the viewport was on first paint. "+=n%" is a share of
               the scroller height, so this is (cards - 1) × 85vh of scroll to
               get through the deal. */
            end: () => `+=${(cards.length - 1) * SCROLL_PER_CARD}%`,
            pin: true,
            scrub: true,
            /* The pin is applied a beat before it is reached, which is what
               stops the one-frame jump on a fast scroll into the section. */
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* Every card but the first is parked below the fold before the timeline
           is built, not by its own tween.

           A fromTo only renders its start values when it is the one being
           rendered, so on a timeline the card at position 0 is set and the
           cards at positions 1 and 2 are left exactly where CSS put them until
           their own beat arrives. They were therefore sitting on screen,
           stacked on each other in z-order, under the card that had not
           finished being the only one yet.

           Parking in viewport heights rather than in percentages of the card is
           the other half of it: a card is smaller than the screen, so 100% of
           its own height leaves the bottom of it showing below the stack. A
           function, so invalidateOnRefresh re-measures it on resize instead of
           holding the height the window had on first paint. */
        const parked = () => root.offsetHeight;
        gsap.set(cards.slice(1), { y: parked });

        cards.forEach((card, i) => {
          if (i === 0) return;

          /* Both halves of the same beat, placed at the same position on the
             timeline rather than queued one after the other: the card
             underneath shrinks exactly as the new one covers it.

             duration 1 against positions 0, 1, 2 so the beats are contiguous.
             At the default 0.5 each card would arrive in the first half of its
             share of the scroll and then nothing would happen for the second —
             which on a scrub reads as the section sticking.

             ease "none" throughout. The easing of a scrubbed timeline is the
             reader's own scrolling, and an ease on top of that makes the cards
             feel like they are resisting the wheel. */
          tl.to(cards[i - 1], { scale: COVERED_SCALE, duration: 1, ease: "none" }, i - 1)
            .fromTo(
              card,
              { y: parked },
              { y: 0, duration: 1, ease: "none" },
              i - 1
            );
        });
      });

      /* matchMedia's own cleanup runs when the query stops matching; ctx.revert
         below covers unmount, and reverting the context reverts it too. */
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section--lg sc-section" ref={rootRef} aria-label="What Starchild does">
      <div className="container">
        {/* An ordered list because the cards are dealt in an order and a screen
            reader should get that order too — the pin is the only thing that
            makes it a sequence visually, and the pin is not there for everyone. */}
        <ol className="sc-stack">
          {CARDS.map((card, i) => (
            <li
              className="sc-card"
              key={card.index}
              /* Later card, higher card. Set here rather than in CSS because it
                 is a fact about position in the list, and nth-child rules for it
                 would have to be rewritten every time a card is added. */
              style={{ zIndex: i + 1 }}
            >
              <div className={`sc-card-in${card.visual ? ` sc-card-in--${card.visual}` : ""}`}>
                {card.visual === "website" ? (
                  <>
                    <div className="sc-website-copy">
                      <h3 className="sc-website-title">
                        <span>{card.title}</span>
                        <span>{card.subtitle}</span>
                      </h3>
                      <p className="sc-website-body">{card.body}</p>
                    </div>
                    <div className="sc-website-visual" aria-label="Starchild builds a website from a request">
                      <img className="sc-website-browser" src={macUi} alt="Website preview" />
                      <div className="sc-website-conversation">
                        <p className="sc-message sc-message--incoming">I&apos;m a wedding photographer<br />and I really need a website</p>
                        <p className="sc-message sc-message--outgoing">Your website is ready and<br />in the air! Take a look</p>
                        <img className="sc-website-character" src={processingIndicator} alt="" aria-hidden="true" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="sc-index" aria-hidden="true">{card.index}</span>
                    <h3 className="sc-card-title">{card.title}</h3>
                    <p className="sc-card-body">{card.body}</p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        /* Everything here is the design system's: surfaces, borders, radius,
           spacing and the type roles. The only raw numbers are the geometry of
           the stack itself, which is what this section is. */

        .sc-section { position: relative; }

        .sc-stack {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: var(--space-5);
        }

        .sc-card { width: min(100%, 795px); margin: 0 auto; }

        .sc-card-in {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: var(--space-4);
          padding: var(--space-7) var(--space-6);
          background: var(--bg-surface);
          border: var(--border-width) solid var(--border-subtle);
          border-radius: var(--radius-xl);
        }
        .sc-card-in--website {
          display: block;
          min-height: 418px;
          padding: var(--space-7);
        }
        .sc-website-copy { position: relative; z-index: 1; }
        .sc-website-title {
          display: flex; flex-direction: column; margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 1.5rem + 1.1vw, 2.25rem);
          font-weight: var(--weight-regular); line-height: 1;
          letter-spacing: -0.04em;
        }
        .sc-website-title span:first-child { color: var(--text-primary); }
        .sc-website-title span:last-child { color: var(--text-secondary); }
        .sc-website-body {
          margin: var(--space-3) 0 0; color: var(--text-primary);
          font-size: var(--text-sm); line-height: var(--leading-normal);
        }
        .sc-website-visual {
          position: relative; height: 196px; margin-top: var(--space-7);
        }
        .sc-website-browser {
          position: absolute; left: 0; bottom: 0;
          width: min(52%, 362px); height: auto;
        }
        .sc-website-conversation {
          position: absolute; right: 0; bottom: 0; width: 244px;
          display: flex; flex-direction: column; align-items: flex-end;
          min-height: 176px; gap: var(--space-3);
        }
        .sc-message {
          margin: 0; width: fit-content; max-width: 100%;
          padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg);
          font-size: var(--text-xs); line-height: 1.25; letter-spacing: var(--tracking-normal);
        }
        .sc-message--incoming {
          background: var(--bg-inverse); color: var(--text-inverse);
          border-bottom-right-radius: var(--radius-sm);
        }
        .sc-message--outgoing {
          align-self: flex-start; margin-left: 14px;
          background: var(--gradient-message-outgoing);
          color: var(--text-primary); border-top-left-radius: var(--radius-sm);
        }
        .sc-website-character {
          position: absolute; left: 18px; bottom: -4px;
          width: 64px; height: 64px; object-fit: contain;
        }

        /* Support scale, not a type role: it is a counter, and setting it in
           one of the four would make it compete with the title beside it. */
        .sc-index {
          font-size: var(--text-sm);
          font-weight: var(--weight-medium);
          letter-spacing: var(--tracking-wide);
          color: var(--text-brand);
        }

        .sc-card-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: var(--text-title-2);
          font-weight: var(--weight-regular);
          line-height: var(--leading-title);
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
        }

        .sc-card-body {
          margin: 0;
          max-width: 48ch;
          font-size: var(--text-body);
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .sc-card-in--website { min-height: 0; padding: var(--space-6); }
          .sc-website-visual {
            display: grid; height: auto; margin-top: var(--space-5); gap: var(--space-4);
          }
          .sc-website-browser { position: static; width: 100%; }
          .sc-website-conversation {
            position: relative; right: auto; bottom: auto; width: 100%; min-height: 130px;
          }
          .sc-website-character { left: 22px; bottom: 0; }
        }

        /* ---------- the stack ----------

           This query is the CSS half of the gate in the effect above and has to
           stay identical to it. Inside it the cards leave the flow and sit on
           top of one another, which only makes sense while there is a timeline
           dealing them out; outside it they are an ordinary column.

           The cards are laid out with grid-area rather than position:absolute so
           the stack still sizes itself to its tallest card. An absolute card has
           no height to give its parent, which would leave the stack at zero and
           the pinned section empty. */
        @media (prefers-reduced-motion: no-preference) {
          .sc-stack {
            gap: 0;
            grid-template-areas: "stack";
            min-height: 58vh;
          }
          .sc-card {
            grid-area: stack;
            /* The transform GSAP writes is the whole animation, so the card has
               to be its own compositing layer and its own transform origin: from
               the top, because a card that shrinks toward its centre appears to
               lift off the stack rather than settle into it. */
            transform-origin: 50% 0%;
            will-change: transform;
          }
          /* Every card after the first starts below the fold — a screen down,
             not a card down, which is the same distance the effect parks them
             at. This covers the frame between first paint and the timeline
             being built; after that the inline transform GSAP writes wins. */
          .sc-card + .sc-card { transform: translateY(100vh); }

          /* Exactly one viewport, not at least one. A pinned element taller
             than the screen has a bottom nobody can scroll to — the scroll is
             being spent on the timeline — so the section's own block padding
             comes off here and the centring does that job instead. */
          .sc-section {
            display: flex;
            align-items: center;
            height: 100svh;
            padding-block: 0;
          }
          .sc-section > .container { width: 100%; }
        }
      `}</style>
    </section>
  );
}
