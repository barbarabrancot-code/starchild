import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "../../data";
import { Container } from "../../Container";
import { ArrowUpIcon, MicIcon, PlusIcon } from "../../icons";
import { OrbFace, type Mood } from "./OrbFace";
import { CharacterOrb } from "./CharacterOrb";
import { usePointerLean } from "../../presence/usePointerLean";
import { SiteHeaderF } from "./SiteHeaderF";
import heroGradientAsset from "../../../../design/assets/gradiente hero.svg";

/**
 * Whether the orb has a face drawn in SVG. Off.
 *
 * The character is the rendered one — `CharacterOrb`, from the clips in
 * assets/character. This flag is the drawn stand-in that predates it, kept
 * because the review sheet at `?faces=1` still reads the mood table it needs.
 * It is not an alternative to the character and turning it on replaces the
 * character with a gradient, which is a downgrade, not a variant.
 */
const EYES = false;

/** One fixed line, not a rotation — the claim the page opens on. */
const HEADLINE = "One AI for everything that matters to you.";

/**
 * The orb's diameter, and the unit the rest of the hero is measured in — see
 * the note further down on why the field and the bubble are written as
 * multiples of this rather than as pixel values.
 */
const ORB = 150;

/**
 * F's hero, back to the earlier shape: a headline, and the product's own
 * composer underneath it — the "+", the Conductor Mode pill, the circular
 * send/mic button, all exactly as ChatScreen's own composer draws them, so
 * the first thing anyone sees on the homepage is what they will see again
 * the moment they're signed in.
 *
 * The live-conversation version that lived here for a while — no headline,
 * the orb replying inline, the field left as one bare line — is gone. It
 * asked a real question of its own; what it traded away was the mode
 * selector and the shape of the real composer, and the page reads more like
 * the product with both back.
 */
