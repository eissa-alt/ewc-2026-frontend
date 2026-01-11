const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
   mode: 'jit',
   corePlugins: {
      container: false, //! I am using tailwind-bootstrap-grid
   },
   // darkMode: 'class',
   future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
   },
   experimental: {
      applyComplexClasses: true,
   },

   content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
   theme: {
      // customForms: theme => ({
      //    default: {
      //       'input, textarea': {
      //          '&::placeholder': {
      //             color: theme('colors.primary'),
      //          },
      //       },
      //    },
      // }),
      extend: {
         // clipPath: {
         //    triangle: "polygon(0 0, 100% 0, 0 100%)",
         // },

         // typography: theme => ({
         //    DEFAULT: {
         //       css: {
         //          color: theme('white'),
         //       },
         //    },
         // }),
         fontFamily: {
            en: ['Montserrat', ...defaultTheme.fontFamily.sans],
            ar: ['Cairo', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            // primary color

            primary: {
               DEFAULT: '#987c4b',
               50: '#F5F3EF',
               100: '#EAE7DE',
               200: '#D5CFBD',
               300: '#C0B79C',
               400: '#AB9F7B',
               500: '#987c4b',
               600: '#7A633C',
               700: '#5C4A2D',
               800: '#3E321E',
               900: '#20190F',
            },

            secondary: {
               DEFAULT: '#685BC7',
               50: '#E6E4F6',
               100: '#D8D5F1',
               200: '#BCB6E6',
               300: '#A098DC',
               400: '#8479D1',
               500: '#685BC7',
               600: '#493CAE',
               700: '#382D85',
               800: '#261F5B',
               900: '#151131',
               950: '#0C0A1C',
            },
            'secondary-2': {
               DEFAULT: '#7FCAC8',
               50: '#FFFFFF',
               100: '#F2FAFA',
               200: '#D6EEED',
               300: '#B9E2E1',
               400: '#9CD6D4',
               500: '#7FCAC8',
               600: '#57BAB7',
               700: '#3F9997',
               800: '#2F7270',
               900: '#1F4A49',
               950: '#163635'
            },
            accent: {
               DEFAULT: '#987c4b',
               50: '#F5F3EF',
               100: '#EAE7DE',
               200: '#D5CFBD',
               300: '#C0B79C',
               400: '#AB9F7B',
               500: '#987c4b',
               600: '#7A633C',
               700: '#5C4A2D',
               800: '#3E321E',
               900: '#20190F',
            },
            'gold-primary': {
               DEFAULT: '#987c4b',
            },

            'accent-1': {
               DEFAULT: '#0077C0',
               50: '#79CCFF',
               100: '#64C4FF',
               200: '#3BB5FF',
               300: '#13A5FF',
               400: '#0090E9',
               500: '#0077C0',
               600: '#005488',
               700: '#003150',
               800: '#000F18',
               900: '#000000',
               950: '#000000',
            },
            // blue

            brand: {
               mint: '#62CFC2',   // teal headline
            },

            error: {
               DEFAULT: '#FF0848',
               50: '#FFC0D0',
               100: '#FFABC1',
               200: '#FF82A3',
               300: '#FF5A84',
               400: '#FF3166',
               500: '#FF0848',
               600: '#CF0036',
               700: '#970027',
               800: '#5F0019',
               900: '#27000A',
               950: '#0B0003',
            },
         },
         backgroundImage: {
            'black-dot': "url('/images/black-dot.svg')",
            'white-dot': "url('/images/white-dot.svg')",
            'check-mark': "url('/images/check-mark.svg')",
            // 'body-bg': "url('/images/body_bg.jpg')",
            // 'body-bg': "url('/images/body_bg_4.jpg')",
            // 'bubble-left': "url('/images/round_shape_left.png')",
            // 'bubble-right': "url('/images/round_shape_right.png')",
            // 'circle-right': "url('/images/circle_right.png')",
            // 'circle-right-2': "url('/images/circle_2.png')"
            'body-bg': "url('/images/bg_body.png')",
         },
      },
   },
   variants: {
      float: ['responsive', 'direction'],
      margin: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
      inset: ['responsive', 'direction'],
      fontFamily: ['direction'],
      backgroundColor: ['responsive', 'direction', 'hover', 'focus', 'disabled', 'dark'],
      display: ['responsive', 'dark'],
      textColor: ['responsive', 'direction', 'hover', 'focus', 'disabled', 'dark'],
      placeholderColor: ['focus', 'dark'],
      borderColor: ['responsive', 'direction', 'hover', 'focus', 'disabled', 'dark'],
      textAlign: ['responsive', 'direction'],
      justifyContent: ['responsive', 'direction'],
      opacity: ['responsive', 'hover', 'focus', 'disabled'],
      cursor: ['responsive', 'disabled'],
      rotate: ['responsive', 'hover', 'focus', 'direction'],
      space: ['responsive', 'direction'],
      borderWidth: ['responsive', 'direction'],
      borderRadius: ['responsive', 'direction'],
      backgroundPosition: ['responsive', 'direction'],
      letterSpacing: ['responsive', 'direction'],
      boxShadow: ['focus'],
      order: ['direction'],
      divideColor: ['dark'],
   },
   plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('tailwind-bootstrap-grid')({
         rtl: true,
         // containerMaxWidths: { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
      }),

      plugin(function ({ addUtilities, variants }) {
         const newUtilities = {
            '.flip-x': {
               '--transform-scale-x': '-1',
            },
            '.flip-y': {
               '--transform-scale-y': '-1',
            },
         };
         addUtilities(newUtilities, variants('flip'));
      }),

      plugin(function ({ addVariant }) {
         addVariant('hocus', ['&:hover', '&:focus']);
      }),
   ],
};
