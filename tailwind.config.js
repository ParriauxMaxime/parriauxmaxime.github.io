/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(var(--shake-x, -2px)) rotate(var(--shake-r, -0.5deg))' },
          '75%': { transform: 'translateX(var(--shake-x-inv, 2px)) rotate(var(--shake-r-inv, 0.5deg))' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      colors: {
        primary: colors.neutral[900],
        'primary-dark': colors.neutral[50],
        secondary: colors.zinc[400],
        'secondary-dark': colors.zinc[500],
        accent: {
          50: 'hsl(var(--accent-hue) 100% 98%)',
          100: 'hsl(var(--accent-hue) 91% 95%)',
          200: 'hsl(var(--accent-hue) 95% 90%)',
          300: 'hsl(var(--accent-hue) 95% 82%)',
          400: 'hsl(var(--accent-hue) 92% 76%)',
          500: 'hsl(var(--accent-hue) 90% 66%)',
          600: 'hsl(var(--accent-hue) 83% 58%)',
          700: 'hsl(var(--accent-hue) 70% 50%)',
          800: 'hsl(var(--accent-hue) 69% 42%)',
          900: 'hsl(var(--accent-hue) 67% 35%)',
        },
        surface: {
          light: colors.white,
          dark: colors.zinc[900],
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
