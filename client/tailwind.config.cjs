/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000133",
        secondary: "#448ee4",
        tertiary: "#7F1D1D",
      },
    },
  },
  plugins: [],
}
