<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
     // ‘-’ 支出 ‘+’ 收入

    @Prop() readonly type!: string;
    //Prop 告诉vue xxx 不是data 是prop
    //Number 告诉 vue 运行时 xxx是Number类型
    //xxx 属性名
    //number | undefined 告诉 TS xxx编译时的类型
    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknow');
      }
      this.$emit('update:type',type)
    }
  }
  //JS对象写法
  // export default {
  //   name: 'Types',
  //   props:['xxx'],
  //   data(){
  //     return{
  //       type:'-'
  //     }
  //   },
  //   mounted(){
  //     console.log(this.xxx)
  //   },
  //   methods:{
  //     seleteType(type){
  //       if(type !== '-' && type !== '+'){
  //         throw new Error('type is unknow')
  //       }
  //       this.type = type;
  //     }
  //   }
  // };
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      line-height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &.selected::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #444;
      }
    }
  }

</style>