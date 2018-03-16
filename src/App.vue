<template>
  <div id="app">
    <m-head></m-head>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHead from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player'

  export default {
    components: {
      MHead,
      Tab,
      Player
    }
  }

</script>

<style>
</style>
