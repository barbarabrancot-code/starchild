import { LogoMark } from "./icons";
import { Container } from "./Container";

export function SiteHeader({
  onNavigateHome,
  onNavigateConductorMode,
  onOpenMarketplace,
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
            <button type="button" onClick={onNavigateHome} className="flex items-center gap-2.5">
              <LogoMark className="size-7" />
              <span
                className="text-[15px] font-semibold tracking-[0.16em] text-white"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                STARCHILD
              </span>
            </button>
            <nav className="hidden items-center gap-6 sm:flex">
              <button
                type="button"
                onClick={onNavigateConductorMode}
                className="text-[13.5px] text-white/70 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Conductor Mode
              </button>
              <button
                type="button"
                onClick={onOpenMarketplace}
                className="text-[13.5px] text-white/70 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Marketplace
              </button>
            </nav>
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
