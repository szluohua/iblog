const CommentService = require('../proxy/comment')
const ArticleService = require('../proxy/article')
module.exports = {
    async createComment(ctx) {
        const createResult = await CommentService.create(ctx.request.body)
        await ArticleService.updateOne({ _id: ctx.request.body.articleId }, { $inc: { comment: 1 } })
        ctx.body = createResult
    },
    async getComment(ctx) {
        const req = ctx.request.query
        const comments = await CommentService.find(req)
        ctx.body = comments
    },
    async getAllCount(ctx) {
        const allArticle = await ArticleService.count()
        const allComment = await CommentService.count()
        ctx.body = { allArticle, allComment }
    }
}
