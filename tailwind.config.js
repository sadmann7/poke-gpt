/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      screens: {
        xxs: "320px",
        xs: "480px",
      },
      animation: {
        swing: "swing 3000ms infinite",
      },
      keyframes: {
        swing: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "10%": {
            transform: "rotate(10deg)",
          },
          "30%": {
            transform: "rotate(-10deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
