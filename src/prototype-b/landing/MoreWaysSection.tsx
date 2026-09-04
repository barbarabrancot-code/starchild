import { motion } from "motion/react";
import { SECONDARY_USE_CASES, type TaskCard } from "../data";
import { ArrowUpIcon } from "../icons";
import { Container } from "../Container";

// Six entry points on a 3 × 2 grid. Quieter than the three primary use cases by
// design — this is range, not a second feature grid. Each one is a real task, so
// clicking drops you into Guest Mode rather than expanding a description.
export function MoreWaysSection({ onStartTask }: { onStartTask: (task: TaskCard) => void }) {
  return (
    <section className="mw-section bg-[#0a0a0a] pb-24 md:pb-32">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <p
            className="col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            And plenty else
          </p>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          {SECONDARY_USE_CASES.map(({ id, label, icon: Icon, task }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => onStartTask(task)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mw-card col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <span className="mw-head">
                <Icon className="mw-icon size-4" />
                <span className="mw-label">{label}</span>
                <ArrowUpIcon className="mw-arrow size-3.5 rotate-45" />
              </span>
              <span className="mw-task">{task.label}</span>
            </motion.button>
          ))}
        </div>
      </Container>

      <style>{`
        .mw-card {
          display: flex; flex-direction: column; gap: 10px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 20px 22px;
          background: rgba(255,255,255,.02);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .mw-card:hover { border-color: rgba(248,70,0,.45); background: rgba(255,255,255,.05); }

        .mw-head { display: flex; align-items: center; gap: 10px; }
        .mw-icon { color: rgba(255,255,255,.4); transition: color .2s ease; flex: none; }
        .mw-card:hover .mw-icon { color: var(--color-primary); }
        .mw-label {
          font-family: var(--font-google-sans); font-size: 16px; font-weight: 600; color: #fff;
        }
        /* arrow parks on the right edge so the wider card still reads as one action */
        .mw-arrow {
          margin-left: auto; color: rgba(255,255,255,.25); transition: color .2s ease; flex: none;
        }
        .mw-card:hover .mw-arrow { color: var(--color-primary); }

        .mw-task {
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.5;
          color: rgba(255,255,255,.45);
        }
      `}</style>
    </section>
  );
}
