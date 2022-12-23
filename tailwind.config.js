/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'white': 'white',
        'primary': '#05386B',  /* imperial-blue */
        'secondary': {  /* emerald-green */
          100: '#EDF5E1',
          200: '#8EE4AF',
          300: '#5CDB95',
          400: '#379683',
        },
      }
    }
  },
  plugins: [],
};
