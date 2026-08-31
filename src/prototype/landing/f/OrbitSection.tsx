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
                <ellipse cx="200" cy="200" rx="168" ry="168" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="168" ry="68" transform="rotate(-18 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="168" ry="68" transform="rotate(62 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
                <ellipse cx="200" cy="200" rx="168" ry="68" transform="rotate(118 200 200)" stroke="var(--lf-accent)" strokeWidth="1" strokeDasharray="2 7" />
              </svg>
              <div className="orbf-core" aria-hidden="true"><PresenceOrb state={active ? "listening" : "resting"} size={112} /></div>
              <div className="orbf-spin">
                {IN_ORBIT.map((id, index) => {
                  const connector = BY_ID[id];
                  return <div key={id} className="orbf-arm" style={{ ["--orbit-angle" as string]: `${index * 60}deg` }}><div className="orbf-hold"><Chip id={id} active={active === id} onEnter={() => setActive(id)} onLeave={() => setActive(null)} />{active === id && <span className="orbf-tip"><strong>{connector.name}</strong>{connector.what}</span>}</div></div>;
                })}
              </div>
            </div>

            <div className="orbf-copy">
              <h2 id="orbf-title">Works with what<br />you already use.</h2>
              <button type="button" className="orbf-more" onClick={onSeeAll}>Explore all 30+ connectors <span aria-hidden="true">→</span></button>
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
        .orbf-spin { position: absolute; inset: 0; pointer-events: none; animation: orbf-rotate 52s linear infinite; }
        .orbf-arm { position: absolute; inset: 0; pointer-events: none; transform: rotate(var(--orbit-angle)); }
        .orbf-hold { position: absolute; top: calc(50% - 42% - 26px); left: 50%; width: 52px; height: 52px; margin-left: -26px; pointer-events: auto; transform: rotate(calc(var(--orbit-angle) * -1)); animation: orbf-unrotate 52s linear infinite; }
        .orbf-stage--held .orbf-rings, .orbf-stage--held .orbf-spin, .orbf-stage--held .orbf-hold { animation-play-state: paused; }
        @keyframes orbf-rotate { to { transform: rotate(360deg); } } @keyframes orbf-unrotate { to { transform: rotate(calc(var(--orbit-angle) * -1 - 360deg)); } }
        .orbf-chip { display: grid; place-items: center; width: 52px; height: 52px; padding: 0; border: 1px solid var(--lf-ctl-edge); border-radius: 999px; background: #141416; color: var(--lf-ink); cursor: pointer; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
        .orbf-chip--brand { background: #fff; border-color: rgba(var(--lf-ink-rgb), calc(.16 + .84 * var(--lf-lift-e))); }.orbf-chip img { display: block; width: 30px; height: 30px; }.orbf-chip:hover, .orbf-chip--active { transform: scale(1.08); border-color: var(--lf-accent); box-shadow: 0 0 0 2px var(--lf-accent), 0 0 24px rgba(var(--lf-accent-rgb), .32); }.orbf-chip:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }
        .orbf-tip { position: absolute; top: 50%; left: calc(100% + 12px); z-index: 2; width: max-content; max-width: 190px; padding: 8px 11px; border: 1px solid rgba(var(--lf-ink-rgb), .12); border-radius: 9px; background: var(--lf-surface); box-shadow: var(--lf-shadow); color: rgba(var(--lf-ink-rgb), calc(.68 + .32 * var(--lf-lift-t))); font-size: 10px; line-height: 1.35; transform: translateY(-50%); }.orbf-tip strong { display: block; margin-bottom: 2px; color: var(--lf-ink); font-size: 11px; }
        .orbf-copy h2 { margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }.orbf-more { display: inline-flex; align-items: center; gap: 9px; margin-top: 25px; padding: 0; border: 0; background: none; color: rgba(var(--lf-ink-rgb), calc(.6 + .4 * var(--lf-lift-t))); cursor: pointer; font: 500 15px/1 var(--font-google-sans); transition: color .18s ease; }.orbf-more:hover { color: var(--lf-ink); }.orbf-more span { color: var(--lf-accent-ink); font-size: 19px; line-height: .7; }.orbf-more:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 4px; border-radius: 3px; }
        /* Multiplied rather than added: on clay the orange behaves as pigment
           and warms the ground, where adding it only pushes toward white. The
           solid #f5c9b5 panel that used to be here was the light half of the same
           band — lighter than the page, with a curved edge running across the
           scroll. */
        .lf[data-lf="light"] .orbf-panel::before { opacity: .55; mix-blend-mode: multiply; }
        .lf[data-lf="light"] .orbf-rings ellipse:nth-child(1) { stroke-opacity: .82; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(2), .lf[data-lf="light"] .orbf-rings ellipse:nth-child(3) { stroke-opacity: .68; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(4) { stroke-opacity: .58; }
        @media (max-width: 940px) { .orbf-panel { min-height: 0; padding-block: 82px; }.orbf-grid { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 44px; }.orbf-copy { display: flex; flex-direction: column; align-items: center; }.orbf-stage { width: 340px; height: 340px; }.orbf-tip { top: calc(100% + 10px); left: 50%; transform: translateX(-50%); } }
        @media (max-width: 420px) { .orbf-stage { width: min(320px, calc(100vw - 32px)); height: min(320px, calc(100vw - 32px)); }.orbf-copy h2 { font-size: 35px; line-height: 43px; } }
        @media (prefers-reduced-motion: reduce) { .orbf-rings, .orbf-spin, .orbf-hold { animation: none; } }
      `}</style>
    </section>
  );
}
