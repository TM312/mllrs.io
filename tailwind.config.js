const defaultTheme = require('tailwindcss/defaultTheme')
const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, '$1')
        .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {

        extend: {

            fontFamily: {
                sans: ['Inter'],
                mono: ['Inter'],
            },
            // fontFamily: {
            //     'body': ['"Open Sans"', 'sans-serif'],
            //     'heading': ['"Libre Baskerville"', 'serif'],
            //     'mono': ['"Libre Baskerville"', 'serif']
            // },

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
                        code: {
                            // You can also use @apply to inline existing utility classes
                            "@apply font-mono rounded p-1 bg-gray-200 text-gray-700": "",
                            '&::before': {
                                display: 'none',
                            },
                            '&::after': {
                                display: 'none',
                            }
                        },
                        a: {
                            fontWeight: '700',
                            fontStyle: 'normal',
                            textDecoration: 'none',
                            color: '#1e40af',
                            '&:hover': {
                                color: '#4c1d95'
                            }
                        },
                        b: {
                            fontWeight: '700',
                            fontStyle: 'normal',
                        },
                        i: {
                            "@apply font-black uppercase": "",
                            fontWeight: '700',
                            fontStyle: 'normal',
                            // fontWeight: 'bolder',
                            // color: '#6CE3D4'
                        },
                        small: {
                            color: '#0000ff'
                        },
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
        require('@tailwindcss/typography'),
    ]
}
