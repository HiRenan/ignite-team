import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, statRise, viewportOnce } from '../lib/motion.js';

// Per-row alignment: large left, ember-emphasised centre, big right.
const ROW_VARIANTS = ['', 'center', 'align-r'];

export function ImpactSection({ t }) {
  return (
    <section id="impact" className="section">
      <div className="section-runner">
        <span>{t.impact.kicker}</span>
        <span className="section-runner-r">PLATE 04 / 07</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.h2
          className="section-title"
          variants={sectionReveal}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          {t.impact.title}
        </motion.h2>

        <motion.div className="impact-rows" variants={sectionContainer}>
          {t.impact.nums.map((n, i) => (
            <motion.div
              key={i}
              className={`impact-row ${ROW_VARIANTS[i] || ''}`.trim()}
              variants={statRise}
            >
              <span className="impact-num">{n.n}</span>
              <span className="impact-label">{n.l}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
