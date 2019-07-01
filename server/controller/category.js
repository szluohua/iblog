const CategoryService = require('../proxy/category')
module.exports = {
    async createCategory(ctx) {
        const createResult = await CategoryService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getCategoryList(ctx) {
        const req = ctx.request.query
        const articleList = await CategoryService.find(req)
        ctx.body = articleList
    }
}
