import { Kicker } from './atoms/Kicker.jsx';

export function CTASection({ t }) {
  const lines = t.cta.title.split('\n');
  return (
    <section id="contact" className="cta-section">
      <div className="cta-inner">
        <Kicker>{t.cta.kicker}</Kicker>
        <h2 className="cta-title reveal-up" style={{ marginTop: 24 }}>
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1 ? <span className="ember">{line}</span> : line}
            </span>
          ))}
        </h2>
        <p className="cta-body reveal-up">{t.cta.body}</p>
        <div className="cta-actions reveal-up">
          <a className="btn btn-primary" href="mailto:ignite@actinspace.org">{t.cta.button} →</a>
          <a
            className="btn btn-ghost"
            href="https://www.linkedin.com/in/renan-mocelin-br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
