<template>
  <svg class="icon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>
ss
<script lang="ts">
  const importAll = (requireContent: __WebpackModuleApi.RequireContext) => requireContent.keys().forEach(requireContent)
  try{
    importAll(require.context('../assets/icons',true,/\.svg$/));
  }catch(error){
    console.log(error);
  }
  export default {
    props:['name'],
    name: 'Icon'
  };
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>