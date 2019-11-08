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
            article: {}
        }
    },
    validate({ params }) {
        return params.id && /^\S+$/.test(params.id)
    },
    async asyncData({ params, redirect }) {
        let res = await getArticleDetail({ _id: params.id })
        if (!res) {
            return redirect('/404')
        }
        const regexp = new RegExp('![image](/article', 'g')
        const path = `![image](${process.env.cdnUrl}/article`
        res = res.replace(regexp, path)
        return {
            article: res
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.article-detail-container {
    display: flex;
    box-sizing: border-box;
}
</style>
