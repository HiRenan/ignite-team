// Per-step viz for "How it works"
export function HowViz({ kind }) {
  if (kind === 'observe') {
    return (
      <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id="obsg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ff6b2c" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff6b2c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="20" r="6" fill="#ffb36b" />
        <circle cx="200" cy="20" r="12" fill="none" stroke="#ff6b2c" strokeWidth="0.5" opacity="0.4" />
        <path d="M200 26 L100 130" stroke="url(#obsg)" strokeWidth="20" opacity="0.4" />
        <path d="M200 26 L100 130" stroke="#ffb36b" strokeWidth="0.6" />
        <path d="M0 130 Q60 110 120 122 T240 124" stroke="#6fb3ff" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="100" cy="125" r="3" fill="#ff6b2c">
          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
  if (kind === 'interpret') {
    return (
      <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <g opacity="0.5">
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={20 + i * 28} y1="20" x2={20 + i * 28} y2="120" stroke="#6fb3ff" strokeWidth="0.4" strokeDasharray="2 4" />
          ))}
        </g>
        <rect x="40" y="40" width="60" height="60" fill="rgba(255,107,44,0.15)" stroke="#ff6b2c" strokeWidth="0.6" />
        <rect x="140" y="60" width="40" height="40" fill="rgba(111,179,255,0.12)" stroke="#6fb3ff" strokeWidth="0.6" />
        <circle cx="70" cy="70" r="4" fill="#ffb36b">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="80" r="3" fill="#ffb36b">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="40" y="34" fontSize="7" fill="#ff6b2c" fontFamily="monospace">RISK · 87%</text>
        <text x="140" y="54" fontSize="7" fill="#6fb3ff" fontFamily="monospace">SAFE</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <path d="M0 70 L240 70" stroke="rgba(200,220,255,0.15)" strokeWidth="0.6" strokeDasharray="2 3" />
      <path d="M20 70 L80 70 L100 30 L140 110 L160 70 L220 70" stroke="#ff6b2c" strokeWidth="1.2" fill="none" />
      <circle cx="100" cy="30" r="4" fill="#ffb36b">
        <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="110" r="3" fill="#ff6b2c" />
      <text x="105" y="22" fontSize="7" fill="#ffb36b" fontFamily="monospace">ALERT</text>
      <text x="10" y="130" fontSize="6" fill="rgba(180,200,255,0.5)" fontFamily="monospace">→ DELIVERED · DECIDE · ACT</text>
    </svg>
  );
}
