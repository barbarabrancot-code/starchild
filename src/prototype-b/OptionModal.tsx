import { useState } from "react";
import { motion } from "motion/react";
import { CheckIcon } from "./icons";

/**
 * The one shape every "the person needs to choose something" moment in the
 * main chat uses now — lettered options, each with a one-line description,
 * and a free-text way out for whatever isn't on the list. First built for
 * "which connector should I add?" (see ConnectorChoice, which now just calls
 * this with its own five options); reused for task and agent actions so
 * there is one modal to learn, not a different button row per situation.
 *
 * A pick is not a click into the void: the moment one lands (live, or already
 * decided when `picked` arrives from history) the full list collapses down to
 * the one row that was chosen, with a checkmark — the same shape either way,
 * so a decision read back out of a saved conversation looks exactly like one
 * that just happened.
 */
export function OptionModal({
  title,
  subtitle,
  options,
  onPick,
  onCustom,
  onClose,
  placeholder = "Type your own answer",
  picked,
}: {
  title: string;
  subtitle?: string;
  /** `icon`, when given, replaces the letter with a real mark (a connector's
   *  logo, say) — the letter stays as a fallback for whatever doesn't have one */
  options: { letter: string; label: string; desc?: string; icon?: React.ReactNode }[];
  onPick: (letter: string) => void;
  /** free-text answer, if the list doesn't have what they meant */
  onCustom?: (text: string) => void;
  onClose: () => void;
  placeholder?: string;
  /** already decided, read back out of history — renders collapsed from the
   *  start instead of waiting for a click that already happened */
  picked?: string;
}) {
  const [custom, setCustom] = useState("");
  const [localPicked, setLocalPicked] = useState<string | null>(null);
  const chosen = picked ?? localPicked;

  const pick = (letter: string) => {
    setLocalPicked(letter);
    onPick(letter);
  };

  const chosenOption = chosen ? options.find((o) => o.letter === chosen) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="om"
    >
      <div className="om-head">
        <div>
          <p className="om-title">{title}</p>
          {subtitle && !chosenOption && <p className="om-sub">{subtitle}</p>}
        </div>
        {!chosenOption && (
          <button type="button" className="om-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}
      </div>

      <div className="om-list">
        {chosenOption ? (
          <div className="om-row om-row--picked">
            <span className={`om-letter${chosenOption.icon ? " om-letter--icon" : ""}`}>
              {chosenOption.icon ?? chosenOption.letter}
            </span>
            <span className="om-body">
              <span className="om-label">{chosenOption.label}</span>
            </span>
            <CheckIcon className="om-check size-4" />
          </div>
        ) : (
          options.map((o) => (
            <button key={o.letter} type="button" className="om-row" onClick={() => pick(o.letter)}>
              <span className={`om-letter${o.icon ? " om-letter--icon" : ""}`}>{o.icon ?? o.letter}</span>
              <span className="om-body">
                <span className="om-label">{o.label}</span>
                {o.desc && <span className="om-desc">{o.desc}</span>}
              </span>
            </button>
          ))
        )}
      </div>

      {onCustom && !chosenOption && (
        <input
          className="om-own"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && custom.trim()) {
              onCustom(custom.trim());
              setCustom("");
            }
          }}
          placeholder={placeholder}
          aria-label={placeholder}
        />
      )}

      <style>{`
        .om {
          display: flex; flex-direction: column; gap: 14px;
          width: 480px; box-sizing: border-box; padding: 18px 18px 16px; border-radius: 18px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          font-family: var(--font-google-sans); color: #fff;
        }
        .om-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .om-title { margin: 0; font-size: 15px; font-weight: 600; }
        .om-sub { margin: 4px 0 0; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.45); }
        .om-x {
          flex: none; border: 0; background: none; cursor: pointer; padding: 2px 4px;
          font-size: 13px; color: rgba(255,255,255,.35);
        }
        .om-x:hover { color: #fff; }

        .om-list { display: flex; flex-direction: column; border-top: 1px solid rgba(255,255,255,.08); }
        .om-row {
          display: flex; align-items: center; gap: 12px; padding: 12px 2px;
          border: 0; border-bottom: 1px solid rgba(255,255,255,.08); background: none;
          cursor: pointer; text-align: left; font-family: inherit;
        }
        .om-row:last-child { border-bottom: 0; }
        .om-row:hover .om-label { color: var(--color-primary); }
        /* The decided row: not a button any more, and the checkmark takes the
           spot a hover-tinted label used to earn — there is nothing left here
           to choose. */
        .om-row--picked { cursor: default; }
        .om-row--picked .om-label { color: #fff; }
        .om-check { flex: none; margin-left: auto; color: #3ecf5f; }
        .om-letter {
          flex: none; display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 8px;
          background: rgba(255,255,255,.06); font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,.5);
        }
        /* A real logo needs no tinted background of its own — the mark already
           carries its own colour and shape. */
        .om-letter--icon { background: none; }
        .om-body { display: flex; flex-direction: column; gap: 2px; }
        .om-label { font-size: 14.5px; color: #fff; transition: color .15s ease; }
        .om-desc { font-size: 12.5px; color: rgba(255,255,255,.4); }

        .om-own {
          width: 100%; padding: 11px 15px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
          font-family: inherit; font-size: 13.5px; color: #fff;
        }
        .om-own::placeholder { color: rgba(255,255,255,.3); }
        .om-own:focus { outline: none; border-color: rgba(255,255,255,.28); }
      `}</style>
    </motion.div>
  );
}
