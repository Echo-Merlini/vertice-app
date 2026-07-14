/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        serif: ["Newsreader", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink: "#17191F",
        deepink: "#0C0D11",
        slate: "#5C616D",
        brass: "#A15E1E",
        brassLight: "#E0A24C",
        paper: "#F6F6F8",
        face: {
          1: "#3A3E48",
          2: "#2C2F37",
          3: "#22242B",
          4: "#191B21",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em",
      },
    },
  },
  plugins: [],
};
