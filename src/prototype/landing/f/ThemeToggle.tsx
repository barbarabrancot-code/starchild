import type { LandingTheme } from "./theme";

/**
 * The switch, pinned to the corner.
 *
 * Bottom left, because the variant switch already owns the bottom right and two
 * floating controls in one corner is a toolbar nobody asked for.
 *
 * It draws the mode you would get, not the one you are in. A sun on a dark page
 * means "go light" — a moon there would be reporting a state you can already see
 * by looking at the page, which is the version people click twice to understand.
 */
export function ThemeToggle({ theme, onToggle }: { theme: LandingTheme; onToggle: () => void }) {
  const toLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="lf-toggle"
      aria-label={toLight ? "Switch to light mode" : "Switch to dark mode"}
      title={toLight ? "Light mode" : "Dark mode"}
    >
      {toLight ? (
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3.9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.9 4.1l-1.5 1.5M5.6 14.4l-1.5 1.5M15.9 15.9l-1.5-1.5M5.6 5.6L4.1 4.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
          <path
            d="M17 12.2A7.6 7.6 0 017.8 3a7.6 7.6 0 109.2 9.2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{toLight ? "Light" : "Dark"}</span>
    </button>
  );
}
