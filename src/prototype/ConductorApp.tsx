import { useState, useEffect } from "react";
import { LandingPage } from "./landing/LandingPage";
import { LandingPageB } from "./landing/LandingPageB";
import { LandingPageC } from "./landing/LandingPageC";
import { LandingPageD } from "./landing/LandingPageD";
import { LandingPageE } from "./landing/LandingPageE";
import { LandingPageF } from "./landing/LandingPageF";
import { LandingPageG } from "./landing/LandingPageG";
import { TradersPage } from "./landing/c/TradersPage";
import { PricingPageF } from "./landing/PricingPageF";
import { HERO_INTENTS_C } from "./landing/c/heroIntents";
import { VariantToggle } from "./landing/VariantToggle";
import { ChatScreen } from "./ChatScreen";
import { ConductorModePage } from "./product/ConductorModePage";
import { AgentsWorkspace } from "./agents/AgentsWorkspace";
import { ConnectorsPage } from "./agents/ConnectorsPage";
import { AgentsProvider } from "./agents/store";
import type { SavedChat } from "./savedChats";
import { ProductSidebar } from "./ProductSidebar";
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
export type LandingVariant = "a" | "b" | "c" | "d" | "e" | "f" | "g";

const VARIANT_PARAM = "v";

/**
 * A line of landing versions, and the page it lives on.
 *
 * There are two pages now. `app.html` is where A through F were built, and it
 * keeps all six. `landing.html` is the page being taken forward, and on it F is
 * version A — the first of a new line rather than the sixth of the old one.
 *
 * The letter in the URL is a position on the line, not the name of a component.
 * That is what lets the same page be F on one link and A on the other without
 * being built twice: `slots` maps position to version, and on the old line the
 * two happen to coincide because the line is the whole alphabet in order.
 *
 * Which one you land on is in the URL, never in storage: the bare link always
 * opens the line's own default, so anyone opening it sees the same thing. The
 * floating switch rewrites the query (?v=a) instead, which means a reload keeps
 * the one you're reviewing and the address bar is shareable as it stands.
 *
 * Everything past the landing — Guest Mode, signup, the first meeting, chat, the
 * marketplace — is shared by both lines, so every version is being compared on
 * the same product. The one exception is the hero chips, which Guest Mode
 * reopens: those have to be the set the visitor was just choosing from, so C
 * carries its own through to the chat.
 */
export type LandingLine = {
  /** version at each position, so index 0 is the switch's A, index 1 its B */
  slots: LandingVariant[];
  /** the position the bare link opens */
  opensAt: number;
};

/** app.html — where A through F were built, and where all six stay reachable */
export const BUILT_LINE: LandingLine = { slots: ["a", "b", "c", "d", "e", "f"], opensAt: 2 };

/** landing.html — the page being taken forward. F is its A. */
export const NEXT_LINE: LandingLine = { slots: ["f", "g"], opensAt: 0 };

/** "a" → 0, "b" → 1 … the switch's letters are positions, and so is the URL's */
const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function readSlotFromUrl(line: LandingLine): number {
  if (typeof window === "undefined") return line.opensAt;
  const asked = new URLSearchParams(window.location.search).get(VARIANT_PARAM);
  const at = asked ? LETTERS.indexOf(asked) : -1;
  return at >= 0 && at < line.slots.length ? at : line.opensAt;
}

/**
 * `?signedin=1` opens straight into the account, past the landing, the signup form
 * and the first meeting.
 *
 * It is a way in for reviewing, not a second product: nothing about the signed-in
 * app behaves differently, and the ordinary route is untouched. It exists because
 * every look at the workspace otherwise costs six clicks and two minutes of
 * scripted conversation, and a review that expensive is a review that stops
 * happening.
 */
function startsSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("signedin") === "1";
}

