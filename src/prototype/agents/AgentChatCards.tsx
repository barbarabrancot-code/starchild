import { motion } from "motion/react";
import { type Agent } from "./agentsData";
import { OptionModal } from "../OptionModal";
import { ConnectorMark } from "./ConnectorMark";

/**
 * What an ongoing agent's presence looks like from inside the conversation
 * that made it — a preview of a finding somewhere outside Starchild, and the
 * moment before a connector gets added.
 */

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * What the same finding looks like somewhere that is not Starchild.
 *
 * Rendered as a preview inside the product, which is the only honest way to show
 * it: the point being made is about the *shape* of an external alert, not about
 * Telegram. Three lines and one button, "open in Starchild" — because an outpost
 * that tried to also carry watch/pause controls would be a second product to
 * keep in sync, and the second copy is always the wrong one. The footer's promise
 * ("control stays in Starchild") used to sit oddly next to two buttons that
 * changed state from right here; now it is just true.
 */
export function ExternalAlert({
  agent,
  channel = "Telegram",
  headline,
  detail,
  onOpen,
}: {
  agent: Agent;
  channel?: string;
  headline: string;
  detail: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="ext"
    >
      <p className="ext-where">{channel} · preview</p>

      <div className="ext-card">
        <p className="ext-name">{agent.name}</p>
        <p className="ext-line">{headline}</p>
        <p className="ext-sub">{detail}</p>

        <div className="ext-acts">
          <button type="button" className="ext-btn ext-btn--go" onClick={onOpen}>
            Open in Starchild
          </button>
        </div>
      </div>

      <p className="ext-foot">Notifications can happen anywhere. Control stays in Starchild.</p>

      <style>{`
        .ext { display: flex; flex-direction: column; gap: 9px; font-family: var(--font-google-sans); }
        .ext-where {
          margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        /* Not styled as Telegram. A convincing forgery of another product's chrome
           would be making a claim about integration depth that is not true, and the
           thing worth showing is that the alert is thin, not that it is theirs. */
        .ext-card {
          max-width: 420px; padding: 13px 15px 14px; border-radius: 14px;
          background: rgba(255,255,255,.05);
        }
        .ext-name { margin: 0; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.85); }
        .ext-line { margin: 5px 0 0; font-size: 14px; color: #fff; }
        .ext-sub { margin: 2px 0 0; font-size: 13px; color: rgba(255,255,255,.5); }
        .ext-acts { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
        .ext-btn {
          border-radius: 999px; padding: 6px 12px; font-size: 12.5px;
          background: rgba(255,255,255,.07); color: rgba(255,255,255,.75);
          transition: background .2s, color .2s;
        }
        .ext-btn:hover { background: rgba(255,255,255,.12); color: #fff; }
        .ext-btn--go { background: rgba(248,70,0,.16); color: #ff7a45; }
        .ext-btn--go:hover { background: rgba(248,70,0,.24); color: #fff; }
        .ext-foot { margin: 0; font-size: 12px; color: rgba(255,255,255,.32); }
      `}</style>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * The moment before a connector gets added, asked as a real choice inside the
 * conversation rather than a jump into the agent's own settings. Letters, not
 * icons: five short options read faster as A/B/C/D/E than as a row of glyphs
 * someone has to match to a name.
 */
export function ConnectorChoice({ onClose = () => {} }: { onClose?: () => void } = {}) {
  return (
    <OptionModal
      title="Which connector should I add?"
      subtitle="Once you choose, I'll add it here on this agent."
      options={[
        { letter: "A", label: "GitHub", desc: "PRs, issues, repos" },
        { letter: "B", label: "Figma", desc: "Design files and comments" },
        { letter: "C", label: "Google Workspace", desc: "Docs, Drive, Gmail, Calendar" },
        { letter: "D", label: "Slack", desc: "Channels and DMs", icon: <ConnectorMark id="slack" className="size-4" /> },
        { letter: "E", label: "Other" },
      ]}
      onPick={() => {}}
      onCustom={() => {}}
      onClose={onClose}
    />
  );
}
