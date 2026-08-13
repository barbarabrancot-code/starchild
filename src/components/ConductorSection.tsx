import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TileDef = {
  id: string;
  icon: string; // arquivo em /public/icons/<icon>.svg
  // Cor ilustrativa da marca, usada quando o tile é o "escolhido". Não são
  // valores oficiais de brand guideline — ajuste se tiver a cor exata.
  color: string;
};

const COLS = 4;

// Lista "fonte da verdade": adicionar/remover um ícone aqui recalcula
// sozinho quantas células vazias existem e onde ficam (buildGrid abaixo).
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

/**
 * Monta o grid a partir da lista de ícones: escolhe quantas linhas/células
 * vazias usar (~1 vazia a cada 3 ícones, igual à proporção original) e
 * distribui as vazias em anéis a partir da linha central pra fora, espelhando
 * topo/baixo — assim o layout fica simétrico e se recalcula sozinho para
 * qualquer quantidade de ícones.
 */
function buildGrid(icons: TileDef[]): (TileDef | null)[] {
  const n = icons.length;
  const desiredEmpty = Math.max(2, Math.round(n / 3));
  let rows = Math.ceil((n + desiredEmpty) / COLS);
  if (rows % 2 === 0) rows += 1; // linha central garante simetria p/ qualquer paridade
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

  // quando a linha tem só 1 célula vazia, varia a coluna por anel — senão
  // toda linha "sobra 1" cairia sempre na coluna 0 e formaria uma faixa feia
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

// Ordem do "pulo" embaralhada (em vez de por coluna) pra não formar uma onda
// previsível — cada tile recebe um delay de uma posição aleatória na fila.
const FILLED_INDICES = TILES.map((t, i) => (t ? i : -1)).filter((i) => i !== -1);
const BOUNCE_ORDER = shuffle(FILLED_INDICES);
const BOUNCE_DELAY = new Map(BOUNCE_ORDER.map((idx, pos) => [idx, pos * 0.07]));

const DEMOS = [
  { prompt: "how's the market today?", model: "Z.ai", tileId: "zai" },
  { prompt: "write a poem about the ocean", model: "ChatGPT", tileId: "openai" },
  { prompt: "debug this python traceback", model: "Grok", tileId: "xai" },
  { prompt: "summarize this contract for me", model: "Gemini", tileId: "gemini" },
  { prompt: "turn this script into a voiceover", model: "ElevenLabs", tileId: "elevenlabs" },
  { prompt: "analyze this dataset for outliers", model: "DeepSeek", tileId: "deepseek" },
  { prompt: "plan a multi-step research task", model: "Manus", tileId: "manus" },
  { prompt: "catch me up on today's news", model: "Kimi", tileId: "kimi" },
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

const CARD_SHADOW = "0 0 0 0.5px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.05)";

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
    return (
      <div className="aspect-square w-full rounded-2xl border border-black/[0.04] bg-black/[0.025]" />
    );
  }

  return (
    <motion.div
      className="flex aspect-square w-full items-center justify-center rounded-2xl"
      initial={{ opacity: 0, scale: 0.9, y: 0 }}
      animate={
        selected
          ? {
              opacity: 1,
              y: 0,
              scale: 1.06,
              backgroundColor: tile.color,
              boxShadow: `0 14px 28px ${hexToRgba(tile.color, 0.28)}`,
            }
          : bouncing
            ? {
                opacity: 1,
                y: [0, -10, 0],
                scale: [1, 1.07, 1],
                backgroundColor: "#ffffff",
                boxShadow: CARD_SHADOW,
              }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                backgroundColor: "#ffffff",
                boxShadow: CARD_SHADOW,
              }
      }
      transition={
        selected
          ? { type: "spring", stiffness: 320, damping: 14 }
          : bouncing
            ? {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: BOUNCE_DELAY.get(index) ?? 0,
              }
            : { duration: 0.25 }
      }
    >
      <img
        src={`/icons/${tile.icon}.svg`}
        alt={tile.id}
        className="size-6 object-contain"
        style={{
          filter: selected ? "brightness(0) invert(1)" : "none",
          transition: "filter 0.3s",
        }}
      />
    </motion.div>
  );
}

export function ConductorSection() {
  const [typed, setTyped] = useState("");
  const [bouncing, setBouncing] = useState(false);
  const [result, setResult] = useState<{ tileId: string; model: string } | null>(null);

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
          setResult({ tileId: demo.tileId, model: demo.model });
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
    <section className="bg-[#f4f3f1] px-6 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[420px]">
          <p
            className="text-2xl italic text-neutral-900"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Discover the
          </p>
          <h2
            className="text-[40px] leading-tight font-bold"
            style={{ fontFamily: "var(--font-google-sans)", color: "#f4511e" }}
          >
            Conductor mode
          </h2>

          <div className="mt-8 flex h-14 items-center rounded-full bg-white px-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
            <span
              className="text-[15px] text-neutral-800"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              <span className="text-neutral-400">/ </span>
              {typed}
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-neutral-300 align-middle" />
            </span>
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-sm text-neutral-500"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            <span>Best model for this prompt:</span>
            <AnimatePresence mode="wait">
              {result && (
                <motion.span
                  key={result.model}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="font-semibold text-neutral-900"
                >
                  {result.model}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid w-full max-w-[420px] grid-cols-4 gap-3.5">
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
    </section>
  );
}
