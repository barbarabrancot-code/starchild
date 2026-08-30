import type { TaskCard } from "../data";
import { HeroScreenF } from "./f/HeroScreenF";
import { SurfacesCardsSection } from "./f/SurfacesCardsSection";
import { OrbitSection } from "./f/OrbitSection";
import { ConductorSection } from "./f/ConductorSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { FACES, OrbFace, type Mood } from "./f/OrbFace";

/** Landing B begins as an independent copy of the current landing A. */
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

export function LandingPageG({
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
      <SurfacesCardsSection />
      <OrbitSection />
      <ConductorSection />
      <FinalCtaSection
        headline="Whatever comes next, Starchild is already with you."
        onStartFree={() => onEnterGuest()}
        onNavigatePricing={onNavigatePricing}
      />
    </div>
  );
}
