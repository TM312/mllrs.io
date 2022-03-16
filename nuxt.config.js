// import getRoutes from './utils/getRoutes'
export default {
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'mllrs.io',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/formatDate',
        '~/plugins/capitalize',
        '~/plugins/prism'

    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // '@nuxtjs/eslint-module'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/axios',
        '@nuxtjs/google-fonts',
        '@nuxtjs/tailwindcss',
        '@aceforth/nuxt-optimized-images',
        'nuxt-purgecss'
        // '@nuxtjs/sitemap'
    ],

    googleFonts: {
        families: {
            Inter: true,
            Roboto: true
        }
    },

    axios: {
        baseURL: 'http://localhost:8888' // Used as fallback if no runtime config is provided
    },

    publicRuntimeConfig: {
        faunaSecretKey: process.env.FAUNA_KEY,
        axios: {
            browserBaseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : process.env.BASE_URL_DEV
        }
    },
    privateRuntimeConfig: {
        faunaSecretKey: process.env.FAUNA_KEY,
        axios: {
            baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : process.env.BASE_URL_DEV
        }
    },

    // Content module configuration (https://go.nuxtjs.dev/config-content)
    content: {
        markdown: {
            prism: {
                theme: 'prism-themes/themes/prism-material-oceanic.css'
            }
        },
        nestedProperties: ['article.tags']
    },

    optimizedImages: {
        optimizeImages: true
    },

    //   cloudinary: {
    //     cloudName: process.env.CLOUD_NAME
    //   },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    //   build: {
    //     extend (config, { isDev, isClient }) {
    //       config.module.rules.push({
    //         test: /\.md$/i,
    //         loader: 'ignore-loader'
    //       })
    //     }
    //   },
    // sitemap: {
    //   hostname: process.env.BASE_URL,
    //   routes () {
    //     return getRoutes()

    hooks: {
        'content:file:beforeInsert': (document) => {
            if (document.extension === '.md') {
                // document.bodyPlainText = document.text
                const { text } = require('reading-time')(document.text)
                document.readingTime = text
            }
        }
    }

}
