import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TASK_STATUS_LABEL, type ActiveTask } from "./activeTasks";

/**
 * A Job, not an Agent — and the card has to read that way at a glance, or the
 * distinction this whole layer exists for is invisible.
 *
 * Three things keep it lighter than a dedicated agent's card: there is no orb
 * (an agent's orb says "something is alive in here"; a Job is a rule the Chief
 * Agent is holding, not a second presence), there is nowhere to open beyond a
 * lightweight detail panel — "Updates: this chat" is not a caption, it is the
 * whole of where the exchange lives — and its detail on a finding expands in
 * place rather than always forcing a navigation. A fact the Chief Agent is
 * tracking, unfolded for a moment or opened one level deeper, never a second
 * conversation.
 */
export function ActiveTaskCard({
  task,
  onAccept,
  onDismiss,
  onEdit,
  onPause,
  onKeepWatching,
  onViewJob,
}: {
  task: ActiveTask;
  /** present only on the not-yet-accepted suggestion state */
  onAccept?: () => void;
  onDismiss?: () => void;
  onEdit: () => void;
  onPause: () => void;
  onKeepWatching?: () => void;
  /** opens the lightweight Job detail panel — absent while suggesting, since
   *  there is nothing yet to open a panel about */
  onViewJob?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const suggesting = Boolean(onAccept);
  const paused = task.status === "paused";
  const found = task.status === "possible-setup" && Boolean(task.activity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`tcard${paused ? " tcard--off" : ""}${found ? " tcard--found" : ""}`}
    >
      <div className="tcard-head">
        <p className="tcard-name">{task.title}</p>
        {!suggesting && <span className="tcard-state">{TASK_STATUS_LABEL[task.status]}</span>}
      </div>

      <motion.p layout className="tcard-cond">
        {task.condition}
      </motion.p>

      {!suggesting && (
        <dl className="tcard-facts">
          <div>
            <dt>Owner</dt>
            <dd>Chief Agent</dd>
          </div>
          <div>
            <dt>Updates</dt>
            <dd>This chat</dd>
          </div>
          {task.lastChecked && !paused && (
            <div>
              <dt>Last checked</dt>
              <dd>{task.lastChecked}</dd>
            </div>
          )}
        </dl>
      )}

      <AnimatePresence>
        {expanded && task.activity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="tcard-detail"
          >
            <p className="tcard-detail-when">{task.activity.when}</p>
            <ul>
              {task.activity.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tcard-acts">
        {suggesting ? (
          <>
            <button type="button" className="tcard-btn tcard-btn--go" onClick={onAccept}>
              Yes, keep watching
            </button>
            <button type="button" className="tcard-btn tcard-btn--quiet" onClick={onDismiss}>
              Not now
            </button>
          </>
        ) : (
          <>
            {found && (
              <button
                type="button"
                className="tcard-btn tcard-btn--go"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Hide details" : "View details"}
              </button>
            )}
            {found && onKeepWatching && (
              <button type="button" className="tcard-btn" onClick={onKeepWatching}>
                Keep watching
              </button>
            )}
            <button type="button" className="tcard-btn" onClick={onEdit}>
              {found ? "Edit condition" : "Edit"}
            </button>
            <button type="button" className="tcard-btn tcard-btn--quiet" onClick={onPause}>
              {paused ? "Resume" : "Pause"}
            </button>
            {/* Only on the plain standing card — a finding already has somewhere
                to expand to (View details), and a second door to the same place
                would just be two buttons asking the same question. */}
            {!found && onViewJob && (
              <button type="button" className="tcard-btn tcard-btn--quiet" onClick={onViewJob}>
                View job
              </button>
            )}
          </>
        )}
      </div>

      <style>{`
        /* Deliberately smaller than .acard: less padding, no orb slot, a plainer
           border-free background — the visual argument for "lighter" is made in
           the same units as the agent card so the two are legibly the same family
           at two different weights, not two unrelated designs. */
        .tcard {
          display: flex; flex-direction: column; gap: 9px;
          max-width: 440px; padding: 12px 15px 13px;
          border-radius: 14px; background: rgba(255,255,255,.035);
          font-family: var(--font-google-sans); color: #fff;
        }
        .tcard--found { background: rgba(248,70,0,.06); }
        .tcard--off { opacity: .6; }

        .tcard-head { display: flex; align-items: center; gap: 8px; }
        .tcard-name { margin: 0; font-size: 14px; font-weight: 600; }
        .tcard-state { margin-left: auto; font-size: 11.5px; color: rgba(255,255,255,.4); }

        .tcard-cond { margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.7); }

        .tcard-facts { display: flex; gap: 20px; margin: 0; }
        .tcard-facts dt {
          margin: 0; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase;
          color: rgba(255,255,255,.28);
        }
        .tcard-facts dd { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,.6); }

        .tcard-detail { overflow: hidden; }
        .tcard-detail-when {
          margin: 4px 0 6px; font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }
        .tcard-detail ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .tcard-detail li {
          position: relative; padding-left: 14px; font-size: 12.5px; line-height: 1.5;
          color: rgba(255,255,255,.65);
        }
        .tcard-detail li::before {
          content: ""; position: absolute; left: 0; top: 7px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(255,255,255,.28);
        }

        .tcard-acts { display: flex; flex-wrap: wrap; gap: 6px; }
        .tcard-btn {
          border-radius: 999px; padding: 5px 12px; font-size: 12px;
          background: rgba(255,255,255,.06); color: rgba(255,255,255,.72);
          transition: background .2s, color .2s;
        }
        .tcard-btn:hover { background: rgba(255,255,255,.12); color: #fff; }
        .tcard-btn--go { background: rgba(248,70,0,.16); color: #ff7a45; }
        .tcard-btn--go:hover { background: rgba(248,70,0,.24); color: #fff; }
        .tcard-btn--quiet { background: none; color: rgba(255,255,255,.38); }
        .tcard-btn--quiet:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.75); }
      `}</style>
    </motion.div>
  );
}
