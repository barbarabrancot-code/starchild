import { useEffect, useRef, useState } from "react";
import { PresenceOrb, type OrbState } from "../../presence/PresenceOrb";

/**
 * Starchild as the rendered character rather than the CSS dot.
 *
 * Held on a single frame, on purpose.
 *
 * There are four clips in assets/character — idle, interviewing, thinking,
 * clapping — and an earlier pass here played one per state, crossfading between
 * them. That is the version this replaces, and the reason is that a clip playing
 * whether or not you are there is a thing running on the page: it reads as a logo
 * animation, and it reads that way no matter how good the animation is.
 *
 * So nothing plays. The character is a still, and the only thing that moves is
 * the body leaning toward wherever your pointer is — which the hero owns, in the
 * wrapper around this. Movement that only happens when you move is attention;
 * movement that happens regardless is decoration.
 *
 * The other three clips stay in public/character, unused, until there is a moment
 * that earns one.
 */

/** the still. Opaque — see BLEND. */
const CLIP = "character/idle.webm";

/**
 * Which frame to hold, in seconds into the clip.
 *
 * The clip is a two-second loop, so anything from 0 to 2 is a pose. Zero is the
 * export's own opening frame, which is the pose it was rendered from rest into;
 * if it turns out to catch a fade-in or a blink, this is the one number to move.
 */
const POSE = 0;

/**
 * The idle export has no alpha channel — it is the "(Test)" render and arrived
 * flattened onto its own black backdrop. The other three carry alpha; this one
 * does not, so it is composited with `screen`, which drops the black and keeps
 * the glow: right on the dark hero, wrong anywhere light.
 *
 * Re-export it with alpha and this constant goes away with the blend.
 */
const BLEND = "screen" as const;

/** sized and positioned exactly as the CSS orb, so the swap does not move the page */
export function CharacterOrb({
  /** only reaches the fallback orb — the character itself holds one pose */
  state = "resting",
  size = 192,
  className,
}: {
  state?: OrbState;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  /*
    A paused <video> paints whichever frame it is parked on, so holding a pose is
    a seek and then nothing. It is done on loadeddata rather than on mount
    because seeking a video with no data yet is a no-op that never reports back.
  */
  useEffect(() => {
    const el = video.current;
    if (!el || !ready || POSE <= 0) return;
    try { el.currentTime = POSE; } catch { /* seek refused; frame 0 will do */ }
  }, [ready]);

  // No motion to fall back from any more — a still is a still under reduced
  // motion too — so this is only about the file: a browser that cannot decode
  // VP9, or a path that 404s, gets the orb at the same size in the same place.
  const playable =
    typeof document === "undefined" ||
    !!document.createElement("video").canPlayType('video/webm; codecs="vp9"');

  if (!playable || failed) {
    return <PresenceOrb state={state} size={size} className={className} />;
  }

  return (
    <span
      className={`char-orb${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size }}
    >
      <video
        ref={video}
        src={`${import.meta.env.BASE_URL}${CLIP}`}
        // Never played, never controlled, never audible. muted and playsInline
        // stay because a video element without them is one stray play() away from
        // going fullscreen on iOS.
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
        style={{ mixBlendMode: BLEND }}
      />

      <style>{`
        .char-orb { position: relative; display: inline-block; pointer-events: none; }
        .char-orb video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block; object-fit: contain;
        }
      `}</style>
    </span>
  );
}
