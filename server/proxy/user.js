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
    async findUserById(query, option) {
        const res = await this.model.findOne(query, { password: false })
        return res
    }
    async findAllUser() {
        const res = await this.model.find({}, { password: false })
        return res
    }

    async updateUser(userId, data) {
        const res = await this.model.updateOne({ _id: userId }, data)
        return res
    }
}
module.exports = new UserServiceModel()
