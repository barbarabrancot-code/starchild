import { motion } from "motion/react";
import { ArrowLeftIcon, ArrowUpIcon } from "../../icons";
import { Container } from "../../Container";
import { SiteHeaderC } from "./SiteHeaderC";

// "Starchild for → For Traders". Built from the Hyperliquid operational guide, and
// deliberately the opposite end of the range from the homepage: version C's landing
// speaks to someone who has never used an AI product, this page speaks to someone
// who already trades and wants to know exactly what the agent is allowed to touch.
//
// The order follows the guide — what it turns into a system, then the four steps,
// each with the detail a trader would ask for before connecting a wallet.

const SYSTEM_ITEMS = [
  { title: "Market research", copy: "Funding, liquidations, volatility and context." },
  { title: "Structured strategy", copy: "Entry, exit, sizing and invalidation rules." },
  { title: "Controlled execution", copy: "Orders on Hyperliquid, inside the permissions you approved." },
  { title: "24/7 monitoring", copy: "Jobs, alerts and automatic reports." },
  { title: "Visibility", copy: "Dashboards for PnL, margin, risk and positions." },
];

const STEPS = [
  {
    n: "01",
    title: "Connect Starchild to Hyperliquid",
    copy: "Choose how Starchild is allowed to operate on Hyperliquid.",
  },
  {
    n: "02",
    title: "Design the strategy with the agent",
    copy: "Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules.",
  },
  {
    n: "03",
    title: "Fund the strategy",
    copy: "Deposit USDC and make available the balance the strategy will use.",
  },
  {
    n: "04",
    title: "Monitor performance and risk",
    copy: "Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you.",
  },
];

const CONNECTIONS = [
  {
    method: "Native Agent Wallet",
    custody: "Non-custodial (Privy); exportable key.",
    edge: "The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”.",
  },
  {
    method: "Hyperliquid API wallet",
    custody: "Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",
    edge: "More separation between custody and execution; the credential goes through a secure flow, never through the chat.",
  },
  {
    method: "Third-party builders",
    custody: "A trading account you authorize separately.",
    edge: "Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard).",
  },
];

const SIGNALS = ["Trend", "Volatility", "Book liquidity", "Funding", "Open interest", "Liquidations", "Market context"];

// the crypto strip from the old homepage — cropped with a half-gap at each edge,
// so butting copies together reproduces its own spacing at the seam
const ECOSYSTEM_STRIP = `${import.meta.env.BASE_URL}images/empresas.svg`;
const STRIP_COPIES = 6;

// Named sources rather than logos: this is the agent showing its working, not a
// second brand wall. Confirm each one against what is actually wired up.
const SOURCES = ["Coinglass", "DeFiLlama", "CoinGecko", "TAAPI", "Onchain data", "Market APIs"];

const RISK_LAYERS = [
  {
    title: "Independent strategies",
    copy: "Each asset or strategy carries its own rules, capital, positions, orders, performance and logs.",
  },
  {
    title: "Shared execution layer",
    copy: "Checks balances and permissions before any order is submitted.",
  },
  {
    title: "Independent risk layer",
    copy: "Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",
    hard: true,
  },
];

