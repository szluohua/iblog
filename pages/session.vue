<template>
    <div class="session-container">
    <div class="logo" />
    <h5>验证码</h5>
    <a-input v-model="code" />
    <a-button @click="verify" type="primary" style="width: 100%; margin-top: 20px;">
        校验
    </a-button>
    </div>
</template>

<script>
import { verifyOTPToken } from '@/api/index'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'Test',
    components: {},
    layout: 'empty',
    data() {
        return {
            code: ''
        }
    },
    methods: {
        async verify() {
            const res = await verifyOTPToken({ token: this.code })
            if (res) {
                const { jwt, expires, ...user } = res
                this.$store.commit('setAuth', jwt) // 存储在vuex中用来进行客户端渲染
                this.$store.commit('setUserInfo', user)
                Cookie.set('auth', jwt, {
                    expires: new Date(
                        new Date().getTime() +
                            expires * 86400000
                    )
                }) // 在cookie中保存token用来进行服务器端渲染
                Cookie.set('user', user, {
                    expires: new Date(
                        new Date().getTime() +
                            expires * 86400000
                    )
                }) // 在cookie中保存token用来进行服务器端渲染
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .session-container {
        width: 200px;
        margin: 100px auto 0;
        h5 {
            margin-top: 20px;
        }
    }
    .logo {
        width: 200px;
        height: 70px;
        background-image: url("../assets/logo/logo_transparent.png");
        background-repeat: no-repeat;
        background-position: 50% 45%;
        background-size: 180px;
    }
</style>
