import sass from 'sass'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // defaultyarn: localhost,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sketch-threejs-v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css'
  ],

  styleResources: {
    scss: [],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: sass,
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
  },

  generate: {
    interval: 2000,
  },
}
