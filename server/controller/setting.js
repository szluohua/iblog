const SettingService = require('../proxy/setting')
module.exports = {
    async createSetting(ctx) {
        const { key, value } = ctx.request.body
        const createResult = await SettingService.updateOne(key, value)
        ctx.body = createResult
    },
    async updatePV() {
        const res = await SettingService.updatePV()
        return res
    }
}
