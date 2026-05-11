import { Kicker } from './atoms/Kicker.jsx';

const PILLAR_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" key="orbital" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="22" cy="12" r="1.4" fill="currentColor" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" key="selective" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.2" />
    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" />
    <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.2" />
    <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" key="efficient" aria-hidden="true">
    <path d="M13 2 L4 14 L11 14 L9 22 L20 9 L13 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>,
];

export function SolutionSection({ t }) {
  return (
    <section id="solution" className="section solution-section">
      <div className="orbit-ring r1" aria-hidden="true"><span className="node" /></div>
      <div className="orbit-ring r2" aria-hidden="true"><span className="node" /></div>
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
