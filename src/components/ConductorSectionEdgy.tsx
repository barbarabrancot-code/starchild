import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TileDef = {
  id: string;
  icon: string; // arquivo em /public/icons/<icon>.svg
  color: string;
};

const COLS = 4;

const ICONS: TileDef[] = [
  { id: "ai-generic", icon: "ai-generic", color: "#111111" },
  { id: "gemini", icon: "gemini", color: "#4C8DF6" },
  { id: "elevenlabs", icon: "elevenlabs", color: "#27272A" },
  { id: "deepseek", icon: "deepseek", color: "#4D6BFE" },
  { id: "zai", icon: "zai", color: "#3E63DD" },
  { id: "manus", icon: "manus", color: "#7C3AED" },
  { id: "kimi", icon: "kimi", color: "#0F766E" },
  { id: "xai", icon: "xai", color: "#000000" },
  { id: "openai", icon: "openai", color: "#10A37F" },
];

// Mesma lógica de montagem de grid do ConductorSection original — duplicada
// aqui de propósito pra esta seção poder evoluir como um layout independente.
function buildGrid(icons: TileDef[]): (TileDef | null)[] {
  const n = icons.length;
  const desiredEmpty = Math.max(2, Math.round(n / 3));
  let rows = Math.ceil((n + desiredEmpty) / COLS);
  if (rows % 2 === 0) rows += 1;
  const total = rows * COLS;
  const emptyCount = total - n;

  const center = Math.floor(rows / 2);
  const emptyPerRow = new Array(rows).fill(0);
  const ringOfRow = new Array(rows).fill(0);
  let remaining = emptyCount;
  for (let ring = 0; remaining > 0 && ring <= center; ring++) {
    const top = center - ring;
    const bottom = center + ring;
    const rowsInRing = top === bottom ? [top] : [top, bottom];
    for (const r of rowsInRing) {
      if (remaining <= 0) break;
      emptyPerRow[r] += 1;
      ringOfRow[r] = ring;
      remaining -= 1;
    }
  }

  const singleColumnByRing = [1, 2, 0, 3];

  const slots: (TileDef | null)[] = [];
  let cursor = 0;
  for (let r = 0; r < rows; r++) {
    const empties = emptyPerRow[r];
    const emptyCols = new Set<number>();
    if (empties === 1) {
      emptyCols.add(singleColumnByRing[ringOfRow[r] % singleColumnByRing.length]);
    } else {
      for (let k = 0; k < empties; k++) {
        const fromEdge = Math.floor(k / 2);
        const col = k % 2 === 0 ? fromEdge : COLS - 1 - fromEdge;
        emptyCols.add(col);
      }
    }
    for (let c = 0; c < COLS; c++) {
      slots.push(emptyCols.has(c) ? null : (icons[cursor++] ?? null));
    }
  }
  return slots;
}

const TILES = buildGrid(ICONS);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FILLED_INDICES = TILES.map((t, i) => (t ? i : -1)).filter((i) => i !== -1);
const BOUNCE_ORDER = shuffle(FILLED_INDICES);
const BOUNCE_DELAY = new Map(BOUNCE_ORDER.map((idx, pos) => [idx, pos * 0.06]));

// Além do modelo, cada demo carrega a variante específica escolhida dentro
// daquele provedor (ex.: dentro do ChatGPT, qual GPT foi selecionado).
const DEMOS = [
  { prompt: "how's the market today?", model: "Z.ai", variant: "GLM-4.6", tileId: "zai" },
  { prompt: "write a poem about the ocean", model: "ChatGPT", variant: "GPT-5.1", tileId: "openai" },
  { prompt: "debug this python traceback", model: "Grok", variant: "Grok 4", tileId: "xai" },
  { prompt: "summarize this contract for me", model: "Gemini", variant: "2.5 Pro", tileId: "gemini" },
  { prompt: "turn this script into a voiceover", model: "ElevenLabs", variant: "v3", tileId: "elevenlabs" },
  { prompt: "analyze this dataset for outliers", model: "DeepSeek", variant: "V3.2", tileId: "deepseek" },
  { prompt: "plan a multi-step research task", model: "Manus", variant: "1.5", tileId: "manus" },
  { prompt: "catch me up on today's news", model: "Kimi", variant: "K2", tileId: "kimi" },
];

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

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const value = parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACCENT = "#f4511e";
const TILE_SHADOW = "0 0 0 1px rgba(255,255,255,0.06)";

function CornerBrackets({ inset = -2 }: { inset?: number }) {
  const base = "pointer-events-none absolute size-3 border-[#f4511e]/70";
  const s = `${inset}px`;
  return (
    <>
      <span className={`${base} border-l-2 border-t-2`} style={{ left: s, top: s }} />
      <span className={`${base} border-r-2 border-t-2`} style={{ right: s, top: s }} />
      <span className={`${base} border-b-2 border-l-2`} style={{ left: s, bottom: s }} />
      <span className={`${base} border-b-2 border-r-2`} style={{ right: s, bottom: s }} />
    </>
  );
}

