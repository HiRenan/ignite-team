import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

const COUNTABLE = /^(\D*)(\d+)(\D*)$/;

// Renders a stat string. If the string contains exactly one digit run
// flanked by non-digit prefix/suffix (e.g. "70%", "−85%", "10×"), the
// digits count up from 0 to the target on viewport enter. Otherwise the
// raw string is rendered as-is — "24/7", "R$ bi", "∞" pass through.
export default function CountStat({ value, className }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const match = typeof value === 'string' ? value.match(COUNTABLE) : null;
  const target = match ? parseInt(match[2], 10) : null;
  const prefix = match ? match[1] : '';
  const suffix = match ? match[3] : '';

  const [display, setDisplay] = useState(() => {
    if (target == null || reducedMotion) return value;
    return `${prefix}0${suffix}`;
  });

  useEffect(() => {
    if (target == null || reducedMotion) {
      setDisplay(value);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        setDisplay(`${prefix}${Math.round(latest)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix, value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
