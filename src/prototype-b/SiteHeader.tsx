import { Container } from "./Container";

// The Conductor Mode and Marketplace links are parked for now — both pages still
// exist and both handlers are still passed in, so restoring the nav is putting the
// two buttons back.
export function SiteHeader({
  onNavigateHome,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onNavigateConductorMode: () => void;
  onOpenMarketplace: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  return (
    <header className="relative z-10 py-6">
      <Container>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="flex items-center gap-8">
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
          {/* Log in stays quiet so the header's orange doesn't compete with the
              hero CTA — the primary action on this page is still "Meet Starchild". */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onLogIn}
              className="px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Sign up
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
