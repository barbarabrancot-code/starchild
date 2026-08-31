import { useEffect, useState } from "react";

/**
 * Light or dark, for the F landing.
 *
 * Scoped to this page rather than to the document. The product behind the
 * landing — chat, agents, the workspace — is dark and only dark, and a switch
 * that also turned those light would be promising a light mode the app does not
 * have. So the attribute goes on the landing's own wrapper, and every colour in
 * the sections is read from tokens defined against it.
 *
 * Dark is the default, and not only because it came first: the hero is built
 * around the orb being the only light in the room, and that is the version of
 * the page the design is actually arguing for. Light is the alternative, and it
 * has to earn the swap.
 *
 * The choice is remembered per browser and nothing more — it never leaves the
 * machine, and it is wrapped because a browser with site data blocked throws on
 * read as well as on write.
 */

export type LandingTheme = "dark" | "light";

const KEY = "starchild.landing.theme";

function remembered(): LandingTheme {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function useLandingTheme() {
  /* Read lazily rather than in an effect. Reading after the first paint means
     anyone who chose light watches the page load dark and then flip, which is
     worse than the flash it would be trying to avoid. */
  const [theme, setTheme] = useState<LandingTheme>(remembered);

  useEffect(() => {
    try { localStorage.setItem(KEY, theme); } catch { /* site data blocked */ }
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((now) => (now === "dark" ? "light" : "dark")),
  };
}
