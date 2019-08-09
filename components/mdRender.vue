<template>
    <div class="MdRender-contaienr">
        <div class="markdown-body" v-html="renderContent" />
        <comment />
    </div>
</template>

<script>
import comment from './comment'
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
    components: {
        comment
    },
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
.MdRender-contaienr {
    box-sizing: border-box;
    flex: 1 0 auto;
    // min-width: 200px;
    // max-width: 980px;
    // margin: 0 auto;
    padding: 40px;
}

@media (max-width: 767px) {
    .MdRender-contaienr {
        padding: 15px;
    }
}
</style>
