module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ownPurlpe: "#6A097D",
        sweetblack: "#0a0a0a",
        slowblack: "#2b2b2b",
        lowestblack: "#474747"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")]
}