function Tile({
  tile,
  index,
  bouncing,
  selected,
}: {
  tile: TileDef | null;
  index: number;
  bouncing: boolean;
  selected: boolean;
}) {
  if (!tile) {
    return <div className="aspect-square w-full rounded-md border border-white/[0.06] bg-white/[0.02]" />;
  }

  return (
    <motion.div
      className="relative flex aspect-square w-full items-center justify-center rounded-md"
      initial={{ opacity: 0, scale: 0.9, y: 0, rotate: 0 }}
      animate={
        selected
          ? {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1.08,
              backgroundColor: tile.color,
              boxShadow: `0 0 0 1px ${hexToRgba(ACCENT, 0.7)}, 0 16px 32px ${hexToRgba(tile.color, 0.35)}`,
            }
          : bouncing
            ? {
                opacity: 1,
                y: [0, -9, 0],
                rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                scale: [1, 1.08, 1],
                backgroundColor: "#141414",
                boxShadow: TILE_SHADOW,
              }
            : {
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
                backgroundColor: "#141414",
                boxShadow: TILE_SHADOW,
              }
      }
      transition={
        selected
          ? { type: "spring", stiffness: 320, damping: 14 }
          : bouncing
            ? {
                duration: 0.45,
                repeat: Infinity,
                ease: "easeInOut",
                delay: BOUNCE_DELAY.get(index) ?? 0,
              }
            : { duration: 0.25 }
      }
    >
      {selected && <CornerBrackets inset={-4} />}
      <img
        src={`/icons/${tile.icon}.svg`}
        alt={tile.id}
        className="size-6 object-contain"
        style={{
          filter: selected ? "brightness(0) invert(1)" : "invert(1) brightness(1.7)",
          transition: "filter 0.3s",
        }}
      />
    </motion.div>
  );
}

export function ConductorSectionEdgy() {
  const [typed, setTyped] = useState("");
  const [bouncing, setBouncing] = useState(false);
  const [result, setResult] = useState<{ tileId: string; model: string; variant: string } | null>(null);

  useEffect(() => {
    const cancelledRef = { current: false };

    async function run() {
      let i = 0;
      try {
        while (true) {
          const demo = DEMOS[i % DEMOS.length];
          i++;

          setResult(null);
          for (let c = 1; c <= demo.prompt.length; c++) {
            setTyped(demo.prompt.slice(0, c));
            await wait(32, cancelledRef);
          }
          await wait(450, cancelledRef);

          setBouncing(true);
          await wait(1500, cancelledRef);
          setBouncing(false);
          setResult({ tileId: demo.tileId, model: demo.model, variant: demo.variant });
          await wait(2400, cancelledRef);

          for (let c = demo.prompt.length; c >= 0; c--) {
            setTyped(demo.prompt.slice(0, c));
            await wait(14, cancelledRef);
          }
          setResult(null);
          await wait(350, cancelledRef);
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
    <section className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col-reverse items-start gap-14 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-[420px]">
          <CornerBrackets inset={-10} />
          <div
            className="grid grid-cols-4 gap-2.5 p-2"
            style={{ transform: "rotate(-2.5deg) scale(1.02)" }}
          >
            {TILES.map((tile, i) => (
              <Tile
                key={i}
                tile={tile}
                index={i}
                bouncing={bouncing}
                selected={tile ? result?.tileId === tile.id : false}
              />
            ))}
          </div>
        </div>

        <div className="max-w-[420px]">
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: ACCENT }}
          >
            // select mode
          </p>
          <h2
            className="mt-2 text-[42px] leading-[0.95] font-bold uppercase text-white"
            style={{ fontFamily: "var(--font-google-sans)", letterSpacing: "-0.01em" }}
          >
            Conductor
            <br />
            <span style={{ WebkitTextStroke: `1.5px ${ACCENT}`, color: "transparent" }}>mode</span>
          </h2>

          <div className="mt-8 flex h-14 items-center gap-2 border border-white/15 bg-black px-5">
            <span style={{ color: ACCENT, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {">"}
            </span>
            <span
              className="text-[15px] text-white/90"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {typed}
              <span
                className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse align-middle"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            <span>best model</span>
            <span className="text-white/20">/</span>
            <AnimatePresence mode="wait">
              {result && (
                <motion.span
                  key={result.model}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="bg-white px-2 py-0.5 text-[11px] font-bold text-black">
                    {result.model}
                  </span>
                  <span className="border px-2 py-0.5 text-[11px]" style={{ borderColor: hexToRgba(ACCENT, 0.6), color: ACCENT }}>
                    {result.variant}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
