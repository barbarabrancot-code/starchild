/**
 * `?still=1` — the page with its clock stopped, for importing into a design tool.
 *
 * A DOM importer reads the document as it stands. Version E has four things that
 * do not survive that reading, and this flag is what turns each of them off:
 *
 *   · Sections that arrive on scroll start at opacity 0. Imported, they are
 *     invisible layers — the commonest way a capture comes back looking empty.
 *   · The orb belongs to no section: it is one fixed element chasing whichever
 *     anchor is active. Captured, it lands once, wherever it happened to be, and
 *     both anchors come through as empty boxes. In still mode each anchor draws
 *     its own orb instead.
 *   · The connector orbit is mid-rotation at any given moment, so the six chips
 *     import at whatever angles the clock had reached.
 *   · The page-wide cursor dot is a fixed element with nothing to do with the
 *     design, and it imports as a stray circle.
 *
 * `?tab=` picks which Showcase tab is showing, because only the open one is in
 * the DOM — import three times to get all three.
 *
 * Nothing about this changes the page anyone visits. It is a capture mode, not a
 * second design.
 */

function param(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

/** the whole flag, read once */
export const STILL = param("still") === "1";

/** which Showcase tab to open with — ignored unless it names one */
export const STILL_TAB = param("tab");

/**
 * Spread onto a motion element that arrives on scroll. In still mode it collapses
 * to nothing, so the element renders in its final state and imports as a layer
 * that is actually there.
 */
export function reveal(props: Record<string, unknown>) {
  return STILL ? {} : props;
}
