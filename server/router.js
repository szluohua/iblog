const Router = require('koa-router') // 路由中间件
// const Controller = require('./controller/index')
const UserController = require('./controller/user')
const ArticleController = require('./controller/article')
const CategoryController = require('./controller/category')
const CommentController = require('./controller/comment')
const PhotoController = require('./controller/photo')
const RoleController = require('./controller/role')
const SettingController = require('./controller/setting')
const IPController = require('./controller/ip')
const router = new Router()
const adminRole = 'admin'
const userRole = 'user'
const roleRouteMaps = [
    {
        path: '/api/verifyOTPToken',
        method: 'post',
        handler: UserController.verifyOTPToken,
        role: userRole
    },
    {
        path: '/api/getUploadToken',
        method: 'get',
        handler: UserController.getUploadToken,
        role: userRole
    },
    {
        path: '/api/createArticle',
        method: 'post',
        handler: ArticleController.createArticle,
        role: userRole
    },
    {
        path: '/api/createCategory',
        method: 'post',
        handler: CategoryController.createCategory,
        role: userRole
    },
    {
        path: '/api/createComment',
        method: 'post',
        handler: CommentController.createComment,
        role: userRole
    },
    {
        path: '/api/findUserById',
        method: 'post',
        handler: UserController.findUserById,
        role: adminRole
    },
    {
        path: '/api/findAllUser',
        method: 'get',
        handler: UserController.findAllUser,
        role: adminRole
    },
    {
        path: '/api/deleteArticle',
        method: 'post',
        handler: ArticleController.deleteArticleById,
        role: userRole
    },
    {
        path: '/api/createRole',
        method: 'post',
        handler: RoleController.createRole,
        role: adminRole
    },
    {
        path: '/api/getRole',
        method: 'get',
        handler: RoleController.getRole,
        role: adminRole
    },
    {
        path: '/api/removeRole',
        method: 'post',
        handler: RoleController.removeRole,
        role: adminRole
    },
    {
        path: '/api/updateUser',
        method: 'post',
        handler: UserController.updateUser,
        role: userRole
    },
    {
        path: '/api/signQRCode',
        method: 'post',
        handler: UserController.signQRCode,
        role: userRole
    },
    {
        path: '/api/setOtpAuth',
        method: 'post',
        handler: UserController.setOtpAuth,
        role: userRole
    },
    {
        path: '/api/createOrUpdateIP',
        method: 'post',
        handler: IPController.createOrUpdateIP,
        role: adminRole
    },
    {
        path: '/api/getIPs',
        method: 'get',
        handler: IPController.getIPs,
        role: adminRole
    }
]
const unlessRoleRouteMaps = [
    {
        path: '/api/register',
        method: 'post',
        handler: UserController.register
    },
    {
        path: '/api/login',
        method: 'post',
        handler: UserController.login
    },
    {
        path: '/api/v1/getComment',
        method: 'get',
        handler: CommentController.getComment
    },
    {
        path: '/api/v1/getArticleList',
        method: 'get',
        handler: ArticleController.getArticleList
    },
    {
        path: '/api/v1/getArticleDetail',
        method: 'get',
        handler: ArticleController.getArticleDetail
    },
    {
        path: '/api/v1/getCategoryList',
        method: 'get',
        handler: CategoryController.getCategoryList
    },
    {
        path: '/api/v1/getFile',
        method: 'get',
        handler: PhotoController.fileSignatures
    },
    {
        path: '/api/v1/findHotArticleList',
        method: 'get',
        handler: ArticleController.findHotArticleList
    },
    {
        path: '/api/v1/getAllCount',
        method: 'get',
        handler: CommentController.getAllCount
    },
    {
        path: '/api/v1/updatePV',
        method: 'get',
        handler: SettingController.updatePV
    },
    {
        path: '/api/v1/getSettingByKey',
        method: 'get',
        handler: SettingController.getSettingByKey
    },
    {
        path: '/api/v1/youpaiSignHeader',
        method: 'get',
        handler: UserController.youpaiSignHeader
    }
]
router.use(async (ctx, next) => {
    const c_router = roleRouteMaps.find((v) => {
        return v.path === ctx.path
    })
    if (c_router) {
        const user = ctx.state.user
        if (user) {
            const user_role = user.role
            if (user_role && user_role.indexOf(adminRole) === -1 && user_role.indexOf(c_router.role) === -1) {
                ctx.throw(403, '用户角色不正确')
            }
        }
    }
    await next()
})
const allRoutes = roleRouteMaps.concat(unlessRoleRouteMaps)
allRoutes.forEach((r) => {
    router[r.method](r.path, r.handler)
})
module.exports = router
