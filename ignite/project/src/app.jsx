// Main app — ties everything together

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ember"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  ember:  { hot: '#ffb36b', acc: '#ff6b2c' },
  cool:   { hot: '#a5c8ff', acc: '#5a8ef0' },
  plasma: { hot: '#ff9ec7', acc: '#d946a8' },
  lime:   { hot: '#d4ff6b', acc: '#9cd92c' },
};

function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem('ignite_lang') || 'pt');
  const [editMode, setEditMode] = React.useState(false);
  const [accent, setAccent] = React.useState(TWEAK_DEFAULTS.accent);

  React.useEffect(() => { localStorage.setItem('ignite_lang', lang); }, [lang]);

  React.useEffect(() => {
    const c = ACCENT_MAP[accent] || ACCENT_MAP.ember;
    document.documentElement.style.setProperty('--accent', c.acc);
    document.documentElement.style.setProperty('--accent-hot', c.hot);
  }, [accent]);

  // Edit-mode / Tweaks handshake
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persistAccent = (a) => {
    setAccent(a);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accent: a } }, '*');
  };

  useReveal();

  const t = window.DICT[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <MissionSection t={t} />
      <SolutionSection t={t} />
      <HowSection t={t} />
      <ImpactSection t={t} />
      <AwardSection t={t} />
      <TeamSection t={t} lang={lang} />
      <CTASection t={t} />
      <Footer t={t} />
      <TweaksPanel open={editMode} accent={accent} setAccent={persistAccent} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
