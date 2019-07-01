<template>
    <div class="article-detail-container">
        <h3 />
        <mdRender :content="article.content" />
    </div>
</template>

<script>
import mdRender from '@/components/mdRender'
import { getArticleDetail } from '@/api/index'
export default {
    name: 'ArticleDetail',
    components: {
        mdRender
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
        const res = await getArticleDetail({ _id: params.id })
        if (!res) {
            return redirect('/404')
        }
        return {
            article: res
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss"></style>
