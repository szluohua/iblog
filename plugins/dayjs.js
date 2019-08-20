import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const dayFormat = {}
function isBrowser() {
    return typeof window !== 'undefined'
}
dayFormat.install = function (Vue) {
    const _dayjs = isBrowser() ? dayjs : function () { return Promise.resolve() }
    Vue.dayjs = _dayjs
    if (!Object.prototype.hasOwnProperty.call(Vue.prototype, '$dayjs')) {
        Object.defineProperty(Vue.prototype, '$dayjs', {
            get: function get() {
                return _dayjs
            }
        })
    }
}
Vue.use(dayFormat)
export default dayjs
