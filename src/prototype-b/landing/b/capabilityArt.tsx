import type { CSSProperties } from "react";

// Abstract line art for the "What Starchild can help with" grid. Same rules as the
// rest of the page: thin geometry, one orange accent, nothing literal. Each piece
// draws in the same 160×96 box so the six cards share a composition.
const BOX = "0 0 160 96";

const line = "rgba(255,255,255,.26)";
const faint = "rgba(255,255,255,.12)";

type ArtProps = { className?: string };

// Work — scattered inputs settling into an ordered sequence. On hover the ragged
// left edges align, which is the whole idea of the card in one movement.
export function WorkArt({ className = "" }: ArtProps) {
  const rows = [
    { y: 22, x: 26, w: 58 },
    { y: 34, x: 12, w: 84 },
    { y: 46, x: 34, w: 46 },
    { y: 58, x: 20, w: 72 },
    { y: 70, x: 44, w: 38 },
  ];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--work ${className}`} fill="none" aria-hidden="true">
      <line x1="8" y1="14" x2="8" y2="82" stroke={faint} strokeWidth="1" />
      {rows.map((r, i) => (
        <line
          key={r.y}
          className="cg-row"
          style={{ "--dx": `${r.x - 12}px`, "--i": i } as CSSProperties}
          x1="12"
          y1={r.y}
          x2={12 + r.w}
          y2={r.y}
          stroke={i === 0 ? "var(--color-primary)" : line}
          strokeWidth={i === 0 ? 1.6 : 1}
        />
      ))}
    </svg>
  );
}

// Research — many thin sources converging on one point, then a single line out.
export function ResearchArt({ className = "" }: ArtProps) {
  const ys = [16, 30, 44, 58, 72];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--research ${className}`} fill="none" aria-hidden="true">
      {ys.map((y, i) => (
        <path
          key={y}
          className="cg-feed"
          style={{ "--i": i } as CSSProperties}
          d={`M8 ${y} C 52 ${y}, 62 48, 96 48`}
          stroke={line}
          strokeWidth="1"
        />
      ))}
      <line x1="96" y1="48" x2="150" y2="48" stroke="var(--color-primary)" strokeWidth="1.4" />
      <circle className="cg-node" cx="96" cy="48" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.4" />
      <circle cx="96" cy="48" r="1.6" fill="var(--color-primary)" />
    </svg>
  );
}

// Build — a form assembling itself above a baseline. Wireframe, not syntax.
export function BuildArt({ className = "" }: ArtProps) {
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--build ${className}`} fill="none" aria-hidden="true">
      <line x1="14" y1="80" x2="146" y2="80" stroke={faint} strokeWidth="1" />
      {/* base face */}
      <path d="M52 62 L80 74 L108 62 L80 50 Z" stroke={line} strokeWidth="1" />
      {/* rising verticals */}
      <g className="cg-rise">
        <path d="M52 62 L52 38 M108 62 L108 38 M80 74 L80 50" stroke={faint} strokeWidth="1" />
        <path d="M52 38 L80 50 L108 38 L80 26 Z" stroke="var(--color-primary)" strokeWidth="1.3" />
      </g>
      <circle cx="80" cy="26" r="2.2" fill="var(--color-primary)" />
    </svg>
  );
}

// Trade — relationships and orbit rather than candlesticks. One body carries the
// signal; the ring keeps turning.
export function TradeArt({ className = "" }: ArtProps) {
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--trade ${className}`} fill="none" aria-hidden="true">
      <circle cx="80" cy="48" r="34" stroke={faint} strokeWidth="1" />
      <circle cx="80" cy="48" r="16" stroke={line} strokeWidth="1" />
      <g className="cg-orbit">
        <circle cx="114" cy="48" r="3.2" fill="var(--color-primary)" />
      </g>
      <g className="cg-orbit cg-orbit--slow">
        <circle cx="64" cy="48" r="2.2" fill="rgba(255,255,255,.5)" />
      </g>
      <path d="M80 48 L114 48" stroke="rgba(248,70,0,.35)" strokeWidth="1" />
      <circle cx="80" cy="48" r="1.8" fill="#fff" />
    </svg>
  );
}

// Automate — one continuous path that never stops. A short bright segment travels
// it, so the loop reads as work still running.
export function AutomateArt({ className = "" }: ArtProps) {
  const wave = "M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--automate ${className}`} fill="none" aria-hidden="true">
      <path d={wave} stroke={line} strokeWidth="1" />
      <path className="cg-travel" d={wave} stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="48" r="2" fill="rgba(255,255,255,.45)" />
      <circle cx="150" cy="34" r="2" fill="rgba(255,255,255,.45)" />
    </svg>
  );
}

// Monetize — one thing you made, branching out to the people who use it.
export function MonetizeArt({ className = "" }: ArtProps) {
  const ends = [18, 36, 60, 78];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--monetize ${className}`} fill="none" aria-hidden="true">
      <rect x="18" y="38" width="20" height="20" rx="3" stroke="var(--color-primary)" strokeWidth="1.4" />
      <line x1="38" y1="48" x2="70" y2="48" stroke={line} strokeWidth="1" />
      {ends.map((y, i) => (
        <g key={y}>
          <path
            className="cg-branch"
            style={{ "--i": i } as CSSProperties}
            d={`M70 48 C 96 48, 100 ${y}, 126 ${y}`}
            stroke={line}
            strokeWidth="1"
          />
          <circle
            className="cg-dest"
            style={{ "--i": i } as CSSProperties}
            cx="132"
            cy={y}
            r="2.6"
            fill={i === 1 ? "var(--color-primary)" : "rgba(255,255,255,.4)"}
          />
        </g>
      ))}
      <circle cx="70" cy="48" r="2.4" fill="rgba(255,255,255,.55)" />
    </svg>
  );
}
