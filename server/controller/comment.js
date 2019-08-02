const CommentService = require('../proxy/comment')
module.exports = {
    async createComment(ctx) {
        const createResult = await CommentService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getComment(ctx) {
        const req = ctx.request.query
        const comments = await CommentService.find(req)
        ctx.body = comments
    }
}
