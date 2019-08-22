<template>
    <a-layout class="layout">
        <Header />
        <a-layout-content
            class="layout-container"
        >
            <nuxt />
        </a-layout-content>
        <a-layout-footer style="text-align: center; background: '#fff';">
            Blog ©2019 Created by Leo
        </a-layout-footer>
    </a-layout>
</template>

<script>
import Header from '@/components/header'
export default {
    name: 'Layout',
    components: {
        Header
    }
}
</script>
<style lang="scss" scoped>
.layout {
    min-height: 100%;
}
.layout-container {
    background: #fff;
    padding: 40px;
    display: flex;
    justify-content: center;
    &>div {
        width: 1440px;
        margin: 0 auto;
    }
}
</style>
