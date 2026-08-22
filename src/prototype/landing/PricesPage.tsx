import { motion } from "motion/react";
import { ArrowLeftIcon } from "../icons";
import { Container } from "../Container";
import { SiteHeaderC } from "./c/SiteHeaderC";

// The pricing page. Four plans across the top, then the machine add-on underneath
// for the case a plan's compute runs out before its credit does.
//
// Every card is the same six blocks in the same order — price, what the credit is
// worth, the action, what a month buys you, the machine, who it suits — because a
// plan is only ever read against the one next to it. A card that reorders its own
// sections to suit itself makes the comparison the visitor came to make harder.

const ARROW = "↗";

// The marks that ride under the headline: the claim ("40+ models") made visible,
// so it carries no label of its own. `size` is the rendered height, tuned per mark
// rather than shared — these run from 7:1 (SpaceX) to 1:1 (Z), and one height would
// make the long ones enormous and the square one a speck.
const STRIP = [
  { file: "OpenAI.svg", w: 148, h: 40, size: 26 },
  { file: "Claude.svg", w: 160, h: 34, size: 26 },
  { file: "Frame374.svg", w: 151, h: 34, size: 26 }, // Gemini
  { file: "Spacexai.svg", w: 215, h: 29, size: 20 },
  { file: "Frame375.svg", w: 137, h: 40, size: 26 }, // Qwen
  { file: "Frame376.svg", w: 177, h: 42, size: 26 }, // MiniMax
  { file: "Deepseek.svg", w: 206, h: 33, size: 22 },
  { file: "Kimi.svg", w: 118, h: 40, size: 26 },
  { file: "Zai.svg", w: 40, h: 40, size: 24 },
];

/** How many times the set is laid down. Two would close the loop, but not fill a
 *  wide page — the track has to be at least twice the window on every viewport or
 *  the seam opens into a visible gap. */
const STRIP_REPEATS = 4;

type Plan = {
  name: string;
  /** struck through next to the real one — absent on the metered plan */
  was?: string;
  price: string;
  period: string;
  /** what the money buys per day, which is the number the plans differ on */
  allowance: string;
  models: string;
  cta: string;
  /** heading over the list: the metered plan explains itself, the rest quantify */
  listTitle: string;
  list: string[];
  machine: string;
  specs: string;
  fit: string;
  foot: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Pay as you go",
    price: "$~",
    period: "/mo",
    allowance: "Usage-based pricing",
    models: "Access to 40+ models",
    cta: "+ Top up",
    listTitle: "How it works:",
    list: ["Top up any amount, at any time", "Pay only for what you use", "No monthly commitment"],
    machine: "Free machine with pay as you go",
    specs: "2 shared vCPU · 1GB memory · 1GB storage",
    fit: "Best for: occasional use / exploring",
    foot: "Funds never expire — billed on actual usage",
  },
  {
    name: "Lite",
    was: "$60",
    price: "$19",
    period: "/mo",
    allowance: "$2 daily limit",
    models: "Access to 40+ models",
    cta: "Get Lite",
    listTitle: "Every month, you can build:",
    list: ["30 market monitoring dashboards, or", "40 presentations (PPTs), or", "300 code analysis tasks"],
    machine: "Free Lite Machine",
    specs: "2 shared vCPU · 1GB memory · 1GB storage",
    fit: "Ideal for: daily tasks / light automation",
    foot: "$2 daily limit",
  },
  {
    name: "Plus",
    was: "$300",
    price: "$79",
    period: "/mo",
    allowance: "$10 daily limit",
    models: "Access to 40+ models",
    cta: "Get Plus",
    listTitle: "Every month, you can build:",
    list: ["150 market monitoring dashboards, or", "200 presentations (PPTs), or", "1,500 code analysis tasks"],
    machine: "Free Plus Machine",
    specs: "4 shared vCPU · 2GB memory · 2GB storage",
    fit: "Ideal for: individual developers / traders",
    foot: "$10/day limit",
    popular: true,
  },
  {
    name: "Pro",
    was: "$900",
    price: "$199",
    period: "/mo",
    allowance: "$30 daily limit",
    models: "Access to 40+ models",
    cta: "Get Pro",
    listTitle: "Every month, you can build:",
    list: ["450 market monitoring dashboards, or", "600 presentations (PPTs), or", "4,500 code analysis tasks"],
    machine: "Free Pro Machine",
    specs: "8 shared vCPU · 4GB memory · 10GB storage",
    fit: "Best for: professional developers / automated team workflows",
    foot: "$30/day limit",
  },
];

