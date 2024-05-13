/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../src/assets/images/golf-background.jpg')",
      },
      colors: {
        "dark-primary-color": "var(--dark-primary-color)",
        "dark-secondary-color": "var(--dark-secondary-color)",
        "dark-hover-color": "var(--dark-hover-color)"
      },
    }
  },
  plugins: [],
}

