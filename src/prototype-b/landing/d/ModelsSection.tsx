import { motion } from "motion/react";
import { Container } from "../../Container";
import { OrbitalSystem } from "../c/OrbitalSystem";

// C's hero, demoted to a section.
//
// In C this is the opening argument: a headline about the models and, beside it,
// the orbital system making the same claim in pictures. D opens on the product's
// own empty screen instead, so the argument has to go somewhere — and directly
// under the fold is where it belongs, as the answer to the question the hero
// leaves hanging. "One AI for everything" invites "which one?", and this is it.
//
// What does not come across from C: the composer and the chips, which are already
// in D's hero, and the pixel mesh, which was the hero's background and would read
// as decoration in the middle of a page.
export function ModelsSection() {
  return (
    <section className="md-section bg-[#07090a] py-[var(--section-pad)]">
      <Container>
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[560px] text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              The world’s leading AI models, working as one for you.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-[520px] text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]"
              style={{ fontFamily: "var(--font-google-sans)" }}
            >
              Conductor Mode chooses the model that fits each task best.
            </motion.p>
          </div>

          {/* Hidden below lg, same as in C: under the copy rather than beside it,
              the orbit loses the one thing it is for — being read as the picture
              of what the sentence next to it says. */}
          <div className="hidden lg:col-span-5 lg:block">
            <OrbitalSystem />
          </div>
        </div>
      </Container>
    </section>
  );
}
