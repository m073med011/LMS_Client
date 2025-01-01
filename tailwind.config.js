/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#2563EB',
        accent: '#FACC15',
        background: '#F9FAFB',
        textDark: '#111827',
        textLight: '#4B5563',
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "sans-serif"],
      },
  },
  plugins: [],
}
}