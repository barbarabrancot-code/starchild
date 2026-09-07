import { useState } from "react";
import { motion } from "motion/react";
import { ConnectorMark } from "./agents/ConnectorMark";
import { BY_ID } from "./agents/connectors";
import { Reactable } from "./Reactable";
import type { SavedChat } from "./savedChats";
import { useAgents } from "./agents/store";
import { ExternalAlert, ConnectorChoice } from "./agents/AgentChatCards";
import { ConnectorAdded } from "./agents/ConnectorAdded";
import { ActivityLine } from "./ActivityLine";
import { StatusLine } from "./StatusLine";
import { OptionModal } from "./OptionModal";

/**
 * What got worked out, not said — closed by default, the same small orange
 * dot as a live thinking line, except this one doesn't move on its own: it
 * is not thinking right now, it is a folded note from when it was. The label
 * is the real status line ("Checking your Gmail connection now."), not a
 * generic "show reasoning" — the row already says the one true thing;
 * opening it is the reader's choice, not something the transcript volunteers.
 */
function ReasoningRow({ label, lines }: { label: string; lines: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sv-reason">
      <button
        type="button"
        className="sv-reason-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <ActivityLine label={label} />
      </button>
      {open && (
        <div className="sv-reason-body">
          {lines.map((line, i) => (
            <p key={i} className="sv-reason-line">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * A conversation being read back.
 *
 * Restored, not replayed: no thinking line, no staged run, no answer arriving. All
 * of it happened, and showing the work in progress would be a lie about what is on
 * screen. What is preserved is everything that would still be in a real transcript
 * — including the moment a tool got connected, because that was part of the task
 * and deleting it would make the second half unexplainable.
 */
export function SavedThread({
  chat,
  onReply,
  onOpenAgent,
}: {
  chat: SavedChat;
  onReply: (quote: string) => void;
  onOpenAgent: (id: string) => void;
  /** "Edit here" on a card inside history — no longer used since AgentLive
   *  (the only card with an Edit here button) was retired, kept optional so
   *  callers built for the old shape don't have to change */
  onEditAgent?: (id: string) => void;
  /** the same idea, for an active task — no longer used here (status lines
   *  don't open anything), kept optional so callers built for the old shape
   *  don't have to change */
  onEditTask?: (id: string) => void;
}) {
  const { roster } = useAgents();

  return (
    <div className="sv-thread">
      {chat.turns.map((turn, i) => {
        if (turn.who === "signal") {
          const agent = roster.find((a) => a.id === turn.agentId);
          if (!agent) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start gap-2"
            >
              <Reactable align="left" text={turn.found} onReply={() => onReply(turn.found)}>
                <div className="sv-msg">{turn.found}</div>
              </Reactable>
              <StatusLine label="Agent update" />
            </motion.div>
          );
        }

        if (turn.who === "taskUpdate") {
          return (
            <div key={i} className="flex flex-col items-start gap-2">
              <Reactable align="left" text={turn.found} onReply={() => onReply(turn.found)}>
                <div className="sv-msg">{turn.found}</div>
              </Reactable>
              <StatusLine label="Signal forming" />
            </div>
          );
        }

        if (turn.who === "status") {
          return (
            <div key={i}>
              <StatusLine label={turn.label} />
            </div>
          );
        }

        if (turn.who === "decision") {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OptionModal
                title={turn.title}
                subtitle={turn.subtitle}
                options={turn.options}
                picked={turn.picked}
                onPick={() => {}}
                onCustom={turn.picked ? undefined : () => {}}
                onClose={() => {}}
                placeholder="Type your own response"
              />
            </motion.div>
          );
        }

        if (turn.who === "connectorAdded") {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConnectorAdded id={turn.id} />
            </motion.div>
          );
        }

        if (turn.who === "external") {
          const agent = roster.find((a) => a.id === turn.agentId);
          if (!agent) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalAlert
                agent={agent}
                headline={turn.headline}
                detail={turn.detail}
                onOpen={() => onOpenAgent(agent.id)}
              />
            </motion.div>
          );
        }

        if (turn.who === "gap") {
          // The gap is the argument. Two asks in one sitting is a conversation;
          // two asks a couple of days apart is a habit, and only the second one is
          // worth offering to take over.
          return (
            <p key={i} className="sv-gap">
              <span>{turn.text}</span>
            </p>
          );
        }

        if (turn.who === "connectorChoice") {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConnectorChoice />
            </motion.div>
          );
        }

        if (turn.who === "reasoning") {
          // A status, not a permanent fixture: it says what's happening right
          // before the answer that resolves it, and once that answer is in the
          // transcript the status has nothing left to say. Never rendered
          // except on the last turn — reading back a finished conversation
          // means every reasoning turn here already has its answer below it.
          if (i !== chat.turns.length - 1) return null;
          return (
            <div key={i} className="sv-left">
              <ReasoningRow label={turn.label} lines={turn.lines} />
            </div>
          );
        }

        if (turn.who === "connected") {
          return (
            <p key={i} className="sv-connected">
              <ConnectorMark id={turn.app} className="size-3.5" />
              <strong>{BY_ID[turn.app].name} connected</strong>
              <span>{turn.note}</span>
            </p>
          );
        }

        const mine = turn.who === "you";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
            className={mine ? "sv-right" : "sv-left"}
          >
            <Reactable align={mine ? "right" : "left"} text={turn.text} onReply={() => onReply(turn.text)}>
              <div className={`sv-msg${mine ? " sv-msg--mine" : ""}`}>{turn.text}</div>
            </Reactable>
          </motion.div>
        );
      })}

      <style>{`
        .sv-thread {
          display: flex; flex-direction: column; gap: 14px;
          font-family: var(--font-google-sans);
        }
        .sv-left { display: flex; justify-content: flex-start; }
        .sv-right { display: flex; justify-content: flex-end; }
        .sv-right + .sv-left { margin-top: 50px; }

        .sv-msg {
          max-width: 520px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.85);
        }
        .sv-msg--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(255,255,255,.08); color: rgba(255,255,255,.92);
        }

        /* Neither side said this, so it is neither bubble: it is the record of
           something that happened between two things that were said. */
        .sv-connected {
          display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
          margin: 0; padding: 9px 14px; border-radius: 999px; align-self: flex-start;
          border: 1px solid rgba(248,70,0,.25); background: rgba(248,70,0,.06);
          font-size: 12.5px; color: rgba(255,255,255,.45);
        }
        .sv-connected svg { color: var(--color-primary); }
        .sv-connected strong { font-weight: 500; color: rgba(255,255,255,.85); }

        .sv-gap {
          display: flex; align-items: center; gap: 14px; margin: 8px 0 4px;
          font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.25);
        }
        .sv-gap::before, .sv-gap::after {
          content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.08);
        }

        .sv-reason { display: flex; flex-direction: column; gap: 10px; max-width: 520px; }
        .sv-reason-toggle {
          align-self: flex-start; border: 0; background: none; padding: 2px; cursor: pointer;
        }
        .sv-reason-body {
          display: flex; flex-direction: column; gap: 10px;
          padding: 12px 16px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03);
        }
        .sv-reason-line { margin: 0; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.55); }
      `}</style>
    </div>
  );
}
