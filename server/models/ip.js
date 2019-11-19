const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    ip: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    brower: {
        type: String,
        trim: true,
        default: ''
    },
    os: {
        type: String,
        trim: true,
        default: ''
    },
    device: {
        type: String,
        trim: true,
        default: ''
    },
    country: {
        type: String,
        trim: true,
        default: ''
    },
    region: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        trim: true,
        default: ''
    },
    isp: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('ip', UserSchema)
