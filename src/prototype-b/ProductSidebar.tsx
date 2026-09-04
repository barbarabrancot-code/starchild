import type { ReactNode } from "react";
import type { SavedChat } from "./savedChats";
import {
  MenuIcon,
  PlusIcon,
  PuzzleIcon,
  BriefcaseIcon,
  EllipsisIcon,
  type IconComponent,
} from "./icons";

type AreaId = "agents" | "connectors";
type Area = { id: AreaId; label: string; Icon: IconComponent };

// The signed-in navigation. A fresh account has no history yet, so there are no
// pinned or recent conversations under it — the list appears once there's
// something to list, and until then the rail is just the places you can go.
export function ProductSidebar({
  onNewChat,
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
  /** First-run note, keyed by the sidebar label it hangs off. The key is a label
   *  rather than an id because the note used to hang off the Marketplace item in
   *  the nav block below the areas; that block is gone, so today the only label
   *  that matches anything is "Agents". */
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
  const areas: Area[] = (["agents", "connectors"] as const).map((id) => ({
    id,
    label: id === "agents" ? "Agents" : "Connectors",
    Icon: id === "agents" ? BriefcaseIcon : PuzzleIcon,
  }));
  const orderedConversations = [...conversations].sort((a, b) => {
    if (a.id === "hype-analysis") return -1;
    if (b.id === "hype-analysis") return 1;
    return 0;
  });

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
      // Hovering grows the rail's real width back to 268px — the same layout
      // change the toggle makes, not a panel floating on top of it — and
      // everything beside it slides over to make room, the same as a click
      // would. It settles back the instant the pointer leaves.
      <div className="group/rail hidden w-[64px] shrink-0 overflow-hidden border-r border-white/[0.08] bg-[#0c0c0d] transition-[width] duration-150 ease-out hover:w-[268px] lg:block">
        <div className="relative h-full w-[268px]">
          {/* The rail: icons only, fading out as the hover grows the width in. */}
          <div className="absolute inset-0 flex w-[64px] flex-col items-center px-2 pt-5 pb-4 opacity-100 transition-opacity duration-150 group-hover/rail:opacity-0">
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

              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
                aria-label="More"
                title="More"
              >
                <EllipsisIcon className="size-[18px]" />
              </button>
            </div>

            <span
              className="mt-auto size-7 shrink-0 rounded-full"
              style={{ background: "linear-gradient(140deg,#f84600,#7a4bd6 70%)" }}
              title={accountName}
              aria-label={accountName}
            />
          </div>

          {/* The full sidebar, fading in over the same width the rail just
              gave up — not stacked on top of it, its replacement. */}
          <div className="absolute inset-0 w-[268px] opacity-0 transition-opacity duration-150 group-hover/rail:opacity-100">
            <SidebarBody
              areas={areas}
              area={area}
              onSwitchArea={onSwitchArea}
              intro={intro}
              accountName={accountName}
              orderedConversations={orderedConversations}
              onOpenConversation={onOpenConversation}
              openConversation={openConversation}
              onNewChat={onNewChat}
              onToggleCollapsed={onToggleCollapsed}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden w-[268px] shrink-0 border-r border-white/[0.08] bg-[#0c0c0d] lg:block">
      <SidebarBody
        areas={areas}
        area={area}
        onSwitchArea={onSwitchArea}
        intro={intro}
        accountName={accountName}
        orderedConversations={orderedConversations}
        onOpenConversation={onOpenConversation}
        openConversation={openConversation}
        onNewChat={onNewChat}
        onToggleCollapsed={onToggleCollapsed}
      />
    </div>
  );
}

/**
 * The expanded sidebar's actual content, apart from the frame around it —
 * shared by the normal, in-flow render and the collapsed rail's hover flyout,
 * so the two can never say something different about where you are.
 */
function SidebarBody({
  areas,
  area,
  onSwitchArea,
  intro,
  accountName,
  orderedConversations,
  onOpenConversation,
  openConversation,
  onNewChat,
  onToggleCollapsed,
}: {
  areas: Area[];
  area: "chat" | "agents" | "connectors";
  onSwitchArea?: (next: "chat" | "agents" | "connectors") => void;
  intro?: { label: string; node: ReactNode };
  accountName: string;
  orderedConversations: SavedChat[];
  onOpenConversation?: (chat: SavedChat) => void;
  openConversation?: string;
  onNewChat: () => void;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col px-4 pt-5 pb-4">
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

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] text-white/50 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          <span className="shrink-0 text-white/40"><EllipsisIcon className="size-[18px]" /></span>
          More
        </button>
      </div>


      {/* Under Search, because that is what you are searching. It only exists once
          there is something in it — the comment at the top of this file used to say
          a fresh account has no history, and that is still true; what changed is
          that an account which has been used for a while now shows it. */}
      {orderedConversations.length > 0 && (
        <div className="mt-4 flex min-h-0 flex-col">
          <p
            className="px-2.5 pb-1 text-[11px] font-semibold tracking-[0.14em] text-white/25 uppercase"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Recents
          </p>
          <div className="flex flex-col overflow-y-auto">
            {orderedConversations.map((c) => {
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
