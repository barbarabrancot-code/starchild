import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePrefersReducedMotion } from "../../presence/usePresence";

/**
 * The orb, with eyes.
 *
 * Eight expressions, and every one of them is the same two shapes with different
 * numbers — which is the whole trick. Each eye is one closed path built from two
 * cubic curves: a top lid and a bottom lid, each with a bulge. Positive bulges
 * push the lids apart into an open eye; a negative bottom bulge pulls that lid up
 * through the middle and the eye becomes a crescent. So:
 *
 *   open      top +, bottom +      neutral, curious, surprised, focused
 *   smiling   top +, bottom −      happy, concerned      (mass above the line)
 *   lowered   top −, bottom +      sleepy                (mass below the line)
 *
 * Because every path is emitted with the same commands in the same order — six
 * coordinate pairs, always — the numbers inside the `d` string interpolate one to
 * the next, and one expression genuinely becomes another rather than being
 * swapped for it. This is why the shapes are generated instead of hand-drawn:
 * eight hand-drawn paths cannot be tweened, and eight images certainly cannot.
 *
 * Tilt is the other half of the reading and it is not decoration. The same
 * crescent is happy when the outer ends drop and concerned when the inner ends
 * rise; the same narrow slit is focused when the inner ends drop and merely
 * sleepy when they do not. Left and right therefore rotate in opposite
 * directions — mirrored, never parallel — except where the asymmetry IS the
 * expression, which is skeptical: one lid down, one eye open, nothing else.
 *
 * The rotation is baked into the path rather than applied as an SVG transform.
 * Rotating the group means owning transform-origin on an element whose box moves
 * with its own contents, and it swung every eye off its centre. Rotating the six
 * points before they are written costs four lines and cannot be got wrong.
 */

export type Mood =
  | "neutral"
  | "down"
  | "curious"
  | "happy"
  | "focused"
  | "skeptical"
  | "surprised"
  | "sleepy"
  | "concerned";

/** one eye: half-width, top bulge, bottom bulge, tilt in degrees, and where it sits */
type Eye = { rx: number; t: number; b: number; rot: number; dx: number; dy: number };

/*
  The open eye is wider than it is tall — about three to two — and every open
  face is this shape at a different size, thickness or tilt. It used to be an egg
  standing up, which made the resting face read as startled before anything had
  happened.
*/
const EYE: Eye = { rx: 15.5, t: 14, b: 14, rot: 20, dx: 0, dy: 0 };
const eye = (over: Partial<Eye> = {}): Eye => ({ ...EYE, ...over });

/**
 * Read this table as the design. Nothing else in this file decides how anything
 * looks — the rest only draws what is written here.
 */
export const FACES: Record<Mood, { left: Eye; right: Eye }> = {
  // The resting face: mirrored, outer ends up. Leaning the same way — both eyes
  // rolled in the same direction, as they were — reads as a head tilted rather
  // than as a face at rest.
  neutral: { left: eye({ rot: 20 }), right: eye({ rot: -20 }) },

  /*
    Looking down at the box.

    Level, flatter, and sitting low in the face — three things at once, because
    only the combination reads as a direction. Lowering the eyes alone reads as
    tired; flattening them alone reads as a squint. Together they look at the one
    thing directly below the orb, which is the composer.
  */
  down: {
    left: eye({ rx: 15, t: 10, b: 10, rot: 0, dy: 9 }),
    right: eye({ rx: 15, t: 10, b: 10, rot: 0, dy: 9 }),
  },

  // one eye small and level, one wide and leaning — the asymmetry is the interest
  curious: {
    left: eye({ rx: 12, t: 11, b: 11, rot: 0, dy: 2 }),
    right: eye({ rx: 17, t: 16, b: 16, rot: -22 }),
  },

  // Closed and smiling: the bottom lid comes up through the middle, outer ends
  // drop. Thin and pushed apart on purpose — at a fuller bulge the two crescents
  // swing their inner ends together and the pair reads as one shape.
  happy: {
    left: eye({ rx: 17, t: 18, b: -12, rot: -11, dx: -1, dy: 3 }),
    right: eye({ rx: 17, t: 18, b: -12, rot: 11, dx: 1, dy: 3 }),
  },

  // narrow and set. The inner ends drop, which is what makes a slit determined
  // rather than merely half-shut.
  focused: {
    left: eye({ rx: 17, t: 7, b: 7, rot: 17 }),
    right: eye({ rx: 17, t: 7, b: 7, rot: -17 }),
  },

  // the one face that is deliberately not mirrored — one lid down, one eye open
  skeptical: {
    left: eye({ rx: 15, t: 4, b: 13, rot: 14, dy: 3 }),
    right: eye({ rx: 16, t: 14, b: 14, rot: -20 }),
  },

  // bigger, rounder, level. Surprise is size, not shape.
  surprised: {
    left: eye({ rx: 17, t: 21, b: 21, rot: 0 }),
    right: eye({ rx: 17, t: 21, b: 21, rot: 0 }),
  },

  // lids most of the way down, sitting low in the face
  sleepy: {
    left: eye({ rx: 16, t: -6, b: 16, rot: -10, dy: 8 }),
    right: eye({ rx: 16, t: -6, b: 16, rot: -10, dy: 8 }),
  },

  // the same crescent as happy, rolled the other way: inner ends up
  concerned: {
    left: eye({ rx: 15, t: 19, b: -11, rot: 18, dx: -1, dy: 4 }),
    right: eye({ rx: 15, t: 19, b: -11, rot: -18, dx: 1, dy: 4 }),
  },
};

