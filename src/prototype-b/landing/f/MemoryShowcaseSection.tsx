import { useState } from "react";
import { Container } from "../../Container";
import showcaseShot from "../../../../assets/images/Imagem do Codex 30 de ago. de 2026, 23_47_28.png";

const MESSAGES = [
  "Talk to an AI that remembers you.",
  "Get the right AI without choosing it yourself.",
  "Turn ideas into something real.",
  "Get everyday tasks off your plate.",
  "Hand it over and keep moving.",
  "Use what already works — or earn from yours.",
];

/** A compact product moment: generated work on the left, its promise on the right. */
export function MemoryShowcaseSection() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((current) => (current + direction + MESSAGES.length) % MESSAGES.length);

  return (
    <section className="mss-section" aria-labelledby="mss-title">
      <Container>
        <div className="mss-layout">
          {/* The picture, in place of the poster that was drawn here in CSS.
              What it replaces was a mock — a canvas, a poster, two pistachios and
              a composer, all built from divs and standing in for artwork that did
              not exist yet. It exists now.

              The file carries its own card: the rounded panel, the ground and the
              shadow are painted into it, which is why nothing here draws a frame
              around it. It is portrait where the column is landscape, so it is
              fitted by height and centred rather than cropped — the poster is the
              subject, and cropping to a wide box would take the top and bottom
              off the thing being shown. The card around it is kept, and it does
              not read as a second frame — see the note on .mss-art. */}
          <div className="mss-art">
            <img className="mss-shot" src={showcaseShot} alt="Starchild creating a flyer for an artisan bakery" />
          </div>

          <div className="mss-copy">
            <h2 id="mss-title" aria-live="polite">{MESSAGES[active]}</h2>
            <div className="mss-arrows">
              <button type="button" onClick={() => move(-1)} aria-label="Previous use case"><svg viewBox="0 0 22 14" width="22" height="14" fill="none" aria-hidden="true"><path d="M7 1.5 1.5 7 7 12.5M1.5 7H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              <button type="button" onClick={() => move(1)} aria-label="Next use case"><svg viewBox="0 0 22 14" width="22" height="14" fill="none" aria-hidden="true"><path d="m15 1.5 5.5 5.5-5.5 5.5M20.5 7H1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .mss-section { padding: 106px 0 118px; background: transparent; font-family: var(--font-google-sans); }
        /* width: max-content, e não justify-content: center.

           As duas centralizam igual na tela, mas a caixa do grid é outra: com
           justify-content as colunas centralizam DENTRO de um grid de largura
           total, então a borda esquerda do elemento fica na margem da página e
           não no card. O ::before abaixo se posiciona contra essa caixa — era por
           isso que o círculo nascia deslocado para a esquerda. Encolhido até o
           conteúdo, a borda esquerda do layout é a borda esquerda do card. */
        .mss-layout { position: relative; display: grid; grid-template-columns: 77vh minmax(0, 340px); width: max-content; margin-inline: auto; align-items: center; gap: 62px; }

        /* The glow, centred on the bottom-left corner of the picture.

           On the layout rather than inside the card, because the card clips: it
           carries overflow: hidden for its own rounded corners, and a glow drawn
           inside it would lose the three quarters of itself that fall outside.

           The layout's bottom-left is the card's bottom-left — horizontally
           because the grid is now only as wide as its columns, vertically because
           the card is the taller of the two cells and the row takes its height.
           left: 0 / top: 100% is that corner, and the translate puts the circle's
           centre on it rather than its own corner.

           --lf-glow scales it the way it scales every wash on this page, and on
           the light ground it multiplies — orange as pigment warming the clay
           rather than as a lamp pushing it toward white. */
        .mss-layout::before {
          content: ""; position: absolute; left: 0; top: 100%; z-index: 0;
          /* Sized against the card beside it — the card is 70vh tall, so at
             170vh the circle reaches roughly two and a half cards in every
             direction from the corner it sits on. It is a diameter, and the
             centre is on that corner, so half of it is what falls into the
             section. */
          width: 170vh; height: 170vh; min-width: 1080px; min-height: 1080px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: radial-gradient(circle,
            rgba(var(--lf-accent-rgb), calc(.22 * var(--lf-glow))) 0%,
            rgba(var(--lf-accent-rgb), calc(.09 * var(--lf-glow))) 34%,
            rgba(var(--lf-accent-rgb), 0) 70%);
        }
        .lf[data-lf="light"] .mss-layout::before { mix-blend-mode: multiply; }

        /* Above the glow — without this the positioned pseudo-element paints over
           the two things it is supposed to sit behind. */
        .mss-art, .mss-copy { position: relative; z-index: 1; }

        /* The card is kept and the picture goes inside it.

           That would normally be a card inside a card — the file has its own
           rounded panel painted in — and it is not, because the two grounds are
           the same colour: the PNG's own ground samples #1a1b1b to #1c1d1d at
           every edge, against the card's #1a1b1c. The picture is portrait and the
           card is landscape, so what shows either side of it is card, and there is
           no seam to see between them.

           If the artwork is ever re-exported on a different ground, this is the
           number to match — or the frame comes off, which was the other way to
           solve it. */
        .mss-art {
          display: grid; place-items: center;
          width: 77vh; height: 70vh; overflow: hidden;
          border-radius: 21px; background: #1a1b1c;
          box-shadow: 0 22px 60px rgba(0,0,0,.22);
        }
        .mss-shot { display: block; width: auto; height: 100%; max-width: 100%; object-fit: contain; }
        .mss-copy { position: relative; min-height: 260px; }.mss-copy h2 { position: absolute; bottom: 52px; left: 0; margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 1.17; font-weight: 500; letter-spacing: -.02em; }.mss-arrows { position: absolute; bottom: 0; left: 0; display: flex; gap: 12px; }.mss-arrows button { display: grid; place-items: center; width: 24px; height: 20px; padding: 0; border: 0; background: none; color: var(--lf-accent); cursor: pointer; transition: opacity .18s ease, transform .18s ease; }.mss-arrows button:hover { opacity: .72; transform: translateX(1px); }.mss-arrows button:first-child:hover { transform: translateX(-1px); }.mss-arrows button:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; border-radius: 3px; }
        @media (max-width: 760px) { .mss-section { padding: 78px 0 88px; }.mss-layout { grid-template-columns: minmax(0, 1fr); gap: 36px; width: auto; max-width: 405px; margin: 0 auto; }.mss-art { width: 100%; height: 70vh; }.mss-copy { min-height: 210px; text-align: center; }.mss-copy h2 { right: 0; font-size: 30px; }.mss-arrows { right: 0; justify-content: center; } }
        @media (max-width: 440px) { .mss-art { height: 320px; } }
      `}</style>
    </section>
  );
}
