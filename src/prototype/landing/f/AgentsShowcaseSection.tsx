import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "../../Container";
import { Turn } from "../../agents/AgentsWorkspace";
import { lastAgentLine, AGENTS, type Agent } from "../../agents/agentsData";
import { PlusIcon, SearchIcon } from "../../icons";
import { AgentFace } from "./AgentFace";
import agentsGlow from "../../../../design/assets/background connectors svg.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A curated five, not a fake five: every agent, name, role, colour and line
 * of dialogue below is read straight out of the product's own roster
 * (agents/agentsData.ts) rather than redrawn for the page. The showcase and
 * the app can drift in tone the day someone edits one and forgets the other,
 * but they can never drift in fact.
 */
const ORDER = ["inbox", "research", "project", "travel", "funding-watcher"];

/** the job, in one glyph — the corner mark on AgentFace, not the character
 *  itself, since all five currently wear the same face */
const EMOJI: Record<string, string> = {
  inbox: "📧",
  research: "🔍",
  project: "📋",
  travel: "✈️",
  "funding-watcher": "📈",
};

/**
 * Hand-picked indices into each agent's real `thread`, not a generic
 * "first N" or "last N" slice — a slice cuts wherever the count runs out,
 * which lands mid-question as often as not (research's real thread, sliced
 * blind, ends on "Which one do you want to plug in?" with the answer that
 * was supposed to follow it excluded). Every list below was read and picked
 * by hand so the excerpt is a complete beat: it opens on the agent saying
 * what it's doing and closes on it having said something worth the read.
 */
const PREVIEW: Record<string, number[]> = {
  inbox: [3, 4, 5, 6, 7, 8],
  research: [0, 1, 2, 3],
  project: [0, 1, 2, 3, 5],
  travel: [0, 1, 2, 3, 4, 5],
  "funding-watcher": [3, 4, 5, 6],
};

function roster(): Agent[] {
  return ORDER.map((id) => AGENTS.find((a) => a.id === id)).filter((a): a is Agent => Boolean(a));
}

const noop = () => {};

