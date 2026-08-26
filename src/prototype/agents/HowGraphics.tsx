/**
 * The four ideas, drawn.
 *
 * These are diagrams, not decoration, and they are built out of the signs the
 * product already uses: an orange dot is the agent, a ring is the agent asking,
 * a thin line is time passing, a tick is a run. Someone who watches these four
 * has already been taught how to read the roster — which is the only justification
 * for putting a picture in an onboarding at all.
 *
 * Everything animates in CSS on a loop, so there is no timer to keep in step with
 * the card that owns it, and the whole set goes still under reduced motion.
 */
export function HowGraphic({ i }: { i: number }) {
  return (
    <div className="hg" aria-hidden="true">
      {i === 0 && <Brief />}
      {i === 1 && <Tools />}
      {i === 2 && <Keeps />}
      {i === 3 && <Asks />}
      <Style />
    </div>
  );
}

/* 1 · Give it a job — words go in, an agent comes out holding them */
function Brief() {
  return (
    <svg viewBox="0 0 208 96" className="hg-svg">
      <g className="hg-lines">
        <rect className="hg-bar hg-bar--1" x="14" y="34" width="62" height="7" rx="3.5" />
        <rect className="hg-bar hg-bar--2" x="14" y="46" width="46" height="7" rx="3.5" />
        <rect className="hg-bar hg-bar--3" x="14" y="58" width="34" height="7" rx="3.5" />
      </g>
      <path className="hg-feed" d="M86 48 H150" />
      <circle className="hg-dot hg-dot--takes" cx="166" cy="48" r="9" />
    </svg>
  );
}

/* 2 · Connect your tools — and only the ones you connect */
function Tools() {
  const nodes = [
    { x: 166, y: 24, on: true },
    { x: 176, y: 62, on: true },
    { x: 42, y: 26, on: true },
    { x: 34, y: 60, on: false },
    { x: 104, y: 84, on: false },
  ];
  return (
    <svg viewBox="0 0 208 96" className="hg-svg">
      {nodes.map((n, k) =>
        n.on ? (
          <path
            key={k}
            className="hg-wire"
            style={{ animationDelay: `${0.25 + k * 0.28}s` }}
            d={`M104 44 L${n.x} ${n.y}`}
          />
        ) : null,
      )}
      {nodes.map((n, k) => (
        <circle
          key={k}
          className={`hg-node${n.on ? " hg-node--on" : ""}`}
          style={n.on ? { animationDelay: `${0.55 + k * 0.28}s` } : undefined}
          cx={n.x}
          cy={n.y}
          r="6.5"
        />
      ))}
      <circle className="hg-dot" cx="104" cy="44" r="9" />
    </svg>
  );
}

/* 3 · Let it keep going — the line does not end, and the work stacks up on it */
function Keeps() {
  return (
    <svg viewBox="0 0 208 96" className="hg-svg">
      <path className="hg-rail" d="M10 62 H198" />
      {[38, 72, 106, 140, 174].map((x, k) => (
        <g key={x}>
          <rect className="hg-tick" x={x - 1} y="56" width="2" height="12" rx="1" />
          {/*
            A run that happened, and that stays up — the card's whole claim is that
            the work accumulates while nobody is watching.

            Each bar has its own keyframes rather than one animation offset by a
            delay. A delay would put every bar on its own clock, so after the first
            lap they would never all clear together; sharing one 3.6s timeline is
            what makes the pass and the growth the same event.
          */}
          <rect className={`hg-run hg-run--${k + 1}`} x={x - 3} y="30" width="6" height="26" rx="3" />
        </g>
      ))}
      <circle className="hg-dot hg-dot--runs" cy="62" r="7" />
    </svg>
  );
}

/* 4 · Come back when it matters — quiet, quiet, quiet, then a ring */
function Asks() {
  return (
    <svg viewBox="0 0 208 96" className="hg-svg">
      <path className="hg-rail" d="M10 56 H198" />
      {[40, 74, 108].map((x, k) => (
        <rect
          key={x}
          className="hg-tick hg-tick--quiet"
          style={{ animationDelay: `${k * 0.6}s` }}
          x={x - 1}
          y="50"
          width="2"
          height="12"
          rx="1"
        />
      ))}
      {/* the one that is worth your attention: it rises off the line */}
      <path className="hg-riser" d="M160 56 V30" />
      <circle className="hg-ring" cx="160" cy="24" r="8" />
      <circle className="hg-dot hg-dot--stops" cx="160" cy="24" r="3" />
    </svg>
  );
}

