import { useEffect, useState } from 'react';

// Returns whether `ref.current` is currently intersecting the viewport.
// Pass `rootMargin` to start the in-view state a bit before the element actually enters.
export function useInView(ref, { rootMargin = '200px', threshold = 0 } = {}) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}

// Cap devicePixelRatio so DPR 3+ devices don't pay a 9× pixel cost.
export const cappedDpr = () =>
  Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
