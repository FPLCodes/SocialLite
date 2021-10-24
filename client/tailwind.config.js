const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Roboto"],
    },
    colors: {
      gray: colors.trueGray,
      blue: colors.blue,
    },
    extend: {},
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
      width: ["hover"],
    },
  },
  plugins: [],
};
