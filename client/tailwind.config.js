/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      default: ["Manrope"],
    },
    extend: {
      colors: {
        "spotless-green": "#29A053",
        "spotless-dark-green": "#1f783e",

        "facebook-blue": "#1877F2",
        "twitter-blue": "#1DA1F2",
        "instagram-purple": "#FE0077",
        "youtube-red": "#FF0000",
        "discord-purple": "#5865F2",
      },
    },
  },
};
