<template>
    <div class="MdRender-contaienr">
        <div class="markdown-body" v-html="renderContent" />
    </div>
</template>

<script>
//
export default {
    name: 'MdRender',
    head() {
        return {
            link: [
                {
                    href:
                        'https://cdn.staticfile.org/github-markdown-css/3.0.1/github-markdown.min.css',
                    rel: 'stylesheet'
                },
                {
                    href:
                        'https://cdn.staticfile.org/highlight.js/9.15.8/styles/monokai-sublime.min.css',
                    rel: 'stylesheet'
                }
            ],
            script: [
                {
                    src:
                        'https://cdn.staticfile.org/highlight.js/9.15.8/highlight.min.js'
                }
            ]
        }
    },
    components: {},
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            renderContent: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            // highlight.js的同步高亮
            marked.setOptions({
                highlight: function (code) {
                    return hljs.highlightAuto(code).value
                }
            })
            this.renderContent = marked(this.content)
        })
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
