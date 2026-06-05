import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'motion/react';
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
const TRACK_VH       = 260;  // height of the scroll track → how much scrolling drives the descent
const ZOOM_START     = 0.15; // progress at which the globe starts zooming in
const ZOOM_MAX       = 2.6;  // cobe `scale` at the bottom (the zoom-into-Earth)
const CROSSFADE      = 0.55; // progress where the globe HANDS OFF to the satellite image
const CROSSFADE_BAND = 0.18; // half-width of the crossfade (smaller = snappier swap)
const SAT_SCALE_FROM = 1.18; // satellite grows from this scale → 1.0 (lands settling)
const COPY_FADE_END  = 0.30; // the headline/copy has fully faded out by this progress
// ───────────────────────────────────────────────────────────────────────────

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

// Cinematic "descida orbital": as you scroll through this pinned section the
// globe zooms toward Earth and crossfades into the satellite ground view —
// reading as one continuous descent from orbit to the surface. Rendered only on
// capable desktops; OrbitalMissionSection routes reduced-motion / mobile / no-
// WebGL users to the simple static fallback instead.
export function OrbitalDescent({ t }) {
  const trackRef = useRef(null);
  const metrics = useRef({ top: 0, span: 1 }); // section's document top + scrollable span
  const progressRef = useRef(0);               // bridges progress → cobe onRender (zoom)
  const progress = useMotionValue(0);          // drives the layer transforms below
  const [stageRef, entered] = useInViewportOnce({ rootMargin: '300px' });

  // Whole-page scroll (reliable across browsers); we derive THIS section's
  // 0→1 progress from its measured geometry — robust against the useScroll
  // `target` measurement quirks under React StrictMode.
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      metrics.current = {
        top: el.getBoundingClientRect().top + window.scrollY,
        span: Math.max(el.offsetHeight - window.innerHeight, 1),
      };
      const p = clamp01((window.scrollY - metrics.current.top) / metrics.current.span);
      progress.set(p);
      progressRef.current = p;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [progress]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const { top, span } = metrics.current;
    const p = clamp01((y - top) / span);
    progress.set(p);
    progressRef.current = p;
  });

  // Crossfade the globe out and the satellite in, around CROSSFADE.
  const globeOpacity = useTransform(progress, [CROSSFADE - CROSSFADE_BAND, CROSSFADE + CROSSFADE_BAND], [1, 0]);
  const satOpacity = useTransform(progress, [CROSSFADE - CROSSFADE_BAND, CROSSFADE + CROSSFADE_BAND], [0, 1]);
  const satScale = useTransform(progress, [0, 1], [SAT_SCALE_FROM, 1]);
  const copyOpacity = useTransform(progress, [0, COPY_FADE_END], [1, 0]);
  const copyY = useTransform(progress, [0, COPY_FADE_END], [0, -24]);
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
          {/* ── Globe layer (zooms via cobe `scale`, then fades out) ── */}
          <motion.div
            className="orbital-descent-globe"
            style={{ opacity: globeOpacity }}
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

          {/* ── Satellite layer — the ground we descend onto (reuses sem-risco) ──
              ▸ TO SWAP: replace sem-risco.png in the repo ROOT + run `npm run images`. */}
          <motion.div
            className="orbital-descent-sat"
            style={{ opacity: satOpacity, scale: satScale }}
            aria-hidden="true"
          >
            <picture>
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
                loading="lazy"
                decoding="async"
                alt=""
              />
            </picture>
          </motion.div>

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

          {/* Single, real description of the satellite view for assistive tech. */}
          <p className="sr-only">{t.orbital.satAlt}</p>
        </div>
      </div>
    </section>
  );
}
