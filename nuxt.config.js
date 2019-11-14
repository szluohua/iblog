const pkg = require('./package')
const env =
    process.env.NODE_ENV === 'production'
        ? require('./front-config.json').prod
        : require('./front-config.json').dev
const cdnConfig = require('./cdn.json')
module.exports = {
    mode: 'universal',
    vue: {
        config: {
            lintOnSave: process.env.NODE_ENV !== 'production'
        }
    },
    env,
    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }].concat(cdnConfig.css),
        script: cdnConfig.js
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [
        '~assets/style/common.scss',
        'ant-design-vue/lib/style/index.css',
        'ant-design-vue/lib/button/style/index.css',
        'ant-design-vue/lib/form/style/index.css',
        'ant-design-vue/lib/input/style/index.css',
        'ant-design-vue/lib/icon/style/index.css',
        'ant-design-vue/lib/avatar/style/index.css',
        'ant-design-vue/lib/select/style/index.css',
        'ant-design-vue/lib/layout/style/index.css',
        'ant-design-vue/lib/menu/style/index.css',
        'ant-design-vue/lib/spin/style/index.css',
        'ant-design-vue/lib/upload/style/index.css',
        'ant-design-vue/lib/switch/style/index.css',
        'ant-design-vue/lib/comment/style/index.css',
        'ant-design-vue/lib/list/style/index.css',
        'ant-design-vue/lib/tooltip/style/index.css',
        'ant-design-vue/lib/divider/style/index.css',
        'ant-design-vue/lib/card/style/index.css',
        'ant-design-vue/lib/table/style/index.css',
        'ant-design-vue/lib/pagination/style/index.css',
        'ant-design-vue/lib/tag/style/index.css',
        'ant-design-vue/lib/modal/style/index.css',
        'ant-design-vue/lib/steps/style/index.css'
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/dayjs',
        '@/plugins/util'
    ],
    router: {
        middleware: ['auth']
    },
    /*
  ** Nuxt.js modules
  */
    modules: [
        '@nuxtjs/style-resources'
    ],
    styleResources: {
        scss: [
            '@/assets/vars/*.scss' // 自己项目中的样式文件的路径
        ]
    },
    /*
  ** Build configuration
  */
    build: {
        analyze: true,
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                })
            }
        },
        publicPath: 'https://cdn1.jscode.top/blog'
    }
}
