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
        obsidian: "#08080A",
        carbon: "#0E0E13",
        graphite: "#17171F",
        surface: "#1D1D28",
        borderDark: "#262635",
        crimson: {
          DEFAULT: "#E5383B",
          glow: "#FF4D4D",
          dark: "#A31621",
        },
        amber: {
          DEFAULT: "#E5A853",
          gold: "#D4AF37",
        },
        offWhite: "#F5F5F7",
        muted: "#8E8E9A",
        subtle: "#5A5A66",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: ".25em",
        cinematic: ".35em",
        ultra: ".5em",
      },
      aspectRatio: {
        anamorphic: "2.39 / 1",
        cinema: "16 / 9",
        editorial: "4 / 5",
        portrait: "3 / 4",
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marqueeReverse 35s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "ambient-drift-1": "ambientDrift1 24s ease-in-out infinite alternate",
        "ambient-drift-2": "ambientDrift2 30s ease-in-out infinite alternate",
        "ambient-drift-3": "ambientDrift3 26s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.9 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ambientDrift1: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(35px, -25px) scale(1.08)" },
          "100%": { transform: "translate(-20px, 20px) scale(0.96)" },
        },
        ambientDrift2: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-30px, 30px) scale(1.06)" },
          "100%": { transform: "translate(25px, -15px) scale(0.94)" },
        },
        ambientDrift3: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(20px, 35px) scale(1.05)" },
          "100%": { transform: "translate(-25px, -20px) scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};