// The routing, in four beats: what you brought and what the market says arrive
// together, Conductor picks, and one analysis comes out. Deliberately plainer
// than the diagram on the homepage — here it is a footnote, not the argument.
function ConductorFlow() {
  const dot = { r: 4, fill: "var(--color-primary)" };
  // both inputs travel together, then the answer leaves — one pass, on entry
  const inbound = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 };
  const outbound = { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 1.5 };

  return (
    <div className="tr-flowbox">
      <svg viewBox="0 0 560 200" className="tr-flowsvg" role="img"
           aria-label="Your strategy and market data both feed Conductor, which picks the models and tools for each part of the task and returns one analysis.">
        {/* the paths, drawn solid and faint — the dots are what carries the idea */}
        <path d="M150 52 H210 Q230 52 230 72 V88" className="tr-fl" />
        <path d="M150 148 H210 Q230 148 230 128 V112" className="tr-fl" />
        <path d="M330 100 H392" className="tr-fl" />
        <path d="M470 128 V148 Q470 168 450 168 H150" className="tr-fl" />

        <rect x="20" y="32" width="130" height="40" rx="10" className="tr-fnode" />
        <text x="85" y="57" className="tr-ftext">Your strategy</text>

        <rect x="20" y="128" width="130" height="40" rx="10" className="tr-fnode" />
        <text x="85" y="153" className="tr-ftext">Market data</text>

        <rect x="230" y="76" width="100" height="48" rx="12" className="tr-fnode tr-fnode--hi" />
        <text x="280" y="105" className="tr-ftext tr-ftext--hi">Conductor</text>

        <rect x="392" y="76" width="156" height="48" rx="12" className="tr-fnode" />
        <text x="470" y="99" className="tr-ftext">AI models</text>
        <text x="470" y="115" className="tr-ftext tr-ftext--sub">+ the tools for the job</text>

        <text x="150" y="172" className="tr-ftext tr-ftext--end" textAnchor="start">Analysis</text>

        {/* the travelling dots. One pass when the block comes into view. */}
        <motion.circle
          {...dot}
          initial={{ cx: 150, cy: 52, opacity: 0 }}
          whileInView={{ cx: [150, 230, 230], cy: [52, 52, 90], opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={inbound}
        />
        <motion.circle
          {...dot}
          initial={{ cx: 150, cy: 148, opacity: 0 }}
          whileInView={{ cx: [150, 230, 230], cy: [148, 148, 110], opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={inbound}
        />
        {/* Conductor reacting: a single breath as the two land */}
        <motion.rect
          x="230" y="76" width="100" height="48" rx="12"
          className="tr-fpulse"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.9, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        />
        <motion.circle
          {...dot}
          initial={{ cx: 330, cy: 100, opacity: 0 }}
          whileInView={{ cx: [330, 470, 470, 190], cy: [100, 100, 168, 168], opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={outbound}
        />
      </svg>
    </div>
  );
}

export function TradersPage({
  onNavigateHome,
  onEnterGuest,
  onLogIn,
  onSignUp,
}: {
  onNavigateHome: () => void;
  onEnterGuest: (prompt?: string) => void;
  onLogIn: () => void;
  onSignUp: () => void;
}) {
  // every CTA on the page opens the same conversation the guide is describing
  const startStrategy = () =>
    onEnterGuest("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");

  return (
    <div className="tr-page">
      <SiteHeaderC
        onNavigateHome={onNavigateHome}
        // already here — the menu item scrolls back to the top instead of reloading
        onNavigateTraders={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onLogIn={onLogIn}
        onSignUp={onSignUp}
      />

      {/* ---------- hero ---------- */}
      <section className="pt-8 pb-24 md:pt-10 md:pb-32">
        <Container>
          {/* the wordmark also goes home, but this is the one that says where you
              are — it's the first page in the prototype that sits under another */}
          <nav className="tr-crumbs" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome} className="tr-crumb-link">
              <ArrowLeftIcon className="size-3.5" />
              Home
            </button>
            <span className="tr-crumb-sep" aria-hidden="true">/</span>
            <span className="tr-crumb-here" aria-current="page">For Traders</span>
          </nav>

          <div className="mt-14 grid grid-cols-12 gap-6 md:mt-20">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="tr-eyebrow"
              >
                Starchild for traders · Hyperliquid
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Turn what you know about the market into a strategy that runs.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Turn your trading logic into rules, research the market, execute on Hyperliquid and keep
                the strategy monitored around the clock.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <button type="button" onClick={startStrategy} className="tr-cta">
                  Build a strategy
                  <ArrowUpIcon className="size-3.5 rotate-45" />
                </button>
                <span className="tr-cta-note">No account needed to start</span>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- ecosystem proof ----------
          The same strip that used to sit on the general homepage. It was pulled
          from there for making Starchild read as crypto-only; here that reading is
          the point, and the audience recognises the marks without a caption. */}
      <section className="tr-band py-16 md:py-20">
        <Container>
          <p className="tr-strip-label">Built around the ecosystem traders already use.</p>
        </Container>

        {/* full-bleed on purpose: the marquee should run past the page gutter */}
        <div className="tr-strip-viewport mt-9" aria-hidden="true">
          <div className="tr-strip-track">
            {Array.from({ length: STRIP_COPIES }, (_, i) => (
              <img key={i} src={ECOSYSTEM_STRIP} alt="" className="tr-strip-img" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what it turns into a system ---------- */}
      <section className="tr-band py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="tr-h2">From knowledge to execution.</h2>
              <p className="tr-lead">
                Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the
                decision layer: you explain your logic, set the conditions and the limits, and the agent
                turns that into an executable flow — research, execution, risk control and continuous
                monitoring.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="tr-label">What Starchild turns into a system</p>
              <ul className="tr-system">
                {SYSTEM_ITEMS.map(({ title, copy }) => (
                  <li key={title}>
                    <span className="tr-system-title">{title}</span>
                    <span className="tr-system-copy">{copy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- the four steps ---------- */}
      <section className="py-24 md:py-28">
        <Container>
          <h2 className="tr-h2 max-w-[24ch]">Trade perps with an agent, in four steps.</h2>

          <div className="mt-14 grid grid-cols-12 gap-6">
            {STEPS.map(({ n, title, copy }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="tr-step col-span-12 sm:col-span-6 lg:col-span-3"
              >
                <span className="tr-step-n">{n}</span>
                <span className="tr-step-title">{title}</span>
                <span className="tr-step-copy">{copy}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- step 1 ---------- */}
      <section className="tr-band py-24 md:py-28">
        <Container>
          <p className="tr-step-tag">Step 1</p>
          <h2 className="tr-h2 mt-4 max-w-[26ch]">Connect Starchild to Hyperliquid.</h2>
          <p className="tr-lead mt-5 max-w-[70ch]">
            The first decision is how Starchild is allowed to operate. There are three routes: the native
            Agent Wallet, a Hyperliquid API wallet, or a third-party builder.
          </p>

          <div className="tr-table mt-12">
            <div className="tr-tr tr-tr--head">
              <span>Method</span>
              <span>Custody</span>
              <span>What it gives you</span>
            </div>
            {CONNECTIONS.map(({ method, custody, edge }) => (
              <div className="tr-tr" key={method}>
                <span className="tr-td-method">{method}</span>
                <span>{custody}</span>
                <span>{edge}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- step 2 ---------- */}
      <section className="py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="tr-step-tag">Step 2</p>
              <h2 className="tr-h2 mt-4 max-w-[22ch]">Design the strategy with the agent.</h2>
              <p className="tr-lead mt-5">
                Instead of trading order by order, tell Starchild how you read the market, what you're
                trying to reach and which risks you accept. The agent researches, then helps turn that
                into a structured strategy — entry, position size, exit, invalidation and risk limits,
                all before anything executes.
              </p>

              <p className="tr-label mt-10">What the agent can weigh</p>
              <div className="tr-chips">
                {SIGNALS.map((s) => (
                  <span key={s} className="tr-chip">{s}</span>
                ))}
              </div>

              <p className="tr-flow">
                your logic <span aria-hidden="true">→</span> analysis <span aria-hidden="true">→</span> rules{" "}
                <span aria-hidden="true">→</span> strategy
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="tr-prompt">
                <p className="tr-label">Example prompt</p>
                <p className="tr-prompt-body">
                  “I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity
                  and funding, and help me define entry, position size, invalidation, max loss and two exit
                  scenarios. Don't execute anything yet.”
                </p>
                <button type="button" onClick={startStrategy} className="tr-prompt-cta">
                  Try this
                  <ArrowUpIcon className="size-3.5 rotate-45" />
                </button>
              </div>

              <p className="tr-label mt-12">Risk architecture, in layers</p>
              <div className="tr-layers">
                {RISK_LAYERS.map(({ title, copy, hard }) => (
                  <div key={title} className={`tr-layer${hard ? " tr-layer--hard" : ""}`}>
                    <span className="tr-layer-title">{title}</span>
                    <span className="tr-layer-copy">{copy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* still Step 2: where the analysis gets its facts from */}
          <div className="mt-24 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <p className="tr-eyebrow">Market intelligence</p>
              <h3 className="tr-h3 mt-4">Data from the tools traders already rely on.</h3>
              <p className="tr-lead mt-5">
                Starchild can bring market data, technical signals and external sources into the same
                analysis — so the strategy isn't built from a model's memory alone.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="tr-sources">
                <p className="tr-label">Sources</p>
                <div className="tr-chips">
                  {SOURCES.map((s) => (
                    <span key={s} className="tr-chip">{s}</span>
                  ))}
                </div>
                <div className="tr-converge" aria-hidden="true">
                  <span className="tr-converge-line" />
                  <span className="tr-converge-dot" />
                  <span className="tr-converge-line" />
                </div>
                <div className="tr-analysis">
                  <span className="tr-analysis-title">One analysis</span>
                  <span className="tr-analysis-copy">
                    Funding, positioning and price read together, against your rules.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* still Step 2: which intelligence gets used, and who decides */}
          <div className="mt-24 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <p className="tr-eyebrow">Conductor Mode</p>
              <h3 className="tr-h3 mt-4">Different market questions need different intelligence.</h3>
              <p className="tr-lead mt-5">
                Starchild combines your strategy context with the right models and tools for each part of
                the task.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <ConductorFlow />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- steps 3 and 4 ---------- */}
      <section className="tr-band py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <p className="tr-step-tag">Step 3</p>
              <h2 className="tr-h2 mt-4 max-w-[18ch]">Fund the strategy.</h2>
              <p className="tr-lead mt-5">
                Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid.
                No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets
                you already hold.
              </p>

              <div className="tr-approvals">
                <div className="tr-approval">
                  <span className="tr-approval-n">Approval 1</span>
                  <span className="tr-approval-copy">Enables trading through the Agent Wallet.</span>
                </div>
                <div className="tr-approval">
                  <span className="tr-approval-n">Approval 2</span>
                  <span className="tr-approval-copy">
                    Authorizes Starchild's builder code, within the fee limit you approved.
                  </span>
                </div>
              </div>
              <p className="tr-note">
                After those two, the strategy can execute — inside the permissions and limits you set.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="tr-step-tag">Step 4</p>
              <h2 className="tr-h2 mt-4 max-w-[22ch]">Monitor performance and risk.</h2>
              <p className="tr-lead mt-5">
                Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and
                the health of the strategy. Those checks are what feed the alerts and the reports.
              </p>

              <div className="tr-cards">
                <div className="tr-card">
                  <span className="tr-card-title">Daily report</span>
                  <span className="tr-card-copy">
                    Positions, realized and unrealized PnL, funding, fees, margin, exceptions and
                    recommended actions.
                  </span>
                </div>
                <div className="tr-card">
                  <span className="tr-card-title">Alerts by exception</span>
                  <span className="tr-card-copy">
                    Silent while everything is healthy. When something needs attention, the alert arrives
                    with the context and a recommended action.
                  </span>
                </div>
              </div>

              <p className="tr-note">
                It can also build custom dashboards — positions, margin, leverage, distance to
                liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's
                HyperTracker, HypurrScan and the Hyperliquid Explorer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- heritage ----------
          Not a feature, and not a history lesson: the one section that answers
          "why would this product understand my world?" and then stops. */}
      <section className="py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <p className="tr-eyebrow">Trading is part of the foundation.</p>
              <h2 className="tr-h2 mt-4 max-w-[16ch]">Built with trading in its DNA.</h2>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="tr-lead">
                Starchild comes from an ecosystem with deep roots in trading, market infrastructure and
                crypto. That experience shapes how the product approaches data, execution and risk.
              </p>
              <div className="tr-heritage">
                {["WOO", "WOOFi Pro", "Orderly"].map((name) => (
                  <span key={name} className="tr-heritage-mark">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- close ---------- */}
      <section className="py-28 text-center md:py-36">
        <Container>
          <div className="mx-auto flex max-w-[46ch] flex-col items-center gap-8">
            <h2 className="text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[42px]" style={{ fontFamily: "var(--font-google-sans)" }}>
              You define the logic and the limits. Starchild keeps it running.
            </h2>
            <p className="tr-lead text-center">
              Research, rules, execution inside approved permissions, risk control and continuous
              monitoring — one cycle instead of five tools.
            </p>
            <button type="button" onClick={startStrategy} className="tr-cta">
              Build a strategy
              <ArrowUpIcon className="size-3.5 rotate-45" />
            </button>
            <div className="tr-tags">
              <span>Repeatable</span>
              <span>Monitorable</span>
              <span>Verifiable</span>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .tr-page { background: #0a0a0a; min-height: 100vh; font-family: var(--font-google-sans); }
        .tr-band { background: #0d0d0d; border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06); }

        .tr-crumbs {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,.4);
        }
        .tr-crumb-link {
          display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
          padding: 0; border: 0; background: none;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.55);
          transition: color .2s ease;
        }
        .tr-crumb-link:hover { color: #fff; }
        .tr-crumb-link:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 4px; border-radius: 6px; }
        .tr-crumb-sep { color: rgba(255,255,255,.22); }
        .tr-crumb-here { color: rgba(255,255,255,.72); }

        .tr-eyebrow {
          font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: #ffa940;
        }
        .tr-label {
          font-size: 10.5px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(255,255,255,.34); margin-bottom: 14px;
        }
        .tr-h2 {
          font-size: 30px; line-height: 1.12; font-weight: 600; color: #fff; text-wrap: balance;
        }
        @media (min-width: 640px) { .tr-h2 { font-size: 38px; } }
        .tr-h3 {
          font-size: 24px; line-height: 1.18; font-weight: 600; color: #fff; text-wrap: balance;
          max-width: 20ch;
        }
        @media (min-width: 640px) { .tr-h3 { font-size: 28px; } }
        .tr-lead { font-size: 16px; line-height: 1.65; color: rgba(255,255,255,.58); max-width: 60ch; }

        /* --- ecosystem strip --- */
        .tr-strip-label {
          text-align: center; font-size: 12.5px; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.38);
        }
        .tr-strip-viewport {
          position: relative; overflow: hidden;
          /* fade both edges so marks enter and leave instead of popping */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .tr-strip-track { display: flex; width: max-content; animation: tr-scroll 42s linear infinite; }
        .tr-strip-img { display: block; height: 30px; width: auto; flex: none; opacity: .6; }
        /* -100%/6 === exactly one copy, so the loop restarts on an identical frame */
        @keyframes tr-scroll { from { transform: translateX(0); } to { transform: translateX(-16.6666%); } }
        .tr-strip-viewport:hover .tr-strip-track { animation-play-state: paused; }

        /* --- market intelligence --- */
        .tr-sources {
          padding: 22px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-converge {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 20px 0;
        }
        .tr-converge-line { flex: 1; height: 1px; background: rgba(255,255,255,.12); }
        .tr-converge-dot {
          width: 7px; height: 7px; border-radius: 999px; background: var(--color-primary); flex: none;
        }
        .tr-analysis {
          display: grid; gap: 6px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(248,70,0,.3); background: rgba(248,70,0,.07);
        }
        .tr-analysis-title { font-size: 14.5px; font-weight: 600; color: #fff; }
        .tr-analysis-copy { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,.6); }

        /* --- conductor flow --- */
        .tr-flowbox {
          padding: 18px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-flowsvg { display: block; width: 100%; height: auto; }
        .tr-fl { fill: none; stroke: rgba(255,255,255,.14); stroke-width: 1.2; }
        .tr-fnode { fill: rgba(255,255,255,.04); stroke: rgba(255,255,255,.14); stroke-width: 1; }
        .tr-fnode--hi { fill: rgba(248,70,0,.1); stroke: rgba(248,70,0,.45); }
        .tr-fpulse { fill: none; stroke: var(--color-primary); stroke-width: 1.6; }
        .tr-ftext {
          fill: rgba(255,255,255,.8); font-family: var(--font-google-sans); font-size: 13px;
          text-anchor: middle; dominant-baseline: middle;
        }
        .tr-ftext--hi { fill: #fff; font-weight: 600; }
        .tr-ftext--sub { fill: rgba(255,255,255,.45); font-size: 11px; }
        .tr-ftext--end { fill: #fff; font-weight: 600; }

        /* --- heritage --- */
        .tr-heritage { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .tr-heritage-mark {
          padding: 8px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          font-size: 13.5px; font-weight: 600; letter-spacing: .04em; color: rgba(255,255,255,.72);
        }
        .tr-note { margin-top: 22px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.42); }

        .tr-cta {
          display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
          padding: 14px 26px; border: 0; border-radius: 999px;
          background: #f84600; color: #fff; font-size: 15px; font-weight: 500;
          box-shadow: 0 8px 24px rgba(248,70,0,.32);
          transition: transform .18s ease;
        }
        .tr-cta:hover { transform: scale(1.03); }
        .tr-cta-note { font-size: 13.5px; color: rgba(255,255,255,.4); }

        /* what it turns into a system */
        .tr-system { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
        .tr-system li {
          display: grid; gap: 4px; padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .tr-system li:last-child { border-bottom: 1px solid rgba(255,255,255,.08); }
        .tr-system-title { font-size: 15.5px; font-weight: 600; color: #fff; }
        .tr-system-copy { font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.5); }

        /* four steps */
        .tr-step {
          display: flex; flex-direction: column; gap: 10px;
          padding-top: 18px; border-top: 2px solid rgba(248,70,0,.75);
        }
        .tr-step-n { font-size: 26px; font-weight: 600; color: #f84600; line-height: 1; }
        .tr-step-title { font-size: 16px; font-weight: 600; color: #fff; line-height: 1.35; }
        .tr-step-copy { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.5); }

        .tr-step-tag {
          display: inline-block; padding: 5px 12px; border-radius: 999px;
          background: rgba(248,70,0,.14); color: #ff8a4c;
          font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
        }

        /* connection table — a real table on desktop, stacked cards on narrow screens */
        .tr-table { border: 1px solid rgba(255,255,255,.1); border-radius: 14px; overflow: hidden; }
        .tr-tr {
          display: grid; gap: 18px; padding: 20px 22px;
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.55);
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .tr-tr:first-child { border-top: 0; }
        .tr-tr--head {
          background: rgba(255,255,255,.03);
          font-size: 10.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.34);
        }
        .tr-td-method { color: #fff; font-weight: 600; font-size: 15px; }
        @media (min-width: 900px) {
          .tr-tr { grid-template-columns: 1fr 1.3fr 1.6fr; align-items: start; }
        }
        @media (max-width: 899px) {
          .tr-tr--head { display: none; }
        }

        /* step 2 */
        .tr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .tr-chip {
          padding: 7px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          font-size: 13px; color: rgba(255,255,255,.72);
        }
        .tr-flow {
          margin-top: 26px; font-size: 14px; color: rgba(255,255,255,.45);
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
        }
        .tr-flow span { color: #f84600; }

        .tr-prompt {
          padding: 24px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
        }
        .tr-prompt-body { font-size: 15.5px; line-height: 1.6; color: rgba(255,255,255,.8); font-style: italic; }
        .tr-prompt-cta {
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          margin-top: 20px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .tr-prompt-cta:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        .tr-layers { display: flex; flex-direction: column; gap: 10px; }
        .tr-layer {
          display: grid; gap: 5px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        /* the layer that says no gets the accent — it is the one a trader is checking for */
        .tr-layer--hard { border-color: rgba(248,70,0,.42); background: rgba(248,70,0,.07); }
        .tr-layer-title { font-size: 15px; font-weight: 600; color: #fff; }
        .tr-layer-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.52); }

        /* step 3 + 4 */
        .tr-approvals { display: grid; gap: 12px; margin-top: 28px; }
        @media (min-width: 640px) { .tr-approvals { grid-template-columns: 1fr 1fr; } }
        .tr-approval {
          display: grid; gap: 6px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-approval-n { font-size: 13px; font-weight: 600; color: #ff8a4c; }
        .tr-approval-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.55); }

        .tr-cards { display: grid; gap: 12px; margin-top: 28px; }
        @media (min-width: 640px) { .tr-cards { grid-template-columns: 1fr 1fr; } }
        .tr-card {
          display: grid; gap: 8px; padding: 20px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-card-title { font-size: 15.5px; font-weight: 600; color: #fff; }
        .tr-card-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.52); }

        .tr-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .tr-tags span {
          padding: 7px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          font-size: 12.5px; color: rgba(255,255,255,.6);
        }

        @media (prefers-reduced-motion: reduce) { .tr-strip-track { animation: none; } }
        @media (max-width: 640px) { .tr-strip-img { height: 24px; } }
      `}</style>
    </div>
  );
}
