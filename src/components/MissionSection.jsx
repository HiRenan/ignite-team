import { Kicker } from './atoms/Kicker.jsx';
import { StatViz } from './atoms/StatViz.jsx';

const VIZ_KINDS = ['bars', 'line', 'pulse'];

export function MissionSection({ t }) {
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
            <StatViz kind={VIZ_KINDS[i]} />
          </div>
        ))}
      </div>
    </section>
  );
}
