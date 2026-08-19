import { useState } from "react";
import { LandingPage } from "./landing/LandingPage";
import { ChatScreen } from "./ChatScreen";
import { ConductorModePage } from "./product/ConductorModePage";
import { MarketplaceModal } from "./MarketplaceModal";
import { SignupGate } from "./SignupGate";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";
import { FirstRead } from "./onboarding/FirstRead";
import { composeOpeningQuestion, EMPTY_ANSWERS, type Answers } from "./onboarding/questions";
import { MARKETPLACE_SEED, type MarketplaceSkill, type TaskCard } from "./data";

// Landing → Guest Mode → Sign up → 5 choices → First Read → First conversation
type Screen = "landing" | "conductor-mode" | "signup" | "onboarding" | "first-read" | "chat";

export function ConductorApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();
  const [openingMessage, setOpeningMessage] = useState<string | undefined>();
  const [task, setTask] = useState<TaskCard | undefined>();
  const [isGuest, setIsGuest] = useState(false);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [skills, setSkills] = useState<MarketplaceSkill[]>(MARKETPLACE_SEED);

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

  // Log in and Sign up both land on the same auth screen for now — it carries a
  // "Already have an account? Log in" link. Split them when real auth exists.
  function goToAuth() {
    setScreen("signup");
  }

  return (
    <>
      {screen === "landing" && (
        <LandingPage
          onEnterGuest={enterGuest}
          onStartTask={startTask}
          onNavigateConductorMode={() => setScreen("conductor-mode")}
          onOpenMarketplace={() => setMarketplaceOpen(true)}
          onLogIn={goToAuth}
          onSignUp={goToAuth}
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
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-2xl">
            <SignupGate
              heading="Save what Starchild is learning about you"
              sub="Create an account to keep this conversation and continue on Web or Desktop."
              ctaLabel="Continue"
              backLabel="Sign up"
              onBack={() => (isGuest ? setScreen("chat") : goHome())}
              onContinue={() => {
                // the account is what unlocks personalization, so signing up leads
                // into the five choices rather than straight back to the product
                setIsGuest(false);
                setScreen("onboarding");
              }}
            />
          </div>
        </div>
      )}

      {screen === "onboarding" && (
        <OnboardingFlow
          onComplete={(next) => {
            setAnswers(next);
            setScreen("first-read");
          }}
        />
      )}

      {screen === "first-read" && (
        <FirstRead
          answers={answers}
          onContinue={(_read, reaction) => {
            // a rejected read means Starchild opens by asking rather than assuming
            setOpeningMessage(
              reaction === "no"
                ? "I didn't get that quite right. Tell me where I was off — what's actually going on for you right now?"
                : composeOpeningQuestion(answers),
            );
            setInitialPrompt(undefined);
            setTask(undefined); // the onboarding conversation isn't a hero task
            setScreen("chat");
          }}
        />
      )}

      {screen === "chat" && (
        <ChatScreen
          onBack={goHome}
          onOpenMarketplace={() => setMarketplaceOpen(true)}
          onRequestSignup={() => setScreen("signup")}
          initialMessage={initialPrompt}
          openingMessage={openingMessage}
          task={task}
          isGuest={isGuest}
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
