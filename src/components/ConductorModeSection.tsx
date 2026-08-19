import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { Container } from "../prototype/Container";

// ---------------------------------------------------------------------------
// BLOCK 1 — flow diagram data
// ---------------------------------------------------------------------------
const NODES = [
  { label: "Your request", sub: "Text · Files · Context" },
  { label: "Conductor", sub: "Understands the whole task", emphasis: true },
  { label: "Model + Tools", sub: "Chosen for this task" },
  { label: "Verification", sub: "Second opinion when needed" },
  { label: "Response", sub: "<One single response, ready>" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function DiagramNode({ index, label, sub, emphasis }: { index: number; label: string; sub: string; emphasis?: boolean }) {
  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={itemVariants}
      className={`cm-node${emphasis ? " cm-node--emphasis" : ""}`}
    >
      <span className="cm-node-label">{label}</span>
      <span className="cm-node-sub">{sub}</span>
    </motion.li>
  );
}

// A native SVG "packet" travels each connector path via <animateMotion>/mpath —
// no rAF, no JS loop, the browser drives the loop itself. Each connector is
// pinned to a fixed pixel box (not stretched by the flex row) so the viewBox
// maps 1:1 to px and the packet never renders as a distorted rectangle.
function DiagramConnector({ index }: { index: number }) {
  const delay = `${(index - 1) * 0.5}s`;
  const h = `H${index}`;
  const v = `V${index}`;

  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={itemVariants}
      className={`cm-connector cm-connector--${index}`}
      aria-hidden="true"
    >
      <svg className="cm-conn-svg cm-conn-h" width="44" height="24" viewBox="0 0 44 24" focusable="false">
        <path id={`trail${h}`} className="cm-trail" d="M3,12 H41" />
        <rect className="cm-packet" width="5" height="5" x="-2.5" y="-2.5">
          <animateMotion dur="2s" begin={delay} repeatCount="indefinite">
            <mpath href={`#trail${h}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur="2s"
            begin={delay}
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <svg className="cm-conn-svg cm-conn-v" width="24" height="40" viewBox="0 0 24 40" focusable="false">
        <path id={`trail${v}`} className="cm-trail" d="M12,3 V37" />
        <rect className="cm-packet" width="5" height="5" x="-2.5" y="-2.5">
          <animateMotion dur="2s" begin={delay} repeatCount="indefinite">
            <mpath href={`#trail${v}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur="2s"
            begin={delay}
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </motion.li>
  );
}

// ---------------------------------------------------------------------------
// BLOCK 2 — comparison table data
// ---------------------------------------------------------------------------
type Cell =
  | { type: "mark"; symbol: "✓" | "✕"; tone: "neutral" | "absent" | "active"; sr: string }
  | { type: "word"; text: string; tone: "neutral" | "active" };

const yesNeutral: Cell = { type: "mark", symbol: "✓", tone: "neutral", sr: "Yes" };
const yesActive: Cell = { type: "mark", symbol: "✓", tone: "active", sr: "Yes" };
const noAbsent: Cell = { type: "mark", symbol: "✕", tone: "absent", sr: "No" };

const COMPARISON_ROWS: { label: string; other: Cell; conductor: Cell }[] = [
  { label: "Picks the right model for each question", other: yesNeutral, conductor: yesActive },
  { label: "Understands the whole task, not just the prompt", other: noAbsent, conductor: yesActive },
  { label: "Keeps context when switching models", other: noAbsent, conductor: yesActive },
  { label: "Splits the work and delegates parts automatically", other: noAbsent, conductor: yesActive },
  { label: "Verifies the result before handing it to you", other: noAbsent, conductor: yesActive },
  {
    label: "You choose cost, speed, or quality",
    other: { type: "word", text: "Rarely", tone: "neutral" },
    conductor: yesActive,
  },
  {
    label: "You need to understand models and providers",
    other: { type: "word", text: "Yes", tone: "neutral" },
    conductor: { type: "word", text: "No", tone: "active" },
  },
];

function MarkCell({ cell, label }: { cell: Cell; label: string }) {
  if (cell.type === "mark") {
    return (
      <td data-label={label}>
        <span className={`cm-mark cm-mark--${cell.tone}`} aria-hidden="true">
          {cell.symbol}
        </span>
        <span className="cm-sr-only">{cell.sr}</span>
      </td>
    );
  }
  return (
    <td data-label={label}>
      <span className={`cm-word cm-word--${cell.tone}`}>{cell.text}</span>
    </td>
  );
}

// ---------------------------------------------------------------------------
// BLOCK 3 — benefits data
// ---------------------------------------------------------------------------
const BENEFITS = [
  {
    tag: "Rework",
    title: "No more repeating yourself",
    desc: "Your files, preferences, and conversation history stay with you even when the Conductor switches intelligence under the hood.",
  },
  {
    tag: "Simplicity",
    title: "Zero technical decisions",
    desc: 'You never need to know what a "model" is, choose between options with strange names, or understand technical limits. That’s the Conductor’s job.',
  },
  {
    tag: "Trust",
    title: "More care on the tasks that matter",
    desc: "On more sensitive requests, the Conductor checks in with a second opinion before handing you the answer — like a silent reviewer.",
  },
  {
    tag: "Control",
    title: "You set the priority",
    desc: "Want a fast answer, a cheaper one, or the best possible result? You choose what matters in the moment — the Conductor adapts.",
  },
  {
    tag: "Evolution",
    title: "Always the most current intelligence",
    desc: "When a better intelligence shows up on the market, the Conductor already tests it and starts using it on the right tasks — no platform switch, nothing new to learn.",
  },
];

// ---------------------------------------------------------------------------

export function ConductorModeSection({ onTryConductorMode }: { onTryConductorMode?: () => void } = {}) {
  return (
    <section className="cm-section relative overflow-hidden bg-[#0a0a0a] py-20 md:py-36">
      <div className="cm-grain" aria-hidden="true" />

      <Container className="relative">
        <div className="grid grid-cols-12 gap-6">
          {/* BLOCK 1 — DIAGRAM */}
          <div className="col-span-12">
            <p className="cm-eyebrow">How it works</p>

            <ol className="cm-diagram" aria-label="Conductor Mode flow, from request to response">
              {NODES.map((node, i) => (
                <Fragment key={node.label}>
                  <DiagramNode index={i} label={node.label} sub={node.sub} emphasis={node.emphasis} />
                  {i < NODES.length - 1 && <DiagramConnector index={i + 1} />}
                </Fragment>
              ))}
            </ol>

            <p className="cm-caption">one request, one conducted path, one response</p>
          </div>

          {/* BLOCK 2 — COMPARISON TABLE */}
          <div className="cm-block col-span-12">
            <div className="cm-block-header">
              <h2 className="cm-block-title">What actually changes</h2>
              <p className="cm-block-subtitle">
                Picking the right model is table stakes by now. The difference is everything else.
              </p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="cm-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Other platforms</th>
                    <th scope="col">Starchild Conductor</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <MarkCell cell={row.other} label="Other platforms" />
                      <MarkCell cell={row.conductor} label="Starchild Conductor" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BLOCK 3 — BENEFITS + CTA */}
          <div className="cm-block col-span-12">
            <div className="cm-block-header">
              <h2 className="cm-block-title">What this changes for the people using it</h2>
            </div>

            <div className="cm-benefits">
              {BENEFITS.map((b) => (
                <div className="cm-benefit" key={b.tag}>
                  <span className="cm-benefit-tag">{b.tag}</span>
                  <h3 className="cm-benefit-title">{b.title}</h3>
                  <p className="cm-benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="cm-cta">
              <p className="cm-cta-line">Stop choosing tools. Start asking for results.</p>
              <button className="cm-cta-button" type="button" onClick={onTryConductorMode}>
                Try Conductor Mode
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .cm-section {
          --cm-border: #262626;
          --cm-border-strong: #3d3d3d;
          --cm-text: #d0d0d0;
          --cm-text-2: #6b6b6b;
          --cm-text-3: #454545;
          --cm-accent: var(--color-primary);
        }

        .cm-section ul, .cm-section ol { margin: 0; padding: 0; list-style: none; }
        .cm-section table { border-collapse: collapse; }
        .cm-section button { font: inherit; }

        .cm-sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
        }

        .cm-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .cm-block { margin-top: 132px; }

        .cm-eyebrow {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.24em; color: var(--cm-text-2); text-align: center; margin: 0 0 56px;
          text-transform: uppercase;
        }

        .cm-block-header { max-width: 46ch; margin: 0 auto 56px; text-align: center; }

        .cm-block-title {
          font-family: var(--font-google-sans); font-size: 15px; font-weight: 600;
          letter-spacing: 0.1em; color: var(--cm-text); margin: 0 0 14px;
          text-transform: uppercase; text-wrap: balance;
        }

        .cm-block-subtitle {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.65;
          color: var(--cm-text-2); margin: 0; text-wrap: balance;
        }

        /* diagram */
        .cm-diagram { display: flex; align-items: stretch; gap: 0; }

        .cm-node {
          flex: 1 1 0; min-width: 0; border: 1px solid var(--cm-border); border-radius: 3px;
          padding: 26px 16px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 9px; text-align: center; background: #0a0a0a;
        }

        .cm-node--emphasis { border-color: var(--cm-border-strong); position: relative; }
        .cm-node--emphasis::before {
          content: ""; position: absolute; top: -1px; left: -1px; width: 6px; height: 6px;
          background: var(--cm-accent);
        }

        .cm-node-label {
          font-family: var(--font-google-sans); font-size: 12.5px; font-weight: 600;
          letter-spacing: 0.05em; color: var(--cm-text); text-transform: uppercase;
        }
        .cm-node-sub {
          font-family: var(--font-google-sans); font-size: 10px; letter-spacing: 0.03em;
          color: var(--cm-text-2); line-height: 1.5; text-transform: uppercase;
        }

        .cm-connector {
          flex: 0 0 44px; align-self: center; display: flex; align-items: center; justify-content: center;
        }
        .cm-conn-svg { display: block; overflow: visible; }
        .cm-conn-svg.cm-conn-v { display: none; }

        .cm-trail {
          fill: none; stroke: var(--cm-border-strong); stroke-width: 1; stroke-dasharray: 3 3;
          animation: cm-trail-pulse 3s ease-in-out infinite;
        }
        .cm-packet { fill: var(--cm-accent); }

        .cm-connector--1 .cm-trail { animation-delay: 0s; }
        .cm-connector--2 .cm-trail { animation-delay: 0.5s; }
        .cm-connector--3 .cm-trail { animation-delay: 1s; }
        .cm-connector--4 .cm-trail { animation-delay: 1.5s; }

        @keyframes cm-trail-pulse {
          0%, 100% { stroke-opacity: 0.25; }
          50% { stroke-opacity: 0.6; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cm-packet { display: none; }
        }

        .cm-caption {
          font-family: var(--font-google-sans); font-style: italic; font-size: 20px;
          color: var(--cm-text-2); text-align: center; max-width: 32ch; margin: 44px auto 0; line-height: 1.5;
        }

        /* table */
        .cm-table { width: 100%; font-family: var(--font-google-sans); font-size: 13.5px; }

        .cm-table thead th {
          font-weight: 500; letter-spacing: 0.09em; color: var(--cm-text-2); text-transform: uppercase;
          text-align: center; padding: 0 12px 18px; border-bottom: 1px solid var(--cm-border);
        }
        .cm-table thead th:first-child { text-align: left; }

        .cm-table tbody td {
          padding: 18px 12px; border-bottom: 1px solid var(--cm-border); vertical-align: middle;
        }
        .cm-table tbody tr:last-child td { border-bottom: none; }
        .cm-table tbody td:first-child {
          text-align: left; color: var(--cm-text); letter-spacing: 0.01em; padding-left: 4px;
        }
        .cm-table tbody td:not(:first-child) { text-align: center; width: 220px; }

        .cm-mark { font-size: 16px; }
        .cm-mark--neutral { color: var(--cm-text-2); }
        .cm-mark--absent { color: var(--cm-text-3); }
        .cm-mark--active { color: var(--cm-accent); }

        .cm-word { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cm-text-2); }
        .cm-word--active { color: var(--cm-accent); }

        /* benefits */
        .cm-benefits {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          column-gap: 44px; row-gap: 52px;
        }
        .cm-benefit {
          display: flex; flex-direction: column; gap: 12px; padding-top: 22px;
          border-top: 1px solid var(--cm-border);
        }
        .cm-benefit-tag {
          display: flex; align-items: center; gap: 9px; font-family: var(--font-google-sans);
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: var(--cm-accent);
          text-transform: uppercase;
        }
        .cm-benefit-tag::before { content: ""; width: 6px; height: 6px; background: var(--cm-accent); flex: none; }
        .cm-benefit-title {
          font-family: var(--font-google-sans); font-size: 18.5px; font-weight: 600;
          color: var(--cm-text); margin: 0; text-wrap: balance;
        }
        .cm-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.65;
          color: var(--cm-text-2); margin: 0; max-width: 36ch;
        }

        .cm-cta {
          margin-top: 96px; padding-top: 64px; border-top: 1px solid var(--cm-border);
          display: flex; flex-direction: column; align-items: center; gap: 30px; text-align: center;
        }
        .cm-cta-line {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; letter-spacing: 0;
          color: var(--cm-text); max-width: 30ch; margin: 0;
        }
        .cm-cta-button {
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 500; letter-spacing: 0;
          color: #fff; background: var(--cm-accent); border: 1px solid var(--cm-accent);
          border-radius: 999px; padding: 14px 30px; cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 24px rgba(248, 70, 0, 0.32);
        }
        .cm-cta-button:hover { transform: scale(1.03); }
        .cm-cta-button:focus-visible { outline: 2px solid var(--cm-accent); outline-offset: 3px; }

        @media (max-width: 760px) {
          .cm-section { padding-top: 84px; padding-bottom: 84px; }
          .cm-block { margin-top: 76px; }
          .cm-eyebrow, .cm-block-header { margin-bottom: 40px; }

          .cm-diagram { flex-direction: column; align-items: stretch; }
          .cm-node { padding: 22px 18px; }
          .cm-connector { flex-basis: 40px; }
          .cm-conn-svg.cm-conn-h { display: none; }
          .cm-conn-svg.cm-conn-v { display: block; }

          .cm-table, .cm-table thead, .cm-table tbody, .cm-table tr, .cm-table td {
            display: block; width: 100%;
          }
          .cm-table thead {
            position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);
          }
          .cm-table tbody tr {
            border: 1px solid var(--cm-border); border-radius: 3px; padding: 18px 18px 6px; margin-bottom: 14px;
          }
          .cm-table tbody tr:last-child { margin-bottom: 0; }
          .cm-table tbody td { border-bottom: none; padding: 0 0 14px; width: auto; }
          .cm-table tbody td:first-child {
            padding-bottom: 14px; margin-bottom: 12px; border-bottom: 1px dashed var(--cm-border);
          }
          .cm-table tbody td:not(:first-child) {
            display: flex; align-items: center; justify-content: space-between; text-align: left;
          }
          .cm-table tbody td:not(:first-child)::before {
            content: attr(data-label); font-size: 10.5px; letter-spacing: 0.08em; color: var(--cm-text-2);
          }

          .cm-benefits { grid-template-columns: 1fr; row-gap: 40px; }
          .cm-cta { margin-top: 64px; padding-top: 48px; }
          .cm-cta-button { width: 100%; }
        }
      `}</style>
    </section>
  );
}
