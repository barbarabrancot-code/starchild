/**
 * The behaviour behind every orange dot in the product.
 *
 * There is one sequence, and it repeats everywhere:
 *
 *   notice → react → lose balance → catch up → recompose → return
 *
 * The dot has no face and no expressions. Everything it communicates comes out
 * of timing: how long it waits before committing, how far it falls behind, how
 * much it overshoots, and how it puts itself back together afterwards. So this
 * file is deliberately the only place those numbers live — a section that wants
 * a different feeling picks a different temperament, it does not invent its own
 * physics. That is what keeps it reading as one presence rather than as a set of
 * animations that happen to share a colour.
 */

/** Which version of itself the dot is being right now. Not moods — postures. */
export type Temperament =
  /** following something it has noticed: the largest lag, the widest overshoot */
  | "curious"
  /** held near something it is waiting on — closer in, much less wobble */
  | "attentive"
  /** working something out: loose, slow to commit, briefly off balance */
  | "unsettled"
  /** it has got it. Almost no lag, no ring-out, no visible imperfection. */
  | "composed";

export type Tuning = {
  /** pull toward the aim, in 1/s² — higher arrives sooner */
  stiffness: number;
  /** damping ratio. Below 1 overshoots; the lower it is the longer it rings. */
  damping: number;
  /** ms the body sits on a new aim before it commits to it */
  hesitation: number;
  /** 0–1: how far it leans toward the aim while it is still hesitating — the peek */
  lean: number;
  /** how much speed turns into stretch. Drag, not squash-and-stretch. */
  drag: number;
};

export const TUNINGS: Record<Temperament, Tuning> = {
  curious: { stiffness: 118, damping: 0.6, hesitation: 115, lean: 0.13, drag: 0.055 },
  attentive: { stiffness: 205, damping: 0.84, hesitation: 55, lean: 0.06, drag: 0.028 },
  unsettled: { stiffness: 88, damping: 0.4, hesitation: 165, lean: 0.19, drag: 0.075 },
  composed: { stiffness: 175, damping: 0.97, hesitation: 35, lean: 0.03, drag: 0.018 },
};

/** the most the dot may ever deform. Past this it stops reading as a dot. */
const MAX_STRETCH = 0.15;
/** px/s under which the body counts as still */
const REST_SPEED = 6;
/** px from the aim inside which the body counts as arrived */
const REST_DISTANCE = 0.7;
/** a new aim only re-triggers the notice beat if it is at least this far off */
const NOTICE_DISTANCE = 18;
/** once at rest, damping is walked up to here so it stops instead of ringing on */
const RECOMPOSE_DAMPING = 1.08;

// Catching up. Falling behind is the character — falling *arbitrarily* far behind
// is a bug, and in the hero the dot stands in for the cursor, so a fast flick
// across the screen would otherwise leave the visitor aiming at nothing.
//
// So the further behind it gets, the harder it pulls. This is not a cap bolted on
// top of the physics: it is the same beat the rest of the system is built from —
// the user moves first, and Starchild puts effort into closing the gap. Under
// CATCH_UP_FROM nothing changes at all, which is where ordinary movement lives.
const CATCH_UP_FROM = 80; // px of lag before it starts trying harder
const CATCH_UP_FULL = 320; // px of lag at which it is trying as hard as it can
const CATCH_UP_GAIN = 3; // up to 4× the pull, which is 2× the speed of closing

export type Frame = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** px/s */
  speed: number;
  /** 0–MAX_STRETCH, along `angle` */
  stretch: number;
  /** radians, direction of travel */
  angle: number;
  /** the slow breath, as a scale multiplier around 1 */
  breath: number;
  /** at rest on its aim, deformation gone: the dot is a dot again */
  settled: boolean;
};

export type PresenceOptions = {
  temperament?: Temperament;
  /** decorrelates instances — two dots on screen must not move as one part */
  seed?: number;
  /** strips lag, overshoot and stretch; the body teleports and only fades */
  reduced?: boolean;
  /** the resting breath, as a fraction of size. 0 turns it off entirely. */
  breath?: number;
  x?: number;
  y?: number;
};

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/**
 * A small body with weight. Aim it and step it; it decides how it gets there.
 *
 * It is not a tween and not a follower: between an aim and the body there is a
 * hesitation, a lag, an overshoot and a recovery, and none of them are skippable
 * — that delay is the whole character.
 */
