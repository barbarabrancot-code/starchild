import { motion } from "motion/react";
import { AgentOrb } from "./AgentOrb";
import { useAgents } from "./store";
import { type Agent } from "./agentsData";
import { OptionModal } from "../OptionModal";

/**
 * What an ongoing agent looks like from inside the conversation that made it.
 *
 * These are the main chat's half of the product model. The Agents area is where
 * you go to study one; this is where you find out one exists, and — more to the
 * point — where you change it without going anywhere. If the card were only a
 * link to the real controls, then every amendment would cost the conversation,
 * and the conversation is the thing people are actually in.
 *
 * So they are deliberately small. Enough to answer four questions at a glance —
 * what is it, is it running, what is it doing, where will it reach me — and not
 * one field more. A card in a chat competing with the chat is a card that has
 * misunderstood where it is.
 */

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * The standing card: an agent exists and is yours to change from here.
 *
 * "Edit here" does not open an editor. It puts the cursor in the composer the
 * conversation is already using, because the editor is the composer — that is the
 * entire claim this prototype is making, and a panel sliding out would quietly
 * retract it.
 */
export function AgentLive({
  agent,
  onOpen,
  onEditHere,
  onPause,
}: {
  agent: Agent;
  /**
   * Accepted and unused since the Edit here / Open agent / Pause row came off
   * this card. Still in the signature because ChatScreen passes all three and
   * this is a decision about the card's chrome, not about the caller — wire them
   * to something or take them out of ChatScreen too.
   */
  onOpen?: () => void;
  onEditHere?: () => void;
  onPause?: () => void;
}) {
  // read through the roster, so an edit made anywhere shows up here
  const { roster } = useAgents();
  const live = roster.find((a) => a.id === agent.id) ?? agent;
  const paused = live.status === "paused";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className={`acard${paused ? " acard--off" : ""}`}
    >
      <div className="acard-head">
        <AgentOrb status={live.status} size={12} halo={!paused} accent={live.accent} />
        <p className="acard-name">{live.name}</p>
        <span className="acard-state">{paused ? "Paused" : "Active"}</span>
      </div>

      {/* The standing instruction, verbatim. It is the one line on the card that
          changes when somebody amends the job from the chat, which is why it is
          the line with the most room. */}
      <motion.p layout className="acard-doing">
        {live.instruction ?? live.role}
      </motion.p>

      {/* The markets, as markets. Tickers buried in a sentence are unreadable at a
          glance and, more to the point, unverifiable: the one question a trader
          asks a watcher card is "is it on the thing I think it is on", and that
          has to be answerable without parsing prose. */}
      {(live.watchlist?.length ?? 0) > 0 && (
        <motion.p layout className="acard-marks">
          {live.watchlist!.map((t) => (
            <span key={t} className="acard-mark">{t}</span>
          ))}
        </motion.p>
      )}

      {(live.conditions?.length ?? 0) > 0 && (
        <dl className="acard-facts">
          <div className="acard-wide">
            <dt>Alerts when</dt>
            <dd>{live.conditions!.join(", and ")}</dd>
          </div>
        </dl>
      )}

      {/* Stated on the card rather than assumed, because the whole value of the
          guarantee is that somebody can see it without going to look for it. */}
      {live.approval && (
        <p className="acard-gate">
          <span className="acard-gate-dot" aria-hidden="true" />
          Approval required before placing orders
        </p>
      )}

      <div className="acard-actions">
        <button type="button" onClick={onEditHere}>Edit</button>
        <button type="button" onClick={onPause}>{paused ? "Resume" : "Pause"}</button>
        <button type="button" onClick={onOpen}>View job</button>
      </div>

      <p className="acard-foot">Keep talking here. Starchild will route it to the right agent.</p>

      <CardStyle />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * What the same finding looks like somewhere that is not Starchild.
 *
 * Rendered as a preview inside the product, which is the only honest way to show
 * it: the point being made is about the *shape* of an external alert, not about
 * Telegram. Three lines and two buttons, one of which is "open in Starchild" —
 * because an outpost that tried to carry the full history and controls would be
 * a second product to keep in sync, and the second copy is always the wrong one.
 */
export function ExternalAlert({
  agent,
  channel = "Telegram",
  headline,
  detail,
  onOpen,
  onKeep,
  onPause,
}: {
  agent: Agent;
  channel?: string;
  headline: string;
  detail: string;
  onOpen: () => void;
  onKeep: () => void;
  onPause: () => void;
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
          <button type="button" className="ext-btn" onClick={onKeep}>
            Keep watching
          </button>
          <button type="button" className="ext-btn" onClick={onPause}>
            Pause
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
        { letter: "D", label: "Slack", desc: "Channels and DMs" },
        { letter: "E", label: "Other" },
      ]}
      onPick={() => {}}
      onCustom={() => {}}
      onClose={onClose}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

function CardStyle() {
  return (
    <style>{`
      /* One shape for every agent card in the chat. They differ by a single
         warmer edge and nothing else — three card designs would turn a
         conversation into a dashboard. */
      .acard {
        display: flex; flex-direction: column; gap: 11px;
        max-width: 480px; padding: 15px 17px 14px;
        border-radius: 18px; background: rgba(255,255,255,.04);
        font-family: var(--font-google-sans); color: #fff;
      }
      /* Tickers as marks, not as chips: no fill, no border, just the letterform
         given room and a little weight. A row of coloured pills is a dashboard. */
      .acard-marks { display: flex; flex-wrap: wrap; gap: 12px; margin: -2px 0 0; }
      .acard-mark {
        font-size: 12.5px; font-weight: 600; letter-spacing: .04em;
        color: rgba(255,255,255,.72);
      }

      .acard-wide { flex-basis: 100%; }

      .acard-gate {
        display: flex; align-items: center; gap: 7px; margin: 0;
        font-size: 12.5px; color: #ff7a45;
      }
      .acard-gate-dot {
        width: 5px; height: 5px; border-radius: 999px; background: currentColor;
      }

      .acard--off { opacity: .62; }

      .acard-head { display: flex; align-items: center; gap: 9px; }
      .acard-name { margin: 0; font-size: 15px; font-weight: 600; }
      .acard-state {
        margin-left: auto; font-size: 12px; color: rgba(255,255,255,.4);
      }

      .acard-doing { margin: 0; font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.78); }

      /* Two facts, side by side, as label-over-value. As a sentence they read as
         prose nobody finishes; as a table they read as a dashboard. This is the
         smallest thing that is neither. */
      .acard-facts { display: flex; flex-wrap: wrap; gap: 12px 26px; margin: 0; }
      .acard-facts dt {
        margin: 0; font-size: 11px; letter-spacing: .07em; text-transform: uppercase;
        color: rgba(255,255,255,.3);
      }
      .acard-facts dd { margin: 3px 0 0; font-size: 13px; color: rgba(255,255,255,.65); }

      .acard-foot { margin: 0; font-size: 12px; color: rgba(255,255,255,.32); }
      .acard-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .acard-actions button {
        border: 0; border-radius: 999px; background: rgba(255,255,255,.08); cursor: pointer;
        padding: 7px 13px; font-family: inherit; font-size: 13px; color: rgba(255,255,255,.72);
      }
      .acard-actions button:hover { background: rgba(255,255,255,.14); color: #fff; }
    `}</style>
  );
}
