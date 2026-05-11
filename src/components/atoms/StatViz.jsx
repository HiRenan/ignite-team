// Mini sparkline / bar viz for stat cards
export function StatViz({ kind = 'bars', accent = '#ffb36b' }) {
  if (kind === 'bars') {
    const heights = [0.4, 0.7, 0.5, 0.85, 0.95, 0.65, 0.45];
    return (
      <div className="stat-viz" aria-hidden="true">
        <svg viewBox="0 0 110 36">
          {heights.map((h, i) => (
            <rect key={i} x={i * 16} y={36 - h * 32} width="8" height={h * 32} fill={accent} opacity={0.4 + i * 0.08} rx="1" />
          ))}
        </svg>
      </div>
    );
  }
  if (kind === 'line') {
    return (
      <div className="stat-viz" aria-hidden="true">
        <svg viewBox="0 0 110 36">
          <path d="M0 28 L18 22 L36 26 L54 14 L72 18 L90 8 L110 12" fill="none" stroke={accent} strokeWidth="1.4" />
          <path d="M0 28 L18 22 L36 26 L54 14 L72 18 L90 8 L110 12 L110 36 L0 36 Z" fill={accent} opacity="0.18" />
          <circle cx="90" cy="8" r="2" fill={accent} />
        </svg>
      </div>
    );
  }
  return (
    <div className="stat-viz" aria-hidden="true">
      <svg viewBox="0 0 110 36">
        <circle cx="18" cy="18" r="14" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.4" />
        <circle cx="18" cy="18" r="9" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.6" />
        <circle cx="18" cy="18" r="4" fill={accent} opacity="0.8" />
        <line x1="40" y1="18" x2="106" y2="18" stroke={accent} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2" />
        <text x="50" y="14" fontSize="6" fill={accent} fontFamily="monospace" opacity="0.7">24/7</text>
        <text x="50" y="26" fontSize="5" fill="rgba(180,200,255,0.5)" fontFamily="monospace">ACTIVE</text>
      </svg>
    </div>
  );
}
