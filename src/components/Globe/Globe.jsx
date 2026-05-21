// Line-art cartographic globe — pure SVG, ~3 kB.
// Used as graceful fallback when WebGL is unavailable. The primary globe
// is OrbitalGlobe.jsx (cobe + WebGL).
// viewBox is 200×200; center (100,100); radius 78.

const CENTER = 100;
const R = 78;

// Meridians: ellipses whose horizontal radius is R * cos(longitude).
const meridians = [-75, -45, -15, 15, 45, 75].map((deg) => {
  const rx = R * Math.cos((deg * Math.PI) / 180);
  return { id: deg, rx: Math.abs(rx) };
});

// Parallels: horizontal chords inside the rim.
const parallels = [-60, -30, 30, 60].map((deg) => {
  const y = CENTER + R * Math.sin((deg * Math.PI) / 180);
  const halfWidth = R * Math.cos((deg * Math.PI) / 180);
  return { id: deg, y, halfWidth };
});

// Dotted continent silhouettes — schematic, not cartographically accurate.
const continents = [
  'M 84,118 86,124 88,130 91,136 93,142 95,148 96,154 95,160 92,164 89,162 86,156 84,150 83,144 83,138 82,132 82,126',
  'M 100,98 104,100 108,103 111,107 113,112 114,118 115,124 114,130 112,136 109,141 106,144 103,142 101,138 99,132 98,126 98,120 99,114 100,108 100,102',
  'M 102,76 106,75 110,76 113,78 110,82 106,82 102,80',
  'M 114,90 118,92 120,96 118,100 115,98 113,94',
];

function dotsFromPath(d) {
  return d
    .replace(/M\s*/g, '')
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(',').map(Number))
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
}

export default function Globe() {
  return (
    <svg
      className="globe-svg"
      viewBox="0 0 200 200"
      role="img"
      aria-label="Orbital observation plate showing Earth wireframe with satellite arc"
    >
      <defs>
        <radialGradient id="globeFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(239, 233, 220, 0.04)" />
          <stop offset="80%" stopColor="rgba(239, 233, 220, 0.01)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx={CENTER} cy={CENTER} r={R - 0.4} />
        </clipPath>
      </defs>

      <g stroke="var(--ink-3)" strokeWidth="0.5">
        <line x1="100" y1="6" x2="100" y2="14" />
        <line x1="100" y1="186" x2="100" y2="194" />
        <line x1="6" y1="100" x2="14" y2="100" />
        <line x1="186" y1="100" x2="194" y2="100" />
      </g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="5"
        fill="var(--ink-3)"
        letterSpacing="0.18em"
        textAnchor="middle"
      >
        <text x="100" y="4" dominantBaseline="hanging">N</text>
        <text x="100" y="198">S</text>
        <text x="4" y="102" textAnchor="start">W</text>
        <text x="196" y="102" textAnchor="end">E</text>
      </g>

      <circle cx={CENTER} cy={CENTER} r={R} fill="url(#globeFill)" />

      <g clipPath="url(#globeClip)">
        <g className="globe-spin">
          {meridians.map(({ id, rx }) => (
            <ellipse
              key={`m${id}`}
              className="globe-meridian"
              cx={CENTER}
              cy={CENTER}
              rx={rx}
              ry={R}
            />
          ))}

          {parallels.map(({ id, y, halfWidth }) => (
            <line
              key={`p${id}`}
              className="globe-parallel"
              x1={CENTER - halfWidth}
              x2={CENTER + halfWidth}
              y1={y}
              y2={y}
            />
          ))}

          <line
            className="globe-equator"
            x1={CENTER - R}
            x2={CENTER + R}
            y1={CENTER}
            y2={CENTER}
          />

          <g>
            {continents.flatMap((d, ci) =>
              dotsFromPath(d).map(([x, y], i) => (
                <circle
                  key={`c${ci}-${i}`}
                  className="globe-continent"
                  cx={x}
                  cy={y}
                  r="0.9"
                />
              )),
            )}
          </g>
        </g>
      </g>

      <circle className="globe-rim" cx={CENTER} cy={CENTER} r={R} />

      <g className="globe-sat">
        <ellipse
          className="globe-orbit"
          cx={CENTER}
          cy={CENTER}
          rx={R + 12}
          ry={R - 18}
          transform={`rotate(-22 ${CENTER} ${CENTER})`}
        />
        <g transform={`rotate(-22 ${CENTER} ${CENTER})`}>
          <circle cx={CENTER + R + 12} cy={CENTER} r="2.2" />
          <circle
            cx={CENTER + R + 12}
            cy={CENTER}
            r="5"
            fill="none"
            stroke="var(--ember)"
            strokeWidth="0.4"
            opacity="0.4"
          />
        </g>
      </g>
    </svg>
  );
}
