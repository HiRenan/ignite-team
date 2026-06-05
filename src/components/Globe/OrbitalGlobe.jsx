import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

// ───────────────────────────────────────────────────────────────────────────
//  EDIT ME — globe look, observation sites & the "orbital route" arc.
//  All colours are RGB in the 0..1 range (NOT 0..255).
// ───────────────────────────────────────────────────────────────────────────

// Route endpoints, as [latitude, longitude]:
const FLORIANOPOLIS = [-27.59, -48.55]; // IGNITE — Brazil
const BORDEAUX      = [44.84, -0.58];   // Airbus / ACT IN SPACE world finals — France

// Markers (glowing dots). size is relative to the globe, ~0.01..0.1.
const MARKERS = [
  { location: FLORIANOPOLIS, size: 0.08 },
  { location: BORDEAUX,      size: 0.08 },
];

// The "orbital route" — a great-circle arc linking the two cities. This is a
// NATIVE cobe feature (v2), so it rides along as the globe rotates.
const ROUTE = [{ from: FLORIANOPOLIS, to: BORDEAUX }];

// Brand orange #ff6b2c → [1.0, 0.42, 0.17]
const MARKER_RGB = [1.0, 0.42, 0.17]; // marker dots
const ARC_RGB    = [1.0, 0.42, 0.17]; // route arc
const GLOW_RGB   = [0.95, 0.28, 0.18]; // warm atmospheric glow
const BASE_RGB   = [0.94, 0.92, 0.86]; // landmasses (matches --ink)

const ARC_WIDTH  = 0.6;  // arc line thickness, 0.1..2
const ARC_HEIGHT = 0.42; // how high the arc lofts off the surface, 0.1..0.5

// Motion & detail
const SPIN_SPEED = 0.0028;        // idle auto-rotation, radians per frame
const THETA = 0.30;               // vertical tilt
const MAP_SAMPLES = 16000;        // dot density on desktop (heaviest setting)
const MAP_SAMPLES_MOBILE = 9000;  // lighter on small screens
// ───────────────────────────────────────────────────────────────────────────

const isMobile = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(max-width: 780px)').matches;

// The interim cobe WebGL globe. Renders the planet, the two observation sites
// and the route arc entirely in code (no external asset / account).
//
// Two modes, picked by props:
//   • Idle (no progressRef): just auto-rotates — used in the static fallback.
//   • Descent (progressRef + zoomMax): reads scroll progress (0..1) each frame
//     and zooms toward Earth via cobe's `scale`, easing the spin down so it
//     feels like the camera is settling onto the ground. See OrbitalDescent.jsx.
export default function OrbitalGlobe({
  className = 'orbital-globe-canvas',
  progressRef = null, // ref holding 0..1 scroll progress (descent only)
  zoomMax = 1,        // cobe scale at progress = 1 (1 = no zoom)
  zoomStart = 0.15,   // progress at which the zoom begins
  ariaLabel = 'Live orbital view of Earth highlighting IGNITE observation sites',
}) {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let width = canvas.offsetWidth;
    let phi = 0;
    let docVisible = document.visibilityState !== 'hidden';
    let onScreen = true; // kept in sync by the IntersectionObserver below

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const samples = isMobile() ? MAP_SAMPLES_MOBILE : MAP_SAMPLES;

    function onResize() {
      width = canvas.offsetWidth;
    }
    function onVisibility() {
      docVisible = document.visibilityState !== 'hidden';
    }
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    // Pause the animation when the globe scrolls off-screen. cobe has no public
    // pause, so we freeze its state in onRender instead of advancing it — this
    // stops the spin/zoom work when the user can't see it.
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0] ? entries[0].isIntersecting : true;
        },
        { rootMargin: '0px' },
      );
      io.observe(canvas);
    }

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: THETA,
      dark: 1,
      diffuse: 1.15,
      mapSamples: samples,
      mapBrightness: 5,
      baseColor: BASE_RGB,
      markerColor: MARKER_RGB,
      glowColor: GLOW_RGB,
      markers: MARKERS,
      arcs: ROUTE,
      arcColor: ARC_RGB,
      arcWidth: ARC_WIDTH,
      arcHeight: ARC_HEIGHT,
      onRender: (state) => {
        // Off-screen or tab hidden → freeze (skip the per-frame updates).
        if (!onScreen || !docVisible) return;

        // Scroll-driven zoom for the orbital descent (cobe `scale`).
        let z = 0;
        if (progressRef && zoomMax > 1) {
          const p = progressRef.current || 0;
          z = Math.min(Math.max((p - zoomStart) / (1 - zoomStart), 0), 1);
          state.scale = 1 + z * (zoomMax - 1);
        }

        // Idle spin, eased down as we descend so the view settles on landing.
        if (!reducedMotion) phi += SPIN_SPEED * (1 - z * 0.85);
        state.phi = phi;

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fade in once the first real frame paints — avoids the bright flash cobe
    // shows during shader compilation.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        canvas.style.opacity = '1';
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (io) io.disconnect();
      globe.destroy();
    };
  }, [reducedMotion, progressRef, zoomMax, zoomStart]);

  return <canvas ref={canvasRef} className={className} aria-label={ariaLabel} />;
}
