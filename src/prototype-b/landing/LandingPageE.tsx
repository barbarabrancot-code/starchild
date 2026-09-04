import { useMemo, useRef, useState } from "react";
import { HeroScreenE } from "./e/HeroScreenE";
import { ConversationSection } from "./e/ConversationSection";
import { FlightOrb } from "./e/FlightOrb";
import { ShowcaseSection } from "./e/ShowcaseSection";
import { STILL } from "./e/still";
import type { OrbState } from "../presence/PresenceOrb";
import { ConnectorsOrbitSection } from "./e/ConnectorsOrbitSection";
import { ExploreSection } from "./e/ExploreSection";
import { AreasSection } from "./e/AreasSection";
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
    The orb's itinerary. Each section that wants it contributes an anchor, and the
    anchor's own size is the size the orb takes there; FlightOrb reads them in
    order and hands over as each one climbs past the middle of the screen.

    Memoised because it is an effect dependency — rebuilt every render, the flight
    would tear itself down and restart sixty times a second.
  */
  /* The orb belongs to the page, but only the hero has anything to say to it —
     the conversation happening up there is the orb's conversation. */
  const [orbState, setOrbState] = useState<OrbState>("resting");
  const heroOrb = useRef<HTMLDivElement>(null);
  /* the scrolling thread the hero's anchor lives in once a conversation starts */
  const heroClip = useRef<HTMLDivElement>(null);
  /* Kept although no stop uses it as a zone any more: it is how the conversation
     hands its own element up to the page, and the departure below is measured
     against it. */
  const talkZone = useRef<HTMLElement>(null);
  /* the pause between the conversation and the tools, where it is full size again */
  const exitOrb = useRef<HTMLDivElement>(null);
  /* and the third stop: the centre the tools are arranged around */
  const wiredOrb = useRef<HTMLDivElement>(null);
  const wiredZone = useRef<HTMLElement>(null);
  const stops = useMemo(
    () => [
      // behind the page, so the panel below can rise over it
      { ref: heroOrb, clip: heroClip },
      /*
        There is no stop inside the conversation. The orb used to fly into a small
        mark beside Starchild's first line, which spent the page's one presence on
        a ten-pixel dot for the length of a section. Now the hero holds it still,
        the panel covers it, and the next thing it does is come back out from
        underneath at the size it already was.
      */
      // Claimed as soon as the departure enters the window rather than at the
      // middle, so it happens on screen instead of above it. Layer 1, so the
      // panel it is emerging from still covers the part not yet emerged.
      { ref: exitOrb, at: 0.72 },
      { ref: wiredOrb, zone: wiredZone, above: true },
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
      {!STILL && <FlightOrb stops={stops} state={orbState} />}

      <HeroScreenE
        orbAnchor={heroOrb}
        orbClip={heroClip}
        onOrbState={setOrbState}
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
      <ConversationSection orbExit={exitOrb} orbZone={talkZone} />

      {/* 3 · What it plugs into — the tools in orbit rather than in a logo wall.

             Third rather than fifth, because the orb goes straight here from the
             conversation: it leaves the panel at full size and the next thing it
             does is become the centre these tools are arranged around. With two
             sections in between, that one continuous move was cut in half and the
             orb had to be parked somewhere for the length of both. */}
      <ConnectorsOrbitSection orbAnchor={wiredOrb} orbZone={wiredZone} />

      {/* 4 · How wide it is. Everything above shows Starchild doing one thing;
             this is the only section that is operated rather than read, and
             pressing through it is the demonstration. Every state hands its own
             prompt to Guest Mode, so the way out of the section is the example
             someone was just looking at. */}
      <ExploreSection onTry={(prompt) => onEnterGuest(prompt)} />

      {/* 5 · Where the work lives. Four says what you can ask for; this says
             where the asking happens, which is the thing people get wrong about
             Starchild — they assume Agents is a mode of the chat and Connectors
             is a settings page. Straight after Explore on purpose: what you can
             do, then where it is. */}
      <AreasSection />

      {/* 6 · How it decides. Carried over from C and D unchanged — the section
             already says the one thing E needs it to say, and rebuilding it to
             look different would be a change for its own sake. */}
      <div ref={howItWorksRef}>
        <KnowsYouKnowsAiSection showBenefits={false} />
      </div>

      {/* 7 · What a conversation leaves behind. One surface, three jobs. */}
      <ShowcaseSection />

      {/* ── still D's, awaiting its own design ──────────────────────────── */}

      <FinalCtaSection
        onStartFree={enterGuest}
        headline="Whatever comes next, Starchild is already with you."
      />
    </div>
  );
}
