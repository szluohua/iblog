const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const jwtKoa = require('koa-jwt') // 用于路由权限控制
const koaBody = require('koa-body') // 用于查询字符串解析到`ctx.request.query`
const app = new Koa()
const Mongoose = require('mongoose')
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')
const config = require('../nuxt.config.js')
let allConfig = require('../config.json')
const router = require('./router')
const IPService = require('./proxy/ip')
const RoleService = require('./proxy/role')
const UserService = require('./proxy/user')
allConfig = process.env.NODE_ENV === 'production' ? allConfig.prod : allConfig.dev
// const dbURI = `mongodb://${encodeURIComponent(config.PRIMARY.username)}:${encodeURIComponent(config.PRIMARY.password)}@${config.SECONDARY1},${config.SECONDARY2},${config.PRIMARY.host}/${config.dbName}?slaveOk=true&replicaSet=${config.replicaSet}`;
const dbURI = `mongodb://${encodeURIComponent(allConfig.mongodbUser)}:${encodeURIComponent(allConfig.mongodbPassword)}@127.0.0.1:27017/iblog`
Mongoose.set('useCreateIndex', true)
Mongoose.connect(dbURI, {
    keepAlive: true,
    useNewUrlParser: true
}, async (err) => {
    if (err) {
        throw err
    } else {
        const userRole = await RoleService.findOne({ roleId: 'user' })
        if (!userRole) {
            await RoleService.create({ name: '用户', roleId: 'user' })
        }
        const adminRole = await RoleService.findOne({ roleId: 'admin' })
        if (!adminRole) {
            await RoleService.create({ name: '管理员', roleId: 'admin' })
        }
        const user = await UserService.findOne({ role: 'admin' })
        if (!user) {
            await UserService.create({
                username: allConfig.adminUser,
                role: ['admin', 'user'],
                email: `${allConfig.adminUser}@admin.com`,
                password: allConfig.adminUPass
            })
        }
        consola.ready({
            message: 'mongodb connectd',
            badge: true
        })
    }
})
Mongoose.Promise = global.Promise
app.proxy = true
// Import and Set Nuxt.js options
config.dev = !(app.env === 'production')

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
        port = allConfig.port || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    app.use(async (ctx, next) => {
        const { url, ip } = ctx.request
        if (url === '/') {
            await IPService.createOrUpdateIP({ ip })
        }
        await next()
    })
    // 统一异常捕获处理
    app.use(async (ctx, next) => {
        try {
            if (/^((?!\/api).)*$/.test(ctx.url)) {
                ctx.status = 200
                ctx.respond = false // Bypass Koa's built-in response handling
                ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
                nuxt.render(ctx.req, ctx.res)
            } else {
                await next()
            }
        } catch (err) {
            ctx.status = err.statusCode || err.status || 500
            ctx.body = {
                status: 1,
                code: ctx.status,
                message: err.message,
                data: null
            }
            ctx.app.emit('error', err, ctx)
        }
    })
    app.use(ratelimit({
        db: new Redis({ password: allConfig.redisPass }),
        duration: 60000,
        errorMessage: 'Sometimes You Just Have to Slow Down.',
        id: ctx => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 100,
        disableHeader: false
    }))
    app.use(jwtKoa({ secret: allConfig.secret, cookie: 'auth' }).unless({
    // 设置login、register接口，可以不需要认证访问
        path: [
            /^\/api\/login/,
            /^\/api\/verifyOTPToken/,
            /^\/api\/v1/,
            /^\/api\/register/,
            /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问, 即nuxt的路由不需要认证
        ]
    }))
    /* 查询字符串解析到`ctx.request.query` */
    app.use(koaBody())
    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
