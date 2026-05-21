// WebGL availability detector. Used by Globe/index.jsx to choose between
// the cobe WebGL globe (preferred) and the SVG fallback. Cached after the
// first check.

let cached;

export function hasWebGL() {
  if (cached !== undefined) return cached;
  if (typeof window === 'undefined') return (cached = false);
  try {
    const canvas = document.createElement('canvas');
    cached = Boolean(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl'),
    );
  } catch {
    cached = false;
  }
  return cached;
}
