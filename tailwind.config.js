/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#262B2D",
        redAlert: "#F44336",
        green: "#00875F",
        background: "#F9F9F9",
        grayDark: '#4E4A49',
        blueColor: {
          base: "rgba(69, 151, 177, 1)",
          dark: "rgba(0, 94, 124, 1)",
          backgroundCard: "rgba(69, 151, 177, 0.12)",
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

