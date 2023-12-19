/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    
      'azure': {
        50: '#f0f5fe',
        100: '#dde8fc',
        200: '#c3d8fa',
        300: '#9bc1f5',
        400: '#6ba0ef',
        500: '#5385ea',
        600: '#3360dd',
        700: '#2a4ccb',
        800: '#283fa5',
        900: '#263a82',
        950: '#1b2450',
      },
    },
    
    extend: {},
  },
  plugins: [],
}

