const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
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
      margin: ["responsive", "hover"],
      padding: ["hover"],
      dropShadow: ["responsive", "hover", "focus", "active", "group-hover"],
    },
  },
  plugins: [],
};
