<template>
    <a-table
    bordered
    :data-source="dataSource"
    :columns="columns"
    row-key="_id"
    :loading="loading"
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
                Edit
            </a-button>
        </template>
    </a-table>
</template>

<script>
import { findAllUser } from '@/api/index'
export default {
    layout: 'adminLayout',
    data() {
        return {
            dataSource: [],
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
            this.$router.push({ path: '/admin/article', query: { _id: record._id } })
        }
    }
}
</script>

<style>

</style>
