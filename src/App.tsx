import { ConductorSection } from "./components/ConductorSection";
import { ConductorSectionEdgy } from "./components/ConductorSectionEdgy";
import { ConductorModeSection } from "./components/ConductorModeSection";
import { ConductorRankChartSection } from "./components/ConductorRankChartSection";
import { ConductorBarRaceSection } from "./components/ConductorBarRaceSection";
import { ConductorFatigueSection } from "./components/ConductorFatigueSection";
import { ConductorFatiguePopSection } from "./components/ConductorFatiguePopSection";
import { IntegrationsSection } from "./components/IntegrationsSection";

export function App() {
  return (
    <main>
      <ConductorSection />
      <ConductorSectionEdgy />
      <ConductorModeSection />
      <ConductorRankChartSection />
      <ConductorBarRaceSection />
      <ConductorFatigueSection />
      <ConductorFatiguePopSection />
      <IntegrationsSection />
    </main>
  );
}
