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
