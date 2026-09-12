/**
 * Version H — the landing, and the only one landing.html now offers.
 *
 * It started as A with a different Conductor: the hero, the orbit and the
 * closing CTA are imported from ./f rather than copied, so the one difference
 * between it and A was ./f/ConductorSectionB and could not be anything else.
 * That comparison is finished — H won it, and F and G moved to the archive on
 * app.html.
 *
 * Two sections that used to be here are not any more: the conversation showcase
 * that sat second, and the memory showcase that sat fifth. Both are still in
 * ./f and both are still on the archived versions — they came off this page
 * rather than out of the repo.
 *
 * What is new here is the design system. H is the first version grounded in it
 * rather than in colours chosen section by section: the palette, the four type
 * roles, the spacing scale and the grid all come from design-system.html, via
 * ./h/design-system.css. Two things followed from that and are worth knowing
 * before reading the sections:
 *
 * · The page is no longer near-black. The ground moved from #050506 to the
 *   system's #1B1919, which is a warm grey rather than an absence — the hero's
 *   argument that the orb is the only light in the room now has a room.
 * · There is no light mode. The system has one ground by definition and no
 *   light surfaces in its palette, so the switch is gone rather than
 *   undocumented. ./f/theme and ./f/ThemeToggle still exist and still serve the
 *   archived versions; nothing here reads them.
 *
 * Because ./f is shared with the archive, none of this is written into those
 * files. It is all scoped behind `data-ds` on the wrapper below.
 */
import type { TaskCard } from "../data";
import { HeroScreenH } from "./h/HeroScreenH";
import { OrbitSection } from "./f/OrbitSection";
import { ConductorSectionB } from "./f/ConductorSectionB";
import { FinalCtaSectionH } from "./h/FinalCtaSectionH";
import { FACES, OrbFace, type Mood } from "./f/OrbFace";
import { StackedCardsSection } from "./h/StackedCardsSection";
/* The design system, scoped to this page. Every colour, size and step below
   resolves through it — see the file's own note on why it is scoped rather than
   global, and on which of the tokens the sections read are bridged rather than
   renamed. */
import "./h/design-system.css";

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
          min-height: 100vh; background: #1b1919;
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

export function LandingPageH({
  onEnterGuest,
  onStartTask,
  onNavigateConnectors,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  /** where the orbit's "Explore all 40+ connectors" goes */
  onNavigateConnectors: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  if (askedForFaces()) return <FaceSheet />;

  return (
    /* Every colour, size and step in every section below resolves through the
       tokens defined against this element.

       `data-ds` is what opts the page into the design system, and it is the
       whole of the scoping: ./h/design-system.css writes nothing that is not
       behind it, so the archived versions on app.html — which render these same
       section files — are untouched by all of it.

       `data-lf` stays at dark and is no longer a choice. The system has one
       ground by definition, so the switch that used to set this is gone; the
       attribute itself is still here because the section files branch on it and
       removing it would mean editing every one of them. */
    <div className="lf" data-ds data-lf="dark">
      <HeroScreenH
        onEnterGuest={onEnterGuest}
        onNavigateHome={() => window.scrollTo({ top: 0 })}
      />

      {/* 2 · The four claims, dealt one at a time onto a stack while the page
             holds still. The first section built on the design system from
             nothing rather than re-grounded into it. */}
      <StackedCardsSection />

      {/* 3 · What it plugs into. Carried over from E, on its own concave ground —
             the one section here that is a panel rather than a stretch of page. */}
  <OrbitSection />

      {/* 4 · How it decides. One drawing: what it knows about you on the left,
             what it can reach on the right, and the answer falling out of the
             bottom of the mark in the middle. */}
      <ConductorSectionB />

      <FinalCtaSectionH onStartFree={() => onEnterGuest()} />

      <style>{`
        /* Landing H uses a fixed section-to-section rhythm. Individual sections
           still own their internal padding; this is only the open space between
           their outer bounds. */
        .lf[data-ds] > section + section { margin-top: 200px; }

        /* The card stack is the visual continuation of the hero, not a section
           that waits below a viewport-sized blank area. Its first card rises
           over the tail of the hero while the section itself keeps its pinning
           space for the scroll animation. */
        .lf[data-ds] > .hero-h + .sc-section {
          z-index: 1;
          /* A deliberate peek: the card rises 42px into the hero after the
             section's 128px top padding, keeping the title and composer clear. */
          margin-top: -170px;
        }
        @media (max-width: 640px) {
          .lf[data-ds] > .hero-h + .sc-section { margin-top: -80px; }
        }
      `}</style>
    </div>
  );
}
