class ProxyBase {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        const res = await this.model.create(data)
        return res
    }

    async count() {
        const res = await this.model.countDocuments()
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

    async updateOne(query, data) {
        const res = await this.model.updateOne(query, data)
        return res
    }

    async updateMany(query, data) {
        const res = await this.model.updateMany(query, data)
        return res
    }
}
module.exports = ProxyBase
