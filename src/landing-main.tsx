import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConductorApp, NEXT_LINE } from "./prototype/ConductorApp";

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
    <ConductorApp line={NEXT_LINE} />
  </StrictMode>
);
