/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8291f1',
        },
        secondary: {
          DEFAULT: '#95116f',
          dark: '620848',
        },
        text: {
          DEFAULT: '#d6dcfa',
          secondary: '#aeb3d1',
          tertiary: '#8a8fa9',
          dark: '050b29',
        },
        accent: '#e93d57',
        background: '#02030e',

        boxShadow: {
          'primary': '0 16px 24px rgba(74, 144, 226, 0.5)',
        },
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-180%)' },
        },
        expand: {
          '0%': {
            transform: 'scale(1) translate(0, 0)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(3) translate(0, 0)',
            opacity: 0,
          },
        },
      },
      
      animation: {
        scroll: 'scroll 45s linear infinite',
        expand: 'expand 0.6s forwards ease-in-out',
      },

    },
  },
  plugins: [],
}