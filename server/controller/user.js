const auth = require('../auth')
const UserService = require('../proxy/user')
module.exports = {
    async register(ctx) {
        const body = ctx.request.body
        const createResult = await UserService.create(body)
        ctx.body = createResult
    },
    async login(ctx) {
        const req = ctx.request.body
        const user = await UserService.findOne({
            username: new RegExp(req.username, 'i')
        })
        if (user) {
            const checkPassword = await user.validatePassword(req.password)
            if (checkPassword) {
                ctx.body = {
                    ok: true,
                    msg: '登录成功',
                    token: auth.getToken({ user: req.username, password: req.password })
                }
            } else {
                ctx.body = {
                    msg: '密码不正确'
                }
            }
        }
    }
}
