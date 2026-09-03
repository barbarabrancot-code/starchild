import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../../Container";
import useCaseShot from "../../../../assets/images/Imagem do Codex 30 de ago. de 2026, 23_47_28.png";

type UseCase = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  description: string;
  prompt: string;
};

const CASES: UseCase[] = [
  { id: "context", tab: "Remember context", eyebrow: "Conversation", title: "Talk to an AI that remembers you.", description: "Keep context across conversations instead of starting over.", prompt: "Can we keep working from where we left off?" },
  { id: "decision", tab: "Make a decision", eyebrow: "Decisions", title: "Make a decision with the full picture.", description: "Turn a messy choice into clear options and a sensible next step.", prompt: "Help me choose between these two plans." },
  { id: "research", tab: "Research something", eyebrow: "Research", title: "Research without losing the thread.", description: "Bring together the useful details, sources, and questions that matter.", prompt: "What should I know before I start this?" },
  { id: "draft", tab: "Create a draft", eyebrow: "Create", title: "Turn an idea into a first draft.", description: "Move from a thought to a page, plan, or document you can improve.", prompt: "Turn this rough idea into a clear first draft." },
  { id: "track", tab: "Keep track", eyebrow: "Keep moving", title: "Keep track of what matters.", description: "Let Starchild watch for changes, follow-ups, and work that should not stall.", prompt: "Keep an eye on this and tell me when something changes." },
  { id: "tools", tab: "Work across tools", eyebrow: "Connected work", title: "Work across the tools you already use.", description: "Bring context together instead of moving information from app to app yourself.", prompt: "Pull the useful updates together and tell me what needs a reply." },
];

/**
 * The picture, in place of the interface that was drawn here in CSS.
 *
 * What it replaces was a mock — a chrome bar, a nav, a context block, a prompt
 * and an answer, all built from the case's own fields, and all of it standing in
 * for artwork that did not exist yet. The artwork exists, so the stand-in goes.
 *
 * It carries its own card: the rounded dark panel and the ground around it are
 * painted into the file, which is why nothing here draws a frame around it. It
 * is also portrait where the column is landscape, so it is fitted by height and
 * centred rather than cropped to fill — the flyer is the subject and cropping it
 * to a wide box would take the top and bottom off the thing being shown.
 *
 * One picture, six cases: the copy on the right changes with the arrows and this
 * does not. A second file dropped in per case is the way that changes.
 */
function ProductPreview({ useCase }: { useCase: UseCase }) {
  return (
    <div className="uc-preview">
      <img className="uc-preview-shot" src={useCaseShot} alt={`Starchild: ${useCase.title}`} />
    </div>
  );
}

