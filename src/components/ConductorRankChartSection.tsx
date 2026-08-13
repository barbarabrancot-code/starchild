import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Option A — one chart, three categories on rotation. Y = rank (1st→4th),
// X = time. Every column below is a permutation of 1..4, and the #1 spot
// changes hands within a category and across categories at the same month.
// ---------------------------------------------------------------------------
type ModelId = "openai" | "gemini" | "xai" | "deepseek";
type Rank = 1 | 2 | 3 | 4;

const MODELS: { id: ModelId; name: string; color: string }[] = [
  { id: "openai", name: "OpenAI", color: "var(--rc-1)" },
  { id: "gemini", name: "Gemini", color: "var(--rc-2)" },
  { id: "xai", name: "Grok", color: "var(--rc-3)" },
  { id: "deepseek", name: "DeepSeek", color: "var(--rc-4)" },
];

const TIME_LABELS = ["Jan", "Mar", "May", "Jul"];

const CATEGORIES: { label: string; ranks: Record<ModelId, Rank[]> }[] = [
  {
    label: "Writing",
    ranks: {
      openai: [1, 2, 3, 3],
      gemini: [2, 1, 1, 2],
      deepseek: [4, 3, 2, 1],
      xai: [3, 4, 4, 4],
    },
  },
  {
    label: "Image",
    ranks: {
      xai: [1, 2, 1, 2],
      deepseek: [2, 1, 3, 4],
      gemini: [3, 4, 4, 3],
      openai: [4, 3, 2, 1],
    },
  },
  {
    label: "Programming",
    ranks: {
      deepseek: [1, 2, 3, 4],
      openai: [2, 3, 1, 2],
      xai: [4, 1, 2, 3],
      gemini: [3, 4, 4, 1],
    },
  },
];

// ---------------------------------------------------------------------------
const VB_W = 460;
const VB_H = 220;
const PAD_X = 26;
const RANK_Y: Record<Rank, number> = { 1: 18, 2: 73, 3: 128, 4: 183 };

function timeX(i: number) {
  const usable = VB_W - PAD_X * 2;
  return PAD_X + (usable * i) / (TIME_LABELS.length - 1);
}

function smoothPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const midX = (prev.x + cur.x) / 2;
    d += ` C${midX},${prev.y} ${midX},${cur.y} ${cur.x},${cur.y}`;
  }
  return d;
}

function useAutoAdvance(length: number, ms: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);

  return [index, setIndex] as const;
}

