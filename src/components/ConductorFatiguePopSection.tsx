import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Option C, take two — instead of two static cards side by side, the mess
// builds up live: search/thread chips pop in one after another in the
// center, then a single "Handled." card covers them. Beat, reset, repeat.
// ---------------------------------------------------------------------------
type ChipIcon = "search" | "x" | "linkedin";

const CHIPS: { icon: ChipIcon; label: string; x: number; y: number; r: number; z: number }[] = [
  { icon: "search", label: "gpt vs gemini vs claude", x: 44, y: -36, r: 4, z: 3 },
  { icon: "search", label: "best ai model 2026 (updated)", x: -20, y: -56, r: -5, z: 5 },
  { icon: "search", label: "which llm is best for code?", x: 50, y: -2, r: 6, z: 2 },
  { icon: "search", label: "best ai for writing 2026", x: 6, y: 24, r: -4, z: 4 },
  { icon: "x", label: "“this changes everything” — thread", x: -82, y: -14, r: -8, z: 1 },
  { icon: "linkedin", label: "the AI landscape just shifted again — Post", x: -62, y: 30, r: 5, z: 6 },
];

function SearchIcon() {
  return (
    <svg className="fp-chip-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="3.4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8.4" y1="8.4" x2="11" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg className="fp-chip-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function LinkedInIcon() {
  return <span className="fp-chip-linkedin" aria-hidden="true">in</span>;
}
function ChipIconGlyph({ icon }: { icon: ChipIcon }) {
  if (icon === "search") return <SearchIcon />;
  if (icon === "x") return <XIcon />;
  return <LinkedInIcon />;
}

function CheckIcon() {
  return (
    <svg className="fp-badge-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7.2L5.8 10 11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function wait(ms: number, cancelledRef: { current: boolean }) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      if (cancelledRef.current) reject(new Error("cancelled"));
      else resolve();
    }, ms);
    if (cancelledRef.current) {
      clearTimeout(timer);
      reject(new Error("cancelled"));
    }
  });
}

export function ConductorFatiguePopSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [handled, setHandled] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setVisibleCount(CHIPS.length);
      setHandled(true);
      return;
    }

    const cancelledRef = { current: false };

    async function run() {
      try {
        while (true) {
          setHandled(false);
          setVisibleCount(0);
          await wait(500, cancelledRef);

          for (let i = 1; i <= CHIPS.length; i++) {
            setVisibleCount(i);
            await wait(420, cancelledRef);
          }
          await wait(700, cancelledRef);

          setHandled(true);
          await wait(2200, cancelledRef);
        }
      } catch {
        // cancelled on unmount
      }
    }

    run();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <section className="fp-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="fp-header">
          <h2 className="fp-headline">Yesterday&rsquo;s best model is rarely today&rsquo;s.</h2>
          <p className="fp-subhead">
            We track it, so you don&rsquo;t have to — you&rsquo;re always on what&rsquo;s new,
            automatically.
          </p>
        </div>

        <div className="fp-stage">
          <div className={`fp-pile${handled ? " fp-pile--settled" : ""}`}>
            {CHIPS.slice(0, visibleCount).map((chip) => (
              <div
                key={chip.label}
                className="fp-chip"
                style={{ transform: `translate(${chip.x}px, ${chip.y}px) rotate(${chip.r}deg)`, zIndex: chip.z }}
              >
                <ChipIconGlyph icon={chip.icon} />
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

          <div className={`fp-badge${handled ? " fp-badge--shown" : ""}`}>
            <span className="fp-badge-check">
              <CheckIcon />
            </span>
            Handled
          </div>
        </div>

        <p className={`fp-caption${handled ? " fp-caption--shown" : ""}`}>
          The Conductor already checked. You don&rsquo;t have to.
        </p>
      </div>

      <style>{`
        .fp-section {
          --fp-border: #e5e4e0;
          --fp-text: #171717;
          --fp-text-2: #6b6b68;
          --fp-orange: var(--color-primary);
          --fp-card: #ffffff;
        }

        .fp-header { max-width: 46ch; margin: 0 auto 56px; }
        .fp-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: var(--fp-text);
          font-size: 36px; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 14px;
          text-wrap: balance;
        }
        .fp-subhead {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          color: var(--fp-text-2); margin: 0; text-wrap: balance;
        }

        .fp-stage {
          position: relative; height: 260px; max-width: 460px; margin: 0 auto;
          overflow: hidden; border-radius: 16px;
        }

        .fp-chip {
          position: absolute; top: 50%; left: 50%; width: 180px; margin: -20px 0 0 -90px;
          display: flex; align-items: flex-start; gap: 6px;
          border: 1px solid var(--fp-border); border-radius: 9px; background: var(--fp-card);
          box-shadow: 0 2px 5px rgba(20,20,15,0.06), 0 6px 16px rgba(20,20,15,0.05);
          padding: 8px 10px; font-family: var(--font-google-sans); font-size: 11px; line-height: 1.35;
          color: var(--fp-text); text-align: left;
          animation: fp-pop 0.42s cubic-bezier(0.2, 0.9, 0.3, 1.3) both;
        }
        .fp-chip-icon { width: 12px; height: 12px; flex: none; margin-top: 1px; color: var(--fp-text-2); }
        .fp-chip-linkedin {
          flex: none; width: 13px; height: 13px; border-radius: 3px; background: #0a66c2; color: #fff;
          font-size: 8px; font-weight: 700; line-height: 13px; text-align: center; margin-top: 1px;
        }

        @keyframes fp-pop {
          from { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0.6); }
        }

        .fp-pile { transition: opacity 0.4s ease; }
        .fp-pile--settled { opacity: 0.32; }

        .fp-badge {
          position: absolute; top: 50%; left: 50%; z-index: 10;
          display: flex; align-items: center; gap: 7px;
          background: var(--fp-orange); color: #fff; border-radius: 999px; padding: 10px 20px 10px 14px;
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 700; letter-spacing: 0.01em;
          box-shadow: 0 10px 24px rgba(248,70,0,0.32);
          transform: translate(-50%, -50%) scale(0) rotate(-4deg); opacity: 0; pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.15), opacity 0.25s ease;
        }
        .fp-badge--shown {
          transform: translate(-50%, -50%) scale(1) rotate(-4deg); opacity: 1; pointer-events: auto;
        }
        .fp-badge-check {
          display: flex; align-items: center; justify-content: center; width: 18px; height: 18px;
          border-radius: 50%; background: rgba(255,255,255,0.22); flex: none;
        }
        .fp-badge-icon { width: 11px; height: 11px; color: #fff; }

        .fp-caption {
          font-family: var(--font-google-sans); font-size: 13.5px; color: var(--fp-text-2);
          text-align: center; margin: 18px 0 0; opacity: 0; transition: opacity 0.3s ease;
        }
        .fp-caption--shown { opacity: 1; transition-delay: 0.15s; }

        @media (prefers-reduced-motion: reduce) {
          .fp-chip { animation: none; }
          .fp-pile { transition: none; }
          .fp-badge { transition: none; }
          .fp-caption { transition: none; }
        }

        @media (max-width: 760px) {
          .fp-section { padding-top: 84px; padding-bottom: 84px; }
          .fp-headline { font-size: 27px; }
          .fp-stage { height: 230px; max-width: 340px; }
          .fp-chip { width: 156px; margin-left: -78px; font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
