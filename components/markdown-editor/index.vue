<template>
    <div id="markdown-editor" />
</template>

<script>
// deps for editor
import defaultOptions from './default-options' // editor content
export default {
    name: 'MarddownEditor',
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default() {
                return defaultOptions
            }
        },
        mode: {
            type: String,
            default: 'markdown'
        },
        height: {
            type: String,
            required: false,
            default: '600px'
        },
        language: {
            type: String,
            required: false,
            default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
        }
    },
    data() {
        return {
            editor: null
        }
    },
    computed: {
        editorOptions() {
            const options = Object.assign({}, defaultOptions, this.options)
            options.initialEditType = this.mode
            options.height = this.height
            options.language = this.language
            return options
        }
    },
    watch: {
        value(newValue, preValue) {
            if (newValue !== preValue && newValue !== this.editor.getValue()) {
                this.editor.setValue(newValue)
            }
        },
        language(val) {
            this.destroyEditor()
            this.initEditor()
        },
        height(newValue) {
            this.editor.height(newValue)
        },
        mode(newValue) {
            this.editor.changeMode(newValue)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initEditor()
        })
    },
    destroyed() {
        this.destroyEditor()
    },
    methods: {
        initEditor() {
            this.editor = new tui.Editor({
                el: document.querySelector('#markdown-editor'),
                ...this.editorOptions
            })
            if (this.value) {
                this.editor.setValue(this.value)
            }
            this.editor.on('change', () => {
                this.$emit('input', this.editor.getValue())
            })
        },
        destroyEditor() {
            if (!this.editor) return
            this.editor.off('change')
            this.editor.remove()
        },
        setValue(value) {
            this.editor.setValue(value)
        },
        getValue() {
            return this.editor.getValue()
        },
        setHtml(value) {
            this.editor.setHtml(value)
        },
        getHtml() {
            return this.editor.getHtml()
        }
    }
}
</script>
<style lang="scss" scoped>
#markdown-editor {
    line-height: normal;
}
</style>
