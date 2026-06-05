import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Globe from './Globe/index.jsx';
import { heroContainer, heroLineRise, heroFade } from '../lib/motion.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

function formatUtcMinute(d) {
  // YYYY-MM-DD HH:MM UTC — updates once a minute, not every second.
  const iso = d.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export function Hero({ t }) {
  const [now, setNow] = useState(() => new Date());
  const globeFrameRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

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

  // When the Mission section enters the viewport, briefly pulse the orbital
  // ring frame around the globe — the satellite "locks on" to Earth's problem.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const mission = document.getElementById('mission');
    const frame = globeFrameRef.current;
    if (!mission || !frame) return undefined;
    let timeout;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            frame.classList.add('spotlight');
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              frame.classList.remove('spotlight');
            }, 1500);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(mission);
    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, [reducedMotion]);

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
          <div className="globe-frame" ref={globeFrameRef}>
            <svg
              className="globe-rings"
              viewBox="0 0 100 100"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle className="ring-a" cx="50" cy="50" r="49" />
              <ellipse
                className="ring-b"
                cx="50"
                cy="50"
                rx="46"
                ry="30"
                transform="rotate(-22 50 50)"
              />
              <ellipse
                className="ring-c"
                cx="50"
                cy="50"
                rx="40"
                ry="20"
                transform="rotate(18 50 50)"
              />
            </svg>
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
            <div>
              <span>{t.hero.coordsNextPass}</span>
              <b>{t.hero.nextPass}</b>
            </div>
            <div>
              <span>{t.hero.coordsHeading}</span>
              <b>{t.hero.heading}</b>
            </div>
            <div>
              <span>{t.hero.coordsOrbits}</span>
              <b>{t.hero.orbits}</b>
            </div>
            <div className="hero-coords-live">
              <span className="live">
                {t.hero.live}
                <span className="signal-bars" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </span>
              <span>{formatUtcMinute(now)}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
