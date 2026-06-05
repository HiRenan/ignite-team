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
  { location: FLORIANOPOLIS, size: 0.08 }, // IGNITE home — emphasised
  { location: BORDEAUX,      size: 0.05 }, // the award city
];

// The "orbital route" — a great-circle arc linking the two cities. This is a
// NATIVE cobe feature (v2), so it rides along as the globe rotates.
const ROUTE = [{ from: FLORIANOPOLIS, to: BORDEAUX }];

// Brand orange #ff6b2c → [1.0, 0.42, 0.17]
const MARKER_RGB = [1.0, 0.42, 0.17];  // marker dots
const ARC_RGB    = [1.0, 0.42, 0.17];  // route arc
const GLOW_RGB   = [0.35, 0.40, 0.55]; // cool atmospheric rim — defines the sphere edge
const BASE_RGB   = [0.32, 0.36, 0.46]; // "terra escura" — dark-earth landmasses (visible, moody)

const ARC_WIDTH  = 0.6;  // arc line thickness, 0.1..2
const ARC_HEIGHT = 0.42; // how high the arc lofts off the surface, 0.1..0.5

// Motion & detail
const SPIN_SPEED = 0.004;         // idle auto-rotation, radians per frame
const THETA = 0.25;               // vertical tilt
const MAP_BRIGHTNESS = 6;         // brightness of the land dots
const DIFFUSE = 1.2;              // lighting falloff across the lit face
const MAP_SAMPLES = 16000;        // dot density on desktop (heaviest setting)
const MAP_SAMPLES_MOBILE = 9000;  // lighter on small screens
// ───────────────────────────────────────────────────────────────────────────

// Internal (not calibration knobs):
const FADE_IN_AFTER = 4;   // paint a few real frames before revealing (no blank flash)
const WARMUP_FRAMES = 14;  // reduced-motion: render this many frames (to load the
                           // map texture) then idle — no needless redraws.

const isMobile = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(max-width: 780px)').matches;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

// The interim cobe WebGL globe. Renders the planet, the two observation sites
// and the route arc entirely in code (no external asset / account).
//
// ⚠️ cobe@2 has NO internal animation loop and NO `onRender` option (that was the
// 1.x API). We drive it ourselves with requestAnimationFrame + `globe.update()`.
// This is also what makes the planet appear at all: cobe's world-map texture is
// an embedded data-URI that loads ASYNCHRONOUSLY, so the very first frame samples
// a blank texture (markers/arcs show, but no land dots). Re-rendering each frame
// paints the land the moment the texture lands.
//
// Two modes, picked by props:
//   • Idle (no progressRef): just auto-rotates — used if reused as a static globe.
//   • Descent (progressRef + zoomMax): reads scroll progress (0..1) each frame and
//     zooms toward Earth via cobe's `scale`, easing the spin down so it feels like
//     the camera is settling onto the ground. See OrbitalDescent.jsx.
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
    let painted = 0;
    let needsResize = false;
    let docVisible = document.visibilityState !== 'hidden';
    let onScreen = true; // kept in sync by the IntersectionObserver below

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const samples = isMobile() ? MAP_SAMPLES_MOBILE : MAP_SAMPLES;

    function onResize() {
      width = canvas.offsetWidth;
      needsResize = true;
    }
    function onVisibility() {
      docVisible = document.visibilityState !== 'hidden';
    }
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    // Pause the loop's work when the globe scrolls off-screen (the rAF keeps
    // ticking but we skip the GPU draw) — and resume when it's visible again.
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
      diffuse: DIFFUSE,
      mapSamples: samples,
      mapBrightness: MAP_BRIGHTNESS,
      baseColor: BASE_RGB,
      markerColor: MARKER_RGB,
      glowColor: GLOW_RGB,
      markers: MARKERS,
      arcs: ROUTE,
      arcColor: ARC_RGB,
      arcWidth: ARC_WIDTH,
      arcHeight: ARC_HEIGHT,
      scale: 1,
      opacity: 1,
    });

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!onScreen || !docVisible) return; // off-screen / tab hidden → idle

      // Scroll-driven zoom for the orbital descent (cobe `scale`).
      let z = 0;
      if (progressRef && zoomMax > 1) {
        const p = progressRef.current || 0;
        z = clamp01((p - zoomStart) / (1 - zoomStart));
      }

      // Reduced motion + no active zoom → render a few warmup frames (so the map
      // texture paints) then stop redrawing; nothing is moving.
      const moving = !reducedMotion || z > 0;
      if (!moving && painted > WARMUP_FRAMES) return;

      // Idle spin, eased down as we descend so the view settles on landing.
      if (!reducedMotion) phi += SPIN_SPEED * (1 - z * 0.85);

      const state = { phi, scale: 1 + z * (zoomMax - 1) };
      if (needsResize) {
        state.width = width * 2;
        state.height = width * 2;
        needsResize = false;
      }
      globe.update(state);

      // Reveal once a few real frames have painted (past the blank-texture flash).
      if (++painted === FADE_IN_AFTER) canvas.style.opacity = '1';
    };
    raf = requestAnimationFrame(tick);

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
