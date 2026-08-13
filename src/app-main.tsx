import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConductorApp } from "./prototype/ConductorApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConductorApp />
  </StrictMode>
);
