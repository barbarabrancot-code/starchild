import type { TaskCard } from "../data";
import { HeroScreenF } from "./f/HeroScreenF";
import { ConversationShowcaseF } from "./f/ConversationShowcaseF";
import { OrbitSection } from "./f/OrbitSection";
import { ConductorSectionA } from "./f/ConductorSectionA";
import { MemoryShowcaseSection } from "./f/MemoryShowcaseSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { ThemeToggle } from "./f/ThemeToggle";
import { useLandingTheme } from "./f/theme";
import { FACES, OrbFace, type Mood } from "./f/OrbFace";

/**
 * Version F — four sections so far, on purpose.
 *
 * E was built top-down with D's sections underneath so the hero could be judged
 * against something. F starts the other way: the page ends where the finished
 * work ends, and nothing is here to fill space. A borrowed section under a new
 * hero is a comparison nobody asked for, and it makes the new one look like a
 * replacement part.
 *
 * Section 3 is the exception, and it is a decision rather than a stopgap: E's
 * orbit already says the one thing F needs said there, so it was brought over
 * and given F's own ground instead of being redrawn to look different. Anything
 * that arrives that way gets rewritten to belong here — see the concave panel in
 * OrbitSection — rather than imported from ./e and left as it was.
 *
 * Sections arrive here as their designs do.
 */

/**
 * `?faces=1` — the eight expressions laid out at once, for looking at.
 *
 * The same kind of thing as `?still=1` on version E: a review mode, not a second
 * design. On the page itself the face only ever shows one expression, and only
 * when something has caused it, so the only way to compare all eight side by side
 * is to ask for them.
 */
const SHEET = Object.keys(FACES) as Mood[];

