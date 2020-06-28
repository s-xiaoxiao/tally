<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
<!--    <Types :type.sync="record.type"/>-->
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags  @update:value="onUpdateTags"/>
    {{this.record}}
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index'
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';


  // const version = window.localStorage.getItem('version') || '0';
  // if(version === '0.0.1'){
  //   //数据升级  //数据迁移
  //   recordList.forEach(record =>{
  //     record.createdAt = new Date(2020,0,1)
  //   })
  //   //保存数据
  //   window.localStorage.setItem('recordList',JSON.stringify(recordList))
  // }
  // window.localStorage.setItem('version','0.0.2');


  @Component({
    components: {Tabs, Tags,FormItem, NumberPad}
  })
  export default class Money extends Vue {
    created() {
      this.$store.commit('fetchRecords');
    }
    get tagList(){
      return store.state.tagList
    }
    recordTypeList = recordTypeList
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
      createdAt:''
    };
    onUpdateTags(tags: string[]) {
      console.log(tags, typeof tags);
      this.record.tags = tags;
    }

    onUpdateNotes(value: string) {
      console.log(value, typeof value);
      this.record.notes = value;
    }
    onUpdateAmount(value: number) {
      console.log(value, typeof value);
      this.record.amount = value;
    }
    saveRecord(){
      const tags = this.tagList.map(t=> t.name)
      if(tags.indexOf(this.record.tags[0]) < 0){
        window.alert('请选择标签')
      }else{
        this.$store.commit('createRecord',this.record);
      }
    }
  }

</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>