export function HeroScreenF({
  onEnterGuest,
  onNavigateHome,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  /** Accepted and unused — kept so the page above doesn't have to change to
   *  try the hero with intent chips back. */
  onStartTask: (task: TaskCard) => void;
  onNavigateHome: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const typed = prompt.trim().length > 0;

  /*
    Two layers, because moods are two different kinds of thing.

    A state is true for as long as it is true — you are typing, you are hovering,
    you have gone quiet — and the face should hold it. A moment is over as soon
    as it has happened: you pressed send, you clicked the orb, you emptied the
    box. Those get a timed flash that sits on top and then falls away, and the
    state underneath is whatever it was.
  */
  const [held, setHeld] = useState<Mood | null>(null);
  const [idle, setIdle] = useState(false);
  const [near, setNear] = useState(false);
  const [attending, setAttending] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const flash = useRef<number | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const leanRef = usePointerLean<HTMLSpanElement>(ORB * 0.055);

  const say = useCallback((mood: Mood, ms: number) => {
    if (flash.current) window.clearTimeout(flash.current);
    setHeld(mood);
    flash.current = window.setTimeout(() => setHeld(null), ms);
  }, []);

  useEffect(() => () => { if (flash.current) window.clearTimeout(flash.current); }, []);

  const mood: Mood =
    held ??
    (typed ? "focused"
      : attending ? "down"
      : near ? "curious"
      : idle ? "sleepy"
      : "neutral");

  // Quiet for long enough that the room has stopped being about you. Reset by
  // anything at all, which is why it listens on the window and not on the orb.
  useEffect(() => {
    let timer = 0;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 18000);
    };
    wake();
    const events = ["pointermove", "pointerdown", "keydown", "scroll"];
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, wake));
    };
  }, []);

  // Where it looks. Normalised against the window rather than the orb, so the
  // reach is the same wherever the pointer is.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const box = orbRef.current?.getBoundingClientRect();
      if (!box) return;
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      setGaze({
        x: clamp((event.clientX - cx) / (window.innerWidth / 2)),
        y: clamp((event.clientY - cy) / (window.innerHeight / 2)),
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const submit = () => {
    if (!prompt.trim()) { say("concerned", 1500); return; }
    onEnterGuest(prompt.trim());
  };

  return (
    <section className="hero-f relative flex min-h-screen flex-col overflow-visible">
      <img className="hf-hero-gradient" src={heroGradientAsset} alt="" aria-hidden="true" />

      <SiteHeaderF
        onNavigateHome={onNavigateHome}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <main className="relative z-10 flex flex-1 items-center pb-20">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[600px] flex-col items-center text-center"
          >
            <motion.div
              ref={orbRef}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
              onPointerEnter={() => setNear(true)}
              onPointerLeave={() => setNear(false)}
              onPointerDown={() => say("surprised", 1100)}
            >
              <span ref={leanRef} className="hf-lean">
                {EYES
                  ? <OrbFace mood={mood} size={ORB} gaze={gaze} />
                  : <CharacterOrb state={typed ? "listening" : "resting"} size={ORB} />}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              /* hf-headline carries no rules of its own here — it is the hook
                 the design system hangs the Title role on, and only the page
                 that opts into the system defines it. */
              className="hf-headline mt-14 text-[26px] leading-[1.2] font-semibold text-balance text-white sm:text-[30px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {HEADLINE}
            </motion.h1>

            {/* The product's own composer chrome — "+", a mode pill, a
                circular send/mic — not a version drawn for the landing page.
                See ChatScreen's own composer for the pattern this matches. */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="hf-field mt-7 w-full"
              onSubmit={(event) => { event.preventDefault(); submit(); }}
            >
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onFocus={() => setAttending(true)}
                onBlur={() => setAttending(false)}
                placeholder="What do you want to get done?"
                aria-label="Message Starchild"
                className="hf-input"
              />
              <button type="button" className="hf-attach" aria-label="Add attachment">
                <PlusIcon className="size-[18px]" />
              </button>
              <span className="hf-mode">Conductor Mode</span>
              <button type="submit" className="hf-send" aria-label="Send">
                {typed ? <ArrowUpIcon className="size-4" /> : <MicIcon className="size-4" />}
              </button>
            </motion.form>
          </motion.div>
        </Container>
      </main>

      <style>{`
        .hero-f { background: transparent; }
        .hf-hero-gradient {
          position: absolute; z-index: 0; top: 0; left: 0;
          width: min(72vw, 1059.84px); height: auto; max-width: none;
          pointer-events: none; user-select: none;
        }
        .hf-lean { display: block; will-change: transform; }

        /* ---------- the field ----------
           Two rows stacked in one pill: the input on top, "+" / Conductor
           Mode / send along the bottom — same shape as ChatScreen's own
           composer, not a single-line field with a button on the end. */
        .hf-field {
          display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px;
          padding: 14px 16px 12px 20px;
          border: 1px solid var(--lf-ctl-edge); border-radius: 22px;
          background: var(--lf-field);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .hf-field:focus-within { border-color: var(--lf-ctl-edge-on); background: var(--lf-field-on); }

        .hf-input {
          flex: 1 1 100%; min-width: 0; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; text-align: left;
          color: var(--lf-ink);
        }
        .hf-input::placeholder { color: rgba(var(--lf-ink-rgb), calc(.44 + .56 * var(--lf-lift-t))); }

        .hf-attach {
          display: grid; place-items: center; flex: none; margin-right: auto;
          width: 32px; height: 32px; border: 0; border-radius: 999px; cursor: pointer;
          background: none; color: rgba(var(--lf-ink-rgb), .45);
          transition: background-color .15s ease, color .15s ease;
        }
        .hf-attach:hover { background: rgba(var(--lf-ink-rgb), .07); color: var(--lf-ink); }

        .hf-mode {
          flex: none; font-family: var(--font-google-sans); font-size: 13px; font-weight: 500;
          color: rgba(var(--lf-ink-rgb), .55); padding: 4px 2px;
        }

        .hf-send {
          display: grid; place-items: center; flex: none;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--lf-accent); color: var(--lf-on-accent, #fff);
          transition: transform .18s ease;
        }
        .hf-send:hover { transform: scale(1.06); }
        .hf-send:focus-visible { outline: 2px solid var(--lf-ink); outline-offset: 3px; }

        @media (max-width: 640px) {
          .hf-field { padding: 12px 12px 10px 16px; }
        }
      `}</style>
    </section>
  );
}
