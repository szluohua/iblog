<template>
  <div class="MdRender-contaienr">
    <div v-for="(value, index) in list" :key="index" class="markdown-body" v-html="value.content" />
  </div>
</template>

<script>
import { getArticle } from '@/api/index'
export default {
    name: 'MdRender',
    components: {},
    data() {
        return {
            list: []
        }
    },
    head() {
        return {
            link: [
                { href: 'https://cdn.staticfile.org/github-markdown-css/3.0.1/github-markdown.min.css', rel: 'stylesheet' }
            ],
            script: [
                { src: 'https://cdn.staticfile.org/markdown-it/8.4.2/markdown-it.min.js', async: true },
                { src: 'https://cdn.staticfile.org/marked/0.6.2/marked.min.js', async: true }
            ]
        }
    },
    mounted() {
        this.getArticleList()
    },
    methods: {
        async getArticleList() {
            const res = await getArticle()
            if (res) {
                // const MarkdownIt = markdownit
                // const md = new MarkdownIt()
                this.list = res.map((val) => {
                    val.content = marked(val.content)
                    return val
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
