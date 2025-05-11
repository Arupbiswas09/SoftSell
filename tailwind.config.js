/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#59afff',
          500: '#2b8aff',
          600: '#1a6ff7',
          700: '#1257e4',
          800: '#1547b9',
          900: '#173e91',
          950: '#122759',
        },
        secondary: {
          50: '#eefcfa',
          100: '#d5f6f2',
          200: '#aeece6',
          300: '#7adcd4',
          400: '#41c3bd',
          500: '#26a8a1',
          600: '#1e8885',
          700: '#1c6d6c',
          800: '#1c5757',
          900: '#1a4949',
          950: '#0c2b2b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.75s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};