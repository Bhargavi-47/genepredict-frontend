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
        // Primary clinical blue — desaturated, restrained, reads as
        // instrument/system-of-record rather than consumer-startup teal.
        navy: {
          DEFAULT: "#1D4E6B",
          dark: "#0B1220",
          light: "#3E6E86",
        },
        // Muted steel-teal, used sparingly for interactive accents only.
        teal: {
          DEFAULT: "#2B6E7E",
          dark: "#1F5560",
          light: "#6B98A4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F3F6F7",
          border: "#D8DEE3",
        },
        // Semantic signal colors — deliberately muted/serious, not
        // bright dashboard red/amber/green.
        accent: {
          green: "#1E7A46",
          amber: "#A8631A",
          red: "#B3261E",
        },
        ink: {
          DEFAULT: "#0B1220",
          secondary: "#4A5B6B",
          faint: "#7C8894",
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
