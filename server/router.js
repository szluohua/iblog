const Router = require('koa-router') // 路由中间件
const UserController = require('./controller/user')
const router = new Router()
/* POST /api/register 注册 */
router.post('/api/register', UserController.register)

/* GET /api/login 登录 */
router.post('/api/login', UserController.login)
module.exports = router
