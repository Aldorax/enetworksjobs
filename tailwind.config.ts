import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-purple-light": "#653DF5",
        "primary-purple": "#4E32B5",
        "primary-purple-dark": "#2C1B6A",
        "primary-orange-light": "#f44336",
        "primary-orange": "#dd9449",
        "primary-orange-dark": "#b73c38",

        "gray-100": "#F5F6FA",
        "gray-200": "#DFE1E8",
        "gray-300": "#C0C3CC",
        "gray-400": "#ABAFBA",
        "gray-500": "#979BA6",
        "gray-600": "#787C87",
        "gray-700": "#5C5F69",
        "gray-800": "#393B42",
        "gray-850": "#232529",
        "gray-900": "#0A0B0D",
        "gray-950": "#030009"
      },
      spacing: {
        "18": "4.5rem",
        "34": "8.5rem"
      },
      fontSize: {
        "1.5xl": "1.375rem",
        "4.5xl": "2.5rem",
        "5.5xl": "3.5rem"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config