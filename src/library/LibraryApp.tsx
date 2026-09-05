import { useEffect, useState, type ReactNode } from "react";
import { AgentsProvider, useAgents } from "../prototype-b/agents/store";
import { AgentOrb } from "../prototype-b/agents/AgentOrb";
import { ConnectorChoice } from "../prototype-b/agents/AgentChatCards";
import { ConnectorMark } from "../prototype-b/agents/ConnectorMark";
import { ConnectorAdded } from "../prototype-b/agents/ConnectorAdded";
import { OptionModal } from "../prototype-b/OptionModal";
import { AgentOffer, AgentMade } from "../prototype-b/agents/ChatHandoff";
import { Reactable } from "../prototype-b/Reactable";
import { ActivityLine } from "../prototype-b/ActivityLine";
import { SavedThread } from "../prototype-b/SavedThread";
import { ProductSidebar } from "../prototype-b/ProductSidebar";
import { ChatScreen } from "../prototype-b/ChatScreen";
import { AgentsWorkspace, Turn } from "../prototype-b/agents/AgentsWorkspace";
import { type AgentStatus } from "../prototype-b/agents/agentsData";
import { SAVED } from "../prototype-b/savedChats";
import { FirstMeeting, useFirstMeeting } from "../prototype-b/onboarding/FirstMeeting";

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
              desc="The main chat screen. It includes messages, the composer, and cards for connectors and agents. The preview is wider so the full sidebar fits."
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
              desc="The Agents area: the list, conversation, and edit panel. Select a row to open it, right-click for more actions, or click a name to edit it."
            >
              <div className="lib-frame" style={{ height: 820, display: "flex", flexDirection: "column" }}>
                <AgentsWorkspace />
              </div>
            </Entry>
          </Section>

          <Section id="onboarding" title="Onboarding">
            <Entry
              title="First meeting: questions 1 and 2"
              path="src/prototype-b/onboarding/FirstMeeting.tsx"
              desc="The first screen for new users. It asks what they need help with, then how direct Starchild should be. The product shows one question at a time; this library shows both."
            >
              <div className="lib-stack">
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">1 · What do you need help with?</p>
                  <div className="lib-frame lib-frame--pad">
                    <FirstMeetingDemo />
                  </div>
                </div>
                <div className="lib-sequence-step">
                  <p className="lib-sequence-label">2 · How direct should Starchild be?</p>
                  <div className="lib-frame lib-frame--pad">
                    <FirstMeetingStage2Demo />
                  </div>
                </div>
              </div>
            </Entry>

            <Entry
              title="Intro popovers"
              path="src/prototype-b/onboarding/{ConductorIntroPopover,AgentsIntroPopover}.tsx"
              desc="Short first-use tips for Conductor Mode and Agents. In the product, each appears beside its control. This library shows simple examples of both."
            >
              <div className="lib-intro-pair">
                <div className="lib-intro-mock">
                  <div className="lib-intro-mock-visual" aria-hidden="true" />
                  <h3 className="lib-intro-mock-title">Meet Conductor Mode</h3>
                  <p className="lib-intro-mock-body">Starchild picks the right AI for each task.</p>
                  <div className="lib-intro-mock-actions">
                    <span className="lib-intro-mock-dismiss">Dismiss</span>
                    <span className="lib-intro-mock-cta">Got it</span>
                  </div>
                </div>
                <div className="lib-intro-mock">
                  <div className="lib-intro-mock-visual" aria-hidden="true" />
                  <h3 className="lib-intro-mock-title">Meet your Agents</h3>
                  <p className="lib-intro-mock-body">Give an agent a task. It keeps working and lets you know when it matters.</p>
                  <div className="lib-intro-mock-actions">
                    <span className="lib-intro-mock-dismiss">Dismiss</span>
                    <span className="lib-intro-mock-cta">Open Agents</span>
                  </div>
                </div>
              </div>
            </Entry>
          </Section>

          <Section id="chat-components" title="Chat components">
            <Entry
              title="Reactable"
              path="src/prototype-b/Reactable.tsx"
              desc="Adds actions to a message. Hover to reply, react, or copy. Reactions are available on Starchild messages and appear on the message bubble."
            >
              <div className="lib-stack">
                <Reactable align="left" text="I'm watching HYPE, SOL, ETH and BTC for important funding moves.">
                  <div className="lib-bubble">I'm watching HYPE, SOL, ETH and BTC for important funding moves.</div>
                </Reactable>
                <Reactable align="right" text="Only alert me if it's a real move." reaction="👍">
                  <div className="lib-bubble lib-bubble--mine">Only alert me if it's a real move.</div>
                </Reactable>
              </div>
            </Entry>

            <Entry
              title="ActivityLine"
              path="src/prototype-b/ActivityLine.tsx"
              desc="Shows what Starchild is doing right now, such as reading or checking something. It disappears as soon as the result is ready."
            >
              <ActivityLine label="Reading through it…" />
            </Entry>

            <Entry
              title="Create an agent from chat"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="First, Starchild offers to create an agent for a repeated task. After confirmation, it shows that the agent is ready. The conversation stays open throughout."
            >
              <div className="lib-stack">
                <div className="lib-sequence-step" style={{ width: 480 }}>
                  <p className="lib-sequence-label">1 · AgentOffer</p>
                  <AgentOffer
                    copy="You've asked me to check João's email a few times. I can watch it for you and only let you know when a reply needs your attention."
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
              title="Option modal: ask and choose"
              path="src/prototype-b/OptionModal.tsx"
              desc="Use this when Starchild needs a decision. Choose an option or write your own answer. After a choice, it shows the selected option with a checkmark."
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
              desc="Lets someone choose which connector to add to an agent, or write a different answer."
            >
              <ConnectorChoice />
            </Entry>

            <Entry
              title="Connector: add and added"
              path="src/prototype-b/agents/ConnectorAdded.tsx"
              desc="Shows a connector being added during a conversation. Select Add to connect the account; once connected, the card shows Added."
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
              desc="Shows a saved conversation. It can include messages, connector cards, activity, and agent cards."
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
              desc="The main sidebar. It can collapse to icons and expand again. Use the button below to view both states."
            >
              <SidebarDemo />
            </Entry>
          </Section>

          <Section id="agent-components" title="Agent components">
            <Entry
              title="Agent chat messages"
              path="src/prototype-b/agents/AgentsWorkspace.tsx"
              desc="Examples of messages in an agent conversation: dates, messages, reactions, choices, connectors, and links."
            >
              <div className="lib-agturns">
                <Turn turn={{ kind: "date", label: "Today 11:20" }} onReply={() => {}} />
                <Turn
                  turn={{
                    kind: "agent",
                    text: "I'm watching HYPE, SOL, ETH and BTC. I'll let you know only when something important changes.",
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
              desc="Shows an agent's status through shape and movement. The color identifies the agent; a ring means waiting and movement means working."
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
              desc="Shows the connector's logo when it is available. Otherwise, it uses the default icon. GitHub is shown here with the default icon."
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
      text: "Should I be more direct, or give you more room to think?",
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
        Examples of the real Chat and Agents components from <code>src/prototype-b/</code>. This library
        covers Chat and Agents only.
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
         off a real anchor this page doesn't have — every attempt to neutralise
         that (a stylesheet override, then a JS-level inline !important) still
         left it floating over the rest of the page, so these two are drawn by
         hand instead, the one exception on this page to "always the real
         component". */
      .lib-intro-pair { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
      .lib-intro-mock {
        display: flex; flex-direction: column; gap: 10px;
        width: 292px; border-radius: 16px;
        border: 1px solid rgba(255,255,255,.1); background: #1a1a1c;
        box-shadow: 0 20px 50px rgba(0,0,0,.35);
        font-family: var(--font-google-sans); color: #fff;
        overflow: hidden;
      }
      .lib-intro-mock-visual {
        height: 96px; background: rgba(255,255,255,.03);
        border-bottom: 1px solid rgba(255,255,255,.06);
      }
      .lib-intro-mock-title { margin: 14px 16px 0; font-size: 14.5px; font-weight: 600; color: var(--color-primary); }
      .lib-intro-mock-body { margin: 0 16px; font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.55); }
      .lib-intro-mock-actions {
        display: flex; align-items: center; justify-content: space-between;
        margin: 4px 16px 16px;
      }
      .lib-intro-mock-dismiss { font-size: 12.5px; color: rgba(255,255,255,.4); }
      .lib-intro-mock-cta {
        padding: 8px 16px; border-radius: 999px; background: var(--color-primary);
        font-size: 12.5px; font-weight: 500; color: #fff;
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
