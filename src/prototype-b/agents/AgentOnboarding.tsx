import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AgentOrb } from "./AgentOrb";
import { ACCENTS, TEMPLATES, type AccentId } from "./onboardingData";
import { ConnectorPicker } from "./ConnectorPicker";
import { HowGraphic } from "./HowGraphics";
import type { ConnectorId } from "./connectors";

/**
 * The first time someone opens Agents.
 *
 * It runs once. Everything in it is either a fact they need before the word makes
 * sense, or a decision that shapes what comes after — and the one thing it never
 * does is ask them to describe the job in a form. That happens in the next screen,
 * in conversation, because "what do you want me on first?" is a question a
 * colleague asks and a field is not.
 *
 * FIRST DRAFT — sequence and logic, deliberately unpolished.
 */

type Step = "intro" | "how" | "tools" | "identity";

/** Four things, in the order they stop being abstract. */
const HOW = [
  {
    title: "Give it a job",
    body: "Tell the agent what you want it to take care of. One standing job, in your own words.",
  },
  {
    title: "Connect your tools",
    body: "It works across the apps you already use — and only the ones you connect.",
  },
  {
    title: "Let it keep going",
    body: "It checks things, runs routines, and carries on after you close the tab.",
  },
  {
    title: "Come back when it matters",
    body: "It reports what it found, and asks first before anything it can't undo.",
  },
];

export type NewAgent = {
  name: string;
  accent: AccentId;
  tools: ConnectorId[];
  template?: string;
};

