<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
    <ol>
      <li v-for="(group,index) in  groupedList" :key="index">
        <h3 class="title">
          {{beautiful(group.title)}} <span>{{group.total}}</span>
        </h3>
        <ol>
          <li v-for="(item,index) in group.items" :key="index" class="record">
            <span>{{item.tags[0]}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
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
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    beautiful(string: string) {
      if (dayjs(string).isSame(dayjs(), 'day')) {
        return '今天';
      } else if (dayjs(string).isSame(dayjs().subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (dayjs(string).isSame(dayjs().subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (dayjs(string).isSame(dayjs(), 'year')) {
        return dayjs(string).format('M月D日');
      } else {
        return dayjs(string).format('YYYY年M月D日');
      }

    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if(newList.length === 0){return [] as Result}
      const newListLen = newList.length;
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newListLen; i++) {
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(newList[i].createdAt), 'day')) {
          last.items.push(newList[i]);
        } else {
          result.push({title: dayjs(newList[i].createdAt).format('YYYY-MM-DD'), items: [newList[i]]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount,0);
      });
      return result;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    typeList = recordTypeList;
  }
</script>


<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item
  }

  .record {
    background: white;
    @extend %item
  }

  .notes {
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
