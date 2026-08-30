import { motion } from "motion/react";
import { Container } from "../../Container";

type Surface = {
  title: string;
  lede: string;
  copy: string;
  kind: "chat" | "agents";
};

const SURFACES: Surface[] = [
  {
    title: "Chat",
    lede: "For questions, learning and everyday help.",
    copy: "Ask it anything and keep going. It holds on to what you have already said, so the fourth question does not need the first three explained again.",
    kind: "chat",
  },
  {
    title: "Agents",
    lede: "For the work you would rather not ask for twice.",
    copy: "Hand over the things that repeat — a check every Monday, a watch on a price, an inbox kept down to what needs you. They run on their own and come back when there is something worth interrupting you for.",
    kind: "agents",
  },
];

function ChatPreview() {
  return (
    <div className="sc-preview sc-chat-preview" aria-hidden="true">
      <p>Can you help me decide what to cook tonight? I&apos;d rather not go to the shop.</p>
      <p>Tell me what you have and I&apos;ll work with it.</p>
      <p>Chicken thighs, broccoli, carrots, garlic and a lemon.</p>
      <span>Ask anything</span>
    </div>
  );
}

function AgentsPreview() {
  return (
    <div className="sc-preview sc-agents-preview" aria-hidden="true">
      <header><b><i className="sc-status sc-status--green" />Inbox Manager</b><span>12m ago</span></header>
      <p className="sc-agent-request">Keep on top of my inbox. Draft replies for anything routine, but don&apos;t send anything without me.</p>
      <div className="sc-agent-update"><span>This morning, 8:00</span><b>Reviewed 12 emails · Drafted 4 replies</b></div>
      <div className="sc-agent-approval"><b>4 replies ready to send</b><span>Review and send</span></div>
    </div>
  );
}

function Preview({ kind }: { kind: Surface["kind"] }) {
  if (kind === "chat") return <ChatPreview />;
  return <AgentsPreview />;
}

/** Version B's card treatment of the same Chat, Agents and Connectors content. */
export function SurfacesCardsSection() {
  return (
    <section className="sc-section" id="surfaces">
      <Container>
        <div className="sc-grid">
          {SURFACES.map((surface, index) => (
            <motion.article
              className="sc-card"
              key={surface.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>{surface.title}</h2>
              <p className="sc-lede">{surface.lede}</p>
              <p className="sc-copy">{surface.copy}</p>
              <Preview kind={surface.kind} />
            </motion.article>
          ))}
        </div>
      </Container>

      <style>{`
        .sc-section { padding: 72px 0 112px; background: #050506; font-family: var(--font-google-sans); }
        .sc-grid { display: grid; gap: 20px; max-width: 1220px; margin: 0 auto; }
        .sc-card { display: flex; flex-direction: column; min-height: 454px; padding: 28px 22px 24px; border: 1px solid rgba(255,255,255,.1); border-radius: 19px; background: rgba(255,255,255,.025); color: #fff; }
        .sc-card h2 { margin: 0; font-size: 22px; line-height: 1.15; font-weight: 600; letter-spacing: -.025em; }
        .sc-lede { min-height: 42px; margin: 14px 0 0; font-size: 14px; line-height: 1.35; font-weight: 500; color: rgba(255,255,255,.9); }
        .sc-copy { margin: 14px 0 0; color: rgba(255,255,255,.5); font-size: 13.5px; line-height: 1.45; }
        .sc-preview { margin-top: auto; border: 1px solid rgba(255,255,255,.1); border-radius: 13px; background: rgba(255,255,255,.025); color: rgba(255,255,255,.72); font-size: 11px; }
        .sc-chat-preview { display: flex; flex-direction: column; align-items: flex-start; min-height: 178px; padding: 14px 13px; }
        .sc-chat-preview p { max-width: 82%; margin: 0 0 8px auto; padding: 8px 10px; border-radius: 11px; background: rgba(255,255,255,.1); line-height: 1.25; }
        .sc-chat-preview p:nth-of-type(2) { margin-right: auto; margin-left: 0; background: rgba(255,255,255,.055); }
        .sc-chat-preview span { width: 100%; margin-top: auto; padding: 9px 10px; border: 1px solid rgba(255,255,255,.13); border-radius: 10px; color: rgba(255,255,255,.38); }
        .sc-agents-preview header, .sc-connectors-preview header { display: flex; justify-content: space-between; padding: 14px; border-bottom: 1px solid rgba(255,255,255,.09); }
        .sc-agents-preview header b, .sc-connectors-preview header b { font-size: 12px; color: #fff; }
        .sc-agents-preview header span, .sc-connectors-preview header span { color: rgba(255,255,255,.38); }
        .sc-status { width: 6px; height: 6px; border-radius: 999px; }
        .sc-status--green { background: #58d692; } .sc-status--orange { background: #ffae38; }
        .sc-agents-preview header b { display: inline-flex; align-items: center; gap: 8px; }
        .sc-agent-request { margin: 12px 13px; padding: 9px 10px; border-radius: 9px; background: rgba(255,255,255,.06); color: rgba(255,255,255,.62); font-size: 10px; line-height: 1.35; }
        .sc-agent-update, .sc-agent-approval { display: flex; flex-direction: column; gap: 3px; margin: 0 13px 9px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 8px; }
        .sc-agent-update span { color: rgba(255,255,255,.36); font-size: 9px; } .sc-agent-update b { color: rgba(255,255,255,.78); font-size: 10px; }
        .sc-agent-approval { flex-direction: row; align-items: center; justify-content: space-between; border-color: rgba(248,70,0,.22); }
        .sc-agent-approval b { color: rgba(255,255,255,.9); font-size: 10px; } .sc-agent-approval span { padding: 4px 6px; border-radius: 5px; background: rgba(248,70,0,.16); color: #ffad8a; font-size: 9px; }
        @media (min-width: 760px) { .sc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .sc-card { min-height: 454px; padding: 28px 22px 24px; } }
        @media (min-width: 1180px) { .sc-section { padding: 92px 0 132px; } .sc-card { min-height: 454px; padding: 28px 22px 24px; } }
      `}</style>
    </section>
  );
}
