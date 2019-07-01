<template>
    <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-form-item
            :validate-status="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
        >
            <a-input
                v-decorator="[
                    'username',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    }
                ]"
                placeholder="Username"
            >
                <a-icon
                    slot="prefix"
                    type="user"
                    style="color:rgba(0,0,0,.25)"
                />
            </a-input>
        </a-form-item>
        <a-form-item
            :validate-status="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
        >
            <a-input
                v-decorator="[
                    'password',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    }
                ]"
                type="password"
                placeholder="Password"
            >
                <a-icon
                    slot="prefix"
                    type="lock"
                    style="color:rgba(0,0,0,.25)"
                />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                :disabled="hasErrors(form.getFieldsError())"
            >
                Log in
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { login } from '@/api/index'
const Cookie = process.client ? require('js-cookie') : undefined
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
    data() {
        return {
            hasErrors,
            form: this.$form.createForm(this)
        }
    },
    mounted() {},
    methods: {
        // Only show error after a field is touched.
        userNameError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('username') && getFieldError('username')
        },
        // Only show error after a field is touched.
        passwordError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('password') && getFieldError('password')
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    login(values).then((res) => {
                        if (res && res.jwt) {
                            this.$store.commit('setAuth', res.jwt) // 存储在vuex中用来进行客户端渲染
                            Cookie.set('auth', res.jwt, {
                                expires: new Date(
                                    new Date().getTime() +
                                        res.expires * 86400000
                                )
                            }) // 在cookie中保存token用来进行服务器端渲染
                            this.$router.push('/admin/article')
                        }
                    })
                }
            })
        }
    }
}
</script>
