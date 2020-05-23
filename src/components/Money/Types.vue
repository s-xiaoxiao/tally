<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="seleteType('-')">支出</li>
      <li :class="type === '+' && 'selected'"
          @click="seleteType('+')">收入</li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Types',
    props:['xxx'],
    data(){
      return{
        type:'-'
      }
    },
    mounted(){
      console.log(this.xxx)
    },
    methods:{
      seleteType(type){
        if(type !== '-' && type !== '+'){
          throw new Error('type is unknow')
        }
        this.type = type;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .types{
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li{
      width: 50%;
      height: 64px;
      line-height: 64px;
      display: flex;
      align-items:center;
      justify-content: center;
      position: relative;
      &.selected::after{
        position: absolute;
        content: '';
        bottom:0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #444;
      }
    }
  }

</style>