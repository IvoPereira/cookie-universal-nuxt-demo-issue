export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        hid: 'icon',
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    { src: 'normalize.css/normalize.css', lang: 'css' },
    { src: 'avalanche-css/_avalanche.scss', lang: 'sass' },
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/api-init',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-imagemin',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://axios.nuxtjs.org/options.html
    debug: process.env.NODE_ENV === 'development',
    https: true,
    proxyHeaders: true,
    proxyHeadersIgnore: ['accept', 'accept-encoding', 'host'],
    progress: true,
    proxy: false,
    retry: true,
  },
  styleResources: {
    // See https://github.com/nuxt-community/style-resources-module/
    scss: [
      './assets/scss/_base.scss',
      'avalanche-css/_avalanche.scss',
    ],
  },
  router: {
    // linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: require('./postcss.config'),
  },
  /*
  server:
    process.env.NODE_ENV !== 'production'
      ? {
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, '.ssl/keys/server.key')
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, '.ssl/keys/server.crt')
            ),
          },
        }
      : {},
      */
  // serverMiddleware: ['redirect-ssl'],
}
