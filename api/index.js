import request from './axios'

export function login(params) {
    return request({ url: '/login', params, method: 'post' })
}
export function register(params) {
    return request({ url: '/register', params, method: 'post' })
}
export function getUploadToken(params) {
    return request({ url: '/getUploadToken', params, method: 'get' })
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

export function deleteArticle(params) {
    return request({ url: '/deleteArticle', params, method: 'post' })
}

export function createCategory(params) {
    return request({ url: '/createCategory', params, method: 'post' })
}
export function getCategoryList(params) {
    return request({ url: '/v1/getCategoryList', params, method: 'get' })
}

export function findHotArticleList(params) {
    return request({ url: '/v1/findHotArticleList', params, method: 'get' })
}

export function getComment(params) {
    return request({ url: '/v1/getComment', params, method: 'get' })
}
export function createComment(params) {
    return request({ url: '/createComment', params, method: 'post' })
}

export function createRole(params) {
    return request({ url: '/createRole', params, method: 'post' })
}

export function getRole(params) {
    return request({ url: '/getRole', params, method: 'get' })
}

export function updateRole(params) {
    return request({ url: '/updateRole', params, method: 'post' })
}

export function removeRole(params) {
    return request({ url: '/removeRole', params, method: 'post' })
}
export function findAllUser(params) {
    return request({ url: '/findAllUser', params, method: 'get' })
}
