<template>
<div>
    <a-table
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    bordered
    row-key="_id"
    >
        <template slot="createdAt" slot-scope="record">
            <p>
                {{ $dayjs(record).format('YYYY-MM-DD HH:mm') }}
            </p>
        </template>
        <template slot="role" slot-scope="record">
            <a-tag v-for="(value, index) in record" :key="index">
                {{ value }}
            </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="editRecord(record)">
                编辑
            </a-button>
        </template>
    </a-table>
    <editUser
      v-if="userData"
      ref="collectionForm"
      :visible="visible"
      :user="userData"
      @cancel="handleCancel"
      @create="handleCreate"
/>
</div>
</template>

<script>
import { findAllUser, updateUser } from '@/api/index'
import editUser from '@/components/editUser'
import { toastr } from '@/utils/index'
export default {
    layout: 'adminLayout',
    components: {
        editUser
    },
    data() {
        return {
            dataSource: [],
            visible: false,
            userData: null,
            loading: false,
            columns: [{
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '邮箱',
                dataIndex: 'email'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                scopedSlots: {
                    customRender: 'createdAt'
                }
            },
            {
                title: '角色',
                dataIndex: 'role',
                scopedSlots: {
                    customRender: 'role'
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: {
                    customRender: 'operation'
                }
            }
            ]
        }
    },
    mounted() {
        this.getAllUsers()
    },
    methods: {
        async getAllUsers() {
            this.loading = true
            const res = await findAllUser({ limit: 'all' })
            this.loading = false
            if (res) {
                this.dataSource = res
            }
        },
        editRecord(record) {
            this.userData = record
            this.visible = true
        },
        handleCancel() {
            this.visible = false
            this.userData = null
        },
        handleCreate() {
            const form = this.$refs.collectionForm.form
            form.validateFields(async (err, values) => {
                if (err) {
                    return
                }
                const { email, role } = values
                const res = await updateUser({
                    userId: this.userData._id,
                    email,
                    role: role.map((v) => {
                        return v.key
                    })
                })
                if (res) {
                    form.resetFields()
                    this.visible = false
                    this.userData = null
                    toastr(Swal, 'success', '更新用户信息成功！')
                    this.getAllUsers()
                }
            })
        }
    }
}
</script>

<style>

</style>
