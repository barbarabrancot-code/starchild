import { useState } from "react";
import { CheckIcon } from "../icons";
import { ConnectorMark } from "./ConnectorMark";
import { BY_ID, type ConnectorId } from "./connectors";

/**
 * The moment a connector actually lands, mid-conversation.
 *
 * Not shown pre-added: authorizing an account is the one part of this Starchild
 * cannot do on someone's behalf, so the card starts exactly where the person's
 * own part of the work starts — a real, secondary-weight "Add" — and only
 * turns into the quiet green "Added" once they've clicked it, the same way
 * `ConnectorsPage`'s own row would.
 */
export function ConnectorAdded({
  id,
  /** starts already added — for showing the resting state without a click, e.g. in the library */
  initiallyAdded = false,
  /** fires alongside the local Added state, for a caller with a real connect to make */
  onAdd,
}: {
  id: ConnectorId;
  initiallyAdded?: boolean;
  onAdd?: () => void;
}) {
  const [added, setAdded] = useState(initiallyAdded);
  const connector = BY_ID[id];
  return (
    <div className="conn-added">
      <span className="conn-added-glyph"><ConnectorMark id={id} className="size-7" /></span>
      <span className="conn-added-body">
        <span className="conn-added-name">{connector.name}</span>
        <span className="conn-added-what">{connector.what}</span>
      </span>
      {added ? (
        <span className="conn-added-badge">
          <CheckIcon className="size-3" />
          Added
        </span>
      ) : (
        <button
          type="button"
          className="conn-added-connect"
          onClick={() => {
            setAdded(true);
            onAdd?.();
          }}
        >
          Add
        </button>
      )}

      <style>{`
        .conn-added {
          display: flex; align-items: center; gap: 12px;
          width: 480px; box-sizing: border-box; padding: 11px 14px; border-radius: 13px;
          border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
          font-family: var(--font-google-sans);
        }
        .conn-added-glyph { flex: none; display: flex; }
        .conn-added-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .conn-added-name { font-size: 14px; font-weight: 600; color: #fff; }
        .conn-added-what { font-size: 12px; color: rgba(255,255,255,.45); }
        .conn-added-badge {
          margin-left: auto; flex: none; display: flex; align-items: center; gap: 5px;
          padding: 6px 11px; border-radius: 999px;
          background: rgba(62,207,95,.14); color: #3ecf5f;
          font-size: 12.5px; font-weight: 600;
        }
        .conn-added-connect {
          margin-left: auto; flex: none; padding: 6px 15px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.05);
          font-family: inherit; font-size: 12.5px; font-weight: 500; color: #fff;
          transition: background .15s ease;
        }
        .conn-added-connect:hover { background: rgba(255,255,255,.12); }
      `}</style>
    </div>
  );
}
