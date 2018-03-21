<template>
  <transition name="slide">
    <music-list :songs="songs" :bgImage="bgImage" :title="title" :rank="rank"></music-list>
  </transition>
</template>
<script>
  import MusicList from '../../components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from "../../api/rank"
  import {ERR_OK} from "../../api/config"
  import {createSong} from "../../common/js/song"

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      }
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach(item => {
          let {data} = item
          if (data.songid && data.albummid) {
            ret.push(createSong(data))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="less">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
