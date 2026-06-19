import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta cyberpunk rosa + kawaii (misma del portafolio de Camila)
        ink: "#0a0612",
        ink2: "#120a1f",
        base: {
          950: "#0a0612",
          900: "#120a1f",
          800: "#1b1030",
          700: "#261642",
        },
        neon: {
          pink: "#ff4fd8", // rosa neón principal
          hot: "#ff2d95", // rosa caliente
          magenta: "#ff2d95", // alias
          purple: "#a855f7", // morado
          violet: "#7c3aed", // violeta profundo
          cyan: "#22d3ee", // cian acento
          lilac: "#e0aaff", // lila suave kawaii
          lime: "#7dffb3", // menta para feedback "correcto"
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["ui-monospace", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,79,216,0.45)",
        "glow-lg": "0 0 60px rgba(168,85,247,0.45)",
        glass: "0 8px 32px rgba(124,58,237,0.25)",
        neon: "0 0 24px rgba(255,79,216,0.45)",
        "neon-cyan": "0 0 24px rgba(34,211,238,0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        floaty: "floaty 4s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
