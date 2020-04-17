// const http = require('http')
const userAgent = require('user-agent-parse')
const axios = require('axios')
const SettingService = require('../proxy/setting')
const IPService = require('../proxy/ip')
const privateKey = ['email', 'email_password']
const ipRequest = (ip) => {
    return new Promise((resolve) => {
        try {
            axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`)
                .then((res) => {
                    resolve(res.data || {})
                })
                // eslint-disable-next-line handle-callback-err
                .catch((err) => {
                    resolve()
                })
        } catch (error) {
            resolve()
        }
    })
}
module.exports = {
    async createSetting(ctx) {
        const values = ctx.request.body
        const data = []
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                data.push({
                    key,
                    value: values[key]
                })
            }
        }
        const createResult = await SettingService.bulkWrite(data)
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
    async getPublicSettingByKey(ctx) {
        const key = ctx.request.query.key
        if (!key) {
            ctx.body = {}
            return
        }
        if (privateKey.includes(key)) {
            ctx.throw(405, '找不到该设置')
        }
        const res = await SettingService.getPublicSettingByKey(key)
        ctx.body = res
    },
    async getAllSetting(ctx) {
        const res = await SettingService.find()
        ctx.body = res
    }
}
