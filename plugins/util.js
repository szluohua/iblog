import Vue from 'vue'
const utilFormat = {}
function isBrowser() {
    return typeof window !== 'undefined'
}
const utils = {
    getFile(path = '') {
        return `${process.env.apiUrl}/v1/getFile?path=${path}`
    }
}
utilFormat.install = function (Vue) {
    for (const key in utils) {
        const element = utils[key]
        const func = isBrowser() ? element : function () { return Promise.resolve() }
        Vue[key] = func
        if (!Object.prototype.hasOwnProperty.call(Vue.prototype, `$${key}`)) {
            Object.defineProperty(Vue.prototype, `$${key}`, {
                get: function get() {
                    return func
                }
            })
        }
    }
}
Vue.use(utilFormat)
