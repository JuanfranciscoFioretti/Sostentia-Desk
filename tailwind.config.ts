import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Sostentia Desk primary color
        primary: {
          50: "#f6fae8",
          100: "#ebf4c7",
          200: "#dae992",
          300: "#c4db54",
          400: "#a0c544", // Main brand color
          500: "#88a839",
          600: "#6a842b",
          700: "#506524",
          800: "#425122",
          900: "#384621",
          950: "#1c260d",
        },
        // Space gradients colors
        space: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          pink: "#EC4899",
          indigo: "#6366F1",
        },
        // Glass surfaces
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.1)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "space-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "space-gradient-2": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "space-gradient-3": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "space-gradient-animated": "linear-gradient(135deg, var(--space-purple) 0%, var(--space-blue) 25%, var(--space-cyan) 50%, var(--space-pink) 75%, var(--space-indigo) 100%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "80px",
        "5xl": "100px",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        "glow": "0 0 20px rgba(160, 197, 68, 0.5)",
        "glow-lg": "0 0 40px rgba(160, 197, 68, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
