import { useState } from "react";
import { LandingPage } from "./landing/LandingPage";
import { LandingPageB } from "./landing/LandingPageB";
import { LandingPageC } from "./landing/LandingPageC";
import { TradersPage } from "./landing/c/TradersPage";
import { PricesPage } from "./landing/PricesPage";
import { HERO_INTENTS_C } from "./landing/c/heroIntents";
import { VariantToggle } from "./landing/VariantToggle";
import { ChatScreen } from "./ChatScreen";
import { ConductorModePage } from "./product/ConductorModePage";
import { MarketplaceModal } from "./MarketplaceModal";
import { SignupGate } from "./SignupGate";
import { MARKETPLACE_SEED, type MarketplaceSkill, type TaskCard } from "./data";

// Landing → Guest Mode → Sign up → the product, where Starchild introduces itself
type Screen =
  | "landing"
  | "for-traders"
  | "pricing"
  | "conductor-mode"
  | "signup"
  | "chat";

// Landing-page A/B/C: the homepage is what differs — everything past it (Guest
// Mode, signup, the first meeting, chat, marketplace) is shared, so every variant is
// being compared on the same product. The one exception is the hero chips, which
// Guest Mode reopens: those have to be the set the visitor was just choosing
// from, so C carries its own through to the chat.
//
// Which one you land on is in the URL, never in storage: the bare link always
// opens C, the version being worked on, so anyone opening it sees the same thing.
// The floating switch rewrites the query (?v=a) instead, which means a reload
// keeps the one you're reviewing and the address bar is shareable as it stands.
export type LandingVariant = "a" | "b" | "c";

const VARIANT_PARAM = "v";
const DEFAULT_VARIANT: LandingVariant = "c";

function readVariantFromUrl(): LandingVariant {
  if (typeof window === "undefined") return DEFAULT_VARIANT;
  const asked = new URLSearchParams(window.location.search).get(VARIANT_PARAM);
  return asked === "a" || asked === "b" || asked === "c" ? asked : DEFAULT_VARIANT;
}

