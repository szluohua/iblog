<template>
<div class="personal-setting-container">
    <div class="switch-wrapper">
        <h3>
            双因素认证
            <a-tooltip title="双因素认证是一种采用时间同步技术的系统，采用了基于时间、事件和密钥三变量而产生的一次性密码来代替传统的静态密码。">
                <a-icon type="question-circle-o" />
            </a-tooltip>
            :
        </h3>
        <a-switch v-model="authSwitch" style="margin-left: 10px;" @change="changeAuthSwitch" />
    </div>
    <div v-if="showContainer" class="otp-container">
        <template v-if="showContainer === 'open'">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content">
                <div v-show="current === 0" class="step-1">
                    <p>请使用双因素验证应用程序下方二维码: </p>
                    <p>常见的应用程序有：google authenticator、microsoft authenticator、authy</p>
                    <img :src="qrurl" width="200" height="200" alt="">
                </div>
                <div v-show="current === 1" class="step-2">
                    <h5>请输入验证码</h5>
                    <a-input v-model="code" />
                </div>
            </div>
            <div class="steps-action">
                <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                    下一步
                </a-button>
                <a-button v-if="current == steps.length - 1" type="primary" @click="verify('auth')">
                    完成
                </a-button>
                <a-button v-if="current>0" style="margin-left: 8px" @click="prev">
                    上一步
                </a-button>
            </div>
        </template>
        <template v-if="showContainer === 'close' ">
            <div class="close-otp">
                <h5>请输入验证码</h5>
                <a-input v-model="code" />
                <a-button type="primary" style="margin-top: 20px;" @click="verify('close')">
                    关闭双因素认证
                </a-button>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import { signQRCode, setOtpAuth } from '@/api/index'
import { mapState } from 'vuex'
import { toastr } from '@/utils/index'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    data() {
        return {
            current: 0,
            authSwitch: false,
            password: '',
            showContainer: '',
            qrurl: '',
            code: '',
            steps: [{
                title: '第一步'
            }, {
                title: '第二步'
            }]
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => { return state.user }
        })
    },
    mounted() {
        this.authSwitch = this.userInfo.otpAuth
    },
    methods: {
        async changeAuthSwitch(value) {
            if (value) {
                const res = await signQRCode({ userId: this.userInfo._id })
                if (res) {
                    this.qrurl = res.url
                    this.showContainer = 'open'
                }
            } else {
                this.showContainer = 'close'
            }
        },
        async verify(type) {
            if (!this.code) {
                return
            }
            const res = await setOtpAuth({
                type,
                token: this.code,
                userId: this.userInfo._id
            })
            if (res) {
                this.showContainer = ''
                if (type === 'auth') {
                    this.next()
                    this.authSwitch = true
                } else {
                    this.authSwitch = false
                }
                const user = Object.assign({}, this.userInfo, { otpAuth: type === 'auth' })
                Cookie.set('user', user, {
                    expires: new Date(
                        new Date().getTime() +
                            7 * 86400000
                    )
                })
                this.$store.commit('setUserInfo', user)
                toastr(Swal, 'success', '保存成功')
            }
        },
        next() {
            if (!this.qrurl) {
                return
            }
            this.current++
        },
        prev() {
            this.current--
        }
    }
}
</script>

<style scoped lang="scss">
    .personal-setting-container {
        width: 900px !important;
        background-color: #fff;
        padding: 20px;
        border: 1px solid #ededed;
        border-radius: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }
    .switch-wrapper {
        display: flex;
    }
    .otp-container {
        // width: 900px !important;
        // background-color: #fff;
    }
    .close-otp {
        margin: 0 auto;
        width: 200px;
    }
    .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        min-height: 200px;
        text-align: center;
        padding-top: 20px;
        & .step-2 {
            width: 220px;
            margin: 0 auto;
        }
    }
    .steps-action {
        margin-top: 24px;
    }
</style>
