/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "stone-green": {
          // TECH: O esquema de cores centralizado facilita mudanças.
          500: "#00A868",
          600: "#166534",
        },
      },
    },
  },
  plugins: [],
};
