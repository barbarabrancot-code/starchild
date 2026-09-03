import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useAgents } from "./store";
import type { ConnectorId } from "./connectors";

/**
 * Standing up a dedicated agent, on purpose.
 *
 * This is the one door into a dedicated agent's existence. The main chat can
 * notice a pattern, and it can hand off to an agent that already exists — what
 * it cannot do any more is bring a new one into being on its own, because that
 * is exactly the line this model draws: simple ongoing work stays with the main
 * agent, and a dedicated worker is something you decided to create, here,
 * knowing it comes with a mission, a watchlist, rules, and a page of its own.
 *
 * A form rather than a conversation, unlike the very first agent an empty
 * account still meets through `AgentOnboarding`. That one is a welcome — it is
 * teaching the concept to someone who has never had an agent, and a back-and-
 * forth earns its keep there. Someone reaching for "+ New agent" a second time
 * already knows what an agent is; asking them three separate questions in
 * sequence to collect four fields is ceremony, not guidance.
 */

export type NewDedicatedAgent = {
  name: string;
  mission: string;
  watchlist: string[];
  connectors: ConnectorId[];
  trigger: string;
  alerts: ConnectorId[];
};

const CHANNELS: { id: ConnectorId; label: string }[] = [
  { id: "telegram", label: "Telegram" },
  { id: "slack", label: "Slack" },
  { id: "gmail", label: "Email" },
];

/** what a trading-focused agent typically reaches into, offered here so a
 *  mission does not have to spell it out in words the way `alerts` does */
const TOOL_CONNECTORS: { id: ConnectorId; label: string }[] = [
  { id: "hyperliquid", label: "Hyperliquid" },
  { id: "telegram", label: "Telegram" },
];

