<template>
  <div id="app">
    <m-head></m-head>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
  import MHead from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHead,
      Tab
    }
  }

</script>

<style>
</style>
