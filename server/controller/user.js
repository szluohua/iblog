const auth = require('../auth')
const UserService = require('../proxy/user')
const ArticleService = require('../proxy/article')
const otp_redirect_secret = 'otp_redirect_secret'
module.exports = {
    async register(ctx) {
        const body = ctx.request.body
        body.role = ['user']
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
    async findAllUser(ctx) {
        const res = await UserService.findAllUser()
        ctx.body = res
    },
    async updateUser(ctx) {
        const { userId, email, role, avatar } = ctx.request.body
        if (!auth.checkUpdatePermission(ctx, userId)) {
            ctx.throw(403, '用户角色不正确')
        }
        const data = {}
        if (email) {
            data.email = email
        }
        if (role) {
            data.role = role
        }
        if (avatar) {
            data.avatar = avatar
            await ArticleService.updateMany({ 'createBy._id': userId }, { $set: {
                'createBy.avatar': avatar
            } })
        }
        const res = await UserService.updateUser(userId, {
            $set: data
        })
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
                if (user.otpAuth) {
                    ctx.body = {
                        otp_token: auth.getRedirectToken({ user: req.username }),
                        expires: 0.25
                    }
                    return
                }
                user = user.toObject()
                delete user.password
                ctx.body = Object.assign({
                    jwt: auth.getToken({ role: user.role, _id: user._id }),
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
    },
    async signQRCode(ctx) {
        const { userId } = ctx.request.body
        const user = await UserService.findOne({ _id: userId })
        if (user) {
            let userSecret = user.token
            if (!userSecret) {
                userSecret = auth.generateOTPSecret()
                await UserService.updateOne({ _id: userId }, { $set: { token: userSecret } })
            }
            const url = await auth.signQRCode(userSecret)
            ctx.body = {
                url
            }
        } else {
            throw new Error('用户不正确')
        }
    },
    async setOtpAuth(ctx) {
        const { type, token, userId } = ctx.request.body
        const user = await UserService.findOne({ _id: userId })
        if (!user) {
            throw new Error('找不到用户')
        }
        const tokenResult = auth.verifyOtpToken(token, user.token)
        if (!tokenResult) {
            throw new Error('token不正确')
        }
        let data
        if (type === 'auth') {
            data = {
                otpAuth: true
            }
        } else {
            data = {
                otpAuth: false,
                token: ''
            }
        }
        const res = await UserService.updateOne({ _id: userId }, { $set: data })
        ctx.body = res
    },
    async verifyOTPToken(ctx) {
        const { token } = ctx.request.body
        const cookie = ctx.cookies.get('otp_token')
        const result = auth.getJWTPayload(cookie, otp_redirect_secret)
        if (!result) {
            throw new Error('验证token不正确')
        }
        let user = await UserService.findOne({
            _id: result._id
        })
        if (!user) {
            throw new Error('找不到用户')
        }
        const tokenResult = auth.verifyOtpToken(token, user.token)
        if (!tokenResult) {
            throw new Error('token不正确')
        }
        user = user.toObject()
        delete user.password
        delete user.token
        ctx.body = Object.assign({
            jwt: auth.getToken({ _id: user._id, role: user.role }),
            expires: 7
        }, user)
    },
    async youpaiSignHeader(ctx) {
        const res = await auth.youpaiSignHeader(ctx.request.query)
        ctx.body = res
    }
}
