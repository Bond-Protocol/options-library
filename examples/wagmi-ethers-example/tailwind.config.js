/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
      themes: ["light", "dark"],
    }
  }