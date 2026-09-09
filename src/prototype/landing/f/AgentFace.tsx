/**
 * The character's own colour, in the exported file, is one specific orange
 * — so recolouring it per agent means rotating that hue at render time
 * rather than asking for new exports per accent. `hue-rotate` turns the
 * whole image around the colour wheel by a fixed number of degrees; what
 * this computes is which number of degrees lands on each agent's own
 * accent, starting from the source orange's own hue rather than a guess.
 */
const SOURCE_HUE = hueOf("#f84600"); // the character's own orange, ~17°

function hueOf(hex: string): number {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** shortest signed rotation from the source hue to this agent's own —
 *  e.g. +112deg rather than -248deg for the same visual result, since a
 *  filter shouldn't spin the long way round for no reason */
function hueRotateFor(accent: string): number {
  let delta = (hueOf(accent) - SOURCE_HUE) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return Math.round(delta);
}

/**
 * One character, worn by five different agents — the same
 * Character_Processing_Indicator mascot AgentWorking/AgentIdle already use
 * in the real Agents screen (see AgentsWorkspace.tsx), not a second face
 * invented for the landing page. Only one frame of it exists on disk, so
 * every agent wears the same expression — what varies is its colour,
 * rotated per agent from the source orange via `hueRotateFor`, the glow
 * behind it (also read from `accent`), and the one-glyph emoji badge in
 * the corner that says what the agent actually does.
 */
export function AgentFace({
  accent,
  /** what the agent does, in one glyph — the corner mark, not the face
   *  itself, so five agents wearing the same character still read apart
   *  at a glance */
  emoji,
  /** defaults to a proportion of `size`; pass a fixed value where the
   *  badge needs to match an exact spec regardless of the avatar's own size */
  emojiSize,
  size = 40,
  active = false,
  className,
}: {
  accent: string;
  emoji?: string;
  emojiSize?: number;
  size?: number;
  active?: boolean;
  className?: string;
}) {
  const badgeSize = emojiSize ?? Math.max(20, size * 0.56);
  return (
    <span
      className={`agf-root${active ? " agf-root--active" : ""}${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size, ["--agf-accent" as string]: accent }}
    >
      <span className="agf-halo" aria-hidden="true" />
      <span className="agf-badge">
        <img
          src={`${import.meta.env.BASE_URL}character/status-indicator.webp`}
          alt=""
          style={{ filter: `hue-rotate(${hueRotateFor(accent)}deg) saturate(.82)` }}
        />
      </span>

      {emoji && (
        <span
          className="agf-emoji"
          aria-hidden="true"
          style={{ width: badgeSize, height: badgeSize }}
        >
          {emoji}
        </span>
      )}

      <style>{`
        .agf-root { position: relative; display: inline-flex; flex: none; }

        /* the per-agent glow — same formula as .orb-halo in index.css, but
           coloured by this instance's own accent rather than the fixed
           brand orange, since here the halo is the only thing left to
           carry which agent this is */
        .agf-halo {
          position: absolute; z-index: 0; inset: -32%; border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle, color-mix(in srgb, var(--agf-accent) 55%, transparent) 0%, color-mix(in srgb, var(--agf-accent) 12%, transparent) 45%, transparent 72%);
          opacity: .55; transition: opacity .2s ease;
        }
        .agf-root--active .agf-halo { opacity: 1; }

        .agf-badge {
          position: relative; z-index: 1; display: block; width: 100%; height: 100%;
          overflow: hidden; border-radius: 999px;
          animation: agf-breathe 3.6s ease-in-out infinite;
        }
        .agf-badge img {
          display: block; width: 100%; height: 100%;
          object-fit: cover; transform: scale(2.4);
          /* the source frame is exported on a white canvas around the
             character; cropping in this tight scales past that margin so
             the badge shows only the glowing blob, no visible square edge —
             same technique as AgentWorking/AgentIdle */
        }
        @keyframes agf-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @media (prefers-reduced-motion: reduce) {
          .agf-badge { animation: none; }
        }

        .agf-emoji {
          position: absolute; right: -5px; bottom: -5px; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          border-radius: 999px; background: rgba(0,0,0,.5);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          color: #000; text-shadow: -2px 0 4.6px #000;
          font-family: var(--font-google-sans); font-size: 25px; font-weight: 400; line-height: normal;
        }
      `}</style>
    </span>
  );
}
