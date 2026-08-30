import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { TaskCard } from "../../data";
import { Container } from "../../Container";
import { ArrowUpIcon, ChevronDownIcon } from "../../icons";
import { IntentPicker } from "../../IntentPicker";
import { HERO_INTENTS_C } from "../c/heroIntents";
import { OrbFace, type Mood } from "./OrbFace";
import { PresenceOrb } from "../../presence/PresenceOrb";
import { usePointerLean } from "../../presence/usePointerLean";
import { SiteHeaderF } from "./SiteHeaderF";
import heroGradientAsset from "../../../../assets/gradiente hero.svg";

/**
 * Whether the orb has a face. Off for now.
 *
 * Everything that drives the face is left standing behind this — the moods, the
 * flashes, the idle clock, the gaze. It costs a few listeners and no pixels, and
 * turning the face back on is this one line rather than a rebuild of the state
 * machine it needs. The review sheet at `?faces=1` is unaffected: it asks for the
 * expressions directly and is how you look at them while they are off the page.
 */
const EYES = false;

/**
 * F's hero. One column, three things: the orb, one line, one box.
 *
 * What it is not: E's hero opens a whole conversation in place — turns, a
 * thinking line, a bounded thread, a gate after two replies. None of that is
 * here. This is the version where the hero states the claim and hands over, and
 * everything it does not do is a decision rather than a gap.
 *
 * Three notes on what is here:
 *
 * · The orb is the page's only light source, so the room is darker than the
 *   product is. It has nowhere to fall off to otherwise.
 *
 * · It has a face, and the face is wired to what is actually happening rather
 *   than cycling. Everything continuous — typing, hovering, clicking into the
 *   box, going quiet — is read off the current state, and everything that is a
 *   moment rather than a state is a timed flash over the top of it. A face that
 *   changed on a timer would be a screensaver.
 *
 *   Clicking into the composer makes it look down, and that one is not
 *   decoration: the box is directly below the orb, so the eyes go to the thing
 *   you just touched. It is the only expression here that carries information
 *   the page does not otherwise state.
 *
 * · The composer is taller than one line needs. An empty box that looks like it
 *   expects a sentence gets a sentence; one that looks like a search field gets
 *   three words.
 *
 * · The intent chips sit under the box rather than above it. The box is the
 *   offer; the chips are for the visitor who has nothing to type, and putting
 *   them first would have the page ask you to pick a category before it asks you
 *   anything. Underneath, they read as the way out of a blank field rather than
 *   as a menu of departments.
 *
 *   They are the same picker C and D use, on the same five intents, because a
 *   visitor who meets "Research" here and a different word there is looking at
 *   two products. Centred to F's single column, and that is the whole difference.
 *
 * · Conductor Mode sits inside the box rather than being explained above it. It
 *   is a setting on the thing you are about to send, and it reads as one — the
 *   same control, in the same place, as the composer inside the product.
 */
