const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'public', 'images', 'Home');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'Home');

const TARGET_WIDTH_WEBP = 2000;
const TARGET_WIDTH_JPG = 2000;
const QUALITY_WEBP = 82;
const QUALITY_JPG = 84;

async function compressOne(srcPath, dstPathWebp, dstPathJpg) {
  const pipeline = sharp(srcPath, { failOn: 'none', sequentialRead: true })
    .rotate()
    .resize({ width: TARGET_WIDTH_WEBP, withoutEnlargement: true, fit: 'inside' });

  await pipeline
    .clone()
    .webp({ quality: QUALITY_WEBP, effort: 6, preset: 'photo', smartSubsample: true })
    .toFile(dstPathWebp);

  await pipeline
    .clone()
    .jpeg({ quality: QUALITY_JPG, mozjpeg: true, progressive: true, optimizeScans: true })
    .toFile(dstPathJpg);
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const originals = fs
    .readdirSync(SRC_DIR)
    .filter(
      (f) =>
        (f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png')) &&
        !f.endsWith('.optimized.jpg') &&
        !f.endsWith('.optimized.webp')
    )
    .sort();

  console.log(`\n🖼️ Found ${originals.length} source images to optimize.\n`);
  let totalOrig = 0;
  let totalNew = 0;

  for (const file of originals) {
    const src = path.join(SRC_DIR, file);
    const base = file.replace(/\.[^.]+$/, '');
    const webpName = `${base}.webp`;
    const jpgName = `${base}.optimized.jpg`;
    const dstWebp = path.join(OUT_DIR, webpName);
    const dstJpg = path.join(OUT_DIR, jpgName);

    const origKB = fs.statSync(src).size / 1024;
    totalOrig += origKB;

    try {
      await compressOne(src, dstWebp, dstJpg);
      const webpKB = fs.statSync(dstWebp).size / 1024;
      const jpgKB = fs.statSync(dstJpg).size / 1024;
      const smallerKB = Math.min(webpKB, jpgKB);
      totalNew += smallerKB;
      const ratio = ((1 - smallerKB / origKB) * 100).toFixed(1);

      console.log(
        `  ✅ ${file.padEnd(28)} ${origKB.toFixed(0).padStart(6)} KB  →  webp: ${webpKB.toFixed(0).padStart(5)} KB, jpg: ${jpgKB.toFixed(0).padStart(5)} KB   (-${ratio}%)`
      );
    } catch (e) {
      console.error(`  ❌ ${file}:`, e.message);
    }
  }

  console.log(`\n📦 Total:   ${(totalOrig).toFixed(0)} KB  →  ${(totalNew).toFixed(0)} KB   (-${((1 - totalNew / totalOrig) * 100).toFixed(1)}%)`);
  console.log(`\n✅ Done. Optimized WebP + JPG written to ${OUT_DIR}\n`);
})();
