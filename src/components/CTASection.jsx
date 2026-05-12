import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

// Splits the title on newline; for the first line we wrap the *last word*
// in <em> so the CSS adds the ember underline accent ("build", "construir").
function renderTitle(title) {
  const [first = '', second = ''] = title.split('\n');
  const firstWords = first.trim().split(' ');
  const last = firstWords.pop() || '';
  const lead = firstWords.join(' ');
  return (
    <>
      <span style={{ display: 'block' }}>
        {lead ? `${lead} ` : ''}<em>{last}</em>
      </span>
      <span style={{ display: 'block' }}>{second}</span>
    </>
  );
}

export function CTASection({ t }) {
  return (
    <section id="contact" className="cta-section">
      <motion.div
        className="cta-inner"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div className="section-runner cta-plate" variants={sectionReveal} style={{ marginBottom: 0, width: '100%', maxWidth: 720 }}>
          <span>{t.cta.kicker}</span>
          <span className="section-runner-r">PLATE 07 / 07</span>
        </motion.div>

        <motion.h2 className="cta-title" variants={sectionReveal}>
          {renderTitle(t.cta.title)}
        </motion.h2>

        <motion.p className="cta-body" variants={sectionReveal}>
          {t.cta.body}
        </motion.p>

        <motion.div className="cta-actions" variants={sectionReveal}>
          <a className="cta-link" href="mailto:ignite@actinspace.org">
            <span aria-hidden="true">→</span> ignite@actinspace.org
          </a>
          <a
            className="cta-link secondary"
            href="https://www.linkedin.com/in/renan-mocelin-br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.secondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
