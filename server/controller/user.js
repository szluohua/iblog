const auth = require('../auth')
const UserService = require('../proxy/user')
module.exports = {
    async register(ctx) {
        const body = ctx.request.body
        let createResult = await UserService.create(body)
        createResult = createResult.toObject()
        delete createResult.password
        ctx.body = createResult
    },
    async findUserById(ctx) {
        const body = ctx.request.body
        const res = await UserService.findUserById(body)
        ctx.body = res
    },
    async login(ctx) {
        const req = ctx.request.body
        let user = await UserService.findOne({
            username: req.username
        })
        if (user) {
            const checkPassword = await user.validatePassword(req.password)
            if (checkPassword) {
                user = user.toObject()
                delete user.password
                ctx.body = Object.assign({
                    jwt: auth.getToken({ user: req.username, password: req.password }),
                    expires: 7
                }, user)
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
    },
    getUploadToken(ctx) {
        const token = auth.getQiniuUploadToken()
        ctx.body = {
            token
        }
    }
}
