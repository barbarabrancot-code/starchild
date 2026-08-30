import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "../../Container";

type Plan = {
  name: string;
  previous?: string;
  price: string;
  allowance: string;
  cta: string;
  monthly: string[];
  machine: string;
  specs: string;
  fit: string;
  foot: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Pague conforme o uso",
    price: "$~",
    allowance: "Preços baseados em uso",
    cta: "+ Recarregar",
    monthly: ["Recarregue qualquer valor, a qualquer momento", "Pague apenas pelo que você usa", "Sem compromisso mensal"],
    machine: "Máquina Gratuita com Pagamento por Uso",
    specs: "2 vCPU Compartilhado · 1GB Memory · 1GB Storage",
    fit: "Melhor para: uso ocasional / exploração",
    foot: "Fundos nunca expiram — cobrado pelo uso real",
  },
  {
    name: "Lite",
    previous: "$60",
    price: "$19",
    allowance: "Limite diário de $2",
    cta: "Obter Lite",
    monthly: ["30 painéis de monitoramento de mercado ou", "40 apresentações (PPTs) ou", "300 tarefas de análise de código"],
    machine: "Máquina Lite Gratuita",
    specs: "2 vCPU Compartilhado · 1GB Memory · 1GB Storage",
    fit: "Ideal para: tarefas diárias / automação leve",
    foot: "Limite diário de $2",
  },
  {
    name: "Plus",
    previous: "$300",
    price: "$79",
    allowance: "Limite diário de $10",
    cta: "Obter Plus",
    monthly: ["150 painéis de monitoramento de mercado, ou", "200 apresentações (PPTs), ou", "1.500 tarefas de análise de código"],
    machine: "Máquina Plus Gratuita",
    specs: "4 vCPU Compartilhado · 2GB Memory · 2GB Storage",
    fit: "Ideal para: desenvolvedores individuais / traders",
    foot: "Limite diário de $10/dia",
    popular: true,
  },
  {
    name: "Pro",
    previous: "$900",
    price: "$199",
    allowance: "Limite diário de $30",
    cta: "Obter Pro",
    monthly: ["450 dashboards de monitoramento de mercado, ou", "600 apresentações (PPTs), ou", "4.500 tarefas de análise de código"],
    machine: "Máquina Pro Gratuita",
    specs: "8 vCPU Compartilhado · 4GB Memory · 10GB Storage",
    fit: "Melhor para: desenvolvedores profissionais / fluxos de trabalho automatizados de equipe",
    foot: "Limite diário de $30/dia",
  },
];

type PricingAudience = "general" | "traders";

const TRADER_PLANS: Plan[] = PLANS.map((plan) => {
  if (plan.name === "Pague conforme o uso") {
    return {
      ...plan,
      monthly: ["Recarregue qualquer valor, a qualquer momento", "Use apenas quando uma analise ou alerta precisar", "Sem compromisso mensal"],
      fit: "Melhor para: explorar analises e pesquisas de mercado",
    };
  }

  if (plan.name === "Lite") {
    return {
      ...plan,
      monthly: ["30 resumos de mercado ou", "40 pesquisas sobre ativos ou", "300 tarefas de analise rapida"],
      fit: "Ideal para: acompanhar o mercado no dia a dia",
    };
  }

  if (plan.name === "Plus") {
    return {
      ...plan,
      monthly: ["150 paineis de monitoramento de mercado, ou", "200 pesquisas sobre ativos, ou", "1.500 tarefas de analise de mercado"],
      fit: "Ideal para: traders individuais e rotinas de analise",
    };
  }

  return {
    ...plan,
    monthly: ["450 paineis de monitoramento de mercado, ou", "600 pesquisas sobre ativos, ou", "4.500 tarefas de analise de mercado"],
    fit: "Melhor para: traders profissionais e operacoes continuas",
  };
});

function MachineIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.6" y="2.4" width="12.8" height="8.6" rx="1.4" />
      <path d="M5.4 14h5.2M8 11v3" />
    </svg>
  );
}

