/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Manrope"],
    },
    extend: {
      colors: {
        "spotless-green": "#29A053",
        "spotless-dark-green": "#1f783e",
      },
    },
  },
  plugins: [],
};
