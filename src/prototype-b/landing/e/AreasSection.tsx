import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../../Container";
import { PlusIcon, ChatBubbleIcon, BriefcaseIcon, PuzzleIcon, SearchIcon, ArrowUpIcon } from "../../icons";
import { AgentOrb } from "../../agents/AgentOrb";
import { AGENTS, lastAgentLine } from "../../agents/agentsData";
import { AppIcon } from "../../agents/AppIcon";
import { BY_ID, INITIAL_CONNECTIONS } from "../../agents/connectors";
import { STILL, reveal } from "./still";

/**
 * Where the work lives — the product's three areas, one at a time.
 *
 * The section above this one says what you can ask for. This one says where the
 * asking happens, which is a different question and the one people actually get
 * wrong about Starchild: they assume Agents is a mode of the chat and Connectors
 * is a settings page. They are neither. Three areas, three jobs, one account.
 *
 * The left column is the navigation and the heading at the same time — there is
 * no section title above it, because a title would be a fourth thing saying what
 * the three things underneath already say. Only the open one carries copy: three
 * paragraphs stacked is a page of documentation, and one is an answer.
 *
 * On the right, the real interface inside a browser, and both halves of that are
 * deliberate:
 *
 *   · Real, not a wireframe. The agents come from the product's own seed data
 *     and the connectors from its own catalogue, so this cannot show a roster or
 *     a connection the app would never produce. Nothing here is bigger, brighter
 *     or emptier than it is in the app — that gap is the whole reason a product
 *     screenshot ever disappoints.
 *
 *   · In a browser, unlike the Showcase section further down, which shows the
 *     same interface cut off at the bottom edge of the page. There it is a
 *     surface running past the frame; here it is a place you go to, and the
 *     chrome is what says so.
 */

type AreaId = "chat" | "agents" | "connectors";

type Area = {
  id: AreaId;
  name: string;
  /** the one line that says who it is for */
  lead: string;
  /** what it actually does, in the person's terms */
  copy: string;
  render: () => JSX.Element;
};

/* ────────────────────────────────────────────────────────────────────────────
   what is on screen in each area
   ──────────────────────────────────────────────────────────────────────────── */

function Chat() {
  return (
    <div className="ar-chat">
      <div className="ar-thread">
        <p className="ar-said ar-said--mine">
          Can you help me decide what to cook tonight? I'd rather not go to the
          shop, so only what's already in the fridge.
        </p>
        <p className="ar-said">
          Tell me what you have and I'll work with it. A random-looking pile of
          ingredients is usually the more interesting problem.
        </p>
        <p className="ar-said ar-said--mine">
          Chicken thighs, broccoli, carrots, garlic and a lemon, plus the usual
          cupboard things.
        </p>
        <p className="ar-said">
          That's a lemon and garlic traybake with the broccoli thrown in for the
          last ten minutes. Want the timings?
        </p>
      </div>

      <div className="ar-composer">
        <span className="ar-composer-ph">Ask anything</span>
        <span className="ar-composer-go">
          <ArrowUpIcon className="size-[13px]" />
        </span>
      </div>
    </div>
  );
}

