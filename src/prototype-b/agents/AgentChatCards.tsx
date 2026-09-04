import { motion } from "motion/react";
import { AgentOrb } from "./AgentOrb";
import { useAgents } from "./store";
import { STATUS_LABEL, type Agent } from "./agentsData";

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
 * The agent coming back with something.
 *
 * This is the moment the whole model is for: work happened while nobody was
 * looking, and it arrives in the conversation that asked for it rather than in a
 * notifications tab. The finding is the agent's own sentence — it is a colleague
 * reporting, not a system emitting an event — and the actions under it are the
 * four things anyone actually does next.
 */
export function AgentUpdate({
  agent,
  found,
  onDetails,
  onKeep,
  onThreshold,
  onPause,
  /**
   * What the third button asks for.
   *
   * "Change threshold" made sense for a single number — Travel Watcher's price
   * ceiling. A condition-based watcher has no one number to move; what it has is
   * a bar to raise, so the same slot reads "Tighten conditions" there instead.
   * One button, two jobs it can honestly name.
   */
  thresholdLabel = "Change threshold",
  /**
   * What the first button does. Usually an inline expansion ("View details");
   * for a dedicated agent's update it is real navigation, so the label says so
   * rather than promising something the click doesn't do — "View details" that
   * actually opens a whole other page is a small daily surprise.
   */
  detailsLabel = "View details",
}: {
  agent: Agent;
  found: string;
  onDetails: () => void;
  onKeep: () => void;
  /** omit for a dedicated agent's update — see scenario 8: three actions, not four */
  onThreshold?: () => void;
  onPause: () => void;
  thresholdLabel?: string;
  detailsLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="acard acard--found"
    >
      <div className="acard-head">
        <AgentOrb status="waiting" size={12} halo accent={agent.accent} />
        <p className="acard-name">{agent.name}</p>
        {/* The same word the roster and the drawer would use for this agent right
            now, not a label invented for this card. "Found something" read well
            here and appeared nowhere else in the product, which is how a status
            vocabulary stops being one — the headline below already says what it
            found, and what the status has to carry is that it is now waiting on
            you. */}
        <span className="acard-state acard-state--hit">{STATUS_LABEL[agent.status]}</span>
      </div>

      <p className="acard-found">{found}</p>

      <div className="acard-acts">
        <button type="button" className="acard-btn acard-btn--go" onClick={onDetails}>
          {detailsLabel}
        </button>
        <button type="button" className="acard-btn" onClick={onKeep}>
          Keep watching
        </button>
        {onThreshold && (
          <button type="button" className="acard-btn" onClick={onThreshold}>
            {thresholdLabel}
          </button>
        )}
        <button type="button" className="acard-btn acard-btn--quiet" onClick={onPause}>
          Pause
        </button>
      </div>

      {/* Not a badge. The one thing that makes an alert trustworthy is being able
          to see the work behind it without asking. */}
      <p className="acard-foot">{agent.lastChecked ?? "Checked just now"}</p>

      <CardStyle />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * A prepared strategy, waiting on a person.
 *
 * The one card in this set that is not describing something that already
 * happened. Everything above reports; this asks. So it is the only one with an
 * accent-filled action, and the only one where the quiet option is not "pause"
 * but "reject" — pausing a watcher costs nothing, and leaving a prepared order
 * ambiguous costs whatever the market does next.
 *
 * Nothing here places anything. There is no code path in this prototype from
 * this card to an order, approved or otherwise, and the line at the foot is not
 * decoration: it is the claim the card exists to make.
 */
export function StrategyCard({
  agent,
  entry,
  stop,
  takeProfit,
  risk,
  onApprove,
  onEdit,
  onReject,
  onKeep,
}: {
  agent: Agent;
  entry: string;
  stop: string;
  takeProfit: string[];
  risk: string;
  onApprove: () => void;
  onEdit: () => void;
  onReject: () => void;
  onKeep: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="acard acard--gate"
    >
      <div className="acard-head">
        <AgentOrb status="approval" size={12} halo accent={agent.accent} />
        <p className="acard-name">{agent.name}</p>
        <span className="acard-state acard-state--hit">Signal found. Approval required.</span>
      </div>

      <dl className="acard-plan">
        <div>
          <dt>Entry</dt>
          <dd>{entry}</dd>
        </div>
        <div>
          <dt>Stop loss</dt>
          <dd>{stop}</dd>
        </div>
        <div>
          <dt>Take profit</dt>
          <dd>{takeProfit.join(" · ")}</dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>{risk}</dd>
        </div>
      </dl>

      <div className="acard-acts">
        <button type="button" className="acard-btn acard-btn--go" onClick={onApprove}>
          Approve
        </button>
        <button type="button" className="acard-btn" onClick={onEdit}>
          Edit strategy
        </button>
        <button type="button" className="acard-btn" onClick={onReject}>
          Reject
        </button>
        <button type="button" className="acard-btn acard-btn--quiet" onClick={onKeep}>
          Keep watching
        </button>
      </div>

      <p className="acard-foot">No trade placed without your approval.</p>

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
      .acard--found { background: rgba(248,70,0,.07); }
      /* The only card that is asking rather than telling, and the only one with a
         visible edge. It earns the edge by being the one you must not scroll past. */
      .acard--gate { background: rgba(248,70,0,.08); box-shadow: inset 0 0 0 1px rgba(248,70,0,.22); }

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

      /* Four facts that are read as a set, so they are laid out as one. */
      .acard-plan { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 26px; margin: 0; }
      .acard-plan dt {
        margin: 0; font-size: 11px; letter-spacing: .07em; text-transform: uppercase;
        color: rgba(255,255,255,.3);
      }
      .acard-plan dd { margin: 3px 0 0; font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.8); }
      .acard--off { opacity: .62; }

      .acard-head { display: flex; align-items: center; gap: 9px; }
      .acard-name { margin: 0; font-size: 15px; font-weight: 600; }
      .acard-state {
        margin-left: auto; font-size: 12px; color: rgba(255,255,255,.4);
      }
      .acard-state--hit { color: #ff7a45; }

      .acard-doing { margin: 0; font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.78); }
      .acard-found { margin: 0; font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.9); }

      /* Two facts, side by side, as label-over-value. As a sentence they read as
         prose nobody finishes; as a table they read as a dashboard. This is the
         smallest thing that is neither. */
      .acard-facts { display: flex; flex-wrap: wrap; gap: 12px 26px; margin: 0; }
      .acard-facts dt {
        margin: 0; font-size: 11px; letter-spacing: .07em; text-transform: uppercase;
        color: rgba(255,255,255,.3);
      }
      .acard-facts dd { margin: 3px 0 0; font-size: 13px; color: rgba(255,255,255,.65); }

      .acard-acts { display: flex; flex-wrap: wrap; gap: 7px; }
      .acard-btn {
        border-radius: 999px; padding: 6px 13px; font-size: 12.5px;
        background: rgba(255,255,255,.07); color: rgba(255,255,255,.78);
        transition: background .2s, color .2s;
      }
      .acard-btn:hover { background: rgba(255,255,255,.13); color: #fff; }
      .acard-btn--go { background: rgba(248,70,0,.18); color: #ff7a45; }
      .acard-btn--go:hover { background: rgba(248,70,0,.26); color: #fff; }
      .acard-btn--quiet { background: none; color: rgba(255,255,255,.42); }
      .acard-btn--quiet:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.8); }

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
