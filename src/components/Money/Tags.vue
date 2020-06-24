<template>
  <div class="tags">
    <div class="new">
      <button @click="create">
        新增标签
      </button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="select(tag)"
          :class="{selected : selectedTags.indexOf(tag.name) >= 0 }">{{tag.name}}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/store2';

  @Component
  export default class Tags extends Vue {
    tagList = store.fetchTags();

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
      store.createdTag()
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