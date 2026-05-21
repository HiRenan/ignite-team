import { useState } from 'react';
import { hasWebGL } from '../../lib/webgl.js';
import GlobeSVG from './Globe.jsx';
import OrbitalGlobe from './OrbitalGlobe.jsx';

// Picks between the WebGL globe (cobe) and the SVG fallback on mount.
// hasWebGL() is synchronous and safe to call in a useState initializer,
// so the first render already knows which globe to mount — no flicker.
export default function Globe() {
  const [webgl] = useState(() => hasWebGL());
  return webgl ? <OrbitalGlobe /> : <GlobeSVG />;
}
