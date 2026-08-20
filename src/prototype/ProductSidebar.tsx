import type { ReactNode } from "react";
import {
  MenuIcon,
  PlusIcon,
  PuzzleIcon,
  GridIcon,
  StoreIcon,
  TrophyIcon,
  BriefcaseIcon,
  EllipsisIcon,
  SearchIcon,
} from "./icons";

// The signed-in navigation. A fresh account has no history yet, so there are no
// pinned or recent conversations under it — the list appears once there's
// something to list, and until then the rail is just the places you can go.
type NavItem = {
  label: string;
  Icon: (props: { className?: string }) => JSX.Element;
  /** unread-style marker, the way Missions carries new ones */
  badge?: boolean;
  onClick?: () => void;
};

export function ProductSidebar({
  onNewChat,
  onOpenMarketplace,
  marketplaceIntro,
  accountName = "Agent7035",
}: {
  onNewChat: () => void;
  onOpenMarketplace: () => void;
  /** the first-run note, anchored to the Marketplace item it describes */
  marketplaceIntro?: ReactNode;
  accountName?: string;
}) {
  const items: NavItem[] = [
    { label: "Skills", Icon: PuzzleIcon },
    { label: "Projects", Icon: GridIcon },
    { label: "Marketplace", Icon: StoreIcon, onClick: onOpenMarketplace },
    { label: "Missions", Icon: TrophyIcon, badge: true },
    { label: "Work", Icon: BriefcaseIcon },
    { label: "More", Icon: EllipsisIcon },
    { label: "Search conversations", Icon: SearchIcon },
  ];

  return (
    <div className="hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex">
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
        aria-label="Collapse sidebar"
      >
        <MenuIcon className="size-[18px]" />
      </button>

      <button
        type="button"
        onClick={onNewChat}
        className="mt-5 flex items-center gap-2.5 rounded-full bg-[#f84600] px-4 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.01]"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        <PlusIcon className="size-4.5" />
        New chat
      </button>

      <nav className="mt-4 flex flex-col">
        {items.map(({ label, Icon, badge, onClick }) => {
          const lit = label === "Marketplace" && Boolean(marketplaceIntro);
          return (
            <div key={label} className="relative">
              <button
                type="button"
                onClick={onClick}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] transition-colors duration-300 ${
                  lit
                    ? "bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                <span className={`relative shrink-0 ${lit ? "text-[#f84600]" : "text-white/55"}`}>
                  <Icon className="size-[18px]" />
                  {badge && (
                    <span className="absolute -top-0.5 -right-0.5 size-[5px] rounded-full bg-[#f84600]" aria-hidden="true" />
                  )}
                </span>
                {label}
              </button>

              {label === "Marketplace" && marketplaceIntro}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2 py-2">
        <span
          className="size-7 shrink-0 rounded-full"
          style={{ background: "linear-gradient(140deg,#f84600,#7a4bd6 70%)" }}
          aria-hidden="true"
        />
        <span className="text-[13.5px] text-white/75" style={{ fontFamily: "var(--font-google-sans)" }}>
          {accountName}
        </span>
      </div>
    </div>
  );
}
