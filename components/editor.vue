<template>
  <div class="create-article-container">
    <div id="editor-container" class="editor-container" />
  </div>
</template>

<script>
export default {
    name: 'Article',
    components: {},
    model: {
        prop: 'value',
        event: 'change'

    },
    data() {
        return {
            stackedit: '',
            data: ''
        }
    },
    head() {
        return {
            script: [{
                src: 'https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js',
                async: true
            },
            {
                src: 'http://localhost:3000/editor.js',
                async: true
            }
            ]
        }
    },
    watch: {
        data(value) {
            this.$emit('change', value)
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.stackedit = new Stackedit({
                targetDom: '#editor-container'
            })
            this.stackedit.openFile({
                name: 'Filename', // with an optional filename
                content: {
                    text: '' // and the Markdown content.
                }
            })
            this.stackedit.on('fileChange', (file) => {
                this.data = file.content.text
            })
        })
    },
    methods: {}
}
</script>

<style scoped lang="scss">
    .editor-container {
        width: 1000px;
    }
</style>
