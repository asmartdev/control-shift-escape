const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active", "disabled"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true,
  },
};
