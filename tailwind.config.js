/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('/public/logo512.png')",
        greeting: "url('/public/greeting.jpg')",
        house: "url('/public/house.jpg')",
      },
      colors: {
        'yaring-blue': '#0d2e37',
        'yaring-orange': '#c08448',
      },
    },
  },
  plugins: [],
};
