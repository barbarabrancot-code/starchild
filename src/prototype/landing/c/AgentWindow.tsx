import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "../../icons";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import type { AgentStory, ToolKind } from "./agentsData";

/**
 * An agent at work, rather than an explanation of one.
 *
 * Four things in sequence: what was asked once, what it was connected to, what it
 * has been doing since, and where it came back. The last two are the argument —
 * an agent that only produced a result could have been a slow search box; one with
 * a history of hours it worked through, ending in a message on Telegram, is the
 * thing the section is actually claiming.
 *
 * Nothing loops. The beats arrive, the last one stays, and the panel is then still.
 */

/** when each beat lands, in ms from the start of the run */
const BEAT = { request: 250, agent: 1150, tools: 1750, activity: 2500 };
/** one row of history at a time — fast enough not to stall, slow enough to read */
const ROW_EVERY = 820;
/** the message arrives after the run that earned it */
const DELIVERY_AFTER = 900;

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

      <div className="aw-body">
        {/* said once */}
        <AnimatePresence>
          {shown(BEAT.request) && (
            <motion.div key="request" {...rise} className="aw-said">
              {story.request}
            </motion.div>
          )}
        </AnimatePresence>

        {/* and it became something that runs */}
        <AnimatePresence>
          {shown(BEAT.agent) && (
            <motion.div key="agent" {...rise} className="aw-agent">
              <span className="aw-live" aria-hidden="true" />
              <div>
                <p className="aw-name">{story.agent.name}</p>
                <p className="aw-cadence">{story.agent.cadence}</p>
              </div>

              <AnimatePresence>
                {shown(BEAT.tools) && (
                  <motion.div
                    key="tools"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    className="aw-tools"
                  >
                    {story.agent.tools.map((tool) => (
                      <span key={tool.name} className="aw-tool">
                        <ToolIcon kind={tool.kind} className="size-3.5" />
                        {tool.name}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* what it has been doing since — the same tools, now doing something */}
        <AnimatePresence>
          {shown(BEAT.activity) && (
            <motion.div
              key="log"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="aw-log"
            >
              {story.activity.slice(0, logged).map((row) => (
                <motion.div
                  key={row.time + row.action}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`aw-row${row.hit ? " aw-row--hit" : ""}`}
                >
                  <span className="aw-time">{row.time}</span>
                  <ToolIcon kind={row.tool.kind} className="aw-row-icon size-4" />
                  <span className="aw-row-body">
                    <span className="aw-action">{row.action}</span>
                    <span className="aw-result">{row.result}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
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

        /* a floor, so the frame does not grow a row at a time as the log fills */
        .aw-body {
          display: flex; flex-direction: column; align-items: flex-start; gap: 20px;
          padding: 22px 22px 26px; min-height: 480px;
        }

        /* the only thing here shaped like a message, because it is the only thing
           the person said */
        .aw-said {
          align-self: flex-end; max-width: 82%;
          padding: 11px 17px; border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
          font-size: 14.5px; line-height: 1.5; color: #fff;
        }

        .aw-agent {
          display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px;
          align-self: stretch;
        }
        /* it is running now, and it will still be running after this beat */
        .aw-live {
          width: 7px; height: 7px; border-radius: 999px; background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.7);
          animation: aw-breathe 2.8s ease-in-out infinite;
        }
        @keyframes aw-breathe { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
        .aw-name { margin: 0; font-size: 17px; font-weight: 600; color: #fff; }
        .aw-cadence { margin: 2px 0 0; font-size: 13px; color: rgba(255,255,255,.42); }

        .aw-tools { display: flex; flex-wrap: wrap; gap: 7px; margin-left: auto; }
        .aw-tool {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 11px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          font-size: 12px; color: rgba(255,255,255,.7);
        }
        .aw-tool svg { color: rgba(255,255,255,.45); }

        /* A log, not a table: no rules between rows, no header, no column titles.
           The timestamp column is what makes it scan as history. */
        .aw-log { display: flex; flex-direction: column; gap: 12px; align-self: stretch; }
        .aw-row { display: grid; grid-template-columns: 42px 20px 1fr; align-items: start; gap: 10px; }
        .aw-time {
          font-size: 12px; line-height: 1.5; color: rgba(255,255,255,.3);
          font-variant-numeric: tabular-nums;
        }
        .aw-row-icon { margin-top: 1px; color: rgba(255,255,255,.35); }
        .aw-row-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .aw-action { font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.8); }
        .aw-result { font-size: 12.5px; line-height: 1.45; color: rgba(255,255,255,.38); }

        /* the run that mattered — one row in the accent, not a card */
        .aw-row--hit .aw-row-icon { color: var(--color-primary); }
        .aw-row--hit .aw-action { color: #fff; font-weight: 500; }
        .aw-row--hit .aw-result { color: rgba(248,70,0,.85); }

        /* A notification, at the size and shape a system draws one, sitting over the
           window rather than in it. Absolute so it never adds height — one that
           pushed the interface down would be a panel again. */
        .aw-notif {
          position: absolute; right: 16px; bottom: 16px;
          z-index: 5; width: min(352px, calc(100% - 32px));
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
          .aw-live { animation: none; opacity: 1; }
        }

        @media (max-width: 1023px) {
          .aw-body { min-height: 0; }
          .aw-tools { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}
