const UserModel = require('../models/user')
module.exports = {
    async create(data) {
        const res = await UserModel.create(data)
        return res
    },
    async findOne(data, option = {}) {
        const res = await UserModel.findOne(data, option)
        return res
    },
    async findById(id) {
        const res = await UserModel.findById(id)
        return res
    }
}
