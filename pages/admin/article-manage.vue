<template>
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
        <template slot="updatedAt" slot-scope="record">
            <p>
                {{ $dayjs(record).format('YYYY-MM-DD HH:mm') }}
            </p>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="editRecord(record)">
                编辑
            </a-button>
            <a-button style="margin-left: 1rem;" type="danger" @click="deleteRecord(record)">
                删除
            </a-button>
        </template>
    </a-table>
</template>

<script>
import {
    getArticleList,
    deleteArticle
} from '@/api/index'
export default {
    layout: 'adminLayout',
    data() {
        return {
            dataSource: [],
            loading: false,
            columns: [{
                title: '文章标题',
                dataIndex: 'title',
                width: '30%'
            }, {
                title: '作者',
                dataIndex: 'createBy.username'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                scopedSlots: {
                    customRender: 'createdAt'
                }
            },
            {
                title: '最后更新时间',
                dataIndex: 'updatedAt',
                scopedSlots: {
                    customRender: 'updatedAt'
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
        this.getArticle()
    },
    methods: {
        async getArticle() {
            this.loading = true
            const res = await getArticleList({ limit: 'all' })
            this.loading = false
            if (res) {
                this.dataSource = res
            }
        },
        editRecord(record) {
            this.$router.push({ path: '/admin/article', query: { _id: record._id } })
        },
        deleteRecord(record) {
            const _this = this
            const userInfo = this.$store.state.user
            Swal.fire({
                title: '您确定吗？',
                text: '该操作不可恢复',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '确定删除',
                confirmButtonColor: '#f5222d',
                cancelButtonText: '取消',
                reverseButtons: true
            }).then(async (result) => {
                if (result.value) {
                    const res = await deleteArticle({ _id: record._id, userId: userInfo._id })
                    if (res) {
                        Swal.fire(
                            '删除成功！',
                            '文章已成功删除！',
                            'success'
                        )
                    }
                    _this.getArticle()
                }
            })
        }
    }
}
</script>

<style>

</style>
