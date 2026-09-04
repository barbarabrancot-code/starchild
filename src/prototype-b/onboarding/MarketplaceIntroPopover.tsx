import { motion } from "motion/react";
import { IntroPopover } from "./IntroPopover";

// The second and last of the first-run notes, hanging off the Marketplace item in
// the sidebar. Same treatment as the Conductor one on purpose: two quiet notes in
// the same voice, not a tour with chapters.

// A scatter of what other people have built, and one of them yours. No grid, no
// labels — the point is "there are many, and you can add to them".
const BUILDS = [
  { x: -58, y: -20, size: 5, delay: 0 },
  { x: -30, y: 16, size: 4, delay: 0.9 },
  { x: 4, y: -24, size: 4, delay: 1.8 },
  { x: 36, y: 20, size: 5, delay: 0.5 },
  { x: 60, y: -14, size: 4, delay: 1.3 },
];

/** the one that's yours */
const MINE = { x: 0, y: 6, size: 11 };

function MarketplaceVisual() {
  return (
    <>
      {BUILDS.map((build) => (
        <motion.span
          key={`${build.x},${build.y}`}
          className="absolute rounded-[2px] bg-white/70"
          style={{
            width: build.size,
            height: build.size,
            left: `calc(50% - ${build.size / 2}px + ${build.x}px)`,
            top: `calc(50% - ${build.size / 2}px + ${build.y}px)`,
          }}
          animate={{ opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 4.6, delay: build.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.span
        className="absolute rounded-[3px] bg-[#f84600]"
        style={{
          width: MINE.size,
          height: MINE.size,
          left: `calc(50% - ${MINE.size / 2}px + ${MINE.x}px)`,
          top: `calc(50% - ${MINE.size / 2}px + ${MINE.y}px)`,
          boxShadow: "0 0 22px rgba(248,70,0,.55)",
        }}
        animate={{ scale: [1, 1.09, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export function MarketplaceIntroPopover({
  onExplore,
  onClose,
}: {
  onExplore: () => void;
  onClose: () => void;
}) {
  return (
    <IntroPopover
      placement="right"
      visual={<MarketplaceVisual />}
      title="Meet the Marketplace"
      body="Discover what others have built. Use it, customize it, or publish your own."
      ctaLabel="Explore Marketplace"
      onCta={onExplore}
      onClose={onClose}
    />
  );
}
