/**
 * Reply to a particular message, and see what Starchild left on it.
 *
 * Reacting is not a control here — nobody picks a reaction for their own
 * message, and reacting to Starchild's own words would just be a note to
 * self. So the only reaction that ever shows is one Starchild already left,
 * seeded by whoever is narrating the conversation, on the message it is
 * about. What stays interactive is reply: pointing at a line you mean is
 * still yours to do, on either side of the conversation.
 *
 * The reply control stays out of the way until the message is hovered,
 * because a chat with a toolbar on every turn is not a chat.
 */
export function Reactable({
  align = "left",
  onReply,
  /** what Starchild left on this message, if anything — not everything gets one */
  reaction,
  children,
}: {
  align?: "left" | "right";
  onReply?: () => void;
  reaction?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rx-wrap rx-wrap--${align}`}>
      <div className="rx-row">
        <div className="rx-body">{children}</div>

        {/* Hidden until hover, and on the outside of the bubble so it never covers
            a word. */}
        {onReply && (
          <div className="rx-actions">
            <button type="button" onClick={onReply} className="rx-action" aria-label="Reply to this">
              <ReplyIcon />
            </button>
          </div>
        )}
      </div>

      {/* What Starchild left, under the message it belongs to. Not a button —
          it is not yours to take back. */}
      {reaction && (
        <div className="rx-reactions">
          <span className="rx-chip" aria-label={`Starchild reacted ${reaction}`}>
            {reaction}
          </span>
        </div>
      )}

      <style>{`
        .rx-wrap { display: flex; flex-direction: column; gap: 6px; }
        .rx-wrap--right { align-items: flex-end; }
        .rx-wrap--left { align-items: flex-start; }

        .rx-row { display: flex; align-items: center; gap: 6px; max-width: 100%; }
        .rx-wrap--right .rx-row { flex-direction: row-reverse; }
        .rx-body { min-width: 0; }

        .rx-actions {
          flex: none;
          display: flex; align-items: center;
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

        .rx-reactions { display: flex; flex-wrap: wrap; gap: 4px; }
        .rx-chip {
          display: inline-flex; align-items: center; justify-content: center;
          height: 24px; min-width: 30px; padding: 0 8px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06);
          font-size: 13px; line-height: 1;
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
