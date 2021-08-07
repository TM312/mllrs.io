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
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
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
                xs: {
                    css: [
                        {
                            'code::before': {
                                content: '""',
                            },
                            'code::after': {
                                content: '""',
                            },
                            fontSize: rem(10),
                            // fontFamily: {
                            //     sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                            // },
                            lineHeight: round(20 / 12),
                            p: {
                                marginTop: em(14, 12),
                                marginBottom: em(14, 12),
                            },
                            '[class~="lead"]': {
                                fontSize: em(16, 12),
                                lineHeight: round(24 / 16),
                                marginTop: em(14, 16),
                                marginBottom: em(14, 16),
                            },
                            blockquote: {
                                marginTop: em(20, 16),
                                marginBottom: em(20, 16),
                                paddingLeft: em(20, 16),
                            },
                            h1: {
                                fontSize: em(30, 12),
                                marginTop: '0',
                                marginBottom: em(20, 30),
                                lineHeight: round(36 / 30),
                            },
                            h2: {
                                fontSize: em(20, 12),
                                marginTop: em(28, 20),
                                marginBottom: em(14, 20),
                                lineHeight: round(24 / 20),
                            },
                            h3: {
                                fontSize: em(16, 12),
                                marginTop: em(24, 16),
                                marginBottom: em(6, 16),
                                lineHeight: round(24 / 16),
                            },
                            h4: {
                                marginTop: em(20, 12),
                                marginBottom: em(6, 12),
                                lineHeight: round(20 / 12),
                            },
                            img: {
                                marginTop: em(20, 12),
                                marginBottom: em(20, 12),
                            },
                            video: {
                                marginTop: em(20, 12),
                                marginBottom: em(20, 12),
                            },
                            figure: {
                                marginTop: em(20, 12),
                                marginBottom: em(20, 12),
                            },
                            'figure > *': {
                                marginTop: '0',
                                marginBottom: '0',
                            },
                            'figure figcaption': {
                                fontSize: em(10, 12),
                                lineHeight: round(14 / 10),
                                marginTop: em(6, 10),
                            },
                            code: {
                                fontSize: em(10, 12),
                            },
                            'h2 code': {
                                fontSize: em(16, 20),
                            },
                            'h3 code': {
                                fontSize: em(14, 16),
                            },
                            pre: {
                                fontSize: em(10, 12),
                                lineHeight: round(20 / 10),
                                marginTop: em(20, 10),
                                marginBottom: em(20, 10),
                                borderRadius: rem(4),
                                paddingTop: em(6, 10),
                                paddingRight: em(10, 10),
                                paddingBottom: em(6, 10),
                                paddingLeft: em(10, 10),
                            },
                            ol: {
                                marginTop: em(14, 12),
                                marginBottom: em(14, 12),
                            },
                            ul: {
                                marginTop: em(14, 12),
                                marginBottom: em(14, 12),
                            },
                            li: {
                                marginTop: em(4, 12),
                                marginBottom: em(4, 12),
                            },
                            'ol > li': {
                                paddingLeft: em(22, 12),
                            },
                            'ol > li::before': {
                                left: '0',
                            },
                            'ul > li': {
                                paddingLeft: em(22, 12),
                            },
                            'ul > li::before': {
                                height: em(5, 12),
                                width: em(5, 12),
                                top: `calc(${em(20 / 2, 12)} - ${em(2.5, 12)})`,
                                left: em(3, 12),
                            },
                            '> ul > li p': {
                                marginTop: em(6, 12),
                                marginBottom: em(6, 12),
                            },
                            '> ul > li > *:first-child': {
                                marginTop: em(14, 12),
                            },
                            '> ul > li > *:last-child': {
                                marginBottom: em(14, 12),
                            },
                            '> ol > li > *:first-child': {
                                marginTop: em(14, 12),
                            },
                            '> ol > li > *:last-child': {
                                marginBottom: em(14, 12),
                            },
                            'ul ul, ul ol, ol ul, ol ol': {
                                marginTop: em(6, 12),
                                marginBottom: em(6, 12),
                            },
                            hr: {
                                marginTop: em(40, 12),
                                marginBottom: em(40, 12),
                            },
                            'hr + *': {
                                marginTop: '0',
                            },
                            'h2 + *': {
                                marginTop: '0',
                            },
                            'h3 + *': {
                                marginTop: '0',
                            },
                            'h4 + *': {
                                marginTop: '0',
                            },
                            table: {
                                fontSize: em(10, 12),
                                lineHeight: round(16 / 10),
                            },
                            'thead th': {
                                paddingRight: em(10, 10),
                                paddingBottom: em(6, 10),
                                paddingLeft: em(10, 10),
                            },
                            'thead th:first-child': {
                                paddingLeft: '0',
                            },
                            'thead th:last-child': {
                                paddingRight: '0',
                            },
                            'tbody td': {
                                paddingTop: em(6, 10),
                                paddingRight: em(10, 10),
                                paddingBottom: em(6, 10),
                                paddingLeft: em(10, 10),
                            },
                            'tbody td:first-child': {
                                paddingLeft: '0',
                            },
                            'tbody td:last-child': {
                                paddingRight: '0',
                            },
                        },
                        {
                            '> :first-child': {
                                marginTop: '0',
                            },
                            '> :last-child': {
                                marginBottom: '0',
                            },
                        },
                    ],
                },
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
                            color: '#3162ce',
                            '&:hover': {
                                color: '#2c5242'
                            }
                        },
                        b: {
                            fontWeight: '700',
                            fontStyle: 'normal',
                            color: '#3162ce',
                            '&:hover': {
                                color: '#2c5242'
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
                        // code: {
                        //   color: '#f7fafc',
                        //   fontWeight: '400',
                        //   fontSize: '.875em',
                        //   backgroundColor: '#2d3748',
                        //   padding: '.25rem',
                        //   borderWidth: '0',
                        //   borderColor: '#edf2f7',
                        //   borderRadius: '.25rem'
                        // }
                        // code: {
                        //     fontWeight: '400',
                        //     backgroundColor: theme('colors.gray.100'),
                        //     padding: theme('padding.1'),
                        //     borderWidth: 1,
                        //     borderColor: theme('colors.gray.200'),
                        //     borderRadius: theme('borderRadius.default')
                        // },
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
        // require('tailwind-css-variables')(
        //     {
        //         colors: 'color',
        //         screens: false,
        //         fontFamily: false,
        //         fontSize: false,
        //         fontWeight: false,
        //         lineHeight: false,
        //         letterSpacing: false,
        //         backgroundSize: false,
        //         borderWidth: false,
        //         borderRadius: false,
        //         width: false,
        //         height: false,
        //         minWidth: false,
        //         minHeight: false,
        //         maxWidth: false,
        //         maxHeight: false,
        //         padding: false,
        //         margin: false,
        //         boxShadow: false,
        //         zIndex: false,
        //         opacity: false
        //     }
        // )
    ]
}
