import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

// Cities along IGNITE's narrative — Airbus / ACT IN SPACE host + Brazilian
// power-grid hubs. The marker on Bordeaux is sized larger to anchor the eye.
const MARKERS = [
  { location: [44.84, -0.58],   size: 0.075 }, // Bordeaux — Airbus, ACT IN SPACE finale
  { location: [-23.55, -46.63], size: 0.060 }, // São Paulo
  { location: [-15.78, -47.93], size: 0.050 }, // Brasília
  { location: [-3.12,  -60.02], size: 0.045 }, // Manaus
  { location: [-1.45,  -48.50], size: 0.040 }, // Belém
  { location: [-25.43, -49.27], size: 0.045 }, // Curitiba
  { location: [-30.03, -51.23], size: 0.045 }, // Porto Alegre
  { location: [-19.92, -43.94], size: 0.050 }, // Belo Horizonte
];

export default function OrbitalGlobe() {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let width = canvas.offsetWidth;
    let phi = 0;
    let visible = document.visibilityState !== 'hidden';

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function onResize() {
      width = canvas.offsetWidth;
    }
    function onVisibility() {
      visible = document.visibilityState !== 'hidden';
    }
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor:    [0.94, 0.92, 0.86], // --ink #efe9dc
      markerColor:  [1.00, 0.32, 0.20], // --ember #ff5132
      glowColor:    [0.95, 0.28, 0.18], // ember-warm atmosphere
      markers: MARKERS,
      onRender: (state) => {
        if (!visible) return;
        if (!reducedMotion) phi += 0.0028;
        state.phi = phi;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fade in once the first frame paints — avoids the bright flash that
    // cobe shows during shader compilation.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        canvas.style.opacity = '1';
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      globe.destroy();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="orbital-globe-canvas"
      aria-label="Live orbital view of Earth highlighting IGNITE observation sites"
    />
  );
}
