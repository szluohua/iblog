const axios = require('axios')
const qs = require('qs')
// unsplash key
const key = '7b5bc72cfd053d5ed225f73e07e7e5d8908c6a450c01ac2611eff51b9b4c65ac'
// const auth = require('../auth')
let allConfig = require('../../config.json')
allConfig = process.env.NODE_ENV === 'production' ? allConfig.prod : allConfig.dev
const request = ({ url, params = {}, method = 'post' }) => {
    const config = {
        method,
        baseURL: 'https://api.unsplash.com',
        url,
        responseType: 'json'
    }
    if (method === 'get') {
        config.params = params
    } else {
        config.data = qs.stringify(params)
    }
    return new Promise((resolve) => {
        try {
            axios(config)
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
    getPhotoList(page = 1, per_page = 30) {
        return request({
            url: '/photos',
            method: 'get',
            baseURL: '',
            params: {
                client_id: key,
                page,
                per_page
            }
        })
    },
    fileSignatures(ctx) {
        const req = ctx.request.query
        if (req && req.path) {
            // const url = auth.fileSign(req.key)
            const url = allConfig.youpaiCdnUrl + req.path
            ctx.status = 301
            ctx.redirect(url)
        }
    }
}
