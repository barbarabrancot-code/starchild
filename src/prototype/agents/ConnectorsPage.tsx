import { useState } from "react";
import { ConnectorMark } from "./ConnectorMark";
import { CATALOG, type ConnectorId } from "./connectors";
import { useAgents } from "./store";

/**
 * Connectors — the one place where the whole picture is visible.
 *
 * The agent flow answers "can this agent use Gmail?". This answers the questions
 * that only make sense across everything: which account is it connected as, what
 * did I actually grant, and who is using it. That last one is why disconnecting is
 * safe to offer here and nowhere else — it is the only screen that can tell you
 * what will break.
 */
export function ConnectorsPage() {
  const { isConnected, connectionFor, usedBy, connect, disconnect } = useAgents();
  const [open, setOpen] = useState<ConnectorId | null>(null);

  const connected = CATALOG.filter((c) => isConnected(c.id));
  const available = CATALOG.filter((c) => !isConnected(c.id));

  return (
    <div className="cn-page">
      <header className="cn-head">
        <h1 className="cn-title">Connectors</h1>
        <p className="cn-sub">
          Connect a tool to Starchild once. After that you decide, agent by agent, which
          ones are allowed to use it.
        </p>
      </header>

      <section className="cn-section">
        <p className="cn-label">Connected · {connected.length}</p>
        {connected.length === 0 && <p className="cn-empty">Nothing connected yet.</p>}

        <div className="cn-connected-grid">
          {connected.map((c) => {
            const conn = connectionFor(c.id);
            const users = usedBy(c.id);
            const expanded = open === c.id;

            return (
              <div key={c.id} className={`cn-card${expanded ? " cn-card--open" : ""}`}>
                <button
                  type="button"
                  className="cn-card-head"
                  onClick={() => setOpen(expanded ? null : c.id)}
                  aria-expanded={expanded}
                >
                  <span className="cn-card-top">
                    <span className="cn-glyph"><ConnectorMark id={c.id} className="size-[18px]" /></span>
                    <span className="cn-card-body">
                      <span className="cn-name">{c.name}</span>
                      <span className="cn-account">Connected as {conn?.account}</span>
                    </span>
                  </span>
                </button>

                {expanded && (
                  <div className="cn-detail">
                    <div>
                      <p className="cn-detail-label">What agents can do with it</p>
                      <ul className="cn-grants">
                        {c.grants.map((g) => <li key={g}>{g}</li>)}
                      </ul>
                    </div>

                    <div className="cn-detail-side">
                      <p className="cn-detail-label">Account</p>
                      <p className="cn-detail-value">{conn?.account}</p>
                      <p className="cn-detail-since">{conn?.since}</p>

                      <div className="cn-actions">
                        <button type="button" className="cn-btn" onClick={() => connect(c.id)}>
                          Reconnect
                        </button>
                        <button type="button" className="cn-btn cn-btn--off" onClick={() => disconnect(c.id)}>
                          Disconnect
                        </button>
                      </div>

                      {users.length > 0 && (
                        <p className="cn-warn">
                          Disconnecting removes it from {users.length === 1 ? "1 agent" : `${users.length} agents`}.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="cn-section">
        <p className="cn-label">Available · {available.length}</p>
        <div className="cn-grid">
          {available.map((c) => (
            <div key={c.id} className="cn-avail">
              <span className="cn-glyph"><ConnectorMark id={c.id} className="size-4" /></span>
              <span className="cn-card-body">
                <span className="cn-name">{c.name}</span>
                <span className="cn-what">{c.what}</span>
              </span>
              <button type="button" className="cn-connect" onClick={() => connect(c.id)}>
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .cn-page {
          flex: 1; min-width: 0; overflow-y: auto; padding: 34px 34px 60px;
          font-family: var(--font-google-sans); color: #fff;
        }
        .cn-head { max-width: 60ch; margin-bottom: 34px; }
        .cn-title { margin: 0; font-size: 26px; font-weight: 600; }
        .cn-sub { margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.5); }

        .cn-section { display: flex; flex-direction: column; gap: 8px; margin-bottom: 38px; }
        .cn-label {
          margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .cn-empty { margin: 0; font-size: 14px; color: rgba(255,255,255,.35); }

        /* Four across on a wide screen, stepping down as the column gets tighter
           rather than letting a fourth of it sit unreadably narrow. */
        .cn-connected-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        @media (min-width: 640px) { .cn-connected-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 980px) { .cn-connected-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1280px) { .cn-connected-grid { grid-template-columns: repeat(4, 1fr); } }

        .cn-card {
          border: 1px solid rgba(255,255,255,.09); border-radius: 14px;
          background: rgba(255,255,255,.02); overflow: hidden;
        }
        .cn-card--open { border-color: rgba(255,255,255,.16); grid-column: 1 / -1; }

        .cn-card-head {
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px; width: 100%;
          padding: 15px 18px; border: 0; background: none; cursor: pointer; text-align: left;
          transition: background-color .15s ease;
        }
        .cn-card-head:hover { background: rgba(255,255,255,.03); }

        .cn-card-top { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .cn-glyph { flex: none; display: flex; color: rgba(255,255,255,.45); }
        .cn-card-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cn-name { font-size: 15px; font-weight: 500; }
        .cn-account, .cn-what { font-size: 12.5px; color: rgba(255,255,255,.4); }

        .cn-detail {
          display: grid; gap: 22px; padding: 4px 18px 20px;
          border-top: 1px solid rgba(255,255,255,.07);
        }
        @media (min-width: 720px) { .cn-detail { grid-template-columns: 1fr 240px; padding-top: 18px; } }

        .cn-detail-label {
          margin: 0 0 8px; font-size: 11px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        /* Permissions in plain sentences: someone can agree or disagree with "read
           your mail". Nobody can agree with a scope string. */
        .cn-grants { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .cn-grants li {
          position: relative; padding-left: 15px; font-size: 13.5px; color: rgba(255,255,255,.6);
        }
        .cn-grants li::before {
          content: ""; position: absolute; left: 0; top: 8px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(248,70,0,.7);
        }

        .cn-detail-value { margin: 0; font-size: 13.5px; }
        .cn-detail-since { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,.3); }

        .cn-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .cn-btn {
          padding: 7px 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.16); background: none;
          font-family: inherit; font-size: 12.5px; color: rgba(255,255,255,.7);
        }
        .cn-btn:hover { border-color: rgba(255,255,255,.34); color: #fff; }
        .cn-btn--off:hover { border-color: rgba(248,70,0,.6); color: var(--color-primary); }

        /* Said before the click, not after — the only screen that knows the blast
           radius is the one that has to warn about it. */
        .cn-warn { margin: 10px 0 0; font-size: 11.5px; line-height: 1.5; color: rgba(255,255,255,.32); }

        .cn-grid { display: grid; gap: 8px; }
        @media (min-width: 700px) { .cn-grid { grid-template-columns: 1fr 1fr; } }
        .cn-avail {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02);
        }
        .cn-connect {
          margin-left: auto; flex: none; padding: 6px 15px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.05);
          font-family: inherit; font-size: 12.5px; font-weight: 500; color: #fff;
        }
        .cn-connect:hover { background: rgba(255,255,255,.12); }
      `}</style>
    </div>
  );
}
