import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HERO_INTENTS, type HeroIntent, type TaskCard } from "./data";
import { ArrowUpIcon } from "./icons";

// chip = intention · card = ready task. Lives outside the hero because Guest Mode
// opens on the same picker — landing on an empty chat after "Meet Starchild" would
// throw away the choice the visitor was already making.
//
// The colours moved out of the class names and into the block at the bottom. They
// were flat white — bg-white/[0.07], text-white/55 — which is a fine way to write
// a chip for a page that is only ever black, and this one now sits on F's light
// ground too, where white at 7% over clay is a chip you cannot see. Everything
// here reads the landing's ink tokens instead, and those carry the old values as
// their defaults, so on every dark landing this is the chip it has always been.
export function IntentPicker({
  onStartTask,
  align = "start",
  intents = HERO_INTENTS,
}: {
  onStartTask: (task: TaskCard) => void;
  align?: "start" | "center";
  /** version C passes its own set — see landing/c/heroIntents.ts */
  intents?: HeroIntent[];
}) {
  const [openIntent, setOpenIntent] = useState<string | null>(null);
  const activeIntent = intents.find((intent) => intent.id === openIntent);
  const justify = align === "center" ? "justify-center" : "";

  return (
    <div className={align === "center" ? "flex w-full flex-col items-center" : undefined}>
      <div className={`flex flex-wrap gap-2.5 ${justify}`}>
        {intents.map(({ id, label, icon: Icon, badge, hint }) => {
          const isOpen = openIntent === id;
          return (
            // The hint lives outside the button so it stays a description and
            // does not get swept into the button's own accessible name.
            <div key={id} className="group relative">
              {/* data-presence tells the hero dot it is over an option being
                  weighed up rather than over open space — see landing/c/PixelMesh */}
              <button
                type="button"
                onClick={() => setOpenIntent(isOpen ? null : id)}
                aria-expanded={isOpen}
                aria-describedby={hint ? `${id}-hint` : undefined}
                data-presence="chip"
                className={`ip-chip${isOpen ? " ip-chip--on" : ""}`}
              >
                <Icon className="ip-icon size-4" />
                {label}
                {badge && (
                  <span className="ip-badge absolute -top-2 -right-1.5 rounded-full px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide">
                    {badge}
                  </span>
                )}
              </button>
              {/* Above the chip: the task cards open underneath it, so a tooltip
                  down there would be covered the moment the chip is pressed. */}
              {hint && (
                <span
                  id={`${id}-hint`}
                  role="tooltip"
                  className="ip-hint pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-full px-3 py-1.5 text-[11.5px] whitespace-nowrap opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                >
                  {hint}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeIntent && (
          <motion.div
            key={activeIntent.id}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden"
          >
            <div className={`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${justify} ${align === "center" ? "mx-auto" : ""}`}>
              {activeIntent.tasks.map((task, i) => (
                <motion.button
                  key={task.id}
                  type="button"
                  onClick={() => onStartTask(task)}
                  data-presence="chip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="ip-task group flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-[13.5px] transition-colors"
                >
                  {task.label}
                  <ArrowUpIcon className="ip-arrow size-3.5 rotate-45 transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Every alpha here goes through the same lift the rest of the landing
           uses: A + (1 - A) * lift, which is 0 on a dark page and leaves the
           number exactly as it was. On clay the alphas that read on black are two
           to three times too faint, and a chip that fades into its own page is a
           chip nobody presses. */
        .ip-chip {
          position: relative;
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; border: 0; border-radius: 999px; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px;
          background: rgba(var(--lf-ink-rgb), calc(.07 + .93 * var(--lf-lift-f)));
          color: rgba(var(--lf-ink-rgb), calc(.72 + .28 * var(--lf-lift-t)));
          transition: background-color .18s ease, color .18s ease;
        }
        .ip-chip:hover {
          background: rgba(var(--lf-ink-rgb), calc(.13 + .87 * var(--lf-lift-f)));
        }
        .ip-chip:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 2px; }

        /* The open one inverts: solid ink with the page's own colour set on it.
           On black that is the white chip with near-black type it always was; on
           clay it is the same relationship the other way up, which is what makes
           "open" read as a state rather than as a slightly different chip. */
        .ip-chip--on, .ip-chip--on:hover {
          background: var(--lf-ink);
          color: var(--lf-page);
        }

        .ip-icon { color: rgba(var(--lf-ink-rgb), calc(.55 + .45 * var(--lf-lift-t))); }
        /* Dimmed against the inverted chip rather than given its own colour —
           one value that works whichever way round the chip currently is. */
        .ip-chip--on .ip-icon { color: var(--lf-page); opacity: .6; }

        /* White stays white on the accent. It is the brand orange in both modes,
           so what sits on it does not depend on the page behind it. */
        .ip-badge { background: var(--lf-accent); color: #fff; }

        .ip-hint {
          border: 1px solid rgba(var(--lf-ink-rgb), calc(.12 + .88 * var(--lf-lift-e)));
          background: var(--lf-surface);
          color: rgba(var(--lf-ink-rgb), calc(.65 + .35 * var(--lf-lift-t)));
        }

        .ip-task {
          border: 1px solid var(--lf-ctl-edge);
          background: var(--lf-surface);
          color: rgba(var(--lf-ink-rgb), calc(.72 + .28 * var(--lf-lift-t)));
          font-family: var(--font-google-sans);
        }
        .ip-task:hover {
          border-color: rgba(var(--lf-accent-rgb), .6);
          background: var(--lf-surface-2);
        }
        .ip-task:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 2px; }

        .ip-arrow { color: rgba(var(--lf-ink-rgb), calc(.35 + .65 * var(--lf-lift-t))); }
        .ip-task:hover .ip-arrow { color: var(--lf-accent-ink); }
      `}</style>
    </div>
  );
}
