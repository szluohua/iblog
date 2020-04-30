/**
 * @param {Object} swal 实例对象
 * @param {*} type warning, error, success, info, question
 * @param {*} msg
 */
export function toastr(swal, type, msg) {
    return swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        type: type,
        title: msg
    })
}

export function pushBaiduSite() {
    var bp = document.createElement('script')
    var curProtocol = window.location.protocol.split(':')[0]
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js'
    }
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(bp, s)
}
