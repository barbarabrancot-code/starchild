import { LogoMark, LockIcon, CheckIcon } from "./icons";
import { GUEST_FEATURES } from "./data";

export function GuestSidebar({
  tasksRemaining,
  onLockedFeature,
}: {
  tasksRemaining: number;
  onLockedFeature: () => void;
}) {
  return (
    <div className="hidden w-56 shrink-0 flex-col gap-6 border-r border-black/[0.06] px-4 pt-6 pb-5 md:flex">
      <LogoMark className="size-6" />

      <div>
        <p className="text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Guest mode
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-500" style={{ fontFamily: "var(--font-google-sans)" }}>
          You're trying Starchild with limited access. Create an account to save what Starchild learns about you and
          continue anywhere.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-neutral-400 uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Available
        </p>
        <ul className="flex flex-col gap-1.5">
          {GUEST_FEATURES.available.map((label) => (
            <li key={label} className="flex items-center gap-2 text-[12.5px] text-neutral-700" style={{ fontFamily: "var(--font-google-sans)" }}>
              <CheckIcon className="size-3 text-emerald-500" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-neutral-400 uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Requires account
        </p>
        <ul className="flex flex-col gap-1.5">
          {GUEST_FEATURES.locked.map((label) => (
            <li key={label}>
              <button
                type="button"
                onClick={onLockedFeature}
                className="flex w-full items-center gap-2 text-left text-[12.5px] text-neutral-400 transition-colors hover:text-neutral-600"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                <LockIcon className="size-3 shrink-0" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto rounded-lg bg-neutral-50 px-3 py-2.5 text-center">
        <p className="text-[12px] font-medium text-neutral-700" style={{ fontFamily: "var(--font-google-sans)" }}>
          {Math.max(tasksRemaining, 0)} guest interaction{tasksRemaining === 1 ? "" : "s"} remaining
        </p>
      </div>
    </div>
  );
}
