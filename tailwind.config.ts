import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f5efe2",
          light: "#faf6ec",
          dark: "#ebe3d0",
        },
        ink: {
          DEFAULT: "#1a1410",
          soft: "#3a2f28",
          mute: "#7a6f65",
        },
        wood: {
          DEFAULT: "#1f1410",
          dark: "#150c09",
          warm: "#2a1a14",
        },
        cream: {
          DEFAULT: "#f3eada",
          dark: "#e8dcc4",
        },
        granate: {
          DEFAULT: "#a52828",
          dark: "#7a1d1d",
          light: "#c43838",
        },
        gold: {
          DEFAULT: "#E1A337",
          dark: "#b8841f",
          warm: "#eab64f",
          bright: "#F0B935",
          deep: "#8a6418",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "28px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,20,16,0.06), 0 8px 24px rgba(26,20,16,0.06)",
        "card-lg": "0 4px 12px rgba(26,20,16,0.08), 0 24px 60px rgba(26,20,16,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
