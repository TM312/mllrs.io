// import getRoutes from './utils/getRoutes'
export default {
  target: 'static',
  //   router: {
  //     base: '/blog/'
  //   },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'webapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/axios'
    // '@nuxtjs/sitemap'
  ],

  publicRuntimeConfig: {
    faunaSecretKey: process.env.BLOG_SECRET_KEY,
    axios: {
      baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL || 'http://localhost:8888/blog/' : 'http://localhost:8888/blog/'
    }
  },
  privateRuntimeConfig: {
    faunaSecretKey: process.env.BLOG_SECRET_KEY,
    axios: {
      baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL || 'http://localhost:8888/' : 'http://localhost:8888/'
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: false
      }
    },
    nestedProperties: ['author.name']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
  // sitemap: {
  //   hostname: process.env.BASE_URL,
  //   routes () {
  //     return getRoutes()
  //   }
  // }
//   hooks: {
//     'content:file:beforeInsert': (document) => {
//       if (document.extension === '.md') {
//         document.bodyPlainText = document.text
//       }
//     }
//   }
}
