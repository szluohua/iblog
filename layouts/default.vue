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
                Blog ©2019 Leo
                <a href="http://beian.miit.gov.cn" class="beian" target="_blank">
                    粤ICP备18003965号
                </a>
                <a class="youpai-link" target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
                    <img src="../assets/logo/youpaiyun.svg">
                </a>
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
.youpai-link {
    color: inherit;
    margin-left: 10px;
    display: inline-block;
    width: 45px;
    height: 20px;
    line-height: 20px;
    position: relative;
    overflow: hidden;
    & img {
        position: absolute;
        top: -20px;
        left: -17px;
        width: 80px;
    }
}
.beian {
    color: inherit;
    margin-left: 10px;
    text-decoration: none;
    &:hover {
        color: #1890ff;
    }
}
</style>
