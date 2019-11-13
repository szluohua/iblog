const IPModel = require('../models/ip')
const Base = require('./base')
class RoleServiceModel extends Base {
    constructor() {
        super(IPModel)
    }
    async find(data = {}) {
        const res = await IPModel.find(data).exec()
        return res
    }
    async createOrUpdateIP(data) {
        const res = await IPModel.updateOne({ ip: data.ip }, { $set: data }, { upsert: true })
        return res
    }
}
module.exports = new RoleServiceModel()
