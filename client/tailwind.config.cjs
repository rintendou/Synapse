/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000133",
        secondary: "#FFFFFF",
        tertiary: "#7F1D1D",
      },
    },
  },
  plugins: [],
}
