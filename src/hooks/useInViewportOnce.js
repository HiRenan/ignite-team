import { useEffect, useRef, useState } from 'react';

// Returns [ref, hasEntered]. Flips hasEntered to true the FIRST time the
// referenced element scrolls into view, then disconnects the observer.
//
// Used to defer heavy mounts (e.g. the WebGL globe / future Spline scene) until
// the user is about to reach them — keeping that work off the initial load and
// out of the LCP path. rootMargin pre-warms it slightly before it's visible.
export function useInViewportOnce({ rootMargin = '200px', threshold = 0.01 } = {}) {
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    // No IntersectionObserver (ancient browser / SSR): just mount immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setEntered(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
    // Only re-run until we've entered once; rootMargin/threshold are captured
    // on first run, which is all we need.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  return [ref, entered];
}
