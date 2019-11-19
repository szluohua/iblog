const IPModel = require('../models/ip')
const Base = require('./base')
class RoleServiceModel extends Base {
    constructor() {
        super(IPModel)
    }
    async find(data = {}) {
        const res = await IPModel.find(data).sort({ updatedAt: -1 }).exec()
        return res
    }
    async createOrUpdateIP(ip, data) {
        const res = await IPModel.updateOne({ ip }, { $set: data }, { upsert: true })
        return res
    }
}
module.exports = new RoleServiceModel()
