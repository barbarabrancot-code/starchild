import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { PlusIcon } from "../icons";
import { AgentOrb } from "./AgentOrb";
import { lastAgentLine, type Agent } from "./agentsData";

/**
 * "To:" — the same field for finding an agent and for making one.
 *
 * The reason to put both behind one input is that the person does not know which
 * they want until they have typed. "Inbox" either finds the agent that already
 * does that job or reveals that nothing does — and in the second case the thing
 * they typed is exactly the name of the agent they were about to create. Two
 * separate controls make them answer that question before they have the
 * information to answer it.
 *
 * Creating still opens the full setup. This is a way in, not a shortcut past it:
 * the name is the only thing carried through, because the name is the only thing
 * they actually said.
 */
export function AgentPicker({
  roster,
  onPick,
  onCreate,
  onClose,
}: {
  roster: Agent[];
  onPick: (id: string) => void;
  /** the typed text, when there was any — the setup screen opens with it in the name field */
  onCreate: (name?: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const found = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roster;
    return roster.filter((a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  }, [roster, query]);

  // Create sits at the top and is index 0, which makes it the default on an empty
  // field. That is the right default here and only here: this panel was opened by
  // pressing +, so making one is what they came to do until they type otherwise.
  const rows = found.length;
  useEffect(() => { setCursor((c) => Math.min(c, rows)); }, [rows]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const take = (i: number) => {
    if (i === 0) onCreate(query.trim() || undefined);
    else onPick(found[i - 1].id);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => (c + 1) % (rows + 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => (c + rows) % (rows + 1)); return; }
    if (e.key === "Enter") { e.preventDefault(); take(cursor); }
  };

  const creating = cursor === 0;

  return (
    <section className="ap-root">
      <div className="ap-bar">
        <span className="ap-to">To</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
          onKeyDown={onKey}
          placeholder="Search or create Agents"
          aria-label="Search or create Agents"
          className="ap-input"
        />
        <button type="button" className="ap-x" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="ap-panel"
      >
        <div className="ap-rows">
          <button
            type="button"
            onMouseEnter={() => setCursor(0)}
            onClick={() => take(0)}
            className={`ap-row${creating ? " ap-row--on" : ""}`}
          >
            <span className="ap-glyph ap-glyph--new"><PlusIcon className="size-4" /></span>
            {/* what they typed is the name they meant — quoting it back is the
                difference between a button and an answer */}
            <span className="ap-name">
              {query.trim() ? <>Create <em>{query.trim()}</em></> : "Create new Agent"}
            </span>
          </button>

          {found.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onMouseEnter={() => setCursor(i + 1)}
              onClick={() => take(i + 1)}
              className={`ap-row${cursor === i + 1 ? " ap-row--on" : ""}`}
            >
              <span className="ap-glyph"><AgentOrb status={a.status} size={11} accent={a.accent} still /></span>
              <span className="ap-name">{a.name}</span>
              <span className="ap-mood">{lastAgentLine(a)}</span>
            </button>
          ))}

          {query.trim() && found.length === 0 && (
            <p className="ap-none">No agent called that yet.</p>
          )}
        </div>
      </motion.div>

      <style>{`
        .ap-root {
          display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0;
          font-family: var(--font-google-sans); color: #fff;
        }

        .ap-bar {
          display: flex; align-items: center; gap: 10px; padding: 15px 24px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .ap-to { flex: none; font-size: 14.5px; color: rgba(255,255,255,.4); }
        .ap-input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 15px; color: #fff;
        }
        .ap-input::placeholder { color: rgba(255,255,255,.32); }
        .ap-x {
          flex: none; border: 0; background: none; cursor: pointer; padding: 2px 4px;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.3);
        }
        .ap-x:hover { color: #fff; }

        /* Hung under the field rather than filling the column: it is a list of
           answers to what was typed, and it should end where the answers do. */
        .ap-panel {
          margin: 10px 24px 0; align-self: flex-start; width: calc(100% - 48px); max-width: 700px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px;
          background: #1c1c1e; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,.5);
        }
        .ap-rows { display: flex; flex-direction: column; padding: 8px; gap: 2px; max-height: 46vh; overflow-y: auto; }

        .ap-row {
          display: flex; align-items: center; gap: 12px; width: 100%;
          padding: 10px 12px; border: 0; border-radius: 10px; cursor: pointer;
          background: none; font-family: inherit; text-align: left;
        }
        /* one highlight, driven by the cursor — hover and arrow keys move the same
           thing, so there is never a second row that also looks chosen */
        .ap-row--on { background: rgba(255,255,255,.09); }

        .ap-glyph { flex: none; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; }
        .ap-glyph--new {
          border-radius: 999px; background: rgba(255,255,255,.09); color: rgba(255,255,255,.75);
        }
        .ap-name { font-size: 14.5px; color: #fff; }
        .ap-name em { font-style: normal; color: var(--color-primary); }
        .ap-mood {
          margin-left: auto; padding-left: 16px; font-size: 12px; color: rgba(255,255,255,.3);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ap-none { margin: 8px 12px 10px; font-size: 13.5px; color: rgba(255,255,255,.35); }
      `}</style>
    </section>
  );
}
