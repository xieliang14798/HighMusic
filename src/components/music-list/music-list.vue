<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
    <scroll class="list" :data="songs" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: () => {
        }
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      back() {

      }
    },
    components: {
      SongList,
      Scroll
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .music-list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: @color-background;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      .no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: @font-size-large;
      color: @color-text;

    }
    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
    }
    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: @color-background;
      .song-list-wrapper {
        padding: 20px 30px;
      }
    }
  }
</style>
