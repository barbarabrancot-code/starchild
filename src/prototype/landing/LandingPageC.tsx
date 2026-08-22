import { useRef } from "react";
import { HeroScreenC } from "./c/HeroScreenC";
import { PointerDot } from "./c/PointerDot";
import type { TaskCard } from "../data";
import { CapabilityGridSection } from "./c/CapabilityGridSection";
import { AgentsSection } from "./c/AgentsSection";
import { KnowsYouKnowsAiSection } from "./KnowsYouKnowsAiSection";
import { FinalCtaSection } from "./FinalCtaSection";

// Version C — forked from version B and keeps its three-layer middle (breadth →
// persistence → intelligence) in its own ./c copy. What it changes is the hero:
// no monolith photograph and no spotlight reveal, just a live pixel mesh that
// drifts on its own and lights up under the pointer.
// Versions A and B stay untouched so all three can be compared side by side.
export function LandingPageC({
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
      {/* the orange dot replaces the cursor for the whole page, not just the hero */}
      <PointerDot />

      <HeroScreenC
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateTraders={onNavigateTraders}
        onNavigateConductorMode={onNavigateConductorMode}
        onOpenMarketplace={onOpenMarketplace}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

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
