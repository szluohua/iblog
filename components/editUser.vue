<template>
  <a-modal
    :visible="visible"
    title="更新用户信息"
    ok-text="保存"
    cancel-text="取消"
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
            v-decorator="[
                'email',
                {
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }]
                }
            ]"
            :disabled="true"
        />
      </a-form-item>
      <a-form-item
        class="form-item-limit"
        label="角色"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-select
          v-decorator="[
                    'role',
                    {
                        rules: [
                            {
                                required: true,
                                message: '请选择用户角色!'
                            }
                        ]
                    }
                ]"
          label-in-value
          mode="multiple"
          placeholder="请选择用户角色"
          @change="roleChange"
        >
          <a-select-option
            v-for="(item, index) in filteredOptions"
            :key="index"
            :value="item.roleId"
          >
            {{ item.name }}
            </a-select-option>
        </a-select>
      </a-form-item>
      <!-- <a-form-item v-bind="formItemLayout" label="新密码">
        <a-input
          v-decorator="[
              'password'
            ]"
          type="password"
        />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script>
import { getRole } from '@/api/index'
export default {
    props: {
        visible: Boolean,
        user: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            confirmDirty: false,
            form: this.$form.createForm(this),
            roleList: [],
            selectedRole: [],
            formItemLayout: {
                labelCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 8
                    }
                },
                wrapperCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 16
                    }
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
    computed: {
        filteredOptions() {
            const keys = this.selectedRole.map((v) => {
                return v.key
            })
            return this.roleList.filter((o) => {
                return !keys.includes(o.roleId)
            })
        }
    },
    mounted() {
        const email = this.user.email
        const role = this.user.role || []
        if (email) {
            this.form.setFieldsValue({
                email
            })
        }
        getRole().then((res) => {
            if (res) {
                this.roleList = res
                const list = this.roleList.filter((v) => {
                    return role.includes(v.roleId)
                })
                if (list.length) {
                    this.selectedRole = list.map((v) => {
                        return {
                            label: v.name,
                            key: v.roleId
                        }
                    })
                    this.form.setFieldsValue({
                        role: this.selectedRole
                    })
                }
            }
        })
    },
    methods: {
        roleChange(value) {
            this.selectedRole = value
        },
        handleSubmit(e) {
            e.preventDefault()

            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                }
            })
        }
    }
}
</script>
