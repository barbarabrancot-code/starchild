import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Option B — a bar per model, height = relative standing, reshuffling every
// few seconds. The tallest bar (today's leader) is highlighted; it's a
// different model each period, on purpose.
// ---------------------------------------------------------------------------
type ModelId = "openai" | "gemini" | "xai" | "deepseek" | "zai" | "manus" | "kimi" | "elevenlabs";

const MODELS: { id: ModelId; name: string }[] = [
  { id: "gemini", name: "Gemini" },
  { id: "elevenlabs", name: "ElevenLabs" },
  { id: "deepseek", name: "DeepSeek" },
  { id: "zai", name: "Z.ai" },
  { id: "manus", name: "Manus" },
  { id: "kimi", name: "Kimi" },
  { id: "xai", name: "Grok" },
  { id: "openai", name: "ChatGPT" },
];

const PERIODS: { label: string; values: Record<ModelId, number> }[] = [
  {
    label: "Q1",
    values: { gemini: 70, elevenlabs: 45, deepseek: 60, zai: 55, manus: 40, kimi: 50, xai: 65, openai: 80 },
  },
  {
    label: "Q2",
    values: { gemini: 85, elevenlabs: 50, deepseek: 58, zai: 62, manus: 45, kimi: 48, xai: 70, openai: 75 },
  },
  {
    label: "Q3",
    values: { gemini: 60, elevenlabs: 42, deepseek: 90, zai: 58, manus: 50, kimi: 55, xai: 68, openai: 72 },
  },
  {
    label: "Q4",
    values: { gemini: 65, elevenlabs: 47, deepseek: 70, zai: 88, manus: 52, kimi: 58, xai: 73, openai: 69 },
  },
];

const MAX_VALUE = 95;

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

export function ConductorBarRaceSection() {
  const [periodIndex, setPeriodIndex] = useAutoAdvance(PERIODS.length, 3200);
  const period = PERIODS[periodIndex];
  const leader = MODELS.reduce((a, b) => (period.values[b.id] > period.values[a.id] ? b : a));

  return (
    <section className="br-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[400px]">
          <p className="br-eyebrow">Model rankings</p>
          <h2 className="br-headline">
            Yesterday&rsquo;s best model is rarely today&rsquo;s. We track that so you don&rsquo;t have to.
          </h2>
          <p className="br-subhead">
            It&rsquo;s ours, not yours. Every time a new model comes out, the Conductor evaluates
            it and updates how it routes tasks. You never have to research, compare, or switch
            platforms to benefit from what&rsquo;s new — you&rsquo;re already on it.
          </p>
        </div>

        <div className="br-card w-full md:max-w-[600px]">
          <div className="br-header-row">
            <span className="br-title">Best AI</span>
            <button
              type="button"
              className="br-period"
              onClick={() => setPeriodIndex((periodIndex + 1) % PERIODS.length)}
              aria-label={`Showing ${period.label} — click to advance`}
            >
              {period.label}
              <span className="br-period-year">2025</span>
            </button>
          </div>

          <div className="br-plot" role="img" aria-label={`${period.label} 2025: ${leader.name} leads`}>
            {MODELS.map((model) => {
              const value = period.values[model.id];
              const isLeader = model.id === leader.id;
              return (
                <div className="br-col" key={model.id}>
                  {isLeader && <span className="br-tag">Leading</span>}
                  <div className="br-track">
                    <div
                      className={`br-bar${isLeader ? " br-bar--leader" : ""}`}
                      style={{ height: `${(value / MAX_VALUE) * 100}%` }}
                    />
                  </div>
                  <img
                    src={`${import.meta.env.BASE_URL}icons/${model.id}.svg`}
                    alt={model.name}
                    className="br-icon"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .br-section {
          --br-border: #262626;
          --br-text: #d0d0d0;
          --br-text-2: #6b6b6b;
          --br-green: #3ecf8e;
        }

        .br-eyebrow {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--br-text-2);
          margin: 0 0 20px;
        }
        .br-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: #ffffff;
          font-size: 30px; line-height: 1.2; letter-spacing: -0.01em; margin: 0 0 18px;
          text-wrap: balance;
        }
        .br-subhead {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.65;
          color: var(--br-text-2); margin: 0; text-wrap: balance;
        }

        .br-card {
          border: 1px solid var(--br-border); border-radius: 6px; padding: 28px 28px 22px;
          background: #0a0a0a;
        }

        .br-header-row {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px;
        }
        .br-title {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--br-text);
        }
        .br-period {
          display: flex; align-items: baseline; gap: 6px; background: transparent; border: 0;
          cursor: pointer; font-family: var(--font-google-sans); font-size: 13px; font-weight: 600;
          letter-spacing: 0.06em; color: var(--br-text);
        }
        .br-period:focus-visible { outline: 2px solid var(--br-text-2); outline-offset: 3px; }
        .br-period-year { font-size: 10px; font-weight: 400; color: var(--br-text-2); }

        .br-plot {
          display: flex; align-items: flex-end; gap: 12px; height: 220px;
        }
        .br-col {
          flex: 1 1 0; min-width: 0; display: flex; flex-direction: column;
          align-items: center; height: 100%;
        }
        .br-tag {
          font-family: var(--font-google-sans); font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--br-green); margin-bottom: 6px; white-space: nowrap;
        }
        .br-track {
          flex: 1; width: 100%; max-width: 30px; display: flex; align-items: flex-end;
        }
        .br-bar {
          width: 100%; border-radius: 3px 3px 0 0; background: var(--br-green); opacity: 0.28;
          transition: height 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease;
        }
        .br-bar--leader { opacity: 1; }
        .br-icon {
          width: 18px; height: 18px; object-fit: contain; margin-top: 12px; flex: none;
          filter: invert(1) brightness(1.7);
        }

        @media (prefers-reduced-motion: reduce) {
          .br-bar { transition: opacity 0.4s ease; }
        }

        @media (max-width: 760px) {
          .br-section { padding-top: 84px; padding-bottom: 84px; }
          .br-headline { font-size: 26px; }
          .br-card { padding: 22px 16px 20px; }
          .br-plot { height: 180px; gap: 6px; }
        }
      `}</style>
    </section>
  );
}
