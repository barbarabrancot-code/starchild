import { useEffect, useRef, useState } from "react";

/**
 * The claim the hero makes on its right-hand side: many models, one thing
 * coordinating them.
 *
 * It is built as an interface visualisation rather than an illustration of
 * space. There is no starfield, no nebula, no glow for its own sake — the rings
 * are hairlines, the symbols are the providers' own marks at rest in their own
 * grey, and orange appears only where something is actually happening. The
 * centre is the only thing that is orange all the time, because the centre is
 * the point being made.
 *
 * Three interactions, in order of how much they matter:
 *   1. it turns, slowly enough that you notice it is alive rather than moving;
 *   2. hovering a provider stops everything and names it;
 *   3. hovering the system tilts the plane a few degrees under the cursor.
 */

const ICONS = `${import.meta.env.BASE_URL}icons/`;

/**
 * Orbits, outward. Periods are in seconds for a full revolution — the inner ring
 * is the quickest and it still takes a minute and a half, which is the intended
 * register: the composition should look different if you glance back at it, not
 * while you are reading the headline next to it.
 *
 * Radii are fractions of the stage's half-width, so the whole thing scales with
 * its container and never needs a breakpoint of its own.
 */
const RINGS = [
  { radius: 0.4, period: 96 },
  { radius: 0.63, period: 148 },
  { radius: 0.86, period: 205 },
];

/**
 * Six, not eight. Every symbol here is a real asset in public/icons — Claude,
 * Qwen and Mistral are missing from that folder, so they are missing from the
 * orbit rather than being approximated by a mark drawn from memory. Dropping
 * their SVGs in and adding a line each is the whole job of putting them back.
 *
 * `angle` is where each one starts, in degrees. They are spread so no two are
 * ever stacked on the same side for long.
 */
const PROVIDERS: { id: string; name: string; file: string; ring: number; angle: number }[] = [
  { id: "openai", name: "OpenAI", file: "openai.svg", ring: 0, angle: 18 },
  { id: "gemini", name: "Gemini", file: "gemini.svg", ring: 0, angle: 205 },
  { id: "grok", name: "Grok", file: "xai.svg", ring: 1, angle: 96 },
  { id: "deepseek", name: "DeepSeek", file: "deepseek.svg", ring: 1, angle: 262 },
  { id: "kimi", name: "Kimi", file: "kimi.svg", ring: 2, angle: 148 },
  { id: "zai", name: "Z.ai", file: "zai.svg", ring: 2, angle: 322 },
];

/** the most the plane ever leans, in degrees, at the very corner of the stage */
const MAX_TILT = 6;

