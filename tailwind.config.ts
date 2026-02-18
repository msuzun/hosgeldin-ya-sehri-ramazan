import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "night-900": "#081625",
        "night-700": "#153756",
        "gold-500": "#e5b45f",
        "gold-300": "#ffe6ac",
        "mist-200": "#dce8ef",
        "lamp-amber": "#ffbe63",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(5, 15, 30, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
