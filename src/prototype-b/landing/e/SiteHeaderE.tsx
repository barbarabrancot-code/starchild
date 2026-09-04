import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { Container } from "../../Container";

/**
 * Version E's header.
 *
 * Same three tracks as C — wordmark, centred nav, account — but the nav and the
 * account buttons each sit inside a capsule of their own. The difference is not
 * decoration: on a page whose whole subject is one lit orb on a black field, bare
 * text floating at the top reads as debris. Two contained groups read as chrome,
 * which is what they are, and they leave the middle of the screen to the thing
 * the page is actually about.
 */
const AUDIENCES: { id: string; label: string; route?: "traders" }[] = [
  { id: "traders", label: "For Traders", route: "traders" },
  { id: "developers", label: "For Developers" },
  { id: "creators", label: "For Creators" },
  { id: "researchers", label: "For Researchers" },
];

export function SiteHeaderE({
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
    <header className="relative z-20 py-5">
      <Container>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            <button type="button" onClick={onNavigateHome} className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}images/starchild-logo.svg`}
                alt="Starchild"
                width={172}
                height={32}
                className="h-7 w-auto"
              />
            </button>
          </div>

          <nav className="he-pill" aria-label="Main">
            <div className="he-menu" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                className={`he-link${open ? " he-link--open" : ""}`}
              >
                Starchild for
                <ChevronDownIcon className="he-chevron size-3.5" />
              </button>

              {open && (
                <div className="he-panel" role="menu">
                  {AUDIENCES.map(({ id, label, route }) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        if (route === "traders") onNavigateTraders();
                      }}
                      className="he-item"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={onNavigatePricing} className="he-link">
              Pricing
            </button>

            {/* Placeholder: Marketplace opens as a modal from inside the product,
                which is a different thing from a page in the nav, so this goes
                nowhere until there is one. */}
            <button type="button" onClick={() => {}} className="he-link he-link--badged">
              Marketplace
              <span className="he-badge">New</span>
            </button>
          </nav>

          {/* The account pair in a capsule of its own, so the header reads as two
              objects rather than as five loose words. Log in stays quiet: the
              primary action on this page is the box in the middle. */}
          <div className="flex items-center justify-end">
            <div className="he-pill he-pill--tight">
              <button type="button" onClick={onLogIn} className="he-link">
                Log in
              </button>
              <button type="button" onClick={onSignUp} className="he-signup">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        /* the capsule both groups share */
        .he-pill {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 8px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(14px);
        }
        .he-pill--tight { padding: 4px 4px 4px 6px; gap: 2px; }

        .he-menu { position: relative; }

        .he-link {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 7px 13px; border: 0; border-radius: 999px; background: none;
          font-family: var(--font-google-sans); font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,.62); white-space: nowrap;
          transition: color .2s ease, background-color .2s ease;
        }
        .he-link:hover, .he-link--open { color: #fff; background: rgba(255,255,255,.07); }
        .he-link:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .he-chevron { transition: transform .2s ease; opacity: .7; }
        .he-link--open .he-chevron { transform: rotate(180deg); }

        /* Inside the capsule the badge cannot ride outside the label without
           poking through the border, so it sits in the flow. */
        .he-link--badged { padding-right: 9px; }
        .he-badge {
          padding: 2px 5px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-size: 8.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
          line-height: 1.2;
        }

        .he-signup {
          cursor: pointer; padding: 7px 15px; border: 0; border-radius: 999px;
          background: rgba(255,255,255,.1); color: #fff;
          font-family: var(--font-google-sans); font-size: 13px; font-weight: 500;
          white-space: nowrap; transition: background-color .2s ease;
        }
        .he-signup:hover { background: rgba(255,255,255,.18); }
        .he-signup:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }

        .he-panel {
          position: absolute; top: calc(100% + 12px); left: -4px; z-index: 30;
          display: flex; flex-direction: column; min-width: 190px; padding: 6px;
          border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
          background: rgba(12,12,12,.92); backdrop-filter: blur(14px);
          box-shadow: 0 18px 40px rgba(0,0,0,.55);
          animation: he-in .18s cubic-bezier(.16,1,.3,1);
        }
        .he-item {
          text-align: left; cursor: pointer; padding: 9px 12px; border: 0; border-radius: 9px;
          background: none; color: rgba(255,255,255,.7);
          font-family: var(--font-google-sans); font-size: 13.5px;
          transition: background-color .18s ease, color .18s ease;
        }
        .he-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .he-item:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        @keyframes he-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .he-panel { animation: none; }
          .he-chevron { transition: none; }
        }

        /* below this the three tracks stop fitting and the nav starts colliding
           with the wordmark, so it drops out until there's a mobile menu for it */
        @media (max-width: 899px) { .he-pill:not(.he-pill--tight) { display: none; } }
      `}</style>
    </header>
  );
}
