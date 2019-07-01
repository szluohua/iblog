<template>
    <a-layout class="admin-layout">
        <Header />
        <div class="admin-layout-content">
            <Sidebar />
            <a-layout-content class="admin-layout-container">
                <nuxt />
            </a-layout-content>
        </div>
        <a-layout-footer style="text-align: center; background: '#fff';">
            Blog ©2019 Created by Leo
        </a-layout-footer>
    </a-layout>
</template>

<script>
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
export default {
    name: 'AdminLayout',
    components: {
        Header,
        Sidebar
    }
}
</script>
<style scoped lang="scss">
.admin-layout {
    &-content {
        display: flex;
        padding-bottom: 40px;
    }
    &-container {
        background: #fff;
        height: 100%;
        padding: 20px;
    }
}
</style>
