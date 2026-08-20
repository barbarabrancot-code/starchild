import { useEffect, useRef, type RefObject } from "react";

// A field of fine particles laid over a slow-moving wave. The particles sit on a
// jittered grid — never a visible lattice — and their brightness comes from how
// close they are to a crest of the wave, so the field reads as ridges and
// filaments drifting through space rather than as dots on a page.
//
// The pointer is a body passing over it: the field bulges away from it and lights
// up, and a dot stands in for the cursor, same as versions A and B.
const SPACING = 11; // px between particles before jitter
const JITTER = 0.55; // share of the spacing a particle can wander from its slot
const DOT = 1.15; // resting particle size
const AMPLITUDE = 30; // px of vertical travel in the wave
const LIGHT_RADIUS = 300; // reach of the pointer light
const PUSH = 26; // max displacement at the centre of the light
const LEVELS = 26; // brightness buckets — one fillStyle change per bucket

// cold dust → the white of a crest → the warm core right under the pointer
const DUST: [number, number, number] = [150, 168, 196];
const CREST: [number, number, number] = [255, 255, 255];
const WARM: [number, number, number] = [255, 146, 62];

const DOT_EASE = 0.34;
const LIGHT_EASE = 0.15;
const FADE_EASE = 0.08;
const DOT_SIZE = 14; // matches the hero dot on A/B

type Particle = { x: number; y: number; depth: number; seed: number };
type Bucket = { color: string; size: number; points: number[] };

// levels 0..LEVELS-1 run dust → crest; the top few also pick up the pointer's warmth
function buildBuckets(): Bucket[] {
  return Array.from({ length: LEVELS }, (_, i) => {
    const t = i / (LEVELS - 1);
    const warmth = Math.max(0, t - 0.72) / 0.28; // only the brightest run warm
    const r = Math.round(DUST[0] + (CREST[0] - DUST[0]) * t + (WARM[0] - CREST[0]) * warmth * 0.55);
    const g = Math.round(DUST[1] + (CREST[1] - DUST[1]) * t + (WARM[1] - CREST[1]) * warmth * 0.55);
    const b = Math.round(DUST[2] + (CREST[2] - DUST[2]) * t + (WARM[2] - CREST[2]) * warmth * 0.55);
    const alpha = 0.05 + 0.85 * Math.pow(t, 1.6);
    return {
      color: `rgba(${r},${g},${b},${alpha.toFixed(3)})`,
      size: DOT + 1.5 * Math.pow(t, 2),
      points: [],
    };
  });
}

/**
 * Canvas field that fills its host. Renders under the hero copy and takes no
 * pointer events of its own — it listens on the host, so hovering the headline
 * or the input still moves the light.
 */