export function AgentsShowcaseSection() {
  const [agents] = useState(roster);
  const [activeId, setActiveId] = useState(agents[0]?.id ?? "");
  const active = agents.find((a) => a.id === activeId) ?? agents[0];
  const shown = active ? PREVIEW[active.id].map((i) => active.thread[i]) : [];

  if (!active) return null;

  return (
    <section className="ags-section" aria-labelledby="ags-title">
      <Container className="ags-inner relative z-10">
        <motion.h2
          id="ags-title"
          className="ags-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Dedicated agents live here.
        </motion.h2>
        <motion.p
          className="ags-sub"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          Each one can have its own role, rules, tools, and history.
        </motion.p>

        <motion.div
          className="ags-window"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <div className="ags-list">
            {/* Decorative window chrome — the traffic-light dots are not a
                real product control (the app itself has none; see .ag-new /
                .ag-menu in AgentsWorkspace), just what tells this frame it's
                a window and not a page section. The "+" beside them is the
                one real affordance, matched to the app's own .ag-new. */}
            <div className="ags-chrome">
              <span className="ags-dots" aria-hidden="true">
                <i className="ags-dot ags-dot--red" />
                <i className="ags-dot ags-dot--yellow" />
                <i className="ags-dot ags-dot--green" />
              </span>
              <span className="ags-chrome-new" aria-hidden="true">
                <PlusIcon className="size-4" />
              </span>
            </div>
            <label className="ags-search">
              <SearchIcon className="size-3.5" />
              <span>Search</span>
            </label>

            <div className="ags-rows" role="tablist" aria-label="Agents">
              {agents.map((agent) => {
                const isActive = agent.id === activeId;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ags-row${isActive ? " ags-row--on" : ""}`}
                    onClick={() => setActiveId(agent.id)}
                  >
                    <AgentFace
                      accent={agent.accent ?? "#f84600"}
                      emoji={EMOJI[agent.id]}
                      emojiSize={24}
                      size={44}
                      active={isActive}
                    />
                    <span className="ags-row-body">
                      <span className="ags-row-name">{agent.name}</span>
                      <span className="ags-row-mood">{lastAgentLine(agent)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ags-thread">
            <div className="ags-head">
              <AgentFace
                accent={active.accent ?? "#f84600"}
                emoji={EMOJI[active.id]}
                emojiSize={22}
                size={44}
                active
              />
              <span className="ags-head-body">
                <span className="ags-head-name">{active.name}</span>
                <span className="ags-head-role">{active.role}</span>
              </span>
            </div>

            <div className="ags-turns" key={active.id}>
              {shown.map((turn, i) => (
                <Turn key={i} turn={turn} onReply={noop} isLast={false} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Anchored to the bottom edge of the section itself, not stacked
          after it — an overlay, so it adds no page height of its own and
          bleeds into whatever comes next rather than sitting in its own
          block. */}
      <div className="ags-bottom-glow" aria-hidden="true" />

      <style>{`
        .ags-section {
          position: relative; padding: 108px 0 0; overflow: hidden visible;
          background: transparent; font-family: var(--font-google-sans);
        }
        /* Same object as the orbit section's own connectors wash — a soft
           radial glow, not a repeating pattern — centred behind the window.
           Anchored to .ags-inner (the title + window block) rather than to
           the section itself, so the trailing glow below can add 100vh to
           the section's own height without dragging this one's "50%" down
           along with it. */
        .ags-inner { position: relative; padding-bottom: 128px; }
        .ags-inner::before {
          content: ""; position: absolute; z-index: -1; pointer-events: none;
          top: 50%; left: 50%; width: min(1800px, 180vw); aspect-ratio: 2874 / 1498;
          transform: translate(-50%, -50%);
          background: url(${agentsGlow}) center / 100% 100% no-repeat;
        }

        /* An overlay pinned to the section's own bottom edge (top: 100%),
           not a spacer in normal flow — it adds nothing to the page's
           height, it just paints past this section's box. The origin sits
           well inside the block (42% down, not at its top) and finishes
           fading out before reaching that top edge, so there is no line
           where "no glow yet" meets "glow starts here" — the whole point,
           since a gradient that starts at meaningful opacity right at y:0
           reads as a second panel's edge, not as light spilling downward. */
        .ags-bottom-glow {
          position: absolute; z-index: -1; left: 0; right: 0; top: 100%;
          height: 100vh; pointer-events: none;
          background: radial-gradient(circle at 50% 42%,
            rgba(248,70,0,.4) 0%, rgba(248,70,0,.18) 34%, rgba(248,70,0,0) 68%);
        }
        .ags-title {
          max-width: 22ch; margin: 0 auto; text-align: center;
          color: var(--lf-ink); font-size: 42px; line-height: 50px;
          font-weight: 500; letter-spacing: 0; text-wrap: balance;
        }
        .ags-sub {
          max-width: 40ch; margin: 14px auto 0; text-align: center;
          color: rgba(var(--lf-ink-rgb), .5); font-size: 16px; line-height: 1.5;
        }

        /* ---------- the window ----------
           A framed product screen, not a page section — fixed dark chrome on
           purpose, the same reasoning LandingPageF gives .orb-halo: this is
           showing the actual dark product, and it stays dark regardless of
           what the page around it is doing. */
        .ags-window {
          display: flex; margin: 48px auto 0; max-width: 900px;
          height: 90vh; max-height: 760px; overflow: hidden; border-radius: 20px;
          border: 1px solid rgba(255,255,255,.1); background: #000;
          box-shadow: var(--lf-shadow), 0 0 0 1px rgba(0,0,0,.4);
        }

        /* ---------- roster, copied from AgentsWorkspace's .ag-list / .ag-row
           for visual parity — there is no shared stylesheet between the app
           and the landing page to import this from, so the values are
           duplicated on purpose rather than rebuilt from scratch. */
        .ags-list {
          display: flex; flex-direction: column; flex: none; width: 240px; min-height: 0;
          border-right: 1px solid rgba(255,255,255,.08); background: #0c0c0d;
        }

        .ags-chrome { display: flex; align-items: center; justify-content: space-between; padding: 14px 14px 10px; }
        .ags-dots { display: flex; align-items: center; gap: 7px; }
        .ags-dot { width: 11px; height: 11px; border-radius: 999px; }
        .ags-dot--red { background: #ff5f57; }
        .ags-dot--yellow { background: #febc2e; }
        .ags-dot--green { background: #28c840; }
        .ags-chrome-new {
          display: flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; color: rgba(255,255,255,.4);
        }

        .ags-search {
          display: flex; align-items: center; gap: 8px; margin: 0 12px 10px;
          padding: 7px 12px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.35);
        }
        .ags-search span { font-size: 13px; }

        .ags-rows { flex: 1; min-height: 0; overflow-y: auto; padding: 0 8px 8px; display: flex; flex-direction: column; gap: 2px; }

        .ags-row {
          display: flex; align-items: flex-start; gap: 8px; width: 100%;
          padding: 10px 9px; border: 0; border-radius: 10px; cursor: pointer;
          background: none; text-align: left;
          transition: background-color .15s ease;
        }
        .ags-row:hover { background: rgba(255,255,255,.04); }
        .ags-row--on { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.08); padding: 9px 8px; }
        .ags-row-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; padding-top: 2px; }
        .ags-row-name {
          font-size: 14px; font-weight: 600; color: #fff;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ags-row-mood {
          font-size: 12px; line-height: 1.4; color: rgba(255,255,255,.42);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ags-row--on .ags-row-mood { color: rgba(255,255,255,.55); }

        /* ---------- thread, same source as .ag-thread / .ag-bubble */
        .ags-thread { display: flex; flex-direction: column; flex: 1; min-width: 0; background: #000; }
        .ags-head {
          position: relative; isolation: isolate;
          display: flex; align-items: center; gap: 12px; padding: 16px 22px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .ags-head::before {
          content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: radial-gradient(46% 120% at 8% 50%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 70%);
        }
        .ags-head-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .ags-head-name {
          font-size: 20px; font-weight: 600; color: #fff;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ags-head-role {
          font-size: 13.5px; color: rgba(255,255,255,.4);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ags-turns {
          flex: 1; min-height: 0; overflow: hidden; padding: 20px 22px;
          display: flex; flex-direction: column; gap: 14px; justify-content: flex-end;
          mask-image: linear-gradient(to bottom, transparent 0, black 28px);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 28px);
        }

        /* .ag-bubble / .ag-msg / .ag-msg-col / .ag-date / .ag-reply-quote,
           values copied verbatim from AgentsWorkspace.tsx */
        .ags-turns .ag-bubble {
          width: fit-content; max-width: 420px; padding: 10px 15px;
          border-radius: 16px 16px 16px 4px; background: rgba(255,255,255,.1);
        }
        .ags-turns .ag-msg { font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.9); }
        .ags-turns .ag-msg--mine { border-radius: 16px 16px 4px 16px; background: rgba(248,70,0,.24); }
        .ags-turns .ag-msg-col {
          display: flex; flex-direction: column; gap: 4px; width: fit-content; min-width: 0;
          align-items: flex-start; align-self: flex-start;
        }
        .ags-turns .ag-msg-col--mine { align-items: flex-end; align-self: flex-end; }
        .ags-turns .ag-reply-quote {
          display: flex; align-items: center; gap: 6px; margin: 0 0 2px;
          max-width: min(300px, 72vw); min-width: 0; font-family: var(--font-google-sans);
          font-size: 12px; color: rgba(255,255,255,.4);
        }
        .ags-turns .ag-reply-quote svg { flex: none; color: rgba(255,255,255,.35); }
        .ags-turns .ag-reply-quote span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ags-turns .ag-date { align-self: center; margin: 4px 0; font-size: 11.5px; color: rgba(255,255,255,.32); }

        @media (max-width: 720px) {
          .ags-title { font-size: 34px; line-height: 40px; }
          .ags-window { flex-direction: column; height: auto; max-width: 460px; }
          .ags-list { width: auto; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.08); }
          .ags-rows { flex-direction: row; overflow-x: auto; overflow-y: hidden; padding: 0 8px 12px; }
          .ags-row { flex: none; width: 168px; }
          .ags-turns { height: 320px; }
        }
      `}</style>
    </section>
  );
}
