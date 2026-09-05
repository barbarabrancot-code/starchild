import { useEffect, useState, type ReactNode } from "react";
import { AgentsProvider, useAgents } from "../prototype-b/agents/store";
import { AgentOrb } from "../prototype-b/agents/AgentOrb";
import { ConnectorChoice } from "../prototype-b/agents/AgentChatCards";
import { ConnectorMark } from "../prototype-b/agents/ConnectorMark";
import { ConnectorAdded } from "../prototype-b/agents/ConnectorAdded";
import { OptionModal } from "../prototype-b/OptionModal";
import { ConnectFirst, AgentOffer, AgentMade } from "../prototype-b/agents/ChatHandoff";
import { Reactable } from "../prototype-b/Reactable";
import { ActivityLine } from "../prototype-b/ActivityLine";
import { SavedThread } from "../prototype-b/SavedThread";
import { ProductSidebar } from "../prototype-b/ProductSidebar";
import { ChatScreen } from "../prototype-b/ChatScreen";
import { AgentsWorkspace, Turn } from "../prototype-b/agents/AgentsWorkspace";
import { type AgentStatus } from "../prototype-b/agents/agentsData";
import { SAVED } from "../prototype-b/savedChats";
import { FirstMeeting, useFirstMeeting } from "../prototype-b/onboarding/FirstMeeting";
import { ConductorIntroPopover } from "../prototype-b/onboarding/ConductorIntroPopover";
import { AgentsIntroPopover } from "../prototype-b/onboarding/AgentsIntroPopover";

/**
 * A dev-facing catalog, not a product screen — for the Chat and Agents areas
 * only, variant B (no Automations — that's variant A's thing, and this page
 * doesn't touch it). Every demo below renders the real, imported component
 * (never a redrawn look-alike), so this page goes stale exactly when the
 * component it shows actually changed, and never for any other reason.
 */

const STATUSES: AgentStatus[] = ["working", "paused"];

