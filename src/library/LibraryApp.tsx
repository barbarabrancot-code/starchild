import { useState, type ReactNode } from "react";
import { AgentsProvider, useAgents } from "../prototype-b/agents/store";
import { AgentOrb } from "../prototype-b/agents/AgentOrb";
import { AppIcon } from "../prototype-b/agents/AppIcon";
import { AgentLive, ExternalAlert, ConnectorChoice } from "../prototype-b/agents/AgentChatCards";
import { StatusLine } from "../prototype-b/StatusLine";
import { OptionModal } from "../prototype-b/OptionModal";
import { ConnectFirst, AgentOffer, AgentMade } from "../prototype-b/agents/ChatHandoff";
import { Reactable } from "../prototype-b/Reactable";
import { ThinkingLine } from "../prototype-b/ThinkingLine";
import { SavedThread } from "../prototype-b/SavedThread";
import { ProductSidebar } from "../prototype-b/ProductSidebar";
import { ChatScreen } from "../prototype-b/ChatScreen";
import { AgentsWorkspace, Turn } from "../prototype-b/agents/AgentsWorkspace";
import { AGENTS, type AgentStatus } from "../prototype-b/agents/agentsData";
import { SAVED } from "../prototype-b/savedChats";

/**
 * A dev-facing catalog, not a product screen — for the Chat and Agents areas
 * only, variant B (no Automations — that's variant A's thing, and this page
 * doesn't touch it). Every demo below renders the real, imported component
 * (never a redrawn look-alike), so this page goes stale exactly when the
 * component it shows actually changed, and never for any other reason.
 */

const STATUSES: AgentStatus[] = ["working", "waiting", "scheduled", "settled", "paused", "approval"];

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
              desc="The signed-in conversation: composer, message turns, connector/agent hand-off cards. Full-height, so it's shown at its own scroll rather than fit to the page."
            >
              <div className="lib-frame" style={{ height: 640 }}>
                <ChatScreen onBack={() => {}} />
              </div>
            </Entry>

            <Entry
              title="AgentsWorkspace"
              path="src/prototype-b/agents/AgentsWorkspace.tsx"
              desc="Roster, thread, and the edit drawer — the whole second product area. Click a row, right-click for the context menu, click a name to open the drawer."
            >
              <div className="lib-frame" style={{ height: 640 }}>
                <AgentsWorkspace />
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
              title="ThinkingLine"
              path="src/prototype-b/ThinkingLine.tsx"
              desc="The small wandering orb + status label shown while a live answer is being worked out. Also reused, static, as the collapsed toggle for a ReasoningRow."
            >
              <ThinkingLine label="Reading through it…" />
            </Entry>

            <Entry
              title="ConnectFirst"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="A one-time action that needs a tool nobody's connected yet — asked and answered inline, mid-task."
            >
              <ConnectFirst needs={["figma"]} onReady={() => {}} />
            </Entry>

            <Entry
              title="AgentOffer"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="Starchild noticing a repeated ask and offering to make a real agent for it — dashed border, because nothing exists yet. Two equal-weight answers; “Not now” really ends it."
            >
              <AgentOffer
                copy="That's a few times now you've asked me to check João's emails. I can keep watching on my own and only bother you when a reply actually needs your attention. This conversation stays as it is either way."
                onCreate={() => {}}
                onDismiss={() => {}}
              />
            </Entry>

            <Entry
              title="AgentMade"
              path="src/prototype-b/agents/ChatHandoff.tsx"
              desc="The receipt after an agent gets created from the chat: it exists, here's what it's called, here's the door. The conversation stays put."
            >
              <AgentMadeDemo />
            </Entry>

            <Entry
              title="OptionModal"
              path="src/prototype-b/OptionModal.tsx"
              desc="A real decision, not an update — on screen the moment it's needed, never gated behind a click on a status line. Status lines are for awareness; this is for choosing. ConnectorChoice below is this same component, just called with its own five options."
            >
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
            </Entry>

            <Entry
              title="ConnectorChoice"
              path="src/prototype-b/agents/AgentChatCards.tsx"
              desc="The moment before a connector gets added to an agent — a lettered choice asked inside the conversation, plus a free-text answer."
            >
              <ConnectorChoice />
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
              desc="What a message actually looks like inside a dedicated agent's thread — bubble, timestamp, a reaction glued to the corner, a link rendered by RichText, a collapsed reasoning row, and the date divider between sessions. One render function per AgentTurn kind."
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
                <Turn
                  turn={{
                    kind: "reasoning",
                    label: "Checking your Gmail connection now.",
                    lines: ["You don't have Gmail connected yet — your connections list is empty, so there's nothing for me to check."],
                  }}
                  onReply={() => {}}
                />
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
              title="AppIcon"
              path="src/prototype-b/agents/AppIcon.tsx"
              desc="One glyph per connector kind — no brand marks in the project, so a category stands in (mail, calendar, drive, and so on)."
            >
              <div className="lib-row">
                {(["mail", "calendar", "drive", "notion", "slack", "telegram", "web", "flights"] as const).map((k) => (
                  <div key={k} className="lib-orb-cell">
                    <AppIcon kind={k} className="size-5" />
                    <span>{k}</span>
                  </div>
                ))}
              </div>
            </Entry>

            <Entry
              title="AgentLive"
              path="src/prototype-b/agents/AgentChatCards.tsx"
              desc="The standing card inside the main chat: an agent exists and can be changed from right here. Reads live from the roster."
            >
              <AgentLive agent={AGENTS[0]} />
            </Entry>

            <Entry
              title="Agent update (bubble + StatusLine)"
              path="src/prototype-b/SavedThread.tsx"
              desc="An agent came back with something, mid-transcript rather than only on its own page — a bubble plus a status line now, not a card. AgentUpdate (the old card) was retired once every 'agent update' moment moved to this shape."
            >
              <div className="lib-stack">
                <div className="lib-bubble">Travel Watcher found a fare drop to Brazil. Open the agent for details, or keep watching.</div>
                <StatusLine label="Agent update" />
              </div>
            </Entry>

            <Entry
              title="ExternalAlert"
              path="src/prototype-b/agents/AgentChatCards.tsx"
              desc="What the same finding looks like somewhere that isn't Starchild — rendered as a thin preview, not a convincing forgery of another product's chrome."
            >
              <ExternalAlert
                agent={AGENTS[0]}
                headline="Unusual funding detected on HYPE."
                detail="Funding moved unusually positive. Alert sent to Starchild and Telegram."
                onOpen={() => {}}
                onKeep={() => {}}
                onPause={() => {}}
              />
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
  return <AgentMade agent={roster[0]} onOpen={() => {}} />;
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

function Nav() {
  return (
    <nav className="lib-nav">
      <p className="lib-nav-title">Starchild</p>
      <p className="lib-nav-sub">Component library</p>
      <a href="#screens">Screens</a>
      <a href="#chat-components">Chat components</a>
      <a href="#agent-components">Agent components</a>
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

      .lib-stack { display: flex; flex-direction: column; gap: 14px; }
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
