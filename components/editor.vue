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
            script: [
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
            this.resetEditor()
            this.stackedit.on('fileChange', (file) => {
                this.data = file.content.text
            })
        })
    },
    methods: {
        resetEditor() {
            this.stackedit.openFile({
                name: 'Filename',
                content: {
                    text: ''
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .editor-container {
        width: 100%;
        height: 800px;
        .stackedit-container {
            height: 100%;
        }
    }
</style>
