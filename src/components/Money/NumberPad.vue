<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons-wrap">
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>x</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button>C</button>
        <button>确定</button>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
  export default {
    name: 'NumberPad'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad{
    > .output{
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas,monospace;
      padding: 9px 16px;
      text-align: right;
    }
    >.buttons-wrap{
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