function Style() {
  return (
    <style>{`
      .hg { display: flex; justify-content: center; margin-bottom: 4px; }
      .hg-svg { width: 208px; height: 96px; overflow: visible; }

      /* the agent, everywhere it appears */
      .hg-dot { fill: var(--color-primary); }
      .hg-rail, .hg-feed, .hg-wire, .hg-riser {
        fill: none; stroke: rgba(255,255,255,.16); stroke-width: 1.5; stroke-linecap: round;
      }

      /* ── 1 · the brief ── */
      .hg-bar { fill: rgba(255,255,255,.16); opacity: 0; animation: hg-bar 4.4s ease-out infinite; }
      .hg-bar--2 { animation-delay: .18s; }
      .hg-bar--3 { animation-delay: .36s; }
      @keyframes hg-bar {
        0% { opacity: 0; transform: translateX(-6px); }
        14%, 74% { opacity: 1; transform: translateX(0); }
        92%, 100% { opacity: 0; transform: translateX(0); }
      }
      .hg-feed {
        stroke-dasharray: 64; stroke-dashoffset: 64;
        animation: hg-feed 4.4s ease-in-out infinite;
      }
      @keyframes hg-feed {
        0%, 12% { stroke-dashoffset: 64; }
        40%, 78% { stroke-dashoffset: 0; }
        94%, 100% { stroke-dashoffset: 64; }
      }
      /* it takes the job on — one swell, not a throb */
      .hg-dot--takes { animation: hg-takes 4.4s ease-in-out infinite; transform-origin: 166px 48px; }
      @keyframes hg-takes {
        0%, 38% { transform: scale(.72); opacity: .45; }
        52%, 80% { transform: scale(1); opacity: 1; }
        96%, 100% { transform: scale(.72); opacity: .45; }
      }

      /* ── 2 · the tools ── */
      .hg-node { fill: none; stroke: rgba(255,255,255,.18); stroke-width: 1.5; }
      /* the ones nobody connected stay exactly as they were — that is the point */
      .hg-node--on { animation: hg-node 4.6s ease-out infinite; }
      @keyframes hg-node {
        0%, 8% { fill: rgba(248,70,0,0); stroke: rgba(255,255,255,.18); }
        22%, 80% { fill: rgba(248,70,0,.9); stroke: rgba(248,70,0,.9); }
        94%, 100% { fill: rgba(248,70,0,0); stroke: rgba(255,255,255,.18); }
      }
      .hg-wire {
        stroke: rgba(248,70,0,.45);
        stroke-dasharray: 90; stroke-dashoffset: 90;
        animation: hg-wire 4.6s ease-in-out infinite;
      }
      @keyframes hg-wire {
        0%, 4% { stroke-dashoffset: 90; }
        20%, 80% { stroke-dashoffset: 0; }
        94%, 100% { stroke-dashoffset: 90; }
      }

      /* ── 3 · it keeps going ── */
      .hg-tick { fill: rgba(255,255,255,.18); }
      .hg-run {
        fill: rgba(248,70,0,.75); transform-origin: center bottom;
        animation-duration: 3.6s; animation-timing-function: cubic-bezier(.16,1,.3,1);
        animation-iteration-count: infinite;
      }
      .hg-run--1 { animation-name: hg-run1; }
      @keyframes hg-run1 {
        0%, 15% { transform: scaleY(0); opacity: 0; }
        19%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--2 { animation-name: hg-run2; }
      @keyframes hg-run2 {
        0%, 33% { transform: scaleY(0); opacity: 0; }
        37%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--3 { animation-name: hg-run3; }
      @keyframes hg-run3 {
        0%, 51% { transform: scaleY(0); opacity: 0; }
        55%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--4 { animation-name: hg-run4; }
      @keyframes hg-run4 {
        0%, 69% { transform: scaleY(0); opacity: 0; }
        73%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--5 { animation-name: hg-run5; }
      @keyframes hg-run5 {
        0%, 87% { transform: scaleY(0); opacity: 0; }
        91%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      /* in one edge and out the other: the loop is the message */
      .hg-dot--runs { animation: hg-runs 3.6s linear infinite; }
      @keyframes hg-runs {
        0% { cx: 10px; }
        100% { cx: 198px; }
      }

      /* ── 4 · and asks ── */
      .hg-tick--quiet { fill: rgba(255,255,255,.2); animation: hg-quiet 4.2s ease-out infinite; }
      @keyframes hg-quiet {
        0%, 4% { fill: rgba(255,255,255,.5); }
        20%, 100% { fill: rgba(255,255,255,.2); }
      }
      .hg-riser {
        stroke: rgba(248,70,0,.7);
        stroke-dasharray: 26; stroke-dashoffset: 26;
        animation: hg-riser 4.2s ease-out infinite;
      }
      @keyframes hg-riser {
        0%, 24% { stroke-dashoffset: 26; }
        36%, 94% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 26; }
      }
      /* a ring, because that is what waiting looks like everywhere else in here */
      .hg-ring {
        fill: none; stroke: var(--color-primary); stroke-width: 1.6;
        transform-origin: 160px 24px;
        animation: hg-ring 4.2s ease-out infinite;
      }
      @keyframes hg-ring {
        0%, 30% { opacity: 0; transform: scale(.4); }
        42% { opacity: 1; transform: scale(1.14); }
        50%, 94% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(.4); }
      }
      .hg-dot--stops { animation: hg-stops 4.2s ease-out infinite; }
      @keyframes hg-stops {
        0%, 28% { opacity: 0; }
        40%, 94% { opacity: 1; }
        100% { opacity: 0; }
      }

      /* Still, but not blank: every loop above ends where it began, so holding the
         last frame would show an empty diagram. These hold the finished state. */
      @media (prefers-reduced-motion: reduce) {
        .hg-svg * { animation: none !important; }
        .hg-bar { opacity: 1; }
        .hg-feed, .hg-wire, .hg-riser { stroke-dashoffset: 0; }
        .hg-dot--takes { opacity: 1; }
        .hg-node--on { fill: rgba(248,70,0,.9); stroke: rgba(248,70,0,.9); }
        .hg-ring, .hg-dot--stops { opacity: 1; }
        .hg-dot--runs { cx: 190px; }
        .hg-run { opacity: 1; }
      }
    `}</style>
  );
}
