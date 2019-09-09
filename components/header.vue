<template>
    <a-layout-header class="header-container">
        <nuxt-link class="logo" to="/" />
        <div class="right-header">
            <a-input-search placeholder="input search text" style="width: 200px" @search="fetchUser">
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            </a-input-search>
            <a-menu
                v-model="current"
                theme="light"
                mode="horizontal"
                :default-selected-keys="['2']"
                :style="{ lineHeight: '64px' }"
                @click="changeMenu"
                >
                <!-- <a-menu-item key="">
                    文章
                </a-menu-item> -->
                <a-menu-item key="/about">
                    About
                </a-menu-item>
                <a-sub-menu v-if="userInfo">
                    <span slot="title" class="submenu-title-wrapper">
                        <a-avatar slot="avatar" rel="noopener noreferrer" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
                    </span>
                    <a-menu-item key="/admin/article">
                        文章管理
                    </a-menu-item>
                    <!-- <a-menu-item key="about">
                        关于
                    </a-menu-item> -->
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
                <!-- <nuxt-link to="/register">
                    注册
                </nuxt-link> -->
            </div>
        </div>
    </a-layout-header>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'Header',
    components: {},
    data() {
        this.lastFetchId = 0
        this.fetchUser = debounce(this.fetchUser, 800)
        return {
            data: [],
            value: [],
            fetching: false,
            current: []
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => { return state.user }
        })
    },
    watch: {
        '$route'(value) {
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
        setRoute(route) {
            this.$router.push(route)
        },
        fetchUser(value) {
            if (!value) {
                this.data = []
                return
            }
            this.lastFetchId += 1
            this.data = []
            this.fetching = true
            setTimeout(() => {
                this.data = [{
                    text: 'xx',
                    value: 'xxx2'
                }]
                this.fetching = false
            }, 2000)
        },
        handleChange(value) {
            Object.assign(this, {
                value,
                data: [],
                fetching: false
            })
        },
        logout(value) {
            Cookie.remove('auth')
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
