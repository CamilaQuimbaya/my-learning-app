// Genera los íconos PNG de la PWA a partir de src/app/icon.svg.
// - icon-192.png / icon-512.png: íconos "any" (el SVG ya trae su fondo redondeado).
// - icon-maskable-512.png: versión con padding (safe zone) y fondo sólido para Android.
// - apple-touch-icon.png: 180x180 con fondo sólido (iOS no respeta transparencia).
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "..", "src", "app", "icon.svg");
const DEST = path.join(__dirname, "..", "public");
const BG = "#120a1f"; // mismo fondo del logo

(async () => {
  const svg = fs.readFileSync(SRC);

  // Íconos "any": el propio SVG ya tiene esquinas redondeadas y fondo.
  for (const size of [192, 512]) {
    await sharp(svg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(DEST, `icon-${size}.png`));
    console.log(`icon-${size}.png ✓`);
  }

  // Maskable: el ícono ocupa ~80% centrado sobre fondo sólido (safe zone de Android).
  const inner = Math.round(512 * 0.8);
  const pad = Math.round((512 - inner) / 2);
  const logo = await sharp(svg, { density: 384 }).resize(inner, inner).png().toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: BG },
  })
    .composite([{ input: logo, top: pad, left: pad }])
    .png()
    .toFile(path.join(DEST, "icon-maskable-512.png"));
  console.log("icon-maskable-512.png ✓");

  // Apple touch icon: 180x180 con fondo sólido, sin padding extra.
  await sharp({
    create: { width: 180, height: 180, channels: 4, background: BG },
  })
    .composite([
      {
        input: await sharp(svg, { density: 384 }).resize(180, 180).png().toBuffer(),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toFile(path.join(DEST, "apple-touch-icon.png"));
  console.log("apple-touch-icon.png ✓");

  console.log("✓ íconos generados en /public");
})();
