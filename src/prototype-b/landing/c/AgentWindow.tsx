import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark, ChevronDownIcon } from "../../icons";
import { AgentOrb } from "../../agents/AgentOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import type { AgentStory, ToolKind } from "./agentsData";

/**
 * An agent at work, rather than an explanation of one.
 *
 * Four things in sequence: what was asked once, what it said back, what it has
 * been doing since, and where it came back. The last two are the argument — an
 * agent that only produced a result could have been a slow search box; one with a
 * history of hours it worked through, ending in a message on Telegram, is the
 * thing the section is actually claiming.
 *
 * It is drawn as the real Agents screen, because a landing page that advertises a
 * screen nobody will recognise on arrival has spent its credibility on a picture.
 * So: everything in the thread is a bubble, the header carries only who it is, and
 * the schedule and the connected tools live in the panel behind the name — the
 * same three decisions the product itself makes.
 *
 * Nothing loops. The beats arrive, the last one stays, and the panel is then still.
 */

/** when each beat lands, in ms from the start of the run */
const BEAT = { request: 250, agent: 1150, tools: 1900, activity: 2600 };
/** one row of history at a time — fast enough not to stall, slow enough to read */
const ROW_EVERY = 760;
/** the message arrives after the run that earned it */
const DELIVERY_AFTER = 950;

const rise = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

/* Category glyphs, not logos. 16px box, 1.4 stroke, currentColor — the same rules
   the rest of the product's icons follow. The brand is carried by the name beside
   them; a hand-drawn approximation of someone's mark would only ever look wrong. */
const GLYPH: Record<ToolKind, JSX.Element> = {
  flights: <path d="M2.2 9.4 14 5.2l-.9 2.5-7 4.6-1.3-.5 2-2.6-2.4.6z" />,
  search: <><circle cx="7.2" cy="7.2" r="4.4" /><path d="M10.5 10.5 14 14" /></>,
  telegram: <path d="M14.2 2.6 1.9 7.4l3.4 1.2 1.2 3.6 1.9-2.3 3.2 2.4z" />,
  mail: <><rect x="1.8" y="3.4" width="12.4" height="9.2" rx="1.6" /><path d="m2.4 4.6 5.6 4 5.6-4" /></>,
  calendar: <><rect x="2.2" y="3.2" width="11.6" height="10.6" rx="1.6" /><path d="M2.2 6.5h11.6M5.4 1.8v2.6M10.6 1.8v2.6" /></>,
  slack: <path d="M6.2 2.4v7.4M9.8 6.2v7.4M2.4 9.8h7.4M6.2 6.2h7.4" />,
  drive: <path d="M6.2 2.2h3.6L14 9.2l-1.8 3.1H3.8L2 9.2z" />,
  web: <><circle cx="8" cy="8" r="5.9" /><path d="M2.1 8h11.8M8 2.1c1.6 1.7 2.4 3.7 2.4 5.9S9.6 12.2 8 13.9C6.4 12.2 5.6 10.2 5.6 8s.8-4.2 2.4-5.9" /></>,
};

/** Roughly the colour each app is known by. A tinted tile with a category glyph is
 *  as close to a real icon as this can honestly get, and it is what makes the card
 *  read as a notification rather than as another panel. */
const APP_TINT: Partial<Record<ToolKind, string>> = {
  telegram: "#2aabee",
  slack: "#611f69",
  mail: "#d93025",
};

function ToolIcon({ kind, className = "" }: { kind: ToolKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {GLYPH[kind]}
    </svg>
  );
}

