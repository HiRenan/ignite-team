import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { sectionReveal, sectionContainer, viewportOnce } from '../lib/motion.js';
import PlateNumber from './atoms/PlateNumber.jsx';
import { useInViewportOnce } from '../hooks/useInViewportOnce.js';

// The cobe WebGL globe is heavy, so it gets its own chunk (via React.lazy) and
// only loads when this section is about to enter the viewport — keeping it off
// the initial load and out of the LCP path.
const Globe = lazy(() => import('./Globe/index.jsx'));

export function OrbitalMissionSection({ t }) {
  const [stageRef, entered] = useInViewportOnce({ rootMargin: '200px' });

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
            <h2 className="section-title">{t.orbital.title}</h2>
            <p className="section-body">{t.orbital.body}</p>
          </motion.div>
        </motion.div>

        <motion.div className="orbital-stage" ref={stageRef} variants={sectionReveal}>
          {/* Decorative orbital rings — always visible, and the placeholder shown
              before the globe mounts. (Styled in globals.css; hidden ≤780px.) */}
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

          {entered ? (
            <Suspense fallback={<div className="orbital-fallback" aria-hidden="true" />}>
              {/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                  PHASE 2 — SPLINE GLOBE PLUGS IN HERE.
                  Replace the interim cobe <Globe/> below with the Spline scene,
                  keeping this SAME lazy + viewport gate so the heavy runtime stays
                  off the initial load / LCP. For example:

                    const SplineGlobe = lazy(() => import('./Globe/SplineGlobe.jsx'));
                    <SplineGlobe scene="/assets/ignite-globe.splinecode" />

                  Until then, the existing cobe globe is the interim visual.
                  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */}
              <Globe />
            </Suspense>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
