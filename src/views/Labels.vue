<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span> <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createdTag"> 添加标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  tagListModel.fetch();

  @Component
  export default class Labels extends Vue{
    tags = tagListModel.data;
    createdTag(){
      const name = window.prompt('输入标签名')


      if(name){
        const message = tagListModel.create(name)

        console.log(message);

        if(message === 'duplicated'){
          window.alert('标签名重复')
          this.createdTag()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > li{
      min-height: 44px;
      border-bottom: 1px solid #e6e5e8;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > svg {
        color:#333;
        margin-right: 16px;
      }
    }
  }
  .createTag{
    border:none;
    color:white;
    background: #767676;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>