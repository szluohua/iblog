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
export function getArticleList(params) {
    return request({ url: '/v1/getArticleList', params, method: 'get' })
}

export function getArticleDetail(params) {
    return request({ url: '/v1/getArticleDetail', params, method: 'get' })
}

export function getCategoryList(params) {
    return request({ url: '/v1/getCategoryList', params, method: 'get' })
}
