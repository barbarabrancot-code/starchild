import type { ReactNode } from "react";
import type { SavedChat } from "./savedChats";
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
  PanelIcon,
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
  area = "chat",
  onSwitchArea,
  intro,
  accountName = "Agent7035",
  conversations = [],
  onOpenConversation,
  openConversation,
  collapsed = false,
  onToggleCollapsed,
}: {
  onNewChat: () => void;
  onOpenMarketplace: () => void;
  /** the first-run note, anchored to the Marketplace item it describes */
  /** First-run note, keyed by the sidebar label it hangs off. Was a single
   *  Marketplace-shaped prop; a third note made that a naming problem rather than a
   *  structural one, so the slot is now generic and the item lights itself. */
  /** Which of the two product areas is open. Chat is a conversation you are
   *  having; Agents is a roster of colleagues who were working while you weren't
   *  here — different enough that it is a place, not a mode. */
  area?: "chat" | "agents" | "connectors";
  onSwitchArea?: (next: "chat" | "agents" | "connectors") => void;
  intro?: { label: string; node: ReactNode };
  accountName?: string;
  /** what this account has already talked about — absent on a fresh one */
  conversations?: SavedChat[];
  onOpenConversation?: (chat: SavedChat) => void;
  /** which one is open, so the list says where you are the way the areas do */
  openConversation?: string;
  /** down to a rail of icons — see the note on the collapsed branch below */
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  const items: NavItem[] = [
    { label: "Skills", Icon: PuzzleIcon },
    { label: "Projects", Icon: GridIcon },
    { label: "Marketplace", Icon: StoreIcon, onClick: onOpenMarketplace },
    { label: "Missions", Icon: TrophyIcon, badge: true },
    { label: "More", Icon: EllipsisIcon },
    { label: "Search conversations", Icon: SearchIcon },
  ];

  const areas = (["chat", "agents", "connectors"] as const).map((id) => ({
    id,
    label: id === "chat" ? "Chat" : id === "agents" ? "Agents" : "Connectors",
    Icon: id === "chat" ? PanelIcon : id === "agents" ? BriefcaseIcon : PuzzleIcon,
  }));

  /*
    Collapsed, this is a rail of icons and nothing else.

    Agents is already three columns of its own — roster, thread, and the panel
    behind the name — so on that screen the 268px of navigation is the least
    useful width on the page. The rail keeps every destination reachable and hands
    the space to the thing being looked at. Everything that only makes sense with
    a label (recent conversations, the first-run notes) is not shown rather than
    truncated: half a sentence is worse than none.
  */
  if (collapsed) {
    return (
      <div className="hidden w-[64px] shrink-0 flex-col items-center border-r border-white/[0.08] bg-[#0c0c0d] px-2 pt-5 pb-4 lg:flex">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <MenuIcon className="size-[18px]" />
        </button>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-5 flex size-11 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-[1.03]"
          aria-label="New chat"
          title="New chat"
        >
          <PlusIcon className="size-5" />
        </button>

        <div className="mt-4 flex flex-col gap-0.5">
          {areas.map(({ id, label, Icon }) => {
            const on = area === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSwitchArea?.(id)}
                aria-current={on ? "page" : undefined}
                aria-label={label}
                title={label}
                className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
                  on ? "bg-white/[0.09] text-[#f84600]" : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon className="size-[18px]" />
              </button>
            );
          })}
        </div>

        <div className="my-3 h-px w-7 bg-white/[0.08]" aria-hidden="true" />

        <nav className="flex flex-col gap-0.5">
          {items.map(({ label, Icon, badge, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-label={label}
              title={label}
              className="flex size-10 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <span className="relative">
                <Icon className="size-[18px]" />
                {badge && (
                  <span className="absolute -top-0.5 -right-0.5 size-[5px] rounded-full bg-[#f84600]" aria-hidden="true" />
                )}
              </span>
            </button>
          ))}
        </nav>

        <span
          className="mt-auto size-7 shrink-0 rounded-full"
          style={{ background: "linear-gradient(140deg,#f84600,#7a4bd6 70%)" }}
          title={accountName}
          aria-label={accountName}
        />
      </div>
    );
  }

  return (
    <div className="hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex">
      <button
        type="button"
        onClick={onToggleCollapsed}
        className="flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
        aria-label="Collapse sidebar"
        title="Collapse sidebar"
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

      {/* The two areas, above everything else and visibly a switch: whichever is
          lit is where you are. Nothing below this row changes between them. */}
      <div className="mt-4 flex flex-col gap-0.5">
        {areas.map(({ id, label, Icon }) => {
          const on = area === id;
          // The areas can host a first-run note as well as the list below them —
          // Agents is a destination, and the note about it belongs on the door.
          const lit = intro?.label === label;
          return (
            <div key={id} className="relative">
              <button
                type="button"
                onClick={() => onSwitchArea?.(id)}
                aria-current={on ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] transition-colors duration-200 ${
                  lit
                    ? "bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40"
                    : on
                      ? "bg-white/[0.09] text-white"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                <span className={`shrink-0 ${lit || on ? "text-[#f84600]" : "text-white/45"}`}>
                  <Icon className="size-[18px]" />
                </span>
                {label}
              </button>

              {lit && intro.node}
            </div>
          );
        })}
      </div>

      <div className="mx-2.5 mt-4 mb-1 h-px bg-white/[0.08]" aria-hidden="true" />

      <nav className="flex flex-col">
        {items.map(({ label, Icon, badge, onClick }) => {
          const lit = intro?.label === label;
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

              {intro?.label === label && intro.node}
            </div>
          );
        })}
      </nav>

      {/* Under Search, because that is what you are searching. It only exists once
          there is something in it — the comment at the top of this file used to say
          a fresh account has no history, and that is still true; what changed is
          that an account which has been used for a while now shows it. */}
      {conversations.length > 0 && (
        <div className="mt-4 flex min-h-0 flex-col">
          <p
            className="px-2.5 pb-1 text-[11px] font-semibold tracking-[0.14em] text-white/25 uppercase"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Recent
          </p>
          <div className="flex flex-col overflow-y-auto">
            {conversations.map((c) => {
              const on = openConversation === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onOpenConversation?.(c)}
                  aria-current={on ? "page" : undefined}
                  className={`flex w-full flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left transition-colors ${
                    on ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
                  }`}
                  style={{ fontFamily: "var(--font-google-sans)" }}
                >
                  <span className={`truncate text-[13.5px] ${on ? "text-white" : "text-white/70"}`}>
                    {c.title}
                  </span>
                  <span className="text-[11.5px] text-white/28">{c.when}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
