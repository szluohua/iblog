const CategoryModel = require('../models/category')
const Base = require('./base')
class ArticleServiceModel extends Base {
    constructor() {
        super(CategoryModel)
    }
    async find(data = {}) {
        const res = await CategoryModel.find(data).exec()
        return res
    }
}
module.exports = new ArticleServiceModel()
