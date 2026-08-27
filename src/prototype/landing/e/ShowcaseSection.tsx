import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../../Container";
import {
  PlusIcon,
  PanelIcon,
  BriefcaseIcon,
  PuzzleIcon,
  GridIcon,
  StoreIcon,
  TrophyIcon,
  EllipsisIcon,
  SearchIcon,
} from "../../icons";
import { AgentOrb } from "../../agents/AgentOrb";
import { AGENTS } from "../../agents/agentsData";
import { STILL_TAB, reveal } from "./still";

/**
 * Section 4 — the product, three ways.
 *
 * This is the real interface at about three-quarter scale: the same rail in the
 * same order, the same lit area, the same recents, the same bubbles and the same
 * roster rows anyone gets after signing in.
 *
 * It was a skeleton of grey bars, which was safe and said nothing. A landing page
 * that shows a wireframe of itself is admitting it has nothing to show, and the
 * one thing this section exists to do is show.
 *
 * Two rules keep it honest rather than flattering:
 *
 *   · The agents come from the product's own seed data, so the Organize tab
 *     cannot show a roster the app would never produce.
 *   · Nothing here is bigger, brighter or emptier than it is in the app. The
 *     temptation on a page like this is to inflate the accent and thin out the
 *     chrome until the mock is nicer than the thing — and that gap is the whole
 *     reason a product screenshot ever disappoints.
 *
 * The window is cut off at the bottom rather than drawn whole. A complete window
 * floating in space is a screenshot; one running off the edge is a surface that
 * continues past what there is room to show.
 */

type Area = "chat" | "agents";

type Tab = {
  id: string;
  label: string;
  /** which item in the rail is lit while this tab is up */
  area: Area;
  render: () => JSX.Element;
};

/* ────────────────────────────────────────────────────────────────────────────
   the three mains
   ──────────────────────────────────────────────────────────────────────────── */

function Research() {
  return (
    <div className="sc-doc">
      <h3 className="sc-title">Climate adaptation strategies</h3>

      <div className="sc-split">
        <div className="sc-prose">
          <p>
            Coastal cities are converging on three approaches, and most of what separates them is
            who pays, and when.
          </p>
          <p>
            Managed retreat is the cheapest over thirty years and the hardest to begin. Hard
            defences are the reverse. Everything else is a blend of the two.
          </p>
          <p>Worth reading first: the Rotterdam programme, the only one with results yet.</p>
        </div>

        <div className="sc-card">
          <p className="sc-card-label">Key findings</p>
          <svg viewBox="0 0 200 70" className="sc-art" fill="none" aria-hidden="true">
            <path
              d="M4 56 C 28 54, 38 30, 58 30 C 76 30, 80 47, 98 47 C 122 47, 126 11, 152 9 C 172 8, 182 11, 196 11"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="sc-card-foot">Cost over 30 years, by approach</p>
        </div>
      </div>
    </div>
  );
}

