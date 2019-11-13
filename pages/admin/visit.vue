<template>
<div>
    <a-table
    bordered
    :data-source="dataSource"
    :columns="columns"
    row-key="_id"
    :loading="loading"
    >
        <template slot="updatedAt" slot-scope="record">
            <p>
                {{ $dayjs(record).format('YYYY-MM-DD HH:mm') }}
            </p>
        </template>
        <template slot="role" slot-scope="record">
            <a-tag v-for="(value, index) in record" :key="index">
                {{ value }}
            </a-tag>
        </template>
    </a-table>
</div>
</template>

<script>
import { getIPs } from '@/api/index'
export default {
    layout: 'adminLayout',
    data() {
        return {
            dataSource: [],
            loading: false,
            columns: [{
                title: 'IP',
                dataIndex: 'ip'
            }, {
                title: '区域',
                dataIndex: 'address'
            }, {
                title: '最后更新时间',
                dataIndex: 'updatedAt',
                scopedSlots: {
                    customRender: 'updatedAt'
                }
            }
            ]
        }
    },
    mounted() {
        this.getAllRecords()
    },
    methods: {
        async getAllRecords() {
            this.loading = true
            const res = await getIPs()
            this.loading = false
            if (res) {
                this.dataSource = res
            }
        }
    }
}
</script>

<style>

</style>