const MACHINES = [
  {
    name: "Plus Machine",
    price: "$7.99",
    specs: "4 shared vCPU · 2GB memory · 2GB storage",
    cta: "Get Plus Machine",
    note: "Pure machine resources — daily credit not included.",
    fit: "Ideal for: extra compute for heavier workloads",
  },
  {
    name: "Pro Machine",
    price: "$19.99",
    specs: "8 shared vCPU · 4GB memory · 10GB storage",
    cta: "Get Pro Machine",
    note: "Pure machine resources — daily credit not included.",
    fit: "Ideal for: demanding tasks that need maximum resources",
  },
];

/* Two marks the shared icon set doesn't carry. Same drawing rules as ../icons:
   16px box, 1.5 stroke, currentColor, no fills. */
function GiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.4 7.6h11.2v6.2a.8.8 0 0 1-.8.8H3.2a.8.8 0 0 1-.8-.8z" />
      <path d="M1.8 4.9h12.4v2.7H1.8zM8 4.9v9.7" />
      <path d="M8 4.9S7.4 1.6 5.6 1.6a1.65 1.65 0 0 0 0 3.3zM8 4.9s.6-3.3 2.4-3.3a1.65 1.65 0 0 1 0 3.3z" />
    </svg>
  );
}

function MachineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="1.6" y="2.4" width="12.8" height="8.6" rx="1.4" />
      <path d="M5.4 14h5.2M8 11v3" />
    </svg>
  );
}