export function ConductorRankChartSection() {
  const [catIndex, setCatIndex] = useAutoAdvance(CATEGORIES.length, 4200);
  const [hovered, setHovered] = useState<ModelId | null>(null);
  const category = CATEGORIES[catIndex];

  return (
    <section className="rc-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[400px]">
          <p className="rc-eyebrow">Model rankings</p>
          <h2 className="rc-headline">
            Yesterday&rsquo;s best model is rarely today&rsquo;s. We track that so you don&rsquo;t have to.
          </h2>
          <p className="rc-subhead">
            It&rsquo;s ours, not yours. Every time a new model comes out, the Conductor evaluates
            it and updates how it routes tasks. You never have to research, compare, or switch
            platforms to benefit from what&rsquo;s new — you&rsquo;re already on it.
          </p>
        </div>

        <div className="rc-card w-full md:max-w-[600px]">
          <button
            type="button"
            className="rc-category"
            onClick={() => setCatIndex((catIndex + 1) % CATEGORIES.length)}
            aria-label={`Showing ${category.label} rankings — click to advance`}
          >
            <span className="rc-category-dot" />
            {category.label}
          </button>

          <svg
            className="rc-svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="img"
            aria-label={`${category.label} model ranking, January to July`}
            focusable="false"
          >
            {([1, 2, 3, 4] as Rank[]).map((r) => (
              <line key={r} className="rc-grid" x1={0} x2={VB_W} y1={RANK_Y[r]} y2={RANK_Y[r]} />
            ))}

            {MODELS.map((model) => {
              const ranks = category.ranks[model.id];
              const points = ranks.map((r, i) => ({ x: timeX(i), y: RANK_Y[r] }));
              const last = points[points.length - 1];
              const dimmed = hovered !== null && hovered !== model.id;
              return (
                <g
                  key={model.id}
                  className={dimmed ? "rc-series rc-series--dim" : "rc-series"}
                  onMouseEnter={() => setHovered(model.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <path
                    className="rc-line"
                    style={{ d: `path("${smoothPath(points)}")`, stroke: model.color }}
                  />
                  <circle className="rc-dot" cx={last.x} cy={last.y} r={5} style={{ fill: model.color }}>
                    <title>{`${model.name} — ${category.label} — ${TIME_LABELS[TIME_LABELS.length - 1]}: rank ${ranks[ranks.length - 1]}`}</title>
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className="rc-axis">
            {TIME_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="rc-legend" role="group" aria-label="Models">
            {MODELS.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`rc-legend-item${hovered === model.id ? " rc-legend-item--active" : ""}`}
                onMouseEnter={() => setHovered(model.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(model.id)}
                onBlur={() => setHovered(null)}
              >
                <span className="rc-legend-swatch" style={{ background: model.color }} aria-hidden="true" />
                <img
                  src={`${import.meta.env.BASE_URL}icons/${model.id}.svg`}
                  alt=""
                  className="rc-legend-icon"
                  aria-hidden="true"
                />
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .rc-section {
          --rc-border: #262626;
          --rc-text: #d0d0d0;
          --rc-text-2: #6b6b6b;
          --rc-green: #3ecf8e;
          --rc-1: #3987e5;
          --rc-2: #d95926;
          --rc-3: #199e70;
          --rc-4: #c98500;
        }

        .rc-eyebrow {
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--rc-text-2);
          margin: 0 0 20px;
        }
        .rc-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: #ffffff;
          font-size: 30px; line-height: 1.2; letter-spacing: -0.01em; margin: 0 0 18px;
          text-wrap: balance;
        }
        .rc-subhead {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.65;
          color: var(--rc-text-2); margin: 0; text-wrap: balance;
        }

        .rc-card {
          border: 1px solid var(--rc-border); border-radius: 6px; padding: 28px 28px 24px;
          background: #0a0a0a;
        }

        .rc-category {
          display: inline-flex; align-items: center; gap: 8px; background: transparent;
          border: 1px solid var(--rc-border); border-radius: 999px; padding: 6px 14px 6px 10px;
          font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--rc-green); cursor: pointer; margin-bottom: 18px;
          transition: border-color 0.2s ease;
        }
        .rc-category:hover, .rc-category:focus-visible { border-color: var(--rc-green); }
        .rc-category:focus-visible { outline: 2px solid var(--rc-green); outline-offset: 2px; }
        .rc-category-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rc-green); }

        .rc-svg { display: block; width: 100%; height: auto; overflow: visible; }
        .rc-grid { stroke: var(--rc-border); stroke-width: 1; }

        .rc-series { cursor: pointer; transition: opacity 0.2s ease; }
        .rc-series--dim { opacity: 0.2; }

        .rc-line {
          fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
          transition: d 0.7s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .rc-dot { stroke: #0a0a0a; stroke-width: 2; paint-order: stroke; }

        .rc-axis {
          display: flex; justify-content: space-between; margin-top: 8px; padding: 0 26px;
        }
        .rc-axis span {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.05em;
          text-transform: uppercase; color: var(--rc-text-2);
        }

        .rc-legend {
          display: flex; flex-wrap: wrap; gap: 18px 22px; margin-top: 22px;
          padding-top: 20px; border-top: 1px solid var(--rc-border);
        }
        .rc-legend-item {
          display: flex; align-items: center; gap: 7px; background: transparent; border: 0;
          padding: 2px; cursor: pointer; font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.04em; color: var(--rc-text-2); transition: color 0.2s ease;
        }
        .rc-legend-item:hover, .rc-legend-item--active { color: var(--rc-text); }
        .rc-legend-item:focus-visible { outline: 2px solid var(--rc-text-2); outline-offset: 3px; }
        .rc-legend-swatch { width: 12px; height: 2px; border-radius: 1px; flex: none; }
        .rc-legend-icon {
          width: 14px; height: 14px; object-fit: contain; flex: none;
          filter: invert(1) brightness(1.7);
        }

        @media (prefers-reduced-motion: reduce) {
          .rc-line { transition: none; }
        }

        @media (max-width: 760px) {
          .rc-section { padding-top: 84px; padding-bottom: 84px; }
          .rc-headline { font-size: 26px; }
          .rc-card { padding: 22px 18px 20px; }
          .rc-axis { padding: 0 4px; }
        }
      `}</style>
    </section>
  );
}
