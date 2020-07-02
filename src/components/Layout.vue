<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props:['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    display: flex;  //使用flex布局
    flex-direction: column; //方向是上下形式
    /*min-height: 100vh;  //高度100 vh是view Height*/
    /*height: 100vh; !* Fallback for browsers that do not support Custom Properties *!*/
    /*min-height: 100vh; !* Fallback for browsers that do not support Custom Properties *!*/
    height: calc(var(--vh, 1vh) * 100);
  }
  .content{

    overflow: auto;   //超出set height 显示滚动条
    flex-grow: 1;   //该属性指定flex容器剩余空间多少应该分配给项目
  }
</style>