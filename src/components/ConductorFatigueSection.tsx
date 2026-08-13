// ---------------------------------------------------------------------------
// Option C — the pain isn't invisible ranking data, it's the chore of
// checking it yourself. Two cards, always both visible: a messy pile of
// "research" on the left, one calm card on the right. Density does the
// arguing, not copy.
// ---------------------------------------------------------------------------
type ChipIcon = "search" | "x" | "linkedin";

const CHIPS: { icon: ChipIcon; label: string; x: number; y: number; r: number; z: number }[] = [
  { icon: "search", label: "gpt vs gemini vs claude", x: 40, y: -34, r: 4, z: 3 },
  { icon: "search", label: "best ai model 2026 (updated)", x: -18, y: -52, r: -5, z: 5 },
  { icon: "search", label: "which llm is best for code?", x: 46, y: -2, r: 6, z: 2 },
  { icon: "search", label: "best ai for writing 2026", x: 6, y: 22, r: -4, z: 4 },
  { icon: "x", label: "“this changes everything” — thread", x: -76, y: -14, r: -8, z: 1 },
  { icon: "linkedin", label: "the AI landscape just shifted again — Post", x: -58, y: 26, r: 5, z: 6 },
];

function SearchIcon() {
  return (
    <svg className="fg-chip-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="3.4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8.4" y1="8.4" x2="11" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="fg-chip-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return <span className="fg-chip-linkedin" aria-hidden="true">in</span>;
}

function ChipIconGlyph({ icon }: { icon: ChipIcon }) {
  if (icon === "search") return <SearchIcon />;
  if (icon === "x") return <XIcon />;
  return <LinkedInIcon />;
}

export function ConductorFatigueSection() {
  return (
    <section className="fg-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32">
      <div className="relative mx-auto max-w-5xl">
        <div className="fg-header">
          <h2 className="fg-headline">Yesterday&rsquo;s best model is rarely today&rsquo;s.</h2>
          <p className="fg-subhead">
            We track it, so you don&rsquo;t have to — you&rsquo;re always on what&rsquo;s new,
            automatically.
          </p>
        </div>

        <div className="fg-cards">
          <div className="fg-card">
            <p className="fg-label">Doing it yourself</p>

            <div className="fg-stack">
              {CHIPS.map((chip) => (
                <div
                  key={chip.label}
                  className="fg-chip"
                  style={{ transform: `translate(${chip.x}px, ${chip.y}px) rotate(${chip.r}deg)`, zIndex: chip.z }}
                >
                  <ChipIconGlyph icon={chip.icon} />
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>

            <p className="fg-caption">You keep asking. The answer keeps changing.</p>
          </div>

          <div className="fg-card fg-card--calm">
            <p className="fg-label">With Starchild</p>
            <div className="fg-handled-wrap">
              <p className="fg-handled">Handled.</p>
              <p className="fg-caption">The Conductor already checked. You don&rsquo;t have to.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fg-section {
          --fg-border: #e5e4e0;
          --fg-text: #171717;
          --fg-text-2: #6b6b68;
          --fg-orange: #f4511e;
          --fg-card: #ffffff;
        }

        .fg-header { max-width: 46ch; margin: 0 auto 48px; }
        .fg-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: var(--fg-text);
          font-size: 36px; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 14px;
          text-wrap: balance;
        }
        .fg-subhead {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          color: var(--fg-text-2); margin: 0; text-wrap: balance;
        }

        .fg-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .fg-card {
          border: 1px solid var(--fg-border); border-radius: 16px; background: var(--fg-card);
          box-shadow: 0 1px 2px rgba(20,20,15,0.03), 0 10px 24px rgba(20,20,15,0.035);
          padding: 28px 28px 32px; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .fg-label {
          font-family: var(--font-google-sans); font-size: 14.5px; font-weight: 600;
          color: var(--fg-orange); margin: 0 0 28px;
        }

        .fg-handled-wrap {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
        }

        .fg-stack { position: relative; height: 190px; margin-bottom: 20px; }
        .fg-chip {
          position: absolute; top: 50%; left: 50%; width: 176px; margin: -20px 0 0 -88px;
          display: flex; align-items: flex-start; gap: 6px;
          border: 1px solid var(--fg-border); border-radius: 9px; background: var(--fg-card);
          box-shadow: 0 2px 5px rgba(20,20,15,0.06), 0 6px 16px rgba(20,20,15,0.05);
          padding: 8px 10px; font-family: var(--font-google-sans); font-size: 11px; line-height: 1.35;
          color: var(--fg-text);
        }
        .fg-chip-icon { width: 12px; height: 12px; flex: none; margin-top: 1px; color: var(--fg-text-2); }
        .fg-chip-linkedin {
          flex: none; width: 13px; height: 13px; border-radius: 3px; background: #0a66c2; color: #fff;
          font-size: 8px; font-weight: 700; line-height: 13px; text-align: center; margin-top: 1px;
        }

        .fg-caption {
          font-family: var(--font-google-sans); font-size: 13.5px; color: var(--fg-text-2);
          margin: 0; text-align: center;
        }

        .fg-handled {
          font-family: var(--font-google-sans); font-size: 27px; font-weight: 700; color: var(--fg-text);
          margin: 0 0 14px;
        }

        @media (max-width: 760px) {
          .fg-section { padding-top: 84px; padding-bottom: 84px; }
          .fg-headline { font-size: 27px; }
          .fg-cards { grid-template-columns: 1fr; gap: 20px; }
          .fg-card { padding: 24px 20px 28px; }
          .fg-stack { transform: scale(0.82); }
          .fg-chip { width: 150px; margin-left: -75px; font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
