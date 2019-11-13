<template>
    <div class="article-detail-container">
        <mdRender :article="article" />
        <rightSidebar />
    </div>
</template>

<script>
import mdRender from '@/components/mdRender'
import rightSidebar from '@/components/rightSidebar'
import { getArticleDetail } from '@/api/index'
export default {
    name: 'ArticleDetail',
    components: {
        mdRender,
        rightSidebar
    },
    data() {
        return {
            article: ''
        }
    },
    validate({ params }) {
        return params.id && /^\S+$/.test(params.id)
    },
    async mounted() {
        const route = this.$route
        const id = route.params.id
        if (id) {
            const _this = this
            const res = await getArticleDetail({ _id: route.params.id, render: true })
            if (res) {
                _this.$nextTick(function () {
                    _this.article = res
                })
                return
            }
        }
        this.$router.push('/404')
    }
}
</script>

<style scoped lang="scss">
.article-detail-container {
    display: flex;
    box-sizing: border-box;
}
</style>
