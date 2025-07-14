/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
 content: [
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/utils/**/*.{js,ts,jsx,tsx}', // kalau ingin include util/helper
],
  theme: {
    extend: {},
  },
  plugins: [],
};
