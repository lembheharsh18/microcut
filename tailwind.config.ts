import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a0f1e",
          800: "#0d1526",
          700: "#111d35",
          600: "#162344",
          500: "#1b2a52",
        },
        steel: {
          600: "#1e4d8c",
          500: "#2563a8",
          400: "#3b82c4",
          300: "#60a5d8",
          200: "#93c5e8",
          100: "#bfdbf0",
        },
        accent: "#e8720c",
        surface: "#141b2d",
      },
    },
  },
  plugins: [],
};

export default config;
