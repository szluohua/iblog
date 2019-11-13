const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    ip: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    address: {
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
