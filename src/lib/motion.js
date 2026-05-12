// Shared Motion variants — keep the page's animation vocabulary in one place.

const EASE_OUT_EDITORIAL = [0.2, 0.8, 0.2, 1];

// Hero entrance — headline lines rise individually with stagger.
export const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const heroLineRise = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EDITORIAL },
  },
};

export const heroFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EDITORIAL },
  },
};

// Section scroll reveals — fast and snappy (200 ms, 8 px) so scrolling
// never sees empty rectangles. Replaces the 1.1 s / 40 px reveal-up
// that made the previous build feel broken.
export const sectionReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_OUT_EDITORIAL },
  },
};

export const sectionContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// Number/stat reveal — subtle rise + scale for editorial specimens.
export const statRise = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EDITORIAL },
  },
};

// Shared in-view config — trigger once when 30% visible, no rootMargin
// since our staggered children get earlier visibility via the parent.
export const viewportOnce = { once: true, amount: 0.3 };
