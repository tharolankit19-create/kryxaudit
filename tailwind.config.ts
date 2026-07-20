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
        canvas: "#FAFAF9",
        ink: "#0A0A0A",
        flame: "#F97316",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["Satoshi", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "scan-sweep": "scan-sweep 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