export function ConductorApp() {
  const [landingVariant, setLandingVariant] = useState<LandingVariant>(readVariantFromUrl);
  const [screen, setScreen] = useState<Screen>("landing");
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();
  const [openingMessage, setOpeningMessage] = useState<string | undefined>();
  const [task, setTask] = useState<TaskCard | undefined>();
  const [isGuest, setIsGuest] = useState(false);
  // Whether the account was created from inside the guest chat. The first meeting
  // reassures those users that what they were doing survives; someone who signed
  // up straight from the homepage has nothing to be reassured about.
  const [fromGuest, setFromGuest] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [skills, setSkills] = useState<MarketplaceSkill[]>(MARKETPLACE_SEED);

  function switchVariant(next: LandingVariant) {
    setLandingVariant(next);

    // replaceState, not push: the switch is a review tool, and every flip landing
    // in the history would turn Back into a walk through the versions
    const url = new URL(window.location.href);
    if (next === DEFAULT_VARIANT) url.searchParams.delete(VARIANT_PARAM);
    else url.searchParams.set(VARIANT_PARAM, next);
    window.history.replaceState(null, "", url);

    // every version shares the hero's scroll-driven intro, so start the new one
    // from the top rather than halfway through the other page's scroll position
    window.scrollTo({ top: 0 });
  }

  function handleAddSkill(skill: MarketplaceSkill) {
    setSkills((prev) => [skill, ...prev]);
  }

  function enterGuest(prompt?: string) {
    setInitialPrompt(prompt);
    setOpeningMessage(undefined);
    setTask(undefined);
    setIsGuest(true);
    setScreen("chat");
  }

  // Chip → task card → Guest Mode → one contextual question → Conductor.
  // Nothing runs until Starchild has the detail it's missing.
  function startTask(next: TaskCard) {
    setInitialPrompt(undefined);
    setOpeningMessage(next.question);
    setTask(next);
    setIsGuest(true);
    setScreen("chat");
  }

  function goHome() {
    setScreen("landing");
  }

  // the audience page is a separate page, so it opens at its own top
  function goToTraders() {
    setScreen("for-traders");
    window.scrollTo({ top: 0 });
  }

  function goToPricing() {
    setScreen("pricing");
    window.scrollTo({ top: 0 });
  }

  // Log in and Sign up both land on the same auth screen for now — it carries a
  // "Already have an account? Log in" link. Split them when real auth exists.
  function goToAuth() {
    setFromGuest(false);
    setScreen("signup");
  }

  // the same screen, reached from the guest chat rather than from a header
  function goToAuthFromChat() {
    setFromGuest(isGuest);
    setScreen("signup");
  }

  return (
    <>
      {screen === "landing" && (
        <>
          {/* C is rendered on its own because it takes one prop the others don't:
              its header has a "Starchild for" menu with a real page behind it. */}
          {landingVariant === "c" ? (
            <LandingPageC
              key="c"
              onEnterGuest={enterGuest}
              onStartTask={startTask}
              onNavigateTraders={goToTraders}
              onNavigateConductorMode={() => setScreen("conductor-mode")}
              onOpenMarketplace={() => setMarketplaceOpen(true)}
              onNavigatePricing={goToPricing}
              onLogIn={goToAuth}
              onSignUp={goToAuth}
            />
          ) : (
            (() => {
              const Landing = landingVariant === "b" ? LandingPageB : LandingPage;
              return (
                <Landing
                  key={landingVariant}
                  onEnterGuest={enterGuest}
                  onStartTask={startTask}
                  onNavigateConductorMode={() => setScreen("conductor-mode")}
                  onOpenMarketplace={() => setMarketplaceOpen(true)}
                  onLogIn={goToAuth}
                  onSignUp={goToAuth}
                />
              );
            })()
          )}
          <VariantToggle variant={landingVariant} onChange={switchVariant} />
        </>
      )}

      {screen === "for-traders" && (
        <TradersPage
          onNavigateHome={goHome}
          onNavigatePricing={goToPricing}
          onEnterGuest={enterGuest}
          onLogIn={goToAuth}
          onSignUp={goToAuth}
        />
      )}

      {screen === "pricing" && (
        <PricesPage
          onNavigateHome={goHome}
          onNavigateTraders={goToTraders}
          onLogIn={goToAuth}
          onSignUp={goToAuth}
          // no billing sits behind any of these yet, so every plan button lands on
          // the same account step the rest of the prototype uses
          onChoosePlan={goToAuth}
        />
      )}

      {screen === "conductor-mode" && (
        <ConductorModePage
          onNavigateHome={goHome}
          onOpenMarketplace={() => setMarketplaceOpen(true)}
          onTry={enterGuest}
          onLogIn={goToAuth}
          onSignUp={goToAuth}
        />
      )}

      {screen === "signup" && (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl">
            <SignupGate
              heading="Save what Starchild is learning about you"
              sub="Create an account to keep this conversation and continue on Web or Desktop."
              ctaLabel="Continue"
              backLabel="Sign up"
              onBack={() => (isGuest ? setScreen("chat") : goHome())}
              onContinue={() => {
                // Signing up lands in the product, not in a setup flow. Starchild
                // introduces itself there, in the chat, and what it learns it
                // learns from that conversation. A task carried over from Guest
                // Mode survives, so nobody starts from zero after signing up.
                setIsGuest(false);
                setInitialPrompt(undefined);
                setOpeningMessage(undefined);
                setScreen("chat");
              }}
            />
          </div>
        </div>
      )}

      {screen === "chat" && (
        <ChatScreen
          onBack={goHome}
          intents={landingVariant === "c" ? HERO_INTENTS_C : undefined}
          onOpenMarketplace={() => setMarketplaceOpen(true)}
          onRequestSignup={goToAuthFromChat}
          onLogIn={goToAuthFromChat}
          initialMessage={initialPrompt}
          openingMessage={openingMessage}
          task={task}
          isGuest={isGuest}
          cameFromGuest={fromGuest}
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
