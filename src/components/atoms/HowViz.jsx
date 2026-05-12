// Per-step viz for "How it works".
// Restyled in the Editorial Orbital Atlas palette: bone-on-midnight
// monochrome with a single ember accent dot per diagram.

const STROKE = 'rgba(239, 233, 220, 0.42)';   // ink-2 @ 50 %
const FAINT = 'rgba(239, 233, 220, 0.16)';    // rule-strong
const EMBER = '#ff5132';
const EMBER_SOFT = '#ffce5c';

export function HowViz({ kind }) {
  if (kind === 'observe') {
    return (
      <svg
        viewBox="0 0 240 140"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        {/* Faint baseline arc — Earth's curve seen from above */}
        <path
          d="M0 130 Q60 110 120 122 T240 124"
          stroke={STROKE}
          strokeWidth="0.7"
          fill="none"
        />
        {/* Satellite point + soft ring */}
        <circle cx="200" cy="20" r="3" fill={EMBER} />
        <circle cx="200" cy="20" r="8" fill="none" stroke={EMBER} strokeWidth="0.4" opacity="0.5" />
        {/* Beam path — dashed downlink */}
        <line
          x1="200"
          y1="26"
          x2="100"
          y2="124"
          stroke={STROKE}
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        {/* Ground target — pulsing ember */}
        <circle cx="100" cy="125" r="3" fill={EMBER}>
          <animate attributeName="r" values="3;5.5;3" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.45;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }

  if (kind === 'interpret') {
    return (
      <svg
        viewBox="0 0 240 140"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        {/* Vertical scan grid */}
        <g opacity="0.6">
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={20 + i * 28}
              y1="20"
              x2={20 + i * 28}
              y2="120"
              stroke={FAINT}
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
          ))}
        </g>
        {/* Detected risk cell */}
        <rect x="40" y="40" width="56" height="56" fill="none" stroke={EMBER} strokeWidth="0.6" />
        <circle cx="68" cy="68" r="3" fill={EMBER_SOFT}>
          <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        {/* Safe cell */}
        <rect x="140" y="60" width="40" height="40" fill="none" stroke={STROKE} strokeWidth="0.5" />
        <text x="40" y="34" fontSize="7" fill={EMBER} fontFamily="ui-monospace, monospace" letterSpacing="0.18em">
          RISK · 87%
        </text>
        <text x="140" y="54" fontSize="7" fill={STROKE} fontFamily="ui-monospace, monospace" letterSpacing="0.18em">
          SAFE
        </text>
      </svg>
    );
  }

  // act
  return (
    <svg
      viewBox="0 0 240 140"
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <path d="M0 70 L240 70" stroke={FAINT} strokeWidth="0.6" strokeDasharray="2 3" />
      <path
        d="M20 70 L80 70 L100 30 L140 110 L160 70 L220 70"
        stroke={STROKE}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="100" cy="30" r="4" fill={EMBER}>
        <animate attributeName="r" values="4;6.5;4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x="105" y="22" fontSize="7" fill={EMBER} fontFamily="ui-monospace, monospace" letterSpacing="0.18em">
        ALERT
      </text>
      <text x="10" y="130" fontSize="6" fill={FAINT} fontFamily="ui-monospace, monospace" letterSpacing="0.2em">
        DELIVERED · DECIDE · ACT
      </text>
    </svg>
  );
}
