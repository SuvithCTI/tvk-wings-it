/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tvk: {
          red: "#C6151B",
          darkred: "#8B0000",
          yellow: "#FECE08",
          gold: "#EAB308",
          dark: "#0F172A",
          cardDark: "#1E293B"
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        tamil: ['"Hind Madurai"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
