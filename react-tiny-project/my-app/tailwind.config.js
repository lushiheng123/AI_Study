/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0284c7',
        },
        surface: {
          50: '#ffffff',
          100: '#f3f4f6',
        }
      }
    },
  },
  plugins: [],
}