import { motion } from "motion/react";
import { AppIcon } from "./AppIcon";
import { AgentOrb } from "./AgentOrb";
import { BY_ID, type ConnectorId } from "./connectors";
import { useAgents } from "./store";
import type { Request } from "./readRequest";
import type { Agent } from "./agentsData";

/**
 * The seam between the two product areas, and the only place they touch.
 *
 * Three cards, in the order they can appear inside a normal conversation:
 *
 *   ConnectFirst   — this needs Gmail, connect it and I'll carry on. Nothing else.
 *   AgentSuggestion — that sounded like a standing job. Want one? Two answers.
 *   AgentMade      — it exists, here is what it took with it, here is the door.
 *
 * What none of them do is move the conversation. Chat is where the request was
 * made and Chat is where it stays; an agent created here is a second thing that
 * now exists, not this thing relocated.
 */

/* ────────────────────────────────────────────────────────────────────────────
   1 · a one-time action that needs a tool
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Asked in the conversation, answered in the conversation, and then the work
 * happens — the whole point is that connecting a tool is a step inside a task, not
 * the start of setting something up. It deliberately says nothing about agents.
 * Naming the thing you are trying not to imply is how you imply it.
 */
export function ConnectFirst({
  needs,
  onReady,
}: {
  needs: ConnectorId[];
  onReady: () => void;
}) {
  const { isConnected, connect } = useAgents();
  const left = needs.filter((id) => !isConnected(id));
  const names = left.map((id) => BY_ID[id].name);

  const take = (id: ConnectorId) => {
    connect(id);
    // the last one connected is the one that unblocks the task
    if (left.length === 1) window.setTimeout(onReady, 420);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="hoff hoff--ask"
    >
      <p className="hoff-say">
        I&rsquo;ll need {names.length === 1 ? names[0] : names.join(" and ")} for that. Connect
        {names.length === 1 ? " it" : " them"} and I&rsquo;ll pick up where we left off.
      </p>

      <div className="hoff-conns">
        {left.map((id) => (
          <div key={id} className="hoff-conn">
            <span className="hoff-conn-glyph"><AppIcon kind={BY_ID[id].kind} className="size-4" /></span>
            <span className="hoff-conn-body">
              <span className="hoff-conn-name">{BY_ID[id].name}</span>
              {/* the grant, said the way someone can agree with it */}
              <span className="hoff-conn-grant">{BY_ID[id].grants[0]}</span>
            </span>
            <button type="button" className="hoff-btn hoff-btn--go" onClick={() => take(id)}>
              Connect
            </button>
          </div>
        ))}
      </div>

      <Style />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   2 · a request that would outlive its answer
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * A question, and it has to look like one. This is the moment where a product
 * either respects the difference between the two areas or quietly erodes it, and
 * the erosion always starts by making the suggestion look like the obvious next
 * step. So: no accent fill, no default focus, both answers the same weight, and
 * "Not now" genuinely ends it for this message.
 */
export function AgentSuggestion({
  request,
  because,
  proposal,
  onCreate,
  onDismiss,
}: {
  request?: Request;
  /** written reason, for a conversation being read back out of history */
  because?: string;
  /** what it would be called and what it would do, shown before it exists */
  proposal?: { name: string; role: string };
  onCreate: () => void;
  onDismiss: () => void;
}) {
  const marketWatcher = proposal?.name === "Market Watcher";
  const reason =
    because ??
    (marketWatcher
      ? "You've asked me to check this watchlist a few times. Want me to create a Market Watcher that keeps tracking HYPE, SOL, and ETH for meaningful changes?"
      : request && request.repeats >= 2
      ? `That's the ${ordinal(request.repeats)} time you've asked me for this. An Agent would do it without being asked, and report back in its own thread.`
      : `It would keep doing this for you${request?.cadence ? ` ${request.cadence}` : ""} and report back in its own thread.`);

  /*
    Two things, not one card.

    The reason is Starchild talking — it is checkable ("you have asked for this
    three times" is something the person remembers doing), and it reads as the
    product noticing rather than guessing. Held inside the card it was a wall of
    explanation wrapped around a button, which is the shape of a cookie banner.

    Out here it is a message like any other message, and what stays in the card is
    only the thing being offered: a name and a job. That is also what makes "Not
    now" a real answer rather than a guess — it is the first point at which there
    is something specific to decline.
  */
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`hoff hoff--decision${marketWatcher ? " hoff--market" : ""}`}
    >
      <p className="hoff-decision-copy">{reason}</p>
      <div className="hoff-actions">
        <button type="button" className="hoff-btn hoff-btn--go" onClick={onCreate}>
          Handle it for me
        </button>
        <button type="button" className="hoff-btn hoff-btn--decision-quiet" onClick={onDismiss}>
          Not now
        </button>
      </div>
      <Style />
    </motion.div>
  );
}

/** counted out loud, because "3rd" in a sentence someone is reading is a stumble */
function ordinal(n: number) {
  return ["", "first", "second", "third", "fourth", "fifth", "sixth"][n] ?? `${n}th`;
}

