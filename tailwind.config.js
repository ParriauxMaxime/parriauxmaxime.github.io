/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        underline: {
          from: { left: '-60%' },
          to: { left: '100%' },
        },
      },
      colors: {
        primary: colors.sky[800],
        'primary-dark': colors.sky[900],
        secondary: colors.slate[300],
        'secondary-dark': colors.slate[700],
        accent: colors.lime[600],
        'accent-dark': colors.lime[800],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
