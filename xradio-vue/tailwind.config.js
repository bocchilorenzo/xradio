/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
      },
      maxWidth: {
        "272": "272px",
      },
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      yellow: colors.amber,
      green: colors.emerald,
      purple: colors.violet,
      nord:{
        gray1: "#2e3440", //darkest to lightest
        gray2: "#3b4252",
        gray3: "#434c5e",
        gray4: "#4c566a",
        white1: "#d8dee9", //darkest to lightest
        white2: "#e5e9f0",
        white3: "#eceff4",
        frost1: "#8fbcbb",
        frost2: "#88c0d0",
        frost3: "#81a1c1",
        frost4: "#5e81ac",
        aurora1: "#bf616a",
        aurora2: "#d08770",
        aurora3: "#ebcb8b",
        aurora4: "#a3be8c",
        aurora5: "#b48ead"
      }
    },
    },
  },
  plugins: [],
}
