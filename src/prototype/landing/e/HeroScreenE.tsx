import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { TaskCard } from "../../data";
import { ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { SiteHeaderE } from "./SiteHeaderE";
import { OrbLoop } from "./OrbLoop";
import { STILL } from "./still";
import { replyTo } from "./heroReplies";
import { ActivityLine } from "../../ActivityLine";
import type { OrbState } from "../../presence/PresenceOrb";

/**
 * Version E's hero.
 *
 * D put the product's empty screen on the homepage. E keeps that idea and strips
 * it further: the orb, one line, and somewhere to type. Nothing else is in the
 * frame — no chips, no second CTA, no argument.
 *
 * What changed from D, and why:
 *
 *   · the headline drops from 30px to 22px. At hero size it was a banner making a
 *     claim; at this size it is a caption on the orb, which is what it actually
 *     is. The orb carries the weight and the line explains it.
 *
 *   · the chips are gone. They gave five ways in before anyone had been given
 *     one, which is a menu, not an invitation. The box asks a question; a question
 *     with six answers stapled under it is not a question.
 *
 *   · the send button only exists once there is something to send. On an empty
 *     box it is a control pointing at nothing.
 *
 * And the exchange happens here.
 *
 * Every other version answers the hero's box by navigating somewhere else, which
 * costs the one thing the box just earned — someone typed a real sentence and the
 * page's reply was to become a different page. So the headline gives way, the
 * conversation opens under the orb, and nothing moves.
 *
 * When the first message is sent the orb does not stay where it was. It shrinks
 * and goes to sit beside the reply, as the face of the thing that said it — the
 * same object, doing the job an avatar does in every chat. Nothing about that is
 * a second orb: the anchor it is chasing simply moved and got smaller, and it
 * springs there like it springs anywhere else.
 *
 * The composer does not move. Once the conversation opens the thread becomes a
 * box of fixed height with its contents pinned to the bottom, so new turns push
 * the old ones up rather than pushing the box down the page — a composer that
 * walks toward the fold while someone is reading is a composer they lose. What
 * scrolls past the top is taken by a mask instead of meeting the header.
 *
 * On the way out it gets out of the way. Scrolling fades the headline and the box
 * and lifts them slightly, so the section underneath is not arriving on top of a
 * hero that is still shouting.
 *
 * The orb does the opposite. It swells and sinks, and the panel below rises over
 * it — the two sections are joined by an occlusion rather than by a crossfade,
 * which is why it reads as one thing passing behind another instead of two screens
 * trading places. It comes back out the far side as the mark on the first reply.
 *
 * It stops after two turns. That is not a paywall dressed as a demo: two is where
 * a homepage stops being able to help honestly, because the third answer needs to
 * remember the first two, and remembering is the thing an account is for. The card
 * that appears says exactly that.
 */
export function HeroScreenE({
  orbAnchor,
  orbClip,
  onOrbState,
  onEnterGuest,
  onNavigateTraders,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  /** where the page's one orb sits while the hero is the section being read */
  orbAnchor: RefObject<HTMLDivElement>;
  /** the box the anchor scrolls inside, so the orb knows when it has left it */
  orbClip?: RefObject<HTMLDivElement>;
  /** the hero drives the page's orb while the conversation is its own */
  onOrbState?: (state: OrbState) => void;
  onEnterGuest: (prompt?: string) => void;
  // Accepted so E's signature stays interchangeable with C's and D's, and
  // deliberately unwired for the same reasons they are there.
  onStartTask: (task: TaskCard) => void;
  onNavigateTraders: () => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const typed = prompt.trim().length > 0;

  /** what has been said, oldest first */
  const [turns, setTurns] = useState<{ who: "you" | "ai"; text: string }[]>([]);
  /** the grey line's label while Starchild is working, or null when it is not */
  const [thinking, setThinking] = useState<string | null>(null);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  /** the box the turns scroll inside — see the mask on .he-scroll */
  const own = useRef<HTMLDivElement>(null);
  const scroller = orbClip ?? own;

  // Bound to the hero's own box rather than to a viewport height, so it behaves
  // the same on every screen: 0 while the hero fills the window, 1 once its foot
  // has reached the top of it.
  const shell = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: shell, offset: ["start start", "end start"] });
  // Gone before the orb is large. The column sits in front of the orb, so a
  // headline still at 15% while a 400px sun rises behind it reads as text printed
  // on the sun rather than as a screen that has handed over.
  /*
    Gone early, and further than it looks like it needs to go.

    The headline and the composer sit below the orb and travel up past it as you
    scroll, and the orb no longer drops out of their way — it holds still and
    grows. So they have about two hundred pixels of scroll before they are on top
    of it, and a headline printed at twelve per cent across a bright orange circle
    reads as a mistake rather than as a fade. They have to be finished before they
    get there.
  */
  // Three points, not two, and the third is doing real work: with a two-point
  // range this kept interpolating past the end and the headline faded back in
  // over the orb at a third of a percent per pixel. Pinning zero at the far end
  // is what actually holds it gone.
  const leaving = useTransform(scrollYProgress, [0, 0.18, 1], [1, 0, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.18, 1], [0, -60, -60]);

  /*
    The orb does not leave with the rest of the hero — it grows and sinks, and the
    section below rises over it. Both of those are done to the anchor rather than
    to the orb: FlightOrb takes its size and its position from the box it is flying
    to, so growing the box grows the orb, and the spring keeps it from being a
    scrub. That is what stops this being a second animation that could fall out of
    step with the first.
  */
  // Late, so it is still growing when the panel gets there. Growing early and
  // then holding reads as two moves; growing into the occlusion reads as one.
  //
  // Two fifty and not four thirty: the box has to cover this whole circle
  // while its own title is still on the window, and the title sits above the box.
  // Every pixel the orb grows is a pixel further the box has to climb before the
  // title is allowed to appear, and much past this the title has nowhere left.
  const swell = useTransform(scrollYProgress, [0.2, 0.85, 1], [180, 250, 250]);

  /*
    Held, not moved.

    The anchor is in the flow, so the page carries it upward exactly as fast as you
    scroll. Offsetting it by the same amount cancels that out and the orb stays
    where it is in the window while everything else travels past — which is what
    makes the panel rising over it read as an occlusion rather than as two things
    passing each other. It moved before, and a moving orb plus a moving panel is a
    collision nobody can follow.
  */
  const sink = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  const asked = turns.filter((t) => t.who === "you").length;
  /** where the orb lives once the conversation has started */
  const lastReply = turns.map((t) => t.who).lastIndexOf("ai");
  /** two turns in, the honest thing to offer is the product rather than a third */
  const spent = asked >= 2 && !thinking;
  const open = turns.length > 0;

  const submit = () => {
    const said = prompt.trim();
    if (!said || thinking) return;

    // Past two, the box hands over rather than answering — and it carries the
    // sentence with it, so nothing has to be typed twice.
    if (asked >= 2) {
      onEnterGuest(said);
      return;
    }

    const reply = replyTo(said);
    setTurns((prev) => [...prev, { who: "you", text: said }]);
    setPrompt("");
    setThinking(reply.thinking);
    onOrbState?.("working");

    timer.current = window.setTimeout(() => {
      setTurns((prev) => [...prev, { who: "ai", text: reply.text }]);
      setThinking(null);
      onOrbState?.("resolved");
    }, 1700);
  };

  // Newest at the bottom, always. The thread is bottom-anchored, so this only has
  // to run once there is more of it than the box holds.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, thinking]);

  // The orb leans in while something is being typed, the same way it does in the
  // product's own composer.
  useEffect(() => {
    if (thinking) return;
    onOrbState?.(typed ? "listening" : open ? "resolved" : "resting");
  }, [typed, thinking, open, onOrbState]);

  return (
    <section ref={shell} className="hero-e relative flex min-h-screen flex-col overflow-hidden">
      <SiteHeaderE
        onNavigateHome={() => {}}
        onNavigateTraders={onNavigateTraders}
        onNavigatePricing={onNavigatePricing}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <main className="relative z-10 flex flex-1 items-center pb-24">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[560px] flex-col items-center text-center"
          >
            {/* Not the orb — the space it stands in, and only while there is
                nothing to say. Once the conversation opens, the anchor moves down
                to the newest reply and the orb goes with it.

                It is deliberately outside the block that fades and lifts below.
                Inside it, the seat inherited that lift and the orb drifted forty
                pixels up the screen while it was supposed to be standing still. */}
            {!open && (
              <motion.div
                ref={orbAnchor}
                className="he-orb-slot"
                aria-hidden="true"
                style={STILL ? undefined : { width: swell, height: swell, y: sink }}
              >
                {STILL && <OrbLoop size={180} />}
              </motion.div>
            )}

            <motion.div
              // The headline and the box leave together — a headline that fades
              // while the box it belongs to stays put reads as two elements rather
              // than as one screen handing over.
              style={STILL ? undefined : { opacity: leaving, y: lift }}
              className="flex w-full flex-col items-center"
            >
            <AnimatePresence mode="wait">
              {!open ? (
                    <motion.h1
                  key="line"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-16 text-[22px] leading-[1.3] font-medium text-balance text-white"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  One AI for everything that matters to you.
                </motion.h1>
              ) : (
                /* The headline was an introduction. Once there is a conversation it
                   is talking over it, so it goes. */
                <motion.div
                  key="thread"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  ref={scroller}
                  className="he-scroll"
                >
                  <div className="he-thread">
                  {turns.map((turn, i) => {
                    const mine = turn.who === "you";
                    // Only the newest reply holds the anchor — there is one orb, and
                    // it is present at the last thing it said. The ones above it get
                    // a settled mark instead, which is the same distinction the
                    // roster makes between working and done.
                    const live = !mine && i === lastReply;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={mine ? "he-row he-row--mine" : "he-row"}
                      >
                        {!mine &&
                          (live ? (
                            <span ref={orbAnchor} className="he-face" aria-hidden="true">
                              {STILL && <OrbLoop size={30} />}
                            </span>
                          ) : (
                            <span className="he-face he-face--past" aria-hidden="true" />
                          ))}
                        <p className={mine ? "he-said he-said--mine" : "he-said"}>{turn.text}</p>
                      </motion.div>
                    );
                  })}

                  {thinking && (
                    <div className="he-row">
                      {/* no face on this one: the orb is still on the reply above,
                          and the thinking line carries its own small presence */}
                      <span className="he-face he-face--empty" aria-hidden="true" />
                      <div className="he-thinking">
                        <ActivityLine label={thinking} />
                      </div>
                    </div>
                  )}

                  {spent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="he-gate"
                    >
                      <p className="he-gate-line">Keep this conversation going.</p>
                      <p className="he-gate-sub">
                        Create an account to save this chat and let Starchild remember the context.
                      </p>
                      <button type="button" onClick={onSignUp} className="he-gate-go">
                        Create a free account
                      </button>
                    </motion.div>
                  )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="he-box mt-6 w-full"
            >
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  // Enter sends, Shift+Enter breaks the line — the same contract the
                  // composer inside the product uses
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                rows={open ? 2 : 3}
                placeholder={
                  spent ? "Keep going in Starchild…" : open ? "Say more…" : "What's on your mind?"
                }
                className="he-input"
              />

              {/* Appears with the first character and leaves with the last. On an
                  empty box it would be a button that does nothing, and a dead
                  control is worse than none. */}
              <motion.button
                type="button"
                onClick={submit}
                aria-label="Send"
                initial={false}
                animate={{ opacity: typed ? 1 : 0, scale: typed ? 1 : 0.8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ pointerEvents: typed ? "auto" : "none" }}
                className="he-send"
              >
                <ArrowUpIcon className="size-4" />
              </motion.button>
            </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </main>

      <style>{`
        /* Darker than the rest of the page on purpose: the orb is the only source
           of light in the frame, and it needs somewhere to fall off to. */
        .hero-e { background-color: #050506; }

        /* the orb is 180px and fixed to the viewport; this is the hole it sits in */
        .he-orb-slot { width: 180px; height: 180px; }

        /* The glow the orb throws into the room, sitting behind everything.

           Masked at the foot because the section below is opaque and cuts this
           rectangle off dead straight. Invisible while the orb sat in the middle
           of the hero; the moment the orb holds still and the next section climbs
           over it, that straight edge is the first thing you see. */
        .hero-e::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(56% 44% at 50% 40%, rgba(248,70,0,.09) 0%, rgba(248,70,0,0) 72%);
          -webkit-mask-image: linear-gradient(180deg, #000 62%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 62%, transparent 100%);
        }

        /* Taller than it needs to be for one line, deliberately. An empty box that
           looks like it expects a sentence gets a sentence; one that looks like a
           search field gets three words. */
        .he-box {
          position: relative;
          padding: 18px 20px 20px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .he-box:focus-within { border-color: rgba(255,255,255,.26); background: rgba(255,255,255,.06); }

        .he-input {
          width: 100%; resize: none; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; text-align: left;
        }
        .he-input::placeholder { color: rgba(255,255,255,.32); }

        /* ---------- the exchange ---------- */

        /*
          Fixed height from the first message, contents pinned to the bottom. The
          composer under it therefore never moves, and new turns arrive by pushing
          the older ones up and out — which is the direction a conversation goes.

          The mask is what happens at the top instead of a hard edge running into
          the header. It is a fade, not a scrollbar: the page above is dark and a
          line across it would read as a panel nobody drew.
        */
        .he-scroll {
          width: 100%; margin-top: 24px;
          height: min(46vh, 430px);
          overflow-y: auto; overscroll-behavior: contain;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 64px);
          mask-image: linear-gradient(to bottom, transparent 0, #000 64px);
        }
        .he-scroll::-webkit-scrollbar { width: 0; }
        .he-scroll { scrollbar-width: none; }

        .he-thread {
          display: flex; flex-direction: column; justify-content: flex-end; gap: 16px;
          min-height: 100%; padding-top: 64px; text-align: left;
        }

        .he-row { display: flex; align-items: flex-start; gap: 12px; }
        .he-row--mine { justify-content: flex-end; }

        /* The orb's seat beside a reply. It is empty for the live one — the page's
           orb flies in and fills it — and drawn for the ones above. */
        .he-face { flex: none; width: 30px; height: 30px; margin-top: 6px; }
        .he-face--past {
          border-radius: 999px;
          background: rgba(248,70,0,.42);
          transform: scale(.34); transform-origin: center;
        }
        .he-face--empty { background: none; }

        /* Left for Starchild, right for you, and the widths differ — a reply that
           filled the column would read as a document rather than as a turn. */
        .he-said {
          max-width: 92%; margin: 0;
          padding: 13px 18px; border-radius: 18px 18px 18px 5px;
          background: rgba(255,255,255,.05);
          font-family: var(--font-google-sans);
          font-size: 15.5px; line-height: 1.55; color: rgba(255,255,255,.88);
        }
        .he-said--mine {
          max-width: 78%;
          border-radius: 18px 18px 5px 18px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
          color: #fff;
        }

        .he-thinking { padding: 8px 0; }

        /* Not a wall. It says what it cannot do and why, which is the only version
           of this someone reads instead of scrolling past. */
        .he-gate {
          /* pushed in to the replies' edge, so it reads as part of the exchange
             rather than as a banner the page dropped underneath it */
          margin: 6px 0 0 42px; padding: 18px 20px 20px;
          border-radius: 18px; border: 1px solid rgba(248,70,0,.3);
          background: rgba(248,70,0,.05); text-align: left;
        }
        .he-gate-line {
          margin: 0; font-family: var(--font-google-sans);
          font-size: 15px; font-weight: 600; color: #fff;
        }
        .he-gate-sub {
          margin: 5px 0 0; font-family: var(--font-google-sans);
          font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,.55);
        }
        .he-gate-go {
          margin-top: 15px; padding: 10px 18px; border: 0; border-radius: 999px;
          cursor: pointer; background: var(--color-primary); color: #fff;
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 500;
        }
        .he-gate-go:hover { background: #ff5a1f; }
        .he-gate-go:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        .he-send {
          position: absolute; right: 14px; bottom: 14px;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
        }
        .he-send:hover { background: #ff5a1f; }
        .he-send:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 3px; }
      `}</style>
    </section>
  );
}
