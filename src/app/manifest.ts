import type { MetadataRoute } from "next";

// Manifest de la PWA. Next.js lo sirve en /manifest.webmanifest y enlaza
// automáticamente desde el <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Camikaze Learn — Aprende desarrollo web",
    short_name: "Camikaze",
    description:
      "Plataforma didáctica para aprender HTML, CSS y JavaScript con teoría, lecturas y ejercicios interactivos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0a0612",
    theme_color: "#120a1f",
    lang: "es",
    dir: "ltr",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
