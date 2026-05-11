import { useEffect, useState } from 'react';

export function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="IGNITE">
      <a className="nav-brand" href="#top" aria-label="IGNITE — home">
        <span className="dot" aria-hidden="true" />
        <span>IGNITE</span>
      </a>
      <div className="nav-links">
        <a href="#mission">{t.nav.mission}</a>
        <a href="#solution">{t.nav.solution}</a>
        <a href="#impact">{t.nav.impact}</a>
        <a href="#award">{t.nav.award}</a>
        <a href="#team">{t.nav.team}</a>
      </div>
      <div className="nav-right">
        <button
          type="button"
          className="lang-btn"
          onClick={toggleLang}
          aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        >
          {t.lang}
        </button>
      </div>
    </nav>
  );
}
