<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :type.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{this.record}}
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';

  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';

  import recordListModel from '@/models/recordListModel';




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
    components: {Tags, Types,FormItem, NumberPad}
  })
  export default class Money extends Vue {
    tags = window.tagList;

    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
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
      const tags = this.tags.map(t => t.name)
      if(tags.indexOf(this.record.tags[0]) < 0){
        window.alert('请选择标签')
      }else{
        recordListModel.create(this.record)
        recordListModel.save()
      }
    }
    @Watch('tags')
    onTagsChanged(){
      console.log(this.tags);
    }
  }

</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>
