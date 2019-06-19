const UserModel = require('../models/user')
const Base = require('./base')
class UserServiceModel extends Base {
    constructor() {
        super(UserModel)
    }
    async findByUserName(username) {
        const res = await this.model.findOne({ username })
        return res
    }
}
module.exports = new UserServiceModel()
