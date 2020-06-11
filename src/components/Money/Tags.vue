<template>
  <div class="tags">
    <div class="new">
      <button @click="create">
        新增标签
      </button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id" @click="select(tag)"
          :class="{selected : selectedTags.indexOf(tag.name) >= 0 }">{{tag.name}}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import createdId from '@/lib/createdId';

  @Component
  export default class Tags extends Vue {
    @Prop() dataSource: Tag[] | undefined;

    selectedTags: string[] = [];

    select(tag: Tag) {
      console.log(typeof tag.name);
      console.log(this.selectedTags);
      if (this.selectedTags.length >= 1 ) {
        if(this.selectedTags[0] !== tag.name){
          this.selectedTags.pop()
          this.selectedTags.push(tag.name);
          this.$emit('update:value',this.selectedTags)
        }else{
          this.selectedTags.pop();
          this.$emit('update:value',this.selectedTags)
        }
      }else{
        this.selectedTags.push(tag.name);
        this.$emit('update:value',this.selectedTags)
      }
    }

    create(){
      const name = window.prompt('输入标签名')
      const data = this.dataSource?.map(t => t.name)
      if(name === '' || name === null){
        window.alert('不能为空')
      } else if (name && data && data?.indexOf(name)<=0){
        tagListModel.create(name)
        // this.dataSource && this.$emit('update:dataSource',[...this.dataSource,{id:createdId(),name:name}])
      }else{
        window.alert('标签名重复了')
        this.create();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    padding: 16px;
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;
      overflow: auto;

      li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          color: white;
          background: darken($bg, 50);
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 5px;
      }
    }
  }
</style>