/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c3882',
          dim: '#222B67FF',
        },
        text: {
          DEFAULT: '#fceae3',
          secondary: '#c4b2ab',
          tertiary: '#9A8A84FF',
        },
        accent: '#FFB029',
        background: {
          DEFAULT: '#2f66c4',
        },

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