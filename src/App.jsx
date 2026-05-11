import { useEffect, useState } from 'react';
import { DICT } from './i18n.js';
import { useReveal } from './hooks/useReveal.js';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { MissionSection } from './components/MissionSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { HowSection } from './components/HowSection.jsx';
import { ImpactSection } from './components/ImpactSection.jsx';
import { AwardSection } from './components/AwardSection.jsx';
import { TeamSection } from './components/TeamSection.jsx';
import { CTASection } from './components/CTASection.jsx';
import { Footer } from './components/Footer.jsx';

const STORAGE_KEY = 'ignite_lang';
const SUPPORTED = ['pt', 'en'];

function initialLang() {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const nav = (window.navigator.language || 'pt').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : 'pt';
}

export default function App() {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useReveal();

  const t = DICT[lang];

  return (
    <>
      <a href="#mission" className="skip-link">{t.skip}</a>
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <MissionSection t={t} />
        <SolutionSection t={t} />
        <HowSection t={t} />
        <ImpactSection t={t} />
        <AwardSection t={t} />
        <TeamSection t={t} />
        <CTASection t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
