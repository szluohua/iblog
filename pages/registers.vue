<template>
  <a-form
    :form="form"
    class="register-form"
    @submit="handleSubmit"
  >
<a-form-item
      v-bind="formItemLayout"
    >
      <span slot="label">
        Username&nbsp;
        <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
	v-decorator="[
		'username',
		{
		rules: [{
            validator: checkUsernameIsValid
        }]
		}
	]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="E-mail"
    >
        <a-input
        v-decorator="[
            'email',
            {
                rules: [{
                validator: checkEmailIsValid
            }]
            }
        ]"
        />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Password"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>

    <a-form-item v-bind="tailFormItemLayout">
      <a-button
        type="primary"
        html-type="submit"
        style="width: 100%"
>
        Register
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { register } from '@/api/index'
import { toastr } from '@/utils/index'
const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake'
        }]
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
        }]
    }]
}]

export default {
    layout: 'loginLayout',
    data() {
        return {
            confirmDirty: false,
            residences,
            autoCompleteResult: [],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0
                    },
                    sm: {
                        span: 16,
                        offset: 8
                    }
                }
            }
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this)
    },
    methods: {
        checkEmailIsValid(rule, value, callback) {
            value = value.trim()
            if (!value) {
                callback('请输入邮箱')
            } else if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/.test(value)) {
                callback('邮箱格式错误')
            } else {
                callback()
            }
        },
        checkUsernameIsValid(rule, value, callback) {
            value = value.trim()
            if (!value) {
                callback('请输入用户名')
            } else {
                callback()
            }
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFieldsAndScroll(async (err, values) => {
                if (!err) {
                    const res = await register(values)
                    if (res) {
                        toastr(Swal, 'success', '用户创建成功！')
                        setTimeout(() => {
                            this.$router.push({ path: '/login' })
                        }, 2000)
                    }
                }
            })
        },
        handleConfirmBlur(e) {
            const value = e.target.value
            this.confirmDirty = this.confirmDirty || !!value
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!')
            } else {
                callback()
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form
            if (value && this.confirmDirty) {
                form.validateFields(['confirm'], { force: true })
            }
            callback()
        },
        handleWebsiteChange(value) {
            let autoCompleteResult
            if (!value) {
                autoCompleteResult = []
            } else {
                autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
            }
            this.autoCompleteResult = autoCompleteResult
        }
    }
}
</script>
<style lang="scss" scoped>
.register-form {
    max-width: 300px;
    margin: 150px auto 0;
}
</style>
