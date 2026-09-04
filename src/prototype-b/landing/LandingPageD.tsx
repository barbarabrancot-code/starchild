import { useRef } from "react";
import { HeroScreenD } from "./d/HeroScreenD";
import { ModelsSection } from "./d/ModelsSection";
import type { TaskCard } from "../data";
import { CapabilityGridSection } from "./c/CapabilityGridSection";
import { AgentsSection } from "./c/AgentsSection";
import { KnowsYouKnowsAiSection } from "./KnowsYouKnowsAiSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { PointerDot } from "./c/PointerDot";

// Version D — forked from C and identical below the fold. The whole comparison is
// the hero: C opens by arguing (a headline about leading models, an orbital system
// making the same claim in pictures), D opens by showing the product's own empty
// screen and nothing else.
//
// Everything after it is C's, on purpose. Two heroes cannot be compared if the
// pages under them also differ.
export function LandingPageD({
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

  // every CTA on the page drops into Guest Mode — there is no signup wall before value
  const enterGuest = () => onEnterGuest();

  return (
    <div>
      {/* D's hero draws no dot of its own — there is no pixel mesh here — so this
          one is on duty for the whole page, hero included. `yieldTo` still names
          C's hero, which simply never matches. */}
      <PointerDot />

      <HeroScreenD
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateTraders={onNavigateTraders}
        onNavigateConductorMode={onNavigateConductorMode}
        onOpenMarketplace={onOpenMarketplace}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* The answer to the question the hero leaves hanging: "one AI for
          everything" invites "which one?", and this is C's hero saying so. */}
      <ModelsSection />

      {/* Layer 1 — breadth: what can I use this for? */}
      <CapabilityGridSection onStartTask={onStartTask} />

      {/* Layer 2 — persistence: can it keep doing work for me? */}
      <AgentsSection onStartTask={onStartTask} />

      {/* Layer 3 — intelligence: how does it know how to help? */}
      <div ref={howItWorksRef}>
        <KnowsYouKnowsAiSection showBenefits={false} />
      </div>

      <FinalCtaSection
        onStartFree={enterGuest}
        headline="Whatever comes next, Starchild is already with you."
      />
    </div>
  );
}
