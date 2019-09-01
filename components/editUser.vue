<template>
    <div>
        <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
        <a-modal title="Title" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
        </a-modal>
    </div>
</template>

<script>
    export default {
        props: {
            userData: {
                type: Object
            }
        },
        data() {
            return {
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
            }
        },
        methods: {
            showModal() {
                this.visible = true
            },
            handleOk(e) {
                this.ModalText = 'The modal will be closed after two seconds';
                this.confirmLoading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                }, 2000);
            },
            handleCancel(e) {
                console.log('Clicked cancel button');
                this.visible = false
            }
        }
    }
</script>
