<template>
  <Layout class-prefix="layout">
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons-wrap">
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>X</button>
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
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div >
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注"/>
      </label>
    </div>
    <div class="tags">
      <div class="new">
        <button>
          新增标签
        </button>
      </div>
        <ul class="current">
          <li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li>
          <li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li><li>衣</li>
          <li>住</li>
          <li>行</li>
          <li>食</li>
        </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
  export default {
    name: 'Money',
  };
</script>

<style lang="scss">
.layout-content{
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags {
    padding: 16px;
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
      > .current {
        height: 13vh;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        li {
          background: #d9d9d9;
          $h: 24px;
          height: $h;
          line-height: $h;
          border-radius: $h/2;
          padding: 0 16px;
          margin-right: 12px;
          margin-top: 4px;
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
  .notes{
      font-size: 14px;
      background: #f5f5f5;
      padding-left: 16px;
      display: flex;
      align-items: center;
    .name{
      padding-right: 16px;
    }
    input{
      height: 64px;
      flex-grow: 1;
      background:transparent;
      border: none;
      padding-right: 16px;
    }
  }
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