/** a blink is not a ninth face — it is whatever face is showing, shut */
const SHUT = { t: 2, b: 2 };

/** the faces that have anything to close */
const BLINKS: Mood[] = ["neutral", "down", "curious", "surprised", "skeptical", "focused"];

/*
  Where the pair sits in the 100-square viewBox.

  The gap is measured off the reference, not guessed: each eye is about a third
  of the orb across and the space between them about a tenth, which puts the
  centres 44 apart. At the 30 they were, an eye wide enough to be right overlapped
  its neighbour and the pair fused into one shape across the middle of the face.
*/
const SEAT = { y: 50, gap: 22 };

const round = (v: number) => Math.round(v * 100) / 100;

/**
 * One eye as a single closed path: left corner, over the top, right corner, back
 * under the bottom. Two cubics, always, in that order — so any two of these
 * strings interpolate.
 */
function path(e: Eye, cx: number) {
  const a = (e.rot * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const at = (x: number, y: number) =>
    `${round(cx + e.dx + x * cos - y * sin)} ${round(SEAT.y + e.dy + x * sin + y * cos)}`;

  return (
    `M ${at(-e.rx, 0)} ` +
    `C ${at(-e.rx, -e.t)} ${at(e.rx, -e.t)} ${at(e.rx, 0)} ` +
    `C ${at(e.rx, e.b)} ${at(-e.rx, e.b)} ${at(-e.rx, 0)} Z`
  );
}

const SPRING = { type: "spring" as const, stiffness: 200, damping: 20, mass: 0.7 };

export function OrbFace({
  mood = "neutral",
  size = 180,
  /** where the eyes drift, −1 to 1 on each axis. The hero feeds it the pointer. */
  gaze = { x: 0, y: 0 },
  className,
}: {
  mood?: Mood;
  size?: number;
  gaze?: { x: number; y: number };
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [blinking, setBlinking] = useState(false);
  const timers = useRef<number[]>([]);

  // Blinks on their own clock, at an uneven interval. On a fixed one it stops
  // reading as a body doing something and starts reading as a loop.
  useEffect(() => {
    if (reduced || !BLINKS.includes(mood)) {
      setBlinking(false);
      return;
    }
    let live = true;
    const schedule = () => {
      const id = window.setTimeout(() => {
        if (!live) return;
        setBlinking(true);
        timers.current.push(
          window.setTimeout(() => {
            if (!live) return;
            setBlinking(false);
            schedule();
          }, 110),
        );
      }, 2600 + Math.random() * 4200);
      timers.current.push(id);
    };
    schedule();
    return () => {
      live = false;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [mood, reduced]);

  const face = FACES[mood] ?? FACES.neutral;
  const shut = (e: Eye) => (blinking ? { ...e, ...SHUT } : e);
  const left = path(shut(face.left), 50 - SEAT.gap);
  const right = path(shut(face.right), 50 + SEAT.gap);

  // The pair drifts together — there are no pupils, so the eyes themselves are
  // what looks at you. Kept to a few pixels: any more and it stops being
  // attention and becomes a toy following the mouse.
  const reach = reduced ? 0 : size * 0.026;
  const swap = reduced ? { duration: 0 } : SPRING;

  return (
    <span className={`of-root${className ? ` ${className}` : ""}`} style={{ width: size, height: size }}>
      <PresenceOrb state="resting" size={size} />

      <motion.svg
        className="of-eyes"
        viewBox="0 0 100 100"
        aria-hidden="true"
        animate={{ x: gaze.x * reach, y: gaze.y * reach }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      >
        <defs>
          {/* warm at the centre, cooler at the rim — the eyes are lit by the same
              body they sit on rather than painted onto it */}
          <radialGradient id="of-eye" cx="50%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#FFF7EC" />
            <stop offset="100%" stopColor="#FFD7A2" />
          </radialGradient>
        </defs>

        <motion.path initial={false} animate={{ d: left }} transition={swap} d={left} fill="url(#of-eye)" />
        <motion.path initial={false} animate={{ d: right }} transition={swap} d={right} fill="url(#of-eye)" />
      </motion.svg>

      <style>{`
        .of-root { position: relative; display: inline-flex; }

        /* Over the orb, and taking no pointer events: the hero listens on the orb
           itself, and a transparent square on top would eat the hover the face is
           supposed to be reacting to. */
        .of-eyes {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none;
          filter: drop-shadow(0 0 5px rgba(255, 226, 190, .8));
        }
      `}</style>
    </span>
  );
}
