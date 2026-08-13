import { useState } from "react";
import { motion, type Variants } from "motion/react";

// Layout do grid: null = célula "vazia" (apagada), string = célula "logo".
// Troque os slots/nomes livremente; o svg correspondente deve existir em /public/logos/<nome>.svg
const TILES: (string | null)[] = [
  null, "notion", null, "sentry", null,
  "github", null, "gitlab", null, "vercel",
  null, "codex", null, "cursor", null,
  "railway", null, "chatgpt", null, null,
];

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Tile({ logo, index }: { logo: string | null; index: number }) {
  const [broken, setBroken] = useState(false);

  const emptyClasses = "bg-white/[0.02] border border-white/[0.05]";
  const filledClasses =
    "bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] ring-[0.5px] ring-black/10 flex items-center justify-center";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={tileVariants}
      className={`aspect-square w-full rounded-[20px] ${logo ? filledClasses : emptyClasses}`}
    >
      {logo && !broken && (
        <img
          src={`${import.meta.env.BASE_URL}logos/${logo}.svg`}
          alt={logo}
          className="size-8 object-contain"
          onError={() => setBroken(true)}
        />
      )}
      {logo && broken && (
        <span className="text-xs font-medium uppercase text-black/40">
          {logo.slice(0, 2)}
        </span>
      )}
    </motion.div>
  );
}

export function IntegrationsSection() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[365px]">
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-denton)",
              fontSize: 64,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Connects with your tools
          </h2>
          <p className="mt-4 max-w-[365px] text-sm text-white/50">
            Integrates with what you already use every day — no friction, no
            complicated setup.
          </p>
        </div>

        <div className="grid w-full max-w-[436px] grid-cols-5 gap-3.5">
          {TILES.map((logo, i) => (
            <Tile key={i} logo={logo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
