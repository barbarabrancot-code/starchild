import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConductorApp, NEXT_LINE } from "./prototype/ConductorApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConductorApp line={NEXT_LINE} startInOnboarding />
  </StrictMode>,
);
