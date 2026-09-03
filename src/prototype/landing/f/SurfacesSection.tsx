import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../../Container";

/**
 * F's section 2 — the three things the product is, next to a drawing of each.
 *
 * The hero states the claim and hands over; this is what it hands over to. One
 * headline, a list, and a window. There is no lede under the title, because the
 * list is the lede: three words, one of them open.
 *
 * The list is an exclusive accordion, and exclusive is the point — only the open
 * item carries copy, and clicking the open one does nothing. Three paragraphs
 * stacked would be documentation, and closing the last one would leave the window
 * beside it showing something no heading claims.
 *
 * Three decisions about the window:
 *
 * · It is a drawing, not a screenshot, and it is not a facsimile either. Built
 *   from the same values as the page around it, so it cannot go stale the way an
 *   exported PNG does — and the type inside it is illustration size (12px), which
 *   is a size the product itself never uses.
 *
 *   How much of the real screen it reproduces is a decision, and the answer is:
 *   as little as says the thing. The Agents state used to carry the product's
 *   full three-column layout, roster and all, and it cost the window a nested
 *   column and about twice the height of the other two. What the section claims
 *   about agents is that work happens while you are not there and that they stop
 *   when they need you — the roster is not where either of those is visible, so
 *   it is gone and the thread stayed.
 *
 * · All three states are the same window at the same size: one pane, a heading,
 *   a body, and for two of them a composer. Only the content changes. A window
 *   that grew a column and 200px of height on the middle item was three drawings
 *   that happened to share a title bar.
 *
 * · It has browser chrome, and the chrome is the sentence. Enough of it to say
 *   "a place you go to" and no more: three lights and a URL, no back button and
 *   no bookmarks bar, because a working browser drawn in full is a drawing of a
 *   browser rather than of the product inside it.
 *
 * · The whole of it is aria-hidden, with a written description beside each state.
 *   The detail is there to be looked at; read out row by row it is noise.
 */

type SurfaceId = "chat" | "agents";

type Surface = {
  id: SurfaceId;
  name: string;
  /** the one line that says who it is for */
  lede: string;
  /** what it actually does, in the person's terms */
  copy: string;
  /** what the window is showing, for anyone not looking at it */
  described: string;
  render: () => JSX.Element;
};

/* ────────────────────────────────────────────────────────────────────────────
   the window's chrome, shared by all three states
   ──────────────────────────────────────────────────────────────────────────── */

function Bar() {
  return (
    <div className="sf-bar">
      <span className="sf-lights">
        <i /><i /><i />
      </span>
      <span className="sf-url">
        <svg viewBox="0 0 12 12" width="10" height="10" focusable="false">
          <circle cx="5" cy="5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M7.6 7.6L10 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        starchild.ai
      </span>
    </div>
  );
}

/** The rail. Chat is the only state with a history to show, so it is the only
 *  one that gets Recent — an empty "Recent" heading under the other two would be
 *  a drawing of an empty list. */
