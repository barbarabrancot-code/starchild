import { LockIcon, CheckIcon } from "./icons";
import { GUEST_FEATURES } from "./data";

export function GuestSidebar({
  tasksRemaining,
  onLockedFeature,
}: {
  tasksRemaining: number;
  onLockedFeature: () => void;
}) {
  return (
    <div className="hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex">
      <img
        src={`${import.meta.env.BASE_URL}images/starchild-symbol.svg`}
        alt="Starchild"
        width={24}
        height={24}
        className="size-6"
      />

      <div>
        <p className="text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Guest mode
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-white/50" style={{ fontFamily: "var(--font-google-sans)" }}>
          You're trying Starchild with limited access. Create an account to save what Starchild learns about you and
          continue anywhere.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Available
        </p>
        <ul className="flex flex-col gap-1.5">
          {GUEST_FEATURES.available.map((label) => (
            <li key={label} className="flex items-center gap-2 text-[12.5px] text-white/80" style={{ fontFamily: "var(--font-google-sans)" }}>
              <CheckIcon className="size-3 text-emerald-400" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase" style={{ fontFamily: "var(--font-google-sans)" }}>
          Requires account
        </p>
        <ul className="flex flex-col gap-1.5">
          {GUEST_FEATURES.locked.map((label) => (
            <li key={label}>
              <button
                type="button"
                onClick={onLockedFeature}
                className="flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                <LockIcon className="size-3 shrink-0" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center">
        <p className="text-[12px] font-medium text-white/75" style={{ fontFamily: "var(--font-google-sans)" }}>
          {Math.max(tasksRemaining, 0)} guest interaction{tasksRemaining === 1 ? "" : "s"} remaining
        </p>
      </div>
    </div>
  );
}
