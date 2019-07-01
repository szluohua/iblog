const Router = require('koa-router') // 路由中间件
// const Controller = require('./controller/index')
const UserController = require('./controller/user')
const ArticleController = require('./controller/article')
const CategoryController = require('./controller/category')
const router = new Router()
/* POST /api/register 注册 */
router.post('/api/register', UserController.register)

/* GET /api/login 登录 */
router.post('/api/login', UserController.login)
router.post('/api/createArticle', ArticleController.createArticle)
router.post('/api/createCategory', CategoryController.createCategory)
router.get('/api/v1/getArticleList', ArticleController.getArticleList)
router.get('/api/v1/getArticleDetail', ArticleController.getArticleDetail)
router.get('/api/v1/getCategoryList', CategoryController.getCategoryList)
module.exports = router
