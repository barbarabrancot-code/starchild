import { motion } from "motion/react";
import { AppIcon } from "./agents/AppIcon";
import { BY_ID } from "./agents/connectors";
import { Reactable } from "./Reactable";
import type { SavedChat } from "./savedChats";
import { useAgents } from "./agents/store";
import { AgentLive, AgentUpdate, ExternalAlert } from "./agents/AgentChatCards";
import { ActiveTaskCard } from "./agents/ActiveTaskCard";

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
  onEditAgent,
  onEditTask,
}: {
  chat: SavedChat;
  onReply: (quote: string) => void;
  onOpenAgent: (id: string) => void;
  /** "Edit here" on a card inside history: focuses the live composer on this agent */
  onEditAgent: (id: string) => void;
  /** the same idea, for an active task — there is no page to open, only the composer */
  onEditTask: (id: string) => void;
}) {
  const { roster, updateAgent, activeTasks, updateTask } = useAgents();
  const pause = (id: string) =>
    updateAgent(id, (a) =>
      a.status === "paused"
        ? { ...a, status: "working", mood: "Back on it." }
        : { ...a, status: "paused", mood: "Paused by you." },
    );
  const resume = (id: string, mood: string) => updateAgent(id, (a) => ({ ...a, status: "working", mood }));
  const pauseTask = (id: string) =>
    updateTask(id, (t) => (t.status === "paused" ? { ...t, status: "active" } : { ...t, status: "paused" }));
  const resumeTask = (id: string) => updateTask(id, (t) => ({ ...t, status: "active" }));

  return (
    <div className="sv-thread">
      {chat.turns.map((turn, i) => {
        if (turn.who === "made") {
          const agent = roster.find((a) => a.id === turn.agentId);
          if (!agent) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AgentLive
                agent={agent}
                onOpen={() => onOpenAgent(agent.id)}
                onEditHere={() => onEditAgent(agent.id)}
                onPause={() => pause(agent.id)}
              />
            </motion.div>
          );
        }

        if (turn.who === "signal") {
          const agent = roster.find((a) => a.id === turn.agentId);
          if (!agent) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AgentUpdate
                agent={agent}
                found={turn.found}
                detailsLabel={turn.detailsLabel}
                {...(turn.tightenLabel
                  ? { thresholdLabel: turn.tightenLabel, onThreshold: () => onEditAgent(agent.id) }
                  : {})}
                onDetails={() => onOpenAgent(agent.id)}
                onKeep={() => resume(agent.id, "Still watching.")}
                onPause={() => pause(agent.id)}
              />
            </motion.div>
          );
        }

        if (turn.who === "taskCard") {
          const task = activeTasks.find((t) => t.id === turn.taskId);
          if (!task) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ActiveTaskCard
                task={task}
                onEdit={() => onEditTask(task.id)}
                onPause={() => pauseTask(task.id)}
                onKeepWatching={task.activity ? () => resumeTask(task.id) : undefined}
              />
            </motion.div>
          );
        }

        if (turn.who === "taskUpdate") {
          const task = activeTasks.find((t) => t.id === turn.taskId);
          if (!task) return null;
          return (
            <div key={i} className="flex flex-col gap-3">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sv-said"
              >
                {turn.found}
              </motion.p>
              <ActiveTaskCard
                task={task}
                onEdit={() => onEditTask(task.id)}
                onPause={() => pauseTask(task.id)}
                onKeepWatching={() => resumeTask(task.id)}
              />
            </div>
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
                onKeep={() => resume(agent.id, "Still watching.")}
                onPause={() => pause(agent.id)}
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

        if (turn.who === "connected") {
          return (
            <p key={i} className="sv-connected">
              <AppIcon kind={BY_ID[turn.app].kind} className="size-3.5" />
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
            <Reactable align={mine ? "right" : "left"} onReply={() => onReply(turn.text)}>
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
          max-width: 520px; padding: 0;
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.85);
        }
        .sv-msg--mine {
          padding: 11px 16px; border-radius: 16px 16px 4px 16px;
          background: rgba(255,255,255,.08); color: rgba(255,255,255,.92);
        }

        .sv-said {
          max-width: 520px; margin: 0;
          font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.78);
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
      `}</style>
    </div>
  );
}
