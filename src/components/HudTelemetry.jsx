import { useEffect, useState } from 'react';

export function HudTelemetry() {
  const [orbit, setOrbit] = useState(512);
  const [vel, setVel] = useState(7.66);
  const [signal, setSignal] = useState(94);

  useEffect(() => {
    const id = setInterval(() => {
      setOrbit(512 + (Math.random() - 0.5) * 1.4);
      setVel(7.66 + (Math.random() - 0.5) * 0.04);
      setSignal(92 + Math.random() * 7);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hud-telemetry" aria-hidden="true">
      <div className="hud-tel-card">
        <div className="hud-tel-label">ORBITAL ALTITUDE</div>
        <div className="hud-tel-value">
          {orbit.toFixed(2)} <span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>KM</span>
        </div>
        <div className="hud-tel-bar" style={{ '--w': '68%' }} />
      </div>
      <div className="hud-tel-card">
        <div className="hud-tel-label">VELOCITY</div>
        <div className="hud-tel-value">
          {vel.toFixed(3)} <span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>KM/S</span>
        </div>
        <div className="hud-tel-bar" style={{ '--w': '82%' }} />
      </div>
      <div className="hud-tel-card">
        <div className="hud-tel-label">SIGNAL · UPLINK</div>
        <div className="hud-tel-value">
          <span className="live-dot" />
          {signal.toFixed(1)}
          <span style={{ color: 'var(--ink-dim)', fontSize: 10 }}>%</span>
        </div>
        <div className="hud-tel-bar" style={{ '--w': `${signal}%` }} />
      </div>
    </div>
  );
}
