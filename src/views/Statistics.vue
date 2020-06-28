<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
    <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
    <ol>
      <li v-for="(group,index) in  result" :key="index">
        <h3 class="title">
          {{group.title}}
        </h3>
        <ol>
          <li v-for="(item) in group.items" :key="item.id" class="record">
            <span>{{item.tags[0]}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      const hashTable: { [key: string]: { title: string; items: RecordItem[] } } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt.split('T');
        console.log(date);
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    typeList = recordTypeList;
    intervalList = intervalList;
  }
</script>


<style lang="scss" scoped>
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item
  }
  .record{
    background: white;
    @extend %item
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  // ::v-deep style有scoped属性时，有此指令组件里元素可以匹配此类选择器
  ::v-deep {
    .type-tabs-item {
      background: white;
      border-bottom: 1px solid rgb(236, 236, 236);
      &.selected {
        background: rgb(7, 193, 96);
        color: white;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      background: rgb(222, 221, 221);
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      &.selected {
        background: rgb(197, 196, 196);
        &::after {
          display: none;
        }
      }
    }
  }
</style>
