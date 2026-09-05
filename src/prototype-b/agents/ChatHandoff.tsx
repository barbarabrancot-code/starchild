import { motion } from "motion/react";
import { ConnectorMark } from "./ConnectorMark";
import { AgentOrb } from "./AgentOrb";
import { BY_ID, type ConnectorId } from "./connectors";
import { useAgents } from "./store";
import type { Agent } from "./agentsData";

/**
 * The seam between the two product areas, and the only place they touch.
 *
 * Three moments, in the order they can appear inside a normal conversation:
 *
 *   ConnectFirst — this needs Gmail, connect it and I'll carry on. Nothing
 *                  else — a sentence, then the same flat connector card
 *                  ConnectorAdded uses, no outer frame around either.
 *   AgentOffer   — that sounded like a standing job. Want one? Two answers.
 *   AgentMade    — it exists, here is what it took with it, here is the door.
 *
 * What none of them do is move the conversation. Chat is where the request was
 * made and Chat is where it stays; an agent created here is a second thing that
 * now exists, not this thing relocated.
 */

/* ────────────────────────────────────────────────────────────────────────────
   1 · a one-time action that needs a tool
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Asked in the conversation, answered in the conversation, and then the work
 * happens — the whole point is that connecting a tool is a step inside a task, not
 * the start of setting something up. It deliberately says nothing about agents.
 * Naming the thing you are trying not to imply is how you imply it.
 *
 * No outer card around the two of these: the sentence is a message like any
 * other (`.hoff-msg`, the same shape every other thing Starchild says gets),
 * and the row is its own flat card — the same one `ConnectorAdded` uses for
 * a connector landing, because asking to connect and a connector arriving
 * are the same kind of moment, not two different chrome styles for it.
 */
