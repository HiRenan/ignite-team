import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { useInView, cappedDpr } from '../../hooks/useInView.js';

export function OrbitalDebris() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref);

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = cappedDpr();
    const isCoarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
    const debrisCount = isCoarse ? 14 : 24;
    let raf;
    let running = true;
    const items = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      items.length = 0;
      for (let i = 0; i < debrisCount; i++) {
        items.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4 * dpr,
          vy: (Math.random() - 0.5) * 0.2 * dpr,
          r: (0.5 + Math.random() * 1.2) * dpr,
          a: 0.2 + Math.random() * 0.4,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.02,
          shape: Math.random() > 0.7 ? 'rect' : 'dot',
          hue: Math.random() > 0.5 ? 'warm' : 'cool',
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((it) => {
        it.x += it.vx;
        it.y += it.vy;
        it.rot += it.vrot;
        if (it.x < -10) it.x = canvas.width + 10;
        if (it.x > canvas.width + 10) it.x = -10;
        if (it.y < -10) it.y = canvas.height + 10;
        if (it.y > canvas.height + 10) it.y = -10;
        ctx.save();
        ctx.translate(it.x, it.y);
        ctx.rotate(it.rot);
        const col = it.hue === 'warm' ? `rgba(255, 200, 150, ${it.a})` : `rgba(180, 210, 255, ${it.a})`;
        ctx.fillStyle = col;
        if (it.shape === 'rect') {
          ctx.fillRect(-it.r * 2, -it.r * 0.4, it.r * 4, it.r * 0.8);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, it.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };

    running = inView;
    if (running) draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced, inView]);

  return <canvas ref={ref} className="debris-canvas" aria-hidden="true" />;
}
