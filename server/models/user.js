const Mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const validate = require('mongoose-validate')

// 加密密码计算强度
const SALT_WORK_FACTOR = 10
// 默认图片

const UserSchema = new Mongoose.Schema({
    avatar: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        trim: true,
        default: ''
    },
    sex: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validate.email, '无效邮箱'],
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})
/**
 * 保存用户信息
 *
 */
UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

/**
 * 验证用户密码
 */
UserSchema.methods.validatePassword = function (password) {
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                reject(err)
            } else {
                resolve(isMatch)
            }
        })
    })
}

module.exports = Mongoose.model('user', UserSchema)
