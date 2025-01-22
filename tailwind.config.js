/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { max: "539px" },
        sm: '540px',
        'xs-sm': { min: '540px', max: '767px' },
        'sm-lg': { min: '768px', max: '1023px' },
        md: '768px',
        'md-lg': { min: '768px', max: '1023px' },
        'md-max': { max: '1023px' },
        lg: '1024px',
        //'lg-max': { max: '1279px' },
        //'lg-xl': { min: '1024px', max: '1279px' },
        xl: '1200px',
        '2xl': '1440px'
      },
      colors: {
        textColor: "#262B2D",
        redAlert: "#F44336",
        green: "#00875F",
        background: "#F9F9F9",
        grayDark: '#4E4A49',
        grayLight: "#D9D9D9",
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

