import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAgents } from "./store";
import { TASK_STATUS_LABEL, type ActiveTask } from "./activeTasks";
import { CharacterOrb } from "../landing/f/CharacterOrb";
import { ChatBubbleIcon, PencilIcon, PlusIcon } from "../icons";

/**
 * Jobs — a place, not a popup.
 *
 * It used to be a modal, and the correction that retired that version is worth
 * keeping: a modal reads as a tool you reach for; a place you can navigate to,
 * with the same weight as Chat and Agents, reads as part of the product. Jobs
 * earns that weight because it already has real content — cards, a detail
 * view, actions — the same reason Agents and Connectors are areas and not
 * dialogs.
 *
 * The orb sits here presence-first, the same way it opens the chat. Not doing
 * anything different from what it does on the empty chat screen — that repeat
 * is the point. This is the same character, looking after the same list of
 * things it is looking after over there, just written out in full here instead
 * of held in a sentence.
 */
export function JobsArea({
  focusId,
  onCreateWithChat,
}: {
  /** open straight into one job's detail — set when arriving via "View job" elsewhere */
  focusId?: string;
  onCreateWithChat: () => void;
}) {
  const { activeTasks, addTask, updateTask, removeTask } = useAgents();
  const [detailId, setDetailId] = useState<string | null>(focusId ?? null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [scheduleDraft, setScheduleDraft] = useState("");
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualTitle, setManualTitle] = useState("");
  const [manualPrompt, setManualPrompt] = useState("");
  const [manualSchedule, setManualSchedule] = useState("");

  // Arriving from "View job" elsewhere: open straight on that job, the same
  // way AgentsWorkspace opens on `focusId` after a chat hands one over.
  useEffect(() => {
    if (focusId) setDetailId(focusId);
  }, [focusId]);

  const task = detailId ? activeTasks.find((t) => t.id === detailId) : undefined;

  useEffect(() => {
    if (!task || task.origin.trim()) return;
    const prompt = /^Watching João's inbox$/i.test(task.title)
      ? "Keep watching João's inbox for new replies and summarize what needs my attention. Update me here when something meaningful changes."
      : task.condition;
    updateTask(task.id, (current) => ({ ...current, origin: prompt }));
  }, [task?.id, task?.origin, task?.title, task?.condition, updateTask]);

  const toggle = (t: ActiveTask) =>
    updateTask(t.id, (x) => ({ ...x, status: x.status === "paused" ? "active" : "paused" }));
  const cancel = (id: string) => {
    removeTask(id);
    if (detailId === id) setDetailId(null);
    setMenuOpenFor(null);
  };

  const startEdit = (t: ActiveTask) => {
    setScheduleDraft(t.schedule ?? t.frequency ?? "");
    setEditingSchedule(true);
  };
  const saveEdit = (t: ActiveTask) => {
    const value = scheduleDraft.trim();
    updateTask(t.id, (x) => (x.schedule !== undefined ? { ...x, schedule: value } : { ...x, frequency: value }));
    setEditingSchedule(false);
  };

  const createManualTask = () => {
    const title = manualTitle.trim();
    const prompt = manualPrompt.trim();
    if (!title || !prompt) return;
    const id = `manual-${Date.now()}`;
    addTask({
      id,
      title,
      status: "active",
      condition: prompt,
      schedule: manualSchedule.trim() || "On demand",
      origin: prompt,
    });
    setManualTitle("");
    setManualPrompt("");
    setManualSchedule("");
    setManualOpen(false);
    setDetailId(id);
  };

  return (
    <div className="ja-root" onClick={() => { setMenuOpenFor(null); setAddMenuOpen(false); }}>
      {/* The grid never leaves. A card opening its detail is not a different
          screen — it is the same list with one of its own rows expanded out
          to the side, the way AgentsWorkspace's own drawer works, so "which
          job" stays visible the whole time you are looking at one. */}
      <div className="ja-inner">
        {/* Present, not decorative — the same orb the chat opens with, right
            beside its own name rather than floating off in a corner. It still
            says who is doing the work. */}
        <div className="ja-heading">
          {/* Title and subtitle share one block, deliberately not siblings of
              the orb at this same level — a flex row's height is its tallest
              child, and with the orb (108px) sitting directly beside the
              subtitle, the subtitle's own margin was being measured against
              that height instead of against the title's actual text. Nesting
              them together keeps that spacing answerable to the text alone. */}
          <div>
            <h1 className="ja-title">Handled by Starchild</h1>
            <p className="ja-sub">Ongoing tasks started from your chats.</p>
          </div>
          <CharacterOrb size={108} />
          <div className="ja-add-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ja-add"
              aria-expanded={addMenuOpen}
              onClick={() => setAddMenuOpen((open) => !open)}
            >
              <PlusIcon className="size-4" />
              Add new
            </button>
            {addMenuOpen && (
              <div className="ja-add-menu">
                <button
                  type="button"
                  onClick={() => {
                    setAddMenuOpen(false);
                    onCreateWithChat();
                  }}
                >
                  <ChatBubbleIcon className="size-4" />
                  Create with chat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddMenuOpen(false);
                    setDetailId(null);
                    setManualOpen(true);
                  }}
                >
                  <PencilIcon className="size-4" />
                  Configure manually
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTasks.length === 0 ? (
          <p className="ja-empty">Nothing scheduled yet — ask in chat and it'll show up here.</p>
        ) : (
          <div className="ja-grid">
            {activeTasks.map((t) => (
              <div
                key={t.id}
                className={`ja-card${t.id === detailId ? " ja-card--on" : ""}`}
                onClick={() => {
                  setManualOpen(false);
                  setDetailId(t.id);
                }}
              >
                <div className="ja-card-top">
                  <p className="ja-card-title">{t.title}</p>
                  <button
                    type="button"
                    className="ja-menu-btn"
                    aria-label="Job actions"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenFor((id) => (id === t.id ? null : t.id));
                    }}
                  >
                    ⋯
                  </button>
                  {menuOpenFor === t.id && (
                    <div className="ja-menu" onClick={(e) => e.stopPropagation()}>
                      <button type="button" onClick={() => { toggle(t); setMenuOpenFor(null); }}>
                        {t.status === "paused" ? "Resume" : "Pause"}
                      </button>
                      <button type="button" className="ja-menu-danger" onClick={() => cancel(t.id)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <p className="ja-card-schedule">{t.schedule ?? t.frequency ?? "—"}</p>
                <span className={`ja-status ja-status--${t.status}`}>
                  <i aria-hidden="true" />
                  {TASK_STATUS_LABEL[t.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {task && (
          <motion.aside
            key="drawer"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ja-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ja-drawer-in">
              <button type="button" className="ja-drawer-x" onClick={() => setDetailId(null)} aria-label="Close">
                ✕
              </button>

              <div className="ja-detail-head">
                <h2 className="ja-detail-title">{task.title}</h2>
                <span className={`ja-status ja-status--${task.status}`}>
                  <i aria-hidden="true" />
                  {TASK_STATUS_LABEL[task.status]}
                </span>
              </div>

              <label className="ja-prompt">
                <span>Prompt</span>
                <textarea
                  value={task.origin}
                  onChange={(e) => updateTask(task.id, (current) => ({ ...current, origin: e.target.value }))}
                  aria-label="Task prompt"
                />
              </label>

              <div className="ja-meta">
                <div className="ja-meta-tools">
                  {editingSchedule ? (
                    <>
                      <button type="button" className="ja-meta-edit ja-meta-edit--save" onClick={() => saveEdit(task)}>
                        Save
                      </button>
                      <button type="button" className="ja-meta-edit" onClick={() => setEditingSchedule(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button type="button" className="ja-meta-edit" onClick={() => startEdit(task)}>
                      Edit
                    </button>
                  )}
                </div>
                <dl className="ja-meta-list">
                <div>
                  <dt>Schedule</dt>
                  {editingSchedule ? (
                    <dd>
                      <input
                        autoFocus
                        className="ja-edit-in"
                        value={scheduleDraft}
                        onChange={(e) => setScheduleDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit(task)}
                      />
                    </dd>
                  ) : (
                    <dd>{task.schedule ?? task.frequency ?? "—"}</dd>
                  )}
                </div>
                {task.nextRun && (
                  <div>
                    <dt>Next run</dt>
                    <dd>{task.status === "paused" ? "Paused" : task.nextRun}</dd>
                  </div>
                )}
                {task.runs !== undefined && (
                  <div>
                    <dt>Runs</dt>
                    <dd>{task.runs}</dd>
                  </div>
                )}
                </dl>
              </div>

              <div className="ja-acts">
                <button type="button" className="ja-btn" onClick={() => toggle(task)}>
                  {task.status === "paused" ? "Resume" : "Pause"}
                </button>
                <button type="button" className="ja-btn ja-btn--danger" onClick={() => cancel(task.id)}>
                  Cancel
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {manualOpen && (
          <motion.aside
            key="manual-drawer"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ja-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.form
              className="ja-drawer-in ja-manual"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              onSubmit={(e) => {
                e.preventDefault();
                createManualTask();
              }}
            >
              <div className="ja-manual-head">
                <h2>Configure a task</h2>
                <button type="button" onClick={() => setManualOpen(false)} aria-label="Close">×</button>
              </div>
              <label>
                <span>Name</span>
                <input
                  autoFocus
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Weekly inbox summary"
                />
              </label>
              <label>
                <span>Prompt</span>
                <textarea
                  value={manualPrompt}
                  onChange={(e) => setManualPrompt(e.target.value)}
                  placeholder="Describe what Starchild should keep handling."
                />
              </label>
              <label>
                <span>Schedule</span>
                <input
                  value={manualSchedule}
                  onChange={(e) => setManualSchedule(e.target.value)}
                  placeholder="Every Monday at 9:00"
                />
              </label>
              <div className="ja-manual-actions">
                <button type="button" className="ja-btn ja-btn--quiet" onClick={() => setManualOpen(false)}>Cancel</button>
                <button type="submit" className="ja-manual-create" disabled={!manualTitle.trim() || !manualPrompt.trim()}>
                  Create task
                </button>
              </div>
            </motion.form>
          </motion.aside>
        )}
      </AnimatePresence>

      <style>{`
        /* flex: 1 + min-width/height: 0 is the same fix AgentsWorkspace's own
           root uses to sit correctly beside the sidebar in this flex row —
           without it a flex child sizes to its content instead of the space
           actually left for it, and on a collapsed rail that showed up as this
           page's own content overlapping the rail rather than starting after
           it. height: 100% instead of 100vh for the same reason: 100vh ignores
           the row it is actually sitting in. */
        /* A row now, not a single scrolling column: the grid and the drawer
           are siblings, the same shape as AgentsWorkspace's own roster-plus-
           drawer, so a card opening its detail narrows the grid rather than
           replacing it. */
        .ja-root {
          position: relative; display: flex; flex: 1; min-width: 0; min-height: 0;
          height: 100%; overflow: hidden;
          background: #0a0a0a; font-family: var(--font-google-sans); color: #fff;
        }
        .ja-heading { display: flex; align-items: center; gap: 14px; }
        .ja-add-wrap { position: relative; margin-left: auto; }
        .ja-add {
          display: flex; align-items: center; gap: 8px; padding: 10px 15px;
          border-radius: 999px; background: #f84600; color: #fff;
          font-size: 14px; font-weight: 600; transition: background .18s, transform .18s;
        }
        .ja-add:hover { background: #ff5818; transform: translateY(-1px); }
        .ja-add-menu {
          position: absolute; top: calc(100% + 8px); right: 0; z-index: 20;
          width: 210px; padding: 6px; border: 1px solid rgba(255,255,255,.1);
          border-radius: 13px; background: #222223; box-shadow: 0 16px 36px rgba(0,0,0,.45);
        }
        .ja-add-menu button {
          display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px;
          border-radius: 9px; color: rgba(255,255,255,.82); font-size: 13px; text-align: left;
        }
        .ja-add-menu button:hover { background: rgba(255,255,255,.08); color: #fff; }
        .ja-add-menu svg { color: rgba(255,255,255,.55); }
        /* Explicit and unresponsive, matching how the other areas (Agents,
           Connectors) pad themselves — the shared page Container this used
           before was built for a full-viewport page and read its breakpoints
           off the whole window, not the width actually left beside the
           sidebar, which is exactly why the gutter it produced here was
           unreliable. */
        .ja-inner { flex: 1; min-width: 0; overflow-y: auto; padding: 64px 56px 72px; }

        .ja-title { margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -.01em; }
        .ja-sub { margin: 4px 0 0; font-size: 14px; color: rgba(255,255,255,.4); }

        .ja-empty { margin: 38px 0 8px; font-size: 13.5px; color: rgba(255,255,255,.4); }

        .ja-manual {
          gap: 18px; background: transparent;
        }
        .ja-manual-head { display: flex; align-items: center; justify-content: space-between; }
        .ja-manual-head h2 { margin: 0; font-size: 20px; font-weight: 600; }
        .ja-manual-head button { color: rgba(255,255,255,.45); font-size: 20px; }
        .ja-manual-head button:hover { color: #fff; }
        .ja-manual label { display: flex; flex-direction: column; gap: 7px; }
        .ja-manual label > span {
          font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.35);
        }
        .ja-manual input, .ja-manual textarea {
          width: 100%; box-sizing: border-box; padding: 11px 12px;
          border: 1px solid rgba(255,255,255,.11); border-radius: 11px;
          background: rgba(255,255,255,.04); color: #fff; font: inherit; font-size: 14px;
        }
        .ja-manual textarea { min-height: 108px; resize: vertical; line-height: 1.5; }
        .ja-manual input:focus, .ja-manual textarea:focus { outline: none; border-color: rgba(248,70,0,.65); }
        .ja-manual-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
        .ja-manual-create {
          padding: 9px 15px; border-radius: 999px; background: #f84600;
          color: #fff; font-size: 13px; font-weight: 600;
        }
        .ja-manual-create:disabled { cursor: not-allowed; opacity: .35; }

        .ja-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          margin-top: 36px; max-width: 760px;
        }
        @media (max-width: 640px) { .ja-grid { grid-template-columns: 1fr; } }

        .ja-card {
          position: relative; cursor: pointer;
          display: flex; flex-direction: column; gap: 10px;
          padding: 18px 20px 17px; border-radius: 18px;
          background: rgba(255,255,255,.035);
          transition: background .18s;
        }
        .ja-card:hover { background: rgba(255,255,255,.06); }
        /* Which row the open drawer is about — the same idea as the roster's
           own "on" row in AgentsWorkspace. */
        .ja-card--on { background: rgba(248,70,0,.07); box-shadow: inset 0 0 0 1px rgba(248,70,0,.22); }

        .ja-card-top { display: flex; align-items: flex-start; gap: 8px; }
        .ja-card-title { margin: 0; flex: 1; min-width: 0; font-size: 14px; font-weight: 600; line-height: 1.35; }
        .ja-card-schedule { margin: 0; font-size: 12.5px; color: rgba(255,255,255,.45); }

        .ja-menu-btn {
          shrink: 0; width: 22px; height: 22px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.35); font-size: 15px; line-height: 1;
          transition: background .15s, color .15s;
        }
        .ja-menu-btn:hover { background: rgba(255,255,255,.08); color: #fff; }

        .ja-menu {
          position: absolute; top: 38px; right: 12px; z-index: 5;
          display: flex; flex-direction: column; min-width: 118px;
          border-radius: 12px; padding: 5px;
          background: #1c1c1e; box-shadow: 0 12px 30px rgba(0,0,0,.5);
        }
        .ja-menu button { text-align: left; padding: 7px 9px; border-radius: 8px; font-size: 12.5px; color: rgba(255,255,255,.8); }
        .ja-menu button:hover { background: rgba(255,255,255,.07); }
        .ja-menu-danger { color: rgba(255,120,90,.85) !important; }

        /* A dot and a word, and only ever these two: a task is either running or
           it isn't. Paused remains deliberately quiet. */
        .ja-status { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: rgba(255,255,255,.55); }
        .ja-status i { width: 5px; height: 5px; border-radius: 999px; background: currentColor; }
        .ja-status--active { color: #ff7a45; }
        .ja-status--paused { color: rgba(255,255,255,.32); }

        /* Same shape as AgentsWorkspace's own .ag-drawer/.ag-drawer-in: a
           fixed-width panel that owns its own scroll, animated on width so it
           slides in from the edge rather than fading in place. */
        .ja-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.015);
        }
        .ja-drawer-in {
          width: 360px; height: 100%; overflow-y: auto;
          padding: 22px 26px 30px; display: flex; flex-direction: column;
        }
        .ja-drawer-x {
          align-self: flex-end; margin-bottom: 10px;
          color: rgba(255,255,255,.4); transition: color .2s; font-size: 14px;
        }
        .ja-drawer-x:hover { color: #fff; }

        .ja-detail-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ja-detail-title { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -.01em; }
        .ja-prompt { display: flex; flex-direction: column; gap: 8px; margin-top: 28px; }
        .ja-prompt > span {
          font-size: 10.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.35);
        }
        .ja-prompt textarea {
          width: 100%; min-height: 96px; resize: vertical; box-sizing: border-box;
          padding: 13px 14px; border: 1px solid rgba(255,255,255,.11); border-radius: 13px;
          background: rgba(255,255,255,.035); color: rgba(255,255,255,.88);
          font: inherit; font-size: 13.5px; line-height: 1.5;
        }
        .ja-prompt textarea:focus { outline: none; border-color: rgba(248,70,0,.65); background: rgba(248,70,0,.04); }

        /* Narrower than the old free-standing layout's meta box — a 360px
           drawer has no room for two wide columns, so this reads down the
           page as one instead of wrapping mid-row. */
        .ja-meta {
          position: relative; margin: 24px 0 0;
          padding: 18px 20px; border-radius: 14px; background: rgba(255,255,255,.03);
        }
        .ja-meta-list { display: flex; flex-direction: column; gap: 14px; margin: 0; }
        .ja-meta-tools { position: absolute; top: 13px; right: 14px; display: flex; gap: 4px; }
        .ja-meta-edit {
          padding: 5px 8px; border-radius: 8px; font-size: 12px;
          color: rgba(255,255,255,.64); transition: background .2s, color .2s;
        }
        .ja-meta-edit:hover { background: rgba(255,255,255,.08); color: #fff; }
        .ja-meta-edit--save { color: #ff7040; }
        .ja-meta dt { margin: 0; font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase; color: rgba(255,255,255,.3); }
        .ja-meta dd { margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,.75); }

        .ja-edit-in {
          background: rgba(255,255,255,.06); border-radius: 8px; padding: 5px 9px;
          font-size: 13px; color: #fff; outline: none; min-width: 160px;
        }
        .ja-edit-in:focus { background: rgba(255,255,255,.1); }

        .ja-acts { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 30px; }
        .ja-btn {
          border-radius: 999px; padding: 8px 15px; font-size: 12.5px;
          background: rgba(255,255,255,.07); color: rgba(255,255,255,.78);
          transition: background .2s, color .2s;
        }
        .ja-btn:hover { background: rgba(255,255,255,.13); color: #fff; }
        .ja-btn--go { background: rgba(248,70,0,.18); color: #ff7a45; }
        .ja-btn--go:hover { background: rgba(248,70,0,.26); color: #fff; }
        .ja-btn--quiet { background: none; color: rgba(255,255,255,.4); }
        .ja-btn--quiet:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.8); }
        .ja-btn--danger { color: rgba(255,120,90,.75); }
        .ja-btn--danger:hover { background: rgba(255,90,60,.14); color: #ff7a5c; }
      `}</style>
    </div>
  );
}
