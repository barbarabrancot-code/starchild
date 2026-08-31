import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppIcon } from "../../agents/AppIcon";
import type { AppKind } from "../../agents/agentsData";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";
import { STILL, reveal } from "./still";

/**
 * Section 4 — five ways to use it, one at a time.
 *
 * Everything above this section shows Starchild doing one thing. This is where
 * someone finds out how wide it is, and it does that by being operated rather
 * than read: five words, and whichever one you press changes the whole panel.
 *
 * Three things it deliberately does not do:
 *
 * · It does not show all five at once. A grid of five cards is a feature list,
 *   and a feature list is scanned, weighed, and left. One panel that changes has
 *   to be pressed, and pressing it is the thing being demonstrated — you say what
 *   you want, and it answers.
 *
 * · It does not explain. There is no sentence under the title telling you what
 *   the word means. The exchange on the right is the explanation, and a line of
 *   supporting copy above it was only ever saying the same thing worse.
 *
 * · Nothing pretends to have run. Starchild answers the way it answers a first
 *   message anywhere else in the product — by saying how it would go at it. A
 *   fabricated result on a landing page is a lie told before anyone has used the
 *   thing.
 *
 * Automate is the only state carrying anything past its own exchange: the pill
 * under the reply is there so "keep doing this" registers as a different kind of
 * thing from "do this now", which is the one distinction in the product that is
 * genuinely hard to pick up later. It stops short of agent setup, because a
 * configuration form on a landing page is a form nobody asked for.
 */

type Lane = {
  id: string;
  /** the word on the tab, and the word the title becomes */
  verb: string;
  you: string;
  ai: string;
  /** the apps the answer would reach into — only Connect names any */
  tools?: { kind: AppKind; label: string }[];
  /** only Automate has one: the thing that separates it from every other lane */
  schedule?: string;
};

const LANES: Lane[] = [
  {
    id: "research",
    verb: "Research",
    you: "Compare these three tools and tell me which one fits my workflow best.",
    ai: "I'll pull the relevant differences together and focus on what actually matters for your decision.",
  },
  {
    id: "create",
    verb: "Create",
    you: "Turn this idea into a launch plan.",
    ai: "I'll structure it into clear steps and help you build the first version.",
  },
  {
    id: "work",
    verb: "Work",
    you: "Summarize this, draft the reply, and organize the next steps.",
    ai: "Got it. I'll handle each part and keep the context together.",
  },
  {
    id: "automate",
    verb: "Automate",
    you: "Check this every Monday and let me know if anything changes.",
    ai: "I'll keep an eye on it and come back when something needs your attention.",
    schedule: "Every Monday · quiet until something changes",
  },
  {
    id: "connect",
    verb: "Connect",
    you: "Pull the latest project updates from Slack and Calendar.",
    ai: "I'll bring the relevant context together in one place.",
    tools: [
      { kind: "slack", label: "Slack" },
      { kind: "calendar", label: "Calendar" },
      { kind: "notion", label: "Notion" },
    ],
  },
];

