import { useRef, useState } from "react";
import { SmileIcon, EllipsisIcon, DuplicateIcon } from "./icons";

const QUICK_REACTIONS = ["👍", "👎", "❤️", "😂", "🎉", "😮"];

/** touch-only gesture tuning — a phone gets WhatsApp's own three moves
 *  instead of the hover row a cursor gets: hold to copy, tap to react,
 *  drag right to reply. */
const LONG_PRESS_MS = 480;
const MOVE_DEADZONE = 8;
const SWIPE_REPLY_THRESHOLD = 56;
const SWIPE_REPLY_MAX = 84;

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

  /*
   * A cursor gets the hover row; a finger gets the three gestures WhatsApp
   * already taught everyone. All three read the same touch, so they live
   * together rather than as separate handlers guessing at each other's state:
   *
   *   hold still  → long press fires, opens the copy menu
   *   lift early  → a tap: opens the reaction picker (Starchild's side only)
   *   drag right  → the bubble follows the finger; past the threshold, releasing
   *                 replies, the same as the hover row's own reply arrow
   *
   * Whichever one wins, it wins outright — a hold that turns into a drag stops
   * being a hold, and a drag that does not clear the threshold does nothing.
   */
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const movedPastDeadzone = useRef(false);
  const longPressFired = useRef(false);
  const longPressTimer = useRef<number | null>(null);

  const clearLongPress = () => {
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!text && !onReply && !canReact) return;
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    dragging.current = false;
    movedPastDeadzone.current = false;
    longPressFired.current = false;
    clearLongPress();
    if (text) {
      longPressTimer.current = window.setTimeout(() => {
        longPressFired.current = true;
        setMenuOpen(true);
        setPickerOpen(false);
      }, LONG_PRESS_MS);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (!movedPastDeadzone.current && Math.hypot(dx, dy) > MOVE_DEADZONE) {
      movedPastDeadzone.current = true;
      clearLongPress();
    }
    if (!movedPastDeadzone.current) return;
    if (onReply && dx > 0 && dx > Math.abs(dy)) {
      dragging.current = true;
      setDragX(Math.min(dx, SWIPE_REPLY_MAX));
    }
  };

  const onTouchEnd = () => {
    clearLongPress();
    if (dragging.current) {
      if (dragX >= SWIPE_REPLY_THRESHOLD) onReply?.();
      dragging.current = false;
      setDragX(0);
    } else if (!longPressFired.current && !movedPastDeadzone.current && canReact) {
      setPickerOpen((v) => !v);
      setMenuOpen(false);
    }
    touchStart.current = null;
  };

  return (
    <div className={`rx-wrap rx-wrap--${align}`}>
      <div
        className="rx-row"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {onReply && (
          <span className="rx-swipe-hint" style={{ opacity: Math.min(dragX / SWIPE_REPLY_THRESHOLD, 1) }}>
            <ReplyIcon />
          </span>
        )}
        <div className="rx-body-wrap">
          <div
            className="rx-body"
            style={{
              transform: dragX ? `translateX(${dragX}px)` : undefined,
              transition: dragging.current ? "none" : "transform .25s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {children}
          </div>
        </div>

        {/* Hidden until hover, and on the outside of the bubble so it never covers
            a word. On a touch device these buttons step aside entirely for the
            hold/tap/drag gestures above — see the @media (hover: none) block. */}
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

      {/* Touch-only: ordinary document flow instead of position: absolute, so
          it can only ever be as wide as the space already proven to fit
          everything else here (the bubble, the reaction chip below). A
          popup anchored to the now-gesture-only, invisible button kept
          finding new ways to run past a real phone's own edge — centered,
          then right-aligned to the row — even though the same math checked
          out on paper each time; a normal flow child can't do that, because
          it never leaves the column that already keeps everything else on
          screen. Hidden by default, shown only where the gestures that open
          it apply — see the @media (hover: none) block below. */}
      {(pickerOpen || menuOpen) && (
        <div className="rx-touch-panel">
          {pickerOpen && canReact && (
            <div className="rx-touch-emojis" role="menu">
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
          {menuOpen && text && (
            <div className="rx-touch-menu" role="menu">
              <button type="button" className="rx-menu-item" onClick={copy} role="menuitem">
                <DuplicateIcon className="size-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>
      )}

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

        .rx-row { position: relative; display: flex; align-items: center; gap: 6px; max-width: 100%; }
        .rx-wrap--right .rx-row { flex-direction: row-reverse; }
        .rx-body-wrap { position: relative; min-width: 0; }
        .rx-body { min-width: 0; }
        /* Sits in the gap a rightward drag opens up behind the bubble — always
           in the DOM so it can fade in with the drag rather than appear
           abruptly at the threshold. Anchored to the row itself (which never
           renders outside whatever margin the page around it already gives
           it) rather than hung off the bubble's own edge, so it can only ever
           appear inside that margin, never past it. */
        .rx-swipe-hint {
          position: absolute; left: 4px; top: 50%; transform: translateY(-50%); z-index: -1;
          display: flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; color: rgba(255,255,255,.4);
          pointer-events: none;
        }

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

        /* No cursor to hover with, so the row's own reveal never fires and the
           trigger buttons have nothing to do — hidden in favor of the three
           gestures above. The popups that anchor to them (position: absolute,
           keyed off a button that no longer exists visually) step aside too,
           for .rx-touch-panel below: a normal flow element in the same column
           as everything else here, which is what actually keeps it on
           screen on a real phone — anchoring math that checks out on paper
           kept finding new ways not to, in a way a flow element structurally
           cannot. */
        @media (hover: none) {
          .rx-actions { opacity: 1; }
          .rx-action { display: none; }
          .rx-picker, .rx-menu { display: none; }
        }
        .rx-touch-panel { display: none; }
        @media (hover: none) {
          .rx-touch-panel {
            display: flex; margin-top: 8px; max-width: 100%;
          }
        }
        .rx-touch-emojis {
          display: flex; gap: 2px; align-items: center; padding: 6px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.1); background: #1a1a1c;
        }
        .rx-touch-menu {
          display: flex; flex-direction: column; padding: 5px; border-radius: 12px;
          min-width: 120px; border: 1px solid rgba(255,255,255,.1); background: #1a1a1c;
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
