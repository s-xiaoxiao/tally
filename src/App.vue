<template>
  <div  id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/reset.scss";
  @import "~@/assets/style/helper.scss";

  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $font-hei;
    line-height: 1.5;
    color:#333;
    background: #f5f5f5;
  }
</style>

<script>
  export default {
    name: 'App',
    mounted() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        console.log(vh);
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    },
  }
</script>