export function PricesPage({
  onNavigateHome,
  onNavigateTraders,
  onLogIn,
  onSignUp,
  onChoosePlan,
}: {
  onNavigateHome: () => void;
  onNavigateTraders: () => void;
  onLogIn: () => void;
  onSignUp: () => void;
  /** every CTA here is a purchase, and there is no billing yet — so they all
   *  land on the same account step the rest of the prototype uses */
  onChoosePlan: () => void;
}) {
  return (
    <div className="pr-page">
      <SiteHeaderC
        onNavigateHome={onNavigateHome}
        onNavigateTraders={onNavigateTraders}
        // already here — the nav item scrolls back to the top rather than reloading
        onNavigatePricing={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      <section className="pt-8 pb-20 md:pt-10 md:pb-28">
        <Container>
          <nav className="pr-crumbs" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome} className="pr-crumb-link">
              <ArrowLeftIcon className="size-3.5" />
              Home
            </button>
            <span className="pr-crumb-sep" aria-hidden="true">/</span>
            <span className="pr-crumb-here" aria-current="page">Pricing</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 text-center md:mt-16"
          >
            <h1 className="pr-title">Your agents are ready</h1>
            <p className="pr-sub">
              Every plan includes 40+ models, a dedicated machine and premium data APIs, ready to use.
            </p>
          </motion.div>

          {/* The roster, moving: the "40+ models" line above shown rather than
              restated, and the set is laid down four times so the loop is seamless.
              Hidden from screen readers — it says nothing the sentence above didn't. */}
          <div className="pr-strip" aria-hidden="true">
            <div className="pr-strip-track">
              {Array.from({ length: STRIP_REPEATS }).flatMap((_, copy) =>
                STRIP.map((mark) => (
                  <img
                    key={`${copy}-${mark.file}`}
                    className="pr-strip-mark"
                    src={`${import.meta.env.BASE_URL}images/carousel/${mark.file}`}
                    alt=""
                    style={{ height: mark.size, width: mark.size * (mark.w / mark.h) }}
                  />
                )),
              )}
            </div>
          </div>

          <p className="pr-referral">
            <GiftIcon className="pr-referral-icon" />
            <span>
              <strong>First-time referral bonus:</strong> you and your invitee each get 50% of the plan
              price back as bonus credits
            </span>
          </p>

          {/* ---------- plans ---------- */}
          <div className="pr-plans">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`pr-plan${plan.popular ? " pr-plan--popular" : ""}`}
              >
                <div className="pr-plan-head">
                  <h2 className="pr-plan-name">
                    {plan.name}
                    {plan.popular && <span className="pr-badge">Most popular</span>}
                  </h2>

                  <p className="pr-price">
                    {plan.was && <span className="pr-was">{plan.was}</span>}
                    <span className="pr-amount">{plan.price}</span>
                    <span className="pr-period">{plan.period}</span>
                  </p>

                  <p className="pr-allowance">{plan.allowance}</p>
                  <p className="pr-models">{plan.models}</p>
                </div>

                <button type="button" onClick={onChoosePlan} className="pr-cta">
                  {plan.cta} <span aria-hidden="true">{ARROW}</span>
                </button>

                <div className="pr-block">
                  <p className="pr-block-title">{plan.listTitle}</p>
                  <ul className="pr-list">
                    {plan.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* pushed to the bottom of the card, so the machine blocks line up
                    across the row however long the list above them runs */}
                <div className="pr-block pr-block--machine">
                  <p className="pr-machine">
                    <MachineIcon className="pr-machine-icon" />
                    {plan.machine}
                  </p>
                  <p className="pr-specs">{plan.specs}</p>
                  <p className="pr-fit">{plan.fit}</p>
                  <p className="pr-foot">{plan.foot}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- machine add-on ---------- */}
      <section className="pb-28 md:pb-36">
        <Container>
          <div className="mx-auto max-w-[56ch] text-center">
            <h2 className="pr-section-title">Machine add-on</h2>
            <p className="pr-section-sub">
              Upgrade your machine resources on their own. Works alongside any plan above, or by itself.
            </p>
          </div>

          <div className="pr-machines">
            {MACHINES.map((machine) => (
              <motion.div
                key={machine.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="pr-plan"
              >
                <div className="pr-plan-head">
                  <h3 className="pr-plan-name">{machine.name}</h3>
                  <p className="pr-price">
                    <span className="pr-amount">{machine.price}</span>
                    <span className="pr-period">/mo</span>
                  </p>
                  <p className="pr-specs pr-specs--lead">{machine.specs}</p>
                </div>

                <button type="button" onClick={onChoosePlan} className="pr-cta">
                  {machine.cta} <span aria-hidden="true">{ARROW}</span>
                </button>

                <div className="pr-block pr-block--machine">
                  <p className="pr-fit">{machine.note}</p>
                  <p className="pr-foot">{machine.fit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <style>{`
        .pr-page {
          min-height: 100vh; background: #0a0a0a; color: #fff;
          font-family: var(--font-google-sans);
        }

        .pr-crumbs { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .pr-crumb-link {
          display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
          padding: 0; border: 0; background: none;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.55);
          transition: color .2s ease;
        }
        .pr-crumb-link:hover { color: #fff; }
        .pr-crumb-sep { color: rgba(255,255,255,.25); }
        .pr-crumb-here { color: rgba(255,255,255,.4); }

        .pr-title {
          font-size: clamp(34px, 4.2vw, 52px); line-height: 1.08; font-weight: 600;
          letter-spacing: -.015em; text-wrap: balance; margin: 0;
        }
        .pr-sub {
          max-width: 62ch; margin: 18px auto 0; text-wrap: balance;
          font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.55);
        }

        /* The mask is what makes this a window rather than a row: the marks do not
           stop at an edge, they thin out and are gone, so what is off screen reads
           as more of the same. */
        .pr-strip {
          margin-top: 46px; overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
        }

        .pr-strip-track {
          display: flex; width: max-content; will-change: transform;
          animation: pr-slide 72s linear infinite;
        }
        /* half the track is exactly one set, so this lands on an identical copy */
        @keyframes pr-slide {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .pr-strip-mark {
          flex: none; display: block; object-fit: contain;
          /* The spacing is on the item, not a flex gap on the track. With a gap the
             two halves of the loop differ by exactly one gap, and translating -50%
             would slip a few pixels every lap until the seam showed. */
          margin-right: 72px;
          /* the wordmarks ship in a pale grey; crushing to black and inverting takes
             every opaque pixel to white, and opacity then sets how present they are */
          filter: brightness(0) invert(1); opacity: .85;
        }

        @media (prefers-reduced-motion: reduce) {
          .pr-strip-track { animation: none; }
        }

        .pr-referral {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 40px auto 0; padding: 0 8px; max-width: 78ch;
          font-size: 13.5px; line-height: 1.55; text-align: center; text-wrap: balance;
          color: rgba(255,255,255,.5);
        }
        .pr-referral strong { color: #fff; font-weight: 600; }
        .pr-referral-icon { flex: none; width: 16px; height: 16px; color: var(--color-primary); }

        /* Four across is the layout this is designed for; below that it steps down
           rather than squeezing, because the cards are read side by side. */
        .pr-plans { display: grid; gap: 16px; margin-top: 44px; }
        @media (min-width: 700px) { .pr-plans { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1180px) { .pr-plans { grid-template-columns: repeat(4, 1fr); } }

        .pr-plan {
          display: flex; flex-direction: column; gap: 22px;
          padding: 28px 26px; border-radius: 18px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        /* the recommendation is made by one card, in the accent, once */
        .pr-plan--popular {
          border-color: rgba(248,70,0,.4);
          background: rgba(248,70,0,.04);
        }

        .pr-plan-head { display: flex; flex-direction: column; gap: 10px; }
        .pr-plan-name {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.01em;
        }
        .pr-badge {
          padding: 3px 9px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-size: 10.5px; font-weight: 600; letter-spacing: .02em; line-height: 1.4;
        }

        /* baseline-aligned so the struck price, the amount and the period sit on one
           line however different their sizes are */
        .pr-price { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 4px 0 0; }
        .pr-was { font-size: 17px; color: rgba(255,255,255,.3); text-decoration: line-through; }
        .pr-amount { font-size: 34px; font-weight: 700; letter-spacing: -.02em; color: var(--color-primary); }
        .pr-period { font-size: 13.5px; color: rgba(255,255,255,.5); }

        .pr-allowance { margin: 2px 0 0; font-size: 15px; font-weight: 600; color: #fff; }
        .pr-models { margin: 0; font-size: 12.5px; color: rgba(255,255,255,.4); }

        .pr-cta {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 12px 18px; border: 0; border-radius: 999px; cursor: pointer;
          background: #fff; color: #0a0a0a;
          font-family: inherit; font-size: 14px; font-weight: 600;
          transition: background-color .2s ease, transform .2s ease;
        }
        .pr-cta:hover { background: rgba(255,255,255,.86); }
        .pr-cta:active { transform: translateY(1px); }
        .pr-cta:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        .pr-block { display: flex; flex-direction: column; gap: 10px; }
        /* the machine block is the card's floor: margin-top auto pins it down so the
           four of them align across the row whatever the list above them costs */
        .pr-block--machine {
          margin-top: auto; padding-top: 20px; gap: 8px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .pr-block-title { margin: 0; font-size: 12.5px; color: rgba(255,255,255,.45); }

        .pr-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .pr-list li {
          position: relative; padding-left: 15px;
          font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.72);
        }
        .pr-list li::before {
          content: ""; position: absolute; left: 0; top: 8px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(255,255,255,.35);
        }

        .pr-machine {
          display: flex; align-items: center; gap: 8px; margin: 0;
          font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,.85);
        }
        .pr-machine-icon { flex: none; width: 15px; height: 15px; color: rgba(255,255,255,.45); }
        .pr-specs { margin: 0; font-size: 12.5px; line-height: 1.55; color: rgba(255,255,255,.5); }
        .pr-specs--lead { margin-top: 4px; font-size: 13.5px; color: rgba(255,255,255,.6); }
        .pr-fit { margin: 6px 0 0; font-size: 12.5px; line-height: 1.55; color: rgba(255,255,255,.4); }
        .pr-foot { margin: 0; font-size: 12px; line-height: 1.55; color: rgba(255,255,255,.28); }

        /* same 34 → 44 step the landing's section headings use, at the same
           breakpoint Tailwind's sm: maps to */
        .pr-section-title { margin: 0; font-size: 34px; line-height: 1.1; font-weight: 600; letter-spacing: -.01em; }
        @media (min-width: 640px) { .pr-section-title { font-size: 44px; } }
        .pr-section-sub {
          margin: 12px 0 0; text-wrap: balance;
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.5);
        }

        .pr-machines { display: grid; gap: 16px; margin: 36px auto 0; max-width: 860px; }
        @media (min-width: 700px) { .pr-machines { grid-template-columns: repeat(2, 1fr); } }

        @media (prefers-reduced-motion: reduce) {
          .pr-cta { transition: none; }
        }
      `}</style>
    </div>
  );
}
