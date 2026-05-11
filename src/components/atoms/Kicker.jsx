export function Kicker({ children, delay = 0 }) {
  return (
    <div className="kicker reveal" style={{ '--delay': `${delay}ms` }}>
      <span className="kicker-dot" />
      {children}
    </div>
  );
}
