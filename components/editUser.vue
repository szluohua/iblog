<template>
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="E-mail">
            <a-input v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }]
              }
            ]" />
        </a-form-item>
        <a-form-item class="form-item-limit" label="Category" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="[
                    'category',
                    {
                        rules: [
                            {
                                required: true,
                                message: '请选择用户角色!'
                            }
                        ]
                    }
                ]" label-in-value mode="multiple" placeholder="请选择用户角色" @change="roleChange">
                <a-select-option v-for="(item, index) in filteredOptions" :key="index" :value="item.roleId">
                    {{ item.name }}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password">
            <a-input v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: validateToNextPassword,
                }],
              }
            ]" type="password" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Confirm Password">
            <a-input v-decorator="[
              'confirm',
              {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]" type="password" @blur="handleConfirmBlur" />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">
                Register
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { getRole } from '@/api/index'
export default {
    data() {
        return {
            confirmDirty: false,
            roleList: [],
            selectedRole: [],
            formItemLayout: {
                labelCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 8
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 16
                    },
                },
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            },
        };
    },
    computed: {
        filteredOptions() {
            const keys = this.selectedRole.map((v) => { return v.roleId })
            return this.roleList.filter((o) => {
                return !keys.includes(o.roleId)
            })
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
        getRole().then(res => {
            if (res) {
                this.roleList = res
            }
        })
    },
    methods: {
        roleChange(value) {
            this.selectedRole = value
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['confirm'], {
                    force: true
                });
            }
            callback();
        }
    },
};
</script>