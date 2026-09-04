import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TaskCard } from "../../data";
import { Container } from "../../Container";
import { ArrowUpIcon } from "../../icons";
import { OrbFace, type Mood } from "./OrbFace";
import { PresenceOrb, type OrbState } from "../../presence/PresenceOrb";
import { CharacterOrb } from "./CharacterOrb";
import { usePointerLean } from "../../presence/usePointerLean";
import { ThinkingLine } from "../../ThinkingLine";
import { replyTo } from "../e/heroReplies";
import { SiteHeaderF } from "./SiteHeaderF";
import heroGradientAsset from "../../../../assets/gradiente hero.svg";

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

/**
 * The line it opens on.
 *
 * One, not a rotation. A greeting that cycles is a screensaver — it says the
 * page is running rather than that something is paying attention. This arrives
 * once, a beat after the page settles, which is the difference between being
 * greeted and being advertised at.
 */
const OPENER = "What are we thinking through today?";

/** how long the orb waits before speaking — long enough to read as noticing you */
const OPENS_AT = 900;

/**
 * The orb's diameter, and the unit the rest of the hero is measured in.
 *
 * Everything around it — how wide the column runs, how far the field sits below
 * the centre, where the bubble hangs — is written as a multiple of this rather
 * than as a pixel value that happened to look right at one size. Growing the orb
 * used to leave the field and the bubble where they were, which is how a
 * composition comes apart: the orb took half the column and the gap under it
 * stopped clearing its own glow.
 *
 * The multiples themselves come off the reference: the field runs three orbs
 * wide, and the orb's halo is 2.25 orbs across, so three is also the narrowest
 * the column can be before the glow reaches the field's edges.
 */
const ORB = 288;

type Turn = { id: number; who: "them" | "you"; text: string };

/**
 * F's hero.
 *
 * The orb speaks first, and the conversation it starts stays on this page.
 *
 * What this replaces: a headline making a claim, a composer with a mode
 * selector, six intent chips, and a send button that took you to another screen.
 * All of it was the page talking about itself before anyone had said anything —
 * and the one moment worth having, somebody typing a real sentence, was answered
 * by becoming a different page.
 *
 * So the furniture is gone and the exchange happens here:
 *
 * · The orb opens. It is the only thing on the page that can be proactive
 *   without being pushy, because it is a presence rather than a banner — a
 *   question from it reads as attention, where the same words in a headline read
 *   as marketing.
 *
 * · The field is a field. One line, a placeholder, a send. No mode to choose
 *   before you have said anything: Conductor Mode is a setting on work that
 *   exists, and on an empty page it was a decision asked of somebody with
 *   nothing to decide about yet.
 *
 * · Sending keeps you here. The orb shrinks and becomes the mark beside what it
 *   says — the same object doing the job an avatar does in every chat — and the
 *   turns stack under it. The composer does not move.
 *
 * The replies are version E's, from ../e/heroReplies, and they follow its two
 * rules: none of them claims to have done the work, and each ends somewhere
 * different. A landing page that fakes a finished answer has lied about the
 * product before anyone has used it.
 *
 * It stops offering after two of your messages. That is not a paywall dressed as
 * a demo — the third answer would need to remember the first two, and
 * remembering is the thing an account is for.
 */
