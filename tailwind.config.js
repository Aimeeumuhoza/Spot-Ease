/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#119DA4",
        secondary: "#29859A",
        background: "#F8F7FD",
        bg:"#F3FBFF"

      },
    },
  },
  plugins: [],
};
