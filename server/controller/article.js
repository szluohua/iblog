const ArticleService = require('../proxy/article')
const PhotoController = require('./photo')
module.exports = {
    async createArticle(ctx) {
        const createResult = await ArticleService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getArticleList(ctx) {
        const req = ctx.request.body
        const page = req.page
        delete req.page
        let articleList = await ArticleService.findList(req)
        const photoList = await PhotoController.getPhotoList(page, articleList.length)
        articleList = articleList.map((val, index) => {
            return Object.assign({
                urls: photoList[index].urls,
                links: photoList[index].links
            }, val.toObject())
        })
        ctx.body = articleList
    },
    async getArticleDetail(ctx) {
        const req = ctx.request.query
        const article = await ArticleService.findOne(req)
        console.log('article', article)
        ctx.body = article
    }
}