export function PixelMesh({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = targetRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // the dot stands in for the cursor, so it only exists where there is one
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const buckets = buildBuckets();

    if (fine) host.classList.add("hero-c--fine");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // pointer target, the dot chasing it, the light trailing the dot, and how
    // "on" the light currently is
    let tx = -9999;
    let ty = -9999;
    let dx = -9999;
    let dy = -9999;
    let lx = -9999;
    let ly = -9999;
    let power = 0;
    let wanted = 0;
    let seeded = false;

    let frame = 0;
    let running = false;
    const start = performance.now();

    // The wave the whole field lies on: three slow, out-of-phase components, so
    // the ridges cross and separate instead of marching in step.
    const wave = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0062 + y * 0.0038 + t * 0.19) +
      Math.sin(x * 0.0029 - y * 0.0071 - t * 0.14) * 0.85 +
      Math.sin((x + y) * 0.0042 + t * 0.09) * 0.6;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // spill of light around the pointer, so the field isn't lit in a vacuum
      if (power > 0.01) {
        const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, LIGHT_RADIUS * 1.6);
        glow.addColorStop(0, `rgba(248,70,0,${(0.11 * power).toFixed(3)})`);
        glow.addColorStop(0.45, `rgba(248,70,0,${(0.04 * power).toFixed(3)})`);
        glow.addColorStop(1, "rgba(248,70,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const bucket of buckets) bucket.points.length = 0;

      for (const p of particles) {
        const w = wave(p.x, p.y, t);

        // the wave lifts the particle, and depth decides how much of it it feels
        let px = p.x + w * 5 * p.depth;
        let py = p.y + w * AMPLITUDE * p.depth;

        // a crest is where the wave turns over — thin bands of near-white, which
        // is what makes the field read as ridges instead of noise
        const band = Math.pow(Math.max(0, Math.cos(w * 1.9 + p.seed * 0.35)), 7);
        let intensity = 0.06 + 0.62 * band * p.depth + 0.05 * p.seed;

        if (power > 0.01) {
          const ox = px - lx;
          const oy = py - ly;
          const dist = Math.hypot(ox, oy);
          if (dist < LIGHT_RADIUS) {
            const fall = 1 - dist / LIGHT_RADIUS;
            const soft = fall * fall * power;
            intensity += soft * 1.1;
            // push particles away from the light — the field bulges under it
            if (dist > 0.001) {
              const shove = soft * PUSH;
              px += (ox / dist) * shove;
              py += (oy / dist) * shove;
            }
          }
        }

        const level = Math.min(LEVELS - 1, Math.max(0, Math.round(intensity * (LEVELS - 1))));
        buckets[level].points.push(px, py);
      }

      for (const bucket of buckets) {
        if (bucket.points.length === 0) continue;
        ctx.fillStyle = bucket.color;
        const half = bucket.size / 2;
        for (let i = 0; i < bucket.points.length; i += 2) {
          ctx.fillRect(bucket.points[i] - half, bucket.points[i + 1] - half, bucket.size, bucket.size);
        }
      }

    };

    // The dot stands in for the cursor, so nothing may cover it — not the scrim
    // over the field, not the headline, not the input. Painting it on the canvas
    // would bury it under both, so it is its own element on the top layer and
    // only its transform is touched per frame.
    const paintDot = () => {
      const el = dotRef.current;
      if (!el || !fine) return;
      el.style.transform = `translate3d(${dx - DOT_SIZE / 2}px, ${dy - DOT_SIZE / 2}px, 0)`;
      el.style.opacity = `${power}`;
    };

    // Jitter and depth are drawn once and kept: recomputing them per frame would
    // make the field boil, and the point is that the particles are still and the
    // wave is what moves.
    const seedParticles = () => {
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil((height + AMPLITUDE * 2) / SPACING) + 2;
      const next: Particle[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const seed = Math.random();
          const x = col * SPACING - SPACING + (Math.random() - 0.5) * SPACING * 2 * JITTER;
          const y = row * SPACING - SPACING - AMPLITUDE + (Math.random() - 0.5) * SPACING * 2 * JITTER;
          // particles nearer the top sit further back: they feel less of the wave
          // and stay dimmer, which is what gives the field its horizon
          const depth = 0.35 + 0.65 * Math.min(1, Math.max(0, y / Math.max(1, height)));
          next.push({ x, y, depth, seed });
        }
      }
      particles = next;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      draw(performance.now());
    };

    const tick = (now: number) => {
      dx += (tx - dx) * DOT_EASE;
      dy += (ty - dy) * DOT_EASE;
      lx += (dx - lx) * LIGHT_EASE;
      ly += (dy - ly) * LIGHT_EASE;
      power += (wanted - power) * FADE_EASE;
      draw(now);
      paintDot();
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (!seeded) {
        // first move: drop everything where the cursor is instead of flying in from 0,0
        seeded = true;
        dx = lx = tx;
        dy = ly = ty;
      }
      wanted = 1;
      if (reduced) {
        dx = lx = tx;
        dy = ly = ty;
        power = 1;
        draw(performance.now());
        paintDot();
      }
    };

    const onLeave = () => {
      wanted = 0;
      seeded = false;
      if (reduced) {
        power = 0;
        draw(performance.now());
        paintDot();
      }
    };

    // the field only animates while the hero is actually on screen
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0 },
    );
    observer.observe(host);

    const onVisibility = () => (document.hidden ? pause() : play());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      host.classList.remove("hero-c--fine");
      pause();
    };
  }, [targetRef]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" aria-hidden="true" />

      {/* the cursor layer clears everything: the field, the scrim over it, the
          headline and the input all sit below */}
      <div className="pm-cursor-layer" aria-hidden="true">
        <span ref={dotRef} className="pm-dot" />
      </div>

      <style>{`
        .pm-cursor-layer { position: absolute; inset: 0; z-index: 40; pointer-events: none; }
        .pm-dot {
          position: absolute; top: 0; left: 0;
          width: ${DOT_SIZE}px; height: ${DOT_SIZE}px; border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0; will-change: transform;
          animation: pm-breathe 3.6s ease-in-out infinite;
        }
        /* transform carries the position, so the breath rides on scale instead */
        @keyframes pm-breathe {
          0%, 100% { scale: 1; }
          50% { scale: 1.16; }
        }
        @media (prefers-reduced-motion: reduce) { .pm-dot { animation: none; } }
      `}</style>
    </>
  );
}
