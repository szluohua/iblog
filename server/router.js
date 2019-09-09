const Router = require('koa-router') // 路由中间件
// const Controller = require('./controller/index')
const UserController = require('./controller/user')
const ArticleController = require('./controller/article')
const CategoryController = require('./controller/category')
const CommentController = require('./controller/comment')
const PhotoController = require('./controller/photo')
const RoleController = require('./controller/role')
const SettingController = require('./controller/setting')
const router = new Router()
/* POST /api/register 注册 */
router.post('/api/register', UserController.register)

/* GET /api/login 登录 */
router.post('/api/login', UserController.login)
router.get('/api/getUploadToken', UserController.getUploadToken)
router.post('/api/createArticle', ArticleController.createArticle)
router.post('/api/createCategory', CategoryController.createCategory)
router.post('/api/createComment', CommentController.createComment)
router.post('/api/findUserById', UserController.findUserById)
router.get('/api/findAllUser', UserController.findAllUser)
router.get('/api/v1/getComment', CommentController.getComment)
router.get('/api/v1/getArticleList', ArticleController.getArticleList)
router.get('/api/v1/getArticleDetail', ArticleController.getArticleDetail)
router.post('/api/deleteArticle', ArticleController.deleteArticleById)
router.get('/api/v1/getCategoryList', CategoryController.getCategoryList)
router.get('/api/v1/getFile', PhotoController.fileSignatures)
router.get('/api/v1/findHotArticleList', ArticleController.findHotArticleList)
router.get('/api/v1/getAllCount', CommentController.getAllCount)
router.get('/api/v1/updatePV', SettingController.updatePV)
router.get('/api/v1/getSettingByKey', SettingController.getSettingByKey)

router.post('/api/createRole', RoleController.createRole)
router.get('/api/getRole', RoleController.getRole)
router.post('/api/removeRole', RoleController.removeRole)

module.exports = router
