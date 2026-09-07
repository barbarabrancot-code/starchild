import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LibraryApp } from "./library/LibraryApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LibraryApp />
  </StrictMode>
);
