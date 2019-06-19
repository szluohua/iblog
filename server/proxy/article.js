const ArticleModel = require('../models/article')
const Base = require('./base')
class ArticleServiceModel extends Base {
    constructor() {
        super(ArticleModel)
    }
}
module.exports = new ArticleServiceModel()
