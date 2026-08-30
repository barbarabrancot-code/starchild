import type { TaskCard } from "../data";
import { HeroScreenF } from "./f/HeroScreenF";
import { ConversationShowcaseF } from "./f/ConversationShowcaseF";
import { OrbitSection } from "./f/OrbitSection";
import { ConductorSectionA } from "./f/ConductorSectionA";
import { FinalCtaSection } from "./FinalCtaSection";
import { FACES, OrbFace, type Mood } from "./f/OrbFace";

/**
 * Version F — four sections so far, on purpose.
 *
 * E was built top-down with D's sections underneath so the hero could be judged
 * against something. F starts the other way: the page ends where the finished
 * work ends, and nothing is here to fill space. A borrowed section under a new
 * hero is a comparison nobody asked for, and it makes the new one look like a
 * replacement part.
 *
 * Section 3 is the exception, and it is a decision rather than a stopgap: E's
 * orbit already says the one thing F needs said there, so it was brought over
 * and given F's own ground instead of being redrawn to look different. Anything
 * that arrives that way gets rewritten to belong here — see the concave panel in
 * OrbitSection — rather than imported from ./e and left as it was.
 *
 * Sections arrive here as their designs do.
 */

/**
 * `?faces=1` — the eight expressions laid out at once, for looking at.
 *
 * The same kind of thing as `?still=1` on version E: a review mode, not a second
 * design. On the page itself the face only ever shows one expression, and only
 * when something has caused it, so the only way to compare all eight side by side
 * is to ask for them.
 */
const SHEET = Object.keys(FACES) as Mood[];

function FaceSheet() {
  return (
    <div className="fs-sheet">
      {SHEET.map((mood) => (
        <div key={mood} className="fs-cell">
          <OrbFace mood={mood} size={150} />
          <span className="fs-name">{mood}</span>
        </div>
      ))}

      <style>{`
        .fs-sheet {
          min-height: 100vh; background: #050506;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 64px 40px; align-content: center;
          padding: 80px 60px;
        }
        .fs-cell { display: flex; flex-direction: column; align-items: center; gap: 26px; }
        .fs-name {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.5);
        }
        @media (max-width: 900px) { .fs-sheet { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

function askedForFaces() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("faces") === "1";
}

export function LandingPageF({
  onEnterGuest,
  onStartTask,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  if (askedForFaces()) return <FaceSheet />;

  return (
    <div className="bg-[#050506]">
      <HeroScreenF
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateHome={() => window.scrollTo({ top: 0 })}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* 2 · You talk; Starchild turns the request into the next concrete step. */}
      <ConversationShowcaseF />

      {/* 3 · What it plugs into. Carried over from E, on its own concave ground —
             the one section here that is a panel rather than a stretch of page. */}
      <OrbitSection />

      {/* 4 · How it decides. One drawing: what it knows about you on the left,
             what it can reach on the right, and the answer falling out of the
             bottom of the mark in the middle. */}
      <ConductorSectionA />

      <FinalCtaSection
        headline="Whatever comes next, Starchild is already with you."
        onStartFree={() => onEnterGuest()}
        onNavigatePricing={onNavigatePricing}
      />

    </div>
  );
}
