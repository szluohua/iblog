<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    @submit="handleSubmit"
    class="login-form"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
      >
        Remember me
      </a-checkbox>
      <a
        class="login-form-forgot"
        href=""
      >
        Forgot password
      </a>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Log in
      </a-button>
      Or <nuxt-link to="/register">
        register now
        </nuxt-link>
    </a-form-item>
  </a-form>
</template>

<script>
import { login } from '@/api/index'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    beforeCreate() {
        this.form = this.$form.createForm(this)
    },
    layout: 'loginLayout',
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    login(values).then((res) => {
                        if (res) {
                            if (res.jwt) {
                                const { jwt, expires, ...user } = res
                                this.$store.commit('setAuth', jwt) // 存储在vuex中用来进行客户端渲染
                                this.$store.commit('setUserInfo', user)
                                Cookie.set('auth', jwt, {
                                    expires: new Date(
                                        new Date().getTime() +
                                            expires * 86400000
                                    )
                                }) // 在cookie中保存token用来进行服务器端渲染
                                Cookie.set('user', user, {
                                    expires: new Date(
                                        new Date().getTime() +
                                            expires * 86400000
                                    )
                                })
                                this.$router.push('/')
                            } else if (res.otp_token) {
                                Cookie.set('otp_token', res.otp_token, {
                                    expires: new Date(
                                        new Date().getTime() +
                                            res.expires * 86400000
                                    )
                                }) // 在cookie中保存token用来进行服务器端渲染
                                this.$router.push('/session')
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>
<style>
#components-form-demo-normal-login {
  max-width: 300px;
  margin: 200px auto 0;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
