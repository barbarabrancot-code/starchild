import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { Container } from "../../Container";

// Version C's header. Same as the shared one plus a "Starchild for" menu: the
// homepage is written for a general visitor, and this is where someone who does
// arrive with a specific job finds themselves without the page having to say it.
//
// Only Traders has a page so far, so only Traders goes anywhere. The other three
// deliberately do nothing until there's a page behind them — same rule as
// "See pricing" in the final CTA. Give one a page and it gets a `route`.
const AUDIENCES: { id: string; label: string; route?: "traders" }[] = [
  { id: "traders", label: "For Traders", route: "traders" },
  { id: "developers", label: "For Developers" },
  { id: "creators", label: "For Creators" },
  { id: "researchers", label: "For Researchers" },
];

export function SiteHeaderC({
  onNavigateHome,
  onNavigateTraders,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onNavigateTraders: () => void;
  onNavigatePricing: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // a menu that can't be dismissed by clicking away or pressing Escape reads as
  // broken, so both are wired before anything else
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="relative z-20 py-6">
      <Container>
        {/* three tracks so the nav is centred on the page, not on whatever is
            left over between the wordmark and the buttons */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            {/* the real wordmark — mark and lettering come as one file, so this
                replaces the CSS placeholder mark plus the typed STARCHILD */}
            <button type="button" onClick={onNavigateHome} className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}images/starchild-logo.svg`}
                alt="Starchild"
                width={172}
                height={32}
                className="h-8 w-auto"
              />
            </button>
          </div>

          <nav className="sh-nav" aria-label="Main">
            <div className="sh-menu" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                className={`sh-trigger${open ? " sh-trigger--open" : ""}`}
              >
                Starchild for
                <ChevronDownIcon className="sh-chevron size-3.5" />
              </button>

              {open && (
                <div className="sh-panel" role="menu">
                  {AUDIENCES.map(({ id, label, route }) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        if (route === "traders") onNavigateTraders();
                      }}
                      className="sh-item"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={onNavigatePricing} className="sh-trigger">
              Pricing
            </button>

            {/* Placeholder: Marketplace opens as a modal from inside the product,
                which is a different thing from a page in the nav, so this goes
                nowhere until there is one — same rule as the audience items above. */}
            <button type="button" onClick={() => {}} className="sh-trigger sh-trigger--badged">
              Marketplace
              <span className="sh-badge">New</span>
            </button>
          </nav>

          {/* Log in stays quiet so the header's orange doesn't compete with the
              hero CTA — the primary action on this page is still "Meet Starchild". */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onLogIn}
              className="px-1 text-[13.5px] font-medium text-[var(--color-text-body)] transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-[var(--color-text-body)] backdrop-blur-sm transition-colors hover:bg-white/20"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Sign up
            </button>
          </div>
        </div>
      </Container>

      <style>{`
        .sh-nav { display: flex; align-items: center; gap: 26px; }
        .sh-menu { position: relative; }

        .sh-trigger {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 6px 2px; border: 0; background: none;
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 500;
          color: var(--color-text-body); transition: color .2s ease;
        }
        .sh-trigger:hover, .sh-trigger--open { color: #fff; }
        .sh-trigger:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 4px; border-radius: 6px; }
        .sh-chevron { transition: transform .2s ease; }
        .sh-trigger--open .sh-chevron { transform: rotate(180deg); }

        /* the badge rides above the label rather than pushing the row wider, so
           the three nav items stay evenly spaced around the centre */
        .sh-trigger--badged { position: relative; }
        .sh-badge {
          position: absolute; top: -3px; right: -22px;
          padding: 2px 5px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-size: 8.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
          line-height: 1.2;
        }

        .sh-panel {
          position: absolute; top: calc(100% + 10px); left: -10px; z-index: 30;
          display: flex; flex-direction: column; min-width: 190px; padding: 6px;
          border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
          background: rgba(12,12,12,.92); backdrop-filter: blur(14px);
          box-shadow: 0 18px 40px rgba(0,0,0,.55);
          animation: sh-in .18s cubic-bezier(.16,1,.3,1);
        }

        .sh-item {
          text-align: left; cursor: pointer; padding: 9px 12px; border: 0; border-radius: 9px;
          background: none; color: var(--color-text-body);
          font-family: var(--font-google-sans); font-size: 13.5px;
          transition: background-color .18s ease, color .18s ease;
        }
        .sh-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .sh-item:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        @keyframes sh-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .sh-panel { animation: none; }
          .sh-chevron { transition: none; }
        }

        /* below this the three tracks stop fitting and the nav starts colliding
           with the wordmark, so it drops out until there's a mobile menu for it */
        @media (max-width: 899px) { .sh-nav { display: none; } }
      `}</style>
    </header>
  );
}
