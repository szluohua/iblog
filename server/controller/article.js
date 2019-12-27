const ghGot = require('gh-got')
const ArticleService = require('../proxy/article')
const CategoryService = require('../proxy/category')
const Auth = require('../auth')
// const PhotoController = require('./photo')
const renderHTML = async (content) => {
    const renderData = await ghGot.post('markdown/raw', {
        body: content,
        headers: { 'content-type': 'text/plain' },
        json: false
    })
    return renderData.body || ''
}
module.exports = {
    async createArticle(ctx) {
        const req = ctx.request.body
        let createResult
        const id = req._id
        req.renderContent = await renderHTML(req.content)
        if (id) {
            delete req._id
            if (!Auth.checkUpdatePermission(ctx, id)) {
                ctx.throw(403, '用户角色不正确')
            }
            createResult = await ArticleService.updateArticle(id, req)
        } else {
            createResult = await ArticleService.create(req)
        }
        ctx.body = createResult
    },
    async getArticleList(ctx) {
        const req = ctx.request.query
        // const page = req.page
        // delete req.page
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
        const { render, ...req } = ctx.request.query
        await ArticleService.updateOne(req, { $inc: { viewed: 1 } })
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
    },
    async deleteArticleById(ctx) {
        const { _id } = ctx.request.body
        const article = await ArticleService.findById(_id)
        if (!article) {
            ctx.throw(405, '文章不存在')
        }
        if (!Auth.checkUpdatePermission(ctx, article.createBy._id)) {
            ctx.throw(403, '用户角色不正确')
        }
        const result = await ArticleService.removeById(_id)
        ctx.body = result
    }
}
