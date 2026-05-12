// Big editorial plate numeral — e.g. "01" / "02" / …
// Renders the number outlined (stroke-only) so it acts as
// background scenery rather than fighting the headline.

export default function PlateNumber({ value, label, className = '' }) {
  return (
    <div className={`plate ${className}`.trim()}>
      <span className="plate-num" aria-hidden="true">
        {value}
      </span>
      {label ? (
        <span className="plate-label mono">{label}</span>
      ) : null}
    </div>
  );
}
