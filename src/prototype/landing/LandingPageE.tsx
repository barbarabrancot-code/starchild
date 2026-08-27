import { useMemo, useRef } from "react";
import { HeroScreenE } from "./e/HeroScreenE";
import { ConversationSection } from "./e/ConversationSection";
import { FlightOrb } from "./e/FlightOrb";
import { ShowcaseSection } from "./e/ShowcaseSection";
import { STILL } from "./e/still";
import { ConnectorsOrbitSection } from "./e/ConnectorsOrbitSection";
import type { TaskCard } from "../data";
import { KnowsYouKnowsAiSection } from "./KnowsYouKnowsAiSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { PointerDot } from "./c/PointerDot";

/**
 * Version E — being rebuilt a section at a time, starting at the top.
 *
 * The hero is E's own. Everything below it is still D's, on purpose: a page with
 * one finished section and five empty ones cannot be looked at, and the hero is
 * only judgeable in the context of what follows it. Each section gets replaced as
 * its design arrives, and this file is the running record of how far that has
 * got — anything still imported from ./c or ./d has not been done yet.
 */
export function LandingPageE({
  onEnterGuest,
  onStartTask,
  onNavigateTraders,
  onNavigateConductorMode,
  onOpenMarketplace,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  onNavigateTraders: () => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  /*
    The orb's itinerary. Each section that wants it contributes an anchor and the
    size it should be there; FlightOrb reads them in order and hands over as each
    one climbs past the middle of the screen.

    Memoised because it is an effect dependency — rebuilt every render, the flight
    would tear itself down and restart sixty times a second.
  */
  const heroOrb = useRef<HTMLDivElement>(null);
  const talkOrb = useRef<HTMLDivElement>(null);
  const stops = useMemo(
    () => [
      { ref: heroOrb, size: 180 },
      { ref: talkOrb, size: 96 },
    ],
    [],
  );

  // every CTA on the page drops into Guest Mode — there is no signup wall before value
  const enterGuest = () => onEnterGuest();

  return (
    <div>
      {/* E's hero draws no dot of its own — there is no pixel mesh here — so this
          one is on duty for the whole page, hero included.

          Both are off in still mode: one fixed orb chasing anchors imports as a
          single stray element with two empty holes where it should have been, and
          a cursor dot imports as a circle nobody drew. Each anchor renders its own
          orb instead — see still.ts. */}
      {!STILL && <PointerDot />}
      {!STILL && <FlightOrb stops={stops} />}

      <HeroScreenE
        orbAnchor={heroOrb}
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateTraders={onNavigateTraders}
        onNavigateConductorMode={onNavigateConductorMode}
        onOpenMarketplace={onOpenMarketplace}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* 2 · What the hero's box leads to, played rather than described. */}
      <ConversationSection orbAnchor={talkOrb} />

      {/* 3 · How it decides. Carried over from C and D unchanged — the section
             already says the one thing E needs it to say, and rebuilding it to
             look different would be a change for its own sake. */}
      <div ref={howItWorksRef}>
        <KnowsYouKnowsAiSection showBenefits={false} />
      </div>

      {/* 4 · What a conversation leaves behind. One surface, three jobs. */}
      <ShowcaseSection />

      {/* 5 · What it plugs into — the tools in orbit rather than in a logo wall. */}
      <ConnectorsOrbitSection />

      {/* ── still D's, awaiting its own design ──────────────────────────── */}

      <FinalCtaSection
        onStartFree={enterGuest}
        headline="Whatever comes next, Starchild is already with you."
      />
    </div>
  );
}
