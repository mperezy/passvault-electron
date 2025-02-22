/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pvault: {
          blue: {
            100: '#9eccf3',
            200: '#C0E3FF',
            500: '#3091E0',
            600: '#238cfd',
          },
          black: {
            300: '#F3F3F3',
            600: '#BEBEBE',
          },
        },
      },
    },
  },
  plugins: [],
};
