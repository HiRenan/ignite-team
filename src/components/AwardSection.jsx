import { Kicker } from './atoms/Kicker.jsx';

export function AwardSection({ t }) {
  return (
    <section id="award" className="award-section">
      <div className="award-inner">
        <div>
          <Kicker>{t.award.kicker}</Kicker>
          <h2 className="section-title reveal-up" style={{ marginTop: 24 }}>{t.award.title}</h2>
          <p className="section-body reveal-up">{t.award.body}</p>
          <div className="award-badges">
            {t.award.badges.map((b, i) => (
              <span
                key={i}
                className={`tag${i === t.award.badges.length - 1 ? ' hot' : ''} reveal-up`}
                style={{ '--delay': `${i * 80}ms` }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="award-photo reveal-up">
          <img
            src="/assets/team-award.jpeg"
            alt="Team IGNITE receiving the Airbus Partner Award at the ACT IN SPACE 2026 World Finals in Bordeaux"
            loading="lazy"
            decoding="async"
          />
          <div className="award-photo-corner" aria-hidden="true">REC · LIVE</div>
          <div className="award-photo-tag">BORDEAUX · 04.2026</div>
        </div>
      </div>
    </section>
  );
}
