<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span> <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button  @click="createdTag"> 添加标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue{
    get tags(){
      return store.state.tagList;
    }

    beforeCreate(){
      this.$store.commit('fetchTags')
    }
    createdTag(){
      this.$store.commit('createdTag')
    }
  }
</script>

<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag{
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