export function HeroScreenF({
  onEnterGuest,
  onNavigateHome,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onEnterGuest: (prompt?: string) => void;
  /**
   * Accepted and unused. The intent chips this fed are gone — see the note
   * above — and the handler stays in the signature so the page above does not
   * have to change to try the hero with them back.
   */
  onStartTask: (task: TaskCard) => void;
  onNavigateHome: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const typed = prompt.trim().length > 0;

  /* The conversation. `turns` holds both sides in order; the opener is pushed
     into it like any other turn rather than being a special case, so the thread
     only ever has one shape to render. */
  const [turns, setTurns] = useState<Turn[]>([]);
  const [thinking, setThinking] = useState<string | null>(null);
  const nextId = useRef(0);

  /** whether the person has spoken — which is what moves the orb out of the way */
  const live = turns.some((turn) => turn.who === "you");
  const mine = turns.filter((turn) => turn.who === "you").length;
  const spent = mine >= 2 && !thinking;

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
  /* The body noticing where you are.
     Version E's lean, scaled to this orb rather than left at E's nine pixels:
     the character holds one frame, so this is the only thing on it that moves,
     and a lean that is 3% of the body reads as the page having stuttered. */
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

  /* What the orb is doing, in its own vocabulary. Working while it composes,
     listening while you type, resting otherwise — the same four states the orb
     uses inside the product, so it behaves here the way it behaves there. */
  const orbState: OrbState = thinking ? "working" : typed ? "listening" : "resting";

  /* It speaks a beat after the page settles rather than on the first frame:
     arriving with the layout would make it part of the furniture, and the point
     is that it noticed you. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTurns((now) => (now.length ? now : [{ id: nextId.current++, who: "them", text: OPENER }]));
    }, OPENS_AT);
    return () => window.clearTimeout(timer);
  }, []);

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

  const answering = useRef<number | null>(null);
  useEffect(() => () => { if (answering.current) window.clearTimeout(answering.current); }, []);

  const submit = () => {
    const said = prompt.trim();
    if (!said || thinking) { if (!said) say("concerned", 1500); return; }

    setPrompt("");
    setTurns((now) => [...now, { id: nextId.current++, who: "you", text: said }]);
    say("happy", 1200);

    /* The pause before the answer is not decoration. A reply that lands on the
       same tick as the question reads as a lookup, and what this is meant to
       look like is something considering what you said. */
    const reply = replyTo(said);
    setThinking(reply.thinking);
    answering.current = window.setTimeout(() => {
      setThinking(null);
      setTurns((now) => [...now, { id: nextId.current++, who: "them", text: reply.text }]);
    }, 1500);
  };

  return (
    <section
      className="hero-f relative flex min-h-screen flex-col overflow-visible"
      style={{ ["--hf-orb" as string]: `${ORB}px` }}
    >
      <img className="hf-hero-gradient" src={heroGradientAsset} alt="" aria-hidden="true" />

      <SiteHeaderF
        onNavigateHome={onNavigateHome}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* No items-center and almost no bottom padding: the column stretches to
          fill this, and what gets centred inside it is the orb rather than the
          orb-and-field taken together. Centring the group put the orb visibly
          above the middle of the screen, which is the one thing on this page
          that should be in the middle of it. */}
      <main className="relative z-10 flex flex-1 pb-10">
        <Container className="w-full">
          <div className={`hf-column${live ? " hf-column--live" : ""}`}>
            {/* ---------- before you have said anything ----------
                The orb at full size with what it said beside it. Not centred
                under a headline, because there is no headline: the sentence in
                the bubble is the only claim the page makes at this point, and it
                is a question. */}
            {!live && (
              <div className="hf-open">
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
                  {/* The lean owns this element's transform outright, which is
                      why it is a wrapper and not the motion.div above it. */}
                  <span ref={leanRef} className="hf-lean">
                    {EYES
                      ? <OrbFace mood={mood} size={ORB} gaze={gaze} />
                      : <CharacterOrb state={orbState} size={ORB} />}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {turns.length > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="hf-greeting"
                    >
                      {turns[0].text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ---------- once it is a conversation ----------
                The same turns, now as a thread. The orb is the mark on what it
                says, which is the job it was already doing — it has only got
                smaller and moved to where the words are. */}
            {live && (
              <motion.div
                className="hf-thread"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                role="log"
                aria-live="polite"
              >
                {turns.map((turn) => (
                  <motion.div
                    key={turn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className={turn.who === "you" ? "hf-turn hf-turn--you" : "hf-turn"}
                  >
                    {turn.who === "them" && (
                      <span className="hf-mark" aria-hidden="true">
                        <PresenceOrb state={orbState} size={20} />
                      </span>
                    )}
                    <p className="hf-said">{turn.text}</p>
                  </motion.div>
                ))}

                {thinking && (
                  <div className="hf-turn">
                    <ThinkingLine label={thinking} />
                  </div>
                )}

                {/* Said plainly rather than as a wall. The honest reason it stops
                    is the reason it is written here. */}
                <AnimatePresence>
                  {spent && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="hf-spent"
                    >
                      Anything past this needs me to remember the first two.
                      <button type="button" onClick={() => onEnterGuest()}>Keep going</button>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ---------- the field ----------
                One line and a send. It sits in the same place before and after
                the conversation opens, so the thing you type into never moves. */}
            <motion.form
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="hf-field"
              onSubmit={(event) => { event.preventDefault(); submit(); }}
            >
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onFocus={() => setAttending(true)}
                onBlur={() => setAttending(false)}
                placeholder="Message…"
                aria-label="Message Starchild"
                className="hf-input"
              />
              <button type="submit" className="hf-send" aria-label="Send" disabled={!typed || !!thinking}>
                <ArrowUpIcon className="size-4" />
              </button>
            </motion.form>
          </div>
        </Container>
      </main>

      <style>{`
        .hero-f { background: transparent; }
        .hf-hero-gradient {
          position: absolute; z-index: 0; top: 0; left: 0;
          width: min(72vw, 1059.84px); height: auto; max-width: none;
          pointer-events: none; user-select: none;
        }

        /* One column for both states. It is the same box before and after, which
           is what lets the field stay where it is while everything above it
           changes. */
        /* Three orbs wide. Not a pixel value: at 128 that was 384 and at 192 it
           is 576, and the relationship between the field and the thing above it
           is what the eye is actually reading. A message field as wide as a
           paragraph asks for a paragraph, and one narrower than the orb's own
           glow looks like it is being squeezed by it. */
        .hf-column {
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 100%; max-width: calc(var(--hf-orb) * 3); margin: 0 auto; min-height: 100%;
        }

        /* Before the conversation opens the field is taken out of the flow, so
           the only thing left in it is the orb — which is then what
           justify-content centres. The field hangs off the centre by the orb's
           radius plus the gap, so the two keep their spacing without the field
           having any say in where the orb lands.

           It goes back into the flow once there is a thread, because a thread and
           a field are a stack and the orb is no longer the subject. */
        .hf-column:not(.hf-column--live) .hf-field {
          position: absolute; left: 0; right: 0;
          /* Half an orb to clear the disc, then another 0.375 of one for the gap.
             A flat 44px cleared the 128 orb and sat inside the 192 one's glow. */
          top: calc(50% + var(--hf-orb) * 0.875);
          margin-top: 0;
        }

        /* ---------- the opening ---------- */

        /* The bubble sits beside the orb, not under it. Under, it reads as a
           caption on a graphic; beside, it reads as something the graphic said. */
        /* The orb is centred on the column and the bubble hangs off it, rather
           than the pair being centred as a block. Two reasons, and the second is
           the one that matters: as a block the orb sat visibly left of the field
           below it — and worse, it moved. The bubble arrives 900ms after the
           page, so in flow the orb slid leftward at the moment it spoke, which
           reads as the page reflowing rather than as something answering. Out of
           the flow, the orb lands once and stays. */
        .hf-open {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 100%;
        }
        .hf-orb { flex: none; cursor: pointer; }
        .hf-lean { display: block; will-change: transform; }

        .hf-greeting {
          /* Up and to the right of the orb: the bubble's bottom edge sits on the
             orb's top edge, so it reads as having come out of it. 96 is the orb's
             radius — the horizontal offset is that plus a gap, the vertical is
             that exactly. Both move with the orb's size and nothing else does,
             which is why they are written as the radius and not as a distance.

             Placed by bottom rather than by top-plus-translate, and that is not a
             style preference. This is a motion.p, and Motion writes transform
             inline to run its own entrance — so any transform set here is
             overwritten the moment the element animates, which is why the two
             previous attempts at this both rendered top-aligned regardless of
             what the rule said. bottom is a property Motion does not touch. */
          position: absolute; left: 50%; bottom: calc(50% + var(--hf-orb) / 2);
          margin: 0 0 0 calc(var(--hf-orb) * 0.62);
          max-width: calc(var(--hf-orb) * 1.45);
          width: max-content;
          padding: 14px 18px; border-radius: 16px 16px 16px 4px;
          background: rgba(var(--lf-accent-rgb), calc(.12 + .06 * var(--lf-lift-f)));
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.4; text-align: left;
          color: var(--lf-ink);
        }

        /* ---------- the conversation ---------- */

        /* Fixed height with the turns pinned to the bottom: new ones push the old
           ones up rather than pushing the field down the page. A composer that
           walks toward the fold while somebody is reading is a composer they
           lose. What leaves the top is taken by the mask, not by the header. */
        .hf-thread {
          display: flex; flex-direction: column; justify-content: flex-end; gap: 14px;
          width: 100%; min-width: 0; height: 300px; margin-bottom: 4px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 56px);
          mask-image: linear-gradient(to bottom, transparent 0, #000 56px);
        }

        /* min-width: 0 on the row and width on the text, because a flex item
           whose content cannot shrink below its longest word will push past its
           track instead of wrapping — and the mask on the thread then cuts it.
           The pair of them is the standard guard against exactly that. */
        .hf-turn { display: flex; align-items: flex-start; gap: 10px; min-width: 0; width: 100%; }
        .hf-turn--you { justify-content: flex-end; }

        .hf-mark { flex: none; margin-top: 5px; }

        .hf-said {
          min-width: 0; max-width: 78%; margin: 0;
          overflow-wrap: anywhere;
          font-family: var(--font-google-sans);
          font-size: 15.5px; line-height: 1.5; text-align: left;
          color: rgba(var(--lf-ink-rgb), calc(.82 + .18 * var(--lf-lift-t)));
        }
        /* Only your side gets a bubble. Starchild is the page talking and sits on
           the ground the way body copy does — bubbling both sides makes the reply
           look like a quotation rather than an answer. */
        .hf-turn--you .hf-said {
          padding: 11px 15px; border-radius: 16px 16px 4px 16px;
          background: rgba(var(--lf-ink-rgb), calc(.07 + .93 * var(--lf-lift-f)));
          color: var(--lf-ink);
        }

        .hf-spent {
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
          margin: 2px 0 0;
          font-family: var(--font-google-sans); font-size: 13.5px;
          color: rgba(var(--lf-ink-rgb), calc(.5 + .5 * var(--lf-lift-t)));
        }
        .hf-spent button {
          padding: 0; border: 0; background: none; cursor: pointer;
          font: inherit; color: var(--lf-accent-ink);
        }
        .hf-spent button:hover { opacity: .78; }
        .hf-spent button:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; border-radius: 4px; }

        /* ---------- the field ---------- */

        .hf-field {
          display: flex; align-items: center; gap: 10px;
          width: 100%; margin-top: 44px;
          padding: 8px 8px 8px 20px;
          border: 1px solid var(--lf-ctl-edge); border-radius: 999px;
          background: var(--lf-field);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .hf-field:focus-within { border-color: var(--lf-ctl-edge-on); background: var(--lf-field-on); }

        .hf-input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px;
          color: var(--lf-ink);
        }
        .hf-input::placeholder { color: rgba(var(--lf-ink-rgb), calc(.44 + .56 * var(--lf-lift-t))); }

        .hf-send {
          display: grid; place-items: center; flex: none;
          width: 38px; height: 38px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--lf-accent); color: #fff;
          transition: transform .18s ease, opacity .18s ease;
        }
        .hf-send:hover:not(:disabled) { transform: scale(1.06); }
        /* Dimmed rather than hidden: on a page whose one job is this field, a send
           that disappears takes the field's own edge with it. */
        .hf-send:disabled { opacity: .4; cursor: default; }
        .hf-send:focus-visible { outline: 2px solid var(--lf-ink); outline-offset: 3px; }

        @media (max-width: 640px) {
          /* Back into the flow on a phone: there is no room beside the orb, and
             an absolutely placed bubble at this width runs off the edge. */
          .hf-open { flex-direction: column; gap: 16px; }
          /* Back in the flow: at this width there is no room to hang the field
             off the centre without it colliding with the orb. */
          .hf-column:not(.hf-column--live) .hf-field { position: static; margin-top: 22px; }
          .hf-greeting {
            position: static; margin: 0; bottom: auto;
            max-width: 100%; text-align: center; border-radius: 16px;
          }
          .hf-thread { height: 260px; }
          .hf-field { margin-top: 22px; }
        }
      `}</style>
    </section>
  );
}
