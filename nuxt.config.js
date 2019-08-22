const pkg = require('./package')
const env =
    process.env.NODE_ENV === 'production'
        ? require('./config.json').prod
        : require('./config.json').dev
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
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' }
        ],
        script: [
            { src: 'https://cdn.jsdelivr.net/npm/sweetalert2@8', async: true, defer: true },
            { src: 'https://cdn.staticfile.org/markdown-it/8.4.2/markdown-it.min.js', async: true, defer: true },
            { src: 'https://cdn.staticfile.org/marked/0.6.2/marked.min.js', async: true, defer: true }
        ]
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
        'ant-design-vue/lib/card/style/index.css'
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/dayjs'
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
        }
    }
}
