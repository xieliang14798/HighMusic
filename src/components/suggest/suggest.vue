<template>
    <scroll class="suggest"
            ref="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>

        </ul>
    </scroll>
</template>
<script>
    import Scroll from '../../base/scroll/scroll'
    import {search} from "../../api/search";
    import {ERR_OK} from "../../api/config";
    import {createSong} from "../../common/js/song";

    const perpage = 20
    const TYPE_SINGER = 'singer'

    export default {
        props: {
            showSinger: {
                type: Boolean,
                default: true
            },
            query: {
                type: String,
                default: ''
            }
        },
        watch: {
            query(newQuery) {
                this.search(newQuery)
            }
        },
        data() {
            return {
                page: 1,
                pullup: true,
                beforeScroll: true,
                hasMore: true,
                result: []
            }
        },
        methods: {
            refresh() {
                this.$refs.suggest.refresh()
            },
            getIconCls(item) {
                if (item.type === TYPE_SINGER) {
                    return 'icon-favor'
                } else {
                    return 'icon-music'
                }
            },
            getDisplayName(item) {
                if (item.type === TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            search(newQuery) {
                this.page = 1
                this.hasMore = true
                this.$refs.suggest.scrollTo(0, 0)
                search(newQuery, this.page, this.showSinger, perpage).then(res => {
                    if (res.code === ERR_OK) {
                        this.result = this._genResult(res.data)
                    }
                })
            },
            _genResult(data) {
                let ret = []
                if (data.zhida && data.zhida.singerid) {
                    ret.push({
                        ...data.zhida,
                        ...{type: TYPE_SINGER}
                    })
                }
                if (data.song) {
                    ret = ret.concat(this._normalizeSongs(data.song.list))
                }
                return ret
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach(item => {
                    if (item.songid && item.albummid) {
                        ret.push(createSong(item))
                    }
                })
                return ret
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style scoped lang="less">
    @import "../../common/less/variable";
    @import "../../common/less/mixin";

    .suggest {
        height: 100%;
        overflow: hidden;
        .suggest-list {
            padding: 0 30px;
            .suggest-item {
                display: flex;
                align-items: center;
                padding-bottom: 20px;
                .icon {
                    flex: 0 0 30px;
                    width: 30px;
                    [class^="icon-"] {
                        font-size: 14px;
                        color: @color-text-d;
                    }
                }
                .name {
                    flex: 1;
                    font-size: @font-size-medium;
                    color: @color-text-d;
                    overflow: hidden;
                    .text {
                        .no-wrap()
                    }
                }
            }
        }
    }
</style>