/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04070c",
          900: "#060b14",
          850: "#080f1c",
          800: "#0a1524",
          700: "#0d1b2e",
          600: "#122438",
          500: "#17304a",
        },
        teal: {
          300: "#7fe9db",
          400: "#4fd8c4",
          500: "#2dd4bf",
          600: "#17b8a3",
          700: "#0f9488",
        },
        aqua: {
          300: "#7ff0c8",
          400: "#4be0a8",
          500: "#34d399",
          600: "#1fb87f",
        },
        azure: {
          400: "#5aa9f2",
          500: "#3b82d6",
        },
        mist: {
          50: "#f5faf9",
          100: "#e7f3f1",
          300: "#b9cdd0",
          500: "#7c93a0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display SC", "Georgia", "serif"],
      },
      backgroundImage: {
        "grid-glow":
          "linear-gradient(to bottom, rgba(45,212,191,0.08), transparent 60%)",
        "aurora-gradient":
          "radial-gradient(60% 60% at 20% 20%, rgba(45,212,191,0.25), transparent 60%), radial-gradient(50% 50% at 80% 30%, rgba(52,211,153,0.18), transparent 60%), radial-gradient(60% 60% at 50% 90%, rgba(59,130,214,0.18), transparent 60%)",
        "text-gradient": "linear-gradient(90deg, #7fe9db 0%, #4be0a8 45%, #5aa9f2 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(45,212,191,0.35)",
        "glow-sm": "0 0 20px rgba(45,212,191,0.25)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        // "both" fill-mode matters here: without it, a delayed animation
        // shows the element's plain (opacity: 1) base style until the delay
        // elapses, then jumps straight to the 0% keyframe — reading as a
        // hard blink instead of a fade. "both" holds the 0% value through
        // the delay so it eases in smoothly from the very first frame.
        twinkle: "twinkle var(--twinkle-duration, 3s) ease-in-out infinite both",
        drift: "drift var(--drift-duration, 7s) ease-in-out infinite both",
        marquee: "marquee 55s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "var(--star-min, 0.2)" },
          "50%": { opacity: "var(--star-max, 0.95)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(var(--drift-x, 3px), var(--drift-y, 3px))" },
        },
      },
    },
  },
  plugins: [],
};
