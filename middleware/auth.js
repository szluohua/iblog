export default function ({ store, redirect, route }) {
    // 如果用户未经过身份验证
    if (/^\/admin/.test(route.path) && !store.state.auth) {
        return redirect('/admin/login')
    }
}
