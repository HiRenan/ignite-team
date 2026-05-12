import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, statRise, viewportOnce } from '../lib/motion.js';

export function MissionSection({ t }) {
  return (
    <section id="mission" className="section">
      <div className="section-runner">
        <span>{t.mission.kicker}</span>
        <span className="section-runner-r">PLATE 01 / 07</span>
      </div>

      <motion.div
        className="mission-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div variants={sectionReveal}>
          <span className="plate-num" aria-hidden="true">01</span>
        </motion.div>

        <motion.div variants={sectionReveal}>
          <h2 className="section-title">{t.mission.title}</h2>
          <p className="section-body">{t.mission.body}</p>
        </motion.div>

        <motion.div className="mission-stats" variants={sectionContainer}>
          {t.mission.stats.map((s, i) => (
            <motion.div
              key={i}
              className="mission-stat-row"
              variants={statRise}
            >
              <span className="mission-stat-num">{s.n}</span>
              <div className="mission-stat-meta">
                <span className="mission-stat-viz" style={{ '--w': `${[70, 58, 92][i] || 60}%` }} aria-hidden="true" />
                <span className="label">{s.l}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
