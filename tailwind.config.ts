import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f3",
          100: "#dcede4",
          200: "#badcca",
          300: "#8ec3a8",
          400: "#5ea384",
          500: "#3d8566",
          600: "#2d6a50",
          700: "#255541",
          800: "#1B4332",
          900: "#163827",
          950: "#0d2118",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf0cc",
          200: "#f5df95",
          300: "#efc858",
          400: "#e8b02a",
          500: "#D4A017",
          600: "#b87d10",
          700: "#935b10",
          800: "#794814",
          900: "#663c15",
          950: "#3b1f07",
        },
        cream: "#FDF6EC",
        sand: "#C9A96E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #1B4332 0%, #255541 50%, #2d6a50 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4A017 0%, #C9A96E 100%)",
        "gradient-page": "linear-gradient(180deg, #FDF6EC 0%, #f5ede0 100%)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(27, 67, 50, 0.12), 0 1px 4px rgba(27, 67, 50, 0.06)",
        "card-hover":
          "0 12px 40px -8px rgba(27, 67, 50, 0.18), 0 2px 8px rgba(27, 67, 50, 0.08)",
        gold: "0 4px 24px -4px rgba(212, 160, 23, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
