<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
            <div class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history">

                    </div>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest :query="query"></suggest>
        </div>
    </div>
</template>
<script>
    import SearchBox from '../../base/search-box/search-box'
    import {getHotKey} from "../../api/search";
    import {ERR_OK} from "../../api/config";
    import {searchMixin} from "../../common/js/mixin";
    import Suggest from '../../components/suggest/suggest'

    export default {
        mixins: [searchMixin],
        data() {
            return {
                hotKey: [],
            }
        },
        created() {
            this._getHotKey()
        },
        methods: {
            _getHotKey() {
                getHotKey().then(res => {
                    if (res.code === ERR_OK) {
                        this.hotKey = res.data.hotkey.slice(0, 10)
                    }
                })
            }
        },
        components: {
            SearchBox,
            Suggest
        }
    }
</script>
<style scoped lang="less">
    @import "../../common/less/variable";
    @import "../../common/less/mixin";

    .search {
        .search-box-wrapper {
            margin: 20px;
        }
        .shortcut-wrapper {
            position: fixed;
            top: 178px;
            bottom: 0;
            width: 100%;
            .shortcut {
                height: 100%;
                overflow: hidden;
                .hot-key {
                    margin: 0 20px 20px 20px;
                    .title {
                        margin-bottom: 20px;
                        font-size: @font-size-medium;
                        color: @color-text-l;
                    }
                    .item {
                        display: inline-block;
                        padding: 5px 10px;
                        margin: 0 20px 10px 0;
                        border-radius: 6px;
                        background: @color-highlight-background;
                        font-size: @font-size-medium;
                        color: @color-text-d;
                    }
                }
            }
        }
        .search-result {
            position: fixed;
            width: 100%;
            top: 178px;
            bottom: 0;
        }
    }

</style>