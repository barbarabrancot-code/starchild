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
  visual: "website" | "video" | "crm" | "endless";
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
    title: "Video",
    subtitle: "Editing and color grading",
    visual: "video",
    body: "Create a LUT based on reference images and the camera model, the color space",
  },
  {
    index: "03",
    title: "CRM",
    subtitle: "Outreach management",
    visual: "crm",
    body: "Build us an outreach CRM similar to what we use in monday.com.",
  },
  {
    index: "04",
    title: "Endless possibilities",
    subtitle: "Whatever you need",
    visual: "endless",
    body: "I need...",
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
                {card.visual ? (
                  <>
                    <div className="sc-website-copy">
                      <h3 className="sc-website-title">
                        <span>{card.title}</span>
                        <span>{card.subtitle}</span>
                      </h3>
                      <p className="sc-website-body">{card.body}</p>
                    </div>
                    <div className={`sc-website-visual sc-website-visual--${card.visual}`} aria-label={`Starchild creates a ${card.title.toLowerCase()} from a request`}>
                      {card.visual === "website" && <img className="sc-website-browser" src={macUi} alt="Wedding photographer website preview" />}
                      {card.visual === "video" && <div className="sc-mock-browser sc-mock-browser--video" aria-hidden="true"><span>Video.mp4</span><i /><b /></div>}
                      {card.visual === "crm" && <div className="sc-mock-browser sc-mock-browser--crm" aria-hidden="true"><span>Preview</span><strong>B</strong><div><b>Outreach CRM</b><small>This board is invite-only. Ask an admin on your team for an invite link.</small></div></div>}
                      {card.visual === "endless" && <img className="sc-website-character--large" src={processingIndicator} alt="" aria-hidden="true" />}
                      <div className="sc-website-conversation">
                        <p className="sc-message sc-message--incoming">{card.visual === "website" ? <>I&apos;m a wedding photographer<br />and I really need a website</> : card.body}</p>
                        <p className="sc-message sc-message--outgoing">{card.visual === "website" ? <>Your website is ready and<br />in the air! Take a look</> : card.visual === "video" ? <>Your file cube is ready.<br />Take a look:</> : card.visual === "crm" ? <>Your outreach CRM is ready. Track prospects, manage pipeline stages,<br />and stay on top of follow-ups in one place.</> : <>Tell me what you have in mind.<br />We&apos;ll figure out the rest.</>}</p>
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

        /* The stack reads as a climb up the system's grey scale: each card is
           dealt one step lighter than the one it covers, so the deal has a
           direction of its own and the two cards on screen at any moment are
           never the same colour. The ramp stops at surface-3 — surface-4 and
           above are the border steps, and a card filled with one loses its own
           border.

           Redefining the surface roles on the card, rather than setting a
           background on it, is what carries the step inwards: the mock browser
           reads --bg-surface for its chrome and --bg-surface-alt for its fill,
           so it keeps the same one-step lift above its card on all four. */
        .sc-card:nth-child(1) { --bg-surface: var(--color-surface-0); --bg-surface-alt: var(--color-surface-1); }
        .sc-card:nth-child(2) { --bg-surface: var(--color-surface-1); --bg-surface-alt: var(--color-surface-2); }
        .sc-card:nth-child(3) { --bg-surface: var(--color-surface-2); --bg-surface-alt: var(--color-surface-3); }
        .sc-card:nth-child(4) { --bg-surface: var(--color-surface-3); --bg-surface-alt: var(--color-surface-4); }

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
        .sc-card-in--website, .sc-card-in--video, .sc-card-in--crm, .sc-card-in--endless {
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
        /* The window is the one from design/assets/images/svgs/macui.svg, which
           the website card above renders directly. That file is a 1.8MB SVG —
           chrome plus a screenshot baked in as base64 — so it is quoted here
           rather than imported a second time: same titlebar height, same
           radius, same stroke, same three lights, measured off its 594×320
           frame and scaled to this 362px box (×0.609).

           These are macOS greys, not system surfaces, and that is deliberate —
           the frame reads as somebody else's window, which is the whole point
           of putting the work inside one. The card behind it is on the system;
           only the chrome is not. */
        .sc-mock-browser {
          --chrome-h: 15px;
          position: absolute; left: 0; bottom: 0; width: min(52%, 362px); height: 196px;
          overflow: hidden; border: 1px solid #2a2a2a; border-radius: 5px;
          background: var(--bg-surface-alt); color: var(--text-primary);
        }
        .sc-mock-browser > span {
          position: absolute; inset: 0 0 auto; z-index: 2; height: var(--chrome-h);
          display: grid; place-items: center;
          background: #1e1e1e; color: rgba(235,235,245,.6);
          font-size: 8px; line-height: 1;
        }
        /* The three lights, at macui.svg's spacing: 4.75r on 15.8 centres,
           scaled — 2.9px radius, 9.6px apart, first centre 2.9px in. */
        .sc-mock-browser > span::before {
          content: ""; position: absolute; left: 4.8px; top: 50%;
          width: 25px; height: 6px; transform: translateY(-50%);
          background:
            radial-gradient(circle 2.9px at 2.9px 50%,  #ff5e57 99%, transparent 100%),
            radial-gradient(circle 2.9px at 12.5px 50%, #ffbb2e 99%, transparent 100%),
            radial-gradient(circle 2.9px at 22.1px 50%, #38c149 99%, transparent 100%);
        }
        .sc-mock-browser--video { background: linear-gradient(90deg, #8a7468 0 50%, #273345 50% 100%); }
        .sc-mock-browser--video::before { content: ""; position: absolute; inset: var(--chrome-h) 0 0; background: linear-gradient(180deg, rgba(8,13,20,.05) 0 50%, rgba(33,26,20,.42) 50%); }
        .sc-mock-browser--video i { position: absolute; z-index: 1; left: 27%; top: 51px; width: 34px; height: 105px; border-radius: 20px 20px 8px 8px; background: rgba(245,237,224,.72); }
        .sc-mock-browser--video b { position: absolute; z-index: 1; right: 18%; bottom: 32px; width: 74px; height: 3px; background: rgba(255,151,60,.75); }
        .sc-mock-browser--crm { background: #0d1018; }
        .sc-mock-browser--crm > strong { position: absolute; z-index: 1; top: 29px; left: 50%; width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; transform: translateX(-50%); background: #61729a; color: white; font-size: 15px; }
        .sc-mock-browser--crm > div { position: absolute; z-index: 1; top: 63px; left: 50%; width: min(70%, 230px); padding: 16px; border: 1px solid #263246; border-radius: var(--radius-md); transform: translateX(-50%); background: #151b29; }
        .sc-mock-browser--crm > div b, .sc-mock-browser--crm > div small { display: block; }
        .sc-mock-browser--crm > div b { color: #e8ecf6; font-size: 11px; }
        .sc-mock-browser--crm > div small { margin-top: 7px; color: #8b96ae; font-size: 8px; line-height: 1.3; }
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
        .sc-website-character--large {
          position: absolute; left: 27%; bottom: -16px; width: 210px; height: 210px; object-fit: contain;
        }
        .sc-website-visual--endless .sc-website-character { display: none; }

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
          .sc-card-in--website, .sc-card-in--video, .sc-card-in--crm, .sc-card-in--endless { min-height: 0; padding: var(--space-6); }
          .sc-website-visual {
            display: grid; height: auto; margin-top: var(--space-5); gap: var(--space-4);
          }
          .sc-website-browser { position: static; width: 100%; }
          .sc-mock-browser { position: relative; left: auto; bottom: auto; width: 100%; }
          .sc-website-conversation {
            position: relative; right: auto; bottom: auto; width: 100%; min-height: 130px;
          }
          .sc-website-character { left: 22px; bottom: 0; }
          .sc-website-character--large { left: 10%; bottom: -8px; width: 160px; height: 160px; }
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
