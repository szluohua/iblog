const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
    auth: ''
})
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
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
        }
    }
}
