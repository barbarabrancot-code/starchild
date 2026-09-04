import { useState } from "react";
import { PresenceOrb, type OrbState } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";

/**
 * The hero's orb, as a rendered loop.
 *
 * E replaces the live presence orb with an animated file — something with more in
 * it than CSS can carry. The slot is built and wired; the file is not here yet.
 *
 * Until it is, this renders the presence orb at the same size, which means the
 * page is complete and reviewable today and gains the animation the moment the
 * asset lands. Two rules make that swap safe rather than a rewrite:
 *
 *   · the fallback is the real orb, not a grey box — nobody has to imagine it
 *   · an asset that fails to load falls back too, so a bad path degrades to the
 *     thing that already worked instead of leaving a hole in the middle of the page
 *
 * TO DROP THE ANIMATION IN: put the file at public/images/orb-loop.webm and set
 * SOURCE below. Nothing else needs touching. A .mp4 twin next to it would cover
 * Safari, which does not play VP9/VP8 in every version.
 */
const SOURCE: string | null = null;

/** matched to the CSS orb's own footprint so the swap does not move the page */
export function OrbLoop({ size = 180, state = "resting" }: { size?: number; state?: OrbState }) {
  const reduced = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  if (!SOURCE || failed) {
    return <PresenceOrb state={state} size={size} />;
  }

  return (
    <video
      src={`${import.meta.env.BASE_URL}${SOURCE}`}
      width={size}
      height={size}
      // A looping background element is not a video anyone controls: no chrome, no
      // sound, and inline so iOS does not take it fullscreen on play.
      autoPlay={!reduced}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={() => setFailed(true)}
      style={{ width: size, height: size, display: "block", pointerEvents: "none" }}
    />
  );
}