export function UseCasesSection() {
  const [at, setAt] = useState(0);
  const active = CASES[at];
  const select = (index: number) => setAt((index + CASES.length) % CASES.length);

  return (
    <section className="uc-section" id="examples" aria-label="Ways to use Starchild">
      <Container className="uc-container">
        <div className="uc-stage" id="uc-active-panel" role="region" aria-label={active.tab}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.id} className="uc-preview-wrap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <ProductPreview useCase={active} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={active.id} className="uc-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <p className="uc-card-kind">{active.eyebrow}</p>
              <h3 className="uc-card-title">{active.title}</h3>
              <p className="uc-card-description">{active.description}</p>
              <div className="uc-controls"><span aria-live="polite">{at + 1} / {CASES.length}</span><div><button type="button" onClick={() => select(at - 1)} aria-label="Previous use case"><svg viewBox="0 0 28 12" width="24" height="11" fill="none" aria-hidden="true"><path d="M7 1.5L1.5 6l5.5 4.5M1.5 6H27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button><button type="button" onClick={() => select(at + 1)} aria-label="Next use case"><svg viewBox="0 0 28 12" width="24" height="11" fill="none" aria-hidden="true"><path d="M21 1.5L26.5 6l-5.5 4.5M26.5 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div></div>
            </motion.article>
          </AnimatePresence>
        </div>
      </Container>

      <style>{`
        .uc-section { padding: 60px 0 64px; background: transparent; font-family: var(--font-google-sans); }
        .uc-container { max-width: none !important; padding-right: 28px !important; padding-left: 28px !important; }
        .uc-card-kind { margin: 0; color: var(--lf-accent-ink); font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
        .uc-controls button:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }
        .uc-stage { position: relative; display: grid; grid-template-columns: minmax(0, 1.52fr) minmax(450px, 1fr); gap: 36px; max-width: 1510px; margin: 0 auto; align-items: stretch; }

        /* The glow under the preview's bottom-left corner.

           Anchored to the stage rather than to the preview, and that is the whole
           reason it is here and not one element in: the preview is the thing
           AnimatePresence swaps on every arrow press, so a glow living on it
           would fade out and back in each time you moved a slide. On the stage it
           is ambient — it belongs to the module, not to whichever case is up.

           The maths only works because the stage stretches: both cells take the
           height of the tallest, the preview's min-height of 650 makes it the
           tallest, so the stage's own bottom-left is the preview's bottom-left.
           left: 0 / top: 100% is that corner, and the translate puts the circle's
           centre on it rather than its corner.

           --lf-glow scales it the way it scales every other wash on this page,
           and on the light ground it multiplies: orange as pigment warming the
           clay, rather than as a lamp pushing it toward white. */
        .uc-stage::before {
          content: ""; position: absolute; left: 0; top: 100%; z-index: 0;
          width: 780px; height: 780px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: radial-gradient(circle,
            rgba(var(--lf-accent-rgb), calc(.22 * var(--lf-glow))) 0%,
            rgba(var(--lf-accent-rgb), calc(.09 * var(--lf-glow))) 34%,
            rgba(var(--lf-accent-rgb), 0) 70%);
        }
        .lf[data-lf="light"] .uc-stage::before { mix-blend-mode: multiply; }

        /* Above the glow. Without this the positioned pseudo-element paints over
           the card it is supposed to sit behind. */
        .uc-preview-wrap, .uc-card { position: relative; z-index: 1; min-width: 0; }
        /* No border, no ground, no shadow: the file has all three painted into
           it, and a frame around a picture of a framed thing is two cards. */
        .uc-preview { display: grid; place-items: center; min-height: 650px; }
        .uc-preview-shot { display: block; width: auto; height: 100%; max-width: 100%; max-height: 650px; object-fit: contain; }
        .uc-card { display: flex; flex-direction: column; min-height: 650px; box-sizing: border-box; padding: 42px 48px; border: 1px solid rgba(var(--lf-ink-rgb), calc(.11 + .89 * var(--lf-lift-e))); border-radius: 20px; background: var(--lf-surface); box-shadow: var(--lf-shadow); }
        .uc-card-title { margin: 24px 0 0; color: var(--lf-ink); font-size: 46px; font-weight: 500; line-height: 1.08; letter-spacing: -.025em; text-wrap: balance; }
        .uc-card-description { margin: 28px 0 0; color: rgba(var(--lf-ink-rgb), calc(.65 + .35 * var(--lf-lift-t))); font-size: 21px; line-height: 1.48; }
        .uc-controls { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 22px; border-top: 1px solid rgba(var(--lf-ink-rgb), calc(.08 + .92 * var(--lf-lift-e))); color: rgba(var(--lf-ink-rgb), calc(.43 + .57 * var(--lf-lift-t))); font-size: 11px; font-weight: 500; }
        .uc-controls > div { display: flex; gap: 4px; }
        .uc-controls button { display: grid; place-items: center; width: 34px; height: 32px; padding: 0; border: 1px solid var(--lf-ctl-edge); border-radius: 8px; background: transparent; color: var(--lf-accent-ink); cursor: pointer; transition: border-color .18s ease, background .18s ease, transform .18s ease; }
        .uc-controls button:hover { border-color: var(--lf-accent); background: rgba(var(--lf-accent-rgb), .08); transform: translateY(-1px); }
        @media (max-width: 1000px) {
          .uc-section { padding: 86px 0; }
          .uc-stage { grid-template-columns: minmax(300px, 356px) minmax(0, 1fr); gap: 40px; max-width: 640px; align-items: center; }
          /* The picture stays — it was the empty slot beside it that existed only
             while there was no picture. It just gets shorter. */
          .uc-preview { min-height: 0; }
          .uc-preview-shot { height: auto; max-height: 420px; }
          /* The card it was measured against is gone here, so the glow comes
             down with the layout rather than sitting under a box that is now
             half the size. */
          .uc-stage::before { width: 460px; height: 460px; }
          .uc-card { min-height: 257px; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; justify-content: center; }
          .uc-card-kind, .uc-card-description, .uc-controls > span { display: none; }
          .uc-card-title { margin: 0; font-size: 28px; line-height: 1.14; }
          .uc-controls { justify-content: flex-start; margin-top: 18px; padding: 0; border: 0; }
          .uc-controls button { width: 28px; height: 24px; border: 0; border-radius: 0; background: transparent; color: var(--lf-accent); }
          .uc-controls button:hover { background: transparent; border-color: transparent; transform: none; opacity: .75; }
        }
        @media (max-width: 720px) { .uc-section { padding: 64px 0 74px; } .uc-container { padding-right: 16px !important; padding-left: 16px !important; } .uc-stage { grid-template-columns: minmax(0, 1fr); gap: 28px; max-width: 420px; } .uc-card { min-height: 0; } .uc-card-title { font-size: 30px; } }
        @media (prefers-reduced-motion: reduce) { .uc-controls button { transition: none; } }
      `}</style>
    </section>
  );
}