export function HeroScreenF({
  onEnterGuest,
  onStartTask,
  onNavigateHome,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
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

    Collapsing the two into one setState is the version that goes wrong: the
    "happy" you set on send never comes back off, or the "focused" you set on
    every keystroke stamps over the flash you just started.
  */
  const [held, setHeld] = useState<Mood | null>(null);
  const [idle, setIdle] = useState(false);
  const [near, setNear] = useState(false);
  const [attending, setAttending] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const flash = useRef<number | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  /** the body noticing where you are — version E's lean, same numbers */
  const leanRef = usePointerLean<HTMLSpanElement>();

  const say = useCallback((mood: Mood, ms: number) => {
    if (flash.current) window.clearTimeout(flash.current);
    setHeld(mood);
    flash.current = window.setTimeout(() => setHeld(null), ms);
  }, []);

  useEffect(() => () => { if (flash.current) window.clearTimeout(flash.current); }, []);

  /*
    The order is the priority, and it is deliberate.

    A flash beats everything. Typing beats looking at the box, because once there
    are words the box is no longer the thing being considered. Hovering the orb
    beats resting. Sleepy sits under all of it, so any of the others wakes it
    without needing to say so.
  */
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
  // reach is the same wherever the pointer is instead of pinning the moment it
  // leaves the orb's own box.
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

  // Emptying the box after having written something is a different event from
  // never having written anything, and it is the one thing skeptical is for.
  const wrote = useRef(false);
  useEffect(() => {
    if (prompt.length > 0) { wrote.current = true; return; }
    if (wrote.current) { wrote.current = false; say("skeptical", 1400); }
  }, [prompt, say]);

  const handoff = useRef<number | null>(null);
  useEffect(() => () => { if (handoff.current) window.clearTimeout(handoff.current); }, []);

  const submit = () => {
    const said = prompt.trim();
    if (!said) { say("concerned", 1500); return; }

    // The pause is the point. Handing over on the same tick unmounts this hero
    // before a frame has been painted, so the face that acknowledges the message
    // was never once seen by anyone. Long enough to register as a nod, short
    // enough that nobody waits for it.
    say("happy", 1600);
    handoff.current = window.setTimeout(() => onEnterGuest(said), 420);
  };

  return (
    <section className="hero-f relative flex min-h-screen flex-col overflow-visible">
      <img
        className="hf-hero-gradient"
        src={heroGradientAsset}
        alt=""
        aria-hidden="true"
      />

      <SiteHeaderF
        onNavigateHome={onNavigateHome}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <main className="relative z-10 flex flex-1 items-center pb-24">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 48 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[640px] flex-col items-center text-center"
          >
            {/* Hovering it is curious, pressing it is surprised. Both are on the
                orb itself rather than on the section, so they mean the orb and
                not the page. */}
            <motion.div
              ref={orbRef}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hf-orb"
              onPointerEnter={() => setNear(true)}
              onPointerLeave={() => setNear(false)}
              onPointerDown={() => say("surprised", 1100)}
            >
              {/* The lean owns this element's transform outright, which is why it
                  is a wrapper and not the motion.div above it — that one is
                  already carrying the entry animation. */}
              <span ref={leanRef} className="hf-lean">
                {EYES ? (
                  <OrbFace mood={mood} size={128} gaze={gaze} />
                ) : (
                  <PresenceOrb state="resting" size={128} />
                )}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hf-line"
            >
              One AI for everything that matters to you.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="hf-box"
            >
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onFocus={() => setAttending(true)}
                onBlur={() => setAttending(false)}
                onKeyDown={(event) => {
                  // Enter sends, Shift+Enter breaks the line — the same contract
                  // the composer inside the product uses.
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                rows={2}
                placeholder="What do you want to get done?"
                className="hf-input"
                aria-label="What do you want to get done?"
              />

              <div className="hf-foot">
                <button type="button" className="hf-mode">
                  Conductor Mode
                  <ChevronDownIcon className="hf-chevron size-3" />
                </button>

                {/* Always there, unlike E's, which appears with the first
                    character. On a page whose only job is this box, a send button
                    that is missing until you type hides where the box goes. */}
                <button type="button" onClick={submit} className="hf-send" aria-label="Send">
                  <ArrowUpIcon className="size-4" />
                </button>
              </div>
            </motion.div>

            {/* Last in, after the box has landed. The order things arrive in is
                the order they are meant to be read in. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hf-intents"
            >
              <IntentPicker onStartTask={onStartTask} intents={HERO_INTENTS_C} align="center" />
            </motion.div>
          </motion.div>
        </Container>
      </main>

      <style>{`
        .hero-f { background: transparent; }
        .hf-hero-gradient {
          position: absolute; z-index: 0; top: 0; left: 0;
          width: min(90vw, 1324.8px); height: auto; max-width: none;
          pointer-events: none; user-select: none;
        }

        /* The orb is a control here — it answers to hover and to being pressed —
           so it says so. */
        .hf-orb { align-self: center; cursor: pointer; }
        .hf-lean { display: block; will-change: transform; }

        .hf-line {
          margin: 60px 0 0;
          font-family: var(--font-google-sans);
          font-size: 24px; line-height: 1.3; font-weight: 500;
          color: #fff; text-wrap: balance;
        }

        /* Taller than one line needs, deliberately — see the note above. */
        .hf-box {
          position: relative; width: 100%; margin-top: 38px;
          padding: 18px 18px 14px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.045);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .hf-box:focus-within { border-color: rgba(255,255,255,.22); background: rgba(255,255,255,.06); }

        .hf-input {
          width: 100%; resize: none; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; text-align: left;
        }
        .hf-input::placeholder { color: rgba(255,255,255,.34); }

        /* Both controls to the right, and nothing on the left. The row is what
           you do with what you have written, so it belongs beside the send. */
        .hf-foot {
          display: flex; align-items: center; justify-content: flex-end; gap: 12px;
          margin-top: 10px;
        }

        .hf-mode {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 8px; border: 0; border-radius: 999px; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; line-height: 1;
          color: rgba(255,255,255,.55);
          transition: color .18s ease, background-color .18s ease;
        }
        .hf-mode:hover { color: rgba(255,255,255,.82); background: rgba(255,255,255,.05); }
        .hf-mode:focus-visible { outline: 2px solid rgba(255,255,255,.5); outline-offset: 2px; }
        .hf-chevron { color: rgba(255,255,255,.35); }

        .hf-send {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: #f84600; color: #fff;
          transition: transform .18s ease, filter .18s ease;
        }
        .hf-send:hover { transform: scale(1.06); filter: brightness(1.06); }
        .hf-send:active { transform: scale(1); }
        .hf-send:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* Full width so the row centres in the column rather than in whatever
           the five chips happen to measure, and so the task cards that open under
           a chip have that width to lay out in. */
        .hf-intents { width: 100%; margin-top: 28px; }

        @media (max-width: 640px) {
          .hf-line { margin-top: 44px; font-size: 21px; }
          .hf-box { margin-top: 30px; padding: 16px 14px 12px; border-radius: 20px; }
        }
      `}</style>
    </section>
  );
}
