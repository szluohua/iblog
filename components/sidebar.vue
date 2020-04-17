<template>
    <a-menu
        v-model="current"
        :open-keys.sync="openKeys"
        style="width: 256px"
        mode="inline"
        @click="handleClick"
    >
        <a-sub-menu key="article" @titleClick="titleClick">
            <span slot="title"><a-icon type="book" /><span>内容管理</span></span>
            <a-menu-item key="/admin/article">
                创建/编辑文章
            </a-menu-item>
            <a-menu-item key="/admin/article-manage">
                文章管理
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/admin/role">
            <a-icon type="safety-certificate" /><span>角色管理</span>
        </a-menu-item>
        <a-menu-item key="/admin/users">
            <a-icon type="user" /><span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="/admin/visit">
            <a-icon type="eye" /><span>访问记录</span>
        </a-menu-item>
        <a-menu-item key="/admin/setting">
            <a-icon type="setting" /><span>系统设置</span>
        </a-menu-item>
    </a-menu>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            current: [''],
            openKeys: ['article']
        }
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
        handleClick(event) {
            this.$router.push(event.key)
        },
        titleClick(e) {
            console.log('titleClick', e)
        }
    }
}
</script>
