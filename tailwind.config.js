module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        default: {

          css: {
            color: '#333',
            h1: {
              color: '#BA2D7E'
            },
            h2: {
              color: '#6CE3D4'
            },
            h3: {
              color: '#C6D0EB'
            },
            a: {
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
              color: '#0000ff'
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
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
