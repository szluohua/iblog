const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('category', UserSchema)
