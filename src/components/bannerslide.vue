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
        :current="currentPageIndex"
        style="height:100px"
      >
        <div v-for="(item, index) in banner" :key="index" @click="jump(item)">
          <swiper-item class="swiper-item">
            <img :src="item.image" class="slide-image" mode="scaleToFill" />
          </swiper-item>
        </div>
      </swiper>
     
    </div>
     <div class="dots">
        <span
          class="dot"
          v-for="(item, index) in banner"
          :key="index"
          :class="[index === currentPageIndex ? 'disable' : '']"
        ></span>
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
  data() {
    return {
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 400,
      circular: true,
      currentPageIndex: 0
    };
  },
  methods: {
    jump(item) {
      let serverHandle = {
        0: item => {
          console.log(item);
          wx.navigateTo({
            url: `../goods/main?id=${item.value_id}`
          });
        },
        1: item => {
          wx.navigateTo({
            url: `../skulist/mai?id=${item.value_id}`
          });
        },
        2: item => {
          wx.navigateTo({
            url: `../webview/mai?url=${item.value_id}`
          });
        },
        3: item => {
          wx.previewImage({
            current: item.image,
            // 数据源
            urls: [item.image]
          });
        },
        4: item => {
          wx.navigateTo({
            url: item.value_id
          });
        }
      };

      let cb = serverHandle[item.jump_type];
      cb(item);
    },
    swiperChange(e) {
      this.currentPageIndex = e.mp.detail.current;
    },
    animationfinish(e) {
      this.currentPageIndex = e.mp.detail.current;
    }
  }
};
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  .banner-wrp {
    position: relative;
    .swiper-item {
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .slide-image {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        border-radius: 6px;
      }
    }
    
  }
  .dots {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      .dot {
        width: 4px;
        height: 4px;
        margin: 0 5px;
        background-color: #ECECEC;
        border-radius: 50%;
        transition: width .4s;
      }
      .disable {
        width: 20px;
        background-color: #FEA835;
        border-radius: 2px;
      }
    }
}
</style>