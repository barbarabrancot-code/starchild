import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// native SVG dimensions, used to keep each logotype's aspect ratio at RENDER_HEIGHT
const LOGOS: { file: string; w: number; h: number }[] = [
  { file: "OpenAI.svg", w: 148, h: 40 },
  { file: "Spacexai.svg", w: 215, h: 29 },
  { file: "Claude.svg", w: 160, h: 34 },
  { file: "Frame374.svg", w: 151, h: 34 },
  { file: "Frame375.svg", w: 137, h: 40 },
  { file: "Frame376.svg", w: 177, h: 42 },
  { file: "Deepseek.svg", w: 206, h: 33 },
  { file: "Zai.svg", w: 40, h: 40 },
  { file: "Kimi.svg", w: 118, h: 40 },
];

const RENDER_HEIGHT = 22;
const CAROUSEL_HEIGHT = 20;
const CAROUSEL_RADIUS = 190;

type Phase = "flat" | "absorbing" | "carousel" | "restoring";

const DURATION: Record<Phase, number> = {
  flat: 3000,
  absorbing: 1600,
  carousel: 9000,
  restoring: 900,
};

const NEXT: Record<Phase, Phase> = {
  flat: "absorbing",
  absorbing: "carousel",
  carousel: "restoring",
  restoring: "flat",
};

export function MonolithAbsorption() {
  const [phase, setPhase] = useState<Phase>("flat");
  const n = LOGOS.length;

  useEffect(() => {
    const t = setTimeout(() => setPhase(NEXT[phase]), DURATION[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const rowVisible = phase === "flat" || phase === "absorbing";
  const rowFaded = phase === "absorbing" || phase === "carousel" || phase === "restoring";
  const beamOn = phase === "absorbing";
  const carouselVisible = phase === "carousel" || phase === "restoring";
  const carouselSpinning = phase === "carousel";

  return (
    <>
      <motion.img
        src={`${import.meta.env.BASE_URL}images/raio.svg`}
        alt=""
        className="beam-cone"
        aria-hidden="true"
        animate={{ opacity: beamOn ? 1 : 0 }}
        transition={{ duration: beamOn ? 0.5 : 0.9, ease: "easeInOut" }}
      />

      <div className="absorption-wrap" aria-hidden="true">
        {rowVisible && (
          <div className="absorption-row">
            {LOGOS.map((logo, i) => {
              const width = RENDER_HEIGHT * (logo.w / logo.h);
              // rightmost logos (closest to the monolith) fade first
              const delay = ((n - 1 - i) / n) * (DURATION.absorbing * 0.001 * 0.7);
              return (
                <motion.img
                  key={logo.file}
                  src={`${import.meta.env.BASE_URL}images/carousel/${logo.file}`}
                  alt=""
                  className="absorption-item"
                  style={{ width, height: RENDER_HEIGHT }}
                  animate={
                    rowFaded
                      ? { opacity: 0, y: -10, scale: 0.6 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.6, ease: "easeInOut", delay: rowFaded ? delay : 0 }}
                />
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {carouselVisible && (
          <motion.div
            className="carousel-scene"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="carousel-ring"
              animate={carouselSpinning ? { rotateY: 360 } : {}}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {LOGOS.map((logo, i) => {
                const width = CAROUSEL_HEIGHT * (logo.w / logo.h);
                const step = 360 / n;
                return (
                  <div
                    key={logo.file}
                    className="carousel-item"
                    style={{
                      width,
                      height: CAROUSEL_HEIGHT,
                      marginLeft: -width / 2,
                      marginTop: -CAROUSEL_HEIGHT / 2,
                      transform: `rotateY(${step * i}deg) translateZ(${CAROUSEL_RADIUS}px)`,
                    }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}images/carousel/${logo.file}`}
                      alt=""
                      style={{ width, height: CAROUSEL_HEIGHT, display: "block" }}
                    />
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .beam-cone {
          position: absolute; left: 0; bottom: 0; width: 100%; height: auto;
          pointer-events: none; mix-blend-mode: screen;
        }
        .absorption-wrap {
          position: absolute; left: 0; right: 0; bottom: 5%;
          padding: 0 6%; pointer-events: none;
        }
        .absorption-row {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .absorption-item { display: block; object-fit: contain; }

        .carousel-scene {
          position: absolute; left: 70%; top: 68%; transform: translate(-50%, -50%);
          width: min(420px, 55vw); height: 70px;
          perspective: 900px;
        }
        .carousel-ring {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
        }
        .carousel-item {
          position: absolute; left: 50%; top: 50%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          opacity: 0.9;
        }

        @media (max-width: 860px) {
          .absorption-row { flex-wrap: wrap; justify-content: center; row-gap: 10px; }
        }
      `}</style>
    </>
  );
}
