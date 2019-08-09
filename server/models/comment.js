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
    // 此次评论的用户
    commentBy: {
        type: Object,
        required: true
    },
    // 被回复评论的用户
    replyBy: {
        type: Object,
        required: false
    },
    // 被回复评论的评论id
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
