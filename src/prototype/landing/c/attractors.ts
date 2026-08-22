/**
 * Where the hero's dot can be caught.
 *
 * The provider symbols pull the dot toward them, not the other way round: they
 * are fixed points the dot passes near and gets briefly caught by, the way a
 * cursor catches on a button. That means the two pieces have to talk — the
 * symbols know where they are, the dot decides where to go — and they sit in
 * different components with different coordinate systems and their own frame
 * loops.
 *
 * So the symbols publish, once a frame, in viewport coordinates. Viewport,
 * because it is the one space both sides can convert to and from without
 * knowing anything about each other's layout. A module-level array rather than
 * React state, because this changes sixty times a second and no one needs to
 * re-render when it does.
 */

export type Attractor = {
  /** viewport coordinates of the centre */
  x: number;
  y: number;
};

let field: Attractor[] = [];

/** Called by whatever owns the attractors, once per frame. Replaces the set. */
export function publishAttractors(next: Attractor[]) {
  field = next;
}

/** Called when the owner unmounts or scrolls away, so nothing keeps pulling. */
export function clearAttractors() {
  field = [];
}

/**
 * Bend a target toward the nearest attractor within `reach`.
 *
 * The pull is strongest in the middle of the range and eases to nothing at both
 * ends — nothing at the edge so the dot never jumps as it crosses in, and
 * nothing at the centre because by then there is no gap left to close. Only the
 * nearest one counts: summing several would drag the dot to a weighted average
 * of two symbols, which is a place with nothing in it.
 */
export function attract(
  x: number,
  y: number,
  reach: number,
  strength: number,
): { x: number; y: number; hold: number } {
  let bestX = 0;
  let bestY = 0;
  let bestGap = reach;
  let found = false;

  for (const point of field) {
    const gap = Math.hypot(point.x - x, point.y - y);
    if (gap < bestGap) {
      bestGap = gap;
      bestX = point.x;
      bestY = point.y;
      found = true;
    }
  }

  if (!found) return { x, y, hold: 0 };

  const fall = 1 - bestGap / reach;
  const pull = strength * fall * fall;
  return {
    x: x + (bestX - x) * pull,
    y: y + (bestY - y) * pull,
    // how caught the dot is right now, for anything that wants to react to it
    hold: pull,
  };
}
