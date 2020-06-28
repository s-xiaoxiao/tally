<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
    <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
  </Layout>
</template>

<style lang="scss" scoped>
  // ::v-deep style有scoped属性时，有此指令组件里元素可以匹配此类选择器
  ::v-deep .type-tabs-item {
    background: white;

    border: 1px solid rgb(236, 236, 236);
    &.selected {
      background: rgb(7, 193, 96);
      color: white;
      &::after {
        display: none;
      }
    }
  }
  ::v-deep .interval-tabs-item{
    background: rgb(222,221,221);
    height: 32px !important;
    line-height:32px !important;
    font-size: 14px !important;
    &.selected{
      background: rgb(197,196,196);
      &::after{
        display: none;
      }
    }
  }
</style>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Types from '@/components/Money/Types.vue';
  import Tabs from '@/components/Tabs.vue';

  @Component({
    components: {Tabs, Types}
  })
  export default class Statistics extends Vue {
    type = '-';
    interval = 'day'
    typeList = [
      {text: '支出', value: '-'},
      {text: '收入', value: '+'}
    ];
    intervalList = [
      {text: '天', value: 'day'},
      {text: '周', value: 'week'},
      {text: '月', value: 'month'},
    ]
  }
</script>