export function LibraryApp() {
  return (
    <AgentsProvider>
      <div className="lib-root">
        <Nav />
        <main className="lib-main">
          <Header />
          <Section id="screens" title="Screens">
            <Entry
              title="ChatScreen"
              path="src/prototype-b/ChatScreen.tsx"
              desc="The signed-in conversation: composer, message turns, connector/agent hand-off cards. Full-height, so it's shown at its own scroll rather than fit to the page. Wider than this column — the sidebar wants its full expanded width, not the collapsed rail — so this one preview scrolls sideways rather than cropping."
            >
              <div className="lib-frame-scroll">
                <div className="lib-frame" style={{ width: 1040, height: 640 }}>
                  <ChatScreen onBack={() => {}} />
                </div>
              </div>
            </Entry>

            <Entry
              title="AgentsWorkspace"
              path="src/prototype-b/agents/AgentsWorkspace.tsx"
              desc="Roster, thread, and the edit drawer — the whole second product area. Click a row, right-click for the context menu, click a name to open the drawer."
            >
              <div className="lib-frame" style={{ height: 820, display: "flex", flexDirection: "column" }}>
                <AgentsWorkspace />
              </div>
            </Entry>
          </Section>

          <Section id="onboarding" title="Onboarding">
            <Entry
              title="FirstMeeting: question 1 → question 2"
              path="src/prototype-b/onboarding/FirstMeeting.tsx"
              desc="The very first thing a new account sees, before there's a chat to have. Two questions, asked one at a time — what's on your mind, then how direct you want Starchild to be — answered by tapping a chip or typing. In the real flow the second replaces the first rather than stacking under it; shown stacked here only so both are visible at once."
            >
              <div className="lib-stack">
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">1 · What's on your mind</p>
                  <div className="lib-frame lib-frame--pad">
                    <FirstMeetingDemo />
                  </div>
                </div>
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">2 · How direct you want Starchild to be</p>
                  <div className="lib-frame lib-frame--pad">
                    <FirstMeetingStage2Demo />
                  </div>
                </div>
              </div>
            </Entry>

            <Entry
              title="Intro popovers: Conductor + Agents"
              path="src/prototype-b/onboarding/{ConductorIntroPopover,AgentsIntroPopover}.tsx"
              desc="Two of the three quiet first-run notes — not a tour, just one thing worth knowing before it comes up, in the same card shape either way (a visual, a title, one line, Dismiss or the real action). Conductor's hangs off the Conductor Mode control in the composer; Agents' hangs off Agents in the sidebar and its CTA opens straight there instead of just dismissing. Shown side by side and shrunk down — not pinned to a real anchor here."
            >
              <div className="lib-intro-pair">
                <div className="lib-intro-box">
                  <ConductorIntroPopover onClose={() => {}} />
                </div>
                <div className="lib-intro-box">
                  <AgentsIntroPopover placement="right" onOpen={() => {}} onClose={() => {}} />
                </div>
              </div>
            </Entry>
          </Section>

          <Section id="chat-components" title="Chat components">
            <Entry
              title="Reactable"
              path="src/prototype-b/Reactable.tsx"
              desc="Wraps a message. Hover for reply / react / copy. The emoji trigger only shows on the left (Starchild's) side — reacting to your own message isn't offered. A seeded `reaction` (Starchild's own note on something you said) renders as a fixed chip glued to the bubble's corner."
            >
              <div className="lib-stack">
                <Reactable align="left" text="I'm watching HYPE, SOL, ETH and BTC for funding moves.">
                  <div className="lib-bubble">I'm watching HYPE, SOL, ETH and BTC for funding moves.</div>
                </Reactable>
                <Reactable align="right" text="Only alert me if it's a real move." reaction="👍">
                  <div className="lib-bubble lib-bubble--mine">Only alert me if it's a real move.</div>
                </Reactable>
              </div>
            </Entry>

            <Entry
              title="ActivityLine"
              path="src/prototype-b/ActivityLine.tsx"
              desc="A plain orange dot with a soft, steady halo, no animation. Shows what Starchild is doing right now — thinking, reading, checking, routing, taking action — for the latest active step only, and disappears the instant the result is ready. No completed activity stays in the chat history."
            >
              <ActivityLine label="Reading through it…" />
            </Entry>

            <Entry
              title="ConnectFirst"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="A one-time action that needs a tool nobody's connected yet — asked and answered inline, mid-task."
            >
              <ConnectFirst needs={["figma"]} onReady={() => {}} />
            </Entry>

            <Entry
              title="Agent creation from chat (AgentOffer → AgentMade)"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="Two states of one sequence, not two components: Starchild notices a repeated ask and offers to make a real agent for it (dashed border, nothing exists yet); once you say yes, a solid receipt shows it now exists, with a door to it. The conversation never leaves the chat for either state."
            >
              <div className="lib-stack">
                <div className="lib-sequence-step" style={{ width: 480 }}>
                  <p className="lib-sequence-label">1 · AgentOffer</p>
                  <AgentOffer
                    copy="That's a few times now you've asked me to check João's emails. I can keep watching on my own and only bother you when a reply actually needs your attention. This conversation stays as it is either way."
                    onCreate={() => {}}
                    onDismiss={() => {}}
                  />
                </div>
                <div className="lib-sequence-step" style={{ width: 480 }}>
                  <p className="lib-sequence-label">2 · AgentMade</p>
                  <AgentMadeDemo />
                </div>
              </div>
            </Entry>

            <Entry
              title="OptionModal: asking → picked"
              path="src/prototype-b/OptionModal.tsx"
              desc="A real decision, not an update — on screen the moment it's needed, never gated behind a click on a status line. Two states of the same component: click a row (or pass `picked`, for a decision read back out of history) and the list collapses to the one row that was chosen, with a checkmark. ConnectorChoice below is this same component, just called with its own five options."
            >
              <div className="lib-sequence">
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">1 · Asking</p>
                  <OptionModal
                    title="What should I do?"
                    options={[
                      { letter: "A", label: "Approve strategy", desc: "Place the order with the proposed entry, stop loss, and take profit" },
                      { letter: "B", label: "Edit strategy", desc: "Adjust entry, risk, stop loss, or take profit first" },
                      { letter: "C", label: "Reject", desc: "Do not place the trade" },
                    ]}
                    onPick={() => {}}
                    onCustom={() => {}}
                    onClose={() => {}}
                    placeholder="Type your own response"
                  />
                </div>
                <div className="lib-sequence-arrow" aria-hidden="true">→</div>
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">2 · Picked</p>
                  <OptionModal
                    title="What should I do?"
                    options={[
                      { letter: "A", label: "Approve strategy", desc: "Place the order with the proposed entry, stop loss, and take profit" },
                      { letter: "B", label: "Edit strategy", desc: "Adjust entry, risk, stop loss, or take profit first" },
                      { letter: "C", label: "Reject", desc: "Do not place the trade" },
                    ]}
                    picked="A"
                    onPick={() => {}}
                    onClose={() => {}}
                  />
                </div>
              </div>
            </Entry>

            <Entry
              title="ConnectorChoice"
              path="src/prototype-b/agents/AgentChatCards.tsx"
              desc="The moment before a connector gets added to an agent — a lettered choice asked inside the conversation, plus a free-text answer."
            >
              <ConnectorChoice />
            </Entry>

            <Entry
              title="ConnectorAdded: add → added"
              path="src/prototype-b/agents/ConnectorAdded.tsx"
              desc="A connector landing, mid-conversation. Starts on a real, secondary-weight 'Add' — authorizing an account is the one part of this Starchild can't do on its own — and turns into the quiet green 'Added' once it's clicked."
            >
              <div className="lib-stack">
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">1 · Add</p>
                  <ConnectorAdded id="gcal" />
                </div>
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">2 · Added</p>
                  <ConnectorAdded id="gcal" initiallyAdded />
                </div>
              </div>
            </Entry>

            <Entry
              title="SavedThread"
              path="src/prototype-b/SavedThread.tsx"
              desc="A conversation being read back — restored, not replayed. Every turn kind lives here: plain bubbles, a tool connecting, a reasoning row, agent hand-off cards."
            >
              <div className="lib-frame lib-frame--pad" style={{ maxHeight: 480, overflowY: "auto" }}>
                <SavedThread
                  chat={SAVED.find((c) => c.id === "check-mail") ?? SAVED[0]}
                  onReply={() => {}}
                  onOpenAgent={() => {}}
                  onEditAgent={() => {}}
                  onEditTask={() => {}}
                />
              </div>
            </Entry>

            <Entry
              title="ProductSidebar"
              path="src/prototype-b/ProductSidebar.tsx"
              desc="The signed-in nav rail — collapses to icons-only and grows back on hover. Toggle below to see both states."
            >
              <SidebarDemo />
            </Entry>
          </Section>

          <Section id="agent-components" title="Agent components">
            <Entry
              title="Agent chat (Turn)"
              path="src/prototype-b/agents/AgentsWorkspace.tsx"
              desc="What a message actually looks like inside a dedicated agent's thread — bubble, timestamp, a reaction glued to the corner, a link rendered by RichText, a decision, a connector landing, and the date divider between sessions. One render function per AgentTurn kind (reasoning excluded here — see the note below and the ActivityLine entry above)."
            >
              <div className="lib-agturns">
                <Turn turn={{ kind: "date", label: "Today 11:20" }} onReply={() => {}} />
                <Turn
                  turn={{
                    kind: "agent",
                    text: "I'm watching HYPE, SOL, ETH and BTC for funding moves — I'll only interrupt you when something actually moves out of the ordinary.",
                    at: "11:20",
                  }}
                  onReply={() => {}}
                />
                <Turn
                  turn={{ kind: "you", text: "Only alert me if it's a real move, not just noise.", reaction: "👍" }}
                  onReply={() => {}}
                />
                {/* No `reasoning` example here on purpose: it only ever renders on
                    the last turn (see Turn's `isLast`), and this list keeps going
                    after it — showing it mid-sequence would demonstrate exactly
                    the thing it's not allowed to do. See the ActivityLine entry
                    above for what it looks like on its own. */}
                <Turn
                  turn={{
                    kind: "decision",
                    title: "Add the Google Calendar connector?",
                    options: [
                      { letter: "A", label: "Yes, add it" },
                      { letter: "B", label: "Not now" },
                    ],
                    picked: "A",
                  }}
                  onReply={() => {}}
                />
                <Turn turn={{ kind: "connectorAdded", id: "gcal" }} onReply={() => {}} />
                {/* Only makes sense once the connector above actually exists —
                    kept in this order so the RichText-link example doesn't
                    imply a calendar event got sent before there was a
                    calendar to send it to. */}
                <Turn
                  turn={{ kind: "agent", text: "Sent — [open the event](https://calendar.example.com/event/1) to see the details." }}
                  onReply={() => {}}
                />
              </div>
            </Entry>

            <Entry
              title="AgentOrb"
              path="src/prototype-b/agents/AgentOrb.tsx"
              desc="Status carried by form and motion, never by colour — colour is identity (the agent's accent). A ring waits, a wander works, stillness and grey pause."
            >
              <div className="lib-row">
                {STATUSES.map((s) => (
                  <div key={s} className="lib-orb-cell">
                    <AgentOrb status={s} size={20} accent="#f84600" halo={s === "working"} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </Entry>

            <Entry
              title="ConnectorMark"
              path="src/prototype-b/agents/ConnectorMark.tsx"
              desc="A connector's real logo where one exists as a static asset (.svg, or .webp for the odd exported one), falling back to AppIcon's glyph the moment neither does — a failed image load moves to the next extension, then to the glyph, live. Gmail, Calendar, Drive, Notion, Slack, Telegram and Figma have real marks on file; GitHub doesn't yet, so it falls back right here."
            >
              <div className="lib-row">
                {(["gmail", "gcal", "gdrive", "notion", "slack", "telegram", "github", "figma"] as const).map((id) => (
                  <div key={id} className="lib-orb-cell">
                    <ConnectorMark id={id} className="size-5" />
                    <span>{id}</span>
                  </div>
                ))}
              </div>
            </Entry>
          </Section>
        </main>

        <Style />
      </div>
    </AgentsProvider>
  );
}

function AgentMadeDemo() {
  const { roster } = useAgents();
  return <AgentMade agent={roster[0]} onOpen={() => {}} onDismiss={() => {}} />;
}

function FirstMeetingDemo() {
  const meeting = useFirstMeeting({ onDone: () => {} });
  return <FirstMeeting meeting={meeting} />;
}

/** advances the real hook past question 1 on mount, via the same `choose`
 *  it would take a click to call live — so question 2 is real, not redrawn */
/**
 * Question 2, without waiting on the real hook's own timed transition — that
 * transition schedules a timer inside `useFirstMeeting` itself, and driving it
 * from outside is exactly the kind of thing React's dev-mode double-effect
 * can quietly cancel before it fires. Same real `FirstMeeting`, fed a plain
 * literal `meeting` shaped like the hook's own return value instead — no
 * different, in principle, from any other demo on this page that hands a
 * component a fixed prop instead of the live state that would normally
 * produce it (see the `Turn` demos' `picked` decisions).
 */
function FirstMeetingStage2Demo() {
  const meeting: ReturnType<typeof useFirstMeeting> = {
    step: "preference",
    currentQuestion: {
      id: "demo-preference",
      stage: 1,
      text: "One thing that helps me work better with you: do you want me to be more direct, or give you more room to think things through?",
    },
    thinking: false,
    acceptsText: false,
    submit: () => {},
    choose: () => {},
  };
  return <FirstMeeting meeting={meeting} />;
}

function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="lib-sidebar-demo">
      <button type="button" className="lib-toggle" onClick={() => setCollapsed((v) => !v)}>
        {collapsed ? "Show expanded" : "Show collapsed"}
      </button>
      <div className="lib-frame" style={{ height: 420, display: "flex" }}>
        <ProductSidebar onNewChat={() => {}} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((v) => !v)} />
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  { id: "screens", label: "Screens" },
  { id: "onboarding", label: "Onboarding" },
  { id: "chat-components", label: "Chat components" },
  { id: "agent-components", label: "Agent components" },
];

function Nav() {
  const [active, setActive] = useState(NAV_SECTIONS[0].id);

  useEffect(() => {
    const sections = NAV_SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "current" once it has crossed a line near the top
    // of the viewport — the same idea any reading app's own scroll position
    // uses, so the highlighted item is always the one actually on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="lib-nav">
      <p className="lib-nav-title">Starchild</p>
      <p className="lib-nav-sub">Component library</p>
      {NAV_SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "lib-nav-active" : undefined}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}

function Header() {
  return (
    <header className="lib-header">
      <h1>Chat &amp; Agents component library</h1>
      <p>
        Every demo on this page renders the real component from <code>src/prototype-b/</code> (variant B —
        no Automations) — nothing here is a redrawn approximation. Scoped to Chat and Agents only; the
        rest of the product (Landing, Onboarding, Sandbox) isn't catalogued here.
      </p>
    </header>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="lib-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Entry({
  title,
  path,
  desc,
  children,
}: {
  title: string;
  path: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <article className="lib-entry">
      <div className="lib-entry-head">
        <h3>{title}</h3>
        <code>{path}</code>
      </div>
      <p className="lib-entry-desc">{desc}</p>
      <div className="lib-preview">{children}</div>
    </article>
  );
}

function Style() {
  return (
    <style>{`
      .lib-root { display: flex; min-height: 100vh; background: #0a0a0b; color: #fff; }

      .lib-nav {
        position: sticky; top: 0; align-self: flex-start;
        width: 220px; flex: none; height: 100vh; overflow-y: auto;
        padding: 24px 20px; display: flex; flex-direction: column; gap: 4px;
        border-right: 1px solid rgba(255,255,255,.08);
      }
      .lib-nav-title { margin: 0; font-size: 15px; font-weight: 700; letter-spacing: .08em; }
      .lib-nav-sub { margin: 0 0 16px; font-size: 12.5px; color: rgba(255,255,255,.4); }
      .lib-nav a {
        padding: 7px 8px; border-radius: 8px; font-size: 13.5px; color: rgba(255,255,255,.65);
        text-decoration: none;
      }
      .lib-nav a:hover { background: rgba(255,255,255,.06); color: #fff; }
      .lib-nav a.lib-nav-active {
        background: rgba(248,70,0,.12); color: var(--color-primary); font-weight: 600;
      }

      .lib-main { flex: 1; min-width: 0; padding: 40px 48px 120px; max-width: 1000px; }

      .lib-header h1 { margin: 0 0 10px; font-size: 26px; font-weight: 700; }
      .lib-header p { margin: 0 0 40px; max-width: 640px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.5); }
      .lib-header code { color: rgba(255,255,255,.7); }

      .lib-section { margin-bottom: 56px; }
      .lib-section h2 {
        margin: 0 0 20px; padding: 48px 0 10px; font-size: 26px; font-weight: 500;
        text-align: left; color: var(--color-primary);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .lib-entry { margin-bottom: 40px; }
      .lib-entry-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
      .lib-entry-head h3 { margin: 0; font-size: 16px; font-weight: 600; }
      .lib-entry-head code {
        font-size: 12px; color: rgba(255,255,255,.35); background: rgba(255,255,255,.05);
        padding: 2px 7px; border-radius: 5px;
      }
      .lib-entry-desc { margin: 0 0 16px; max-width: 680px; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.5); }

      .lib-preview {
        padding: 24px; border-radius: 14px;
        border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02);
      }

      .lib-frame { border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); }
      .lib-frame--pad { padding: 20px; }
      /* Some screens are wider than this column on purpose (a full sidebar,
         not the collapsed rail) — scrolls sideways here rather than clipping. */
      .lib-frame-scroll { overflow-x: auto; }

      .lib-stack { display: flex; flex-direction: column; gap: 14px; }

      /* Different states of one sequence, shown side by side rather than as
         separate catalog entries — the point being made is the progression,
         not two unrelated components that happen to share a file. */
      .lib-sequence { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
      .lib-sequence-step { display: flex; flex-direction: column; gap: 10px; }
      .lib-sequence-label {
        margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .08em;
        text-transform: uppercase; color: rgba(255,255,255,.35);
      }
      .lib-sequence-arrow { flex: none; font-size: 20px; color: rgba(255,255,255,.25); }

      /* IntroPopover's own outer wrapper is always position:absolute, sized
         off whatever real anchor it hangs from in the product — with no real
         anchor here to size against, that positioning just floated the card
         over whatever else happened to be on the page. Forcing it back to
         static lays the card out as a plain block instead, same as any other
         component preview on this page. */
      /* IntroPopover's own outer wrapper always positions itself absolutely off
         a real anchor this page doesn't have — there's no popup to hang here,
         so it's forced back to a plain static block and just shows the card
         itself, laid out like any other component preview. */
      .lib-intro-pair { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
      .lib-intro-box > div {
        position: static !important; inset: auto !important;
        /* the "right" placement also carries a -translate-y-1/2 to vertically
           centre on its real anchor — with no anchor here, that transform is
           the other half of what was floating this off its own box */
        transform: none !important;
      }
      /* Relies on AgentsWorkspace's own <style> tag being on the page (it is —
         see the Screens section above) for .ag-bubble/.ag-msg-col/etc.; this
         just gives Turn's output the same dark backdrop and gap it has there. */
      .lib-agturns { display: flex; flex-direction: column; gap: 18px; padding: 4px; }
      .lib-row { display: flex; flex-wrap: wrap; gap: 24px; }

      .lib-bubble {
        max-width: 420px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
        background: rgba(255,255,255,.06); font-size: 14.5px; line-height: 1.5;
      }
      .lib-bubble--mine { border-radius: 16px 16px 4px 16px; background: rgba(248,70,0,.14); }

      .lib-orb-cell {
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        font-size: 12px; color: rgba(255,255,255,.5);
      }

      .lib-sidebar-demo { display: flex; flex-direction: column; gap: 12px; }
      .lib-toggle {
        align-self: flex-start; padding: 7px 14px; border-radius: 999px; cursor: pointer;
        border: 1px solid rgba(255,255,255,.15); background: none; color: #fff; font-size: 12.5px;
      }
      .lib-toggle:hover { background: rgba(255,255,255,.06); }
    `}</style>
  );
}
