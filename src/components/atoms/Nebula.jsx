import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { useInView, cappedDpr } from '../../hooks/useInView.js';

export function Nebula({ intensity = 1.6 }) {
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
    const cloudCount = isCoarse ? 7 : 11;
    let raf;
    let running = true;
    const clouds = [];
    const palette = [
      [255, 107, 44, 0.26 * intensity],
      [255, 140, 60, 0.20 * intensity],
      [100, 60, 220, 0.28 * intensity],
      [60, 120, 230, 0.24 * intensity],
      [200, 80, 180, 0.20 * intensity],
      [255, 200, 120, 0.14 * intensity],
      [40, 180, 220, 0.18 * intensity],
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      clouds.length = 0;
      for (let i = 0; i < cloudCount; i++) {
        const c = palette[i % palette.length];
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (180 + Math.random() * 360) * dpr,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.16,
          color: c,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.003 + Math.random() * 0.005,
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      clouds.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -c.r) c.x = canvas.width + c.r;
        if (c.x > canvas.width + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = canvas.height + c.r;
        if (c.y > canvas.height + c.r) c.y = -c.r;
        const pulse = 0.8 + 0.2 * Math.sin(t * c.pulseSpeed + c.phase);
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * pulse);
        grad.addColorStop(0, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},${c.color[3]})`);
        grad.addColorStop(0.5, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},${c.color[3] * 0.4})`);
        grad.addColorStop(1, `rgba(${c.color[0]},${c.color[1]},${c.color[2]},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };

    running = inView;
    if (running) draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, reduced, inView]);

  return <canvas ref={ref} className="nebula-canvas" aria-hidden="true" />;
}
