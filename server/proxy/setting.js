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
    async bulkWrite(data) {
        const ops = data.map((val) => {
            return {
                updateOne: {
                    filter: { key: val.key },
                    update: { value: val.value },
                    upsert: true
                }
            }
        })
        const res = await SettingModel.bulkWrite(ops)
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

    async getPublicSettingByKey(key) {
        const res = await SettingModel.findOne({ key })
        return res
    }

    async getEmailInfo() {
        const email_type = await SettingModel.findOne({ key: 'email_type' })
        const email = await SettingModel.findOne({ key: 'email' })
        const email_pass = await SettingModel.findOne({ key: 'email_password' })
        return {
            email_type: email_type ? email_type.value : '',
            email: email ? email.value : '',
            pass: email_pass ? email_pass.value : ''
        }
    }
}
module.exports = new SettingServiceModel()