function FaceSheet() {
  return (
    <div className="fs-sheet">
      {SHEET.map((mood) => (
        <div key={mood} className="fs-cell">
          <OrbFace mood={mood} size={150} />
          <span className="fs-name">{mood}</span>
        </div>
      ))}

      <style>{`
        .fs-sheet {
          min-height: 100vh; background: #050506;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 64px 40px; align-content: center;
          padding: 80px 60px;
        }
        .fs-cell { display: flex; flex-direction: column; align-items: center; gap: 26px; }
        .fs-name {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.5);
        }
        @media (max-width: 900px) { .fs-sheet { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

function askedForFaces() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("faces") === "1";
}

export function LandingPageF({
  onEnterGuest,
  onStartTask,
  onNavigateConnectors,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  onStartTask: (task: TaskCard) => void;
  /** where the orbit's "Explore all 40+ connectors" goes */
  onNavigateConnectors: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const { theme, toggle } = useLandingTheme();

  if (askedForFaces()) return <FaceSheet />;

  return (
    /* Every colour in every section below is read from the tokens defined under
       this element. The attribute is here rather than on <html> on purpose — see
       the note in ./f/theme. */
    <div className="lf" data-lf={theme}>
      <HeroScreenF
        onEnterGuest={onEnterGuest}
        onStartTask={onStartTask}
        onNavigateHome={() => window.scrollTo({ top: 0 })}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* 2 · You talk; Starchild turns the request into the next concrete step. */}
      <ConversationShowcaseF />

      {/* 3 · What it plugs into. Carried over from E, on its own concave ground —
             the one section here that is a panel rather than a stretch of page. */}
      <OrbitSection onSeeAll={onNavigateConnectors} />

      {/* 4 · How it decides. One drawing: what it knows about you on the left,
             what it can reach on the right, and the answer falling out of the
             bottom of the mark in the middle. */}
      <ConductorSectionA />

      <MemoryShowcaseSection />

      <ThemeToggle theme={theme} onToggle={toggle} />

      <FinalCtaSection
        headline="Whatever comes next, Starchild is already with you."
        onStartFree={() => onEnterGuest()}
        onNavigatePricing={onNavigatePricing}
      />

      <style>{`
        /* ---------- the two grounds ----------

           One set of names, two sets of values. Everything below this file reads
           colour from here and nothing hard-codes a grey, which is the only way
           a page of six sections with six style blocks can be turned over
           without one of them being missed.

           --lf-ink-rgb is a triple rather than a colour because most of the text
           and nearly every border on this page is the ink at some fraction —
           rgba(var(--lf-ink-rgb), .55) and so on. One token then carries all
           forty of them.

           The accent does not flip. #f84600 holds on both grounds, it is the
           brand, and a page that changed its orange between modes would be two
           brands with a switch between them. */
        .lf {
          --lf-page: #050506;
          --lf-ink: #ffffff;
          --lf-ink-rgb: 255,255,255;
          /* cards and panels: a step off the page, in whichever direction the
             page is not */
          --lf-surface: #0a0a0b;
          --lf-surface-2: #0d0d0f;
          --lf-accent: #f84600;
          --lf-accent-rgb: 248,70,0;
          /* The accent when it is a word rather than a shape.
             On black, #f84600 as text is 6.4:1 and the two are the same token.
             On clay it is 2.2:1, which is not a colour you can set 15px type in —
             so the light mode has a darker one, and only the three places where
             the accent is read rather than seen point at it. Shapes, borders,
             glows and the button all keep the brand orange. */
          --lf-accent-ink: #f84600;
          /* Zero, and it has to be exactly zero: every alpha on this page is
             written as A + (1 - A) * lift, so at 0 the dark mode is the numbers
             that were there before any of this existed. */
          --lf-lift-t: 0;
          --lf-lift-e: 0;
          --lf-lift-f: 0;
          /* The edge of a control, and the same edge once it is focused or
             hovered. Within a hundredth of what these four carried before, so the
             dark page is where it was. */
          --lf-ctl-edge: rgba(var(--lf-ink-rgb), .10);
          --lf-ctl-edge-on: rgba(var(--lf-ink-rgb), .24);
          /* The composer's own fill. Translucent in both modes, because it sits
             over the hero's wash and the blur behind it is doing real work — but
             the direction reverses, and that is the whole point of it having a
             token. On black the field is the page lifted; on clay it is paper
             laid on it. Ink at an alpha would have given the light mode a darker
             patch, which reads as a hole cut in the page rather than as
             somewhere to type. */
          --lf-field: rgba(var(--lf-ink-rgb), .045);
          --lf-field-on: rgba(var(--lf-ink-rgb), .06);
          /* the drawn window in section 2, and the well a use-case drawing sits
             in — both are a step away from the page, in whichever direction the
             page is not */
          --lf-window: #1a1a1b;
          --lf-well: #08080a;
          /* how hard the drawn glows are allowed to burn. On black they are the
             light in the room; on cream they are haze over a lit room, and at
             full strength they turn the page orange. */
          --lf-glow: 1;
          --lf-shadow: 0 24px 70px rgba(0,0,0,.24);
          --lf-shadow-deep: 0 40px 90px rgba(0,0,0,.6);
          --lf-veil: rgba(3,3,4,.72);

          background: var(--lf-page);
          color-scheme: dark;
        }

        /* Clay, not paper. A near-white light mode would have been the safe
           version and the wrong one: the accent is a hot orange and every drawn
           glow on this page is orange, and on white those read as stains. On a
           ground that already has the red in it they read as the same light
           falling on something.

           It also changes what the surfaces have to do. Against white, a card is
           a border; against this, a card is a lighter thing sitting on a darker
           one, which is the same relationship the dark mode has — just with the
           page and the card the other way up. */
        .lf[data-lf="light"] {
          --lf-page: #ddc6b7;
          --lf-ink: #2d2520;
          --lf-ink-rgb: 45,37,32;
          /* Warm off-white rather than #fff. Pure white on clay is paper on
             cardboard — two materials — where this is the same material lit
             harder. Hover goes further from the page, as it does in the dark. */
          --lf-surface: #f7efe9;
          --lf-surface-2: #fdf8f4;
          --lf-window: #fbf5f1;
          /* The art well goes the other way: a step back toward the page, so the
             drawing sits in the card rather than on a second card. */
          --lf-well: #ecdcd0;
          /* Half. The glows are drawn as orange at full strength against black,
             where they read as light; at that strength over cream they read as
             the page having been printed wrong. */
          /* Lower than a paper-white mode would need. The page is already carrying
             most of the warmth these glows were there to add, so at half strength
             they stop being light and start being another coat of the same
             colour. */
          --lf-glow: .4;
          /* Warm and a little deeper than they would be on white: a grey shadow
             on clay reads as dirt, and a shallow one disappears into a ground
             this dark. */
          --lf-shadow: 0 18px 46px rgba(74,44,26,.16);
          --lf-shadow-deep: 0 30px 70px rgba(74,44,26,.26);
          --lf-veil: rgba(38,26,18,.5);
          /* 4.7:1 on the page, 6.7:1 on a card — the same orange with the value
             pulled down until it is legible, not a different hue. */
          --lf-accent-ink: #9c2b00;
          /* How far each kind of ink moves toward solid on clay.

             Text moves furthest: at the old alphas, .34 lands at 2.1:1 on this
             ground and .55 at 3.5:1, neither of which is a colour to set copy in.
             .46 is where the lowest of them — a placeholder at .34 — clears 4.5
             against this ink, and the distance between the steps survives.

             Edges are next: a hairline at .09 is 1.2:1 here — not a faint line, an
             absent one — and the composer, the sign-up button and the close button
             are all identified by nothing else. At .22 they clear 3:1.

             Fills move least. A fill only has to be noticed, and on a ground this
             dark it is doing more work at .16 than it was at .045 on black. */
          --lf-lift-t: .46;
          --lf-lift-e: .22;
          --lf-lift-f: .12;
          /* Where this ink crosses 3:1 against the grounds on this page: clay
             wants .55, the window .50, a card .51 and the orbit panel .52. One
             number covers them with a little left over — sitting exactly on the
             line means the next change to any ground breaks it. */
          --lf-ctl-edge: rgba(var(--lf-ink-rgb), .58);
          --lf-ctl-edge-on: rgba(var(--lf-ink-rgb), .76);
          /* Half-strength, and tinted rather than white. It leaves the field
             only a hair off the clay — 1.12:1 — so the box is identified by its
             border rather than by its fill, which is the quieter version of the
             same object. The wash behind it still comes through and warms it,
             which is what keeps it part of the hero rather than a card dropped
             on it. Focus raises the fill as well as the border, so the box
             answers with more than a line getting darker. */
          --lf-field: rgba(241,221,208,.5);
          --lf-field-on: rgba(241,221,208,.72);

          color-scheme: light;
        }

        /* The light page is one continuous ground, with no exceptions left.
           Components still draw windows, cards, plates and controls — those are
           objects on the floor — but no section gets a floor of its own.

           The orbit was the last one to have one and it gave it up: see the note
           on .orbf-panel for why a panel that works on black cannot work here.
           The rule stays as a catch, so a section that grows a ground later has
           to say so somewhere this file can see. */
        .lf[data-lf="light"] > section {
          background: transparent !important;
        }

        /* ---------- the drawn art ----------

           Three of the sections lean on SVG and PNG files rather than on CSS, and
           a file cannot read a token. Each one is handled by what it actually is:

           · The glows — the hero's wash and the conductor's two beams — are
             transparent orange over whatever is behind them, so they survive the
             swap and only need turning down.
           · The conductor drawing is line art at #FFFAE0, which is invisible on
             cream. It has a second file with the ink inverted, swapped by the
             section.
           · The orbit's wash is a PNG rather than an SVG, but it is the same
             kind of object as the others — transparent, orange, mostly empty — so
             it takes the same multiply. What the orbit does not keep on the light
             ground is a panel behind it; see the note on .orbf-panel. */
        /* ---------- the glows, on a ground that is already lit ----------

           Turning them down was not enough, and it was the wrong correction. All
           four are orange drawn to sit on black, where they work by adding light:
           the more of them there is, the brighter and more orange the pixel gets.
           Over clay that same addition has nowhere to go but toward white — the
           hero's wash was bleaching the ground out from under the page, which is
           why the top of it read as salmon rather than as clay with light on it.

           Multiply is the physical model for a light ground. It makes the orange
           behave as pigment rather than as a lamp: the core deepens toward
           terracotta, the falloff leaves the ground exactly as it found it, and
           the clay survives all the way up into the corner. It is also what the
           hero actually wants to say — the orb is the brightest thing in the
           frame, and on paper a bright thing darkens what is around it. */
        .lf[data-lf="light"] .hf-hero-gradient {
          opacity: .46; mix-blend-mode: multiply;
        }
        .lf[data-lf="light"] .cda-rake {
          opacity: .5; mix-blend-mode: multiply;
        }
        .lf[data-lf="light"] .cda-answer-beam {
          opacity: .85; mix-blend-mode: multiply;
        }

        /* The orb's own halo, and the same argument. On black it is the light
           spilling off it; on clay it was a pale ring with no falloff, which read
           as a smudge around the disc rather than as anything coming off it.
           Multiplied it becomes the warmth the orb throws onto the page, and the
           edge of the disc is the only hard edge again.

           Scoped to the landing: the same orb is on the product's screens, and
           those are dark and stay dark. */
        .lf[data-lf="light"] .orb-halo {
          opacity: .6; mix-blend-mode: multiply;
        }

        /* The conductor drawing swaps its file in ConductorSectionA's own block,
           where the two imported urls are in scope. */

        /* ---------- the switch ----------

           Bottom left: the variant switch owns the bottom right, and two
           floating controls in one corner is a toolbar. */
        .lf-toggle {
          position: fixed; z-index: 50; left: 20px; bottom: 20px;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px 9px 12px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(var(--lf-ink-rgb), .12);
          background: var(--lf-surface);
          box-shadow: var(--lf-shadow);
          font-family: var(--font-google-sans);
          font-size: 12.5px; font-weight: 500;
          color: rgba(var(--lf-ink-rgb), .68);
          transition: color .18s ease, border-color .18s ease, transform .18s ease;
        }
        .lf-toggle:hover {
          color: var(--lf-ink);
          border-color: rgba(var(--lf-ink-rgb), .26);
          transform: translateY(-1px);
        }
        .lf-toggle:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }

        @media (max-width: 620px) {
          /* the variant switch sits above it on a phone, so this one gets out of
             the way rather than stacking under it */
          .lf-toggle { padding: 9px; }
          .lf-toggle span { display: none; }
        }
      `}</style>
    </div>
  );
}
