import { useRef } from "react";
import { HeroScreen } from "../HeroScreen";
import type { TaskCard } from "../data";
import { UsedAtWorkSection } from "./UsedAtWorkSection";
import { CapabilityGridSection } from "./b/CapabilityGridSection";
import { AgentsSection } from "./b/AgentsSection";
import { KnowsYouKnowsAiSection } from "./KnowsYouKnowsAiSection";
import { FinalCtaSection } from "./FinalCtaSection";

// Version B — same hero, social proof, Conductor section and CTA as version A.
// The middle of the page is re-cut into three layers that each do one job:
//   breadth (six capabilities) → persistence (agents) → intelligence (Conductor).
// Version A stays untouched in LandingPage.tsx so the two can be compared.
export function LandingPageB({
  onEnterGuest,
  onStartTask,
  onNavigateConductorMode,
  onOpenMarketplace,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  // every CTA on the page drops into Guest Mode — there is no signup wall before value
  const enterGuest = () => onEnterGuest();

  return (
    <div>
      <HeroScreen
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateConductorMode={onNavigateConductorMode}
        onOpenMarketplace={onOpenMarketplace}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <UsedAtWorkSection />

      {/* Layer 1 — breadth: what can I use this for? */}
      <CapabilityGridSection onStartTask={onStartTask} />

      {/* Layer 2 — persistence: can it keep doing work for me? */}
      <AgentsSection onStartTask={onStartTask} />

      {/* Layer 3 — intelligence: how does it know how to help? */}
      <div ref={howItWorksRef}>
        <KnowsYouKnowsAiSection />
      </div>

      <FinalCtaSection onStartFree={enterGuest} />
    </div>
  );
}