export function OrbitalSystem() {
  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linkRef = useRef<SVGLineElement>(null);

  /** which provider is being pointed at — also what pauses the orbit */
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;

  /** lets a hover repaint the nodes immediately, rather than waiting for a frame
   *  that may never come — under reduced motion there is no loop running at all */
  const placeRef = useRef<((now: number) => void) | null>(null);
  useEffect(() => {
    placeRef.current?.(performance.now());
  }, [active]);

  useEffect(() => {
    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let half = 0;
    let frame = 0;
    let running = false;
    /** seconds of orbit actually travelled — frozen while a provider is held */
    let travelled = 0;
    let last = 0;

    const measure = () => {
      half = stage.clientWidth / 2;
    };

    const place = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      // Hovering a provider stops the system rather than slowing it: a system
      // that keeps drifting while you are trying to read a name is a system
      // fighting you. Time simply stops accumulating.
      if (!activeRef.current && !reduced) travelled += dt;

      PROVIDERS.forEach((provider, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const ring = RINGS[provider.ring];
        const turns = reduced ? 0 : travelled / ring.period;
        const angle = ((provider.angle / 360 + turns) % 1) * Math.PI * 2;
        const r = ring.radius * half;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        // the name opens away from the centre, so it never crosses the core
        const side = x < 0 ? "left" : "right";
        if (el.dataset.side !== side) el.dataset.side = side;

        // The hairline from the active provider back to the middle: the only
        // thing here that draws the word "coordinated". Its viewBox spans -100
        // to 100 across the stage, so the pixel offset has to be converted —
        // half the stage is 100 units.
        if (activeRef.current === provider.id && linkRef.current && half > 0) {
          linkRef.current.setAttribute("x2", `${((x / half) * 100).toFixed(2)}`);
          linkRef.current.setAttribute("y2", `${((y / half) * 100).toFixed(2)}`);
        }
      });
    };

    placeRef.current = place;

    const tick = (now: number) => {
      place(now);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // The tilt. Cursor position maps to a lean on the two axes — left of centre
    // leans left, above centre leans back — and the transition on the plane is
    // what carries it back to neutral when the pointer leaves, with no extra code.
    const onMove = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      const nx = (event.clientX - box.left) / box.width - 0.5;
      const ny = (event.clientY - box.top) / box.height - 0.5;
      plane.style.setProperty("--ry", `${(nx * 2 * MAX_TILT).toFixed(2)}deg`);
      plane.style.setProperty("--rx", `${(-ny * 2 * MAX_TILT).toFixed(2)}deg`);
    };

    const onLeave = () => {
      plane.style.setProperty("--ry", "0deg");
      plane.style.setProperty("--rx", "0deg");
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      place(performance.now());
    });
    resizeObserver.observe(stage);

    // nothing turns while the hero is scrolled past
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()), {
      threshold: 0,
    });
    io.observe(stage);

    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduced) {
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
    }

    measure();
    place(performance.now());

    return () => {
      placeRef.current = null;
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stop();
    };
  }, []);

  return (
    <div className="orb-stage" ref={stageRef} data-active={active ? "true" : undefined} aria-hidden="true">
      <div className="orb-plane" ref={planeRef}>
        {RINGS.map((ring, i) => (
          <span
            key={i}
            className="orb-ring"
            style={{ width: `${ring.radius * 100}%`, height: `${ring.radius * 100}%` }}
          />
        ))}

        {/* drawn from the middle outwards, and only while something is held */}
        <svg className="orb-link" viewBox="-100 -100 200 200" preserveAspectRatio="none">
          <line ref={linkRef} x1="0" y1="0" x2="0" y2="0" />
        </svg>

        {PROVIDERS.map((provider, i) => (
          <div
            key={provider.id}
            className="orb-node"
            data-on={active === provider.id ? "true" : undefined}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
          >
            {/* Deliberately not a button. The whole stage is aria-hidden, and a
                focusable control inside hidden content is a real defect — it
                takes focus somewhere a screen reader says nothing about. It is
                also six tab stops standing between the keyboard and the prompt
                field, in a hero whose entire job is that field. So this is
                decoration that reacts to a pointer, and the models it names are
                stated for real further down the page. */}
            <span
              className="orb-mark"
              onPointerEnter={() => setActive(provider.id)}
              onPointerLeave={() => setActive((cur) => (cur === provider.id ? null : cur))}
            >
              <img src={`${ICONS}${provider.file}`} alt="" />
            </span>
            <span className="orb-name">{provider.name}</span>
          </div>
        ))}
      </div>

      {/* Outside the plane on purpose: everything else leans, this does not. It
          is the fixed point the rest of the composition is arranged around. */}
      <span className="orb-core" />

      <style>{`
        /* Scaled rather than re-dimensioned. The stage is width:100% inside a
           five-column slot, so on most viewports the column is what caps it and
           raising max-width would do nothing — 20% has to come from a transform
           to actually be 20%. It also keeps every proportion exact: rings, marks,
           labels and the core all grow together, with no numbers to keep in sync.
           The hero clips its own overflow, so growing past the column is safe. */
        .orb-stage {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 1;
          margin-inline: auto;
          perspective: 900px;
          transform: scale(1.2);
        }

        /* The plane rests leaning back rather than face-on. It was a flat set of
           concentric circles before, which read as a diagram; at 20° the
           perspective does the work and it reads as a plane you are looking
           across. The cursor tilt is a deviation from this pose, not from zero,
           so the system always has somewhere to return to. */
        /* Flat, not preserve-3d — and that is the fix for labels being covered.
           Under preserve-3d the symbols are sorted by their position in space,
           and at a 30° lean a symbol at the bottom of an orbit sits ~99px nearer
           the viewer than one at the top, so it painted straight over the other
           one's name and no amount of z-index or lift could outrank it.
           Flattening composites the children into the plane first and then tilts
           the whole surface: the lean looks identical, every symbol is coplanar
           again, and ordinary z-index decides what is on top. */
        /* Two resting angles, not one. The Y lean is negative on purpose: it
           turns the plane's face back toward the middle of the page, where the
           headline and the field are, instead of angling it off the right edge.
           It is also kept well under the X lean — matching them would read as a
           cube corner rather than as a plane seen at an angle. Both are dialled
           here; the cursor tilt is a deviation from this pose. */
        .orb-plane {
          position: absolute;
          inset: 0;
          --tilt-rest-x: 30deg;
          --tilt-rest-y: -10deg;
          transform:
            rotateX(calc(var(--tilt-rest-x) + var(--rx, 0deg)))
            rotateY(calc(var(--tilt-rest-y) + var(--ry, 0deg)));
          transition: transform .5s cubic-bezier(.16, 1, .3, 1);
        }

        /* hairlines. Two values darker than the faintest thing the hero already
           draws, so they read as structure rather than as an element */
        .orb-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, .11);
          border-radius: 50%;
          transition: border-color .45s ease;
        }
        /* still a step down while a provider is being read, so the paths recede
           behind the one thing being looked at — just from a brighter start */
        .orb-stage[data-active] .orb-ring { border-color: rgba(255, 255, 255, .07); }

        .orb-link {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .orb-link line {
          stroke: rgba(248, 70, 0, .5);
          stroke-width: 1;
          vector-effect: non-scaling-stroke;
        }
        .orb-stage[data-active] .orb-link { opacity: 1; }

        /* Mark size is the one number here that fights the outer ring. At 46px
           the outermost symbol sits 198px out with a 23px radius, against a
           230px half-stage — about 9px of air. Going much past this either
           crowds the edge or means pulling the outer orbit in. */
        .orb-node {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -23px 0 0 -23px;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          will-change: transform;
        }
        /* the one being read comes to the front, name and all */
        .orb-node[data-on] { z-index: 4; }

        .orb-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, .07);
          border-radius: 50%;
          background: rgba(10, 12, 14, .72);
          transition: border-color .3s ease, background-color .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1);
        }
        /* The source files are a single flat #76808F — their only white is inside
           a clipPath and never paints — so knocking them to black and inverting
           gives clean white with the shapes untouched. Doing it in CSS keeps the
           SVGs as they were shipped. */
        .orb-mark img {
          width: 26px;
          height: 26px;
          display: block;
          filter: brightness(0) invert(1);
          transition: opacity .3s ease;
        }

        /* Hierarchy is opacity alone now. With the marks already at full white
           there is no brightness left to add on hover — so the emphasis comes
           from everything else stepping back instead. */
        .orb-stage[data-active] .orb-mark img { opacity: .3; }
        .orb-stage[data-active] .orb-node[data-on] .orb-mark img { opacity: 1; }
        .orb-node[data-on] .orb-mark {
          border-color: rgba(248, 70, 0, .55);
          background: rgba(18, 12, 9, .92);
          transform: scale(1.09);
        }

        /* the name sits beside the mark, on whichever side faces away from the
           centre — never a card, never a pointer, just the word */
        .orb-name {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          font-family: var(--font-google-sans);
          font-size: 12.5px;
          letter-spacing: .01em;
          color: rgba(255, 255, 255, .92);
          opacity: 0;
          transition: opacity .28s ease;
          pointer-events: none;
        }
        .orb-node[data-side="right"] .orb-name { left: calc(100% + 12px); }
        .orb-node[data-side="left"] .orb-name { right: calc(100% + 12px); }
        .orb-node[data-on] .orb-name { opacity: 1; }

        .orb-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 22px;
          height: 22px;
          margin: -11px 0 0 -11px;
          border-radius: 50%;
          background: var(--color-orange-400);
          box-shadow: 0 0 18px rgba(248, 70, 0, .55), 0 0 60px rgba(248, 70, 0, .18);
          transition: box-shadow .45s ease;
        }
        /* the one place the centre reacts: something is talking to it */
        .orb-stage[data-active] .orb-core {
          box-shadow: 0 0 26px rgba(248, 70, 0, .75), 0 0 84px rgba(248, 70, 0, .26);
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-plane { transition: none; }
          .orb-mark { transition: border-color .3s ease, background-color .3s ease; }
          .orb-node[data-on] .orb-mark { transform: none; }
        }
      `}</style>
    </div>
  );
}
