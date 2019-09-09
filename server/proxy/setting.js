const SettingModel = require('../models/setting')
const Base = require('./base')
class SettingServiceModel extends Base {
    constructor() {
        super(SettingModel)
    }

    async find(data = {}) {
        const res = await SettingModel.find(data).exec()
        return res
    }

    async updateOne(key, data) {
        const res = await SettingModel.updateOne({ key }, { $set: { value: data } }, { upsert: true })
        return res
    }

    async updatePV() {
        const res = await SettingModel.updateOne({ key: 'pv' }, { $inc: { value: 1 } }, { upsert: true })
        return res
    }

    async getSettingByKey(key) {
        const res = await SettingModel.findOne({ key })
        return res
    }
}
module.exports = new SettingServiceModel()
