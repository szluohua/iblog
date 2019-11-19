import axios from 'axios'
import qs from 'qs'

const request = ({ url, params = {}, method = 'post', baseURL = '' }) => {
    const config = {
        method,
        baseURL: baseURL || process.env.apiUrl,
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
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
                    console.log({ err })
                    resolve()
                })
        } catch (error) {
            console.log(error)
            resolve()
        }
    })
}
export default request
