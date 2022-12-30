/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#05386B" /* imperial-blue */,
        secondary: "#ff6584",
        // secondary: {
        //   /* emerald-green */ 100: "#EDF5E1",
        //   200: "#8EE4AF",
        //   300: "#5CDB95",
        //   400: "#379683",
        // },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
