import type { CSSProperties } from "react";

// Abstract line art for the "What Starchild can help with" grid. Same rules as the
// rest of the page: thin geometry, one orange accent, nothing literal. Each piece
// draws in the same 160×96 box so the six cards share a composition.
const BOX = "0 0 160 96";

const line = "rgba(255,255,255,.26)";
const faint = "rgba(255,255,255,.12)";

type ArtProps = { className?: string };

// Talk — two sides of a conversation, one answering the other. On hover the reply
// writes itself in, so the card reads as an exchange rather than a transcript.
export function TalkArt({ className = "" }: ArtProps) {
  const asked = [
    { y: 22, w: 62 },
    { y: 32, w: 44 },
  ];
  const said = [
    { y: 56, w: 66 },
    { y: 66, w: 50 },
    { y: 76, w: 34 },
  ];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--talk ${className}`} fill="none" aria-hidden="true">
      {/* what you bring, anchored left */}
      {asked.map((r, i) => (
        <line
          key={r.y}
          className="cg-say"
          style={{ "--i": i, transformOrigin: "left center" } as CSSProperties}
          x1="14"
          y1={r.y}
          x2={14 + r.w}
          y2={r.y}
          stroke={line}
          strokeWidth="1"
        />
      ))}
      {/* what comes back, anchored right — the first line carries the accent */}
      {said.map((r, i) => (
        <line
          key={r.y}
          className="cg-say cg-say--reply"
          style={{ "--i": i + 2, transformOrigin: "right center" } as CSSProperties}
          x1={146 - r.w}
          y1={r.y}
          x2="146"
          y2={r.y}
          stroke={i === 0 ? "var(--color-primary)" : line}
          strokeWidth={i === 0 ? 1.6 : 1}
        />
      ))}
      <circle cx="8" cy="22" r="2" fill="rgba(255,255,255,.4)" />
      <circle cx="152" cy="56" r="2.4" fill="var(--color-primary)" />
    </svg>
  );
}

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

// Conductor Mode — many thin sources converging on one point, then a single
// line out. The choice happens at the join; only the answer leaves.
export function ConductorArt({ className = "" }: ArtProps) {
  const ys = [16, 30, 44, 58, 72];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--explore ${className}`} fill="none" aria-hidden="true">
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

// Create — a form assembling itself above a baseline. Wireframe, not syntax.
export function CreateArt({ className = "" }: ArtProps) {
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--create ${className}`} fill="none" aria-hidden="true">
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

// Run for me — a closed track with the dot already some way around it. Hover
// carries it most of the way home. The loop is the point: it is the one card
// whose subject does not stop when you look away.
export function RunArt({ className = "" }: ArtProps) {
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--run ${className}`} fill="none" aria-hidden="true">
      {/* rotated so both the arc and the dot start at the top of the track */}
      <g className="cg-run">
        <circle cx="80" cy="48" r="28" stroke={faint} strokeWidth="1" />
        <circle className="cg-run-arc" cx="80" cy="48" r="28" stroke="var(--color-primary)" strokeWidth="1.4" />
        <g className="cg-run-dot">
          <circle cx="108" cy="48" r="3.2" fill="var(--color-primary)" />
        </g>
      </g>
      <line x1="80" y1="48" x2="80" y2="20" stroke={faint} strokeWidth="1" />
    </svg>
  );
}

// Marketplace — a shelf of ready-made things. One is yours: on hover it lifts
// clear of the row, and the empty slot it came from stays open behind it, which
// is the trade the card is offering in both directions.
export function MarketArt({ className = "" }: ArtProps) {
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--market ${className}`} fill="none" aria-hidden="true">
      <line x1="14" y1="72" x2="146" y2="72" stroke={faint} strokeWidth="1" />
      {[22, 62, 102].map((x) => (
        <rect key={x} x={x} y="46" width="36" height="26" rx="4" stroke={faint} strokeWidth="1" />
      ))}
      <g className="cg-lift">
        <rect x="62" y="46" width="36" height="26" rx="4" stroke="var(--color-primary)" strokeWidth="1.4" />
        <circle cx="80" cy="59" r="2.2" fill="var(--color-primary)" />
      </g>
    </svg>
  );
}
