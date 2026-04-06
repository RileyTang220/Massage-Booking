import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151718",
        sand: "#f4ece2",
        clay: "#c96d42",
        moss: "#52614f",
        mist: "#eff4f1"
      },
      boxShadow: {
        card: "0 24px 80px rgba(21, 23, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
