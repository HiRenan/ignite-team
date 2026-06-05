import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { heroContainer, heroLineRise, heroFade } from '../lib/motion.js';
import { useSpotlightReveal } from '../hooks/useSpotlightReveal.js';

function formatUtcMinute(d) {
  // YYYY-MM-DD HH:MM UTC — updates once a minute, not every second.
  const iso = d.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export function Hero({ t }) {
  const [now, setNow] = useState(() => new Date());
  const heroRef = useRef(null);

  // Spotlight reveal: follows the cursor (mouse / pen / touch-drag) and writes
  // --mx/--my so the CSS radial mask uncovers the detection layer. Degrades to
  // a static spotlight if reduced-motion / before first interaction.
  useSpotlightReveal(heroRef);

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
    <section className="hero" id="top" ref={heroRef}>
      {/* ── Spotlight reveal media ──────────────────────────────────────────────
          Two pixel-aligned 16:9 layers fill the hero. The BASE (sem-risco, the
          normal satellite view) is the LCP image and is always visible. The
          REVEAL (com-risco, the AI detection) sits on top, masked to a soft
          circle that follows the cursor — see .hero-media-reveal in globals.css.

          ▸ TO SWAP THESE IMAGES: replace sem-risco.png / com-risco.png in the
            repo ROOT (keep names + 16:9 framing) and run `npm run images`.
          The layers are aria-hidden; the real alt text lives in .sr-only below. */}
      <picture className="hero-media hero-media-base" aria-hidden="true">
        <source
          type="image/avif"
          srcSet="/assets/sem-risco-960.avif 960w, /assets/sem-risco-1672.avif 1672w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/assets/sem-risco-960.webp 960w, /assets/sem-risco-1672.webp 1672w"
          sizes="100vw"
        />
        <img
          src="/assets/sem-risco-1672.png"
          srcSet="/assets/sem-risco-960.png 960w, /assets/sem-risco-1672.png 1672w"
          sizes="100vw"
          width="1672"
          height="941"
          alt=""
          fetchpriority="high"
          decoding="async"
        />
      </picture>

      <picture className="hero-media hero-media-reveal" aria-hidden="true">
        <source
          type="image/avif"
          srcSet="/assets/com-risco-960.avif 960w, /assets/com-risco-1672.avif 1672w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/assets/com-risco-960.webp 960w, /assets/com-risco-1672.webp 1672w"
          sizes="100vw"
        />
        <img
          src="/assets/com-risco-1672.png"
          srcSet="/assets/com-risco-960.png 960w, /assets/com-risco-1672.png 1672w"
          sizes="100vw"
          width="1672"
          height="941"
          alt=""
          fetchpriority="low"
          decoding="async"
        />
      </picture>

      {/* Readability scrim — keeps the editorial copy legible over the imagery. */}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-overlay">
        <div className="hero-runner" aria-hidden="true">
          <span className="hero-runner-l">{t.hero.runner}</span>
          <span className="hero-runner-r">47.16°N · 0.65°W</span>
        </div>

        {/* ── Editorial copy — fully independent of the reveal effect ────────── */}
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
        </motion.div>

        {/* ── Foot: interaction hint + compact orbital HUD over the imagery ──── */}
        <motion.div
          className="hero-foot"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.p className="hero-hint" variants={heroFade} aria-hidden="true">
            {t.hero.hint}
          </motion.p>

          <motion.div className="hero-coords" variants={heroFade} aria-label="Orbital coordinates">
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
              <span className="live">
                {t.hero.live}
                <span className="signal-bars" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </span>
              <span>{formatUtcMinute(now)}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Single, real description of the hero imagery for assistive tech + SEO. */}
      <p className="sr-only">{t.hero.imageAlt}</p>
    </section>
  );
}
