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
        terracotta: {
          DEFAULT: "#DE7356",
          50: "#FCF4F1",
          100: "#F9E6E1",
          200: "#F2C7BC",
          300: "#EBA897",
          400: "#E48E77",
          500: "#DE7356",
          600: "#C8573A",
          700: "#9E4129",
          800: "#752E1B",
          900: "#4F1D0E",
        },
        cream: {
          DEFAULT: "#F4F3EE",
          50: "#FAF9F6",
          100: "#F4F3EE",
          200: "#EAE7DD",
          300: "#DDD9CC",
          400: "#CBC5B5",
          500: "#B8B19E",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          50: "#666666",
          100: "#4D4D4D",
          200: "#383838",
          300: "#2B2B2B",
          400: "#222222",
          500: "#1A1A1A",
          600: "#141414",
          700: "#0E0E0E",
          800: "#080808",
          900: "#000000",
        },
        grayAccent: {
          DEFAULT: "#B1ADA1",
          light: "#CDC9BF",
          muted: "#949084",
          border: "#E0DDD5",
        },
        brown: {
          DEFAULT: "#5A4535",
          50: "#F7F4F1",
          100: "#EDE6DF",
          200: "#DACCC0",
          300: "#C4AEA0",
          400: "#8E6F58",
          500: "#5A4535",
          600: "#473629",
          700: "#36291E",
        },
        gold: {
          DEFAULT: "#E8D5B0",
          light: "#F7EFE0",
          dark: "#CDB58A",
        },
        sand: {
          DEFAULT: "#D4955A",
          light: "#F4DFCE",
          dark: "#B8783E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(26, 26, 26, 0.05), 0 2px 6px -1px rgba(26, 26, 26, 0.03)",
        card: "0 10px 30px -4px rgba(90, 69, 53, 0.08), 0 4px 8px -2px rgba(26, 26, 26, 0.04)",
        glow: "0 0 25px -5px rgba(222, 115, 86, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
