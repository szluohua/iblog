<template>
    <a-layout-header class="header-container">
        <nuxt-link class="logo" to="/" />
        <div class="right-header">
            <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="fetchUser"
            >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            </a-input-search>
            <a-menu
                theme="light"
                mode="horizontal"
                :default-selected-keys="['2']"
                :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">
                    文章
                </a-menu-item>
                <a-menu-item key="2">
                    随笔
                </a-menu-item>
                <a-menu-item key="3">
                    关于
                </a-menu-item>
            </a-menu>
        </div>
    </a-layout-header>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
    name: 'Header',
    components: {},
    data() {
        this.lastFetchId = 0
        this.fetchUser = debounce(this.fetchUser, 800)
        return {
            data: [],
            value: [],
            fetching: false
        }
    },
    methods: {
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
                this.data = [
                    {
                        text: 'xx',
                        value: 'xxx2'
                    }
                ]
                this.fetching = false
            }, 2000)
        },
        handleChange(value) {
            Object.assign(this, {
                value,
                data: [],
                fetching: false
            })
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
