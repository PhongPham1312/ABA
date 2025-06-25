/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1028' : '1028px'
      },
      backgroundColor: {
        primary: "ffff",
        secondary: "000000"
      }
    },
  },
  plugins: [],
}

