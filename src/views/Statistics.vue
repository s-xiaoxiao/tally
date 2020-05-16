<template>
  <div class="wrapper">
    <div class="content">
      Statistics.vue
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Statistics',
  };
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;  //使用flex布局
    flex-direction: column; //方向是上下形式
    height: 100vh;  //高度100 vh是view Height
  }
  .content{
    overflow: auto;   //超出set height 显示滚动条
    flex-grow: 1;   //该属性指定flex容器剩余空间多少应该分配给项目
  }
</style>