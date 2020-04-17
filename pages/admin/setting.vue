<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="系统邮箱" v-bind="formItemLayout">
      <a-input
        v-decorator="['email', { rules: [{ required: true, message: '请输入系统邮箱' }] }]"
      />
    </a-form-item>
    <a-form-item label="授权码(密码)" v-bind="formItemLayout">
      <a-input
        v-decorator="['email_password', { rules: [{ required: true, message: '请输入邮箱授权码(密码)' }] }]"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" :loading="loading" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { toastr } from '@/utils/index'
import { createSetting, getAllSetting } from '@/api/index'
export default {
    layout: 'adminLayout',
    data() {
        return {
            loading: false,
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            formItemLayout: {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 12
                }
            }
        }
    },
    mounted() {
        this.getSetting()
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    this.loading = true
                    const res = await createSetting(values)
                    toastr(Swal, 'success', '更新成功！')
                    this.loading = false
                    if (res) {
                        console.log('res', res)
                    }
                }
            })
        },
        async getSetting() {
            const res = await getAllSetting()
            if (res) {
                const field = (key) => {
                    const tmp = res.find((val) => {
                        return val.key === key
                    })
                    return tmp || {}
                }
                this.form.setFieldsValue({
                    email: field('email').value,
                    email_password: field('email_password').value
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
// .form-item {
//     ::v-deep & > div {
//         display: inline-block;
//     }
// }
</style>
