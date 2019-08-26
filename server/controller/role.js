const RoleService = require('../proxy/role')
module.exports = {
    async createRole(ctx) {
        const createResult = await RoleService.create(ctx.request.body)
        ctx.body = createResult
    },
    async getRole(ctx) {
        const req = ctx.request.query
        const roleList = await RoleService.find(req)
        ctx.body = roleList
    },
    async removeRole(ctx) {
        const id = ctx.request.body._id
        const res = await RoleService.removeById(id)
        ctx.body = res
    }
}
