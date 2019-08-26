const RoleModel = require('../models/role')
const Base = require('./base')
class RoleServiceModel extends Base {
    constructor() {
        super(RoleModel)
    }
    async find(data = {}) {
        const res = await RoleModel.find(data).exec()
        return res
    }
    async updateRole(id, data = {}) {
        const { name } = data
        const res = await RoleModel.updateOne({ _id: id }, { $set: { name } })
        return res
    }
}
module.exports = new RoleServiceModel()
