/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode using a class
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
        blue: '#1A80E5',
        btn: '#E8EDF2',
        secondary: '#2563EB',
        accent: '#FACC15',

        // Light mode colors
        background: 'wihite',
        textDark: '#111827',
        textLight: '#4B5563',
        borderLight: '#E5E7EB',

        // Dark mode colors
        darkBackground: '#1F2937',
        darkText: '#F3F4F6',
        darkBorder: '#374151',
        darkBtn: '#4B5563',
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "sans-serif"],
      },
      borderRadius: {
        sm: '12px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      width: {
        sm: '16rem',
        md: '32rem',
        lg: '48rem',
        xl: '64rem',
        full: '100%',
      },
      height: {
        sm: '16rem',
        md: '32rem',
        lg: '48rem',
        xl: '64rem',
        screen: '100vh',
      },
      padding: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      margin: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
}
