import { lazy, Suspense, useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useMotionTemplate } from 'motion/react';
import PlateNumber from './atoms/PlateNumber.jsx';
import { useInViewportOnce } from '../hooks/useInViewportOnce.js';

// The cobe globe is heavy, so it stays in its own lazy chunk and only mounts
// when this section is about to enter the viewport — keeping it off the initial
// load and out of the hero's LCP path.
const OrbitalGlobe = lazy(() => import('./Globe/OrbitalGlobe.jsx'));

// ───────────────────────────────────────────────────────────────────────────
//  EDIT ME — the rhythm of the "orbital descent". Everything is driven by the
//  scroll progress p (0 = top of the pinned section, 1 = bottom), NOT by time.
// ───────────────────────────────────────────────────────────────────────────
const TRACK_VH         = 230;  // height of the scroll track → how much scrolling drives the descent
const ZOOM_START       = 0.15; // progress at which the globe starts zooming in
const ZOOM_MAX         = 1.2;  // cobe surface magnify — KEEP ≤1.25 so the sphere never crops inside its square canvas
const COPY_FADE_END    = 0.30; // the headline/copy has fully faded out by this progress
const GLOBE_REST_SHIFT = 21;   // vw — globe rests this far RIGHT of centre (clears the title)
const GLOBE_CENTER_BY  = 0.48; // progress by which the globe has eased back to centre for the dive
const GLOBE_GROW_MAX   = 1.35; // whole-globe grow — sized with the canvas (min(58vw,74svh)) so it fits the viewport: NO side clipping
const GLOBE_FADE_START = 0.72; // progress where the globe starts dissolving into the next module
// ───────────────────────────────────────────────────────────────────────────

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

// Cinematic "descida orbital": the globe rests on the right beside the headline;
// as you scroll through this pinned section the copy clears, the globe eases to
// centre, zooms in (cobe `scale` + a layer grow) and dissolves straight into the
// next module — a continuous push *through* the planet, no satellite image.
// Rendered only on capable desktops; OrbitalMissionSection routes reduced-motion
// / mobile / no-WebGL users to the simple static fallback instead.
export function OrbitalDescent({ t }) {
  const trackRef = useRef(null);
  const progressRef = useRef(0);      // bridges progress → cobe zoom (read in its rAF loop)
  const progress = useMotionValue(0); // drives the layer transforms below
  const [stageRef, entered] = useInViewportOnce({ rootMargin: '300px' });

  // Whole-page scroll (reliable across browsers). We compute THIS section's
  // 0→1 progress LIVE from its position each frame — when the pin is engaged,
  // `-rect.top` is exactly how far we've scrolled through the track. Measuring
  // live (instead of caching a mount-time top) keeps the descent in sync even if
  // the layout above settles after mount, which previously made it start late.
  const { scrollY } = useScroll();

  const syncProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const span = Math.max(el.offsetHeight - window.innerHeight, 1);
    const p = clamp01(-el.getBoundingClientRect().top / span);
    progress.set(p);
    progressRef.current = p;
  }, [progress]);

  useEffect(() => {
    syncProgress(); // correct initial frame
    window.addEventListener('resize', syncProgress);
    return () => window.removeEventListener('resize', syncProgress);
  }, [syncProgress]);

  useMotionValueEvent(scrollY, 'change', syncProgress);

  // The copy clears first; the globe then eases from its right-hand rest spot back
  // to centre, grows, and finally dissolves so the NEXT module takes over — no
  // satellite image, just the globe zooming through into what comes next.
  const copyOpacity = useTransform(progress, [0, COPY_FADE_END], [1, 0]);
  const copyY = useTransform(progress, [0, COPY_FADE_END], [0, -24]);
  const globeShift = useTransform(progress, [0, GLOBE_CENTER_BY], [GLOBE_REST_SHIFT, 0]);
  const globeX = useMotionTemplate`${globeShift}vw`;
  const globeScale = useTransform(progress, [ZOOM_START, 1], [1, GLOBE_GROW_MAX]);
  const globeOpacity = useTransform(progress, [GLOBE_FADE_START, 1], [1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  return (
    <section
      id="orbital"
      className="orbital-descent"
      ref={trackRef}
      style={{ '--track-vh': TRACK_VH }}
    >
      <div className="orbital-pin">
        <div className="orbital-descent-stage" ref={stageRef}>
          {/* ── Globe layer — rests on the RIGHT (clear of the title), then eases
              to centre, zooms in via cobe `scale` + a layer grow, and dissolves
              into the next module. No satellite image. ── */}
          <div className="orbital-descent-globe">
            <motion.div
              className="orbital-descent-globe-inner"
              style={{ x: globeX, scale: globeScale, opacity: globeOpacity }}
              aria-hidden="true"
            >
              {entered ? (
                <Suspense fallback={<div className="orbital-fallback" />}>
                  <OrbitalGlobe
                    className="orbital-globe-canvas orbital-descent-globe-canvas"
                    progressRef={progressRef}
                    zoomMax={ZOOM_MAX}
                    zoomStart={ZOOM_START}
                  />
                </Suspense>
              ) : null}
            </motion.div>
          </div>

          {/* ── Chrome — real, accessible copy. Fades out as the descent begins. ── */}
          <motion.div
            className="orbital-descent-chrome"
            style={{ opacity: copyOpacity, y: copyY }}
          >
            <div className="orbital-descent-chrome-inner">
              <div className="section-runner">
                <span>{t.orbital.kicker}</span>
                <span className="section-runner-r">PLATE 02 / 09</span>
              </div>
              <div className="orbital-descent-copy">
                <PlateNumber value="02" />
                <span className="orbital-route-label">{t.orbital.routeLabel}</span>
                <h2 className="section-title">{t.orbital.title}</h2>
                <p className="section-body">{t.orbital.body}</p>
              </div>
            </div>
          </motion.div>

          {/* ── Scroll hint — invites the descent, then gets out of the way ── */}
          <motion.div
            className="orbital-descent-hint"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            <span>{t.orbital.descentHint}</span>
            <span className="orbital-descent-hint-arrow">↓</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
