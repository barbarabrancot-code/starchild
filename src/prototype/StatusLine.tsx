/**
 * A small orange dot and one line of text — the whole of how the main chat
 * says "something is active, watching, or changed" now. Not a card: the
 * bubble above it already said what happened, so this only has to carry the
 * state, the way a colleague's presence dot does next to their name.
 *
 * Purely informative, on purpose — never a button. The rule this follows:
 * status lines are for awareness, option modals are for decisions. A status
 * line that opened a menu on click was answering "does this need a
 * decision?" with "maybe, click to find out", which is the one thing this
 * shape exists to never make someone wonder about. When there's actually
 * something to decide, the modal is already on screen — see OptionModal.
 */
export function StatusLine({ label }: { label: string }) {
  return (
    <div className="stl">
      <span className="stl-dot" />
      {label}
      <style>{`
        .stl {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.5);
        }
        .stl-dot {
          flex: none; width: 7px; height: 7px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 6px rgba(248,70,0,.6);
        }
      `}</style>
    </div>
  );
}
