<template>
    <a-menu
        v-model="current"
        style="width: 256px"
        :open-keys.sync="openKeys"
        mode="inline"
        @click="handleClick"
    >
        <a-sub-menu key="article" @titleClick="titleClick">
            <span
slot="title"
><a-icon type="book" /><span>内容管理</span></span>
            <a-menu-item key="/admin/article">
                创建/编辑文章
            </a-menu-item>
            <a-menu-item key="/admin/article-manage">
                文章管理
            </a-menu-item>
        </a-sub-menu>
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
            this.current.push(value.path)
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
