<template>
    <a-layout class="layout">
        <Header />
        <a-layout-content
            :style="{ background: '#fff', padding: '40px', minHeight: '280px' }"
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
