/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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