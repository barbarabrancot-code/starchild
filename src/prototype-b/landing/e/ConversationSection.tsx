import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Container } from "../../Container";
import { ArrowUpIcon, DocumentIcon } from "../../icons";
import { ActivityLine } from "../../ActivityLine";
import { STILL, reveal } from "./still";

/**
 * Section 2 — what happens after you talk to it.
 *
 * One headline and one scene. No supporting line under the title: the scene is
 * the support, and a sentence explaining a conversation you are about to watch is
 * a sentence nobody needs.
 *
 * It arrives rather than being there. As the section comes up the scene lifts the
 * last of the way into place and the headline fades in over it, which is the other
 * half of the hero getting out of the way — between them the two sections read as
 * one handover instead of two screens meeting at an edge.
 *
 * And a way out. Below the panel there is one more anchor, large and centred and
 * holding nothing: as the section scrolls off, the orb leaves the mark it was
 * sitting on, comes back out from behind the panel at full size, and waits there
 * before travelling on. Without it the orb followed the mark up out of the window
 * and then sprang in from off-screen at the next section, which is a cut. This
 * makes the same move a departure.
 *
 * Four decisions:
 *
 * · Nothing of the page's orb comes inside the panel. It used to fly into a small
 *   mark beside Starchild's lines, which spent the page's one presence on a
 *   ten-pixel dot for the length of a section. Out here it keeps the size it
 *   already had, the panel covers it, and it comes back out underneath. One
 *   object, one move.
 *
 * · What the conversation produced is a row you could open, not a bubble. Dressing
 *   it as speech would make the plan another remark instead of the thing the
 *   remark was about.
 *
 * · The reaction on the last line is the only thing here belonging to neither
 *   speaker — it is what someone does when a reply lands, and one of them says
 *   more about the tone of the product than a paragraph would.
 *
 * · Pacing. Both replies wait, because both are doing something: one agrees to the
 *   work, one narrows it. A line that arrives instantly is a line nobody believes
 *   was thought about.
 */

type Beat =
  | { who: "you"; text: string }
  | { who: "ai"; text: string; thinks: string; reaction?: string }
  /** what the conversation produced — the one beat that is an object, not a line */
  | { who: "made"; label: string };

const BEATS: Beat[] = [
  { who: "you", text: "Turn this into a launch plan" },
  { who: "ai", thinks: "Reading the idea…", text: "Let's make it happen." },
  { who: "made", label: "Launch plan" },
  { who: "you", text: "What should I do first?" },
  { who: "ai", thinks: "Working out the order…", text: "Start with a small beta.", reaction: "😎" },
];

/** a reply you did not wait for is a reply nobody believes was thought about */
const THINK_MS = 900;
/** the breath between one beat landing and the next one starting */
const BEAT_MS = 520;

/** every beat arrives the same way — written once so none of them can drift */
const ENTER = reveal({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
});

