import { useState } from "react";
import { ExternalLinkIcon } from "../icons";

/**
 * The one place an agent's words can carry a real destination — a calendar
 * event, an invite that went out — rather than just naming it in prose. Two
 * shapes get picked up: `[label](url)`, written into the seed data by hand
 * for the one or two links a turn actually has, and a bare email address,
 * because typing one in plain text and not being able to act on it is a
 * worse reading experience than the markdown a link needs.
 *
 * The hover preview exists for the same reason a browser's own status bar
 * does: what you're about to open, before you've committed to opening it.
 */
const TOKEN_RE = /\[([^\]]+)\]\(([^)]+)\)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  TOKEN_RE.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[3]) {
      nodes.push(<LinkChip key={key++} label={match[3]} url={`mailto:${match[3]}`} />);
    } else {
      nodes.push(<LinkChip key={key++} label={match[1]} url={match[2]} />);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}

function LinkChip({ label, url }: { label: string; url: string }) {
  const [hover, setHover] = useState(false);
  const shown = url.replace(/^https?:\/\//, "");

  return (
    <span className="rt-wrap" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <a href={url} target="_blank" rel="noreferrer" className="rt-link">{label}</a>
      {hover && (
        <span className="rt-preview" role="tooltip">
          <span className="rt-preview-url">{shown}</span>
          <ExternalLinkIcon className="rt-preview-icon size-3" />
        </span>
      )}

      <style>{`
        .rt-wrap { position: relative; display: inline; }
        .rt-link { color: #6cb4ff; text-decoration: none; }
        .rt-link:hover { text-decoration: underline; }

        .rt-preview {
          position: absolute; bottom: calc(100% + 6px); left: 0; z-index: 20;
          display: flex; align-items: center; gap: 6px; max-width: 280px;
          padding: 6px 10px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1); background: #1a1a1c;
          box-shadow: 0 8px 24px rgba(0,0,0,.35);
          white-space: nowrap;
        }
        .rt-preview-url {
          overflow: hidden; text-overflow: ellipsis;
          font-size: 12px; color: rgba(255,255,255,.6);
        }
        .rt-preview-icon { flex: none; color: rgba(255,255,255,.35); }
      `}</style>
    </span>
  );
}
