/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#262626',
          dim: '000000',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#a0a0a0',
          tertiary: '#808080',
        },
        accent:{
          'yellow': '#FFB029',
          'yellow-dim': '#AE781AFF',
          'red': '#ff3744',
          'red-dim': '#b72831',
        },
        background: {
          DEFAULT: '#181818',
        },
      },
      boxShadow: {
        glow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.3)',
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* For WebKit browsers */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari */
          },
        },
      });
    },
  ],
}
