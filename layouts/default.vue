<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header :style="{background: '#fff'}">
            <div class="logo" />
            <div class="right-header">
                <a-input-search placeholder="input search text" style="width: 200px" @search="fetchUser">
                    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                </a-input-search>
                <a-menu theme="light" mode="horizontal" :default-selected-keys="['2']" :style="{ lineHeight: '64px' }">
                    <a-menu-item key="1">
                        nav 1
                    </a-menu-item>
                    <a-menu-item key="2">
                        nav 2
                    </a-menu-item>
                    <a-menu-item key="3">
                        nav 3
                    </a-menu-item>
                </a-menu>
            </div>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <div :style="{padding: '24px', minHeight: '280px' }">
                <nuxt />
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
    name: 'Layout',
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
        }
    }
}
</script>

<style scoped lang="scss">
    #components-layout-demo-top {
        .right-header {
            text-align: right;
        }
        .logo {
            width: 200px;
            height: 100%;
            background-image: url('../assets/logo/logo_transparent.png');
            background-repeat:no-repeat;
            background-position:50% 45%;
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
