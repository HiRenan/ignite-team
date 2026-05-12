export function Footer({ t }) {
  return (
    <footer className="footer">
      <span className="mono">{t.footer.rights}</span>
      <span className="footer-brand">
        <span className="dot" aria-hidden="true" />
        ignite
      </span>
      <span className="mono footer-right">{t.footer.origin}</span>
    </footer>
  );
}
