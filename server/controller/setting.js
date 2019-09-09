const SettingService = require('../proxy/setting')
module.exports = {
    async createSetting(ctx) {
        const { key, value } = ctx.request.body
        const createResult = await SettingService.updateOne(key, value)
        ctx.body = createResult
    },
    async updatePV(ctx) {
        const res = await SettingService.updatePV()
        ctx.body = res
    },
    async getSettingByKey(ctx) {
        const key = ctx.request.query.key
        if (!key) {
            ctx.body = {}
            return
        }
        const res = await SettingService.getSettingByKey(key)
        ctx.body = res
    }
}
