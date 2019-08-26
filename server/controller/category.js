const CategoryService = require('../proxy/category')
module.exports = {
    async createCategory(ctx) {
        const createResult = await CategoryService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getCategoryList(ctx) {
        const req = ctx.request.query
        const categoryList = await CategoryService.find(req)
        ctx.body = categoryList
    }
}