export function ConversationSection({
  orbExit,
  orbZone,
}: {
  /** where the orb goes as this section leaves — see the note above */
  orbExit?: RefObject<HTMLDivElement>;
  /** the section itself — see OrbStop.zone for why this is not the anchor */
  orbZone?: RefObject<HTMLElement>;
}) {
  const scene = useRef<HTMLDivElement>(null);
  // Mutable on purpose: this ref is written by the callback below, which also
  // forwards the node to the page so the orb knows which section owns it.
  const shell = useRef<HTMLElement | null>(null);

  /*
    Measured against this section's own top crossing the window, so it does not
    care how tall the hero is or how tall the window is.

    It runs all the way to "start start" — the section's top reaching the top of
    the window — rather than stopping a quarter down. The moment this section's
    schedule is built around is the box finishing its climb over the orb, and that
    happens with the section top at zero. Ending the range earlier meant the one
    beat that matters fell outside it, so nothing could be timed to it.
  */
  const { scrollYProgress } = useScroll({ target: shell, offset: ["start end", "start start"] });
  /*
    The headline is genuinely last: it waits until the panel has the orb.

    Until then the orb is standing still in the middle of the window at three
    hundred pixels across, and this title would be printed across it. The fade
    starts where the panel's top edge passes the orb's top edge — from there
    there is a solid panel between the two and the title arrives on empty page.
  */
  const arriving = useTransform(scrollYProgress, [0.9, 1, 2], [0, 1, 1]);
  // Settled well before the cover, so the box is not still moving at the moment
  // it is supposed to be closing over something.
  const rise = useTransform(scrollYProgress, [0, 0.72, 2], [190, 0, 0]);
  // Once, and only when someone is looking at it. A scene that replays every time
  // it scrolls past stops being a scene and becomes a loop.
  const seen = useInView(scene, { once: true, amount: 0.35 });

  const [shown, setShown] = useState(STILL ? BEATS.length : 0);
  const [thinking, setThinking] = useState<string | null>(null);

  useEffect(() => {
    if (STILL || !seen) return;

    const timers: number[] = [];
    let at = 0;

    // Scheduled off one running clock rather than chained through callbacks, so
    // the whole sequence tears down in a single loop.
    BEATS.forEach((beat, i) => {
      if (beat.who === "ai") {
        const label = beat.thinks;
        timers.push(window.setTimeout(() => setThinking(label), at));
        at += THINK_MS;
      }

      timers.push(
        window.setTimeout(() => {
          setThinking(null);
          setShown(i + 1);
        }, at),
      );

      at += BEAT_MS;
    });

    return () => timers.forEach(window.clearTimeout);
  }, [seen]);

  return (
    <section
      className="cv-section"
      ref={(node) => {
        shell.current = node;
        if (orbZone) (orbZone as unknown as { current: HTMLElement | null }).current = node;
      }}
    >
      <Container>
        <motion.h2
          // Tied to the scroll rather than triggered by it: the headline resolves
          // as the section climbs, which is what makes it feel handed over rather
          // than switched on.
          style={STILL ? undefined : { opacity: arriving }}
          className="cv-title"
        >
          Just talk. Starchild figures out the rest
        </motion.h2>

        <motion.div className="cv-scene" ref={scene} style={STILL ? undefined : { y: rise }}>
          <div className="cv-beats">
            {BEATS.slice(0, shown).map((beat, i) => {
              const mine = beat.who === "you";

              return (
                <motion.div key={i} {...ENTER} className={mine ? "cv-turn cv-turn--mine" : "cv-turn"}>
                  {beat.who === "made" ? (
                    <button type="button" className="cv-made">
                      <DocumentIcon className="size-4" />
                      <span>{beat.label}</span>
                      <ArrowUpIcon className="cv-made-go size-4 rotate-90" />
                    </button>
                  ) : (
                    <p className={mine ? "cv-bubble cv-bubble--mine" : "cv-bubble"}>
                      {beat.text}
                      {beat.who === "ai" && beat.reaction && (
                        <motion.span
                          {...reveal({
                            initial: { opacity: 0, scale: 0.4 },
                            animate: { opacity: 1, scale: 1 },
                            transition: { duration: 0.42, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                          })}
                          className="cv-reaction"
                        >
                          {beat.reaction}
                        </motion.span>
                      )}
                    </p>
                  )}
                </motion.div>
              );
            })}

            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="cv-turn"
              >
                <div className="cv-waiting">
                  <ActivityLine label={thinking} />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Empty on purpose: the page's orb fills it on the way past. It is also
            the gap between this section and the next, which is why the section
            stops paying for that space in padding. */}
        <div ref={orbExit} className="cv-exit" aria-hidden="true" />
      </Container>

      <style>{`
        /*
          No z-index here, deliberately, and the top padding is short for a reason.

          This background is opaque, so with a layer of its own the section covered
          the orb across the full width of the window: a straight horizontal edge
          cutting a circle in half, which is a frame sliding up, not a box
          arriving. Left at auto it paints underneath the orb, and the only thing
          on the page that can cover the orb is .cv-scene — the box.

          That makes the padding structural rather than taste. The title sits
          between the top of the section and the top of the box, so this number
          decides where the title is at the moment the box finishes covering the
          orb. At 130 it was already off the top of the window by then.
        */
        .cv-section { position: relative; overflow: hidden; padding: 96px 0 40px; background: #050506; }

        /* The orb's size out here, and the air between the two sections. Both at
           once, because the space exists so the orb has somewhere to be. */
        .cv-exit { width: 380px; height: 380px; margin: 96px auto 0; }

        /* One line, no full stop, and no sentence under it. The scene below is the
           supporting copy. */
        .cv-title {
          max-width: 44ch; margin: 0 auto 44px;
          font-family: var(--font-google-sans);
          font-size: clamp(30px, 3.7vw, 50px); line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; color: #fff; text-align: center; text-wrap: balance;
        }

        /* ---------- the scene ---------- */

        /* In front of the orb, which is fixed and sits behind the page. This panel
           climbing over the orb IS the transition, which makes it the one surface
           here that has to be genuinely opaque. The two stops are the colours the
           old translucent white already resolved to over this background, so it
           looks no different anywhere except on top of the orb. */
        .cv-scene {
          position: relative; z-index: 6;
          max-width: 760px; margin: 0 auto;
          padding: 40px 46px 48px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, #0c0c0d 0%, #070708 100%);
        }
        /* The light comes from the side Starchild speaks from, so the frame is
           warmest where the marks are — the atmosphere and the presence are the
           same fact said twice. */
        .cv-scene::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(48% 62% at 6% 52%, rgba(248,70,0,.13) 0%, rgba(248,70,0,0) 72%);
        }

        /* A floor, so five beats arriving do not shove the page down five times
           while someone is reading it. Measured against the finished scene. */
        .cv-beats {
          position: relative;
          display: flex; flex-direction: column; gap: 18px;
          min-height: 322px;
        }

        .cv-turn { display: flex; align-items: center; }
        .cv-turn--mine .cv-bubble { margin-left: auto; }

        /* ---------- what is said ---------- */

        .cv-bubble {
          position: relative; max-width: 32ch; margin: 0;
          padding: 12px 19px; border-radius: 20px;
          background: rgba(255,255,255,.05);
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.5; color: rgba(255,255,255,.92);
        }
        /* Yours are quieter. You are prompting; it is answering. */
        .cv-bubble--mine {
          background: rgba(255,255,255,.035);
          color: rgba(255,255,255,.68);
        }

        /* Hung off the corner, half outside — the way a reaction sits on a message
           everywhere people actually send them. */
        .cv-reaction {
          position: absolute; right: 14px; bottom: -13px;
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px;
          background: #17171a; border: 1px solid rgba(255,255,255,.09);
          font-size: 13px; line-height: 1;
        }

        .cv-waiting { padding: 4px 0; }

        /* ---------- what it produced ---------- */

        .cv-made {
          display: flex; align-items: center; gap: 14px; cursor: pointer;
          min-width: 280px; max-width: 32ch;
          padding: 13px 18px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.028);
          font-family: var(--font-google-sans); font-size: 16px; color: #fff;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .cv-made:hover { border-color: rgba(255,255,255,.26); background: rgba(255,255,255,.05); }
        .cv-made > svg:first-child { color: rgba(255,255,255,.5); flex: none; }
        .cv-made span { flex: 1; text-align: left; }
        /* points along the row, not up out of it — this opens, it does not send */
        .cv-made-go { color: rgba(255,255,255,.4); flex: none; }

        @media (max-width: 820px) {
          .cv-section { padding: 90px 0 24px; }
          .cv-exit { width: 240px; height: 240px; margin-top: 64px; }
          .cv-title { margin-bottom: 40px; }
          .cv-scene { padding: 28px 20px 34px; border-radius: 22px; }
          .cv-mark--wait { left: -14px; }
          .cv-beats { gap: 14px; min-height: 280px; }
          .cv-turn { gap: 10px; }
          .cv-bubble { max-width: 80%; font-size: 15.5px; padding: 11px 16px; }
          .cv-made { min-width: 0; max-width: 80%; font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
