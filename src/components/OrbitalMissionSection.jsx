import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';
import PlateNumber from './atoms/PlateNumber.jsx';
import GlobeSVG from './Globe/Globe.jsx';
import { useInViewportOnce } from '../hooks/useInViewportOnce.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import { hasWebGL } from '../lib/webgl.js';
import { OrbitalDescent } from './OrbitalDescent.jsx';

// Same lazy cobe chunk the descent uses — so mobile / reduced-motion show the
// SAME globe as desktop (just idle, no pinned scroll-descent). Stays out of the
// initial bundle and only mounts when the section nears the viewport.
const OrbitalGlobe = lazy(() => import('./Globe/OrbitalGlobe.jsx'));

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
// Cinematic descent is desktop-only; EVERY narrower screen gets the static
// fallback. We gate on WIDTH (not `pointer: fine`) so touch-capable laptops still
// get the globe, and re-evaluate on resize so the choice is never stuck — loading
// wide then narrowing (or a phone) must land on the static layout, never the
// pinned/absolute descent (which collapses and overlaps the next section when
// narrow). 1024px desktop breakpoint.
const DESKTOP_MIN = 1024;
const isWide = () => typeof window !== 'undefined' && window.innerWidth >= DESKTOP_MIN;

export function OrbitalMissionSection({ t }) {
  const reduced = usePrefersReducedMotion();
  const [hasGL] = useState(() => typeof window !== 'undefined' && hasWebGL());
  const [wideEnough, setWideEnough] = useState(isWide);

  useEffect(() => {
    const onResize = () => setWideEnough(isWide());
    onResize(); // sync in case width changed between mount and effect
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (hasGL && wideEnough && !reduced) {
    return <OrbitalDescent t={t} />;
  }
  return <OrbitalStatic t={t} hasGL={hasGL} />;
}

// Static layout (reduced-motion · mobile · no-WebGL): the calm 2-column editorial
// version — copy left, globe right. It shows the SAME cobe globe as the desktop
// descent, just IDLE (auto-rotates, no pinned scroll-jacking); reduced-motion
// keeps it still. Only no-WebGL devices fall back to the line-art SVG.
function OrbitalStatic({ t, hasGL }) {
  // Mount the (lazy) globe only as the section nears the viewport — same as the
  // descent, so the cobe chunk never touches the initial load / hero LCP.
  const [stageRef, entered] = useInViewportOnce({ rootMargin: '300px' });

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

        <motion.div className="orbital-stage" ref={stageRef} variants={sectionReveal}>
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

          {/* The SAME cobe globe as desktop, idle — so it looks identical on mobile.
              No-WebGL devices get the weightless line-art SVG instead. ▸ The globe's
              look / markers / route all live in Globe/OrbitalGlobe.jsx. */}
          <div className="orbital-stage-globe">
            {hasGL ? (
              entered ? (
                <Suspense fallback={<div className="orbital-fallback" />}>
                  <OrbitalGlobe className="orbital-globe-canvas" />
                </Suspense>
              ) : (
                <div className="orbital-fallback" />
              )
            ) : (
              <GlobeSVG />
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
