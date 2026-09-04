/** "a" → 0, "b" → 1 … the switch shows a position on the line, not a component name */
const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** one cell, and the distance the knob travels per step */
const CELL = 32;

// The switch between landing versions. Deliberately a small floating control
// rather than part of the page — it is a review tool, not product chrome, so it
// should never read as something a visitor is meant to use.
//
// It is told how many positions there are rather than knowing the versions, so
// the two pages can run lines of different lengths off one control. Adding a
// version is one entry in that page's line and nothing here.
export function VariantToggle({
  at,
  count,
  onChange,
}: {
  /** which position is showing */
  at: number;
  /** how many positions the line has */
  count: number;
  onChange: (next: number) => void;
}) {
  const letter = (i: number) => LETTERS[i].toUpperCase();

  return (
    <div className="vt-wrap">
      <span className="vt-caption">Landing</span>
      <div
        className="vt-track"
        role="radiogroup"
        aria-label={`Landing version ${letter(at)}`}
        // The track is a whole number of cells, or the last stop overhangs it.
        style={{ width: count * CELL, gridTemplateColumns: `repeat(${count}, 1fr)` }}
      >
        {/* the knob carries the active letter, so the state is readable without color alone */}
        <span
          className="vt-knob"
          aria-hidden="true"
          style={{ transform: `translateX(${at * CELL}px)` }}
        >
          {letter(at)}
        </span>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i === at}
            aria-label={`Landing version ${letter(i)}`}
            onClick={() => onChange(i)}
            className={`vt-side${i === at ? " vt-side--on" : ""}`}
          >
            {letter(i)}
          </button>
        ))}
      </div>

      <style>{`
        .vt-wrap {
          position: fixed; right: 20px; bottom: 20px; z-index: 60;
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px 8px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(10,10,10,.82);
          backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,.5);
        }
        .vt-caption {
          font-family: var(--font-google-sans); font-size: 11px; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }

        /* width and columns come from the line's length — see the style above */
        .vt-track {
          position: relative; display: grid; align-items: center;
          height: 30px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.05);
        }
        .vt-side {
          position: relative; z-index: 1;
          padding: 0; border: 0; background: none; cursor: pointer;
          height: 28px; border-radius: 999px;
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; line-height: 1;
          text-align: center; color: rgba(255,255,255,.35);
        }
        .vt-side--on { color: transparent; }
        .vt-side:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 3px; }

        .vt-knob {
          position: absolute; top: 2px; left: 2px; width: 30px; height: 24px;
          display: flex; align-items: center; justify-content: center; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; line-height: 1;
          box-shadow: 0 2px 10px rgba(248,70,0,.45);
          transition: transform .28s cubic-bezier(.16,1,.3,1);
        }

        @media (prefers-reduced-motion: reduce) { .vt-knob { transition: none; } }
        @media (max-width: 640px) {
          .vt-wrap { right: 12px; bottom: 12px; padding: 6px 8px 6px 12px; }
          .vt-caption { display: none; }
        }
      `}</style>
    </div>
  );
}
