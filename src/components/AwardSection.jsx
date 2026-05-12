import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

export function AwardSection({ t }) {
  const last = t.award.badges.length - 1;
  return (
    <section id="award" className="section">
      <div className="section-runner">
        <span>{t.award.kicker}</span>
        <span className="section-runner-r">PLATE 05 / 07</span>
      </div>

      <motion.div
        className="award-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div className="award-photo" variants={sectionReveal}>
          <img
            src="/assets/team-award.jpeg"
            alt="Team IGNITE receiving the Airbus Partner Award at the ACT IN SPACE 2026 World Finals in Bordeaux"
            loading="lazy"
            decoding="async"
          />
          <div className="award-photo-meta" aria-hidden="true">
            <span>BORDEAUX · 04.2026</span>
            <span>REC · LIVE</span>
          </div>
        </motion.div>

        <motion.div className="award-r" variants={sectionContainer}>
          <motion.h2 className="award-h" variants={sectionReveal}>
            {t.award.title}
          </motion.h2>
          <motion.p className="section-body" variants={sectionReveal} style={{ marginTop: 0 }}>
            {t.award.body}
          </motion.p>
          <motion.div className="award-badges" variants={sectionContainer}>
            {t.award.badges.map((b, i) => (
              <motion.span
                key={i}
                className={`badge${i === last ? ' hot' : ''}`}
                variants={sectionReveal}
              >
                {b}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
