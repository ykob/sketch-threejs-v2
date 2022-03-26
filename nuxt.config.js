import sass from 'sass'

const TITLE = 'sketch of threejs v2'
const DOMAIN = 'https://ykob.github.io'
const ROUTER_BASE = '/sketch-threejs-v2'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    domain: DOMAIN,
    sitename: TITLE,
  },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // defaultyarn: localhost,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: TITLE,
    titleTemplate: `%s - ${TITLE}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: TITLE },
      { hid: 'apple-mobile-web-app-title', property: 'apple-mobile-web-app-title', content: TITLE },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${ROUTER_BASE}/favicon.ico` },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Homenaje&display=swap' },
    ],
    script: [
      { hid: 'gtag', src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}` },
      {
        hid: 'gtag', 
        innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.GA_ID}');`,
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    '@/assets/css/global.scss',
    '@/assets/css/utilities.scss',
  ],

  styleResources: {
    scss: [
      '@/assets/css/variables.scss',
      '@/assets/css/variables-colors.scss',
      '@/assets/css/variables-easings.scss',
      '@/assets/css/variables-utilities.scss',
      '@/assets/css/functions.scss',
      '@/assets/css/mixins.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/utils',
    '@/plugins/webgl',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components/',
      pathPrefix: true,
    },
    {
      path: '@/components/_common',
      pathPrefix: false,
    },
    {
      path: '@/components/_template',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    ['@nuxtjs/eslint-module', {
      fix: true,
    }],
    '@nuxtjs/moment',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://content.nuxtjs.org/
    '@nuxt/content',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: sass,
        additionalData: '@use "sass:math";',
      },
    },
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|fs|vs)$/,
        exclude: /(node_modules)/,
        use: [
          'glslify-import-loader',
          'raw-loader',
          'glslify-loader',
        ],
      })
    },
    transpile: ['three'],
  },

  generate: {
    interval: 2000,
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content('sketch').fetch()
      return files.map(file => file.path === '/index' ? '/' : file.path)
    },
  },

  router: {
    base: ROUTER_BASE,
  },

  moment: {
    locales: ['ja'],
  },
}
