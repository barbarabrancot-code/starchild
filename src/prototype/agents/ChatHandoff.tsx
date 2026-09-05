import { motion } from "motion/react";
import { BY_ID, type ConnectorId } from "./connectors";
import { useAgents } from "./store";
import { ConnectorAdded } from "./ConnectorAdded";

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
 * message like any other (`.hoff-msg`), and each connector still needed is
 * the real `ConnectorAdded` — asking to connect and a connector arriving are
 * the same kind of moment, so this doesn't keep its own copy of that card,
 * it just uses the real thing and fires the actual `connect(id)` through
 * its `onAdd`.
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
          <ConnectorAdded key={id} id={id} onAdd={() => take(id)} />
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

      /* Real ConnectorAdded cards now, so no row styling of its own left here. */
      .hoff-conns { display: flex; flex-direction: column; gap: 8px; }
    `}</style>
  );
}
