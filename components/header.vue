<template>
    <a-layout-header class="header-container">
        <nuxt-link class="logo" to="/" />
        <div class="right-header">
            <a-menu
                v-model="current"
                :default-selected-keys="['2']"
                :style="{ lineHeight: '64px' }"
                theme="light"
                mode="horizontal"
                @click="changeMenu"
            >
                <a-menu-item key="/about">
                    关于
                </a-menu-item>
                <a-sub-menu v-if="userInfo">
                    <a-avatar
                        v-if="avatarUrl"
                        slot="title"
                        :src="avatarUrl + userInfo.avatar"
                        class="submenu-title-wrapper"
                        rel="noopener noreferrer"
                    />
                    <a-menu-item key="/admin/personal-setting">
                        个人设置
                    </a-menu-item>
                    <a-menu-item key="/admin/article">
                        系统管理
                    </a-menu-item>
                    <a-menu-item key="logout">
                        注销
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
            <div v-if="!userInfo" class="auth-button">
                <nuxt-link to="/login">
                    登录
                </nuxt-link>
                <a-divider type="vertical" />
                <nuxt-link to="/register">
                    注册
                </nuxt-link>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'Header',
    data() {
        return {
            current: [],
            avatarUrl: `${process.env.apiUrl}/v1/getFile?path=`
            // 使用slot，再是用$getFile,组件props解析报错
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => {
                return state.user
            }
        })
    },
    watch: {
        $route(value) {
            const router = []
            router.push(value.path)
            this.current = router
        }
    },
    beforeMount() {
        this.current.push(this.$route.path)
    },
    methods: {
        changeMenu(value) {
            if (value.key === 'logout') {
                return this.logout()
            }
            return this.$router.push({ path: value.key })
        },
        logout(value) {
            Cookie.remove('auth')
            Cookie.remove('otp_token')
            Cookie.remove('user')
            this.$store.commit('setAuth', '')
            this.$store.commit('setUserInfo', '')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">
.header-container {
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    height: 66px;
    line-height: 66px;
    .right-header {
        text-align: right;
        .auth-button {
            display: inline-block;
            margin-left: 20px;
        }
    }
    .logo {
        width: 200px;
        height: 100%;
        background-image: url("../assets/logo/logo_transparent.png");
        background-repeat: no-repeat;
        background-position: 50% 45%;
        background-size: 180px;
        float: left;
    }
    .ant-input-search {
        margin-right: 50px;
    }
    .ant-input-search,
    .ant-menu {
        display: inline-block;
    }
}
</style>
