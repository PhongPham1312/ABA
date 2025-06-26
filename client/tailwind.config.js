/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '70' : '70%',
        '100' : '100%'
      },
      backgroundColor: {
        primary: "ffff",
        secondary: "000000"
      }
    },
  },
  plugins: [],
}

