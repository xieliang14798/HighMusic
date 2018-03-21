<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>
<script>
    import MusicList from '../music-list/music-list'
    import {mapGetters} from 'vuex'
    import {ERR_OK} from "../../api/config";
    import {getSongList} from "../../api/recommend";
    import {createSong} from "../../common/js/song";

    export default {
        data() {
            return {
                songs: []
            }
        },
        created() {
            this._getSongList()
        },
        computed: {
            ...mapGetters([
                'disc'
            ]),
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            }
        },
        components: {
            MusicList
        },
        methods: {
            _getSongList() {
                if (!this.disc.dissid) {
                    this.$router.push('/recommend')
                    return
                }
                getSongList(this.disc.dissid).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach(item => {
                    ret.push(createSong(item))
                })
                return ret
            }
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
