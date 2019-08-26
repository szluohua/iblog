const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    roleId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('role', UserSchema)
