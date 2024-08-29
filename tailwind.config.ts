import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  safelist: ["text-primary"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        100: "100",
      },
      backgroundColor: {
        testShit: "linear-gradient(var(--background), var(--foreground))",
      },
      backgroundImage: {
        desert: "url('../../public/blurred-bw-sand.png')",
        desertx: "url('../../public/blurred-bw-sand-x.png')",
      },
      colors: {
        shit: "hsl(var(--border))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        bgblack: "hsl(240 9% 9%)",
        foreground: "hsl(var(--foreground))",
        op0: "rgba(255,255,255,0)",
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
        soft: {
          DEFAULT: "hsl(var(--soft-foreground))",
          foreground: "hsl(var(--soft-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          primary: "hsl(var(--muted-primary))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
        },
        fontFamily: {
          // @ts-expect-error
          sans: ["var(--font-sans)", ...fontFamily.sans],
          // @ts-expect-error
          mono: ["var(--font-mono)", ...fontFamily.mono],
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "color-icons": {
          "0%": {
            color: "hsl(var(--primary))",
            transform: "scale(0.98)",
          },
          "50%": {
            color: "hsl(var(--foreground))",
            transform: "scale(0.96)",
          },
          "100%": {
            color: "hsl(var(--primary))",
            transform: "scale(0.98)",
          },
        },
        "pulse-bg": {
          "0%": {
            transform: "scale(0.98)",
          },
          "50%": {
            transform: "scale(0.96)",
          },
          "100%": {
            transform: "scale(0.98)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "move-up": {
          from: { "object-position": "center" },
          to: { "object-position": "top" },
        },
        float: {
          "0%": {
            transform: "scale(1) translateY(50vh) translateX(30vw)",
          },
          "30%": {
            transform: "scale(0.9) translateY(10vh) translateX(90vw)",
          },
          "50%": {
            transform: "scale(1) translateY(90vh) translateX(90vw)",
          },
          "80%": {
            transform: "scale(1.5) translateY(30vh) translateX(40vw)",
          },
          "100%": {
            transform: "scale(1) translateY(50vh) translateX(30vw)",
          },
        },
      },
      animation: {
        "color-icons": "color-icons 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-bg": "pulse-bg 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "move-up": "move-up 10s ease-out",
        float: "float 20s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
  ],
} satisfies Config;

export default config;
