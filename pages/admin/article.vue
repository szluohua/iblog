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
            <a-form-item>
                新增标签：
                <a-switch v-model="addCategory" />
            </a-form-item>
            <a-form-item v-if="addCategory" class="form-item-limit">
                <a-input v-model="newCategory" />
                <a-button type="primary" @click="addNewCategory">
                    新增标签
                </a-button>
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
                    label-in-value
                    mode="multiple"
                    placeholder="请选择文章标签"
                    @change="categoryChange"
                >
                <a-select-option v-for="(item, index) in filteredOptions" :key="index" :value="item._id">
                {{ item.name }}
                </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                上传附件：
                <a-switch v-model="showUpload" />
            </a-form-item>
            <a-form-item v-if="showUpload">
                <a-upload-dragger :show-upload-list="false" name="file" action="https://upload-z2.qiniup.com" :data="uploadToken" @change="handleChange">
                    <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p class="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
                    </p>
                </a-upload-dragger>
                <div />
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
import { createArticle, getCategoryList, getUploadToken, createCategory } from '@/api/index'
import { toastr } from '@/utils/index'
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
            selectedCategory: [],
            uploadToken: {},
            showUpload: false,
            addCategory: false,
            newCategory: '',
            categoryList: []
        }
    },
    computed: {
        filteredOptions() {
            const keys = this.selectedCategory.map((v) => { return v.key })
            return this.categoryList.filter((o) => {
                return !keys.includes(o._id)
            })
        }
    },
    async mounted() {
        this.getAllCategory()
        const token = await getUploadToken()
        this.uploadToken = token
    },
    methods: {
        async addNewCategory() {
            const value = this.newCategory.trim()
            if (value) {
                const exist = this.categoryList.find((v) => {
                    return v.name === value
                })
                if (exist !== undefined) {
                    return toastr(Swal, 'error', '存在同名标签，不可创建！')
                }
                const res = await createCategory({ name: value })
                if (res) {
                    this.categoryList.push(res)
                    toastr(Swal, 'success', '创建标签成功！')
                    this.newCategory = ''
                }
            }
        },
        handleChange(event) {
            const res = event.file.response
            if (res && res.key) {
                toastr(Swal, 'success', '上传成功！')
                const api = 'http://localhost:3000/api'
                this.content += `\n![image]( ${api}/v1/getFile?key=${res.key})`
            }
        },
        categoryChange(value) {
            this.selectedCategory = value
        },
        async getAllCategory() {
            const res = await getCategoryList()
            if (res) {
                this.categoryList = res
            }
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    values.category = values.category.map((v) => {
                        return v.key
                    })
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