function Agents() {
  return (
    <div className="ar-pane">
      <div className="ar-pane-head">
        <h3 className="ar-pane-title">Agents</h3>
        <span className="ar-pane-note">5 running</span>
      </div>

      <div className="ar-roster">
        {AGENTS.slice(0, 5).map((a) => (
          <div key={a.id} className="ar-row">
            <span className="ar-row-orb">
              <AgentOrb status={a.status} size={9} accent={a.accent} />
            </span>
            <span className="ar-row-body">
              <span className="ar-row-name">{a.name}</span>
              <span className="ar-row-mood">{lastAgentLine(a)}</span>
            </span>
            <span className="ar-row-when">{a.lastActive}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connectors() {
  return (
    <div className="ar-pane">
      <div className="ar-pane-head">
        <h3 className="ar-pane-title">Connectors</h3>
        <span className="ar-pane-note">{INITIAL_CONNECTIONS.length} connected</span>
      </div>

      <div className="ar-tools">
        {INITIAL_CONNECTIONS.map((c) => {
          const tool = BY_ID[c.id];
          return (
            <div key={c.id} className="ar-tool">
              <span className="ar-tool-icon">
                <AppIcon kind={tool.kind} className="size-[15px]" />
              </span>
              <span className="ar-row-body">
                <span className="ar-row-name">{tool.name}</span>
                <span className="ar-row-mood">{c.account}</span>
              </span>
              <span className="ar-tool-on">Connected</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const AREAS: Area[] = [
  {
    id: "chat",
    name: "Chat",
    lead: "For questions, learning and everyday help.",
    copy: "Ask about anything, think a decision through, draft the message you have been putting off, compare options, or work out what to do next. One conversation, and it keeps the context.",
    render: Chat,
  },
  {
    id: "agents",
    name: "Agents",
    lead: "For the work you would rather not ask for twice.",
    copy: "Hand over the things that repeat — a check every Monday, a watch on a price, an inbox kept down to what needs you. They run on their own and come back when there is something worth interrupting you for.",
    render: Agents,
  },
  {
    id: "connectors",
    name: "Connectors",
    lead: "For the tools your work already lives in.",
    copy: "Connect Gmail, Calendar, Slack or Notion once, to your account. After that, letting an agent use one is a permission rather than another login — and you can see exactly what each of them is allowed to do.",
    render: Connectors,
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */

export function AreasSection() {
  const [at, setAt] = useState(0);
  const open = AREAS[at];
  const Main = open.render;

  return (
    <section className="ar-section">
      <Container>
        <motion.div
          {...reveal({
            initial: { opacity: 0, y: 22 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          })}
          className="ar-grid"
        >
          <div className="ar-list">
            {AREAS.map((area, i) => {
              const on = i === at;
              return (
                <div key={area.id} className={on ? "ar-item ar-item--on" : "ar-item"}>
                  <h2 className="ar-name">
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`ar-panel-${area.id}`}
                      onClick={() => setAt(i)}
                      className="ar-head"
                    >
                      {area.name}
                    </button>
                  </h2>

                  {/* Only the open one has anything to say. Three paragraphs
                      stacked is documentation; one is an answer. */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`ar-panel-${area.id}`}
                        initial={STILL ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="ar-copybox"
                      >
                        <p className="ar-lead">{area.lead}</p>
                        <p className="ar-copy">{area.copy}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="ar-stage">
            <div className="ar-browser">
              {/* Enough chrome to say "a place you go to" and no more. There is no
                  back button and no bookmarks bar, because a working browser
                  drawn in full is a drawing of a browser. */}
              <div className="ar-chrome" aria-hidden="true">
                <span className="ar-lights">
                  <i /><i /><i />
                </span>
                <span className="ar-url">
                  <SearchIcon className="size-[11px]" />
                  starchild.ai
                </span>
              </div>

              <div className="ar-app">
                <aside className="ar-rail" aria-hidden="true">
                  <span className="ar-new">
                    <PlusIcon className="size-[12px]" />
                    New chat
                  </span>

                  <div className="ar-navs">
                    <span className={`ar-nav${open.id === "chat" ? " ar-nav--on" : ""}`}>
                      <ChatBubbleIcon className="size-[13px]" />
                      Chat
                    </span>
                    <span className={`ar-nav${open.id === "agents" ? " ar-nav--on" : ""}`}>
                      <BriefcaseIcon className="size-[13px]" />
                      Agents
                    </span>
                    <span className={`ar-nav${open.id === "connectors" ? " ar-nav--on" : ""}`}>
                      <PuzzleIcon className="size-[13px]" />
                      Connectors
                    </span>
                  </div>

                  <p className="ar-recent-head">Recent</p>
                  {["Dinner from what's in the fridge", "Plan next week", "Compare the three tools"].map((r) => (
                    <span key={r} className="ar-recent">{r}</span>
                  ))}
                </aside>

                <div className="ar-main">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={open.id}
                      initial={STILL ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="ar-main-in"
                    >
                      <Main />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        .ar-section { position: relative; overflow: hidden; padding: 130px 0; background: #050506; }

        .ar-grid {
          display: grid; grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
          gap: 72px; align-items: center;
          max-width: 1160px; margin: 0 auto;
          font-family: var(--font-google-sans);
        }

        /* ---------- the left column: heading and navigation at once ---------- */

        .ar-item { border-bottom: 1px solid rgba(255,255,255,.09); }
        .ar-item:first-child .ar-head { padding-top: 0; }

        .ar-name { margin: 0; }
        .ar-head {
          width: 100%; padding: 26px 0; border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 30px; line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; text-align: left;
          color: rgba(255,255,255,.42);
          transition: color .2s ease;
        }
        .ar-head:hover { color: rgba(255,255,255,.72); }
        .ar-item--on .ar-head { color: #fff; padding-bottom: 18px; }
        .ar-head:focus-visible { outline: 2px solid rgba(248,70,0,.75); outline-offset: 3px; border-radius: 8px; }

        /* overflow hidden so the height animation has something to clip */
        .ar-copybox { overflow: hidden; }

        .ar-lead {
          margin: 0 0 18px; max-width: 30ch;
          font-size: 17px; line-height: 1.45; font-weight: 600; color: #fff;
        }
        .ar-copy {
          margin: 0 0 28px; max-width: 38ch;
          font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.55);
        }

        /* ---------- the right column: the product, in a browser ---------- */

        .ar-stage { position: relative; }

        /* the light the window throws onto the page it is sitting on */
        .ar-stage::before {
          content: ""; position: absolute; inset: -12% -6%; z-index: 0; pointer-events: none;
          background: radial-gradient(52% 52% at 50% 46%, rgba(248,70,0,.13) 0%, rgba(248,70,0,0) 72%);
        }

        .ar-browser {
          position: relative; z-index: 1;
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          background: #0a0a0b;
          box-shadow: 0 30px 80px rgba(0,0,0,.6);
        }

        .ar-chrome {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: #131315;
        }
        .ar-lights { display: flex; gap: 6px; }
        .ar-lights i { width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.16); }
        .ar-lights i:first-child { background: #ff5f57; }
        .ar-lights i:nth-child(2) { background: #febc2e; }
        .ar-lights i:last-child { background: #28c840; }

        .ar-url {
          display: inline-flex; align-items: center; gap: 7px;
          flex: 1; padding: 5px 12px; border-radius: 999px;
          background: rgba(255,255,255,.06);
          font-size: 11.5px; color: rgba(255,255,255,.5);
        }
        .ar-url svg { color: rgba(255,255,255,.32); }

        .ar-app { display: flex; height: 424px; }

        .ar-rail {
          flex: none; width: 168px; padding: 14px 10px;
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,.07);
          background: #0c0c0d;
        }
        .ar-new {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 12px; border-radius: 999px; margin-bottom: 12px;
          background: var(--color-primary); color: #fff;
          font-size: 12px; font-weight: 500;
        }
        .ar-navs { display: flex; flex-direction: column; gap: 1px; }
        .ar-nav {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 8px; border-radius: 8px;
          font-size: 12px; color: rgba(255,255,255,.55);
          transition: background-color .2s ease, color .2s ease;
        }
        .ar-nav svg { color: rgba(255,255,255,.38); }
        .ar-nav--on { background: rgba(255,255,255,.09); color: #fff; }
        .ar-nav--on svg { color: var(--color-primary); }

        .ar-recent-head {
          margin: 18px 0 6px 8px; font-size: 9px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .ar-recent {
          padding: 5px 8px; font-size: 11.5px; color: rgba(255,255,255,.48);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ar-main { flex: 1; min-width: 0; }
        .ar-main-in { height: 100%; }

        /* ---------- chat ---------- */

        .ar-chat { display: flex; flex-direction: column; height: 100%; padding: 20px 22px 18px; }
        .ar-thread { flex: 1; display: flex; flex-direction: column; gap: 14px; }

        .ar-said {
          max-width: 76%; margin: 0;
          font-size: 12.5px; line-height: 1.55; color: rgba(255,255,255,.86);
        }
        /* Yours is in a bubble and Starchild's is not — the same asymmetry the
           product uses, and the reason a long answer never looks like a wall. */
        .ar-said--mine {
          align-self: flex-end;
          padding: 10px 14px; border-radius: 16px;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.78);
        }

        .ar-composer {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          margin-top: 16px; padding: 10px 10px 10px 15px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.04);
        }
        .ar-composer-ph { font-size: 12.5px; color: rgba(255,255,255,.34); }
        .ar-composer-go {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
        }

        /* ---------- agents and connectors share a shell ---------- */

        .ar-pane { padding: 20px 22px; }
        .ar-pane-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 16px;
        }
        .ar-pane-title { margin: 0; font-size: 17px; font-weight: 500; color: #fff; }
        .ar-pane-note { font-size: 11.5px; color: rgba(255,255,255,.4); }

        .ar-roster, .ar-tools { display: flex; flex-direction: column; }

        .ar-row, .ar-tool {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 10px; border-radius: 10px;
        }
        .ar-row + .ar-row, .ar-tool + .ar-tool { border-top: 1px solid rgba(255,255,255,.05); }

        .ar-row-orb { flex: none; display: flex; width: 14px; justify-content: center; }
        .ar-tool-icon {
          flex: none; display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.7);
        }

        .ar-row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .ar-row-name { font-size: 12.5px; color: #fff; }
        .ar-row-mood {
          font-size: 11.5px; color: rgba(255,255,255,.45);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ar-row-when { flex: none; font-size: 11px; color: rgba(255,255,255,.3); }
        .ar-tool-on { flex: none; font-size: 11px; color: rgba(255,255,255,.4); }

        @media (max-width: 1000px) {
          .ar-section { padding: 90px 0; }
          .ar-grid { grid-template-columns: 1fr; gap: 44px; }
          .ar-head { font-size: 26px; padding: 20px 0; }
          .ar-app { height: 380px; }
          .ar-rail { display: none; }
        }
      `}</style>
    </section>
  );
}
