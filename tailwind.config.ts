import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        speak: {
          navy: "#07111f",
          blue: "#3b82f6",
          violet: "#8b5cf6",
          green: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
          white: "#f8fafc",
          cyan: "#22d3ee",
          ink: "#0b1628",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(59, 130, 246, 0.28)",
        "coach": "0 18px 70px rgba(239, 68, 68, 0.16)",
      },
      backgroundImage: {
        "radial-signal":
          "radial-gradient(circle at 15% 20%, rgba(59,130,246,.28), transparent 28%), radial-gradient(circle at 85% 5%, rgba(139,92,246,.20), transparent 26%), linear-gradient(180deg, #07111f 0%, #08182a 44%, #07111f 100%)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(.45)" },
          "50%": { transform: "scaleY(1)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.92)", opacity: "0.72" },
          "100%": { transform: "scale(1.24)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        wave: "wave 1.05s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.9s ease-out infinite",
        float: "float 5.5s ease-in-out infinite",
        scan: "scan 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
