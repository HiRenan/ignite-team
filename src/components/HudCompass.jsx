import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export function HudCompass() {
  const [angle, setAngle] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    const tick = () => {
      setAngle((a) => (a + 0.2) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="hud-compass" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(200,220,255,0.12)" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(200,220,255,0.08)" strokeWidth="0.4" strokeDasharray="1 2" />
        <g transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="6" x2="50" y2="14" stroke="#ff6b2c" strokeWidth="1" />
          <circle cx="50" cy="10" r="2" fill="#ffb36b" />
        </g>
        <line x1="50" y1="2" x2="50" y2="8" stroke="rgba(255,200,150,0.6)" strokeWidth="0.8" />
        <text x="50" y="6" textAnchor="middle" fontSize="6" fill="#ffb36b" fontFamily="monospace">N</text>
        <line x1="50" y1="92" x2="50" y2="98" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4" />
        <line x1="2" y1="50" x2="8" y2="50" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4" />
        <line x1="92" y1="50" x2="98" y2="50" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="2" fill="#ff6b2c" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,107,44,0.25)" strokeWidth="0.4" />
        <text x="50" y="84" textAnchor="middle" fontSize="4" fill="rgba(180,200,255,0.6)" fontFamily="monospace" letterSpacing="0.5">TRACK · 047°</text>
      </svg>
    </div>
  );
}