export function AgentOnboarding({
  /** false for "+ New agent": tools are already chosen and the concept is known */
  firstTime,
  onCancel,
  onDone,
}: {
  firstTime: boolean;
  onCancel: () => void;
  onDone: (agent: NewAgent) => void;
}) {
  const [step, setStep] = useState<Step>(firstTime ? "intro" : "identity");
  const [card, setCard] = useState(0);
  const [tools, setTools] = useState<ConnectorId[]>([]);
  const [name, setName] = useState("");
  const [accent, setAccent] = useState<AccentId>("ember");
  const [template, setTemplate] = useState<string | undefined>();

  const pickTemplate = (t: (typeof TEMPLATES)[number]) => {
    setTemplate(t.id);
    if (!name.trim()) setName(t.name);
  };

  return (
    <div className="ob-stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={step + (step === "how" ? card : "")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.16 } }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className={`ob-panel${step === "tools" ? " ob-panel--wide" : ""}`}
        >
          {/* ---------- 1 · what these are ---------- */}
          {step === "intro" && (
            <>
              <div className="ob-orb"><AgentOrb status="working" size={26} halo /></div>
              <h1 className="ob-h1">Agents work for you over time.</h1>
              <p className="ob-lede">
                Give them a job, connect the tools they need, and let them keep things moving even
                when you're away.
              </p>
              <Actions primary="Continue" onPrimary={() => setStep("how")} onSecondary={onCancel} secondary="Not now" />
            </>
          )}

          {/* ---------- 2 · how they work, one idea at a time ---------- */}
          {step === "how" && (
            <>
              <span className="ob-count">{card + 1} of {HOW.length}</span>
              <div className="ob-card">
                {/* Drawn in the same signs the roster uses, so the explanation and
                    the product teach each other rather than sitting side by side. */}
                <HowGraphic i={card} />
                <h2 className="ob-h2">{HOW[card].title}</h2>
                <p className="ob-lede">{HOW[card].body}</p>
              </div>
              <Actions
                primary={card === HOW.length - 1 ? "Continue" : "Next"}
                onPrimary={() => (card === HOW.length - 1 ? setStep("tools") : setCard(card + 1))}
                secondary="Back"
                onSecondary={() => (card === 0 ? setStep("intro") : setCard(card - 1))}
              />
              <Dots n={HOW.length} at={card} />
            </>
          )}

          {/* ---------- 3 · the tools, once for the account ---------- */}
          {step === "tools" && (
            <>
              <h2 className="ob-h2">Tools this agent can use</h2>
              <p className="ob-lede">
                Connect a tool to Starchild once, then choose which agents may use it. You can
                change this any time.
              </p>

              <ConnectorPicker enabled={tools} onToggle={setTools} />

              <Actions
                primary="Continue"
                onPrimary={() => setStep("identity")}
                secondary="Back"
                onSecondary={() => setStep("how")}
              />
            </>
          )}

          {/* ---------- 4 · who it is ---------- */}
          {step === "identity" && (
            <>
              <h2 className="ob-h2">{firstTime ? "Create your first agent" : "Create an agent"}</h2>
              <p className="ob-lede">You can change any of this later.</p>

              <div className="ob-preview" style={{ ["--pick" as string]: ACCENTS[accent].hex }}>
                <span className="ob-body" />
              </div>

              <div className="ob-picks">
                {/* Accent is identity; status is still form and motion, so the two
                    never compete — a teal agent that needs you is still a ring. */}
                <div className="ob-pick-row">
                  {Object.entries(ACCENTS).map(([id, a]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setAccent(id as AccentId)}
                      aria-label={a.name}
                      aria-pressed={accent === id}
                      className={`ob-swatch${accent === id ? " ob-swatch--on" : ""}`}
                      style={{ ["--pick" as string]: a.hex }}
                    />
                  ))}
                </div>

              </div>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ob-input"
                placeholder="Name it"
                aria-label="Agent name"
              />

              <p className="ob-group">Or start from one of these</p>
              <div className="ob-templates">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => pickTemplate(t)}
                    className={`ob-template${template === t.id ? " ob-template--on" : ""}`}
                  >
                    <span className="ob-template-name">{t.name}</span>
                    <span className="ob-template-gets">{t.gets}</span>
                  </button>
                ))}
              </div>

              <Actions
                primary="Create agent"
                disabled={!name.trim()}
                onPrimary={() => onDone({ name: name.trim(), accent, tools, template })}
                secondary={firstTime ? "Back" : "Cancel"}
                onSecondary={() => (firstTime ? setStep("tools") : onCancel())}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .ob-stage {
          display: flex; flex: 1; min-width: 0; align-items: center; justify-content: center;
          padding: 40px 28px 56px; overflow-y: auto;
          font-family: var(--font-google-sans); color: #fff;
        }
        .ob-panel {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          width: 100%; max-width: 520px; text-align: center;
        }
        /* the connector grid needs room for three names; every other step reads
           better narrow, so only this one gets it */
        .ob-panel--wide { max-width: 720px; }

        .ob-orb { padding: 10px 0 4px; }
        .ob-h1 { margin: 0; font-size: 29px; line-height: 1.2; font-weight: 600; text-wrap: balance; }
        .ob-h2 { margin: 0; font-size: 25px; line-height: 1.2; font-weight: 600; text-wrap: balance; }
        .ob-lede {
          margin: 0; max-width: 44ch; font-size: 15.5px; line-height: 1.6;
          color: rgba(255,255,255,.55); text-wrap: pretty;
        }
        .ob-count {
          font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }

        /* one idea, in a container, so the sequence reads as cards not as pages */
        .ob-card {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          width: 100%; padding: 30px 32px 40px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          /* the diagram is the tallest thing here and it changes size between cards;
             a floor stops the panel jumping as the sequence advances */
          min-height: 296px; justify-content: center;
        }

        /* ---------- tools ---------- */

        .ob-search {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.4);
        }
        .ob-search input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14.5px; color: #fff;
        }
        .ob-search input::placeholder { color: rgba(255,255,255,.3); }

        .ob-tools {
          display: grid; gap: 8px; width: 100%; max-height: 320px; overflow-y: auto;
          padding: 2px;
        }
        @media (min-width: 560px) { .ob-tools { grid-template-columns: 1fr 1fr; } }

        .ob-tool {
          display: flex; align-items: center; gap: 10px; padding: 12px 14px;
          border-radius: 12px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          font-family: inherit; font-size: 13.5px; color: rgba(255,255,255,.72);
          transition: border-color .18s ease, background-color .18s ease, color .18s ease;
        }
        .ob-tool svg { flex: none; color: rgba(255,255,255,.4); }
        .ob-tool:hover { border-color: rgba(255,255,255,.28); color: #fff; }
        .ob-tool--on { border-color: rgba(248,70,0,.45); background: rgba(248,70,0,.09); color: #fff; }
        .ob-tool--on svg { color: var(--color-primary); }
        .ob-tool-name { flex: 1; min-width: 0; }
        .ob-tool-check { flex: none; color: var(--color-primary); }
        .ob-none { margin: 8px 0; font-size: 13.5px; color: rgba(255,255,255,.35); }

        /* ---------- identity ---------- */

        .ob-preview {
          display: flex; align-items: center; justify-content: center;
          width: 92px; height: 92px; border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--pick) 26%, transparent) 0%, transparent 68%);
        }

        /* One body. It was four, with a picker — but the silhouette was never
           carried through to the workspace orb, so the choice changed nothing
           after this screen, and status is already said by form. Colour is the
           only part of the look that is actually the agent's. */
        .ob-body { display: block; width: 44px; height: 44px; border-radius: 999px; background: var(--pick); }

        .ob-picks { display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .ob-pick-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

        .ob-swatch {
          width: 24px; height: 24px; border-radius: 999px; cursor: pointer;
          border: 2px solid transparent; background: var(--pick);
          box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset;
          transition: transform .15s ease;
        }
        .ob-swatch:hover { transform: scale(1.1); }
        .ob-swatch--on { border-color: #fff; }


        .ob-input {
          width: 100%; max-width: 320px; padding: 12px 18px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          font-family: inherit; font-size: 16px; color: #fff; text-align: center;
        }
        .ob-input:focus { outline: none; border-color: rgba(255,255,255,.32); }

        .ob-group {
          margin: 6px 0 0; font-size: 11px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ob-templates { display: grid; gap: 8px; width: 100%; }
        @media (min-width: 560px) { .ob-templates { grid-template-columns: 1fr 1fr; } }
        .ob-template {
          display: grid; gap: 3px; padding: 12px 14px; text-align: left; cursor: pointer;
          border: 1px solid rgba(255,255,255,.1); border-radius: 12px;
          background: rgba(255,255,255,.03);
          transition: border-color .18s ease;
        }
        .ob-template:hover { border-color: rgba(255,255,255,.28); }
        .ob-template--on { border-color: rgba(248,70,0,.5); background: rgba(248,70,0,.08); }
        .ob-template-name { font-size: 14px; font-weight: 600; color: #fff; }
        .ob-template-gets { font-size: 12.5px; line-height: 1.45; color: rgba(255,255,255,.45); }

        /* ---------- shared ---------- */

        .ob-actions { display: flex; flex-direction: column; align-items: center; gap: 9px; margin-top: 8px; width: 100%; }
        .ob-go {
          min-width: 200px; padding: 13px 30px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
          font-family: inherit; font-size: 14.5px; font-weight: 600;
          transition: background-color .2s ease;
        }
        .ob-go:hover { background: #ff5a1f; }
        .ob-go:disabled { background: rgba(255,255,255,.1); color: rgba(255,255,255,.35); cursor: default; }
        .ob-alt {
          border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 13.5px; color: rgba(255,255,255,.4);
        }
        .ob-alt:hover { color: #fff; }

        .ob-dots { display: flex; gap: 6px; margin-top: 2px; }
        .ob-dot { width: 18px; height: 2px; border-radius: 999px; background: rgba(255,255,255,.14); }
        .ob-dot--on { background: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Actions({
  primary,
  secondary,
  disabled = false,
  onPrimary,
  onSecondary,
}: {
  primary: string;
  secondary: string;
  disabled?: boolean;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <div className="ob-actions">
      <button type="button" className="ob-go" onClick={onPrimary} disabled={disabled}>
        {primary}
      </button>
      <button type="button" className="ob-alt" onClick={onSecondary}>
        {secondary}
      </button>
    </div>
  );
}

function Dots({ n, at }: { n: number; at: number }) {
  return (
    <div className="ob-dots" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`ob-dot${i <= at ? " ob-dot--on" : ""}`} />
      ))}
    </div>
  );
}
