const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    articleId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    commentBy: {
        type: Object,
        required: true
    },
    replyBy: {
        type: Object,
        required: false
    },
    parentId: {
        type: String,
        required: false
    }
}, {
    usePushEach: true,
    versionKey: false,
    timestamps: true
})

module.exports = Mongoose.model('comment', UserSchema)