export function NewAgentPanel({
  initialName,
  onCancel,
  onCreate,
}: {
  /** carried over from the picker when someone typed a name before finding nothing */
  initialName?: string;
  onCancel: () => void;
  onCreate: (agent: NewDedicatedAgent) => void;
}) {
  const { isConnected } = useAgents();
  const [name, setName] = useState(initialName ?? "");
  const [mission, setMission] = useState("");
  const [tickerDraft, setTickerDraft] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [connectors, setConnectors] = useState<ConnectorId[]>(
    isConnected("hyperliquid") ? ["hyperliquid"] : [],
  );
  const [trigger, setTrigger] = useState("");
  // Starchild is not offered as a toggle here either, same reasoning as the
  // drawer: it is not a channel, it is where the agent lives. Telegram defaults
  // on when the account already has it connected, matching how any other
  // freshly made thing in this product picks up a connector that is already
  // authenticated rather than asking about it a second time.
  const [alerts, setAlerts] = useState<ConnectorId[]>(isConnected("telegram") ? ["telegram"] : []);
  const nameRef = useRef<HTMLInputElement>(null);

  const addTicker = () => {
    const t = tickerDraft.trim().toUpperCase().replace(/[,\s]+$/, "");
    if (t && !watchlist.includes(t)) setWatchlist((w) => [...w, t]);
    setTickerDraft("");
  };

  const canCreate = name.trim().length > 0 && mission.trim().length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="np-root"
    >
      <div className="np-head">
        <p className="np-kicker">New agent</p>
        <button type="button" className="np-x" onClick={onCancel} aria-label="Cancel">
          ✕
        </button>
      </div>

      <div className="np-body">
        <label className="ag-field">
          <span className="ag-field-label">Agent name</span>
          <input
            ref={nameRef}
            autoFocus
            className="ag-field-in"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hyperliquid Funding Watcher"
          />
        </label>

        {/* "Mission" rather than "instruction" here specifically, and it is worth
            keeping the two words apart on purpose: an active task in the main
            chat holds a condition, something to check; a dedicated agent holds a
            mission, something to be for. The word on the field is the first thing
            teaching someone which of the two they are making. */}
        <label className="ag-field">
          <span className="ag-field-label">Mission</span>
          <textarea
            className="ag-field-in"
            rows={2}
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            placeholder="Track funding rates across my watchlist and alert me when conditions become unusual."
          />
        </label>

        <div className="ag-field">
          <span className="ag-field-label">Watchlist</span>
          <div className="np-tickers">
            {watchlist.map((t) => (
              <button
                key={t}
                type="button"
                className="ag-mark"
                title={`Remove ${t}`}
                onClick={() => setWatchlist((w) => w.filter((x) => x !== t))}
              >
                {t}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <input
              className="np-ticker-in"
              value={tickerDraft}
              onChange={(e) => setTickerDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "," || e.key === " ") {
                  e.preventDefault();
                  addTicker();
                }
                if (e.key === "Backspace" && !tickerDraft && watchlist.length) {
                  setWatchlist((w) => w.slice(0, -1));
                }
              }}
              onBlur={addTicker}
              placeholder={watchlist.length ? "" : "HYPE, SOL, ETH, BTC…"}
            />
          </div>
        </div>

        {/* What it may reach *into*, as against Notification channels below,
            which is where it may reach *you*. Two different questions, and
            answering them with the same list is exactly the confusion this
            field exists to avoid — Hyperliquid is data the agent reads,
            Telegram is a place a message can land, and an agent can easily
            want one without the other. */}
        <div className="ag-field">
          <span className="ag-field-label">Connectors</span>
          <div className="ag-alerts">
            {TOOL_CONNECTORS.map(({ id, label }) => {
              const on = connectors.includes(id);
              const available = isConnected(id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!available}
                  aria-pressed={on}
                  title={available ? undefined : `Connect ${label} first`}
                  className={`ag-alert${on ? " ag-alert--on" : ""}`}
                  onClick={() => setConnectors((c) => (on ? c.filter((x) => x !== id) : [...c, id]))}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <label className="ag-field">
          <span className="ag-field-label">Trigger</span>
          <input
            className="ag-field-in"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="When funding becomes unusually positive or negative"
          />
        </label>

        <div className="ag-field">
          <span className="ag-field-label">Notification channels</span>
          <div className="ag-alerts">
            <span className="np-starchild-chip">Starchild</span>
            {CHANNELS.map(({ id, label }) => {
              const on = alerts.includes(id);
              const available = isConnected(id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!available}
                  aria-pressed={on}
                  title={available ? undefined : `Connect ${label} first`}
                  className={`ag-alert${on ? " ag-alert--on" : ""}`}
                  onClick={() =>
                    setAlerts((a) => (on ? a.filter((x) => x !== id) : [...a, id]))
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="np-create"
          disabled={!canCreate}
          onClick={() =>
            onCreate({ name: name.trim(), mission: mission.trim(), watchlist, connectors, trigger: trigger.trim(), alerts })
          }
        >
          Create agent
        </button>

        <p className="np-note">Dedicated agents are created when the work needs its own space.</p>
      </div>

      <style>{`
        .np-root { display: flex; flex-direction: column; height: 100%; padding: 24px 28px; overflow-y: auto; }
        .np-head { display: flex; align-items: center; justify-content: space-between; }
        .np-kicker {
          margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }
        .np-x {
          display: flex; size: 28px; align-items: center; justify-content: center;
          color: rgba(255,255,255,.4); transition: color .2s;
        }
        .np-x:hover { color: #fff; }

        .np-body { display: flex; flex-direction: column; gap: 18px; max-width: 420px; margin-top: 22px; }

        .np-tickers {
          display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;
          padding: 9px 0;
        }
        .np-ticker-in {
          flex: 1; min-width: 90px; background: none; border: none; outline: none;
          font-size: 13px; color: #fff;
        }
        .np-ticker-in::placeholder { color: rgba(255,255,255,.3); }

        .np-starchild-chip {
          border-radius: 999px; padding: 5px 11px; font-size: 12.5px;
          color: rgba(255,255,255,.5);
        }

        .np-create {
          margin-top: 4px; align-self: flex-start;
          border-radius: 999px; padding: 10px 22px; font-size: 14px; font-weight: 500;
          background: var(--color-primary); color: #fff;
          transition: transform .15s, opacity .2s;
        }
        .np-create:hover:not(:disabled) { transform: scale(1.02); }
        .np-create:disabled { opacity: .4; cursor: not-allowed; }

        .np-note { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,.32); }
      `}</style>
    </motion.section>
  );
}
