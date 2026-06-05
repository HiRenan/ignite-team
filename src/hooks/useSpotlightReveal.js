import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

// Drives the hero spotlight: writes --mx / --my (in %) onto `elRef` from the
// pointer position, smoothed with a light requestAnimationFrame lerp. The pure
// CSS mask does the actual reveal (see .hero-media-reveal in globals.css) —
// there is NO canvas and NO per-frame dataURL serialization.
//
// Progressive enhancement: if this never runs (JS disabled) or bails out
// (prefers-reduced-motion), the CSS keeps its default --mx / --my, so the hero
// shows a tasteful STATIC spotlight rather than breaking.
//
// IMPORTANT: the seed values below (62 / 46) must match the default
// --mx / --my declared on .hero in globals.css, so JS picks up exactly where
// the static CSS state left off (no jump on first paint).
export function useSpotlightReveal(elRef) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = elRef.current;
    if (!el) return undefined;
    // Respect reduced motion: leave the calm, static CSS default in place.
    if (reducedMotion) return undefined;

    let curX = 62;
    let curY = 46;
    let tgtX = 62;
    let tgtY = 46;
    let raf = 0;
    let running = false;

    const clamp = (n) => (n < 0 ? 0 : n > 100 ? 100 : n);

    function loop() {
      // Light lerp — a smooth trail that follows the cursor without lag.
      curX += (tgtX - curX) * 0.14;
      curY += (tgtY - curY) * 0.14;
      el.style.setProperty('--mx', `${curX.toFixed(2)}%`);
      el.style.setProperty('--my', `${curY.toFixed(2)}%`);
      // Keep animating while there is meaningful distance left; otherwise park
      // the loop to save battery until the next pointer move.
      if (Math.abs(tgtX - curX) > 0.05 || Math.abs(tgtY - curY) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    function start() {
      if (running) return;
      running = true;
      el.classList.add('is-spotlighting');
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }

    function setTargetFromEvent(e) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      tgtX = clamp(((e.clientX - r.left) / r.width) * 100);
      tgtY = clamp(((e.clientY - r.top) / r.height) * 100);
      start();
    }

    function onMove(e) {
      // Fires for mouse, pen AND touch-drag. We never call preventDefault, so
      // vertical touch scrolling keeps working normally.
      setTargetFromEvent(e);
    }
    function onLeave() {
      // Ease back to the resting composition instead of snapping away.
      tgtX = 62;
      tgtY = 46;
      start();
    }

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerdown', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.classList.remove('is-spotlighting');
    };
  }, [elRef, reducedMotion]);
}
