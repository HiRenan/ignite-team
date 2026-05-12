import { motion } from 'motion/react';
import { HowViz } from './atoms/HowViz.jsx';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

const KINDS = ['observe', 'interpret', 'act'];

export function HowSection({ t }) {
  return (
    <section id="how" className="section">
      <div className="section-runner">
        <span>{t.how.kicker}</span>
        <span className="section-runner-r">PLATE 03 / 07</span>
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
          style={{ marginBottom: 'clamp(48px, 7vw, 88px)' }}
        >
          {t.how.title}
        </motion.h2>

        <motion.div className="how-flow" variants={sectionContainer}>
          {t.how.steps.map((s, i) => (
            <motion.div key={i} className="how-step" variants={sectionReveal}>
              <span className="how-num">{`STEP / ${s.n}`}</span>
              <h3 className="how-title">
                {s.t}
                <span className="end">.</span>
              </h3>
              <p className="how-desc">{s.d}</p>
              <div className="how-viz">
                <HowViz kind={KINDS[i]} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