export function AgentWindow({ story }: { story: AgentStory }) {
  const reduced = usePrefersReducedMotion();
  const rows = story.activity.length;
  const deliveryAt = BEAT.activity + rows * ROW_EVERY + DELIVERY_AFTER;

  const [at, setAt] = useState(reduced ? deliveryAt + 1 : 0);
  const [logged, setLogged] = useState(reduced ? rows : 0);

  // Restarts on every tab change: the story is the point, and dropping someone
  // into the middle of one they did not watch begin explains nothing.
  useEffect(() => {
    if (reduced) {
      setAt(deliveryAt + 1);
      setLogged(rows);
      return;
    }

    setAt(0);
    setLogged(0);

    const timers = [
      ...[BEAT.request, BEAT.agent, BEAT.tools, BEAT.activity, deliveryAt].map((ms) =>
        window.setTimeout(() => setAt(ms), ms),
      ),
      ...story.activity.map((_, i) =>
        window.setTimeout(() => setLogged(i + 1), BEAT.activity + 200 + i * ROW_EVERY),
      ),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [story, reduced, rows, deliveryAt]);

  const shown = (ms: number) => at >= ms;

  // The last line is the one it came back for, and in the product a result is a
  // thing the agent says — not a highlighted row inside a log of what it did.
  const runs = story.activity.filter((r) => !r.hit);
  const hit = story.activity.find((r) => r.hit);
  const hitShown = logged >= rows;

  return (
    // One product surface, not four things stacked on the page. The frame is what
    // makes the request, the agent and its history read as one screen doing one
    // job — loose on the background they read as four unrelated fragments.
    <div className="aw-frame">
      <div className="aw-chrome">
        <LogoMark className="size-[15px]" />
        <span className="aw-crumb">Agents</span>
        <span className="aw-crumb-sep" aria-hidden="true">/</span>
        <span className="aw-crumb-here">{story.agent.name}</span>
      </div>

      <div className="aw-main">
        <div className="aw-thread">
          {/* Who it is, and nothing else — the schedule and the tools are facts
              about the agent rather than about the conversation, and they are one
              click away behind the name. */}
          <AnimatePresence>
            {shown(BEAT.agent) && (
              <motion.header
                key="head"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aw-head"
              >
                <span className={`aw-id${shown(BEAT.tools) ? " aw-id--open" : ""}`}>
                  <AgentOrb status="working" size={11} halo />
                  <span className="aw-name">{story.agent.name}</span>
                  <ChevronDownIcon className="aw-chev size-3.5" />
                </span>
              </motion.header>
            )}
          </AnimatePresence>

          <div className="aw-turns">
            {/* said once */}
            <AnimatePresence>
              {shown(BEAT.request) && (
                <motion.div key="request" {...rise} className="aw-turn aw-turn--mine">
                  <div className="aw-bubble aw-bubble--mine">{story.request}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* and it answered like a colleague, before it went away and did anything */}
            <AnimatePresence>
              {shown(BEAT.agent) && (
                <motion.div key="ack" {...rise} className="aw-turn">
                  <div className="aw-bubble">{story.ack}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* what it has been doing since. Work, not talk — said by the kicker
                and the list rather than by a container of its own. */}
            <AnimatePresence>
              {shown(BEAT.activity) && (
                <motion.div
                  key="log"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="aw-turn"
                >
                  <div className="aw-bubble aw-log">
                    <p className="aw-log-when">Since {story.activity[0].time}</p>
                    {runs.slice(0, logged).map((row) => (
                      <motion.p
                        key={row.time + row.action}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="aw-log-row"
                      >
                        <span className="aw-log-time">{row.time}</span>
                        <span>
                          {row.action}
                          <span className="aw-log-result"> — {row.result}</span>
                        </span>
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* the run that mattered, said the way it says everything else */}
            <AnimatePresence>
              {hit && hitShown && (
                <motion.div key="hit" {...rise} className="aw-turn">
                  <div className="aw-bubble aw-hit">
                    <span className="aw-hit-time">{hit.time}</span>
                    <strong>{hit.action}</strong>
                    <span className="aw-hit-result">{hit.result}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The panel behind the name. It is a column rather than an overlay for the
            same reason it is in the product: it is reference you keep open while
            reading the thread. */}
        <AnimatePresence>
          {shown(BEAT.tools) && (
            <motion.aside
              key="drawer"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 210, opacity: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="aw-drawer"
            >
              <div className="aw-drawer-in">
                <p className="aw-kicker">Agent</p>

                <p className="aw-field">
                  <span className="aw-label">Right now</span>
                  <span className="aw-state">
                    <i aria-hidden="true" />
                    {story.agent.cadence}
                  </span>
                </p>

                <div className="aw-field">
                  <span className="aw-label">Connected tools</span>
                  {/* chips, because what an agent can reach is something you read at
                      a glance — changing it is a different act, with its own control */}
                  <div className="aw-chips">
                    {story.agent.tools.map((tool) => (
                      <span key={tool.name} className="aw-chip">
                        <ToolIcon kind={tool.kind} className="size-3.5" />
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom right, over the window, the way a desktop notification arrives —
          and rising into the corner rather than dropping into it, because that is
          the direction the real ones come from. */}
      <AnimatePresence>
        {shown(deliveryAt) && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="aw-notif"
          >
            <div className="aw-notif-head">
              <span
                className="aw-notif-icon"
                style={{ background: APP_TINT[story.delivery.app.kind] ?? "rgba(255,255,255,.16)" }}
              >
                <ToolIcon kind={story.delivery.app.kind} className="size-3.5" />
              </span>
              <span className="aw-notif-app">{story.delivery.app.name}</span>
              <span className="aw-notif-time">now</span>
            </div>

            <p className="aw-notif-from">{story.agent.name}</p>
            <p className="aw-notif-body">
              {story.delivery.lead} {story.delivery.title} — <strong>{story.delivery.figure}</strong>.{" "}
              {story.delivery.detail}
            </p>

            <span className="aw-notif-action">{story.delivery.cta}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* the window the whole story happens inside */
        .aw-frame {
          position: relative; overflow: hidden;
          border-radius: 16px; border: 1px solid rgba(255,255,255,.1);
          background: #0e0e10;
          box-shadow: 0 24px 60px -20px rgba(0,0,0,.7);
          font-family: var(--font-google-sans);
        }

        .aw-chrome {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          font-size: 12.5px;
        }
        .aw-crumb { color: rgba(255,255,255,.5); }
        .aw-crumb-sep { color: rgba(255,255,255,.22); }
        .aw-crumb-here { color: rgba(255,255,255,.8); }

        /* thread and panel, the way the product lays them out */
        .aw-main { display: flex; align-items: stretch; min-height: 470px; }
        .aw-thread { display: flex; flex-direction: column; flex: 1; min-width: 0; }

        /* the header keeps the one thing that answers "who am I talking to" */
        .aw-head {
          display: flex; align-items: center; padding: 11px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .aw-id {
          display: flex; align-items: center; gap: 10px;
          padding: 5px 11px 5px 8px; margin-left: -8px; border-radius: 999px;
          transition: background-color .3s ease;
        }
        .aw-id--open { background: rgba(255,255,255,.06); }
        .aw-name { font-size: 15.5px; font-weight: 600; color: #fff; }
        .aw-chev { color: rgba(255,255,255,.3); transition: transform .35s ease; }
        .aw-id--open .aw-chev { transform: rotate(180deg); color: rgba(255,255,255,.55); }

        .aw-turns {
          flex: 1; display: flex; flex-direction: column; gap: 14px;
          padding: 20px 18px 24px;
        }
        .aw-turn { display: flex; justify-content: flex-start; }
        .aw-turn--mine { justify-content: flex-end; }

        /* one shell for everything in the thread: the agent is the only thing on
           this screen with a voice, so what it did arrives the same way as what it
           said, and the difference is carried by what is inside the bubble */
        .aw-bubble {
          max-width: 84%; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
          font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.85);
        }
        .aw-bubble--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
          color: #fff;
        }

        .aw-log { display: flex; flex-direction: column; gap: 6px; padding-top: 12px; padding-bottom: 13px; }
        .aw-log-when {
          margin: 0 0 3px; font-size: 11.5px; letter-spacing: .06em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .aw-log-row {
          display: flex; gap: 10px; margin: 0;
          font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.72);
        }
        .aw-log-time {
          flex: none; width: 38px; color: rgba(255,255,255,.3);
          font-variant-numeric: tabular-nums;
        }
        .aw-log-result { color: rgba(255,255,255,.38); }

        /* the payoff: a bubble like any other, and the only accent in the thread */
        .aw-hit { display: flex; flex-direction: column; gap: 2px; padding-top: 12px; padding-bottom: 13px; }
        .aw-hit-time { font-size: 11.5px; color: rgba(255,255,255,.3); font-variant-numeric: tabular-nums; }
        .aw-hit strong { font-size: 14.5px; font-weight: 600; color: #fff; }
        .aw-hit-result { font-size: 13.5px; color: var(--color-primary); }

        /* ---------- the panel behind the name ---------- */

        .aw-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.015);
        }
        .aw-drawer-in {
          width: 210px; display: flex; flex-direction: column; gap: 18px;
          padding: 14px 16px 20px;
        }
        .aw-kicker, .aw-label {
          font-size: 10.5px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .aw-kicker { margin: 0; }
        .aw-field { display: flex; flex-direction: column; gap: 8px; margin: 0; }

        /* text and a dot — a status is the one thing here that is only ever read,
           so it is not shaped like the things you press */
        .aw-state {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,.6);
        }
        .aw-state i {
          width: 6px; height: 6px; border-radius: 999px; flex: none;
          background: var(--color-primary);
          animation: aw-breathe 2.8s ease-in-out infinite;
        }
        @keyframes aw-breathe { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }

        .aw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .aw-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 999px;
          border: 1px solid rgba(248,70,0,.3); background: rgba(248,70,0,.08);
          font-size: 11.5px; color: rgba(255,255,255,.85);
        }
        .aw-chip svg { color: var(--color-primary); }

        /* A notification, at the size and shape a system draws one, sitting over the
           window rather than in it. Absolute so it never adds height — one that
           pushed the interface down would be a panel again. */
        .aw-notif {
          position: absolute; right: 16px; bottom: 16px;
          z-index: 5; width: min(340px, calc(100% - 32px));
          padding: 13px 15px 12px; border-radius: 20px;
          background: rgba(38,38,42,.86);
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 40px -12px rgba(0,0,0,.8);
        }

        .aw-notif-head { display: flex; align-items: center; gap: 8px; }
        .aw-notif-icon {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 6px; color: #fff; flex: none;
        }
        .aw-notif-app { font-size: 12px; letter-spacing: .01em; color: rgba(255,255,255,.6); }
        /* every phone puts the age of the notification here, and its absence is the
           kind of small wrongness that stops the whole thing reading as one */
        .aw-notif-time { margin-left: auto; font-size: 11.5px; color: rgba(255,255,255,.35); }

        .aw-notif-from { margin: 9px 0 0; font-size: 14px; font-weight: 600; color: #fff; }
        .aw-notif-body {
          margin: 2px 0 0; font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.72);
        }
        /* the number is bold rather than orange: notifications do not carry a brand's
           accent, and one that did would stop looking like a notification */
        .aw-notif-body strong { font-weight: 600; color: #fff; }

        .aw-notif-action {
          display: block; margin-top: 11px; padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,.12);
          font-size: 13px; font-weight: 500; color: #6ab3f3;
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-state i { animation: none; opacity: 1; }
        }

        /* Narrow, the panel goes under the thread rather than squeezing it — the
           same call the product makes, and for the same reason: a 210px column
           beside a 260px thread is two things that both stopped working. */
        @media (max-width: 1023px) {
          .aw-main { flex-direction: column; min-height: 0; }
          .aw-drawer {
            width: 100% !important; opacity: 1 !important;
            border-left: 0; border-top: 1px solid rgba(255,255,255,.07);
          }
          .aw-drawer-in { width: auto; }
          .aw-turns { padding-bottom: 18px; }
        }
      `}</style>
    </div>
  );
}
