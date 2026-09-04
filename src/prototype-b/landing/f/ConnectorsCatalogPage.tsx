import { useMemo, useRef, useState } from "react";
import { Container } from "../../Container";
import { SiteHeaderF } from "./SiteHeaderF";

/**
 * The full connector catalogue, on its own page.
 *
 * It is here rather than on the homepage for one reason: thirty-six rows is a
 * screen of its own, and the section it came from is making an argument — six
 * marks in orbit, which says "the tools you use, around the thing". Thirty-six
 * marks says "we have a lot of integrations", which is a different and much
 * weaker claim, and it would be the longest section on the page.
 *
 * So the homepage keeps six recognisable ones and a way through, and this is
 * what the way through leads to.
 *
 * What this page is, and what it is not:
 *
 * · A catalogue, not a landing page. No hero, no pull quotes, nothing arguing
 *   anything. A heading, a way to narrow the list, and the list.
 *
 * · One category at a time, on tabs. The alternative — every group stacked down
 *   the page — is a page you scroll rather than a page you use, and it makes the
 *   reader do the filtering by eye. Tabs put a whole category on one screen and
 *   make the seven of them a decision rather than a distance. All is kept as the
 *   first of them, because the page opens claiming a number and the first thing
 *   it shows should be that number.
 *
 * · A grid, because a card carries a description without truncating it. The rows
 *   this replaced clipped every description to one line to keep a column's
 *   rhythm; in a grid the cells stretch to the tallest in their row and the
 *   sentence can simply finish.
 *
 * · Filterable, because thirty-six of anything needs it. The search runs over
 *   names and descriptions inside the open tab, and when that finds nothing it
 *   offers to look in all of them rather than leaving you at a dead end.
 *
 * On the count: the subtitle takes its number from the array below rather than
 * being written out. The catalogue is the kind of thing that grows a row at a
 * time, and a page claiming a number the reader can sit and count is a page that
 * goes wrong the first time somebody adds one.
 */

type Tool = {
  name: string;
  what: string;
  /** public/connectors/<slug>.svg, if that file exists — see Mark */
  slug: string;
};

type Group = { id: string; name: string; tools: Tool[] };