export function PricingSection({
  onChoosePlan,
  standalone = false,
}: {
  onChoosePlan: () => void;
  standalone?: boolean;
}) {
  const [audience, setAudience] = useState<PricingAudience>("general");
  const plans = audience === "general" ? PLANS : TRADER_PLANS;

  return (
    <section className={`lp-pricing${standalone ? " lp-pricing--page" : ""}`} aria-label="Planos e preços">
      <Container>
        <motion.div
          className="lp-pricing-intro"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>Don’t subscribe to every AI.</h1>
          <p>Use the right one.</p>

          <div className="lp-value-banner">
            <div className="lp-value-side">
              <span className="lp-value-label">Without Starchild</span>
              <p>Separate AI tools. Separate chats. Separate costs.</p>
            </div>
            <span className="lp-value-divider" aria-hidden="true">vs</span>
            <div className="lp-value-side lp-value-side--active">
              <span className="lp-value-label">With Starchild</span>
              <p>One place to chat, create, research, and run agents.</p>
            </div>
          </div>

          <div className="lp-pricing-tabs" role="tablist" aria-label="Choose how you use Starchild">
            <button
              type="button"
              role="tab"
              aria-selected={audience === "general"}
              className={audience === "general" ? "lp-pricing-tab lp-pricing-tab--active" : "lp-pricing-tab"}
              onClick={() => setAudience("general")}
            >
              General use
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === "traders"}
              className={audience === "traders" ? "lp-pricing-tab lp-pricing-tab--active" : "lp-pricing-tab"}
              onClick={() => setAudience("traders")}
            >
              Traders
            </button>
          </div>
        </motion.div>

        <div
          className="lp-pricing-grid"
          role="tabpanel"
          aria-label={audience === "general" ? "General use plans" : "Trader plans"}
        >
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className="lp-price-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lp-price-top">
                <h2 className="lp-price-name">
                  {plan.name}
                  {plan.popular && <span className="lp-price-badge">Mais popular</span>}
                </h2>
                <p className="lp-price">
                  {plan.previous && <span className="lp-price-previous">{plan.previous}</span>}
                  <span className="lp-price-amount">{plan.price}</span>
                  <span className="lp-price-period">/Mês</span>
                </p>
                <p className="lp-price-allowance">{plan.allowance}</p>
                <p className="lp-price-models">Acesso a mais de 40 modelos</p>
              </div>

              <button type="button" className="lp-price-cta" onClick={onChoosePlan}>
                {plan.cta} <span aria-hidden="true">↗</span>
              </button>

              <p className="lp-price-fit">{plan.fit}</p>

              <div className="lp-price-list-block">
                <p className="lp-price-list-title">{plan.name === "Pague conforme o uso" ? "Como funciona:" : "A cada mês, você pode construir:"}</p>
                <ul className="lp-price-list">
                  {plan.monthly.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="lp-price-machine">
                <p className="lp-price-machine-title"><MachineIcon />{plan.machine}</p>
                <p>{plan.specs}</p>
                <small>{plan.foot}</small>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      <style>{`
        .lp-pricing { padding: 76px 0 116px; background: #050506; font-family: var(--font-google-sans); }
        .lp-pricing-intro { max-width: 920px; margin: 0 auto 42px; text-align: center; color: #fff; }
        .lp-pricing-intro h1 { margin: 0; font-size: clamp(32px, 4vw, 46px); line-height: 1.08; font-weight: 600; letter-spacing: -.035em; }
        .lp-pricing-intro > p { max-width: 620px; margin: 14px auto 0; color: #f84600; font-size: clamp(22px, 2.3vw, 28px); font-weight: 600; line-height: 1.2; letter-spacing: -.025em; text-wrap: balance; }
        .lp-value-banner { display: grid; grid-template-columns: minmax(0, 1fr) 42px minmax(0, 1fr); align-items: stretch; gap: 16px; margin-top: 28px; padding: 8px; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; background: rgba(255,255,255,.018); text-align: left; }
        .lp-value-side { display: flex; flex-direction: column; justify-content: center; min-height: 76px; padding: 14px 18px; border-radius: 10px; }
        .lp-value-side--active { background: linear-gradient(110deg, rgba(248,70,0,.16), rgba(248,70,0,.055)); box-shadow: inset 0 0 0 1px rgba(248,70,0,.2); }
        .lp-value-label { color: rgba(255,255,255,.52); font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
        .lp-value-side--active .lp-value-label { color: #ff8a5c; }
        .lp-value-side p { margin: 6px 0 0; color: rgba(255,255,255,.72); font-size: 14px; line-height: 1.4; }
        .lp-value-side--active p { color: rgba(255,255,255,.9); }
        .lp-value-divider { display: grid; place-items: center; color: rgba(255,255,255,.34); font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
        .lp-pricing-tabs { display: inline-flex; gap: 4px; margin-top: 26px; padding: 4px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; background: rgba(255,255,255,.025); }
        .lp-pricing-tab { min-width: 118px; padding: 10px 16px; border: 0; border-radius: 999px; background: transparent; color: rgba(255,255,255,.52); cursor: pointer; font: 600 13px/1 var(--font-google-sans); transition: background .2s ease, color .2s ease; }
        .lp-pricing-tab:hover { color: #fff; }
        .lp-pricing-tab--active { background: #f84600; color: #fff; }
        .lp-pricing-tab:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .lp-pricing-grid { display: grid; gap: 16px; }
        .lp-price-card { display: flex; flex-direction: column; min-height: 580px; padding: 36px; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: rgba(255,255,255,.015); color: #fff; }
        .lp-price-top { display: flex; flex-direction: column; gap: 9px; }
        .lp-price-name { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 28px; line-height: 1.08; font-weight: 600; letter-spacing: -.035em; }
        .lp-price-badge { padding: 5px 10px; border-radius: 999px; background: #f84600; font-size: 10px; font-weight: 700; letter-spacing: .01em; }
        .lp-price { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 4px 0 0; }
        .lp-price-previous { color: rgba(255,255,255,.35); font-size: 18px; text-decoration: line-through; }
        .lp-price-amount { color: #f84600; font-size: 52px; line-height: 1; font-weight: 700; letter-spacing: -.05em; }
        .lp-price-period { color: rgba(255,255,255,.5); font-size: 16px; }
        .lp-price-allowance { margin: 0; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
        .lp-price-models { margin: 0; color: rgba(255,255,255,.42); font-size: 14px; }
        .lp-price-cta { width: 100%; margin-top: 28px; padding: 15px 18px; border: 0; border-radius: 999px; background: #fff; color: #0a0a0a; cursor: pointer; font: 600 15px/1 var(--font-google-sans); transition: background .2s ease, transform .2s ease; }
        .lp-price-cta:hover { background: rgba(255,255,255,.86); }
        .lp-price-cta:active { transform: translateY(1px); }
        .lp-price-cta:focus-visible { outline: 2px solid #f84600; outline-offset: 3px; }
        .lp-price-list-block { margin-top: 38px; }
        .lp-price-list-title { margin: 0 0 16px; color: rgba(255,255,255,.5); font-size: 14px; font-weight: 600; }
        .lp-price-list { display: flex; flex-direction: column; gap: 14px; margin: 0; padding-left: 17px; color: rgba(255,255,255,.66); font-size: 15px; line-height: 1.5; }
        .lp-price-list li::marker { color: rgba(255,255,255,.42); }
        .lp-price-machine { margin-top: auto; padding-top: 28px; border-top: 1px solid rgba(255,255,255,.09); color: rgba(255,255,255,.48); font-size: 14px; line-height: 1.5; }
        .lp-price-machine p { margin: 0 0 18px; }
        .lp-price-machine-title { display: flex; align-items: center; gap: 9px; color: rgba(255,255,255,.65); font-size: 15px; font-weight: 600; }
        .lp-price-machine-title svg { flex: none; width: 16px; height: 16px; }
        .lp-price-fit { margin: 22px 0 0; padding: 10px 12px; border-left: 2px solid rgba(248,70,0,.8); border-radius: 0 8px 8px 0; background: rgba(248,70,0,.07); color: rgba(255,255,255,.82); font-size: 14px; font-weight: 500; line-height: 1.45; }
        .lp-price-machine small { color: rgba(255,255,255,.28); font-size: 13px; }
        @media (min-width: 720px) { .lp-pricing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1180px) { .lp-pricing-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 26px; } .lp-price-card { min-height: 720px; padding: 38px 36px; } .lp-price-name { font-size: 30px; } }
        @media (max-width: 640px) { .lp-pricing { padding-top: 60px; } .lp-pricing-intro { margin-bottom: 32px; } .lp-value-banner { grid-template-columns: 1fr; gap: 3px; } .lp-value-divider { height: 22px; } .lp-value-side { min-height: 0; padding: 14px 15px; } }
        @media (max-width: 480px) { .lp-pricing { padding-bottom: 72px; } .lp-price-card { min-height: 0; padding: 28px 24px; } .lp-price-amount { font-size: 46px; } }
        @media (prefers-reduced-motion: reduce) { .lp-price-cta { transition: none; } }
      `}</style>
    </section>
  );
}
