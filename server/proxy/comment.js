const MommentModel = require('../models/comment')
const Base = require('./base')
class CommentServiceModel extends Base {
    constructor() {
        super(MommentModel)
    }
    async find(data = {}) {
        const res = await MommentModel.find(data).exec()
        return res
    }
}
module.exports = new CommentServiceModel()
