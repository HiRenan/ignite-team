import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

// A Detecção (CO3D) — reuses the SAME two pixel-aligned hero images as a labeled
// before/after specimen, then spells out the pipeline. Deliberately static +
// accessible (real <figure>/<figcaption>) — no JS slider — so it works without
// JS, prints/screenshots cleanly, and doesn't duplicate the hero's interaction.
//
// ▸ TO SWAP THESE IMAGES: replace sem-risco.png / com-risco.png in the repo ROOT
//   and run `npm run images` (same assets the hero uses).
export function DetectionSection({ t }) {
  return (
    <section id="detection" className="section">
      <div className="section-runner">
        <span>{t.detection.kicker}</span>
        <span className="section-runner-r">PLATE 05 / 09</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.h2 className="section-title" variants={sectionReveal}>
          {t.detection.title}
        </motion.h2>
        <motion.p className="section-body" variants={sectionReveal}>
          {t.detection.body}
        </motion.p>

        <motion.div className="detect-compare" variants={sectionContainer}>
          {/* BEFORE — raw orbital capture */}
          <motion.figure className="detect-frame" variants={sectionReveal}>
            <picture>
              <source
                type="image/avif"
                srcSet="/assets/sem-risco-960.avif 960w, /assets/sem-risco-1672.avif 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <source
                type="image/webp"
                srcSet="/assets/sem-risco-960.webp 960w, /assets/sem-risco-1672.webp 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <img
                src="/assets/sem-risco-1672.png"
                srcSet="/assets/sem-risco-960.png 960w, /assets/sem-risco-1672.png 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                alt={t.detection.altBefore}
              />
            </picture>
            <figcaption className="detect-cap">
              <span className="detect-cap-k">{t.detection.labelBefore}</span>
            </figcaption>
          </motion.figure>

          {/* AFTER — the model's reading, risk vegetation lit in orange */}
          <motion.figure className="detect-frame detect-frame--after" variants={sectionReveal}>
            <picture>
              <source
                type="image/avif"
                srcSet="/assets/com-risco-960.avif 960w, /assets/com-risco-1672.avif 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <source
                type="image/webp"
                srcSet="/assets/com-risco-960.webp 960w, /assets/com-risco-1672.webp 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <img
                src="/assets/com-risco-1672.png"
                srcSet="/assets/com-risco-960.png 960w, /assets/com-risco-1672.png 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                alt={t.detection.altAfter}
              />
            </picture>
            <figcaption className="detect-cap">
              <span className="detect-cap-k detect-cap-k--hot">{t.detection.labelAfter}</span>
            </figcaption>
          </motion.figure>
        </motion.div>

        {/* Pipeline — satellite captures → AI detects risk → preventive decision. */}
        <motion.ol className="detect-pipeline" variants={sectionContainer}>
          {t.detection.steps.map((s, i) => (
            <motion.li key={i} className="detect-step" variants={sectionReveal}>
              <span className="detect-step-n">{`0${i + 1}`}</span>
              <h3 className="detect-step-t">{s.t}</h3>
              <p className="detect-step-d">{s.d}</p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
