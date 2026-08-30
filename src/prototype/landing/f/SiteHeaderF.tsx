import { Container } from "../../Container";

/**
 * F's header — the mark, and the way in. Nothing else.
 *
 * E's header carries a nav capsule in the middle: "Starchild for", Pricing,
 * Marketplace. F drops it, and that is the point rather than an omission. There
 * is exactly one thing to do on this page and it is the box under the orb; a row
 * of links across the top is three other things to do, offered first, above it.
 *
 * Log in stays plain text and Sign up is a quiet grey pill rather than a white
 * one. A white button up here would be the brightest thing on the screen after
 * the orb, and it would be competing with the composer for the same click.
 */
export function SiteHeaderF({
  onNavigateHome,
  onNavigatePricing,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onNavigatePricing?: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  return (
    <header className="hf-header">
      <Container className="w-full">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onNavigateHome} className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}images/starchild-logo.svg`}
              alt="Starchild"
              width={172}
              height={32}
              className="h-7 w-auto"
            />
          </button>

          <div className="flex items-center gap-2">
            {onNavigatePricing && (
              <button type="button" onClick={onNavigatePricing} className="hf-pricing">
                Pricing
              </button>
            )}
            <button type="button" onClick={onLogIn} className="hf-login">
              Log in
            </button>
            <button type="button" onClick={onSignUp} className="hf-signup">
              Sign up
            </button>
          </div>
        </div>
      </Container>

      <style>{`
        .hf-header { position: relative; z-index: 20; padding: 18px 0; }

        .hf-login {
          padding: 8px 12px; border: 0; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 14px; line-height: 1;
          color: rgba(255,255,255,.62);
          transition: color .18s ease;
        }
        .hf-pricing {
          padding: 8px 10px; border: 0; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 14px; line-height: 1;
          color: rgba(255,255,255,.62); transition: color .18s ease;
        }
        .hf-pricing:hover { color: #fff; }
        .hf-pricing:focus-visible { outline: 2px solid rgba(255,255,255,.55); outline-offset: 2px; border-radius: 999px; }
        .hf-login:hover { color: #fff; }
        .hf-login:focus-visible { outline: 2px solid rgba(255,255,255,.55); outline-offset: 2px; border-radius: 999px; }

        .hf-signup {
          padding: 9px 16px; border: 1px solid rgba(255,255,255,.09); border-radius: 999px; cursor: pointer;
          background: rgba(255,255,255,.08);
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 500; line-height: 1;
          color: #fff;
          transition: background-color .18s ease, border-color .18s ease;
        }
        .hf-signup:hover { background: rgba(255,255,255,.13); border-color: rgba(255,255,255,.16); }
        .hf-signup:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
      `}</style>
    </header>
  );
}
