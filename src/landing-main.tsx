import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LandingPageH } from "./prototype/landing/LandingPageH";

class LandingErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Starchild landing failed to render", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#050506",
            color: "rgba(255,255,255,.72)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              border: "1px solid rgba(255,255,255,.18)",
              borderRadius: 999,
              padding: "12px 20px",
              background: "#151517",
              color: "white",
              cursor: "pointer",
            }}
          >
            Reload Starchild
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

/**
 * landing.html — the landing page being taken forward.
 *
 * This is the public landing artifact. Archived prototypes are intentionally
 * excluded so their retired assets never affect the live landing build.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LandingErrorBoundary>
      <LandingPageH
        onEnterGuest={() => undefined}
        onStartTask={() => undefined}
        onNavigateConnectors={() => undefined}
        onNavigatePricing={() => undefined}
        onLogIn={() => undefined}
        onSignUp={() => undefined}
      />
    </LandingErrorBoundary>
  </StrictMode>
);