export function ExploreSection({ onTry }: { onTry: (prompt: string) => void }) {
  const [at, setAt] = useState(0);
  const lane = LANES[at];
  const reduced = usePrefersReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Left and right walk the row and take the selection with them, which is what
  // a tablist is for and what someone who never touches a mouse tries first.
  function onKey(event: React.KeyboardEvent) {
    const go =
      event.key === "ArrowRight" ? (at + 1) % LANES.length
      : event.key === "ArrowLeft" ? (at - 1 + LANES.length) % LANES.length
      : event.key === "Home" ? 0
      : event.key === "End" ? LANES.length - 1
      : null;
    if (go === null) return;
    event.preventDefault();
    setAt(go);
    tabs.current[go]?.focus();
  }

  const still = reduced || STILL;

  const swap = still
    ? { initial: false as const, animate: {}, exit: {}, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="ex-section">
      <motion.div
        {...reveal({
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        })}
        className="ex-grid"
      >
        <div className="ex-say">
          <p className="ex-eyebrow">Explore Starchild</p>

          <div role="tablist" aria-label="Ways to use Starchild" className="ex-tabs" onKeyDown={onKey}>
            {LANES.map((it, i) => {
              const on = i === at;
              return (
                <button
                  key={it.id}
                  ref={(node) => { tabs.current[i] = node; }}
                  type="button"
                  role="tab"
                  id={`ex-tab-${it.id}`}
                  aria-selected={on}
                  aria-controls="ex-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setAt(i)}
                  className={on ? "ex-tab ex-tab--on" : "ex-tab"}
                >
                  {it.verb}
                  {/* One underline for the whole row, handed between the tabs, so
                      the selection travels instead of blinking out and back in. */}
                  {on && (still
                    ? <span className="ex-rule" />
                    : <motion.span layoutId="ex-rule" className="ex-rule" />)}
                </button>
              );
            })}
          </div>

          {/*
            "with Starchild" is on its own line, and that is what keeps it still.

            The verb changes width by eighty pixels between "Work" and "Automate",
            so with both halves on one line the second half slides every time —
            and a headline where four of the six words shuffle sideways reads as
            five different headlines rather than one with a word in it. Broken
            deliberately rather than left to wrap, because where it wraps would
            otherwise depend on the word.

            The verbs are stacked on top of each other, inactive ones at zero
            opacity, so the one that arrives lands exactly where the last one was
            instead of being animated into place.
          */}
          <h2 className="ex-title">
            <span className="ex-slot">
              {LANES.map((it, i) => (
                <span
                  key={it.id}
                  aria-hidden={i !== at}
                  className={i === at ? "ex-word ex-word--on" : "ex-word"}
                >
                  {it.verb}
                </span>
              ))}
            </span>
            <span className="ex-rest">with Starchild</span>
          </h2>

          <button type="button" onClick={() => onTry(lane.you)} className="ex-try">
            Try this
          </button>
        </div>

        <div className="ex-stage">
          {/* One panel, five contents. The floor under it is measured against the
              tallest state, so pressing through the row never moves the page. */}
          <div id="ex-panel" role="tabpanel" aria-labelledby={`ex-tab-${lane.id}`} className="ex-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={lane.id} {...swap} className="ex-demo">
                <p className="ex-said ex-said--mine">{lane.you}</p>

                {/* The orb is who is speaking. Same move the hero makes once a
                    conversation opens: the thing that was the whole screen
                    becomes the mark beside the line it is saying. Bottom-aligned
                    with the bubble's square corner, so the two read as one
                    object rather than a picture next to a box. */}
                <div className="ex-row">
                  <span className="ex-face" aria-hidden="true">
                    <PresenceOrb state="resting" size={30} />
                  </span>
                  <p className="ex-said ex-said--ai">{lane.ai}</p>
                </div>

                {lane.tools && (
                  <div className="ex-trail">
                    {lane.tools.map((it) => (
                      <span key={it.label} className="ex-chip">
                        <AppIcon kind={it.kind} className="size-[13px] opacity-70" />
                        {it.label}
                      </span>
                    ))}
                  </div>
                )}

                {lane.schedule && (
                  <div className="ex-trail">
                    <span className="ex-chip ex-chip--live">
                      <span className="ex-pulse" aria-hidden="true" />
                      {lane.schedule}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        .ex-section {
          position: relative; overflow: hidden;
          padding: 130px 0 140px; background: #050506;
        }

        .ex-grid {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center; gap: 64px;
          max-width: 1080px; margin: 0 auto; padding: 0 24px;
          font-family: var(--font-google-sans);
        }

        /* ---------- the left half: what you are choosing ---------- */

        .ex-eyebrow {
          margin: 0 0 22px;
          font-size: 11px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.38);
        }

        /* Pulled left by the first tab's own padding so the row starts on the same
           line as the title under it. Without it the tabs sit sixteen pixels in
           and the whole column looks like two columns. */
        .ex-tabs { display: flex; flex-wrap: wrap; gap: 2px; margin-left: -16px; }

        /* 44 tall including the padding: this is the only control in the section
           that gets pressed repeatedly, so it is sized to be pressed. */
        .ex-tab {
          position: relative;
          padding: 11px 16px 13px; border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 15px; font-weight: 500; line-height: 1.25;
          color: rgba(255,255,255,.42);
          transition: color .18s ease;
        }
        .ex-tab:hover { color: rgba(255,255,255,.74); }
        .ex-tab--on { color: #fff; }
        .ex-tab:focus-visible {
          outline: 2px solid rgba(248,70,0,.75); outline-offset: 2px; border-radius: 10px;
        }

        .ex-rule {
          position: absolute; left: 16px; right: 16px; bottom: 2px; height: 2px;
          border-radius: 2px; background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.5);
        }

        .ex-title {
          margin: 26px 0 0;
          font-size: clamp(38px, 4.4vw, 60px); line-height: 1.06; font-weight: 600;
          letter-spacing: -.025em; color: #fff;
        }

        /* The hole the changing word sits in. Its own line, so nothing after it
           can be moved by it; its height is the line box, and the width is
           irrelevant because everything inside is left-aligned. */
        .ex-slot { position: relative; display: block; height: 1.06em; }

        /* Orange, because it is the only word here that answers the tabs — the
           accent is doing the pointing, not decorating the headline. */
        .ex-word {
          position: absolute; left: 0; top: 0; white-space: nowrap;
          color: #f84600;
          opacity: 0; transition: opacity .22s ease;
        }
        .ex-word--on { opacity: 1; }

        .ex-rest { display: block; }

        .ex-try {
          margin-top: 34px;
          padding: 13px 26px; border: 0; border-radius: 999px; cursor: pointer;
          background: #f84600; color: #fff;
          font-family: inherit; font-size: 15px; font-weight: 500; line-height: 1;
          transition: filter .18s ease, transform .18s ease;
        }
        .ex-try:hover { filter: brightness(1.08); }
        .ex-try:active { transform: translateY(1px); }
        .ex-try:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* ---------- the right half: what it looks like ---------- */

        .ex-stage { position: relative; }

        .ex-panel {
          position: relative; z-index: 1;
          padding: 26px 26px 28px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.035);
          backdrop-filter: blur(16px);
          /* Measured against the tallest of the five. Below it the panel grew and
             shrank on every press and the column jumped on the way — a row of tabs
             that moves the thing beside it. */
          min-height: 266px;
          display: flex; flex-direction: column; justify-content: center;
        }

        .ex-demo { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }

        /* Bottom, not centre: the orb belongs to the corner the bubble points
           with. Centred against a two-line reply it floats in the middle of the
           text and stops being attached to anything. */
        .ex-row { display: flex; align-items: flex-end; gap: 10px; max-width: 100%; }
        .ex-face { flex: none; display: block; margin-bottom: 1px; }

        /* One square corner each, on the side the line is coming from — the
           bottom-left of a reply, the bottom-right of a question. It is the
           oldest speech-bubble device there is and it does the whole job of a
           tail without drawing one: the corner points at the speaker, so
           Starchild's points at its orb and yours points off the edge at you. */
        .ex-said {
          max-width: 34ch; margin: 0;
          padding: 13px 18px; border-radius: 19px;
          font-size: 15.5px; line-height: 1.5;
        }

        /* Yours is quieter: you are asking, it is answering. */
        .ex-said--mine {
          align-self: flex-end;
          border-bottom-right-radius: 0;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.68);
        }

        /* Starchild's is the only warm surface in the panel — the same orange as
           the orb behind it and the word in the title, at the weight of a tint
           rather than a fill. It is who is speaking, said in colour instead of
           with an avatar. */
        .ex-said--ai {
          border-bottom-left-radius: 0;
          border: 1px solid rgba(248,70,0,.22);
          background: linear-gradient(135deg, rgba(248,70,0,.26) 0%, rgba(248,70,0,.07) 100%);
          color: rgba(255,255,255,.94);
          /* the only light in the panel now, and it comes from the side
             Starchild speaks from — the atmosphere and the presence saying the
             same thing twice */
          box-shadow: 0 0 46px rgba(248,70,0,.13);
        }

        /* lined up with the bubble above it, not with the orb */
        .ex-trail { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 2px; margin-left: 40px; }

        .ex-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          font-size: 12.5px; line-height: 1; color: rgba(255,255,255,.6);
        }
        .ex-chip--live { border-color: rgba(248,70,0,.32); color: rgba(255,255,255,.74); }

        .ex-pulse {
          width: 6px; height: 6px; border-radius: 999px; background: #f84600;
          animation: ex-breathe 2.6s ease-in-out infinite;
        }
        @keyframes ex-breathe {
          0%, 100% { opacity: .45; transform: scale(.82); }
          50%      { opacity: 1;   transform: scale(1); }
        }

        @media (max-width: 900px) {
          .ex-section { padding: 90px 0 96px; }
          .ex-grid { grid-template-columns: 1fr; gap: 44px; padding: 0 20px; }
          .ex-title { font-size: clamp(34px, 8vw, 46px); }
          .ex-orb { left: 50%; }
          /* the floor is re-measured here: the lines wrap differently at this
             width, so the tallest state is not the same one it is on a desktop */
          .ex-panel { padding: 20px 18px 22px; border-radius: 22px; min-height: 286px; }
          .ex-said { max-width: 100%; font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ex-pulse { animation: none; opacity: .85; }
          .ex-word { transition: none; }
        }
      `}</style>
    </section>
  );
}
