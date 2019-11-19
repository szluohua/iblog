// const http = require('http')
const userAgent = require('user-agent-parse')
const axios = require('axios')
const SettingService = require('../proxy/setting')
const IPService = require('../proxy/ip')
const ipRequest = (ip) => {
    return new Promise((resolve) => {
        try {
            axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`)
                .then((res) => {
                    resolve(res.data || {})
                })
                .catch((err) => {
                    console.log(err)
                    resolve()
                })
        } catch (error) {
            console.log(error)
            resolve()
        }
    })
}
module.exports = {
    async createSetting(ctx) {
        const { key, value } = ctx.request.body
        const createResult = await SettingService.updateOne(key, value)
        ctx.body = createResult
    },
    async updatePV(ctx) {
        const res = await SettingService.updatePV()
        const user_agent = ctx.accept.headers['user-agent']
        const agent_res = userAgent.parse(user_agent)
        const ip = ctx.request.ip
        const data = {}
        data.os = agent_res.os
        data.brower = agent_res.fullName
        data.device = agent_res.device_type
        const ipResponse = await ipRequest(ip)
        if (ipResponse && ipResponse.data) {
            data.country = ipResponse.data.country
            data.region = ipResponse.data.region
            data.isp = ipResponse.data.isp
            data.city = ipResponse.data.city
        }
        await IPService.createOrUpdateIP(ip, data)
        res.ip = ip
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
