class ProxyBase {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        const res = await this.model.create(data)
        return res
    }
    async findOne(data, option = {}) {
        const res = await this.model.findOne(data, option)
        return res
    }
    async findById(id) {
        const res = await this.model.findById(id)
        return res
    }
    async removeById(id) {
        const res = await this.model.deleteOne({ _id: id })
        return res
    }
}
module.exports = ProxyBase
