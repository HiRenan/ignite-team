import { Kicker } from './atoms/Kicker.jsx';

const TEAM = [
  { name: 'Renan Mocelin', initials: 'RM', url: 'https://www.linkedin.com/in/renan-mocelin-br/' },
  { name: 'Eduardo Chiarani', initials: 'EC', url: 'https://www.linkedin.com/in/eduardo-chiarani-b56bb7125/' },
  { name: 'Pedro Vinicius Meerholz', initials: 'PM', url: 'https://www.linkedin.com/in/pmeerholz/' },
  { name: 'João Vitor Lehmen Sanmartin', initials: 'JS', url: 'https://www.linkedin.com/in/jo%C3%A3o-vitor-lehmen-sanmartin-2627aa229/' },
  { name: 'Lucas Porfirio Nunes', initials: 'LN', url: 'https://www.linkedin.com/in/lucasporfirionunes/' },
];

export function TeamSection({ t }) {
  const { event, stage, result } = t.team.credits;
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
        <div className="team-banner-photo">
          <img
            src="/assets/team-banner.jpeg"
            alt="IGNITE team at the ACT IN SPACE 2026 World Finals stage in Bordeaux"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="team-banner-meta">
          <div className="team-banner-tag">ACT IN SPACE 2026 · BORDEAUX</div>
          <div className="team-banner-quote">{t.team.quote}</div>
          <div className="team-banner-credits">
            <div className="team-banner-credit">{event}<b>ACT IN SPACE 2026</b></div>
            <div className="team-banner-credit">{stage}<b>WORLD FINALS</b></div>
            <div className="team-banner-credit">{result}<b>AIRBUS PARTNER AWARD</b></div>
          </div>
        </div>
      </div>
      <div className="team-roster">
        {TEAM.map((m, i) => (
          <a
            key={m.name}
            className="member reveal-up"
            style={{ '--delay': `${i * 80}ms` }}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} on LinkedIn`}
          >
            <div className="member-top">
              <div className="member-avatar" aria-hidden="true">{m.initials}</div>
              <div className="member-index">0{i + 1} / 05</div>
            </div>
            <div>
              <div className="member-name">{m.name}</div>
              <div className="member-role">Co-founder</div>
              <div className="member-arrow" aria-hidden="true">LINKEDIN <span>→</span></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