function Rail({ on }: { on: SurfaceId }) {
  return (
    <div className="sf-side">
      <span className="sf-new">+ New chat</span>
      <span className={on === "chat" ? "sf-nav sf-nav--on" : "sf-nav"}>Chat</span>
      <span className={on === "agents" ? "sf-nav sf-nav--on" : "sf-nav"}>Agents</span>

      {on === "chat" && (
        <>
          <span className="sf-label">Recent</span>
          {["Dinner from what's in th…", "Plan next week", "Compare the three tools"].map((r) => (
            <span key={r} className="sf-recent">{r}</span>
          ))}
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   what is on screen in each one
   ──────────────────────────────────────────────────────────────────────────── */

const THREAD = [
  { mine: true, text: "Can you help me decide what to cook tonight? I'd rather not go to the shop, so only what's already in the fridge." },
  { mine: false, text: "Tell me what you have and I'll work with it. A random-looking pile of ingredients is usually the more interesting problem." },
  { mine: true, text: "Chicken thighs, broccoli, carrots, garlic and a lemon, plus the usual cupboard things." },
  { mine: false, text: "That's a lemon and garlic traybake with the broccoli thrown in for the last ten minutes. Want the timings?" },
];

function Chat() {
  return (
    <div className="sf-pane">
      <div className="sf-thread">
        {THREAD.map((m, i) => (
          <p key={i} className={m.mine ? "sf-msg sf-msg--you" : "sf-msg"}>{m.text}</p>
        ))}
      </div>

      <div className="sf-composer">
        Ask anything
        <span className="sf-send">
          <svg viewBox="0 0 12 12" width="11" height="11" focusable="false">
            <path
              d="M6 9.5V2.5M3 5.5L6 2.5L9 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

/**
 * One agent, open — the same pane Chat uses, with three things in it instead of
 * a conversation.
 *
 * The instruction it was given, what it did while nobody was watching, and the
 * one thing it will not do without an answer. That last block is the whole
 * difference between an agent and a chat, so it is the only part drawn in any
 * detail: a warm border, a headline and two buttons.
 *
 * What is deliberately not here is the roster of five other agents. It is on the
 * real screen and it was on this drawing, and it was the reason the window had a
 * third column and twice the height of the other two states. It also says the
 * least: a list of names is a fact about the app, and the claim being made is
 * about the work.
 */
function Agents() {
  return (
    <div className="sf-pane">
      <div className="sf-head">
        <span className="sf-pane-title">
          <span className="sf-ring" />
          Inbox Manager
        </span>
        <span className="sf-count">12m ago</span>
      </div>

      <div className="sf-thread sf-thread--agent">
        <p className="sf-msg sf-msg--you">
          Keep on top of my inbox. Draft replies for anything routine, but don't send
          anything without me.
        </p>

        {/* What it did, in the person's words — never a tool-call log. */}
        <div className="sf-card">
          <span className="sf-when">This morning, 8:00</span>
          {["Reviewed 12 emails", "Drafted 4 replies", "Left 2 for you"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>

        {/* The one block with buttons on it, because it is the one thing that
            cannot go ahead without you. */}
        <div className="sf-card sf-card--ask">
          <b>4 replies ready to send</b>
          <span className="sf-acts">
            <span className="sf-btn sf-btn--go">Review and send</span>
            <span className="sf-btn">Not yet</span>
          </span>
        </div>
      </div>

      <div className="sf-composer">
        Message Inbox Manager…
        <span className="sf-send">
          <svg viewBox="0 0 12 12" width="11" height="11" focusable="false">
            <path
              d="M6 9.5V2.5M3 5.5L6 2.5L9 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** The same six marks the orbit runs, out of the same folder. */
/**
 * Six rows, each one an account already connected.
 *
 * A loose row of logos was the other option and it was the emptier one: six
 * marks floating in a pane the size of the other two states looks like a pane
 * waiting for something. Rows fill the same box at the same rhythm as the Agents
 * thread beside it, and they carry the word the section is actually selling —
 * connected, once, and then done.
 */
const SURFACES: Surface[] = [
  {
    id: "chat",
    name: "Chat",
    lede: "For questions, learning and everyday help.",
    copy: "Ask it anything and keep going. It holds on to what you have already said, so the fourth question does not need the first three explained again.",
    described:
      "The Starchild app on the Chat screen: a conversation about what to cook from what is already in the fridge, with recent chats listed beside it.",
    render: Chat,
  },
  {
    id: "agents",
    name: "Agents",
    lede: "For the work you would rather not ask for twice.",
    copy: "Hand over the things that repeat — a check every Monday, a watch on a price, an inbox kept down to what needs you. They run on their own and come back when there is something worth interrupting you for.",
    described:
      "The Starchild app on the Agents screen, with an agent called Inbox Manager open: the instruction it was given, what it did this morning, and four drafted replies it is holding until you approve them.",
    render: Agents,
  },
  /*
  {
    id: "connectors",
    name: "Connectors",
    lede: "For the tools your work already lives in.",
    copy: "Connect Gmail, Calendar, Slack or Notion once, to your account. After that, letting an agent use one is a permission rather than another login — and you can see exactly what each of them is allowed to do.",
    described:
      "The Starchild app on the Connectors screen: Gmail, Telegram, Notion, Slack, Canva and HyperEVM, each connected once and listed as connected.",
    render: Connectors,
  }, */
];

/* ──────────────────────────────────────────────────────────────────────────── */

export function SurfacesSection() {
  const [at, setAt] = useState(0);
  const open = SURFACES[at];
  const Window = open.render;

  return (
    <section className="sf-section" id="surfaces">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="sf-title"
        >
          Just talk. Starchild figures out the rest
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="sf-grid"
        >
          <div className="sf-list">
            {SURFACES.map((s, i) => {
              const on = i === at;
              return (
                <div key={s.id} className={on ? "sf-item sf-item--on" : "sf-item"}>
                  <h3 className="sf-name">
                    <button
                      type="button"
                      // Clicking the open one does nothing — see the note above.
                      onClick={() => !on && setAt(i)}
                      aria-expanded={on}
                      aria-controls={`sf-body-${s.id}`}
                      className="sf-trigger"
                    >
                      {s.name}
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`sf-body-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="sf-body"
                      >
                        <div className="sf-body-in">
                          <p className="sf-lede">{s.lede}</p>
                          <p className="sf-copy">{s.copy}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="sf-stage">
            <p className="sr-only">{open.described}</p>

            <div className="sf-app" aria-hidden="true">
              <Bar />
              <div className="sf-app-body">
                <Rail on={open.id} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={open.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="sf-window"
                  >
                    <Window />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        .sf-section {
          padding: 100px 0;
          background: transparent;
          font-family: var(--font-google-sans);
        }

        .sf-title {
          max-width: 24ch;
          margin: 0 auto 120px;
          text-align: center;
          font-size: 44px; line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; color: #fff; text-wrap: balance;
        }

        /* The list is given a real column rather than the narrowest one that
           fits: 360 is what holds the widest lede on two lines instead of
           three. The gap comes down to match — a 120px trench between two
           columns reads as two unrelated things, and these two are the same
           sentence. */
        .sf-grid {
          display: grid;
          grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
          gap: 80px; align-items: center;
          max-width: 1160px; margin-inline: auto;
        }

        /* ---------- the list ---------- */

        .sf-item { border-bottom: 1px solid rgba(255,255,255,.09); }
        .sf-name { margin: 0; }

        .sf-trigger {
          display: block; width: 100%; padding: 16px 0;
          border: 0; background: none; cursor: pointer;
          font-family: inherit; text-align: left;
          font-size: 24px; line-height: 1.2; font-weight: 600; letter-spacing: -.02em;
          color: rgba(255,255,255,.45);
          transition: color .32s cubic-bezier(.16,1,.3,1);
        }
        .sf-trigger:hover { color: rgba(255,255,255,.72); }
        .sf-item--on .sf-trigger { cursor: default; }
        .sf-trigger:focus-visible {
          outline: 2px solid #f84600; outline-offset: 3px; border-radius: 6px;
        }

        /* Colour carries the open state on its own. Bold on top of white is the
           same thing said twice, and it makes the open item look like a
           different typeface from the two under it. */
        .sf-item--on .sf-trigger { color: #fff; padding-bottom: 8px; }

        /* overflow hidden so the height animation has something to clip */
        .sf-body { overflow: hidden; }
        .sf-body-in { padding-bottom: 24px; }

        .sf-lede {
          margin: 0;
          font-size: 14px; line-height: 1.5; font-weight: 600; color: #fff;
        }
        .sf-copy {
          margin: 12px 0 0;
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }

        /* ---------- the window ---------- */

        .sf-stage { position: relative; min-width: 0; }

        /* The wash is what stops a dark panel on a dark page reading as a hole,
           and the shadow is what puts it in front. The bleed is vertical only:
           given horizontal bleed as well, the gradient is wider than the column
           it lights and those few per cent are pixels hanging off the right of
           the document that you can scroll to. */
        .sf-stage::before {
          content: ""; position: absolute; inset: -12% 0; pointer-events: none;
          background: radial-gradient(62% 52% at 50% 46%, rgba(248,70,0,.16) 0%, transparent 72%);
        }

        .sf-app {
          position: relative;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 12px;
          background: #0a0a0b;
          box-shadow: 0 24px 64px rgba(0,0,0,.55);
          overflow: hidden;
          font-size: 12px; line-height: 1.5; letter-spacing: 0;
        }

        .sf-bar {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px;
          background: #131315;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }
        .sf-lights { display: flex; gap: 5px; flex: none; }
        .sf-lights i { width: 8px; height: 8px; border-radius: 999px; }
        .sf-lights i:nth-child(1) { background: #f87171; }
        .sf-lights i:nth-child(2) { background: #ffa940; }
        .sf-lights i:nth-child(3) { background: #34d399; }

        .sf-url {
          display: flex; align-items: center; gap: 8px; flex: 1;
          padding: 5px 12px; border-radius: 999px;
          background: rgba(255,255,255,.045);
          color: rgba(255,255,255,.45); font-size: 11px;
        }

        /* One size for all three states, and a fixed one rather than a floor.
           min-height only stops a state being shorter than the others — the
           Agents screen was taller than it and simply took the height, so the
           window changed size as you moved down the list. That is the page
           redrawing itself around the copy, and the whole point of the window is
           that it is one thing being shown three ways. Each pane is now built to
           sit inside 440, and .sf-app clips anything that ever does not. */
        .sf-app-body { display: grid; grid-template-columns: 30% minmax(0, 1fr); height: 440px; }

        /* ---------- rail ---------- */

        .sf-side {
          display: flex; flex-direction: column; gap: 3px;
          padding: 12px;
          border-right: 1px solid rgba(255,255,255,.09);
        }
        .sf-new {
          padding: 7px 12px; margin-bottom: 12px; border-radius: 6px;
          background: #f84600; color: #fff; font-weight: 500;
        }
        .sf-nav { padding: 6px 12px; border-radius: 6px; color: rgba(255,255,255,.45); }
        .sf-nav--on { background: rgba(255,255,255,.07); color: #fff; }

        .sf-label {
          margin: 16px 12px 4px;
          font-size: 11px; text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.32);
        }
        .sf-recent {
          padding: 4px 12px; font-size: 11px; color: rgba(255,255,255,.45);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---------- panes ---------- */

        /* Both of these clip rather than scroll: the window is a fixed size and
           nothing inside it is meant to be reachable, so anything that overruns
           should be cut off the way a real window cuts off a long thread. */
        .sf-window { min-width: 0; overflow: hidden; }
        .sf-pane {
          display: flex; flex-direction: column;
          height: 100%; padding: 16px; overflow: hidden;
        }

        .sf-thread { display: flex; flex-direction: column; gap: 16px; flex: 1; }

        /* Only one side of the conversation gets a bubble. The assistant is the
           page talking, so it sits on the ground the way body copy does —
           bubbling both sides makes the reply look like a quote rather than an
           answer. */
        .sf-msg { margin: 0; color: rgba(255,255,255,.72); }
        .sf-msg--you {
          align-self: flex-end; max-width: 78%;
          padding: 12px 16px; border-radius: 12px;
          background: rgba(255,255,255,.07); color: #fff;
        }

        .sf-composer {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          margin-top: 24px; padding: 12px 12px 12px 16px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.045); color: rgba(255,255,255,.32);
        }
        .sf-send {
          display: grid; place-items: center; flex: none;
          width: 22px; height: 22px; border-radius: 999px;
          background: #f84600; color: #fff;
        }

        /* ---------- the agents screen ---------- */

        /* A ring rather than a dot, and the one thing in the heading that is not
           type: it names the agent rather than reporting on it. */
        .sf-ring {
          width: 9px; height: 9px; flex: none;
          border: 2px solid #f84600; border-radius: 999px;
        }

        /* Tighter than Chat's. Two of the three blocks here have a border or a
           ground of their own, so they need less air between them than four
           paragraphs do. */
        .sf-thread--agent { gap: 12px; }

        .sf-card {
          display: flex; flex-direction: column; gap: 4px;
          align-self: flex-start; max-width: 92%;
          padding: 12px; border-radius: 10px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.72);
        }
        .sf-when {
          margin-bottom: 2px;
          font-size: 10px; text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.38);
        }

        /* The ask is the only warm block in the thread, because it is the only one
           addressed to you. */
        .sf-card--ask {
          gap: 6px;
          border: 1px solid rgba(248,70,0,.38);
          background: rgba(248,70,0,.07);
        }
        .sf-card--ask b { font-weight: 600; color: #fff; }

        .sf-acts { display: flex; gap: 8px; margin-top: 6px; }
        .sf-btn {
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.16);
          color: rgba(255,255,255,.72);
        }
        .sf-btn--go {
          border-color: #f84600; background: #f84600;
          color: #fff; font-weight: 600;
        }

        /* ---------- connectors ---------- */

        .sf-head {
          display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }
        /* Both panes use this heading, so the Agents one puts a ring in it. */
        .sf-pane-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 600; color: #fff;
        }
        .sf-count { font-size: 11px; color: rgba(255,255,255,.45); }

        .sf-tools {
          display: flex; flex-direction: column; gap: 2px;
          flex: 1; padding-top: 12px;
        }
        .sf-tool {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 8px; border-radius: 6px;
          color: rgba(255,255,255,.82);
        }

        /* A white disc, not a dark chip — the same ground the orbit down in
           section 3 stands its marks on. These are full-colour company marks
           drawn to sit on white, and the disc is also what makes the six read as
           one set: the logos differ, the ground does not. The two sections show
           overlapping marks, so they cannot disagree about this. */
        .sf-tool-mark {
          display: grid; place-items: center; flex: none;
          width: 26px; height: 26px; border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(255,255,255,.16);
          overflow: hidden;
        }
        .sf-tool-mark img { width: 100%; height: 100%; object-fit: contain; }

        /* Pushed to the far edge rather than sitting after the name, so the six
           of them line up and the column reads as one repeated state instead of
           six separate labels. */
        .sf-tool-on {
          margin-left: auto; flex: none;
          font-size: 11px; color: rgba(255,255,255,.38);
        }

        @media (max-width: 900px) {
          .sf-section { padding: 60px 0; }
          .sf-title { font-size: 34px; margin-bottom: 56px; }

          /* The list goes above the window rather than beside it. The window
             keeps its own type sizes and simply gets narrower — shrinking a
             drawing of a UI is what a real browser does to a real one. */
          .sf-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; }
          .sf-trigger { font-size: 20px; }
          .sf-app-body { grid-template-columns: 34% minmax(0, 1fr); height: 400px; }
          .sf-msg--you { max-width: 88%; }
        }
      `}</style>
    </section>
  );
}
