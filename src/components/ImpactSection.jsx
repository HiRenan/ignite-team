import { Kicker } from './atoms/Kicker.jsx';

const BAR_WIDTHS = ['85%', '90%', '100%'];

export function ImpactSection({ t }) {
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
            <div className={`impact-num${i === 1 ? ' accent' : ''}`}>{n.n}</div>
            <div className="impact-label">{n.l}</div>
            <div className="impact-bar" style={{ '--w': BAR_WIDTHS[i] }} />
          </div>
        ))}
      </div>
    </section>
  );
}
