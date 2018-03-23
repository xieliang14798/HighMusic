<template>
    <transition class="list-fade">
        <div class="playlist" @click="hide" v-show="showFlag">
            <div class="list-wrapper" @click.stop>

            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                showFlag: false
            }
        },
        methods: {
            show() {
                this.showFlag = true

            },
            hide() {
                this.showFlag = false
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../common/less/variable";
    @import "../../common/less/mixin";

    .playlist {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: @color-background-d;
        &.list-fade-enter-active, &.list-fade-leave-active {
            transition: opacity 0.3s;
            .list-wrapper {
                transition: all 0.3s;
            }
        }
        &.list-fade-enter, &.list-fade-leave-to {
            opacity: 0;
            .list-wrapper {
                transform: translate3d(0, 100%, 0);
            }
        }
    }
</style>