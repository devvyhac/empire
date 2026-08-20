/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Obsidian + Electric Blue" Dedicated Theme Tokens
        obsidian: {
          bg: "#0B0F14",
          surface: "#111820",
          elevated: "#17212B",
          border: "#24303C",
          text: "#F1F5F9",
          secondary: "#94A3B8",
          accent: "#3B82F6",
          accentHover: "#60A5FA",
          success: "#22C55E",
          error: "#EF4444",
        },

        // Overrides so dark:bg-gray-900, dark:border-gray-700, etc. seamlessly adopt the Obsidian Palette
        gray: {
          950: "#070A0E",
          900: "#0B0F14", // Obsidian Background
          850: "#0E141B",
          800: "#111820", // Obsidian Surface / Cards
          750: "#141D26",
          700: "#17212B", // Obsidian Elevated Surface
          600: "#24303C", // Obsidian Borders
          500: "#64748B",
          400: "#94A3B8", // Obsidian Secondary Text
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9", // Obsidian Primary Text
          50: "#F8FAFC",
        },

        // Electric Blue Accent System
        indigo: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA", // Electric Blue Hover
          500: "#3B82F6", // Electric Blue Accent
          600: "#3B82F6", // Electric Blue Buttons & Active States
          700: "#2563EB",
          800: "#1D4ED8",
          900: "#1E3A8A",
          950: "#17212B", // Elevated dark blue container
        },

        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA", // Electric Blue Hover
          500: "#3B82F6", // Electric Blue Accent
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        // Semantic Role Aliases
        "primary-light": "#3B82F6",
        "primary-dark": "#3B82F6",
        "primary-hover": "#60A5FA",
        "secondary-light": "#3B82F6",
        "secondary-dark": "#60A5FA",
        "success-light": "#22C55E",
        "success-dark": "#22C55E",
        "error-light": "#EF4444",
        "error-dark": "#EF4444",
        "accent-light": "#3B82F6",
        "accent-dark": "#60A5FA",
      },
    },
  },
  plugins: [],
};