export class Presence {
  x: number;
  y: number;
  vx = 0;
  vy = 0;

  private aimX: number;
  private aimY: number;
  private tuning: Tuning;
  private reduced: boolean;
  private breathDepth: number;

  /** ms timestamp until which a freshly noticed aim is only leaned toward */
  private holdUntil = 0;
  private stretch = 0;
  private angle = 0;
  private last = 0;
  private accumulator = 0;
  /** how long the body has been at rest — recomposition ramps in over it */
  private restFor = 0;

  /** controlled asymmetry: the two axes are not quite the same spring, so the
   *  body arrives on a slight curve rather than on a straight line */
  private readonly skewX: number;
  private readonly skewY: number;
  private readonly phase: number;
  private readonly jitter: number;

  constructor({
    temperament = "curious",
    seed = Math.random(),
    reduced = false,
    breath = 0.022,
    x = 0,
    y = 0,
  }: PresenceOptions = {}) {
    this.tuning = TUNINGS[temperament];
    this.reduced = reduced;
    this.breathDepth = reduced ? 0 : breath;
    this.x = this.aimX = x;
    this.y = this.aimY = y;

    this.skewX = 1 + (seed - 0.5) * 0.13;
    this.skewY = 1 - (seed - 0.5) * 0.13;
    this.phase = seed * Math.PI * 2;
    this.jitter = 0.75 + seed * 0.5;
  }

  /** swap posture without losing momentum — the body carries on from where it is */
  setTemperament(next: Temperament) {
    this.tuning = TUNINGS[next];
  }

  setReduced(reduced: boolean) {
    this.reduced = reduced;
    if (reduced) {
      this.x = this.aimX;
      this.y = this.aimY;
      this.vx = this.vy = 0;
      this.stretch = 0;
      this.breathDepth = 0;
    }
  }

  /** drop the body somewhere with no travel — first sighting, or a re-measure */
  place(x: number, y: number) {
    this.x = this.aimX = x;
    this.y = this.aimY = y;
    this.vx = this.vy = 0;
    this.stretch = 0;
    this.holdUntil = 0;
  }

  /**
   * Point the body at something. If it was at rest and the aim is a real move,
   * this is the *notice* beat: it holds for a moment and only leans that way,
   * then commits. While it is already travelling, aiming just steers it — the
   * hesitation belongs to noticing, not to every frame of a moving pointer.
   */
  aim(x: number, y: number, now = performance.now()) {
    if (this.reduced) {
      this.x = this.aimX = x;
      this.y = this.aimY = y;
      return;
    }
    const far = Math.hypot(x - this.aimX, y - this.aimY) > NOTICE_DISTANCE;
    if (far && this.isResting()) {
      this.holdUntil = now + this.tuning.hesitation * this.jitter;
    }
    this.aimX = x;
    this.aimY = y;
  }

  /** knock it very slightly off balance in place — used when something lands on it */
  unbalance(strength = 1) {
    if (this.reduced) return;
    const a = this.phase + strength;
    this.vx += Math.cos(a) * 90 * strength;
    this.vy += Math.sin(a) * 74 * strength;
  }

  private isResting() {
    return (
      Math.hypot(this.vx, this.vy) < REST_SPEED &&
      Math.hypot(this.aimX - this.x, this.aimY - this.y) < REST_DISTANCE * 4
    );
  }

