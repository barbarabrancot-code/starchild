import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * The two things every messenger has and a chat UI usually doesn't: you can react
 * to a message, and you can reply to a particular one.
 *
 * Both are here for the same reason. A conversation with an assistant is still a
 * conversation, and the small acts that make one feel like a conversation — a
 * thumbs up rather than a sentence, pointing at the line you mean — are missing
 * from almost every AI product. They cost a tap and they say something no prompt
 * would.
 *
 * The controls stay out of the way until the message is hovered, because a chat
 * with a toolbar on every turn is not a chat.
 */

/** Small enough to read at a glance, wide enough to cover what people mean. */
const EMOJI = ["👍", "❤️", "😄", "🎉", "👀"];

/** the one a double-click leaves, the way every messenger does it */
const QUICK = "❤️";

export function Reactable({
  align = "left",
  onReply,
  children,
}: {
  align?: "left" | "right";
  onReply?: () => void;
  children: React.ReactNode;
}) {
  const [reactions, setReactions] = useState<string[]>([]);
  const [picking, setPicking] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!picking) return;
    const onDown = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setPicking(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPicking(false);
    };
    // the click that opened it must not close it on the same tick
    const t = setTimeout(() => document.addEventListener("mousedown", onDown), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [picking]);

  /** a second tap on one you already left takes it back, as everywhere else */
  const toggle = (emoji: string) => {
    setReactions((prev) => (prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]));
    setPicking(false);
  };

  return (
    <div className={`rx-wrap rx-wrap--${align}`}>
      <div className="rx-row">
        <div className="rx-body" onDoubleClick={() => toggle(QUICK)}>
          {children}
        </div>

        {/* Hidden until hover, and on the outside of the bubble so it never covers
            a word. On touch, where there is no hover, the double-tap still works. */}
        <div className="rx-actions">
          <button
            type="button"
            onClick={() => setPicking((v) => !v)}
            className="rx-action"
            aria-label="Add a reaction"
            aria-expanded={picking}
          >
            <SmileIcon />
          </button>
          {onReply && (
            <button type="button" onClick={onReply} className="rx-action" aria-label="Reply to this">
              <ReplyIcon />
            </button>
          )}

          <AnimatePresence>
            {picking && (
              <motion.div
                ref={pickerRef}
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12 } }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="rx-picker"
                role="menu"
              >
                {EMOJI.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    role="menuitem"
                    onClick={() => toggle(emoji)}
                    className={`rx-pick${reactions.includes(emoji) ? " rx-pick--on" : ""}`}
                    aria-label={`React ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* what has been left, under the message it belongs to */}
      <div className="rx-reactions">
        <AnimatePresence initial={false}>
          {reactions.map((emoji) => (
            <motion.button
              key={emoji}
              type="button"
              onClick={() => toggle(emoji)}
              // A small overshoot, which is the one place in this product it is
              // right: a reaction is a reflex, and reflexes land with a bounce.
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.14 } }}
              transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
              className="rx-chip"
              aria-label={`Remove ${emoji} reaction`}
            >
              {emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .rx-wrap { display: flex; flex-direction: column; gap: 6px; }
        .rx-wrap--right { align-items: flex-end; }
        .rx-wrap--left { align-items: flex-start; }

        .rx-row { display: flex; align-items: center; gap: 6px; max-width: 100%; }
        .rx-wrap--right .rx-row { flex-direction: row-reverse; }
        .rx-body { min-width: 0; }

        .rx-actions {
          position: relative; flex: none;
          display: flex; align-items: center; gap: 2px;
          opacity: 0; transition: opacity .18s ease;
        }
        .rx-row:hover .rx-actions,
        .rx-actions:focus-within { opacity: 1; }

        .rx-action {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; color: rgba(255,255,255,.35);
          transition: color .15s ease, background-color .15s ease;
        }
        .rx-action:hover { color: rgba(255,255,255,.85); background: rgba(255,255,255,.07); }
        .rx-action:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }

        .rx-picker {
          position: absolute; bottom: calc(100% + 8px); left: 50%; z-index: 30;
          transform-origin: bottom center;
          display: flex; gap: 2px; padding: 5px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(24,24,26,.94); backdrop-filter: blur(12px);
          box-shadow: 0 12px 30px rgba(0,0,0,.55);
        }
        .rx-pick {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; font-size: 16px; line-height: 1;
          transition: background-color .15s ease, transform .15s ease;
        }
        .rx-pick:hover { background: rgba(255,255,255,.1); transform: scale(1.12); }
        .rx-pick--on { background: rgba(248,70,0,.2); }
        .rx-pick:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        .rx-reactions { display: flex; flex-wrap: wrap; gap: 4px; }
        .rx-reactions:empty { display: none; }
        .rx-chip {
          display: inline-flex; align-items: center; justify-content: center;
          height: 24px; min-width: 30px; padding: 0 8px;
          border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06);
          font-size: 13px; line-height: 1;
          transition: background-color .15s ease, border-color .15s ease;
        }
        .rx-chip:hover { background: rgba(255,255,255,.11); border-color: rgba(255,255,255,.22); }
        .rx-chip:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }

        @media (prefers-reduced-motion: reduce) {
          .rx-pick:hover { transform: none; }
        }

        /* No hover to reveal them on, so the controls stay put rather than never
           appearing. The double-tap shortcut works either way. */
        @media (hover: none) {
          .rx-actions { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function SmileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="8" cy="8" r="6.1" />
      <path d="M5.6 9.4a3 3 0 0 0 4.8 0" />
      <path d="M6 6.2h.01M10 6.2h.01" strokeWidth={1.8} />
    </svg>
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