const CATALOGUE: Group[] = [
  {
    id: "comms",
    name: "Email & Communication",
    tools: [
      { name: "Gmail", what: "Send and read email, with attachments", slug: "gmail" },
      { name: "Outlook", what: "Email through Microsoft Graph", slug: "outlook" },
      { name: "Slack", what: "Messages and channels", slug: "slack" },
      { name: "Slackbot", what: "Automated replies in Slack", slug: "slackbot" },
      { name: "Microsoft Teams", what: "Messages and teams", slug: "teams" },
      { name: "Discord", what: "Servers, channels and messages", slug: "discord" },
    ],
  },
  {
    id: "google",
    name: "Google Workspace",
    tools: [
      { name: "Google Calendar", what: "Events and your schedule", slug: "gcal" },
      { name: "Google Drive", what: "Files and folders", slug: "gdrive" },
      { name: "Google Docs", what: "Write and edit documents", slug: "gdocs" },
      { name: "Google Sheets", what: "Build and edit spreadsheets", slug: "gsheets" },
      { name: "Google Slides", what: "Build and edit presentations", slug: "gslides" },
      { name: "Google Meet", what: "Meetings", slug: "gmeet" },
    ],
  },
  {
    id: "social",
    name: "Social & Content",
    tools: [
      { name: "Twitter / X", what: "Posts, search and media", slug: "x" },
      { name: "LinkedIn", what: "Profile, posts and network", slug: "linkedin" },
      { name: "Instagram", what: "Posts and messages", slug: "instagram" },
      { name: "Facebook", what: "Pages and posts", slug: "facebook" },
      { name: "Reddit", what: "Threads and subreddits", slug: "reddit" },
      { name: "YouTube", what: "Videos and channels", slug: "youtube" },
    ],
  },
  {
    id: "design",
    name: "Design & Creation",
    tools: [
      { name: "Figma", what: "Files, projects and comments", slug: "figma" },
      { name: "Canva", what: "Designs", slug: "canva" },
      { name: "ElevenLabs", what: "Voice and audio", slug: "elevenlabs" },
    ],
  },
  {
    id: "dev",
    name: "Dev & Infra",
    tools: [
      { name: "GitHub", what: "Repositories, issues and pull requests", slug: "github" },
      { name: "Supabase", what: "Database, auth and storage", slug: "supabase" },
      { name: "Vercel", what: "Deployments", slug: "vercel" },
      { name: "Cloudflare", what: "DNS and workers", slug: "cloudflare" },
      { name: "SharePoint", what: "Microsoft documents", slug: "sharepoint" },
    ],
  },
  {
    id: "work",
    name: "Productivity & CRM",
    tools: [
      { name: "Notion", what: "Pages and databases", slug: "notion" },
      { name: "Airtable", what: "Bases and records", slug: "airtable" },
      { name: "Linear", what: "Issues and tasks", slug: "linear" },
      { name: "HubSpot", what: "Contacts and deals", slug: "hubspot" },
      { name: "Calendly", what: "Scheduling", slug: "calendly" },
    ],
  },
  {
    id: "data",
    name: "Data & AI",
    tools: [
      { name: "Perplexity", what: "Search with sources", slug: "perplexity" },
      { name: "Firecrawl", what: "Read a website's pages", slug: "firecrawl" },
      { name: "Browserbase", what: "Drive a browser for you", slug: "browserbase" },
      { name: "Google Analytics", what: "Site traffic and behaviour", slug: "ganalytics" },
      { name: "Search Console", what: "How you show up in search", slug: "gsearchconsole" },
    ],
  },
];

/**
 * Every tool, each carrying its group's id — what the All tab shows, and what
 * every other tab is a filter over.
 *
 * The id travels with the tool so a tab can select on it. Matching back by name
 * against CATALOGUE would work today and stop working the first time two groups
 * hold something with the same name, which for a catalogue of integrations is a
 * matter of when.
 */
const EVERYTHING = CATALOGUE.flatMap((group) =>
  group.tools.map((tool) => ({ ...tool, groupId: group.id }))
);

const TABS = [
  { id: "all", name: "All", n: EVERYTHING.length },
  ...CATALOGUE.map((group) => ({ id: group.id, name: group.name, n: group.tools.length })),
];

/**
 * The brand mark, or the letter it starts with.
 *
 * Same rule as the orbit on the homepage and the model marquee in section 4:
 * whether a logo appears is decided by whether public/connectors/<slug>.svg
 * loads, not by a list kept here. Adding a brand is dropping the file in the
 * folder and nothing else.
 *
 * The fallback is a monogram rather than a category glyph. A glyph saying "mail"
 * on the Outlook card, inside a tab called Email, is the same word twice — where
 * the initial at least tells the cards apart at a glance.
 */
function Mark({ name, slug }: { name: string; slug: string }) {
  const [drawn, setDrawn] = useState(true);

  if (!drawn) return <span className="cn-mark cn-mark--letter">{name.charAt(0)}</span>;

  return (
    <span className="cn-mark">
      <img
        src={`${import.meta.env.BASE_URL}connectors/${slug}.svg`}
        alt=""
        onError={() => setDrawn(false)}
      />
    </span>
  );
}

