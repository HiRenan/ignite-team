import { useEffect, useState } from 'react';
import { Nebula } from './atoms/Nebula.jsx';
import { StarField } from './atoms/StarField.jsx';
import { OrbitalDebris } from './atoms/OrbitalDebris.jsx';
import { GridHUD } from './atoms/GridHUD.jsx';
import { Satellite } from './Satellite.jsx';
import { HudTelemetry } from './HudTelemetry.jsx';
import { HudCompass } from './HudCompass.jsx';

const TICKER_ITEMS = [
  'SIGNAL NOMINAL',
  'ORBIT 512 KM',
  'VEL 7.66 KM/S',
  'TRACKING: VEGETATION',
  'GRID UPLINK OK',
  'AIRBUS PARTNER · 2026',
  'BORDEAUX · WORLD FINALS',
];

export function Hero({ t }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = `${now.toISOString().replace('T', ' ').slice(0, 19)} UTC`;

  return (
    <section className="hero" id="top">
      <Nebula intensity={1.8} />
      <StarField density={340} />
      <OrbitalDebris />
      <GridHUD />
      <div className="sun-flare" aria-hidden="true" />
      <div className="lens-flare" aria-hidden="true" />
      <div className="planet-distant" aria-hidden="true" />
      <div className="earth-stage" aria-hidden="true">
        <div className="earth-atmosphere" />
        <div className="earth-globe">
          <div className="earth-continents" />
          <div className="earth-clouds" />
          <div className="earth-citylights" />
          <div className="earth-terminator" />
          <div className="earth-scan" />
          <div className="earth-glow-rim" />
        </div>
      </div>
      <div className="satellite-orbit" aria-hidden="true" />
      <div className="satellite-orbit-2" aria-hidden="true" />
      <div className="satellite-orbit-3" aria-hidden="true" />
      <Satellite />
      <Satellite className="sat-2" />
      <div className="hud-corners" aria-hidden="true">
        <span />
        <span />
      </div>
      <HudTelemetry />
      <HudCompass />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="pulse" aria-hidden="true" />
          {t.hero.eyebrow}
        </div>
        <h1 className="hero-title">
          <span className="line"><span>{t.hero.title1}</span></span>
          <span className="line"><span className="italic">{t.hero.title2}</span></span>
          <span className="line"><span className="ember">{t.hero.title3}</span></span>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-cta-row">
          <a className="btn btn-primary btn-sm" href="#mission">{t.hero.cta} →</a>
          <a className="btn btn-ghost btn-sm" href="#contact">{t.hero.ctaSecondary}</a>
        </div>
        <div className="hero-bottombar">
          <div className="scroll-indicator" aria-hidden="true">
            <span className="line-dn" />
            <span>{t.hero.scroll}</span>
          </div>
          <div className="hero-coords" aria-hidden="true">
            <div className="hero-coords-row"><span>{t.hero.coords}</span></div>
            <div className="hero-coords-row" style={{ marginTop: 6 }}>
              <span className="live">● LIVE</span>
              <span>{timeStr}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((label, i) => (
            <span className="tick" key={i}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
