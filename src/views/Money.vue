<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :type.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{recordList}}
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  const version = window.localStorage.getItem('version') || '0';
  const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]') ;

  if(version === '0.0.1'){
    //数据升级  //数据迁移
    recordList.forEach(record =>{
      record.createdAt = new Date(2020,0,1)
    })
    //保存数据
    window.localStorage.setItem('recordList',JSON.stringify(recordList))
  }

  window.localStorage.setItem('version','0.0.2');

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
  }

  @Component({
    components: {Tags, Types, Notes, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    recordList: Record[] = recordList;
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

      if(this.tags.indexOf(this.record.tags[0]) < 0){
        window.alert('请选择标签')
      }else{
        const record2: Record = JSON.parse(JSON.stringify(this.record))
        record2.createdAt = new Date();
        this.recordList.push(record2)
        window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
      }
    }

  }

</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
