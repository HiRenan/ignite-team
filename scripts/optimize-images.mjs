// One-time / re-runnable hero + detection image build.
// Converts the heavy source PNGs (repo ROOT) into web-ready AVIF + WebP +
// compressed PNG at two widths, written to public/assets/.
//
// ── HOW TO SWAP THE HERO / DETECTION IMAGES LATER ────────────────────────────
//   1. Replace sem-risco.png and/or com-risco.png in the repo ROOT
//      (keep the SAME filenames; keep them pixel-aligned, same 16:9 framing).
//   2. Run:  npm run images
//   3. Done — the <picture> tags in Hero.jsx / DetectionSection.jsx already
//      point at the generated files, so nothing else needs editing.
//
//   sem-risco = "normal" satellite view      (hero default / before)
//   com-risco = AI detection, risk in orange (hero reveal  / after)
// ─────────────────────────────────────────────────────────────────────────────

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'assets');
const WIDTHS = [1672, 960]; // desktop/retina master + phone/tablet
const SOURCES = [
  { file: 'sem-risco.png', base: 'sem-risco' },
  { file: 'com-risco.png', base: 'com-risco' },
];

async function kb(p) {
  try {
    return Math.round((await stat(p)).size / 1024);
  } catch {
    return '?';
  }
}

await mkdir(OUT, { recursive: true });

for (const { file, base } of SOURCES) {
  const input = path.join(ROOT, file);
  console.log(`\n· ${file}  (${await kb(input)} KB source)`);
  for (const w of WIDTHS) {
    const pipeline = sharp(input).resize({ width: w, withoutEnlargement: true });
    const avif = path.join(OUT, `${base}-${w}.avif`);
    const webp = path.join(OUT, `${base}-${w}.webp`);
    const png = path.join(OUT, `${base}-${w}.png`);
    // AVIF: best compression for photographic satellite imagery.
    await pipeline.clone().avif({ quality: 50, effort: 5 }).toFile(avif);
    // WebP: broad-support fallback.
    await pipeline.clone().webp({ quality: 72 }).toFile(webp);
    // PNG: last-resort fallback for ancient browsers.
    await pipeline.clone().png({ compressionLevel: 9, quality: 80 }).toFile(png);
    console.log(
      `  ${w}w →  avif ${await kb(avif)}  ·  webp ${await kb(webp)}  ·  png ${await kb(png)}  (KB)`,
    );
  }
}

console.log('\n✓ Optimized images written to public/assets/\n');
