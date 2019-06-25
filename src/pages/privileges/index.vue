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
      <block v-for="(item, index) in bannerList" :key="index">
        <swiper-item>
          <div
            :class="curIndex===index ? 'active_item' : 'item'"
            :animation="index == curIndex ? animationData : animationData2"
            class="slider"
          >
            <img :src="item" alt>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="content-dots">
      <span
        class="dot-item"
        v-for="(item, index) in bannerList"
        :key="index"
        :class="[index === curIndex ? 'disable' : '']"
      ></span>
    </div>
    <div class="dots">
      <div class="dots-item" @click="toggle(0)">
        <div class="icon">
          <img src="http://p2.icaixiaochu.com/pg31a0h84k66x5rq.png" alt>
        </div>
        <span>会员专享价</span>
      </div>
      <div class="dots-item" @click="toggle(1)">
        <div class="icon">
          <img src="http://p2.icaixiaochu.com/0x8v901gtbqjs08t.png" alt>
        </div>
        <span>优享会员日</span>
      </div>
      <div class="dots-item" @click="toggle(2)">
        <div class="icon">
          <img src="http://p2.icaixiaochu.com/bv0oky5pw0ht4t0f.png" alt>
        </div>
        <span>积分</span>
      </div>
      <div class="dots-item" >
        <div class="icon">
          <img src="http://p2.icaixiaochu.com/lhv7tdc1058dx3ta.png" alt>
        </div>
        <span>期待更多</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curIndex: 0,
      bannerList: [
        'http://p2.icaixiaochu.com/%E7%BB%84%20838@3x.png',
        'http://p2.icaixiaochu.com/%E7%BB%84%20836@3x.png',
        'http://p2.icaixiaochu.com/%E7%BB%84%20840@3x.png'
      ],
      circular: false, // 设置衔接滑动
      previousMargin: '63rpx',
      nextMargin: '63rpx',
      animationData: {}, // 卡片放大动画
      animationData2: {}, // 卡片缩小动画
      autoplay: false,
      interval: 3000,
      duration: 300
    }
  },
  mounted () {
    this.curIndex = this.$root.$mp.query.curIndex
    this.changeActive()
    this.changeNormal()
  },
  methods: {
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
        .scale(0.9)
        .opacity(0.3)
        .step()
      this.animationData2 = animation2.export()
    },
    toggle (index) {
      this.curIndex = index
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
  padding-top: 50px;
}
.home_swiper {
  position: relative;
  height: 400px !important;
}
.item {
  transform: scale(0.9);
  transform-origin: 50% 50% 0px;
  opacity: 0.3;
}
.active_item {
  transform: scale(1);
  opacity: 1;
}
.slider {
  border-radius: 10px;
  height: 400px;
  overflow: hidden;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  img {
    height: 100%;
    width: 100%;
  }
}
.content-dots {
  display: flex;
  justify-content: center;
  align-items: center;

  .dot-item {
    width: 8px;
    height: 8px;
    background: rgba(236, 200, 119, 0.45);
    border-radius: 50%;
    margin: 0 3px;
  }
  .disable {
    width: 12px;
    height: 12px;
    background: rgba(236, 200, 119, 1);
    border-radius: 50%;
    opacity: 1;
  }
}
// 指示点
.dots {
  display: flex;
  justify-content: space-between;
  height: 68px;
  width: 100%;
  position: fixed;
  bottom: 22px;
  .dots-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column nowrap;
    .icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(
        180deg,
        rgba(239, 203, 122, 1) 0%,
        rgba(222, 188, 110, 1) 100%
      );
      box-shadow: 0px 2px 6px rgba(222, 188, 110, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
      color: rgba(0, 0, 0, 87);
    }
  }
  .disable {
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>
