<template>
  <scroll class="listview" :data="data">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.item" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item,index) in shortcutList" :data-index="index" class="item"
            :class="{'current':currentIndex === index}">{{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    components: {
      Scroll
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substring(0, 1)
        })
      }
    },
    watch: {
      data() {
        setTimeout(() => {

        })
      }
    },
    methods: {
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i=0;i<list.length;i++){
          let item = list[i]
          height+=item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  @import "listview.less";
</style>
