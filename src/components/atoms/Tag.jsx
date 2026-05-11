export function Tag({ children, hot = false }) {
  return <span className={`tag${hot ? ' hot' : ''}`}>{children}</span>;
}
