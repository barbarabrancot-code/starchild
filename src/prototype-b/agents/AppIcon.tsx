import type { AppKind } from "./agentsData";

/**
 * Category glyphs for the apps an agent is connected to. Same drawing rules as
 * ../icons — 16px box, 1.4 stroke, currentColor, no fills — and the same honesty:
 * no real marks exist for these, so the glyph says the category and the name
 * beside it says the brand. A hand-drawn approximation of someone's logo would
 * only ever look wrong.
 *
 * Mirrors the set in ../landing/c/AgentWindow. Merge the two once the landing
 * settles; kept apart here so this draft doesn't drag a landing refactor with it.
 */
const GLYPH: Record<AppKind, JSX.Element> = {
  mail: (
    <>
      <rect x="1.8" y="3.4" width="12.4" height="9.2" rx="1.6" />
      <path d="m2.4 4.6 5.6 4 5.6-4" />
    </>
  ),
  slack: <path d="M6.2 2.4v7.4M9.8 6.2v7.4M2.4 9.8h7.4M6.2 6.2h7.4" />,
  calendar: (
    <>
      <rect x="2.2" y="3.2" width="11.6" height="10.6" rx="1.6" />
      <path d="M2.2 6.5h11.6M5.4 1.8v2.6M10.6 1.8v2.6" />
    </>
  ),
  notion: (
    <>
      <rect x="2.6" y="2.2" width="10.8" height="11.6" rx="1.6" />
      <path d="M5.4 5.2v5.6l5.2-5.6v5.6" />
    </>
  ),
  telegram: <path d="M14.2 2.6 1.9 7.4l3.4 1.2 1.2 3.6 1.9-2.3 3.2 2.4z" />,
  drive: <path d="M6.2 2.2h3.6L14 9.2l-1.8 3.1H3.8L2 9.2z" />,
  web: (
    <>
      <circle cx="8" cy="8" r="5.9" />
      <path d="M2.1 8h11.8M8 2.1c1.6 1.7 2.4 3.7 2.4 5.9S9.6 12.2 8 13.9C6.4 12.2 5.6 10.2 5.6 8s.8-4.2 2.4-5.9" />
    </>
  ),
  flights: <path d="M2.2 9.4 14 5.2l-.9 2.5-7 4.6-1.3-.5 2-2.6-2.4.6z" />,
};

export function AppIcon({ kind, className = "" }: { kind: AppKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {GLYPH[kind]}
    </svg>
  );
}
