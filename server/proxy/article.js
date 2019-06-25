const ArticleModel = require('../models/article')
const Base = require('./base')
class ArticleServiceModel extends Base {
    constructor() {
        super(ArticleModel)
    }
    async find(data = {}) {
        const res = await this.model.find(data)
        return res
    }
}
module.exports = new ArticleServiceModel()
