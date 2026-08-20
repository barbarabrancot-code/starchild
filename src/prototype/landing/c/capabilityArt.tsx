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

// Think — a field of possible moves with one route threaded through it. Hover
// draws the route, which is what thinking something through actually looks like.
export function ThinkArt({ className = "" }: ArtProps) {
  const columns = [
    { x: 26, ys: [26, 48, 70] },
    { x: 80, ys: [20, 48, 76] },
    { x: 134, ys: [32, 62] },
  ];
  const route = "M26 48 L80 20 L134 32";
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--think ${className}`} fill="none" aria-hidden="true">
      {/* every link that was on the table */}
      {columns[0].ys.map((y1) =>
        columns[1].ys.map((y2) => (
          <line key={`${y1}-${y2}`} x1="26" y1={y1} x2="80" y2={y2} stroke={faint} strokeWidth="1" />
        )),
      )}
      {columns[1].ys.map((y1) =>
        columns[2].ys.map((y2) => (
          <line key={`b${y1}-${y2}`} x1="80" y1={y1} x2="134" y2={y2} stroke={faint} strokeWidth="1" />
        )),
      )}
      <path className="cg-route" d={route} stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {columns.map(({ x, ys }) =>
        ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="rgba(255,255,255,.34)" />),
      )}
      <circle cx="134" cy="32" r="3" fill="var(--color-primary)" />
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

// Explore — many thin sources converging on one point, then a single line out.
export function ExploreArt({ className = "" }: ArtProps) {
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

// Organize — loose blocks that fall into columns. At rest they sit off the grid;
// on hover everything lands where it belongs.
export function OrganizeArt({ className = "" }: ArtProps) {
  const blocks = [
    { x: 18, y: 20, w: 34, h: 12, dx: 9, dy: -6 },
    { x: 18, y: 38, w: 34, h: 12, dx: -7, dy: 5 },
    { x: 18, y: 56, w: 34, h: 12, dx: 6, dy: 8 },
    { x: 63, y: 20, w: 34, h: 12, dx: -8, dy: 7 },
    { x: 63, y: 38, w: 34, h: 12, dx: 7, dy: -8 },
    { x: 108, y: 20, w: 34, h: 12, dx: 8, dy: 9 },
  ];
  return (
    <svg viewBox={BOX} className={`cg-svg cg-svg--organize ${className}`} fill="none" aria-hidden="true">
      {/* the columns the blocks are landing in */}
      {[35, 80, 125].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="82" stroke={faint} strokeWidth="1" />
      ))}
      {blocks.map((b, i) => (
        <rect
          key={`${b.x}-${b.y}`}
          className="cg-block"
          style={{ "--dx": `${b.dx}px`, "--dy": `${b.dy}px`, "--i": i } as CSSProperties}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="3"
          stroke={i === 0 ? "var(--color-primary)" : line}
          strokeWidth={i === 0 ? 1.4 : 1}
        />
      ))}
    </svg>
  );
}
