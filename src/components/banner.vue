<template>
  <div class="banner">
    <div class="banner-wrp">
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        @change="swiperChange"
        @animationfinish="animationfinish"
      >
        <div v-for="(item, index) in banner" :key="index"  @click="jump(item)">
          <swiper-item class="swiper-item">
            <img :src="item.image" class="slide-image" mode="scaleToFill">
          </swiper-item>
        </div>
      </swiper>
      <div class="dots">
        <span
          class="dot"
          v-for="(item, index) in banner"
          :key="index"
          :class="[index === currentPageIndex ? 'disable' : '']"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 400,
      circular: true,
      currentPageIndex: 0
    }
  },
  methods: {
    jump (item) {
      let serverHandle = {
        0: item => {
          console.log(item)
          wx.navigateTo({
            url: `../goods/main?id=${item}`
          })
        },
        1: item => {
          wx.navigateTo({
            url: `../skulist/mai?id=${item}`
          })
        },
        2: item => {
          wx.navigateTo({
            url: `../webview/mai?url=${item}`
          })
        },
        3: item => {}
        /**
         *
         *
         *
         *
         *
         *
         */
      }
      let cb = serverHandle[item.jump_type]
      cb(item.value_id)
    },
    swiperChange (e) {},
    animationfinish (e) {
      this.currentPageIndex = e.mp.detail.current
    }
  }
}
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  .banner-wrp {
    position: relative;
    .swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      .slide-image {
        width: 93%;
        height: 100%;
        margin: 0 auto;
        border-radius: 6px; 
      }
    }
    .dots {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 12px;
      width: 100%;
      .dot {
        width: 14px;
        height: 3px;
        margin: 0 4px;
        background-color: red;
      }
      .disable {
        background-color: #fff;
      }
    }
  }
}
</style>