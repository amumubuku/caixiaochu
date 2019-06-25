<template>
  <div class="home_wrap">
    <swiper
      class="home_swiper"
      :style="{ height: '175px'}"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :circular="circular"
      @change="handleChange($event)"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :current="curIndex"

    >
      <block v-for="(item, index) in data" :key="index">
        <swiper-item>
          <div
            :class="curIndex===index ? 'active_item' : 'item'"
            :animation="index == curIndex ? animationData : animationData2"
            class="slider"
            @click="jump(item)"
          >
            <img :src="item.image" alt>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in data"
        :key="index"
        :class="[index === curIndex ? 'disable' : '']"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curIndex: 0,
      circular: true, // 设置衔接滑动
      previousMargin: '26px',
      nextMargin: '26px',
      animationData: {}, // 卡片放大动画
      animationData2: {}, // 卡片缩小动画
      autoplay: true,
      interval: 3000,
      duration: 300
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted () {
    this.changeNormal()
    this.changeActive()
  },
  methods: {
    jump (item) {
      let serverHandle = {
        0: item => {
          console.log(item)
          wx.navigateTo({
            url: `../goods/main?id=${item.value_id}`
          })
        },
        1: item => {
          wx.navigateTo({
            url: `../skulist/mai?id=${item.value_id}`
          })
        },
        2: item => {
          wx.navigateTo({
            url: `../webview/mai?url=${item.value_id}`
          })
        },
        3: (item) => {
          wx.previewImage({
            current: item.image,
            // 数据源
            urls: [item.image]
          })
        }
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
      cb(item)
    },
    handleChange (e) {
      this.curIndex = e.mp.detail.current
      this.changeActive()
      this.changeNormal()
    },
    // 收缩
    changeNormal () {
      var animation2 = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      this.animation2 = animation2
      animation2
        .scale(0.92)
        .opacity(0.3)
        .step()
      this.animationData2 = animation2.export()
    },
    // 展开
    changeActive () {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      this.animation = animation
      animation
        .scale(1)
        .opacity(1)
        .step()
      this.animationData = animation.export()
    }
  }
}
</script>

<style lang="less" scoped>
.home_wrap {
  position: relative;
}
.home_swiper {
  position: relative;
  height: 180px !important;
}
.item {
  transform: scale(0.92);
  transform-origin: 50% 50% 0px;
  opacity: 0.3;
}
.active_item {
  transform: scale(1);
  opacity: 1;
}
.slider {
  height: 175px;
  border-radius: 10px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    background-color: #bebebe;
  }
}
// 指示点
.dots {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 12px;
  width: 100%;
  padding-right: 47px;
  box-sizing: border-box;
  .dot {
    width: 6px;
    height: 6px;
    margin: 0 3px;
    height: 6px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  .disable {
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>
