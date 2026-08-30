import { PricingSection } from "./f/PricingSection";
import { SiteHeaderF } from "./f/SiteHeaderF";

/** The landing's pricing destination: the comparison stays intact, while the
 * visitor chooses whether to view the plans through a general-use or trader lens. */
export function PricingPageF({
  onNavigateHome,
  onLogIn,
  onSignUp,
  onChoosePlan,
}: {
  onNavigateHome: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
  onChoosePlan: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#050506]">
      <SiteHeaderF
        onNavigateHome={onNavigateHome}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />
      <PricingSection onChoosePlan={onChoosePlan} standalone />
    </div>
  );
}
