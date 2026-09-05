import { motion } from "motion/react";
import { ConnectorMark } from "./ConnectorMark";
import { BY_ID, type ConnectorId } from "./connectors";
import { useAgents } from "./store";

/**
 * The seam between the two product areas, and the only place they touch.
 *
 * Just ConnectFirst here — this needs Gmail, connect it and I'll carry on.
 * Nothing else, because this variant creates dedicated agents from the
 * Agents area's own form, not from a chat exchange the way B's does; there is
 * no "offer to create one" or "here's the receipt" moment to show in the chat
 * at all. AgentSuggestion and AgentMade used to live here for that purpose
 * and were retired once confirmed to have zero real callers in this tree.
 *
 * No outer card around the sentence and the row below it: the sentence is a
 * message like any other (`.hoff-msg`), and the row is its own flat card —
 * the same shape `agents/ConnectorAdded.tsx` uses for a connector landing,
 * because asking to connect and a connector arriving are the same kind of
 * moment, not two different chrome styles for it.
 *
 * What ConnectFirst does not do is move the conversation. Chat is where the
 * request was made and Chat is where it stays.
 */

/* ────────────────────────────────────────────────────────────────────────────
   1 · a one-time action that needs a tool
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Asked in the conversation, answered in the conversation, and then the work
 * happens — the whole point is that connecting a tool is a step inside a task, not
 * the start of setting something up. It deliberately says nothing about agents.
 * Naming the thing you are trying not to imply is how you imply it.
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
