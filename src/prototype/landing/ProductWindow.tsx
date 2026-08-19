import { motion } from "motion/react";
import type { DemoResult, PrimaryUseCase } from "../data";
import { LogoMark } from "../icons";

// Mirrors the real ChatScreen: light surface, prompt on the right, Conductor's
// steps down a rail, deliverable at the end. Light-on-dark on purpose — this is
// what the product actually looks like, so it should read as a screenshot.
export function ProductWindow({ useCase }: { useCase: PrimaryUseCase }) {
  return (
    <div className="pw-frame">
      <div className="pw-chrome">
        <LogoMark className="size-[15px]" />
        <span className="pw-chrome-title">Conductor Mode</span>
      </div>

      <div className="pw-body">
        <div className="pw-prompt-row">
          <p className="pw-prompt">{useCase.prompt}</p>
        </div>

        <ol className="pw-steps">
          {useCase.steps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`pw-step${i === useCase.steps.length - 1 ? " pw-step--done" : ""}`}
            >
              <span className="pw-dot" aria-hidden="true" />
              {step}
            </motion.li>
          ))}
        </ol>

        <motion.div
          key={useCase.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <Result result={useCase.result} />
        </motion.div>
      </div>

      <style>{`
        .pw-frame {
          border-radius: 14px; overflow: hidden; background: #fff;
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 70px rgba(0,0,0,.55);
        }
        .pw-chrome {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px; border-bottom: 1px solid rgba(0,0,0,.07); background: #fbfaf8;
        }
        .pw-chrome-title {
          font-family: var(--font-google-sans); font-size: 12px; color: #737373;
        }

        .pw-body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 16px; }

        .pw-prompt-row { display: flex; justify-content: flex-end; }
        .pw-prompt {
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.5; color: #262626;
          background: #f5f5f5; border-radius: 14px 14px 4px 14px; padding: 10px 13px; margin: 0; max-width: 82%;
        }

        .pw-steps { list-style: none; margin: 0; padding: 0 0 0 2px; display: flex; flex-direction: column; gap: 11px; }
        .pw-step {
          position: relative; padding-left: 20px;
          font-family: var(--font-google-sans); font-size: 12.5px; line-height: 1.5; color: #737373;
        }
        .pw-step--done { color: #262626; font-weight: 500; }
        .pw-dot {
          position: absolute; left: 0; top: 5px; width: 9px; height: 9px; border-radius: 999px;
          border: 1.6px solid #d4d4d4; background: #fff;
        }
        .pw-step--done .pw-dot { border-color: var(--color-primary); }
        .pw-step--done .pw-dot::after {
          content: ""; position: absolute; inset: 1.6px; border-radius: 999px; background: var(--color-primary);
        }
        /* rail connecting the steps */
        .pw-step:not(:last-child)::before {
          content: ""; position: absolute; left: 4.2px; top: 14px; bottom: -11px; width: 1.4px; background: #ededed;
        }

        .pw-result {
          border: 1px solid #ededed; border-radius: 11px; padding: 14px; background: #fbfaf8;
        }
        .pw-result-heading {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: #a3a3a3; margin: 0 0 11px;
        }

        .pw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .pw-list li { display: flex; align-items: baseline; gap: 9px; }
        .pw-list-idx {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          color: var(--color-primary); width: 12px; flex: none;
        }
        .pw-list-text { font-family: var(--font-google-sans); font-size: 13px; color: #262626; }
        .pw-list-note { font-family: var(--font-google-sans); font-size: 11.5px; color: #a3a3a3; }

        .pw-table { width: 100%; border-collapse: collapse; font-family: var(--font-google-sans); }
        .pw-table th, .pw-table td { text-align: right; padding: 7px 0; font-size: 12.5px; }
        .pw-table th:first-child, .pw-table td:first-child { text-align: left; color: #737373; }
        .pw-table thead th { font-size: 10.5px; font-weight: 600; color: #a3a3a3; letter-spacing: .06em; text-transform: uppercase; }
        .pw-table tbody tr + tr td { border-top: 1px solid #f0f0f0; }
        .pw-table td { color: #262626; }
        .pw-table td:nth-child(2) { color: var(--color-primary); font-weight: 500; }

        .pw-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .pw-tile { border: 1px solid #f0f0f0; border-radius: 8px; padding: 10px 11px; background: #fff; }
        .pw-tile-label {
          font-family: var(--font-google-sans); font-size: 10.5px; color: #a3a3a3; margin: 0 0 4px;
        }
        .pw-tile-value {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: #171717; margin: 0;
        }
        .pw-tile-delta { font-family: var(--font-google-sans); font-size: 10.5px; color: var(--color-primary); }
        /* narrow bars with a baseline, so this reads as a trend and not as skeleton blocks */
        .pw-bars {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 5px;
          height: 62px; margin-top: 14px; padding-bottom: 5px;
          border-bottom: 1px solid #ededed;
        }
        .pw-bar { flex: 1; max-width: 15px; border-radius: 2px 2px 0 0; background: #e4e4e4; }
        .pw-bar:last-child { background: var(--color-primary); }

        @media (max-width: 640px) {
          .pw-body { padding: 16px 14px 18px; }
          .pw-tiles { grid-template-columns: repeat(3, 1fr); gap: 6px; }
          .pw-tile { padding: 8px; }
          .pw-tile-value { font-size: 14px; }
        }
      `}</style>
    </div>
  );
}

function Result({ result }: { result: DemoResult }) {
  if (result.kind === "list") {
    return (
      <div className="pw-result">
        <p className="pw-result-heading">{result.heading}</p>
        <ul className="pw-list">
          {result.items.map((item, i) => (
            <li key={item.text}>
              <span className="pw-list-idx">{i + 1}</span>
              <span>
                <span className="pw-list-text">{item.text}</span>{" "}
                <span className="pw-list-note">— {item.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (result.kind === "compare") {
    return (
      <div className="pw-result">
        <table className="pw-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">{result.columns[0]}</th>
              <th scope="col">{result.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.a}</td>
                <td>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="pw-result">
      <div className="pw-tiles">
        {result.tiles.map((tile) => (
          <div className="pw-tile" key={tile.label}>
            <p className="pw-tile-label">{tile.label}</p>
            <p className="pw-tile-value">
              {tile.value} {tile.delta && <span className="pw-tile-delta">{tile.delta}</span>}
            </p>
          </div>
        ))}
      </div>
      <div className="pw-bars" aria-hidden="true">
        {result.bars.map((h, i) => (
          <motion.span
            key={i}
            className="pw-bar"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}
