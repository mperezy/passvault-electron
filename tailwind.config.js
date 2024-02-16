/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pvault: {
          blue: {
            100: '##3091e0',
            700: '#0e3880',
          },
        },
        gdrive: {
          black: {
            300: '#F3F3F3',
            600: '#535353',
          },
          blue: {
            500: '#4285F4',
            700: '#0e3880',
          },
          green: {
            500: '#00AC47',
            700: '#015726',
          },
          red: {
            500: '#EA4435',
            700: '#e0200c',
          },
          yellow: {
            500: '#FFBA00',
            700: '#a17801',
          },
        }
      }
    },
  },
  plugins: [],
};

