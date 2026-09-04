import { Container } from "../Container";

// One wide SVG strip of company marks. The file is cropped with a half-gap on each
// edge, so butting copies together reproduces the strip's own spacing at the seam —
// no CSS margin, or the join reads as a hole.
const STRIP = `${import.meta.env.BASE_URL}images/empresas.svg`;

// Enough copies that the track always overflows the viewport; shifting by exactly
// one copy (100% / COPIES) lands the next one where the last was.
const COPIES = 6;

export function UsedAtWorkSection() {
  return (
    <section className="uw-section bg-[#0a0a0a] py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <p
            className="col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            Trusted by people at
          </p>
        </div>
      </Container>

      {/* full-bleed on purpose: the marquee should run past the page gutter */}
      <div className="uw-viewport mt-10" aria-hidden="true">
        <div className="uw-track">
          {Array.from({ length: COPIES }, (_, i) => (
            <img key={i} src={STRIP} alt="" className="uw-strip" />
          ))}
        </div>
      </div>

      <style>{`
        .uw-viewport {
          position: relative; overflow: hidden;
          /* fade both edges so marks enter and leave instead of popping */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .uw-track {
          display: flex; width: max-content;
          animation: uw-scroll 42s linear infinite;
        }
        .uw-strip {
          display: block; height: 32px; width: auto; flex: none; opacity: .72;
        }
        /* -100%/6 === exactly one copy, so the loop restarts on an identical frame */
        @keyframes uw-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-16.6666%); }
        }
        .uw-viewport:hover .uw-track { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .uw-track { animation: none; }
        }
        @media (max-width: 640px) {
          .uw-strip { height: 24px; }
        }
      `}</style>
    </section>
  );
}
