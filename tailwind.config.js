/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
          'red': '#f04f4f',
          'red-dim': '#A43535FF',
        },
        background: {
          DEFAULT: '#181818',
        },

        boxShadow: {
          'primary': '0 16px 24px rgba(256, 256, 256, 1)',
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