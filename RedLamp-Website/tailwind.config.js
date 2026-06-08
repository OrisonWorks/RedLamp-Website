/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redlamp: {
          red: '#E63946',
          orange: '#F4A261',
          dark: '#0D0D0D',
          darker: '#080808',
          gray: '#1A1A1A',
          light: '#F1F1F1'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
