import { motion } from "motion/react";
import type { AgentExample, AgentPanel } from "./agentsData";
import { CheckIcon } from "../../icons";

// The product view for version C: prompt on the right, Starchild's work
// underneath, and dark like the page around it rather than a light window pasted
// onto a dark site. The three examples share one height, so switching between
// them doesn't make the section jump.
export function AgentWindow({ example }: { example: AgentExample }) {
  return (
    <div className="aw-frame">
      <div className="aw-chrome">
        <img
          src={`${import.meta.env.BASE_URL}images/starchild-symbol.svg`}
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0"
        />
        <span className="aw-chrome-title">Agents</span>
        <span className="aw-chrome-name">{example.panel.agentName}</span>
      </div>

      <div className="aw-body">
        <div className="aw-prompt-row">
          <p className="aw-prompt">{example.prompt}</p>
        </div>

        <motion.div
          key={example.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="aw-panel-wrap"
        >
          <Panel panel={example.panel} />
        </motion.div>
      </div>

      <style>{`
        .aw-frame {
          border-radius: 16px; overflow: hidden; background: #0e0e10;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 24px 70px rgba(0,0,0,.55);
        }
        .aw-chrome {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,.07); background: #141416;
        }
        .aw-chrome-title { font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.6); }
        .aw-chrome-name {
          font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.38);
        }
        .aw-chrome-name::before { content: "/"; margin-right: 10px; color: rgba(255,255,255,.18); }

        .aw-body { padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 22px; }
        .aw-prompt-row { display: flex; justify-content: flex-end; }
        /* the visitor's own words are the one thing on this surface that isn't
           Starchild talking, so they carry the accent */
        .aw-prompt {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.5; color: #fff;
          background: rgba(248,70,0,.16); border: 1px solid rgba(248,70,0,.34);
          border-radius: 16px 16px 5px 16px; padding: 13px 17px; margin: 0; max-width: 84%;
        }

        /* the panel keeps one height across the three examples, so picking a
           different one doesn't shift everything below the section */
        .aw-panel-wrap { min-height: 348px; }

        /* the agent card — one object with a name, a state, and what it did */
        .aw-card { border: 1px solid rgba(255,255,255,.09); border-radius: 13px; background: #141416; overflow: hidden; }
        .aw-card-head {
          display: flex; align-items: center; gap: 10px; padding: 16px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07); background: #17171a;
        }
        .aw-card-title {
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 600; color: #fff; margin: 0;
        }
        .aw-status {
          display: inline-flex; align-items: center; gap: 7px; margin-left: auto;
          font-family: var(--font-google-sans); font-size: 11.5px; color: rgba(255,255,255,.5);
        }
        .aw-live {
          width: 6px; height: 6px; border-radius: 999px; background: var(--color-primary);
          box-shadow: 0 0 0 0 rgba(248,70,0,.45); animation: aw-pulse 2.4s ease-out infinite;
        }
        @keyframes aw-pulse {
          0% { box-shadow: 0 0 0 0 rgba(248,70,0,.45); }
          70% { box-shadow: 0 0 0 7px rgba(248,70,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(248,70,0,0); }
        }

        .aw-section { padding: 16px 18px; }
        .aw-section + .aw-section { border-top: 1px solid rgba(255,255,255,.07); }
        .aw-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.35); margin: 0 0 12px;
        }

        .aw-chips { display: flex; flex-wrap: wrap; gap: 7px; }
        .aw-chip {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-google-sans); font-size: 12px; color: rgba(255,255,255,.72);
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          border-radius: 999px; padding: 5px 12px 5px 6px;
        }
        /* stand-in for a vendor mark: same size, same weight, no borrowed branding */
        .aw-chip-mark {
          display: flex; align-items: center; justify-content: center; flex: none;
          width: 16px; height: 16px; border-radius: 5px;
          background: rgba(255,255,255,.09); color: rgba(255,255,255,.55);
          font-family: var(--font-google-sans); font-size: 9px; font-weight: 600; line-height: 1;
        }

        /* uses · runs · output — the recurring agent in three lines */
        .aw-rows { display: flex; flex-direction: column; }
        .aw-row {
          display: flex; align-items: center; gap: 16px; padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .aw-row-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35);
          width: 54px; flex: none;
        }
        .aw-row-value { font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.82); }

        .aw-log { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .aw-log li {
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.5);
        }
        .aw-log-time { font-size: 11.5px; color: rgba(255,255,255,.3); width: 40px; flex: none; }
        .aw-tick { color: rgba(255,255,255,.2); flex: none; }
        .aw-log li.aw-hit { color: #fff; font-weight: 500; }
        .aw-hit .aw-tick { color: var(--color-primary); }

        .aw-alert {
          border-top: 1px solid rgba(255,255,255,.07); padding: 16px 18px;
          background: linear-gradient(180deg, rgba(248,70,0,.12), rgba(248,70,0,0));
        }
        .aw-alert-title {
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 600; color: #fff; margin: 0;
        }
        .aw-alert-detail {
          font-family: var(--font-google-sans); font-size: 12.5px; line-height: 1.55;
          color: rgba(255,255,255,.55); margin: 6px 0 0;
        }

        .aw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .aw-list li { display: flex; align-items: baseline; gap: 11px; }
        .aw-idx {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          color: var(--color-primary); width: 12px; flex: none;
        }
        .aw-item-text { font-family: var(--font-google-sans); font-size: 13.5px; color: rgba(255,255,255,.85); }
        .aw-item-note { font-family: var(--font-google-sans); font-size: 12px; color: rgba(255,255,255,.4); }

        .aw-fields { display: flex; flex-direction: column; gap: 0; }
        .aw-field { display: flex; gap: 16px; padding: 14px 18px; }
        .aw-field + .aw-field { border-top: 1px solid rgba(255,255,255,.07); }
        .aw-field-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35);
          width: 104px; flex: none; padding-top: 2px;
        }
        .aw-field-value {
          font-family: var(--font-google-sans); font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.82);
        }

        .aw-footer {
          display: flex; align-items: center; gap: 9px; padding: 14px 18px;
          border-top: 1px solid rgba(255,255,255,.07); background: #17171a;
          font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.6);
        }

        @media (prefers-reduced-motion: reduce) { .aw-live { animation: none; } }
        @media (max-width: 1023px) {
          /* stacked, the panels are taller and the shared height stops helping */
          .aw-panel-wrap { min-height: 0; }
        }
        @media (max-width: 640px) {
          .aw-body { padding: 18px 16px 20px; gap: 18px; }
          .aw-prompt { font-size: 14px; max-width: 92%; }
          .aw-field { flex-direction: column; gap: 5px; }
          .aw-field-label { width: auto; }
        }
      `}</style>
    </div>
  );
}

// Third-party tools show up as the agent's own UI would show them: a monogram and
// a name. No vendor logos — the Starchild interface stays the thing you look at.
function ToolChips({ items }: { items: string[] }) {
  return (
    <span className="aw-chips">
      {items.map((item) => (
        <span className="aw-chip" key={item}>
          <span className="aw-chip-mark" aria-hidden="true">
            {item[0]}
          </span>
          {item}
        </span>
      ))}
    </span>
  );
}

function Panel({ panel }: { panel: AgentPanel }) {
  if (panel.kind === "monitor") {
    return (
      <div className="aw-card">
        <div className="aw-card-head">
          <p className="aw-card-title">{panel.agentName}</p>
          <span className="aw-status">
            <span className="aw-live" aria-hidden="true" />
            {panel.cadence}
          </span>
        </div>

        <div className="aw-section">
          <p className="aw-label">Connected sources</p>
          <ToolChips items={panel.sources} />
        </div>

        <div className="aw-section">
          <ul className="aw-log">
            {panel.checks.map((check, i) => (
              <motion.li
                key={check.time}
                className={check.hit ? "aw-hit" : undefined}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="aw-log-time">{check.time}</span>
                <CheckIcon className="aw-tick size-3.5" />
                {check.text}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="aw-alert"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="aw-label">{panel.alert.heading}</p>
          <p className="aw-alert-title">{panel.alert.title}</p>
          <p className="aw-alert-detail">{panel.alert.detail}</p>
        </motion.div>
      </div>
    );
  }

  if (panel.kind === "recurring") {
    return (
      <div className="aw-card">
        <div className="aw-card-head">
          <p className="aw-card-title">{panel.agentName}</p>
          <span className="aw-status">
            <span className="aw-live" aria-hidden="true" />
            On
          </span>
        </div>

        {/* what it pulls from, when it runs, what comes out — three lines, no builder */}
        <div className="aw-rows">
          <div className="aw-row">
            <span className="aw-row-label">Uses</span>
            <ToolChips items={panel.uses} />
          </div>
          <div className="aw-row">
            <span className="aw-row-label">Runs</span>
            <span className="aw-row-value">{panel.runs}</span>
          </div>
          <div className="aw-row">
            <span className="aw-row-label">Output</span>
            <span className="aw-row-value">{panel.outputName}</span>
          </div>
        </div>

        <motion.div
          className="aw-section"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="aw-label">{panel.output.heading}</p>
          <ul className="aw-list">
            {panel.output.items.map((item, i) => (
              <li key={item.text}>
                <span className="aw-idx">{i + 1}</span>
                <span>
                  <span className="aw-item-text">{item.text}</span>{" "}
                  <span className="aw-item-note">— {item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="aw-card">
      <div className="aw-card-head">
        <p className="aw-card-title">{panel.agentName}</p>
        <span className="aw-status">New agent</span>
      </div>

      <div className="aw-fields">
        {panel.fields.map((field, i) => (
          <motion.div
            className="aw-field"
            key={field.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.08 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="aw-field-label">{field.label}</span>
            <span className="aw-field-value">{field.value}</span>
          </motion.div>
        ))}

        <motion.div
          className="aw-field"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.08 + panel.fields.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="aw-field-label">Tools</span>
          <ToolChips items={panel.tools} />
        </motion.div>
      </div>

      <motion.div
        className="aw-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.46 }}
      >
        <span className="aw-live" aria-hidden="true" />
        {panel.status}
      </motion.div>
    </div>
  );
}
