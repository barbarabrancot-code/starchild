import { useRef } from "react";
import { HeroScreen } from "../HeroScreen";
import type { TaskCard } from "../data";
import { UsedAtWorkSection } from "./UsedAtWorkSection";
import { LifeAndWorkSection } from "./LifeAndWorkSection";
import { MoreWaysSection } from "./MoreWaysSection";
import { KnowsYouKnowsAiSection } from "./KnowsYouKnowsAiSection";
import { FinalCtaSection } from "./FinalCtaSection";

export function LandingPage({
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
      <LifeAndWorkSection onStartTask={onStartTask} />
      <MoreWaysSection onStartTask={onStartTask} />

      {/* The homepage explanation of Conductor Mode: the recognizable problem, not
          the architecture. The diagram and comparison table live on the product page. */}
      <div ref={howItWorksRef}>
        <KnowsYouKnowsAiSection />
      </div>

      <FinalCtaSection onStartFree={enterGuest} />
    </div>
  );
}
