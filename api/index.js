import request from './axios'

export function login(params) {
    return request({ url: '/login', params, method: 'post' })
}
export function register(params) {
    return request({ url: '/register', params, method: 'post' })
}
export function createArticle(params) {
    return request({ url: '/createArticle', params, method: 'post' })
}
export function getArticle(params) {
    return request({ url: '/v1/getArticle', params, method: 'get' })
}
