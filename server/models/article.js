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
        type: Array,
        required: true
    },
    viewed: {
        type: Number,
        default: 0
    },
    stared: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    createBy: {
        type: Object,
        required: true
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('article', UserSchema)
