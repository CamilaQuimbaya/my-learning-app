// Quita el fondo (blanco) de las mascotas con flood fill desde los bordes.
// Conserva el blanco interior del gato (solo borra el fondo conectado al borde).
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = "/mnt/c/Users/camil/Downloads/material clase";
const DEST = path.join(__dirname, "..", "public", "courses");
const files = ["html.png", "css.png", "javascript.png"];
const TOL = 42; // tolerancia de color respecto al fondo de la esquina

(async () => {
  for (const f of files) {
    const { data, info } = await sharp(path.join(SRC, f))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width: w, height: h, channels: ch } = info;
    const bgr = data[0], bgg = data[1], bgb = data[2];
    const visited = new Uint8Array(w * h);
    const stack = [];

    const tryPush = (x, y) => {
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      const i = y * w + x;
      if (visited[i]) return;
      const o = i * ch;
      const d = Math.max(
        Math.abs(data[o] - bgr),
        Math.abs(data[o + 1] - bgg),
        Math.abs(data[o + 2] - bgb)
      );
      if (d <= TOL) {
        visited[i] = 1;
        stack.push(i);
      }
    };

    for (let x = 0; x < w; x++) { tryPush(x, 0); tryPush(x, h - 1); }
    for (let y = 0; y < h; y++) { tryPush(0, y); tryPush(w - 1, y); }

    while (stack.length) {
      const i = stack.pop();
      const x = i % w, y = (i / w) | 0;
      tryPush(x + 1, y); tryPush(x - 1, y); tryPush(x, y + 1); tryPush(x, y - 1);
    }

    let removed = 0;
    for (let i = 0; i < w * h; i++) {
      if (visited[i]) { data[i * ch + 3] = 0; removed++; }
    }

    await sharp(data, { raw: { width: w, height: h, channels: ch } })
      .png()
      .toFile(path.join(DEST, f));

    console.log(
      `${f}  ${w}x${h}  fondo=[${bgr},${bgg},${bgb}]  removido=${(100 * removed / (w * h)).toFixed(1)}%`
    );
  }
  console.log("✓ listo");
})();
