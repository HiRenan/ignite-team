import { useEffect } from 'react';

// Scroll-triggered reveal — adds .in to .reveal / .reveal-up elements when they enter the viewport.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-up');
    if (els.length === 0) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
