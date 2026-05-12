export function Nav({ lang, setLang, t }) {
  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

  return (
    <nav className="nav" aria-label="IGNITE">
      <a className="nav-brand" href="#top" aria-label="IGNITE — home">
        <span className="dot" aria-hidden="true" />
        <span className="nav-wordmark">IGNITE</span>
      </a>
      <div className="nav-links">
        <a href="#mission">{t.nav.mission}</a>
        <a href="#solution">{t.nav.solution}</a>
        <a href="#impact">{t.nav.impact}</a>
        <a href="#team">{t.nav.team}</a>
      </div>
      <button
        type="button"
        className="lang-btn"
        onClick={toggleLang}
        aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        {t.lang}
      </button>
    </nav>
  );
}