export function ConductorApp({ line = BUILT_LINE }: { line?: LandingLine } = {}) {
  const [slot, setSlot] = useState(() => readSlotFromUrl(line));
  const landingVariant = line.slots[slot];
  const [signedInFromUrl] = useState(startsSignedIn);
  const [screen, setScreen] = useState<Screen>(signedInFromUrl ? "chat" : "landing");
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();
  const [openingMessage, setOpeningMessage] = useState<string | undefined>();
  const [task, setTask] = useState<TaskCard | undefined>();
  const [isGuest, setIsGuest] = useState(false);
  /*
    There is no longer a "came from guest" branch to track. The meeting used to
    reassure those users that their work survived; now the work is simply there,
    at the top of their conversations, before the meeting has said anything. A
    fact on the screen beats a promise about one, and it needed no state.
  */
  /** what they did as a guest, kept so the account opens with it already in place */
  const [guestChats, setGuestChats] = useState<SavedChat[]>([]);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  /** Which product area the chat screen sits in once signed in. Set when a task is
   *  picked, so someone who asked for something to be run lands among the agents
   *  rather than in a conversation about them. */
  const [area, setArea] = useState<"chat" | "agents" | "connectors">("chat");
  /** an agent made from a conversation — Agents opens on it, not on the top of the roster */
  const [focusAgent, setFocusAgent] = useState<string | undefined>();
  /**
   * The nav rail, down to icons. Driven by the area rather than remembered,
   * because it is a fact about the screen you are on and not a preference: Agents
   * needs the width, Chat does not. The hamburger still overrides it, and the
   * override lasts until the area changes — which is the only moment a person
   * would be surprised to find their choice still in force.
   */
  const [railed, setRailed] = useState(false);
  useEffect(() => { setRailed(area === "agents"); }, [area]);
  const [skills, setSkills] = useState<MarketplaceSkill[]>(MARKETPLACE_SEED);

  function switchVariant(next: number) {
    setSlot(next);

    // replaceState, not push: the switch is a review tool, and every flip landing
    // in the history would turn Back into a walk through the versions
    const url = new URL(window.location.href);
    if (next === line.opensAt) url.searchParams.delete(VARIANT_PARAM);
    else url.searchParams.set(VARIANT_PARAM, LETTERS[next]);
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
  /** Handing work over rather than talking it through: the run-it-for-me chips and
   *  everything the Agents section offers. These are the ones that belong in the
   *  other area once there is an account to keep them in. */
  const isAgentWork = (id: string) => id.startsWith("agent-") || id.startsWith("run-");

  function startTask(next: TaskCard) {
    setArea(isAgentWork(next.id) ? "agents" : "chat");
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
    setScreen("signup");
  }

  // the same screen, reached from the guest chat rather than from a header
  function goToAuthFromChat() {
    setScreen("signup");
  }

  const empty = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("agents") === "empty";

  return (
    <AgentsProvider empty={empty}>
      {screen === "landing" && (
        <>
          {/* F is on its own because its header has no nav — no audiences menu,
              no Pricing, no Marketplace — so handing it those four handlers would
              be wiring up buttons that are not there. It does take onStartTask:
              its hero has the intent chips now, and a chip that opens a task card
              has to have somewhere to send it. */}
          {landingVariant === "f" || landingVariant === "g" ? (
            (() => {
              const Landing = landingVariant === "g" ? LandingPageG : LandingPageF;
              return (
                <Landing
                  key={landingVariant}
                  onEnterGuest={enterGuest}
                  onStartTask={startTask}
                  onNavigatePricing={goToPricing}
                  onLogIn={goToAuth}
                  onSignUp={goToAuth}
                />
              );
            })()
          ) : /* C, D and E are rendered apart from A and B because they take props
                 the others don't: a "Starchild for" menu with a real page behind
                 it, and a Pricing item that goes somewhere. D and E differ from C
                 in their heroes, so they take exactly the same handlers. */
          landingVariant === "c" || landingVariant === "d" || landingVariant === "e" ? (
            (() => {
              const Landing =
                landingVariant === "e"
                  ? LandingPageE
                  : landingVariant === "d"
                    ? LandingPageD
                    : LandingPageC;
              return (
                <Landing
                  key={landingVariant}
              onEnterGuest={enterGuest}
              onStartTask={startTask}
                  onNavigateTraders={goToTraders}
                  onNavigateConductorMode={() => setScreen("conductor-mode")}
                  onOpenMarketplace={() => setMarketplaceOpen(true)}
                  onNavigatePricing={goToPricing}
                  onLogIn={goToAuth}
                  onSignUp={goToAuth}
                />
              );
            })()
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
          {/* A line with one version has nothing to switch between, and a switch
              with a single position is chrome pretending to be a control. It
              appears on its own the moment a second version is added. */}
          {line.slots.length > 1 && (
            <VariantToggle at={slot} count={line.slots.length} onChange={switchVariant} />
          )}
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
        <PricingPageF
          onNavigateHome={goHome}
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

      {/* Signed in, Agents replaces the conversation but keeps the shell: same
          sidebar, same switch, a different product area behind it. In Guest Mode
          there is nothing to manage yet, so the chat is the only thing there is. */}
      {screen === "chat" && !isGuest && area !== "chat" && (
        <div className="relative flex h-screen overflow-hidden bg-[#0a0a0a]">
          <ProductSidebar
            area={area}
            onSwitchArea={setArea}
            collapsed={railed}
            onToggleCollapsed={() => setRailed((v) => !v)}
            // leaving for a new conversation is leaving the area
            onNewChat={() => setArea("chat")}
            onOpenMarketplace={() => setMarketplaceOpen(true)}
          />
          {area === "agents" ? <AgentsWorkspace focusId={focusAgent} /> : <ConnectorsPage />}
        </div>
      )}

      {/*
        Hidden, never unmounted.

        Switching to Agents used to take ChatScreen out of the tree, which threw
        away the conversation — so going to look at an agent and coming back left
        someone staring at an empty composer. That is a bad thing to do to any
        conversation and an untenable one next to a card that says "this
        conversation stays here", so the chat now waits behind the other areas
        rather than being rebuilt from nothing on the way back.
      */}
      {screen === "chat" && (
      <div className={!isGuest && area !== "chat" ? "hidden" : "contents"}>
        <ChatScreen
          area={area}
          onSwitchArea={setArea}
          onBack={goHome}
          // D uses C's hero chips, so Guest Mode has to carry the same set through
          intents={
            landingVariant === "c" || landingVariant === "d" || landingVariant === "e"
              ? HERO_INTENTS_C
              : undefined
          }
          onOpenMarketplace={() => setMarketplaceOpen(true)}
          onRequestSignup={goToAuthFromChat}
          onLogIn={goToAuthFromChat}
          initialMessage={initialPrompt}
          openingMessage={openingMessage}
          task={task}
          isGuest={isGuest}
          // straight to the working product: the meeting is part of signing up,
          // and this link starts after that
          skipMeeting={signedInFromUrl}
          // Going to see it is a move between areas, not a move of the conversation:
          // the chat is still there, exactly as it was, when they come back.
          onOpenAgent={(id) => { setFocusAgent(id); setArea("agents"); }}
          onGuestWork={(chat) => setGuestChats((prev) => [chat, ...prev])}
          extraConversations={guestChats}
          railed={railed}
          onToggleRail={() => setRailed((v) => !v)}
        />
      </div>
      )}

      <MarketplaceModal
        open={marketplaceOpen}
        onClose={() => setMarketplaceOpen(false)}
        skills={skills}
        onAddSkill={handleAddSkill}
      />
    </AgentsProvider>
  );
}