/* ────────────────────────────────────────────────────────────────────────────
   3 · what was made, and what it took with it
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * The receipt.
 *
 * Four things and nothing else: it exists, this is what it is now responsible for,
 * here is the door, and the conversation you are reading has not moved. Anything
 * beyond that competes with the one fact worth landing — a standing thing now
 * exists — and this is a moment for closure rather than for setup.
 *
 * It used to carry the connector chips as live toggles, on the argument that a
 * permission you can only revoke elsewhere is one nobody revokes. That argument
 * still holds; the answer to it is that the agent's own panel puts the same
 * control one click away, behind the name, which is where someone looks when they
 * are thinking about what an agent may reach — not while they are being told it
 * was created.
 */
export function AgentMade({ agent, onOpen }: { agent: Agent; onOpen: () => void }) {
  // read back from the roster, so renaming it in its own panel is reflected here
  const { roster } = useAgents();
  const live = roster.find((a) => a.id === agent.id) ?? agent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="hoff hoff--made"
    >
      <p className="hoff-kicker">Agent created</p>

      <div className="hoff-id">
        <AgentOrb status="scheduled" size={13} halo accent={live.accent} />
        <div>
          <p className="hoff-name">{live.name}</p>
          <p className="hoff-role">{live.role}</p>
        </div>
      </div>

      <div className="hoff-actions">
        <button type="button" className="hoff-btn hoff-btn--go" onClick={onOpen}>
          Open Agent
        </button>
        {/* the sentence that stops someone hunting for where their chat went */}
        <span className="hoff-stay">This conversation stays here.</span>
      </div>

      <Style />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

function Style() {
  return (
    <style>{`
      .hoff {
        display: flex; flex-direction: column; gap: 14px;
        padding: 18px 20px; border-radius: 18px;
        border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
        font-family: var(--font-google-sans); color: #fff;
      }
      /* The three are deliberately not equally loud. Being asked something is
         quieter than being told a standing thing now exists — but "louder" here is
         a warmer edge and nothing more. A success state that celebrates is a
         success state someone has to dismiss. */
      .hoff--offer { border-style: dashed; border-color: rgba(255,255,255,.16); background: none; }
      .hoff--decision { gap: 30px; padding: 48px 54px 58px; border: 0; border-radius: 24px; background: #151515; }
      .hoff-decision-copy { max-width: 940px; margin: 0; font-size: 29px; line-height: 1.34; letter-spacing: -.03em; color: #fff; }
      /* An outline where a created agent has a lit orb. It does not exist yet, and
         a filled mark for something that has not been made is the card quietly
         answering its own question. */
      .hoff-propose {
        display: block; width: 13px; height: 13px; border-radius: 999px;
        border: 1px dashed rgba(255,255,255,.35);
      }
      .hoff--made {
        gap: 12px; padding: 15px 18px 16px;
        border-color: rgba(248,70,0,.3); background: rgba(248,70,0,.05);
      }

      /* Outside the card and shaped like every other thing Starchild says, because
         that is what it is. */
      .hoff-msg {
        max-width: 520px; margin: 0;
        font-family: var(--font-google-sans);
        font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.88) !important;
      }
      .hoff-note { margin: -4px 0 0; font-size: 12px; color: rgba(255,255,255,.3); }
      .hoff-say { margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.8); }
      .hoff-title { margin: 0; font-size: 15px; font-weight: 600; }
      .hoff-sub { margin: -4px 0 0; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.5); }

      .hoff-kicker {
        margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .16em;
        text-transform: uppercase; color: var(--color-primary);
      }
      .hoff-id { display: flex; align-items: flex-start; gap: 11px; }
      /* the orb is 13px against a 15.5px line — centred on the name, not on the box */
      .hoff-id > :first-child { margin-top: 5px; }
      .hoff-name { margin: 0; font-size: 15.5px; font-weight: 600; }
      .hoff-role { margin: 3px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.55); }

      .hoff-conns { display: flex; flex-direction: column; gap: 8px; }
      .hoff-conn {
        display: flex; align-items: center; gap: 12px;
        padding: 11px 14px; border-radius: 13px;
        border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
      }
      .hoff-conn-glyph { flex: none; display: flex; color: rgba(255,255,255,.45); }
      .hoff-conn-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .hoff-conn-name { font-size: 14px; }
      .hoff-conn-grant { font-size: 12px; color: rgba(255,255,255,.38); }
      .hoff-conn .hoff-btn { margin-left: auto; }


      .hoff-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .hoff-btn {
        padding: 8px 16px; border-radius: 999px; cursor: pointer;
        border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.04);
        font-family: inherit; font-size: 13.5px; color: #fff;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .hoff-btn:hover { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.08); }
      .hoff-btn--quiet { border-color: transparent; background: none; color: rgba(255,255,255,.45); }
      .hoff-btn--quiet:hover { background: rgba(255,255,255,.05); color: #fff; }
      .hoff-btn--go {
        border-color: transparent; background: var(--color-primary); color: #fff; font-weight: 500;
      }
      .hoff-btn--go:hover { background: #ff5a1f; border-color: transparent; }
      .hoff-btn--decision-quiet { padding: 8px 14px; color: var(--color-primary); font-size: 18px; font-weight: 500; }
      .hoff-btn--decision-quiet:hover { color: #ff5a1f; background: transparent; }

      @media (max-width: 640px) {
        .hoff--decision { gap: 22px; padding: 28px; border-radius: 18px; }
        .hoff-decision-copy { font-size: 20px; }
      }

      .hoff-stay { font-size: 12.5px; color: rgba(255,255,255,.35); }
    `}</style>
  );
}
