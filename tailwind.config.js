module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        animation: {
            fadeIn: "fadeIn 2s ease-in forwards",
            fadeOut: "fadeOut 2s ease-out forwards"
        },
        keyframes: {
            fadeIn: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 }
            },
            fadeOut: {
                "0%": { opacity: 1 },
                "100%": { opacity: 0 }
            }
        },
        typography: {
            DEFAULT: {

            css: {
                // h1: {
                //   color: '#BA2D7E'
                // },
                // h2: {
            //   color: '#6CE3D4'
            // },
            // h3: {
            //   color: '#C6D0EB'
            // },
            a: {
              fontWeight: '700',
              fontStyle: 'normal',
              textDecoration: 'none',
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282'
              }
            },
            b: {
              fontWeight: '700',
              fontStyle: 'normal',
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282'
              }
            },
            i: {
              fontWeight: '400',
              fontStyle: 'normal',
              color: '##6CE3D4'
            },
            small: {
              color: '#0000ff'
            },
            code: {
              color: '#f7fafc',
              fontWeight: '400',
              fontSize: '.875em',
              backgroundColor: '#2d3748',
              padding: '.25rem',
              borderWidth: '0',
              borderColor: '#edf2f7',
              borderRadius: '.25rem'
            }
          }
        }
      }
    }
  },
  variants: {
      animation: ["motion-safe"],
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
