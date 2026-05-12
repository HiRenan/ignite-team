import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Globe from './Globe.jsx';
import { heroContainer, heroLineRise, heroFade } from '../lib/motion.js';

function formatUtcMinute(d) {
  // YYYY-MM-DD HH:MM UTC — updates once a minute, not every second.
  const iso = d.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export function Hero({ t }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Tick once per minute, aligned to the wall-clock minute boundary.
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let interval;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-runner" aria-hidden="true">
        <span className="hero-runner-l">{t.hero.runner}</span>
        <span className="hero-runner-r">47.16°N · 0.65°W</span>
      </div>

      <motion.div
        className="hero-grid"
        initial="hidden"
        animate="visible"
        variants={heroContainer}
      >
        <div className="hero-l">
          <motion.div className="hero-plate" variants={heroFade}>
            <span className="hero-plate-dot" aria-hidden="true" />
            <span className="hero-plate-label">{t.hero.kicker}</span>
            <span className="hero-plate-rule" aria-hidden="true" />
          </motion.div>

          <h1 className="hero-title">
            {t.hero.lines.map((line, i) => (
              <span className="hero-title-line" key={i}>
                <motion.span variants={heroLineRise}>
                  {i === t.hero.lines.length - 1 ? (
                    <span className="hero-title-em">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" variants={heroFade}>
            {t.hero.sub}
          </motion.p>

          <motion.div variants={heroFade}>
            <a className="hero-cta" href="#mission">
              <span className="arrow" aria-hidden="true">→</span>
              <span>{t.hero.cta}</span>
            </a>
          </motion.div>
        </div>

        <motion.div className="hero-r" variants={heroFade}>
          <div className="globe-frame">
            <span className="corner-bl" aria-hidden="true" />
            <span className="corner-br" aria-hidden="true" />
            <Globe />
          </div>
          <div className="hero-coords" aria-label="Orbital coordinates">
            <div>
              <span>LAT</span>
              <b>{t.hero.coordsLat}</b>
            </div>
            <div>
              <span>LON</span>
              <b>{t.hero.coordsLon}</b>
            </div>
            <div>
              <span>ALT</span>
              <b>{t.hero.coordsAlt}</b>
            </div>
            <div className="hero-coords-live">
              <span className="live">{t.hero.live}</span>
              <span>{formatUtcMinute(now)}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
