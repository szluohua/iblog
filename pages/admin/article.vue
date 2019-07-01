<template>
    <div class="create-article-container">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item
                style="text-align: right; margin-right: 16px;"
                :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button type="primary" html-type="submit">
                    Submit
                </a-button>
            </a-form-item>
            <a-form-item
                class="form-item-limit"
                label="Title"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-input
                    v-decorator="[
                        'title',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your title!'
                                }
                            ]
                        }
                    ]"
                />
            </a-form-item>
            <a-form-item
                class="form-item-limit"
                label="Desc"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-textarea
                    v-decorator="[
                        'desc',
                        {
                            rules: [
                                {
                                    required: false,
                                    message: 'Please input your desc!'
                                }
                            ]
                        }
                    ]"
                    placeholder="Basic usage"
                    :rows="4"
                />
            </a-form-item>
            <a-form-item
                class="form-item-limit"
                label="Category"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select
                    v-decorator="[
                        'category',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select your category!'
                                }
                            ]
                        }
                    ]"
                    mode="multiple"
                    placeholder="请选择文章标签"
                    @change="categoryChange"
                >
                <a-select-option v-for="item in filteredOptions" :key="item" :value="item">
                {{ item }}
                </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="Content"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <markdown-editor ref="markdownEditor" v-model="content" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import MarkdownEditor from '@/components/markdown-editor'
import { createArticle, getCategoryList } from '@/api/index'
import { toastr } from '@/utils/index'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
export default {
    name: 'Article',
    layout: 'adminLayout',
    components: {
        MarkdownEditor
    },
    data() {
        return {
            form: this.$form.createForm(this),
            type: 'md',
            content: '',
            selectedCategory: []
        }
    },
    computed: {
        filteredOptions() {
            return OPTIONS.filter(o => !this.selectedCategory.includes(o))
        }
    },
    async mounted() {
        console.log('ss', await getCategoryList())
    },
    methods: {
        categoryChange(value) {
            this.selectedCategory = value
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    values = Object.assign(
                        {
                            type: this.type,
                            content: this.content
                        },
                        values
                    )
                    const res = await createArticle(values)
                    if (res) {
                        toastr(Swal, 'success', '创建文章成功！')
                        this.form.resetFields([
                            'title',
                            'desc',
                            'category',
                            'content'
                        ])
                        this.$refs.markdownEditor.resetEditor()
                        this.content = ''
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.form-item-limit {
    max-width: 600px;
}
</style>