export function ConnectorsCatalogPage({
  onNavigateHome,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  const [q, setQ] = useState("");
  const [at, setAt] = useState("all");
  const tabs = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const inTab =
      at === "all" ? EVERYTHING : EVERYTHING.filter((tool) => tool.groupId === at);

    if (!needle) return inTab;
    return inTab.filter((tool) =>
      `${tool.name} ${tool.what}`.toLowerCase().includes(needle)
    );
  }, [q, at]);

  /* Whether the same search would find anything at all. It is what decides
     between "nothing here" and "nothing anywhere" in the empty state, and the
     difference matters: the first has a way out and the second does not. */
  const elsewhere = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle || at === "all") return 0;
    return EVERYTHING.filter((tool) =>
      `${tool.name} ${tool.what}`.toLowerCase().includes(needle)
    ).length;
  }, [q, at]);

  const open = TABS.find((tab) => tab.id === at) ?? TABS[0];

  /* Arrow keys move between tabs, which is what a tablist is expected to do —
     without it the only way across seven tabs is seven Tab presses, and the
     roving tabindex below has already taken six of them out of the tab order. */
  function onTabKey(event: React.KeyboardEvent) {
    const step =
      event.key === "ArrowRight" ? 1 :
      event.key === "ArrowLeft" ? -1 :
      0;

    let next = -1;
    if (step) next = (TABS.findIndex((t) => t.id === at) + step + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    if (next < 0) return;

    event.preventDefault();
    setAt(TABS[next].id);
    tabs.current?.querySelectorAll<HTMLElement>("[role='tab']")[next]?.focus();
  }

  return (
    <div className="cn-page">
      <SiteHeaderF onNavigateHome={onNavigateHome} onLogIn={onLogIn} onSignUp={onSignUp} />

      <Container>
        {/* Two ways back, and they are different promises: the logo is "leave
            this page", the crumb is "go up one". Both land on the homepage
            today, and the crumb is the one that keeps meaning what it says if
            connectors ever gets a page underneath it. */}
        <nav className="cn-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <button type="button" onClick={onNavigateHome}>Home</button>
            </li>
            <li aria-hidden="true" className="cn-slash">/</li>
            <li aria-current="page">Connectors</li>
          </ol>
        </nav>

        <header className="cn-head">
          <h1 className="cn-title">Connect Starchild to the tools you already use.</h1>
          <p className="cn-sub">
            Browse {EVERYTHING.length} connectors across communication, productivity,
            design,<br />development, data and AI.
          </p>
        </header>

        <div className="cn-bar">
          <div
            ref={tabs}
            className="cn-tabs"
            role="tablist"
            aria-label="Connector categories"
            onKeyDown={onTabKey}
          >
            {TABS.map((tab) => {
              const on = tab.id === at;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`cn-tab-${tab.id}`}
                  aria-selected={on}
                  aria-controls="cn-panel"
                  // Roving: only the open tab is in the tab order, and the arrow
                  // keys move between the rest.
                  tabIndex={on ? 0 : -1}
                  onClick={() => setAt(tab.id)}
                  className={on ? "cn-tab cn-tab--on" : "cn-tab"}
                >
                  {tab.name}
                  <span className="cn-tab-n">{tab.n}</span>
                </button>
              );
            })}
          </div>

          <div className="cn-search">
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10.4 10.4L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder={at === "all" ? "Search connectors" : `Search ${open.name}`}
              aria-label="Search connectors"
            />
          </div>
        </div>

        {/* Live, so a keyboard user narrowing the list hears what happened —
            without it, typing into the box changes the page silently. */}
        <p className="sr-only" role="status">
          {shown.length} of {open.n} connectors shown in {open.name}.
        </p>

        <div id="cn-panel" role="tabpanel" aria-labelledby={`cn-tab-${at}`} tabIndex={-1}>
          {shown.length > 0 ? (
            <ul className="cn-grid">
              {/* The mark and the name, and nothing else. What each connector
                  does is still searchable — see `what` on the type — it is just
                  not printed: a grid of thirty-six cards is something you scan
                  for a logo you recognise, and a sentence under every one of
                  them is thirty-six sentences nobody reads. */}
              {shown.map((tool) => (
                <li key={tool.name} className="cn-card">
                  <Mark name={tool.name} slug={tool.slug} />
                  <span className="cn-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cn-none">
              <p>
                Nothing in {open.name} matches “{q.trim()}”.
              </p>
              {elsewhere > 0 ? (
                <button type="button" onClick={() => setAt("all")} className="cn-clear">
                  Search all {EVERYTHING.length} connectors ({elsewhere} match)
                </button>
              ) : (
                <button type="button" onClick={() => { setQ(""); setAt("all"); }} className="cn-clear">
                  Show everything
                </button>
              )}
            </div>
          )}
        </div>

        <p className="cn-foot">
          Connect an account once, to you. After that, letting an agent use it is
          a permission rather than another login.
        </p>
      </Container>

      <style>{`
        .cn-page {
          min-height: 100vh;
          padding-bottom: 56px;
          background: #050506;
          font-family: var(--font-google-sans);
        }

        /* ---------- crumbs and heading ---------- */

        .cn-crumbs { margin-top: 10px; }
        .cn-crumbs ol {
          display: flex; align-items: center; gap: 8px;
          margin: 0; padding: 0; list-style: none;
          font-size: 13px; color: rgba(255,255,255,.42);
        }
        .cn-crumbs button {
          padding: 0; border: 0; background: none; cursor: pointer;
          font: inherit; color: rgba(255,255,255,.6);
          transition: color .18s ease;
        }
        .cn-crumbs button:hover { color: #fff; }
        .cn-crumbs button:focus-visible { outline: 2px solid #f84600; outline-offset: 3px; border-radius: 4px; }
        .cn-crumbs [aria-current] { color: #fff; }
        .cn-slash { color: rgba(255,255,255,.22); }

        .cn-head { max-width: 620px; margin: 24px 0 0; }
        .cn-title {
          margin: 0;
          font-size: 34px; line-height: 1.16; font-weight: 600;
          letter-spacing: -.015em; color: #fff; text-wrap: balance;
        }
        .cn-sub {
          margin: 12px 0 0;
          font-size: 15.5px; line-height: 1.55; color: rgba(255,255,255,.55);
        }

        /* ---------- tabs and search ----------

           One rule under both, and the open tab sits on it. Underlined rather
           than pills: a row of eight pills is eight buttons of equal weight, and
           these are one control with eight positions. The line is what says
           that. */
        .cn-bar {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
          margin-top: 30px;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }

        .cn-tabs {
          display: flex; gap: 2px; min-width: 0;
          overflow-x: auto;
          /* the tabs scroll on a narrow window, and the scrollbar under them
             would sit on the rule they share */
          scrollbar-width: none;
        }
        .cn-tabs::-webkit-scrollbar { display: none; }

        .cn-tab {
          display: inline-flex; align-items: center; gap: 7px; flex: none;
          padding: 11px 14px; margin-bottom: -1px;
          border: 0; border-bottom: 2px solid transparent;
          background: none; cursor: pointer; white-space: nowrap;
          font-family: inherit; font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,.48);
          transition: color .18s ease, border-color .18s ease;
        }
        .cn-tab:hover { color: rgba(255,255,255,.82); }
        .cn-tab--on { color: #fff; border-bottom-color: #f84600; }
        .cn-tab:focus-visible { outline: 2px solid #f84600; outline-offset: -2px; border-radius: 4px; }

        .cn-tab-n {
          padding: 1px 6px; border-radius: 999px;
          background: rgba(255,255,255,.07);
          font-size: 10.5px; font-weight: 600; color: rgba(255,255,255,.42);
          transition: background-color .18s ease, color .18s ease;
        }
        .cn-tab--on .cn-tab-n { background: rgba(248,70,0,.14); color: #f84600; }

        .cn-search {
          display: flex; align-items: center; gap: 9px; flex: none;
          width: 230px; margin-bottom: 8px; padding: 8px 13px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 999px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.38);
          transition: border-color .18s ease, background-color .18s ease;
        }
        .cn-search:focus-within {
          border-color: rgba(248,70,0,.55); background: rgba(255,255,255,.06);
        }
        .cn-search input {
          width: 100%; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 13.5px; color: #fff;
        }
        .cn-search input::placeholder { color: rgba(255,255,255,.35); }
        /* the browser's own clear button is a grey blob on a dark field */
        .cn-search input::-webkit-search-cancel-button { -webkit-appearance: none; }

        #cn-panel:focus { outline: none; }

        /* ---------- the grid ----------

           auto-fill rather than a fixed count, so the same page holds five across
           on a wide window and two on a laptop without a breakpoint for each. The
           cells stretch to the tallest card in their row, which is what lets a
           description finish instead of being clipped. */
        .cn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
          gap: 12px;
          margin: 24px 0 0; padding: 0; list-style: none;
        }

        /* Upright, and the mark is the card. With the description gone the name
           is a label under a picture rather than a heading with body under it,
           so it is centred and the two are stacked — laid out on a row, a 48px
           mark beside two words leaves most of the card empty to its right. */
        .cn-card {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 20px 12px 18px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          background: #0a0a0b;
          text-align: center;
          transition: border-color .18s ease, background-color .18s ease;
        }
        .cn-card:hover { border-color: rgba(248,70,0,.35); background: #0d0d0f; }

        /* Square, with the corners rounded to the same family as the card around
           it — 8 inside 12, so the two curves look related rather than the mark
           looking like a sticker dropped on the card. Square is also what these
           marks are: an app icon is a rounded square everywhere else a person
           meets it, and a circle crops the ones drawn to fill their box. */
        /* Square, with the corners rounded to the same family as the card around
           it — 12 inside 12 at this size. Square is also what these marks are: an
           app icon is a rounded square everywhere else a person meets it, and a
           circle crops the ones drawn to fill their box.

           48 rather than 30, because with the description gone the mark is what
           the card is for. Anything smaller and a card of mostly empty ground
           would be carrying two words. */
        .cn-mark {
          display: grid; place-items: center; flex: none;
          width: 48px; height: 48px; border-radius: 12px;
          background: #fff; overflow: hidden;
        }
        .cn-mark img { width: 100%; height: 100%; object-fit: contain; }
        /* The monogram sits on the dark ground instead, because a single letter
           on a white tile reads as a broken image where a logo should be. */
        .cn-mark--letter {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          font-size: 19px; font-weight: 600; color: rgba(255,255,255,.66);
        }

        /* Balanced so a two-word name wraps to two lines without the card
           growing much — "Google Search Console" is the one that decides this. */
        .cn-name {
          font-size: 13px; line-height: 1.35; font-weight: 500; color: #fff;
          text-wrap: balance;
        }

        /* ---------- nothing found, and the footer ---------- */

        .cn-none {
          display: flex; flex-direction: column; align-items: flex-start; gap: 14px;
          margin-top: 44px; padding-bottom: 36px;
          color: rgba(255,255,255,.55); font-size: 15px;
        }
        .cn-none p { margin: 0; }
        .cn-clear {
          padding: 8px 16px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(248,70,0,.55); background: rgba(248,70,0,.08);
          font-family: inherit; font-size: 13px; font-weight: 500; color: #f84600;
        }
        .cn-clear:focus-visible { outline: 2px solid #f84600; outline-offset: 2px; }

        .cn-foot {
          margin: 32px 0 0; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.08);
          font-size: 13px; color: rgba(255,255,255,.4);
        }

        @media (max-width: 860px) {
          .cn-title { font-size: 27px; }
          /* The search drops under the tabs rather than squeezing them: at this
             width the two of them share a line only by making the tab strip too
             short to show more than three. */
          .cn-bar { flex-direction: column; align-items: stretch; gap: 0; }
          .cn-search {
            order: -1; width: 100%; margin: 0 0 16px;
          }
          .cn-tabs { margin-bottom: 0; }
          .cn-grid { grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: 10px; }
        }
      `}</style>
    </div>
  );
}
