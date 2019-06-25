<template>
  <div class="header-container">
    <div class="menu">
      <div class="menu-item">
        首页
      </div>
      <div class="menu-item">
        文章
      </div>
      <div class="menu-item">
        随笔
      </div>
      <div class="menu-item">
        关于
      </div>
    </div>
    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  </div>
</template>

<script>
export default {
    name: 'Header',
    components: {},
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
    .header-container {
        height: 65px;
        border-bottom: 1px solid #ededed;
        .menu {
            display: flex;
        }
        .ant-avatar {
            float: right;
        }
    }
</style>
