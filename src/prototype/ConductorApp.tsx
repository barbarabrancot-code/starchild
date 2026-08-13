import { useState } from "react";
import { HeroScreen } from "./HeroScreen";
import { ChatScreen } from "./ChatScreen";
import { MarketplaceModal } from "./MarketplaceModal";
import { MARKETPLACE_SEED, type MarketplaceSkill } from "./data";

export function ConductorApp() {
  const [screen, setScreen] = useState<"hero" | "chat">("hero");
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [skills, setSkills] = useState<MarketplaceSkill[]>(MARKETPLACE_SEED);

  function handleAddSkill(skill: MarketplaceSkill) {
    setSkills((prev) => [skill, ...prev]);
  }

  return (
    <>
      {screen === "hero" ? (
        <HeroScreen onEnterChat={() => setScreen("chat")} />
      ) : (
        <ChatScreen
          onBack={() => setScreen("hero")}
          onOpenMarketplace={() => setMarketplaceOpen(true)}
        />
      )}

      <MarketplaceModal
        open={marketplaceOpen}
        onClose={() => setMarketplaceOpen(false)}
        skills={skills}
        onAddSkill={handleAddSkill}
      />
    </>
  );
}
