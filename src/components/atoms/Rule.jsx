// Editorial hairline rule with an optional small-caps mono label
// floating on the left (and a counter on the right).
//
// Usage:
//   <Rule />
//   <Rule label="01 — Observation" />
//   <Rule label="Observation" right="2026" />

export default function Rule({ label, right, strong = false, className = '' }) {
  const cls = ['rule', strong ? 'rule-strong' : '', className].filter(Boolean).join(' ');
  if (!label && !right) return <hr className={cls} />;
  return (
    <div className={`rule-row ${className}`.trim()}>
      {label ? <span className="mono rule-row-l">{label}</span> : <span />}
      <span className={strong ? 'rule-line rule-line-strong' : 'rule-line'} />
      {right ? <span className="mono rule-row-r">{right}</span> : <span />}
    </div>
  );
}
