/**
 * Builds web-ready images in public/assets from the originals recovered
 * from the old site (legacy-site/assets).
 *
 *   npm run images
 *
 * - hero photos -> WebP, max 1920px wide
 * - logo -> 156px PNG (shown at 52px, 3x for retina)
 * - favicons and the Open Graph image are copied as-is
 */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("legacy-site/assets");
const OUT = path.resolve("public/assets");

const HERO_MAX_WIDTH = 1920;
const HERO_QUALITY = 74;
const LOGO_SIZE = 156;

const HERO_IMAGES = ["hero", "hero-5", "hero-4", "hero-3", "hero-1", "hero-7"];
const COPY_AS_IS = [
  "hero.jpg", // og:image for social previews
  "favicon-16.png",
  "favicon-32.png",
  "apple-touch-icon.png",
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const name of HERO_IMAGES) {
    const info = await sharp(path.join(SRC, `${name}.jpg`))
      .resize({ width: HERO_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: HERO_QUALITY })
      .toFile(path.join(OUT, `${name}.webp`));
    console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }

  const logo = await sharp(path.join(SRC, "tmc-logo.png"))
    .resize(LOGO_SIZE, LOGO_SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "tmc-logo.png"));
  console.log(`tmc-logo.png  ${logo.width}x${logo.height}  ${Math.round(logo.size / 1024)} KB`);

  for (const file of COPY_AS_IS) {
    await copyFile(path.join(SRC, file), path.join(OUT, file));
  }
  console.log(`copied: ${COPY_AS_IS.join(", ")}`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});
