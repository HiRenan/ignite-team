import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';

const TEAM = [
  { name: 'Renan Mocelin', role: 'Co-founder', url: 'https://www.linkedin.com/in/renan-mocelin-br/' },
  { name: 'Eduardo Chiarani', role: 'Co-founder', url: 'https://www.linkedin.com/in/eduardo-chiarani-b56bb7125/' },
  { name: 'Pedro Vinicius Meerholz', role: 'Co-founder', url: 'https://www.linkedin.com/in/pmeerholz/' },
  { name: 'João Vitor Lehmen Sanmartin', role: 'Co-founder', url: 'https://www.linkedin.com/in/jo%C3%A3o-vitor-lehmen-sanmartin-2627aa229/' },
  { name: 'Lucas Porfirio Nunes', role: 'Co-founder', url: 'https://www.linkedin.com/in/lucasporfirionunes/' },
];

export function TeamSection({ t }) {
  const { event, stage, result } = t.team.credits;
  return (
    <section id="team" className="section">
      <div className="section-runner">
        <span>{t.team.kicker}</span>
        <span className="section-runner-r">PLATE 06 / 07</span>
      </div>

      <motion.div
        className="team-banner"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div className="team-banner-img" variants={sectionReveal}>
          <img
            src="/assets/team-banner.jpeg"
            alt="IGNITE team at the ACT IN SPACE 2026 World Finals stage in Bordeaux"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <motion.div className="team-banner-meta" variants={sectionContainer}>
          <motion.div className="team-banner-tag" variants={sectionReveal}>
            ACT IN SPACE 2026 · BORDEAUX
          </motion.div>
          <motion.blockquote className="team-quote" variants={sectionReveal}>
            {t.team.quote}
          </motion.blockquote>
          <motion.div className="team-credits" variants={sectionReveal}>
            <div className="team-credit">{event}<b>ACT IN SPACE 2026</b></div>
            <div className="team-credit">{stage}<b>WORLD FINALS</b></div>
            <div className="team-credit">{result}<b>AIRBUS PARTNER AWARD</b></div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.h2
          className="section-title"
          variants={sectionReveal}
          style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
        >
          {t.team.title}
        </motion.h2>
        <motion.p className="section-body" variants={sectionReveal} style={{ marginTop: 0, marginBottom: 48 }}>
          {t.team.body}
        </motion.p>

        <motion.div className="team-roster" variants={sectionContainer}>
          {TEAM.map((m, i) => (
            <motion.a
              key={m.name}
              className="team-row"
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              variants={sectionReveal}
            >
              <span className="team-row-idx">{`0${i + 1} →`}</span>
              <span className="team-row-name">{m.name}</span>
              <span className="team-row-role">{m.role}</span>
              <span className="team-row-link">
                LinkedIn <span aria-hidden="true">↗</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
