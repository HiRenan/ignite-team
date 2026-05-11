export function Satellite({ className = '' }) {
  return (
    <div className={`satellite ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <rect x="2" y="26" width="18" height="12" fill="#1a2a4a" stroke="#6fb3ff" strokeWidth="0.5" />
        <line x1="5" y1="26" x2="5" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <line x1="10" y1="26" x2="10" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <line x1="15" y1="26" x2="15" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <rect x="44" y="26" width="18" height="12" fill="#1a2a4a" stroke="#6fb3ff" strokeWidth="0.5" />
        <line x1="49" y1="26" x2="49" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <line x1="54" y1="26" x2="54" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <line x1="59" y1="26" x2="59" y2="38" stroke="#6fb3ff" strokeWidth="0.3" />
        <rect x="22" y="22" width="20" height="20" fill="#2a3550" stroke="#e9ecf4" strokeWidth="0.6" />
        <rect x="26" y="26" width="12" height="6" fill="#ff6b2c" opacity="0.85" />
        <circle cx="32" cy="18" r="4" fill="none" stroke="#e9ecf4" strokeWidth="0.8" />
        <circle cx="32" cy="18" r="1.5" fill="#ff6b2c" />
        <line x1="32" y1="22" x2="32" y2="26" stroke="#e9ecf4" strokeWidth="0.8" />
      </svg>
      <div className="sat-beam" />
    </div>
  );
}
