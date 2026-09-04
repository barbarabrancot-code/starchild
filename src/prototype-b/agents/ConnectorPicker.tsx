import { useState } from "react";
import { CheckIcon, SearchIcon } from "../icons";
import { AppIcon } from "./AppIcon";
import { CATALOG, type ConnectorId } from "./connectors";
import { useAgents } from "./store";

/**
 * The one list, used in both places it is needed: while creating an agent, and
 * from an agent's own header. Same component, same states, same words — a second
 * implementation is how the two would drift into disagreeing about what
 * "connected" means.
 *
 * It shows the whole catalogue, not just what is connected. Hiding the rest would
 * make the product look smaller than it is and would force someone to leave the
 * flow to find out what else exists.
 */
export function ConnectorPicker({
  enabled,
  onToggle,
}: {
  enabled: ConnectorId[];
  onToggle: (next: ConnectorId[]) => void;
}) {
  const { isConnected, connect } = useAgents();
  const [query, setQuery] = useState("");
  /** the one that just authenticated, so the change is visible rather than silent */
  const [flash, setFlash] = useState<ConnectorId | null>(null);

  const shown = CATALOG.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  const toggle = (id: ConnectorId) =>
    onToggle(enabled.includes(id) ? enabled.filter((t) => t !== id) : [...enabled, id]);

  // Connecting from here does both things at once: it authenticates for the
  // account and turns it on for this agent. Anything else would make someone
  // connect a tool and then wonder why the agent still can't use it.
  const connectHere = (id: ConnectorId) => {
    connect(id);
    if (!enabled.includes(id)) onToggle([...enabled, id]);
    setFlash(id);
    window.setTimeout(() => setFlash((f) => (f === id ? null : f)), 1600);
  };

  return (
    <div className="cp-root">
      <label className="cp-search">
        <SearchIcon className="size-4" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search connectors"
          aria-label="Search connectors"
        />
      </label>

      <div className="cp-grid">
        {shown.map((c) => {
          const connected = isConnected(c.id);
          const on = enabled.includes(c.id);

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => (connected ? toggle(c.id) : connectHere(c.id))}
              aria-pressed={connected ? on : undefined}
              className={`cp-cell${on ? " cp-cell--on" : ""}${connected ? "" : " cp-cell--new"}`}
            >
              <span className="cp-top">
                <span className="cp-glyph"><AppIcon kind={c.kind} className="size-4" /></span>
                {on && <CheckIcon className="cp-tick size-3.5" />}
              </span>
              <span className="cp-name">{c.name}</span>
              <span className="cp-state">
                {connected ? (flash === c.id ? "Just connected" : on ? "Enabled" : "Enable") : "Connect"}
              </span>
            </button>
          );
        })}
        {shown.length === 0 && <p className="cp-none">Nothing matches “{query}”.</p>}
      </div>

      <style>{`
        .cp-root { display: flex; flex-direction: column; gap: 12px; width: 100%; }

        .cp-search {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 15px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.4);
        }
        .cp-search input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14px; color: #fff;
        }
        .cp-search input::placeholder { color: rgba(255,255,255,.3); }

        /* Three across, dropping to two and then one rather than squeezing — a
           connector whose name wraps to three lines has stopped being scannable,
           which is the only reason to put them in a grid. */
        .cp-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px;
          max-height: 330px; overflow-y: auto; padding-right: 2px;
        }
        @media (max-width: 720px) { .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 460px) { .cp-grid { grid-template-columns: 1fr; } }

        /* The cell is the control. Connected, it toggles a permission; not
           connected, it opens a login — and the word at the bottom is the only
           thing that has to differ, because that is the only thing that does. */
        .cp-cell {
          display: flex; flex-direction: column; gap: 3px; min-width: 0;
          padding: 12px 13px; border-radius: 12px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
          font-family: inherit;
          transition: border-color .16s ease, background-color .16s ease;
        }
        .cp-cell:hover { border-color: rgba(255,255,255,.26); }
        .cp-cell:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .cp-cell--on { border-color: rgba(248,70,0,.4); background: rgba(248,70,0,.08); }

        .cp-top { display: flex; align-items: center; justify-content: space-between; height: 18px; }
        .cp-glyph { display: flex; color: rgba(255,255,255,.4); }
        .cp-cell--on .cp-glyph { color: var(--color-primary); }
        .cp-tick { color: var(--color-primary); }

        .cp-name {
          font-size: 13.5px; color: #fff; margin-top: 4px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cp-state { font-size: 11.5px; color: rgba(255,255,255,.35); }
        .cp-cell--on .cp-state { color: var(--color-primary); }
        /* the louder of the two words: connecting is the bigger act */
        .cp-cell--new .cp-state { color: rgba(255,255,255,.6); }

        .cp-none { margin: 10px 4px; font-size: 13.5px; color: rgba(255,255,255,.35); }
      `}</style>
    </div>
  );
}