export function ConnectFirst({
  needs,
  onReady,
}: {
  needs: ConnectorId[];
  onReady: () => void;
}) {
  const { isConnected, connect } = useAgents();
  const left = needs.filter((id) => !isConnected(id));
  const names = left.map((id) => BY_ID[id].name);

  const take = (id: ConnectorId) => {
    connect(id);
    // the last one connected is the one that unblocks the task
    if (left.length === 1) window.setTimeout(onReady, 420);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="hoff-ask"
    >
      <p className="hoff-msg">
        I&rsquo;ll need {names.length === 1 ? names[0] : names.join(" and ")} for that. Connect
        {names.length === 1 ? " it" : " them"} and I&rsquo;ll pick up where we left off.
      </p>

      <div className="hoff-conns">
        {left.map((id) => (
          <div key={id} className="hoff-conn">
            <span className="hoff-conn-glyph"><ConnectorMark id={id} className="size-4" /></span>
            <span className="hoff-conn-body">
              <span className="hoff-conn-name">{BY_ID[id].name}</span>
              {/* the grant, said the way someone can agree with it */}
              <span className="hoff-conn-grant">{BY_ID[id].grants[0]}</span>
            </span>
            <button type="button" className="hoff-btn hoff-btn--go" onClick={() => take(id)}>
              Connect
            </button>
          </div>
        ))}
      </div>

      <Style />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   1b · the same offer, in the register a real agent gets
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * The main chat's own version of "you keep asking for this" — dashed rather
 * than solid, because nothing has been created yet and the border should say
 * so. Distinct from `AgentSuggestion` below: that one offers a lightweight
 * task; this one offers the real thing, with a name and a job already
 * decided, one click from existing.
 */
export function AgentOffer({
  title = "Create an Agent for this?",
  copy,
  onCreate,
  onDismiss,
}: {
  title?: string;
  copy: string;
  onCreate: () => void;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="ca-offer"
    >
      <h3 className="ca-offer-title">{title}</h3>
      <p className="ca-offer-copy">{copy}</p>
      <div className="ca-offer-actions">
        <button type="button" className="ca-offer-go" onClick={onCreate}>
          Create Agent
        </button>
        <button type="button" className="ca-offer-quiet" onClick={onDismiss}>
          Not now
        </button>
      </div>

      <style>{`
        .ca-offer {
          display: flex; flex-direction: column; gap: 12px; width: 100%;
          box-sizing: border-box; padding: 20px 24px; border-radius: 16px;
          border: 1px dashed rgba(255,255,255,.16); background: none;
          font-family: var(--font-google-sans);
        }
        .ca-offer-title { margin: 0; color: #fff; font-size: 15px; font-weight: 600; }
        .ca-offer-copy {
          margin: 0; color: rgba(255,255,255,.55);
          font-size: 13.5px; line-height: 1.55; letter-spacing: -.01em;
        }
        .ca-offer-actions { display: flex; align-items: center; gap: 18px; margin-top: 4px; }
        .ca-offer-go {
          border-radius: 999px; padding: 9px 16px; background: rgba(255,255,255,.08);
          color: #fff; font: inherit; font-size: 14px; font-weight: 600;
          transition: background .18s;
        }
        .ca-offer-go:hover { background: rgba(255,255,255,.14); }
        .ca-offer-quiet { color: rgba(255,255,255,.35); font: inherit; font-size: 14px; font-weight: 600; }
        .ca-offer-quiet:hover { color: rgba(255,255,255,.7); }
        @media (max-width: 640px) {
          .ca-offer { padding: 18px 20px; }
        }
      `}</style>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   2 · what was made, and what it took with it
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * The receipt.
 *
 * Four things and nothing else: it exists, this is what it is now responsible for,
 * here is the door, and the conversation you are reading has not moved. Anything
 * beyond that competes with the one fact worth landing — a standing thing now
 * exists — and this is a moment for closure rather than for setup.
 *
 * Moved out of ChatScreen's own tail-rendering (where it lived as `.ca-created`,
 * a solid-bordered inline block) for the same reason AgentOffer did before it —
 * a real reusable component now, not markup a dev catalog can only redraw.
 */
export function AgentMade({
  agent,
  onOpen,
  onDismiss,
}: {
  agent: Agent;
  onOpen?: () => void;
  /** closes the receipt without opening the agent — it already exists either way */
  onDismiss?: () => void;
}) {
  // read back from the roster, so renaming it in its own panel is reflected here
  const { roster } = useAgents();
  const live = roster.find((a) => a.id === agent.id) ?? agent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="ca-created"
    >
      <p className="ca-created-kicker">Agent created</p>
      <div className="ca-created-head">
        <AgentOrb status={live.status} size={10} accent={live.accent} still />
        <p className="ca-created-name">{live.name}</p>
      </div>
      <p className="ca-created-role">{live.role}</p>
      <div className="ca-created-actions">
        <button type="button" className="ca-created-go" onClick={onOpen}>
          Open Agent
        </button>
        <button type="button" className="ca-created-dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      </div>

      <style>{`
        .ca-created {
          display: flex; flex-direction: column; gap: 10px; width: 100%;
          box-sizing: border-box; padding: 20px 24px; border-radius: 16px;
          border: 1px solid rgba(248,70,0,.35); background: rgba(248,70,0,.05);
          font-family: var(--font-google-sans);
        }
        .ca-created-kicker {
          margin: 0; font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: #f84600;
        }
        .ca-created-head { display: flex; align-items: center; gap: 10px; }
        .ca-created-name { margin: 0; color: #fff; font-size: 15px; font-weight: 600; }
        .ca-created-role { margin: 0; color: rgba(255,255,255,.55); font-size: 13.5px; line-height: 1.5; }
        .ca-created-actions { display: flex; align-items: center; gap: 14px; margin-top: 4px; }
        .ca-created-go {
          border-radius: 999px; padding: 9px 16px; background: #f84600;
          color: #fff; font: inherit; font-size: 14px; font-weight: 600;
          transition: background .18s, transform .18s;
        }
        .ca-created-go:hover { background: #ff5a1f; transform: translateY(-1px); }
        .ca-created-dismiss {
          border: 0; background: none; cursor: pointer; padding: 0;
          font: inherit; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.35);
        }
        .ca-created-dismiss:hover { color: rgba(255,255,255,.7); }
        @media (max-width: 640px) {
          .ca-created { padding: 18px 20px; }
        }
      `}</style>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

function Style() {
  return (
    <style>{`
      .hoff-ask {
        display: flex; flex-direction: column; gap: 10px;
        font-family: var(--font-google-sans); color: #fff;
      }

      /* Outside the card and shaped like every other thing Starchild says, because
         that is what it is. */
      .hoff-msg {
        max-width: 520px; margin: 0;
        font-family: var(--font-google-sans);
        font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.88) !important;
      }

      .hoff-conns { display: flex; flex-direction: column; gap: 8px; }
      /* Same card ConnectorAdded uses for a connector landing — asking to
         connect and one arriving are the same kind of moment. */
      .hoff-conn {
        display: flex; align-items: center; gap: 12px;
        width: 480px; box-sizing: border-box; padding: 11px 14px; border-radius: 13px;
        border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
      }
      .hoff-conn-glyph { flex: none; display: flex; color: rgba(255,255,255,.45); }
      .hoff-conn-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .hoff-conn-name { font-size: 14px; font-weight: 600; color: #fff; }
      .hoff-conn-grant { font-size: 12px; color: rgba(255,255,255,.38); }
      .hoff-conn .hoff-btn { margin-left: auto; }


      .hoff-btn {
        padding: 8px 16px; border-radius: 999px; cursor: pointer;
        border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.04);
        font-family: inherit; font-size: 13.5px; color: #fff;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .hoff-btn:hover { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.08); }
      .hoff-btn--go {
        border-color: transparent; background: var(--color-primary); color: #fff; font-weight: 500;
      }
      .hoff-btn--go:hover { background: #ff5a1f; border-color: transparent; }
    `}</style>
  );
}
