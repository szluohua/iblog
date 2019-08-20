const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
    auth: '',
    comment: '',
    user: ''
})
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    },
    setUserInfo(state, user) {
        state.user = user
    },
    replyComment(state, comment) {
        state.comment = Object.assign({}, comment)
    },
    clearComment(state) {
        state.comment = ''
    }
}
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            let parsed = cookieparser.parse(req.headers.cookie)
            if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed)
            }
            commit('setAuth', parsed.auth)
            const user = parsed.user
            if (user) {
                commit('setUserInfo', typeof user === 'string' ? JSON.parse(user) : user)
            }
        }
    }
}
