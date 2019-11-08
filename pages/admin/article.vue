<template>
    <div class="create-article-container">
        <a-form :form="form" style="position: relative" @submit="handleSubmit">
            <div v-if="titlePhoto" class="review-img">
                <img :src="titlePhoto" width="200" height="200">
                <a-icon type="delete" @click="titlePhoto = ''" />
            </div>
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
                label="标题"
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
                label="文章简介"
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
                label="标签"
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
                上传文章标题图片：
                <a-switch v-model="uploadTitlePhoto" />
            </a-form-item>
            <a-form-item v-if="uploadTitlePhoto">
                <a-upload-dragger
                    name="file"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :custom-request="customRequest('title')"
                >
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
            <a-form-item>
                上传附件：
                <a-switch v-model="showUpload" />
            </a-form-item>
            <a-form-item v-if="showUpload">
                <a-upload-dragger
                    name="file"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :custom-request="customRequest('photo')"
                >
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
                label="文章内容"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <markdown-editor ref="markdownEditor" v-model="content" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import MarkdownEditor from '@/components/markdown-editor'
import { createArticle, getCategoryList, getUploadToken, createCategory, getArticleDetail, youpaiSignHeader } from '@/api/index'
import upyun from 'upyun'
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
            titlePhoto: '',
            newCategory: '',
            categoryList: [],
            editId: '',
            uploadTitlePhoto: false
        }
    },
    computed: {
        ...mapState({
            user: (state) => {
                return state.user
            }
        }),
        filteredOptions() {
            const keys = this.selectedCategory.map((v) => { return v.key })
            return this.categoryList.filter((o) => {
                return !keys.includes(o._id)
            })
        }
    },
    async mounted() {
        const articleId = this.$route.query._id
        if (articleId) {
            this.setArticleDetail(articleId)
        }
        this.getAllCategory()
        const token = await getUploadToken()
        this.uploadToken = token
    },
    methods: {
        async setArticleDetail(_id) {
            this.editId = _id
            const res = await getArticleDetail({ _id })
            if (res) {
                const { title, category, desc } = res
                this.form.setFieldsValue({
                    title,
                    category: category.map((v) => { return { label: v.name, key: v.id } }),
                    desc
                })
                this.content = res.content
            }
        },
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
        customRequest(data, type) {
            const file = data.file
            const bucket = new upyun.Service('jscode-top')
            const client = new upyun.Client(bucket, function (bucket, method, path) {
                const params = {
                    bucket: bucket.bucketName,
                    method,
                    path
                }
                return youpaiSignHeader(params).then((res) => {
                    return res
                })
            })
            const suffixArray = file.name.split('.')
            const suffix = suffixArray[suffixArray.length - 1]
            const path = `/article/${file.uid}.${suffix}`
            const _this = this
            client.putFile(path, file).then(async function (res) {
                toastr(Swal, 'success', '上传成功！')
                if (type === 'photo') {
                    this.content += `\n![image](${path})`
                } else {
                    this.titlePhoto = path
                }
            }).catch((err) => {
                console.log('err', err)
            })
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
                    if (this.editId) {
                        values._id = this.editId
                    }
                    values = Object.assign(
                        {
                            type: this.type,
                            content: this.content,
                            titlePhoto: this.titlePhoto,
                            createBy: {
                                _id: this.user._id,
                                avatar: this.user.avatar,
                                username: this.user.username
                            }
                        },
                        values
                    )
                    const res = await createArticle(values)
                    if (res) {
                        toastr(Swal, 'success', `${this.editId ? '编辑' : '创建'}文章成功！`)
                        this.form.resetFields([
                            'title',
                            'desc',
                            'category'
                        ])
                        this.content = ''
                        this.titlePhoto = ''
                        if (this.editId) {
                            this.editId = ''
                            this.$router.push({ path: '/admin/article' })
                        }
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
.review-img {
    position: absolute;
    left: 650px;
    top: 40px;
    & i {
        font-size: 25px;
        margin-left: 20px;
        cursor: pointer;
    }
}
</style>
