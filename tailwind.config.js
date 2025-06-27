/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ This is correct
  ],
  darkMode: "class", // ✅ Move this outside of 'content'
  theme: {
    extend: {},
  },
  plugins: [],
}
