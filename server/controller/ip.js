const IPService = require('../proxy/ip')
module.exports = {
    async getIPs(ctx) {
        const req = ctx.request.query
        const res = await IPService.find(req)
        ctx.body = res
    },
    async createOrUpdateIP(ctx) {
        const req = ctx.request.body
        if (!req.ip) {
            throw new Error('参数不正确')
        }
        const res = await IPService.createOrUpdateIP(req)
        ctx.body = res
    }
}
