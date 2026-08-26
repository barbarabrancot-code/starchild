import {
  MenuIcon,
  PlusIcon,
  PanelIcon,
  BriefcaseIcon,
  PuzzleIcon,
  GridIcon,
  StoreIcon,
  TrophyIcon,
  EllipsisIcon,
  SearchIcon,
  LockIcon,
} from "./icons";

/**
 * Guest Mode's sidebar — the product's own sidebar, with everything but the
 * conversation locked.
 *
 * It used to be two lists of feature names, "Available" and "Requires account",
 * which described the product in words instead of showing it. This is the same
 * rail an account holder sees: same width, same destinations, same order. What a
 * guest cannot reach is dimmed and carries a lock, and pressing it asks them to
 * sign up.
 *
 * That is a better argument than the lists were, and a more honest one: a locked
 * door you can see is a reason to get a key. A paragraph about doors is not.
 */

type Locked = { label: string; Icon: (props: { className?: string }) => JSX.Element };

/** the two other product areas, both behind an account */
const AREAS: Locked[] = [
  { label: "Agents", Icon: BriefcaseIcon },
  { label: "Connectors", Icon: PuzzleIcon },
];

/** and everything under the rule, in the order the real sidebar has it */
const REST: Locked[] = [
  { label: "Skills", Icon: PuzzleIcon },
  { label: "Projects", Icon: GridIcon },
  { label: "Marketplace", Icon: StoreIcon },
  { label: "Missions", Icon: TrophyIcon },
  { label: "More", Icon: EllipsisIcon },
  { label: "Search conversations", Icon: SearchIcon },
];

export function GuestSidebar({
  tasksRemaining,
  onLockedFeature,
}: {
  tasksRemaining: number;
  onLockedFeature: () => void;
}) {
  const left = Math.max(tasksRemaining, 0);

  const lockedRow = ({ label, Icon }: Locked) => (
    <button
      key={label}
      type="button"
      onClick={onLockedFeature}
      className="group flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] text-white/35 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white/70"
      style={{ fontFamily: "var(--font-google-sans)" }}
    >
      <span className="shrink-0 text-white/25 transition-colors group-hover:text-white/45">
        <Icon className="size-[18px]" />
      </span>
      {label}
      {/* on the right, small, and the same on every row — a lock that changes size
          or colour per item starts reading as a status rather than as a rule */}
      <LockIcon className="ml-auto size-3 shrink-0 text-white/25" />
    </button>
  );

  return (
    <div className="hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex">
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
        aria-label="Collapse sidebar"
      >
        <MenuIcon className="size-[18px]" />
      </button>

      {/* The one thing that is not locked, and it is the loudest thing here — a
          guest can talk to Starchild, and that is the whole of what guest mode is. */}
      <div
        className="mt-5 flex items-center gap-2.5 rounded-full bg-[#f84600] px-4 py-3 text-[14px] font-medium text-white"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        <PlusIcon className="size-4.5" />
        New chat
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        <div
          aria-current="page"
          className="flex w-full items-center gap-3 rounded-lg bg-white/[0.09] px-2.5 py-2.5 text-[14px] text-white"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          <span className="shrink-0 text-[#f84600]">
            <PanelIcon className="size-[18px]" />
          </span>
          Chat
        </div>
        {AREAS.map(lockedRow)}
      </div>

      <div className="mx-2.5 mt-4 mb-1 h-px bg-white/[0.08]" aria-hidden="true" />

      <nav className="flex flex-col">{REST.map(lockedRow)}</nav>

      {/* The count is the pressure and the button is the release, so they belong to
          each other rather than sitting in two places. */}
      <div className="mt-auto rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
        <p
          className="text-[10.5px] font-semibold tracking-[0.12em] text-[#f84600] uppercase"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Guest mode
        </p>
        <p
          className="mt-1.5 text-[12.5px] leading-relaxed text-white/50"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {left} interaction{left === 1 ? "" : "s"} left. An account keeps what Starchild learns about
          you, and unlocks the rest.
        </p>
        <button
          type="button"
          onClick={onLockedFeature}
          className="mt-3 w-full rounded-full bg-white/[0.08] px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.14]"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          Create a free account
        </button>
      </div>
    </div>
  );
}
