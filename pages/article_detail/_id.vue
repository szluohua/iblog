<template>
    <div class="article-detail-container">
        <mdRender :article="article" />
        <rightSidebar />
    </div>
</template>

<script>
import mdRender from '@/components/mdRender'
import rightSidebar from '@/components/rightSidebar'
import { getArticleDetail, getPublicSettingByKey } from '@/api/index'
import { pushBaiduSite } from '@/utils/index'
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
    async asyncData({ params, redirect }) {
        const res = await getArticleDetail({ _id: params.id })
        if (!res) {
            return redirect('/404')
        }
        return {
            article: res
        }
    },
    head() {
        const { _id, title, category, desc } = this.article
        if (!_id) {
            return {}
        }
        let categoryContent = category.map((v) => {
            return v.name
        })
        categoryContent = categoryContent.join(' ')
        return {
            title,
            meta: [
                { hid: `${_id}title`, name: 'description', content: title },
                { hid: `${_id}desc`, name: 'description', content: desc },
                {
                    hid: `${_id}category`,
                    name: 'keywords',
                    content: categoryContent
                },
                {
                    hid: `${_id}revisit`,
                    name: 'revisit-after',
                    content: '30 days'
                }
            ]
        }
    },
    mounted() {
        getPublicSettingByKey({ key: 'push_baidu' }).then((res) => {
            if (res && res.value === 'true') {
                pushBaiduSite()
            }
        })
    }
}
</script>

<style scoped lang="scss">
.article-detail-container {
    display: flex;
    box-sizing: border-box;
}
</style>
