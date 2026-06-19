import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          900: "#0a0a0a",
          800: "#141414",
          700: "#1d1d1d",
          600: "#2a2a2a",
        },
        bone: {
          DEFAULT: "#f5f4f0",
          200: "#eceae3",
          400: "#c9c7bf",
          600: "#8a8881",
        },
        accent: {
          DEFAULT: "#2f5bff", // electric blue — used sparingly for CTAs/active/focus
          600: "#2147e6",
          400: "#5b7cff", // brighter, for dark backgrounds
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(3.5rem, 1rem + 12vw, 16rem)", { lineHeight: "0.86", letterSpacing: "-0.04em" }],
        hero: ["clamp(2.75rem, 1rem + 8vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        display: ["clamp(2rem, 1rem + 4vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        ultra: "0.4em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
