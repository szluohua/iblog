const CategoryModel = require('../models/category')
const Base = require('./base')
class CategoryServiceModel extends Base {
    constructor() {
        super(CategoryModel)
    }
    async find(data = {}) {
        const res = await CategoryModel.find(data).exec()
        return res
    }
}
module.exports = new CategoryServiceModel()