  /** Integrate to `now` and report what the body looks like. Safe to call at any rate. */
  step(now: number): Frame {
    if (this.reduced) {
      this.x = this.aimX;
      this.y = this.aimY;
      return {
        x: this.x, y: this.y, vx: 0, vy: 0, speed: 0,
        stretch: 0, angle: 0, breath: 1, settled: true,
      };
    }

    if (!this.last) this.last = now;
    // a tab that was backgrounded must not integrate a five-second frame
    const elapsed = clamp((now - this.last) / 1000, 0, 0.1);
    this.last = now;

    const { stiffness, damping, lean, drag } = this.tuning;

    // while it is still noticing, the body only leans the way it is about to go
    const hesitating = now < this.holdUntil;
    const targetX = hesitating ? this.x + (this.aimX - this.x) * lean : this.aimX;
    const targetY = hesitating ? this.y + (this.aimY - this.y) * lean : this.aimY;

    // Recomposition: the longer it has been still, the more it wants to *stay*
    // still, so an arrival lands once instead of ringing under the aim forever.
    const composure = clamp(this.restFor / 0.42, 0, 1);
    const ratio = damping + (RECOMPOSE_DAMPING - damping) * composure;

    // How far behind it is *right now* — measured against where it is actually
    // heading, so the notice beat still reads as hesitation rather than as the
    // body straining against a hold it put there itself.
    const gap = Math.hypot(targetX - this.x, targetY - this.y);
    const urgency = 1 + CATCH_UP_GAIN * clamp((gap - CATCH_UP_FROM) / (CATCH_UP_FULL - CATCH_UP_FROM), 0, 1);

    // fixed substeps — a spring this loose goes unstable on a long frame
    this.accumulator += elapsed;
    const h = 1 / 240;
    let guard = 0;
    while (this.accumulator >= h && guard++ < 60) {
      this.accumulator -= h;
      const kx = stiffness * this.skewX * urgency;
      const ky = stiffness * this.skewY * urgency;
      const cx = 2 * ratio * Math.sqrt(kx);
      const cy = 2 * ratio * Math.sqrt(ky);
      this.vx += (kx * (targetX - this.x) - cx * this.vx) * h;
      this.vy += (ky * (targetY - this.y) - cy * this.vy) * h;
      this.x += this.vx * h;
      this.y += this.vy * h;
    }

    const speed = Math.hypot(this.vx, this.vy);
    const arrived = speed < REST_SPEED && Math.hypot(this.aimX - this.x, this.aimY - this.y) < REST_DISTANCE;
    this.restFor = arrived ? this.restFor + elapsed : 0;

    // Stretch is drag, not performance: it exists only while the body is moving,
    // it points along travel, and it is gone the moment the body settles.
    const wanted = clamp(speed * drag * 0.01, 0, MAX_STRETCH);
    const ease = wanted > this.stretch ? 0.22 : 0.1; // slower to let go than to take on
    this.stretch += (wanted - this.stretch) * clamp(ease * elapsed * 60, 0, 1);
    if (speed > REST_SPEED) this.angle = Math.atan2(this.vy, this.vx);

    // The resting breath is far under the threshold of "an animation" on purpose:
    // it should only be noticeable as the dot not being dead.
    const breath = this.breathDepth
      ? 1 + Math.sin(((now / 1000 / 3.9) * Math.PI * 2) + this.phase) * this.breathDepth * composure
      : 1;

    return {
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
      speed,
      stretch: this.stretch,
      angle: this.angle,
      breath,
      settled: arrived && this.stretch < 0.004,
    };
  }

  /** true once there is genuinely nothing left to draw — lets a loop shut itself off */
  isQuiet(frame: Frame) {
    return frame.settled && !this.breathDepth;
  }
}

/**
 * The transform for a frame: travel, then drag along the direction of travel.
 * Rotating in and back out keeps the deformation on the axis of movement, so a
 * dot moving sideways elongates sideways rather than always horizontally.
 */
export function frameTransform(frame: Frame, offsetX = 0, offsetY = 0) {
  const deg = (frame.angle * 180) / Math.PI;
  const along = 1 + frame.stretch;
  const across = 1 - frame.stretch * 0.62;
  const s = frame.breath;
  return (
    `translate3d(${(frame.x + offsetX).toFixed(2)}px, ${(frame.y + offsetY).toFixed(2)}px, 0) ` +
    `rotate(${deg.toFixed(2)}deg) scale(${(along * s).toFixed(4)}, ${(across * s).toFixed(4)}) ` +
    `rotate(${(-deg).toFixed(2)}deg)`
  );
}
