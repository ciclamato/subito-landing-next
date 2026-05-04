import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#7B2D8E",
          light: "#9B4DBA",
          glow: "rgba(123, 45, 142, 0.4)",
        },
        dark: {
          DEFAULT: "#0A0A0C",
          card: "#111115",
          border: "#1E1E25",
        },
        cream: {
          DEFAULT: "#F0EDE8",
          dim: "#A8A4A0",
        },
        gold: "#C9A84C",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        "grid-pulse": "gridPulse 8s ease-in-out infinite",
        bob: "bob 2s ease-in-out infinite",
        "marquee-scroll": "marqueeScroll 45s linear infinite",
      },
      keyframes: {
        gridPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        bob: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(8px)" },
        },
        marqueeScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
