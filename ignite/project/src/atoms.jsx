// Reusable atoms — star field, grid HUD, kickers, etc.

function StarField({ density = 220, speed = 1, shooting = true }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
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
          hue: Math.random() > 0.92 ? (Math.random() > 0.5 ? 'warm' : 'cool') : 'white'
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
      // parallax drift (subtle)
      const drift = Math.sin(t * 0.0006) * 4 * devicePixelRatio;
      stars.forEach(s => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.tw + s.phase));
        let color;
        if (s.hue === 'warm') color = `rgba(255, 200, 150, ${alpha})`;
        else if (s.hue === 'cool') color = `rgba(150, 190, 255, ${alpha})`;
        else color = `rgba(255,255,255,${alpha})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x + drift * s.depth, s.y, s.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        // tiny glow for brightest stars
        if (s.r > 1.1) {
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
          ctx.beginPath();
          ctx.arc(s.x + drift * s.depth, s.y, s.r * devicePixelRatio * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      // shooting stars
      maybeSpawnShooter();
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.012;
        const tailLen = 80 * devicePixelRatio;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density, speed, shooting]);
  return <canvas ref={ref} className="starfield" />;
}

// Animated nebula — multi-layer cosmic clouds with deeper color
function Nebula({ intensity = 1.6 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const clouds = [];
    const palette = [
      [255, 107, 44, 0.26 * intensity],   // deep ember
      [255, 140, 60, 0.20 * intensity],   // warm ember
      [100, 60, 220, 0.28 * intensity],   // purple
      [60, 120, 230, 0.24 * intensity],   // blue
      [200, 80, 180, 0.20 * intensity],   // magenta
      [255, 200, 120, 0.14 * intensity],  // peach
      [40, 180, 220, 0.18 * intensity],   // cyan
    ];
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      clouds.length = 0;
      for (let i = 0; i < 11; i++) {
        const c = palette[i % palette.length];
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (180 + Math.random() * 360) * devicePixelRatio,
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
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      clouds.forEach(c => {
        c.x += c.vx; c.y += c.vy;
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
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [intensity]);
  return <canvas ref={ref} className="nebula-canvas" />;
}

// Orbital debris — small objects drifting across the hero
function OrbitalDebris() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
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
          hue: Math.random() > 0.5 ? 'warm' : 'cool'
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach(it => {
        it.x += it.vx; it.y += it.vy; it.rot += it.vrot;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="debris-canvas" />;
}

// Animated counter — counts up when visible
function Counter({ target, prefix = '', suffix = '', duration = 1800 }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{Math.round(val).toLocaleString()}{suffix}</span>;
}

function GridHUD() {
  return (
    <svg className="grid-hud" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="hudgrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(180,200,255,0.06)" strokeWidth="0.15"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#hudgrid)"/>
    </svg>
  );
}

function Kicker({ children, delay = 0 }) {
  return <div className="kicker reveal" style={{ '--delay': `${delay}ms` }}>
    <span className="kicker-dot" />{children}
  </div>;
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

// Pointer cursor follower — tiny HUD reticle on hero
function Reticle({ x, y, visible }) {
  if (!visible) return null;
  return (
    <div className="reticle" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <svg viewBox="-40 -40 80 80">
        <circle r="30" fill="none" stroke="rgba(255,120,50,0.6)" strokeWidth="0.8" strokeDasharray="4 3"/>
        <line x1="-36" y1="0" x2="-20" y2="0" stroke="rgba(255,120,50,0.8)" strokeWidth="0.8"/>
        <line x1="20" y1="0" x2="36" y2="0" stroke="rgba(255,120,50,0.8)" strokeWidth="0.8"/>
        <line x1="0" y1="-36" x2="0" y2="-20" stroke="rgba(255,120,50,0.8)" strokeWidth="0.8"/>
        <line x1="0" y1="20" x2="0" y2="36" stroke="rgba(255,120,50,0.8)" strokeWidth="0.8"/>
        <circle r="1" fill="rgba(255,120,50,1)"/>
      </svg>
    </div>
  );
}

// Scroll-triggered reveal — adds .in when element is 65% visible
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-up, .reveal-split');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { StarField, Nebula, OrbitalDebris, Counter, GridHUD, Kicker, Tag, Reticle, useReveal });
