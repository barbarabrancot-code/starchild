import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConductorApp, NEXT_LINE } from "./prototype/ConductorApp";

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
 * Same product behind it as app.html: this entry differs by one argument, the
 * line of versions the page offers. Here that line starts at F, shown as A,
 * because F is the first of the design being built rather than the last of the
 * six it was compared against. app.html keeps all six, F included, so a link
 * anyone already has still opens what it opened.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LandingErrorBoundary>
      <ConductorApp line={NEXT_LINE} />
    </LandingErrorBoundary>
  </StrictMode>
);
