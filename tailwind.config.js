/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F4C81",
          dark: "#0B1F33",
          light: "#3D6E9E",
        },
        teal: {
          DEFAULT: "#00A8A8",
          dark: "#00807F",
          light: "#5FC9C9",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F4F6F8",
          border: "#E2E8ED",
        },
        accent: {
          green: "#16A34A",
          amber: "#D97706",
          red: "#DC2626",
        },
        ink: {
          DEFAULT: "#0B1F33",
          secondary: "#5B6B79",
          faint: "#8B99A6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "track-scan": {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "track-scan": "track-scan 3.2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
