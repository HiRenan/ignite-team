import { useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

// Star layers. Each layer has its own density, size range, twinkle period,
// alpha range, and parallax factor. Three layers create depth without
// looking busy.
const LAYERS = [
  { name: 'deep',   countD: 200, countM: 120, rMin: 0.5, rMax: 1.0, twMin: 4.0, twMax: 8.0, aMin: 0.22, aMax: 0.65, parallax: 0.02 },
  { name: 'mid',    countD: 80,  countM: 48,  rMin: 1.0, rMax: 1.8, twMin: 2.0, twMax: 5.0, aMin: 0.32, aMax: 0.85, parallax: 0.05 },
  { name: 'fore',   countD: 25,  countM: 16,  rMin: 1.8, rMax: 2.6, twMin: 1.5, twMax: 3.0, aMin: 0.45, aMax: 1.00, parallax: 0.10 },
];

// Deterministic PRNG so the same starfield arrangement renders each load —
// the layout becomes part of the brand instead of changing on every refresh.
function seeded(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Starfield() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    // scrollY is a MotionValue — read it imperatively inside the rAF loop
    // via a ref so we don't re-trigger React renders on scroll.
    const unsubscribe = scrollY.on('change', (v) => {
      scrollRef.current = v;
    });
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let stars = [];
    let shooting = null;
    let nextShootingAt = 0;
    let raf = 0;
    let lastTime = 0;
    let visible = document.visibilityState !== 'hidden';

    const isMobile = () => window.innerWidth < 780;
    const dpr = () =>
      Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2);

    function rebuild() {
      const ratio = dpr();
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const mobile = isMobile();
      const rng = seeded(0xC057E);

      stars = [];
      for (const layer of LAYERS) {
        const count = mobile ? layer.countM : layer.countD;
        for (let i = 0; i < count; i++) {
          const r = layer.rMin + rng() * (layer.rMax - layer.rMin);
          const tDur = layer.twMin + rng() * (layer.twMax - layer.twMin);
          stars.push({
            x: rng() * width,
            // Stars span 2.2x the viewport vertically so parallax has reserve
            // when the user scrolls long pages.
            y: rng() * (height * 2.2),
            r,
            base: layer.aMin + rng() * (layer.aMax - layer.aMin),
            phase: rng() * Math.PI * 2,
            // angular velocity for twinkle (radians per ms)
            w: (Math.PI * 2) / (tDur * 1000),
            parallax: layer.parallax,
            kind: layer.name,
          });
        }
      }
      nextShootingAt = performance.now() + 4000 + Math.random() * 8000;
    }

    function spawnShooting() {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -60 : width + 60;
      const startY = Math.random() * height * 0.55;
      const angle = fromLeft
        ? Math.PI / 6 + (Math.random() - 0.5) * 0.1
        : Math.PI - Math.PI / 6 + (Math.random() - 0.5) * 0.1;
      const speed = 0.85;
      shooting = {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        ttl: 1200,
      };
    }

    function draw(time) {
      const dt = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const scroll = scrollRef.current;
      const span = height * 2.2;

      for (const s of stars) {
        const offsetY = -scroll * s.parallax;
        // Wrap vertically so stars repeat across long pages.
        let y = ((s.y + offsetY) % span + span) % span;
        if (y < -10 || y > height + 10) continue;

        let alpha;
        if (reducedMotion) {
          alpha = s.base * 0.65;
        } else {
          s.phase += s.w * dt;
          const tw = (Math.sin(s.phase) + 1) * 0.5;
          alpha = s.base * (0.35 + 0.65 * tw);
        }

        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 233, 220, ${alpha.toFixed(3)})`;
        ctx.fill();

        // Subtle halo for mid/foreground stars while they're bright.
        if (s.kind !== 'deep' && alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 233, 220, ${(alpha * 0.07).toFixed(3)})`;
          ctx.fill();
        }
      }

      // Shooting stars
      if (!reducedMotion) {
        if (!shooting && time >= nextShootingAt) spawnShooting();
        if (shooting) {
          shooting.life += dt;
          if (shooting.life > shooting.ttl) {
            shooting = null;
            nextShootingAt = time + 18000 + Math.random() * 8000;
          } else {
            shooting.x += shooting.vx * dt;
            shooting.y += shooting.vy * dt;
            const p = shooting.life / shooting.ttl;
            const fade = p < 0.18 ? p / 0.18 : (1 - p) / 0.82;
            const trailLen = 90;
            const tx = shooting.x - (shooting.vx / 0.85) * trailLen;
            const ty = shooting.y - (shooting.vy / 0.85) * trailLen;
            const grad = ctx.createLinearGradient(tx, ty, shooting.x, shooting.y);
            grad.addColorStop(0, 'rgba(239, 233, 220, 0)');
            grad.addColorStop(1, `rgba(239, 233, 220, ${(fade * 0.9).toFixed(3)})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(shooting.x, shooting.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(shooting.x, shooting.y, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 206, 92, ${(fade * 0.92).toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      if (visible) raf = requestAnimationFrame(draw);
    }

    function start() {
      lastTime = 0;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      cancelAnimationFrame(raf);
    }

    function onVisibility() {
      visible = document.visibilityState !== 'hidden';
      if (visible) start();
      else stop();
    }

    let resizeTimeout;
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(rebuild, 150);
    }

    rebuild();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield-nebula" />
      <canvas ref={canvasRef} className="starfield-canvas" />
    </div>
  );
}
