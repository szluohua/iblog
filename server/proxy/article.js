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
        const res = await this.model.find(data, fields).sort({ _id: -1 }).limit(30)
        return res
    }
    async findHotArticleList() {
        const res = await this.model.find({}, { content: false }).sort({ viewed: -1, comment: -1 }).limit(5)
        return res
    }
}
module.exports = new ArticleServiceModel()
