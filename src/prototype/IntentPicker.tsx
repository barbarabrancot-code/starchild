import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HERO_INTENTS, type HeroIntent, type TaskCard } from "./data";
import { ArrowUpIcon } from "./icons";

// chip = intention · card = ready task. Lives outside the hero because Guest Mode
// opens on the same picker — landing on an empty chat after "Meet Starchild" would
// throw away the choice the visitor was already making.
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
        {intents.map(({ id, label, icon: Icon, badge }) => {
          const isOpen = openIntent === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setOpenIntent(isOpen ? null : id)}
              aria-expanded={isOpen}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${
                isOpen ? "bg-white text-neutral-900" : "bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"
              }`}
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              <Icon className={`size-4 ${isOpen ? "text-neutral-500" : "text-white/55"}`} />
              {label}
              {badge && (
                <span className="absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white">
                  {badge}
                </span>
              )}
            </button>
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]"
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  {task.label}
                  <ArrowUpIcon className="size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
