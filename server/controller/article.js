const ArticleService = require('../proxy/article')
const CategoryService = require('../proxy/category')
// const PhotoController = require('./photo')
module.exports = {
    async createArticle(ctx) {
        const createResult = await ArticleService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getArticleList(ctx) {
        const req = ctx.request.body
        // const page = req.page
        delete req.page
        const articleList = await ArticleService.findList(req)
        // const photoList = await PhotoController.getPhotoList(page, articleList.length)
        // articleList = articleList.map((val, index) => {
        //     return Object.assign({
        //         urls: photoList[index].urls,
        //         links: photoList[index].links
        //     }, val.toObject())
        // })
        ctx.body = articleList
    },
    async getArticleDetail(ctx) {
        const req = ctx.request.query
        const article = await ArticleService.findOne(req)
        if (article) {
            const categorys = await CategoryService.find({ _id: { $in: article.category } })
            article.category = categorys.map((v) => { return { name: v.name, id: v._id } })
            ctx.body = article
        }
    },
    async findHotArticleList(ctx) {
        const articleList = await ArticleService.findHotArticleList()
        ctx.body = articleList
    }
}
