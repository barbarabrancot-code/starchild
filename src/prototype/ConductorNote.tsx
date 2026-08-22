import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SparkleIcon } from "./icons";

/**
 * What Conductor Mode just did, said once, in the flow.
 *
 * It has been two other things: a strip above the answer, where it competed with
 * what the visitor came for, and a card in the corner, where it read as a system
 * notification about the product rather than a note from it. This is the third
 * shape and the quietest — the surface and the grammar of the first-run notes in
 * onboarding/IntroPopover, sitting in the column under the answer it is talking
 * about, close enough that "this task" needs no pointing at.
 *
 * Not the popover itself: that one hangs off a control it points a caret at, is
 * fixed at 292px, and closes on any click outside it. In the middle of a
 * conversation all three are wrong. What carries over is what it looks like.
 *
 * It waits to be dismissed rather than timing out. Inline, a card that vanished on
 * a clock would take a piece of the conversation with it.
 */

/** after the answer has settled, not on top of it arriving */
const ARRIVE_MS = 1400;

// Module scope, so it survives the screen remounting but not a reload. Once per
// visit is what makes this educational rather than a counter reporting in after
// every answer — and a reload putting it back is what keeps it demonstrable.
let seen = false;

export function useConductorNote(ready: boolean) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready || seen) return;
    const t = window.setTimeout(() => {
      seen = true;
      setOpen(true);
    }, ARRIVE_MS);
    return () => window.clearTimeout(t);
  }, [ready]);

  return { open, dismiss: () => setOpen(false) };
}

export type ConductorNoteControl = ReturnType<typeof useConductorNote>;

export function ConductorNote({
  saved,
  control,
}: {
  saved: number;
  control: ConductorNoteControl;
}) {
  const [explained, setExplained] = useState(false);

  return (
    <AnimatePresence>
      {control.open && (
        <motion.div
          key="conductor-note"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6, transition: { duration: 0.22, ease: "easeIn" } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Conductor Mode"
          className="mt-6 max-w-[400px] rounded-2xl border border-white/10 bg-[#1a1a1c] p-4 shadow-[0_20px_50px_rgba(0,0,0,.55)]"
        >
          <div className="flex items-start gap-3">
            {/* the onboarding badge, at the size a card in the flow can carry. The
                accent lives here and on the number, and nowhere else. */}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]">
              <SparkleIcon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <h2
                className="text-[14.5px] font-semibold text-white"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Conductor Mode
              </h2>
              <p
                className="mt-1.5 text-[12.5px] leading-relaxed text-white/55"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Starchild picked the best-fit model for this task.
              </p>
            </div>
          </div>

          {/* a rule, not a second panel: the saving is the consequence of the line
              above it, and a box of its own would read as a second notice */}
          <div className="mt-3.5 border-t border-white/[0.07] pt-3.5">
            <p className="flex items-baseline gap-1.5">
              {/* the one number here, so it is the one thing set large. Pinned to
                  en-US: the UI is English, and a pt-BR browser would otherwise
                  render 9,100 as "9.100". */}
              <span
                className="text-[25px] leading-none font-semibold text-[#f84600] tabular-nums"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                {saved.toLocaleString("en-US")}
              </span>
              <span
                className="text-[13px] font-medium text-white/80"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                tokens saved
              </span>
            </p>
            <p
              className="mt-1.5 text-[12px] text-white/40"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Less unnecessary AI usage.
            </p>
          </div>

          {/* The explanation is a step someone takes, not a paragraph everyone has
              to read past. Two short answers: what the mode did, and what the unit
              in the number even is. */}
          <AnimatePresence initial={false}>
            {explained && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3.5 border-t border-white/[0.07] pt-3.5">
                  <p
                    className="text-[12px] leading-[1.6] text-white/45"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Conductor Mode reads the task first, sends each part to the AI that
                    handles it best, and passes on only the context that part needs.
                  </p>
                  <p
                    className="mt-2.5 text-[12px] leading-[1.6] text-white/30"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Tokens are the units AI uses to process a task. Using fewer usually means
                    less waste and lower cost.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Same row as the first-run notes — quiet on the left, the way out on the
              right — but outlined rather than filled. Theirs is the only button on
              screen; this one sits a rule above the signup CTA, and two orange pills
              would split the ask between them. */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setExplained((v) => !v)}
              aria-expanded={explained}
              className="shrink-0 text-[12.5px] text-white/40 transition-colors hover:text-white/70"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              {explained ? "Hide" : "See how it works"}
            </button>
            <button
              type="button"
              onClick={control.dismiss}
              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[12.5px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