function Create() {
  return (
    <div className="sc-doc">
      <h3 className="sc-title">Launch poster, three directions</h3>

      <div className="sc-split">
        <div className="sc-prose">
          <p>
            Three of them, using the same type at three weights and none of the same idea. The
            middle one is the safe answer.
          </p>
          <p>The third is the one I would run.</p>
        </div>

        <div className="sc-posters" aria-hidden="true">
          {[
            { bg: "linear-gradient(160deg,#f84600,#7a1d00)", bar: "72%" },
            { bg: "linear-gradient(160deg,#26262b,#0e0e10)", bar: "54%" },
            { bg: "linear-gradient(160deg,#f8f4ee,#c9c2b6)", bar: "63%", dark: true },
          ].map((p, i) => (
            <span key={i} className="sc-poster" style={{ background: p.bg }}>
              <i style={{ width: p.bar, background: p.dark ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.78)" }} />
              <i style={{ width: "38%", background: p.dark ? "rgba(0,0,0,.28)" : "rgba(255,255,255,.34)" }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Organize() {
  const roster = AGENTS.slice(0, 4);
  const lead = roster[0];

  return (
    <div className="sc-agents">
      <aside className="sc-roster">
        <p className="sc-roster-head">Agents</p>
        {roster.map((a, i) => (
          <span key={a.id} className={`sc-agent${i === 0 ? " sc-agent--on" : ""}`}>
            <span className="sc-agent-orb">
              <AgentOrb status={a.status} size={8} accent={a.accent} />
            </span>
            <span className="sc-agent-body">
              <em>{a.name}</em>
              <i>{a.mood}</i>
            </span>
          </span>
        ))}
      </aside>

      <div className="sc-thread">
        <p className="sc-thread-name">
          <AgentOrb status={lead.status} size={9} halo accent={lead.accent} />
          {lead.name}
        </p>

        <span className="sc-bubble sc-bubble--mine">
          Keep on top of my inbox. Draft replies for anything routine.
        </span>
        <span className="sc-bubble">
          Got it. I&rsquo;ll go through it every morning and leave the drafts for you.
        </span>
        <span className="sc-bubble sc-bubble--log">
          <em>This morning, 8:00</em>
          Checked Gmail
          <br />
          Reviewed 12 emails
          <br />
          Drafted 4 replies
        </span>
      </div>
    </div>
  );
}

const TABS: Tab[] = [
  { id: "research", label: "Research", area: "chat", render: Research },
  { id: "create", label: "Create", area: "chat", render: Create },
  { id: "organize", label: "Organize", area: "agents", render: Organize },
];

const REST = [
  { label: "Skills", Icon: PuzzleIcon },
  { label: "Projects", Icon: GridIcon },
  { label: "Marketplace", Icon: StoreIcon },
  { label: "Missions", Icon: TrophyIcon },
  { label: "More", Icon: EllipsisIcon },
  { label: "Search conversations", Icon: SearchIcon },
];

const RECENT = ["Climate adaptation strategies", "Launch poster", "Q3 planning"];

/* ──────────────────────────────────────────────────────────────────────────── */

export function ShowcaseSection() {
  // Only the open tab is in the DOM, so a capture gets one of the three. ?tab=
  // picks which — import three times to collect the set.
  const [at, setAt] = useState(() => {
    const asked = TABS.findIndex((t) => t.id === STILL_TAB);
    return asked === -1 ? 0 : asked;
  });
  const tab = TABS[at];
  const Main = tab.render;

  return (
    <section className="sc-section">
      <Container>
        <div className="sc-tabs" role="tablist" aria-label="What Starchild is for">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === at}
              onClick={() => setAt(i)}
              className={`sc-tab${i === at ? " sc-tab--on" : ""}`}
            >
              {t.label}
              {/* One rule that slides between the labels rather than three that
                  switch on and off — it is one selection moving, not three states. */}
              {i === at && <motion.span layoutId="sc-underline" className="sc-rule" />}
            </button>
          ))}
        </div>

        <div className="sc-window">
          {/* The rail, in the product's order, with the tab's own area lit. */}
          <aside className="sc-rail" aria-hidden="true">
            <span className="sc-new">
              <PlusIcon className="size-[13px]" />
              New chat
            </span>

            <div className="sc-navs">
              <span className={`sc-nav${tab.area === "chat" ? " sc-nav--on" : ""}`}>
                <PanelIcon className="size-[14px]" />
                Chat
              </span>
              <span className={`sc-nav${tab.area === "agents" ? " sc-nav--on" : ""}`}>
                <BriefcaseIcon className="size-[14px]" />
                Agents
              </span>
              <span className="sc-nav">
                <PuzzleIcon className="size-[14px]" />
                Connectors
              </span>
            </div>

            <span className="sc-divider" />

            <div className="sc-navs">
              {REST.map(({ label, Icon }) => (
                <span key={label} className="sc-nav">
                  <Icon className="size-[14px]" />
                  {label}
                </span>
              ))}
            </div>

            <p className="sc-recent-head">Recent</p>
            {RECENT.map((r) => (
              <span key={r} className="sc-recent">
                {r}
              </span>
            ))}
          </aside>

          <div className="sc-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                {...reveal({
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -6, transition: { duration: 0.16 } },
                  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                })}
                className="sc-main-in"
              >
                <Main />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>

      <style>{`
        .sc-section {
          position: relative; overflow: hidden;
          padding: 96px 0 0; background: #050506;
        }

        .sc-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 40px; }
        .sc-tab {
          position: relative; cursor: pointer;
          padding: 8px 14px 14px; border: 0; background: none;
          font-family: var(--font-google-sans); font-size: 15px; font-weight: 500;
          color: rgba(255,255,255,.42); transition: color .2s ease;
        }
        .sc-tab:hover { color: rgba(255,255,255,.75); }
        .sc-tab--on { color: var(--color-primary); }
        .sc-tab:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; border-radius: 8px; }
        .sc-rule {
          position: absolute; left: 14px; right: 14px; bottom: 6px; height: 2px;
          border-radius: 2px; background: var(--color-primary);
        }

        .sc-window {
          position: relative; display: flex;
          max-width: 1000px; margin: 0 auto;
          height: 460px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          border-bottom: 0; border-radius: 20px 20px 0 0;
          background: #0a0a0b;
          font-family: var(--font-google-sans);
          -webkit-mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
        }

        /* A horizon, not a blob. The light comes up from under the cut edge, so it
           is wide and low and its bright half is clipped away by the section —
           explicit radii, because closest-side from a point on the bottom edge is
           zero away and the gradient collapses to nothing. */
        .sc-section::after {
          content: ""; position: absolute; left: 50%; bottom: -70px; z-index: 1;
          width: 1180px; height: 260px; transform: translateX(-50%);
          pointer-events: none;
          background: radial-gradient(62% 100% at 50% 100%, rgba(248,70,0,.5) 0%, rgba(248,70,0,.16) 46%, rgba(248,70,0,0) 78%);
        }

        /* ---------- the rail ---------- */

        .sc-rail {
          flex: none; width: 198px; padding: 16px 12px;
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,.07);
          background: #0c0c0d;
        }
        .sc-new {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 13px; border-radius: 999px; margin-bottom: 14px;
          background: var(--color-primary); color: #fff;
          font-size: 12.5px; font-weight: 500;
        }
        .sc-navs { display: flex; flex-direction: column; gap: 1px; }
        .sc-nav {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 9px; border-radius: 8px;
          font-size: 12.5px; color: rgba(255,255,255,.55);
        }
        .sc-nav svg { color: rgba(255,255,255,.38); }
        .sc-nav--on { background: rgba(255,255,255,.09); color: #fff; }
        .sc-nav--on svg { color: var(--color-primary); }

        .sc-divider { height: 1px; margin: 12px 9px 10px; background: rgba(255,255,255,.08); }

        .sc-recent-head {
          margin: 16px 0 6px 9px; font-size: 9.5px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .sc-recent {
          padding: 5px 9px; font-size: 12px; color: rgba(255,255,255,.5);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        /* ---------- the mains ---------- */

        .sc-main { flex: 1; min-width: 0; }
        .sc-main-in { height: 100%; }

        .sc-doc { padding: 30px 32px; }
        .sc-title { margin: 0 0 22px; font-size: 24px; font-weight: 500; color: #fff; }

        .sc-split { display: flex; gap: 30px; align-items: flex-start; }
        .sc-prose { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
        .sc-prose p { margin: 0; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.62); }

        .sc-card {
          flex: none; width: 224px; padding: 14px 14px 15px;
          border-radius: 14px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.03);
        }
        .sc-card-label { margin: 0 0 12px; font-size: 13px; color: rgba(255,255,255,.85); }
        .sc-art { display: block; width: 100%; height: 70px; }
        .sc-card-foot { margin: 10px 0 0; font-size: 11px; color: rgba(255,255,255,.3); }

        .sc-posters { flex: none; display: flex; gap: 10px; }
        .sc-poster {
          display: flex; flex-direction: column; justify-content: flex-end; gap: 5px;
          width: 68px; height: 96px; padding: 9px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.1);
        }
        .sc-poster i { height: 4px; border-radius: 999px; }

        /* ---------- the agents workspace ---------- */

        .sc-agents { display: flex; height: 100%; }
        .sc-roster {
          flex: none; width: 190px; padding: 16px 8px;
          border-right: 1px solid rgba(255,255,255,.06);
        }
        .sc-roster-head {
          margin: 0 0 8px 8px; font-size: 9.5px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .sc-agent { display: flex; align-items: flex-start; gap: 8px; padding: 8px; border-radius: 9px; }
        .sc-agent--on { background: rgba(255,255,255,.06); }
        .sc-agent-orb { flex: none; margin-top: 4px; }
        .sc-agent-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .sc-agent em { font-style: normal; font-size: 12.5px; font-weight: 500; color: #fff; }
        .sc-agent i {
          font-style: normal; font-size: 11px; color: rgba(255,255,255,.35);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .sc-thread {
          flex: 1; min-width: 0; padding: 14px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .sc-thread-name {
          display: flex; align-items: center; gap: 8px; margin: 0 0 8px;
          padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,.07);
          font-size: 14px; font-weight: 600; color: #fff;
        }
        .sc-bubble {
          max-width: 78%; width: fit-content; align-self: flex-start;
          padding: 9px 13px; border-radius: 14px 14px 14px 4px;
          background: rgba(255,255,255,.05);
          font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.85);
        }
        .sc-bubble--mine {
          align-self: flex-end; border-radius: 14px 14px 4px 14px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
        }
        .sc-bubble--log { color: rgba(255,255,255,.6); }
        .sc-bubble--log em {
          display: block; margin-bottom: 5px; font-style: normal;
          font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        @media (max-width: 860px) {
          .sc-section { padding-top: 64px; }
          .sc-window { height: 360px; border-radius: 16px 16px 0 0; }
          .sc-rail, .sc-roster { display: none; }
          .sc-doc { padding: 22px 20px; }
          .sc-title { font-size: 20px; margin-bottom: 16px; }
          .sc-split { flex-direction: column; gap: 20px; }
          .sc-card, .sc-posters { width: 100%; }
        }
      `}</style>
    </section>
  );
}
