import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

export function OrbitalDebris() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    const items = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      items.length = 0;
      for (let i = 0; i < 24; i++) {
        items.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
          vy: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
          r: (0.5 + Math.random() * 1.2) * devicePixelRatio,
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
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return <canvas ref={ref} className="debris-canvas" aria-hidden="true" />;
}
