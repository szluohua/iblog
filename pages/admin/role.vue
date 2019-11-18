<template>
<div class="role-container">
    <a-form :form="form" :layout="'inline'" @submit="handleSubmit" style="height: 80px;">
    <a-form-item
        class="form-item-limit"
        label="名称"
        style="width: 270px;"
    >
        <a-input
            v-decorator="[
                'name',
                {
                    rules: [
                        {
                            max: 12,
                            message: '请输入角色名，12字符以内!',
                            required: true
                        }
                    ]
                }
            ]"
        />
    </a-form-item>
    <a-form-item
        class="form-item-limit"
        label="角色Id"
    >
        <a-input
            v-decorator="[
                'roleId',
                {
                    rules: [
                        {
                            required: true,
                            min: 3,
                            max: 12,
                            pattern: /[A-Za-z]/,
                            required: true,
                            message: 'roleId必须为字母，3-12位!'
                        }
                    ]
                }
            ]"
        />
    </a-form-item>
    <a-form-item>
        <a-button type="primary" html-type="submit">
            新增角色
        </a-button>
    </a-form-item>
</a-form>
<a-table :columns="columns" :data-source="data" bordered row-key="_id">
    <template v-for="col in ['name', 'roleId']" :slot="col" slot-scope="text, record">
      <div :key="col">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="e => handleChange(e.target.value, record, col)"
          style="margin: -5px 0"
        />
        <template v-else>
        {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
            <!-- Todo: 暂未关联用户model，暂时不能删除          -->
            <a-button :disabled="true" @click="deleteRecord(record)" style="margin-left: 1rem;" type="danger">
                Delete
            </a-button>
      </div>
    </template>
</a-table>
</div>
</template>
<script>
import { createRole, getRole, removeRole } from '@/api/index'
import { toastr } from '@/utils/index'
const columns = [{
    title: '角色名',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' }
}, {
    title: '角色Id',
    dataIndex: 'roleId',
    width: '15%',
    scopedSlots: { customRender: 'roleId' }
}, {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
}]

export default {
    layout: 'adminLayout',
    data() {
        // this.cacheData = data.map(item => ({ ...item }))
        return {
            form: this.$form.createForm(this),
            data: [],
            columns,
            origin: []
        }
    },
    beforeMount() {
        this.getRoleList()
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    const res = await createRole(values)
                    if (res) {
                        toastr(Swal, 'success', '创建角色成功！')
                        this.data.unshift(res)
                        this.form.resetFields()
                    }
                }
            })
        },
        async getRoleList() {
            const res = await getRole()
            if (res) {
                this.data = res
            }
        },
        async deleteRecord(record) {
            const res = await removeRole({ _id: record._id })
            if (res) {
                toastr(Swal, 'success', '删除角色成功！')
                this.getRoleList()
            }
        }
    }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
