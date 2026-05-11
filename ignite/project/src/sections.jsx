// Section components for IGNITE site

function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <span className="dot" />
        <span>IGNITE</span>
      </div>
      <div className="nav-links">
        <a href="#mission">{t.nav.mission}</a>
        <a href="#solution">{t.nav.solution}</a>
        <a href="#impact">{t.nav.impact}</a>
        <a href="#award">{t.nav.award}</a>
        <a href="#team">{t.nav.team}</a>
      </div>
      <div className="nav-right">
        <button className="lang-btn" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>{t.lang}</button>
      </div>
    </nav>
  );
}

function HudTelemetry() {
  const [orbit, setOrbit] = React.useState(512);
  const [vel, setVel] = React.useState(7.66);
  const [signal, setSignal] = React.useState(94);
  React.useEffect(() => {
    const id = setInterval(() => {
      setOrbit(512 + (Math.random() - 0.5) * 1.4);
      setVel(7.66 + (Math.random() - 0.5) * 0.04);
      setSignal(92 + Math.random() * 7);
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hud-telemetry">
      <div className="hud-tel-card">
        <div className="hud-tel-label">ORBITAL ALTITUDE</div>
        <div className="hud-tel-value">{orbit.toFixed(2)} <span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>KM</span></div>
        <div className="hud-tel-bar" style={{ '--w': '68%' }} />
      </div>
      <div className="hud-tel-card">
        <div className="hud-tel-label">VELOCITY</div>
        <div className="hud-tel-value">{vel.toFixed(3)} <span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>KM/S</span></div>
        <div className="hud-tel-bar" style={{ '--w': '82%' }} />
      </div>
      <div className="hud-tel-card">
        <div className="hud-tel-label">SIGNAL · UPLINK</div>
        <div className="hud-tel-value"><span className="live-dot" />{signal.toFixed(1)}<span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>%</span></div>
        <div className="hud-tel-bar" style={{ '--w': `${signal}%` }} />
      </div>
    </div>
  );
}

function HudCompass() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const tick = () => { setAngle(a => (a + 0.2) % 360); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="hud-compass">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(200,220,255,0.12)" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(200,220,255,0.08)" strokeWidth="0.4" strokeDasharray="1 2"/>
        <g transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="6" x2="50" y2="14" stroke="#ff6b2c" strokeWidth="1"/>
          <circle cx="50" cy="10" r="2" fill="#ffb36b"/>
        </g>
        <line x1="50" y1="2" x2="50" y2="8" stroke="rgba(255,200,150,0.6)" strokeWidth="0.8"/>
        <text x="50" y="6" textAnchor="middle" fontSize="6" fill="#ffb36b" fontFamily="monospace">N</text>
        <line x1="50" y1="92" x2="50" y2="98" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4"/>
        <line x1="2" y1="50" x2="8" y2="50" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4"/>
        <line x1="92" y1="50" x2="98" y2="50" stroke="rgba(200,220,255,0.4)" strokeWidth="0.4"/>
        <circle cx="50" cy="50" r="2" fill="#ff6b2c"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,107,44,0.25)" strokeWidth="0.4"/>
        <text x="50" y="84" textAnchor="middle" fontSize="4" fill="rgba(180,200,255,0.6)" fontFamily="monospace" letterSpacing="0.5">TRACK · 047°</text>
      </svg>
    </div>
  );
}

function Hero({ t }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  return (
    <section className="hero">
      <Nebula intensity={1.8} />
      <StarField density={340} />
      <OrbitalDebris />
      <GridHUD />
      <div className="sun-flare" />
      <div className="lens-flare" />
      <div className="planet-distant" />
      <div className="earth-stage">
        <div className="earth-atmosphere" />
        <div className="earth-globe">
          <div className="earth-continents" />
          <div className="earth-clouds" />
          <div className="earth-citylights" />
          <div className="earth-terminator" />
          <div className="earth-scan" />
          <div className="earth-glow-rim" />
        </div>
      </div>
      <div className="satellite-orbit" />
      <div className="satellite-orbit-2" />
      <div className="satellite-orbit-3" />
      <Satellite />
      <Satellite className="sat-2" />
      <div className="hud-corners"><span /><span /></div>
      <HudTelemetry />
      <HudCompass />
      <div className="hero-content">
        <div className="hero-eyebrow"><span className="pulse" />{t.hero.eyebrow}</div>
        <h1 className="hero-title">
          <div className="line"><span>{t.hero.title1}</span></div>
          <div className="line"><span className="italic">{t.hero.title2}</span></div>
          <div className="line"><span className="ember">{t.hero.title3}</span></div>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-cta-row">
          <a className="btn btn-primary btn-sm" href="#mission">{t.hero.cta || 'EXPLORE A MISSÃO'} →</a>
          <a className="btn btn-ghost btn-sm" href="#contact">{t.hero.ctaSecondary || 'FALE COM O TIME'}</a>
        </div>
        <div className="hero-bottombar">
          <div className="scroll-indicator">
            <span className="line-dn" />
            <span>{t.hero.scroll}</span>
          </div>
          <div className="hero-coords">
            <div className="hero-coords-row"><span>{t.hero.coords}</span></div>
            <div className="hero-coords-row" style={{marginTop: 6}}><span className="live">● LIVE</span><span>{timeStr}</span></div>
          </div>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="hero-ticker-track">
          <span className="tick">SIGNAL NOMINAL</span>
          <span className="tick">ORBIT 512 KM</span>
          <span className="tick">VEL 7.66 KM/S</span>
          <span className="tick">TRACKING: VEGETATION</span>
          <span className="tick">GRID UPLINK OK</span>
          <span className="tick">AIRBUS PARTNER · 2026</span>
          <span className="tick">BORDEAUX · WORLD FINALS</span>
          <span className="tick">SIGNAL NOMINAL</span>
          <span className="tick">ORBIT 512 KM</span>
          <span className="tick">VEL 7.66 KM/S</span>
          <span className="tick">TRACKING: VEGETATION</span>
          <span className="tick">GRID UPLINK OK</span>
          <span className="tick">AIRBUS PARTNER · 2026</span>
          <span className="tick">BORDEAUX · WORLD FINALS</span>
        </div>
      </div>
    </section>
  );
}

function Satellite({ className = '' }) {
  return (
    <div className={`satellite ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <rect x="2" y="26" width="18" height="12" fill="#1a2a4a" stroke="#6fb3ff" strokeWidth="0.5"/>
        <line x1="5" y1="26" x2="5" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <line x1="10" y1="26" x2="10" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <line x1="15" y1="26" x2="15" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <rect x="44" y="26" width="18" height="12" fill="#1a2a4a" stroke="#6fb3ff" strokeWidth="0.5"/>
        <line x1="49" y1="26" x2="49" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <line x1="54" y1="26" x2="54" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <line x1="59" y1="26" x2="59" y2="38" stroke="#6fb3ff" strokeWidth="0.3"/>
        <rect x="22" y="22" width="20" height="20" fill="#2a3550" stroke="#e9ecf4" strokeWidth="0.6"/>
        <rect x="26" y="26" width="12" height="6" fill="#ff6b2c" opacity="0.85"/>
        <circle cx="32" cy="18" r="4" fill="none" stroke="#e9ecf4" strokeWidth="0.8"/>
        <circle cx="32" cy="18" r="1.5" fill="#ff6b2c"/>
        <line x1="32" y1="22" x2="32" y2="26" stroke="#e9ecf4" strokeWidth="0.8"/>
      </svg>
      <div className="sat-beam" />
    </div>
  );
}

// Mini sparkline / bar viz for stat cards
function StatViz({ kind = 'bars', accent = '#ffb36b' }) {
  if (kind === 'bars') {
    const heights = [0.4, 0.7, 0.5, 0.85, 0.95, 0.65, 0.45];
    return (
      <div className="stat-viz">
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
      <div className="stat-viz">
        <svg viewBox="0 0 110 36">
          <path d="M0 28 L18 22 L36 26 L54 14 L72 18 L90 8 L110 12" fill="none" stroke={accent} strokeWidth="1.4" />
          <path d="M0 28 L18 22 L36 26 L54 14 L72 18 L90 8 L110 12 L110 36 L0 36 Z" fill={accent} opacity="0.18" />
          <circle cx="90" cy="8" r="2" fill={accent} />
        </svg>
      </div>
    );
  }
  // pulse / radar
  return (
    <div className="stat-viz">
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

function MissionSection({ t }) {
  const vizKinds = ['bars', 'line', 'pulse'];
  return (
    <section id="mission" className="section">
      <div className="section-head">
        <div className="col-left"><Kicker>{t.mission.kicker}</Kicker></div>
        <div className="col-right">
          <h2 className="section-title reveal-up">{t.mission.title}</h2>
          <p className="section-body reveal-up">{t.mission.body}</p>
        </div>
      </div>
      <div className="stats-grid">
        {t.mission.stats.map((s, i) => (
          <div key={i} className="stat reveal-up" style={{ '--delay': `${i * 120}ms` }}>
            <div className="stat-spark">METRIC / 0{i + 1}</div>
            <div>
              <div className="stat-num"><span className="ember">{s.n}</span></div>
              <div className="stat-label">{s.l}</div>
            </div>
            <StatViz kind={vizKinds[i]} />
          </div>
        ))}
      </div>
    </section>
  );
}

const PILLAR_ICONS = [
  // orbital
  (<svg viewBox="0 0 24 24" fill="none" key="0"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/><circle cx="22" cy="12" r="1.4" fill="currentColor"/></svg>),
  // selective
  (<svg viewBox="0 0 24 24" fill="none" key="1"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.2"/><line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.2"/><line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2"/></svg>),
  // efficient
  (<svg viewBox="0 0 24 24" fill="none" key="2"><path d="M13 2 L4 14 L11 14 L9 22 L20 9 L13 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
];

function SolutionSection({ t }) {
  return (
    <section id="solution" className="section solution-section">
      <div className="orbit-ring r1"><span className="node" /></div>
      <div className="orbit-ring r2"><span className="node" /></div>
      <div className="section-head">
        <div className="col-left"><Kicker>{t.solution.kicker}</Kicker></div>
        <div className="col-right">
          <h2 className="section-title reveal-up"><span className="ital">{t.solution.title}</span></h2>
          <p className="section-body reveal-up">{t.solution.body}</p>
        </div>
      </div>
      <div className="pillars">
        {t.solution.pillars.map((p, i) => (
          <div key={i} className="pillar reveal-up" style={{ '--delay': `${i * 140}ms` }}>
            <div>
              <div className="pillar-num">0{i + 1} / 03</div>
              <div className="pillar-icon" style={{ color: 'var(--accent-hot)' }}>{PILLAR_ICONS[i]}</div>
            </div>
            <div>
              <div className="pillar-title">{p.t}</div>
              <div className="pillar-desc">{p.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Per-step viz for "How it works"
function HowViz({ kind }) {
  if (kind === 'observe') {
    return (
      <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="obsg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ff6b2c" stopOpacity="0.5"/><stop offset="1" stopColor="#ff6b2c" stopOpacity="0"/></linearGradient>
        </defs>
        <circle cx="200" cy="20" r="6" fill="#ffb36b"/>
        <circle cx="200" cy="20" r="12" fill="none" stroke="#ff6b2c" strokeWidth="0.5" opacity="0.4"/>
        <path d="M200 26 L100 130" stroke="url(#obsg)" strokeWidth="20" opacity="0.4"/>
        <path d="M200 26 L100 130" stroke="#ffb36b" strokeWidth="0.6"/>
        <path d="M0 130 Q60 110 120 122 T240 124" stroke="#6fb3ff" strokeWidth="1" fill="none" opacity="0.6"/>
        <circle cx="100" cy="125" r="3" fill="#ff6b2c">
          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    );
  }
  if (kind === 'interpret') {
    return (
      <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <g opacity="0.5">
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={20 + i * 28} y1="20" x2={20 + i * 28} y2="120" stroke="#6fb3ff" strokeWidth="0.4" strokeDasharray="2 4"/>
          ))}
        </g>
        <rect x="40" y="40" width="60" height="60" fill="rgba(255,107,44,0.15)" stroke="#ff6b2c" strokeWidth="0.6"/>
        <rect x="140" y="60" width="40" height="40" fill="rgba(111,179,255,0.12)" stroke="#6fb3ff" strokeWidth="0.6"/>
        <circle cx="70" cy="70" r="4" fill="#ffb36b">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="160" cy="80" r="3" fill="#ffb36b">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <text x="40" y="34" fontSize="7" fill="#ff6b2c" fontFamily="monospace">RISK · 87%</text>
        <text x="140" y="54" fontSize="7" fill="#6fb3ff" fontFamily="monospace">SAFE</text>
      </svg>
    );
  }
  // act
  return (
    <svg viewBox="0 0 240 140" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <path d="M0 70 L240 70" stroke="rgba(200,220,255,0.15)" strokeWidth="0.6" strokeDasharray="2 3"/>
      <path d="M20 70 L80 70 L100 30 L140 110 L160 70 L220 70" stroke="#ff6b2c" strokeWidth="1.2" fill="none"/>
      <circle cx="100" cy="30" r="4" fill="#ffb36b">
        <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="140" cy="110" r="3" fill="#ff6b2c"/>
      <text x="105" y="22" fontSize="7" fill="#ffb36b" fontFamily="monospace">ALERT</text>
      <text x="10" y="130" fontSize="6" fill="rgba(180,200,255,0.5)" fontFamily="monospace">→ DELIVERED · DECIDE · ACT</text>
    </svg>
  );
}

function HowSection({ t }) {
  const kinds = ['observe', 'interpret', 'act'];
  return (
    <section id="how" className="section">
      <div className="section-head">
        <div className="col-left"><Kicker>{t.how.kicker}</Kicker></div>
        <div className="col-right">
          <h2 className="section-title reveal-up">{t.how.title}</h2>
        </div>
      </div>
      <div className="how-wrap">
        {t.how.steps.map((s, i) => (
          <div key={i} className="how-step reveal-up" style={{ '--delay': `${i * 120}ms` }}>
            <div className="how-num"><span className="how-num-dot" />STEP / {s.n}</div>
            <div>
              <h3 className="how-title">{s.t}<span className="ember">.</span></h3>
              <p className="how-desc">{s.d}</p>
            </div>
            <div className="how-viz"><div className="how-line" /><HowViz kind={kinds[i]} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImpactSection({ t }) {
  const widths = ['85%', '90%', '100%'];
  return (
    <section id="impact" className="section">
      <div className="section-head">
        <div className="col-left"><Kicker>{t.impact.kicker}</Kicker></div>
        <div className="col-right">
          <h2 className="section-title reveal-up">{t.impact.title}</h2>
        </div>
      </div>
      <div className="impact-grid">
        {t.impact.nums.map((n, i) => (
          <div key={i} className="impact-cell reveal-up" style={{ '--delay': `${i * 150}ms` }}>
            <div className="spark">METRIC / 0{i + 1}</div>
            <div className={`impact-num ${i === 1 ? 'accent' : ''}`}>{n.n}</div>
            <div className="impact-label">{n.l}</div>
            <div className="impact-bar" style={{ '--w': widths[i] }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AwardSection({ t }) {
  return (
    <section id="award" className="award-section">
      <div className="award-inner">
        <div>
          <Kicker>{t.award.kicker}</Kicker>
          <h2 className="section-title reveal-up" style={{ marginTop: '24px' }}>{t.award.title}</h2>
          <p className="section-body reveal-up">{t.award.body}</p>
          <div className="award-badges">
            {t.award.badges.map((b, i) => (
              <span key={i} className={`tag ${i === 3 ? 'hot' : ''} reveal-up`} style={{ '--delay': `${i * 80}ms` }}>{b}</span>
            ))}
          </div>
        </div>
        <div className="award-photo reveal-up">
          <img src="assets/team-award.jpeg" alt="Team IGNITE receiving Airbus Partner Award" />
          <div className="award-photo-corner">REC · LIVE</div>
          <div className="award-photo-tag">BORDEAUX · 04.2026</div>
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Renan Mocelin", initials: "RM", url: "https://www.linkedin.com/in/renan-mocelin-br/" },
  { name: "Eduardo Chiarani", initials: "EC", url: "https://www.linkedin.com/in/eduardo-chiarani-b56bb7125/" },
  { name: "Pedro Vinicius Meerholz", initials: "PM", url: "https://www.linkedin.com/in/pmeerholz/" },
  { name: "João Vitor Lehmen Sanmartin", initials: "JS", url: "http://linkedin.com/in/jo%C3%A3o-vitor-lehmen-sanmartin-2627aa229/" },
  { name: "Lucas Porfirio Nunes", initials: "LN", url: "https://www.linkedin.com/in/lucasporfirionunes/" },
];

function TeamSection({ t, lang }) {
  return (
    <section id="team" className="team-section">
      <div className="section-head">
        <div className="col-left"><Kicker>{t.team.kicker}</Kicker></div>
        <div className="col-right">
          <h2 className="section-title reveal-up">{t.team.title}</h2>
          <p className="section-body reveal-up">{t.team.body}</p>
        </div>
      </div>
      <div className="team-banner reveal-up">
        <div className="team-banner-photo"><img src="assets/team-banner.jpeg" alt="IGNITE team at World Finals" /></div>
        <div className="team-banner-meta">
          <div className="team-banner-tag">ACT IN SPACE 2026 · BORDEAUX</div>
          <div className="team-banner-quote">{lang === 'pt' ? 'Cinco mentes. Uma órbita. Uma missão que começa do espaço e aterriza onde a infraestrutura mais precisa.' : 'Five minds. One orbit. A mission that begins in space and lands where infrastructure needs it most.'}</div>
          <div className="team-banner-credits">
            <div className="team-banner-credit">EVENT<b>ACT IN SPACE 2026</b></div>
            <div className="team-banner-credit">STAGE<b>WORLD FINALS</b></div>
            <div className="team-banner-credit">RESULT<b>AIRBUS PARTNER AWARD</b></div>
          </div>
        </div>
      </div>
      <div className="team-roster">
        {TEAM.map((m, i) => (
          <a key={i} className="member reveal-up" style={{ '--delay': `${i * 80}ms` }} href={m.url} target="_blank" rel="noopener noreferrer">
            <div className="member-top">
              <div className="member-avatar">{m.initials}</div>
              <div className="member-index">0{i + 1} / 05</div>
            </div>
            <div>
              <div className="member-name">{m.name}</div>
              <div className="member-role">Co-founder</div>
              <div className="member-arrow">LINKEDIN <span>→</span></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function CTASection({ t }) {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-inner">
        <Kicker>{t.cta.kicker}</Kicker>
        <h2 className="cta-title reveal-up" style={{ marginTop: '24px' }}>
          {t.cta.title.split('\n').map((line, i) => (
            <div key={i}>{i === 1 ? <span className="ember">{line}</span> : line}</div>
          ))}
        </h2>
        <p className="cta-body reveal-up">{t.cta.body}</p>
        <div className="cta-actions reveal-up">
          <a className="btn btn-primary" href="mailto:ignite@actinspace.org">{t.cta.button} →</a>
          <a className="btn btn-ghost" href="https://www.linkedin.com/in/renan-mocelin-br/" target="_blank" rel="noopener noreferrer">{t.cta.secondary}</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <span>{t.footer.rights}</span>
      <span className="footer-brand"><span className="dot" />ignite</span>
      <span className="footer-right">{t.footer.origin}</span>
    </footer>
  );
}

function TweaksPanel({ open, accent, setAccent }) {
  if (!open) return null;
  const colors = [
    { id: 'ember', hot: '#ffb36b', acc: '#ff6b2c' },
    { id: 'cool', hot: '#a5c8ff', acc: '#5a8ef0' },
    { id: 'plasma', hot: '#ff9ec7', acc: '#d946a8' },
    { id: 'lime', hot: '#d4ff6b', acc: '#9cd92c' },
  ];
  return (
    <div className="tweaks-panel">
      <h4>TWEAKS</h4>
      <div className="tweak-row">
        <span>Accent</span>
        <div className="tweak-swatches">
          {colors.map(c => (
            <div key={c.id}
              className={`swatch ${accent === c.id ? 'on' : ''}`}
              style={{ background: c.acc }}
              onClick={() => setAccent(c.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, MissionSection, SolutionSection, HowSection, ImpactSection, AwardSection, TeamSection, CTASection, Footer, TweaksPanel });
