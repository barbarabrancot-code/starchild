# A/B delivery

Two independent copies of the signed-in app, side by side, for review.

- **A** — `app.html` → `src/app-main.tsx` → `src/prototype/`
- **B** — `app-b.html` → `src/app-main-b.tsx` → `src/prototype-b/`

`src/prototype-b/` is a full duplicate of `src/prototype/`, not a diff or a
variant flag — every file has the same name and shape in both, so a change
made in one has no effect on the other unless it's made in both on purpose.

Run `npm run dev` and open:

- http://localhost:5173/app.html?signedin=1
- http://localhost:5173/app-b.html?signedin=1

## What's different in B

- No Automations/Jobs area. The sidebar destination, its page
  (`agents/JobsArea.tsx`), and the routing to it are removed. "Handled" chat
  cards that used to link out to that page ("Check it out", "View job") no
  longer render those links.
- A repeated request offers to **create a dedicated agent** ("Create an
  agent"), not a lightweight standing task ("Handle it for me"). Accepting
  adds a real entry to the Agents roster and opens straight into it, since
  Automations no longer exists as a place for a lighter-weight task to live.

Everything else — Chat, Agents, Connectors, all of today's other fixes — is
the same in both.
