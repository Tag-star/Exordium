import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8F3",
          100: "#F5EEE2",
          200: "#EDE1CC",
        },
        wood: {
          300: "#C9A57C",
          400: "#B08655",
          500: "#8B5E3C",
          600: "#6E4A2E",
          700: "#523620",
        },
        charcoal: {
          800: "#2B2420",
          900: "#1C1712",
        },
        gold: {
          400: "#D4AF37",
          500: "#C9A227",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(43, 36, 32, 0.25)",
        card: "0 4px 20px -4px rgba(43, 36, 32, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
