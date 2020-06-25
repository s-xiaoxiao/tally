<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons-wrap">
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="deleteContent">×</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="add">+</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="minus">-</button>
        <button @click="cleanContent">c</button>
        <button @click="inputContent">0</button>
        <button @click="inputContent">.</button>
        <button @click="confirm">{{equalSign ? '确定' : '='}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop() readonly value!: number;
    output = this.value.toString();
    equalSign = true;

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = (button.textContent as string);
      console.log(input);
      if (this.output?.length === 16) {return;}

      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
          return;
        }
      }
      if (this.output?.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input;
    }

    cleanContent() {
      this.output = '0';
      this.equalSign = true;
    }

    deleteContent() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
        if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
          return;
        } else {
          this.equalSign = true;
        }
      }
    }

    add(event: MouseEvent) {
      console.log(event);
      const button = (event.target as HTMLButtonElement);
      const input = (button.textContent as string);
      // content 为 0 则退出
      if (this.output === '0') {
        return;
      }
      //多个加好直接计算前一个
      if (this.output.indexOf('+') >= 0) {
        const oldOutPut: string[] = this.output.split('+');
        //防止第二个数为空
        if(oldOutPut[1]===''){
          return
        }
        const sum: number = parseFloat(oldOutPut[0]) + parseFloat(oldOutPut[1]);
        this.output = sum.toString();
      }
      if (this.output.indexOf('-')>=0){
        if (this.output.indexOf('+')===this.output.length-1){
          this.deleteContent();
          this.output+='+';
        }else{
          const oldOutPut: string[] = this.output.split('-');
          //防止第二个数为空
          if(oldOutPut[1]===''){
            return
          }
          const sum: number = parseFloat(oldOutPut[0]) - parseFloat(oldOutPut[1]);
          if(sum>0){
            this.output = sum.toString();
            this.output += '+';
          }else{
            window.alert("金额必须大于0");
            this.output = '0';
            return
          }
        }
        return;
      }
        this.equalSign = false;
        this.output += input;
    }

    minus(event: MouseEvent) {
      console.log(event);
      const button = (event.target as HTMLButtonElement);
      const input = (button.textContent as string);
      //content 为0 不出现减号
      if (this.output === '0') {
        return;
      }

      if(this.output.indexOf('-')>=0){
        const oldOutPut: string[] = this.output.split('-');
        //防止第二个数为空
        if(oldOutPut[1]===''){
          return
        }
        const sum: number = parseFloat(oldOutPut[0]) - parseFloat(oldOutPut[1]);
        if(sum>0){
          this.output = sum.toString();
        }else{
          window.alert("金额必须大于0");
          this.output = '0';
          this.equalSign = true;
          return
        }
      }
      //加好 变减号
      if (this.output.indexOf('+')>=0){
        if (this.output.indexOf('+')===this.output.length-1){
          this.deleteContent();
          this.output+='-';
        }else{
          const oldOutPut: string[] = this.output.split('+');
          //防止第二个数为空
          if(oldOutPut[1]===''){
            return
          }
          const sum: number = parseFloat(oldOutPut[0]) + parseFloat(oldOutPut[1]);
          this.output = sum.toString();
        }
      }
      this.equalSign = false;
      this.output += input;
    }

    confirm() {
      let sum = 0;
      if (this.output === '0') {
        return;
      }
      if (this.output.indexOf('+')>=0){
        const oldOutPut: string[] = this.output.split('+');
        //防止第二个数为空
        if(oldOutPut[1]===''){
          return
        }
         sum = parseFloat(oldOutPut[0]) + parseFloat(oldOutPut[1]);
        this.output = sum.toString();
        this.equalSign = true;
        return
      }
      if(this.output.indexOf('-')>=0){
        const oldOutPut: string[] = this.output.split('-');
        //防止第二个数为空
        if(oldOutPut[1]===''){
          return
        }
         sum = parseFloat(oldOutPut[0]) - parseFloat(oldOutPut[1]);
        if(sum>0){
          this.output = sum.toString();
          this.equalSign = true;
        }else{
          window.alert("金额必须大于0");
          this.output = '0';
          this.equalSign = true;
          return
        }
      }
      if(this.equalSign && parseFloat(this.output)>0){
        this.$emit('update:value',parseFloat(this.output))
        this.$emit('submit',this.output)
        this.output = '0'
      }

    }
  }
  // export default {
  //   name: 'NumberPad'
  // };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    > .output {
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
    }

    > .buttons-wrap {
      overflow: hidden;

      > .buttons {
        margin-right: -3px;
        margin-bottom: 1px;
        @extend %cleanFix;
        > button {
          font-size: 18px;
          width: 25%;
          height: 64px;
          float: left;
          background: transparent;
          border: 1px solid #AEB6BF;
          border-collapse: collapse;
          margin-right: -1px;
          margin-bottom: -1px;

          &:active {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>