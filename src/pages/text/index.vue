<template>
  <div class="text">
    <form report-submit @submit="uploadFormId">
      <button form-type="submit">查看/分享/首页/支付</button>
    </form>
    <div class="text-box skeleton"></div>
    <div class="pay;" @click="Payment">支付测试</div>
    <button class="weui-btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">授权</button>
    <div class="banner-container">
      <swiper
        :style="{width: '100vw', height: '410rpx'}"
        :indicator-dots="indicatorDots"
        :indicator-color="indicatorColor"
        :indicator-active-color="indicatorActiveColor"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        @change="swiperChange"
        :previous-margin="'58rpx'"
        :next-margin="'58rpx'"
      >
        <div v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex">
          <swiper-item>
            <div
              :style="{
              boxSizing: 'border-box', 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              justifyContent: currentIndex===0?((bannerIndex===bannerList.length-1)?'flex-end':(bannerIndex===1?'flex-start':'center')):(currentIndex===bannerList.length-1?(bannerIndex===0?'flex-start':(bannerIndex===bannerList.length-2?'flex-end':'center')):(bannerIndex===currentIndex-1?'flex-end':(bannerIndex===currentIndex+1?'flex-start':'center'))), 
              padding: currentIndex===0?((bannerIndex===bannerList.length-1)?'56rpx 26rpx 0 0':(bannerIndex===1?'56rpx 0 0 26rpx':'56rpx 0 0 0')):(currentIndex===bannerList.length-1?(bannerIndex===0?'56rpx 0 0 26rpx':(bannerIndex===bannerList.length-2?'56rpx 26rpx 0 0':'56rpx 0 0 0')):(bannerIndex===currentIndex-1?'56rpx 26rpx 0 0':(bannerIndex===currentIndex+1?'56rpx 0 0 26rpx':'56rpx 0 0 0')))
            }"
            >
              <image
                :src="bannerItem"
                class="slide-image"
                :style="{
                transform: currentIndex===bannerIndex?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)',
                transitionDuration: '.3s',
                transitionTimingFunction: 'ease'
              }"
                @click="getBannerDetail(bannerIndex)"
              />
            </div>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <button class="weui-btn" @click="chooseImage">选择图片</button>
    <popup ref="couponModal" type="center" className="coupon-modal">
      <div class="coupon-wrp">
        <div class="coupon-list">
          <div class="coupon-item" v-for="(item, index) in couponList" :key="index">
            <div class="coupon-left">
              <i style="font-size:13px;">￥</i>
              {{item.price}}
            </div>
            <div class="coupon-right">
              <p class="limit-price">满{{item.limit_price}}元可用</p>
              <p class="coupon-day">{{item.day}}天有效</p>
            </div>
          </div>
        </div>
      </div>
      <div class="receive" @click="receiveCoupon">
        <div class="receive-btn">
          <p>领取</p>
          <img src="https://img.icaixiaochu.com/coupon-tag-icon.png" alt="">
        </div>
      </div>
      <div class="cancel" @click="cancelModal">
        <img src="https://img.icaixiaochu.com/index-cancel-icon.png" alt="">
      </div>
    </popup>
  </div>
</template>

<script>
import store from './store'
import skeleton from '@/components/skeleton'
import popup from '@/components/popup'
export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  components: {
    skeleton,
    popup
  },
  data () {
    return {
      showSkeleton: true,
      indicatorDots: true,
      indicatorColor: 'rgba(255, 255, 255, .4)',
      indicatorActiveColor: 'rgba(255, 255, 255, 1)',
      autoplay: false,
      interval: 3000,
      duration: 300,
      circular: true,
      currentIndex: 0,
      animationIndex: 0,
      scaleX: 1.1527,
      scaleY: 1.1524,
      code: 0,
      openid: '',
      imglist: [],
      couponList: [
        {
          price: 30,
          limit_price: 100,
          day: 30
        },
        {
          price: 30,
          limit_price: 100,
          day: 30
        }
      ]
    }
  },
  methods: {
    cancelModal () {
      this.$refs.couponModal.toggle('hide')
    },
    chooseImage () {
      let _this = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: result => {
          _this.imglist = _this.imglist.concat(result.tempFilePaths)
        },
        fail: () => {},
        complete: () => {}
      })
    },

    uploadFormId (e) {
      console.log(e)
      // if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      //   let formId = e.target.formId
      //   console.log(formId)
      //   this.$http
      //     .post('/collectForm', {
      //       formid: formId
      //     })
      //     .then(res => {
      //       console.log(res)
      //     })
      // }
    },
    swiperChange (e) {
      this.currentIndex = e.mp.detail.current
      this.scaleX = 1.1527
      this.scaleY = 1.1524
    },
    getBannerDetail (index) {
      console.log(index)
      wx.showToast({
        title: '可加上跳转链接',
        icon: 'none'
      })
    },
    getUserInfo (e) {
      if (e.mp.detail.userInfo) {
        let { encryptedData, iv } = e.mp.detail
        wx.login({
          success (res) {
            wx.request({
              url: 'http://localhost:1334/public/login', // 仅为示例，并非真实的接口地址
              header: {
                'content-type': 'application/json' // 默认值
              },
              data: {
                iv,
                encryptedData,
                code: res.code
              },
              success (res) {
                console.log(res)
              }
            })
          }
        })
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.couponModal.toggle('show')
    }, 30)
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

