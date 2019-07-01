const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('article', UserSchema)
