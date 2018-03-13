<template>
  <div class="recommend" ref="recommend">
    <div>
      <div class="slider-wrapper" ref="sliderWrapper" v-if="recommends.length">
        <slider :interval="2000">
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>
<script>
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'

  export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      }
    },
    components: {
      Slider
    }
  }
</script>
<style scoped lang="less">
  @import "recommend.less";
</style>
