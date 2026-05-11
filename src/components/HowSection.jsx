import { Kicker } from './atoms/Kicker.jsx';
import { HowViz } from './atoms/HowViz.jsx';

const KINDS = ['observe', 'interpret', 'act'];

export function HowSection({ t }) {
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
            <div className="how-num">
              <span className="how-num-dot" aria-hidden="true" />
              STEP / {s.n}
            </div>
            <div>
              <h3 className="how-title">
                {s.t}
                <span className="ember">.</span>
              </h3>
              <p className="how-desc">{s.d}</p>
            </div>
            <div className="how-viz">
              <div className="how-line" aria-hidden="true" />
              <HowViz kind={KINDS[i]} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
