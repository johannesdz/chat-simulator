// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: colors,
    // colors: {
    //   // Build your palette here
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   gray: colors.trueGray,
    //   red: colors.red,
    //   blue: colors.lightBlue,
    //   yellow: colors.amber
    // },
    extend: {
      maxHeight: {
        100: '100rem'
      },
      width: {
        '40px': '40px'
      },
      minWidth: {
        '40px': '40px'
      },
      height: {
        '40px': '40px'
      },
      backgroundImage: {
        'chat-background': "url('../assets/bg.png')"
      },
      transitionProperty: {
        height: 'height',
        maxHeight: 'maxHeight'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
