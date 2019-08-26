const ArticleModel = require('../models/article')
const Base = require('./base')
class ArticleServiceModel extends Base {
    constructor() {
        super(ArticleModel)
    }
    async findList(data = {}) {
        if (data.lastId) {
            data = Object.assign({
                '_id': { '$lt': data.lastId }
            }, data)
            delete data.lastId
        }
        const fields = {
            content: false
        }
        let res
        let limit = data.limit
        if (limit && limit === 'all') {
            res = await this.model.find(data, fields).sort({ _id: -1 })
        } else {
            limit = Number(limit) > 0 ? Number(limit) : 30
            res = await this.model.find(data, fields).sort({ _id: -1 }).limit(limit)
        }
        return res
    }
    async findHotArticleList() {
        const res = await this.model.find({}, { content: false }).sort({ viewed: -1, comment: -1 }).limit(5)
        return res
    }
    async deleteArticleById(id) {
        const res = await this.model.remove({ _id: id })
        return res
    }
    async updateArticle(id, data) {
        const res = await this.model.updateOne({ _id: id }, { $set: data })
        return res
    }
}
module.exports = new ArticleServiceModel()
