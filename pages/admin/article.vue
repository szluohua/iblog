<template>
  <div class="create-article-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Title" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
            'title',
            {rules: [{ required: true, message: 'Please input your title!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item label="Desc" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-textarea
          v-decorator="[
            'desc',
            {rules: [{ required: true, message: 'Please input your desc!' }]}
          ]"
          placeholder="Basic usage"
          :rows="4"
        />
      </a-form-item>
      <a-form-item label="Category" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-select
          v-decorator="[
            'category',
            {rules: [{ required: true, message: 'Please select your category!' }]}
          ]"
          placeholder="Select a option and change input text above"
        >
          <a-select-option value="male">
            male
          </a-select-option>
          <a-select-option value="female">
            female
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Content" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <editor
          v-decorator="[
            'content',
            {rules: [{ required: true, message: 'Please select your content!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import editor from '@/components/editor'
import { createArticle } from '@/api/index'
export default {
    name: 'Article',
    components: {
        editor
    },
    data() {
        return {
            form: this.$form.createForm(this),
            type: 'md'
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    values = Object.assign({ type: this.type }, values)
                    const res = await createArticle(values)
                    if (res) {
                        console.log('res', res)
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .editor-container {
        width: 1000px;
    }
</style>
