import { useState } from 'react';
import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';
import PlateNumber from './atoms/PlateNumber.jsx';
import GlobeSVG from './Globe/Globe.jsx';
import { useInViewportOnce } from '../hooks/useInViewportOnce.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import { hasWebGL } from '../lib/webgl.js';
import { OrbitalDescent } from './OrbitalDescent.jsx';

// Missão Orbital — picks ONE of two experiences at mount:
//
//  • Cinematic (capable desktop): the pinned "orbital descent" — the cobe globe
//    zooms toward Earth and crossfades into the satellite view. See
//    OrbitalDescent.jsx. (cobe is lazy-loaded inside it, so it never touches the
//    initial bundle / hero LCP.)
//  • Fallback (reduced-motion · touch/mobile · no WebGL): the calm editorial
//    layout with a lightweight static globe and a SIMPLE one-shot crossfade to
//    the satellite — no scroll-jacking, no WebGL, nothing heavy.
//
// Either way the real copy (title/body) is always in the DOM and the section id
// stays `#orbital`, so nothing from Phase 1 regresses.
export function OrbitalMissionSection({ t }) {
  const reduced = usePrefersReducedMotion();
  const [capable] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Desktop width + WebGL → cinematic descent. Narrow screens (phones / small
    // tablets) get the static fallback instead — no scroll-jacking. We gate on
    // WIDTH (not `pointer: fine`) so EVERY desktop gets the globe, including
    // touch-capable laptops/monitors that report a coarse primary pointer.
    const wideEnough = window.innerWidth >= 1024;
    return hasWebGL() && wideEnough;
  });

  if (capable && !reduced) {
    return <OrbitalDescent t={t} />;
  }
  return <OrbitalStatic t={t} />;
}

// Static, dependency-free fallback. Static SVG globe → gentle crossfade to the
// satellite once the stage scrolls into view (CSS transition, not scroll-linked).
function OrbitalStatic({ t }) {
  // Fire the crossfade once the stage is ~a third visible.
  const [stageRef, grounded] = useInViewportOnce({ rootMargin: '0px', threshold: 0.3 });

  return (
    <section id="orbital" className="section">
      <div className="section-runner">
        <span>{t.orbital.kicker}</span>
        <span className="section-runner-r">PLATE 02 / 09</span>
      </div>

      <motion.div
        className="orbital-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionContainer}
      >
        <motion.div className="orbital-copy" variants={sectionContainer}>
          <motion.div variants={sectionReveal}>
            <PlateNumber value="02" />
          </motion.div>
          <motion.div variants={sectionReveal}>
            <span className="orbital-route-label">{t.orbital.routeLabel}</span>
            <h2 className="section-title">{t.orbital.title}</h2>
            <p className="section-body">{t.orbital.body}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className={`orbital-stage orbital-stage--swap${grounded ? ' is-grounded' : ''}`}
          ref={stageRef}
          variants={sectionReveal}
        >
          {/* Decorative orbital rings (styled in globals.css; hidden ≤780px). */}
          <svg
            className="globe-rings"
            viewBox="0 0 100 100"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle className="ring-a" cx="50" cy="50" r="49" />
            <ellipse className="ring-b" cx="50" cy="50" rx="46" ry="30" transform="rotate(-22 50 50)" />
            <ellipse className="ring-c" cx="50" cy="50" rx="40" ry="20" transform="rotate(18 50 50)" />
          </svg>

          {/* Static globe — no WebGL, no cobe. The line-art SVG is on-brand and
              weightless. ▸ TO USE A PHOTO INSTEAD: drop public/assets/globo-estatico.png
              and replace <GlobeSVG/> below with an <img src="/assets/globo-estatico.png" …/>. */}
          <div className="orbital-swap-globe">
            <GlobeSVG />
          </div>

          {/* The satellite "ground" that fades in (reuses sem-risco). */}
          <div className="orbital-swap-sat" aria-hidden="true">
            <picture>
              <source
                type="image/avif"
                srcSet="/assets/sem-risco-960.avif 960w, /assets/sem-risco-1672.avif 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <source
                type="image/webp"
                srcSet="/assets/sem-risco-960.webp 960w, /assets/sem-risco-1672.webp 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <img
                src="/assets/sem-risco-1672.png"
                srcSet="/assets/sem-risco-960.png 960w, /assets/sem-risco-1672.png 1672w"
                sizes="(max-width: 980px) 100vw, 50vw"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                alt=""
              />
            </picture>
          </div>

          <p className="sr-only">{t.orbital.satAlt}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
