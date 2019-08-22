<template>
    <div id="particles-js">
        <a-layout ref="layout" class="layout">
            <Header />
            <a-layout-content
                class="layout-container"
            >
                <nuxt />
            </a-layout-content>
            <a-layout-footer style="text-align: center; background: transparent;">
                Blog ©2019 Created by Leo
                <nuxt-link to="http://beian.miit.gov.cn" style="color: inherit; margin-left: 10px;">
                    粤ICP备18003965号-1
                </nuxt-link>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
import Header from '@/components/header'
import particlesConfig from '@/assets/particles.json'
export default {
    name: 'Layout',
    components: {
        Header
    },
    mounted() {
        console.log(particlesConfig)
        this.$nextTick(function () {
            window.particlesJS('particles-js', particlesConfig)
        })
    }
}
</script>
<style lang="scss" scoped>
#particles-js {
    position: relative;
}
.layout {
    min-height: 100vh;
    background: transparent;
}
.layout-container {
    padding: 40px;
    display: flex;
    background: transparent;

    justify-content: center;
    &>div {
        width: 1440px;
        margin: 0 auto;
    }
}
</style>
