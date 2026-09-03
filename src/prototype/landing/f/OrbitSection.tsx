import { useState } from "react";
import { Container } from "../../Container";
import { AppIcon } from "../../agents/AppIcon";
import { BY_ID, type ConnectorId } from "../../agents/connectors";
import { PresenceOrb } from "../../presence/PresenceOrb";
import connectorsBackground from "../../../../assets/background connectors.png";

const IN_ORBIT: ConnectorId[] = ["gmail", "gcal", "gdrive", "notion", "slack", "telegram"];

function Chip({ id, active, onEnter, onLeave }: { id: ConnectorId; active: boolean; onEnter: () => void; onLeave: () => void }) {
  const [hasLogo, setHasLogo] = useState(true);
  const connector = BY_ID[id];

  return (
    <button type="button" className={`orbf-chip${hasLogo ? " orbf-chip--brand" : ""}${active ? " orbf-chip--active" : ""}`} aria-label={connector.name} onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave}>
      {hasLogo ? <img src={`${import.meta.env.BASE_URL}connectors/${id}.svg`} alt="" onError={() => setHasLogo(false)} /> : <AppIcon kind={connector.kind} className="size-[22px]" />}
    </button>
  );
}

export function OrbitSection({ onSeeAll }: { onSeeAll: () => void }) {
  const [active, setActive] = useState<ConnectorId | null>(null);

  return (
    <section className="orbf-section" aria-labelledby="orbf-title">
      <div className="orbf-panel">
        <Container>
          <div className="orbf-grid">
            <div className={`orbf-stage${active ? " orbf-stage--held" : ""}`} onMouseLeave={() => setActive(null)}>
              <svg className="orbf-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                <ellipse cx="200" cy="200" rx="190" ry="190" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="190" ry="77" transform="rotate(-18 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="190" ry="77" transform="rotate(62 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="190" ry="77" transform="rotate(118 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
              </svg>
              <div className="orbf-core" aria-hidden="true"><PresenceOrb state={active ? "listening" : "resting"} size={112} /></div>
              <div className="orbf-spin">
                {IN_ORBIT.map((id, index) => {
                  const connector = BY_ID[id];
                  return <div key={id} className="orbf-arm" style={{ ["--orbit-angle" as string]: `${index * 60}deg`, ["--orbit-i" as string]: index }}><div className="orbf-hold"><Chip id={id} active={active === id} onEnter={() => setActive(id)} onLeave={() => setActive(null)} />{active === id && <span className="orbf-tip"><strong>{connector.name}</strong>{connector.what}</span>}</div></div>;
                })}
              </div>
            </div>

            <div className="orbf-copy">
              <h2 id="orbf-title">Works with what<br />you already use.</h2>
              <button type="button" className="orbf-more" onClick={onSeeAll}>Explore all 30+ connectors
                <svg className="orbf-more-arrow" viewBox="0 0 22 14" width="22" height="14" fill="none" aria-hidden="true">
                  <path d="m15 1.5 5.5 5.5-5.5 5.5M20.5 7H1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        .orbf-section { position: relative; background: transparent; font-family: var(--font-google-sans); }
        /* No ground of its own. #0c0f10 against the page's #050506 is a band
           with a visible top and bottom edge — a second sheet under one section,
           which is the thing the rest of this page does not do. The section keeps
           its height and its padding and sits on the page like everything else. */
        .orbf-panel { position: relative; display: grid; align-items: center; min-height: 640px; padding-block: 90px; overflow: hidden; }

        /* The wash, on a layer of its own rather than painted on the panel.

           A transparent orange PNG — RGBA, mostly empty, Starchild orange at
           about a fifth of an alpha where it is not — so it is the same kind of
           object as the hero's wash and the conductor's beams, and it takes the
           same treatment on each ground. It is a pseudo-element because the light
           mode needs to blend it, and a blend mode on the panel would take the
           orbit, the heading and the link with it. */
        .orbf-panel::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; background: url(${connectorsBackground}) center / 100% 100% no-repeat; }
        .orbf-grid { position: relative; z-index: 1; }
        .orbf-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px; max-width: 1080px; margin: 0 auto; }
        .orbf-stage { position: relative; justify-self: center; width: 400px; height: 400px; }
        .orbf-rings { position: absolute; inset: 0; width: 100%; height: 100%; animation: orbf-rotate 52s linear infinite; }
        .orbf-rings ellipse:nth-child(1) { stroke-opacity: .5; } .orbf-rings ellipse:nth-child(2), .orbf-rings ellipse:nth-child(3) { stroke-opacity: .34; } .orbf-rings ellipse:nth-child(4) { stroke-opacity: .28; }
        .orbf-core { position: absolute; top: 50%; left: 50%; width: 112px; height: 112px; transform: translate(-50%, -50%); }
        /* ---------- the depth ----------

           Nothing here is restructured: the rings are the same four ellipses, the
           six arms are in the same places, and the markup did not move. What
           changes is that the connectors stop travelling a flat circle.

           --orbit-squash is the whole trick. The spinning layer is flattened
           vertically, so a point turning on a circle inside it traces an ellipse
           instead — the same ellipse the rings are already drawn as. .55 is
           roughly the rings' own ratio, so the path lands on them rather than
           crossing them.

           The chip then undoes the squash for itself, which is why it stays a
           circle while the path it follows is not. */
                /* --orbit-r is where the connectors sit, and it has to stay in step with
           the rx on the ellipses above — they are the same ring drawn twice, once
           as a line and once as six positions on it. 190 of the 400 viewBox is
           47.5%. */
        .orbf-stage { --orbit-r: 47.5%; --orbit-squash: .55; --orbit-period: 52s; }

        .orbf-spin { position: absolute; inset: 0; pointer-events: none; animation: orbf-rotate var(--orbit-period) linear infinite; }
        .orbf-arm { position: absolute; inset: 0; pointer-events: none; transform: rotate(var(--orbit-angle)); }
        .orbf-hold { position: absolute; top: calc(50% - var(--orbit-r) - 26px); left: 50%; width: 52px; height: 52px; margin-left: -26px; pointer-events: auto; transform: rotate(calc(var(--orbit-angle) * -1)) scaleY(calc(1 / var(--orbit-squash))); animation: orbf-unrotate var(--orbit-period) linear infinite; }

        /* Nearer at the bottom of the ellipse, further at the top — so the chip
           grows and brightens on the way toward you and shrinks and dims on the
           way behind. This is the cue that makes the flattened path read as a
           tilted orbit rather than as an oval.

           On the standalone scale property rather than inside transform, because
           transform on this element is already carrying the counter-rotation and
           the hover lift. One set of keyframes for all six, offset by a sixth of
           a turn each: the phase is arithmetic instead of six hand-written
           animations, and it stays correct if the count or the period changes. */
        .orbf-chip {
          animation: orbf-depth var(--orbit-period) linear infinite;
          animation-delay: calc(var(--orbit-i) * var(--orbit-period) / -6);
        }
        .orbf-stage--held .orbf-rings, .orbf-stage--held .orbf-spin, .orbf-stage--held .orbf-hold, .orbf-stage--held .orbf-chip { animation-play-state: paused; }

        /* The squash rides on the rotation rather than sitting on the element,
           because animating transform replaces the property outright — set it
           separately and the first frame throws it away. */
        @keyframes orbf-rotate {
          from { transform: scaleY(var(--orbit-squash)) rotate(0deg); }
          to { transform: scaleY(var(--orbit-squash)) rotate(360deg); }
        }
        @keyframes orbf-unrotate {
          from { transform: rotate(calc(var(--orbit-angle) * -1)) scaleY(calc(1 / var(--orbit-squash))); }
          to { transform: rotate(calc(var(--orbit-angle) * -1 - 360deg)) scaleY(calc(1 / var(--orbit-squash))); }
        }
        /* Big and bright at the near side, small and dim at the far one, and the
           near side is the BOTTOM of the ellipse — its lowest point is the closest
           thing on screen to the person looking at it.

           The peak has to sit at 50% for that, and the reason is worth writing
           down because it is not guessable. A connector starts at twelve o'clock
           and its delay is -i·P/6, so its animation progress is (t/P + i/6). Its
           angle from twelve o'clock is 360·t/P + 60i. Setting progress to 0.5
           gives t/P = 0.5 - i/6, and substituting that into the angle gives 180°
           — the bottom — for every one of the six. At 0% it comes out 0°, the
           top, which is the far side and the wrong place for the peak.

           I had it at 50%, moved it to 0% on a report that it looked inverted,
           and that was the wrong fix: the reading was inverted, not the phase. */
        @keyframes orbf-depth {
          0%, 100% { scale: .84; opacity: .62; }
          50% { scale: 1.1; opacity: 1; }
        }
        .orbf-chip { display: grid; place-items: center; width: 52px; height: 52px; padding: 0; border: 1px solid var(--lf-ctl-edge); border-radius: 999px; background: #141416; color: var(--lf-ink); cursor: pointer; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
        .orbf-chip--brand { background: #fff; border-color: rgba(var(--lf-ink-rgb), calc(.16 + .84 * var(--lf-lift-e))); }.orbf-chip img { display: block; width: 30px; height: 30px; }.orbf-chip:hover, .orbf-chip--active { transform: scale(1.08); border-color: var(--lf-accent); box-shadow: 0 0 0 2px var(--lf-accent), 0 0 24px rgba(var(--lf-accent-rgb), .32); }.orbf-chip:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }
        .orbf-tip { position: absolute; top: 50%; left: calc(100% + 12px); z-index: 2; width: max-content; max-width: 190px; padding: 8px 11px; border: 1px solid rgba(var(--lf-ink-rgb), .12); border-radius: 9px; background: var(--lf-surface); box-shadow: var(--lf-shadow); color: rgba(var(--lf-ink-rgb), calc(.68 + .32 * var(--lf-lift-t))); font-size: 10px; line-height: 1.35; transform: translateY(-50%); }.orbf-tip strong { display: block; margin-bottom: 2px; color: var(--lf-ink); font-size: 11px; }
        .orbf-copy h2 { margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }.orbf-more { display: inline-flex; align-items: center; gap: 9px; margin-top: 25px; padding: 0; border: 0; background: none; color: rgba(var(--lf-ink-rgb), calc(.6 + .4 * var(--lf-lift-t))); cursor: pointer; font: 500 15px/1 var(--font-google-sans); transition: color .18s ease; }.orbf-more:hover { color: var(--lf-ink); }.orbf-more-arrow { flex: none; transition: transform .18s ease; }
        .orbf-more:hover .orbf-more-arrow { transform: translateX(2px); }.orbf-more:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 4px; border-radius: 3px; }
        /* Multiplied rather than added: on clay the orange behaves as pigment
           and warms the ground, where adding it only pushes toward white. The
           solid #f5c9b5 panel that used to be here was the light half of the same
           band — lighter than the page, with a curved edge running across the
           scroll. */
        .lf[data-lf="light"] .orbf-panel::before { opacity: .55; mix-blend-mode: multiply; }
        .lf[data-lf="light"] .orbf-rings ellipse:nth-child(1) { stroke-opacity: .82; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(2), .lf[data-lf="light"] .orbf-rings ellipse:nth-child(3) { stroke-opacity: .68; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(4) { stroke-opacity: .58; }
        @media (max-width: 940px) { .orbf-panel { min-height: 0; padding-block: 82px; }.orbf-grid { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 44px; }.orbf-copy { display: flex; flex-direction: column; align-items: center; }.orbf-stage { width: 340px; height: 340px; }.orbf-tip { top: calc(100% + 10px); left: 50%; transform: translateX(-50%); } }
        @media (max-width: 420px) { .orbf-stage { width: min(320px, calc(100vw - 32px)); height: min(320px, calc(100vw - 32px)); }.orbf-copy h2 { font-size: 35px; line-height: 43px; } }
        /* The squash lives in the keyframes, so stopping the animation would also
           flatten the path back to a circle. Held still, the layer keeps it. */
        @media (prefers-reduced-motion: reduce) {
          .orbf-rings, .orbf-spin, .orbf-hold, .orbf-chip { animation: none; }
          .orbf-spin { transform: scaleY(var(--orbit-squash)); }
        }
      `}</style>
    </section>
  );
}
