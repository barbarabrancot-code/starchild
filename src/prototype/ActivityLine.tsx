/**
 * What Starchild is doing right now, in one grey line — a plain orange dot
 * with a soft, steady halo, no animation. Thinking, reading, checking,
 * routing, taking action: whatever the current step actually is, this is
 * the one shape it gets. It only ever appears for the latest active step and
 * disappears the moment the result is ready — no completed activity stays in
 * the chat history, so there is never more than one of these on screen, and
 * it is always the last thing in the thread.
 */
export function ActivityLine({ label }: { label: string }) {
  return (
    <div className="al-row" role="status" aria-live="polite">
      <span className="al-orb" aria-hidden="true">
        <span className="al-halo" />
        <span className="al-core" />
      </span>
      {/* keyed on the label so a change crossfades rather than swapping mid-word */}
      <span key={label} className="al-label">
        {label}
      </span>

      <style>{`
        .al-row {
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-google-sans);
        }

        /* Sized to the line it sits on, not to the orb it descends from: any bigger
           and the wait starts announcing itself. */
        .al-orb {
          position: relative; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px;
        }
        .al-halo {
          position: absolute; width: 34px; height: 34px; border-radius: 999px;
          pointer-events: none; opacity: .7;
          background: radial-gradient(circle, rgba(248,70,0,.34) 0%, rgba(248,70,0,0) 68%);
        }
        .al-core {
          display: block; width: 9px; height: 9px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.6);
        }

        /* Grey, and the same size as body copy. It is a status, and a status that
           competes with the answer underneath it has misunderstood its job. */
        .al-label {
          font-size: 14.5px; line-height: 1.5; color: rgba(255,255,255,.42);
          animation: al-in .45s cubic-bezier(.16,1,.3,1);
        }
        @keyframes al-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .al-label { animation: none; }
        }
      `}</style>
    </div>
  );
}
