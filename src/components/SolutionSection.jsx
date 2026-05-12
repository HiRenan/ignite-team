import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

const ICONS = {
  orbital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="22" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  selective: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="1" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="1" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="23" y2="12" />
    </svg>
  ),
  efficient: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
};

const ICON_KEYS = ['orbital', 'selective', 'efficient'];

export function SolutionSection({ t }) {
  return (
    <section id="solution" className="section">
      <div className="section-runner">
        <span>{t.solution.kicker}</span>
        <span className="section-runner-r">PLATE 02 / 07</span>
      </div>

      <motion.div
        className="solution-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div variants={sectionReveal}>
          <span className="plate-num" aria-hidden="true">02</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            {t.solution.title}
          </h2>
          <p className="section-body">{t.solution.body}</p>
        </motion.div>

        <motion.div variants={sectionContainer}>
          {t.solution.pillars.map((p, i) => (
            <motion.div key={i} className="pillar-row" variants={sectionReveal}>
              <span className="pillar-icon">{ICONS[ICON_KEYS[i]]}</span>
              <div className="pillar-body">
                <span className="pillar-title">{p.t}</span>
                <span className="pillar-desc">{p.d}</span>
              </div>
              <span className="pillar-num">{`0${i + 1}`}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
