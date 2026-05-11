import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

export function StarField({ density = 220, speed = 1, shooting = true }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    const stars = [];
    const shooters = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      stars.length = 0;
      for (let i = 0; i < density; i++) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (Math.random() * 1.3 + 0.15) * (0.4 + depth),
          a: (Math.random() * 0.6 + 0.3) * (0.5 + depth * 0.8),
          tw: Math.random() * 0.03 + 0.004,
          phase: Math.random() * Math.PI * 2,
          depth,
          hue: Math.random() > 0.92 ? (Math.random() > 0.5 ? 'warm' : 'cool') : 'white',
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const maybeSpawnShooter = () => {
      if (!shooting) return;
      if (Math.random() < 0.004 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.4,
          vx: (6 + Math.random() * 4) * devicePixelRatio,
          vy: (2 + Math.random() * 2) * devicePixelRatio,
          life: 1,
        });
      }
    };

    const draw = () => {
      t += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const drift = Math.sin(t * 0.0006) * 4 * devicePixelRatio;
      stars.forEach((s) => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.tw + s.phase));
        let color;
        if (s.hue === 'warm') color = `rgba(255, 200, 150, ${alpha})`;
        else if (s.hue === 'cool') color = `rgba(150, 190, 255, ${alpha})`;
        else color = `rgba(255,255,255,${alpha})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x + drift * s.depth, s.y, s.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.1) {
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
          ctx.beginPath();
          ctx.arc(s.x + drift * s.depth, s.y, s.r * devicePixelRatio * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      maybeSpawnShooter();
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 10, sh.y - sh.vy * 10);
        grad.addColorStop(0, `rgba(255, 220, 180, ${sh.life})`);
        grad.addColorStop(1, 'rgba(255, 220, 180, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4 * devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 10, sh.y - sh.vy * 10);
        ctx.stroke();
        if (sh.life <= 0 || sh.x > canvas.width || sh.y > canvas.height) shooters.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, speed, shooting, reduced]);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
