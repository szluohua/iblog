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
                    jwt: auth.getToken({ user: req.username, password: req.password }),
                    expires: 7
                }
            } else {
                ctx.body = {
                    errorCode: 1,
                    msg: '密码不正确'
                }
            }
        } else {
            ctx.body = {
                errorCode: 0,
                msg: '找不到用户'
            }
        }
    }
}
