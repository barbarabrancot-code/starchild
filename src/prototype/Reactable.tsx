import { useState } from "react";
import { SmileIcon, EllipsisIcon, DuplicateIcon } from "./icons";

const QUICK_REACTIONS = ["👍", "👎", "❤️", "😂", "🎉", "😮"];

/**
 * Reply to a particular message, react to it, or copy it — and see what
 * Starchild left on a message of yours.
 *
 * The one asymmetry that survives: reacting to your own message is still not
 * offered (there is nothing to say about your own words that isn't already
 * said by having sent them), so the emoji trigger only shows on Starchild's
 * side. Reply and copy work on either side — pointing at a line, or lifting
 * it out verbatim, are both things you'd want to do regardless of who said it.
 *
 * Every control here stays out of the way until the message is hovered,
 * because a chat with a toolbar on every turn is not a chat.
 */
export function Reactable({
  align = "left",
  onReply,
  /** what Starchild left on this message, if anything — not everything gets one */
  reaction,
  /** the raw text, for Copy — omit it and the "more" menu doesn't appear */
  text,
  children,
}: {
  align?: "left" | "right";
  onReply?: () => void;
  reaction?: string;
  text?: string;
  children: React.ReactNode;
}) {
  const [myReaction, setMyReaction] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const canReact = align === "left";
  const shownReaction = reaction ?? myReaction ?? undefined;

  const pick = (emoji: string) => {
    setMyReaction((cur) => (cur === emoji ? null : emoji));
    setPickerOpen(false);
  };

  const copy = () => {
    if (!text) return;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setMenuOpen(false);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={`rx-wrap rx-wrap--${align}`}>
      <div className="rx-row">
        <div className="rx-body">{children}</div>

        {/* Hidden until hover, and on the outside of the bubble so it never covers
            a word. */}
        <div className="rx-actions">
          {canReact && (
            <div className="rx-pop-anchor">
              <button
                type="button"
                onClick={() => { setPickerOpen((v) => !v); setMenuOpen(false); }}
                className={`rx-action${pickerOpen ? " rx-action--on" : ""}`}
                aria-label="React"
                aria-expanded={pickerOpen}
              >
                <SmileIcon className="size-4" />
              </button>
              {pickerOpen && (
                <div className={`rx-picker rx-picker--${align}`} role="menu">
                  {QUICK_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`rx-picker-emoji${myReaction === emoji ? " rx-picker-emoji--on" : ""}`}
                      onClick={() => pick(emoji)}
                      aria-label={`React ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {onReply && (
            <button type="button" onClick={onReply} className="rx-action" aria-label="Reply to this">
              <ReplyIcon />
            </button>
          )}

          {text && (
            <div className="rx-pop-anchor">
              <button
                type="button"
                onClick={() => { setMenuOpen((v) => !v); setPickerOpen(false); }}
                className={`rx-action${menuOpen ? " rx-action--on" : ""}`}
                aria-label="More"
                aria-expanded={menuOpen}
              >
                <EllipsisIcon className="size-4" />
              </button>
              {menuOpen && (
                <div className={`rx-menu rx-menu--${align}`} role="menu">
                  <button type="button" className="rx-menu-item" onClick={copy} role="menuitem">
                    <DuplicateIcon className="size-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Under the message it belongs to — Starchild's own note on yours, or
          the one you just left on Starchild's. Never both at once: the two
          only ever apply to opposite sides. */}
      {shownReaction && (
        <div className="rx-reactions">
          <button
            type="button"
            className="rx-chip"
            aria-label={reaction ? `Starchild reacted ${shownReaction}` : `You reacted ${shownReaction}`}
            // Only your own reaction is yours to take back; Starchild's stays,
            // the same as it always did.
            onClick={reaction ? undefined : () => setMyReaction(null)}
            style={reaction ? { cursor: "default" } : undefined}
          >
            {shownReaction}
          </button>
        </div>
      )}

      <style>{`
        .rx-wrap { display: flex; flex-direction: column; }
        .rx-wrap--right { align-items: flex-end; }
        .rx-wrap--left { align-items: flex-start; }

        .rx-row { display: flex; align-items: center; gap: 6px; max-width: 100%; }
        .rx-wrap--right .rx-row { flex-direction: row-reverse; }
        .rx-body { min-width: 0; }

        .rx-actions {
          flex: none;
          display: flex; align-items: center; gap: 2px;
          opacity: 0; transition: opacity .18s ease;
        }
        .rx-row:hover .rx-actions,
        .rx-actions:focus-within { opacity: 1; }

        .rx-pop-anchor { position: relative; display: flex; }

        .rx-action {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; color: rgba(255,255,255,.35);
          transition: color .15s ease, background-color .15s ease;
        }
        .rx-action:hover, .rx-action--on { color: rgba(255,255,255,.85); background: rgba(255,255,255,.07); }
        .rx-action:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }

        .rx-picker, .rx-menu {
          position: absolute; bottom: calc(100% + 6px); z-index: 20;
          display: flex; padding: 6px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1); background: #1a1a1c;
          box-shadow: 0 8px 24px rgba(0,0,0,.35);
        }
        .rx-picker--left, .rx-menu--left { left: 0; }
        .rx-picker--right, .rx-menu--right { right: 0; }

        .rx-picker { gap: 2px; align-items: center; }
        .rx-picker-emoji {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; font-size: 16px; line-height: 1;
          transition: background-color .15s ease, transform .1s ease;
        }
        .rx-picker-emoji:hover { background: rgba(255,255,255,.09); transform: scale(1.1); }
        .rx-picker-emoji--on { background: rgba(248,70,0,.16); }

        .rx-menu { flex-direction: column; padding: 5px; border-radius: 12px; min-width: 120px; }
        .rx-menu-item {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 10px; border-radius: 8px; border: 0; cursor: pointer;
          background: none; font-family: inherit; font-size: 13px; text-align: left;
          color: rgba(255,255,255,.75);
        }
        .rx-menu-item:hover { background: rgba(255,255,255,.07); color: #fff; }

        /* Glued to the bubble it's about, not floating below it: pulled up so it
           sits half on the corner, the way a reaction badge does everywhere else
           this shape exists. Negative margin rather than absolute positioning —
           it still pushes anything after it (a timestamp, say) down properly,
           it just overlaps the thing before it instead of stacking under it. */
        .rx-reactions {
          display: flex; flex-wrap: wrap; gap: 4px;
          margin-top: -11px; padding: 0 10px; position: relative; z-index: 2;
        }
        .rx-wrap--right .rx-reactions { justify-content: flex-end; }
        .rx-chip {
          display: inline-flex; align-items: center; justify-content: center;
          height: 22px; min-width: 28px; padding: 0 7px; border: 1px solid rgba(255,255,255,.14);
          border-radius: 999px; background: #202022;
          box-shadow: 0 2px 6px rgba(0,0,0,.35);
          font-size: 12.5px; line-height: 1;
        }

        /* No hover to reveal it on, so the control stays put rather than never
           appearing. */
        @media (hover: none) {
          .rx-actions { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ReplyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M6.4 3.2 2.2 7.4l4.2 4.2" />
      <path d="M2.2 7.4h6.2a5.4 5.4 0 0 1 5.4 5.4v.2" />
    </svg>
  );
}
