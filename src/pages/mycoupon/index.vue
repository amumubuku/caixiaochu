<template>
  <div class="mycoupon">
    <div class="coupon-nav">
      <block v-for="(item,index) in tabs" :key="index">
        <div
          :id="index"
          :class="{'navbar_item_on':activeIndex == index}"
          class="nav-item"
          @click="tabClick"
        >
          <p>{{item.name}}</p>
        </div>
      </block>
      <div class="navbar_slider" :class="navbarSliderClass"></div>
    </div>
    <swiper
      class="content"
      :duration="50"
      :style="'height:'+contentHeight"
      @change="swiperChange"
      :current="currentTab"
      @animationfinish="onAnimationfinish"
    >
      <swiper-item class="coupon-list">
        <scroll-view class="coupon_scroll" scroll-y="true">
          <div
            class="coupon-item"
            v-for="(item,index) in coupons.unused"
            :key="index"
            @click="toHome"
          >
            <div class="flex-left">
              <div class="coupon-price">
                <i style="font-size: 14px">¥</i>
                <p>{{item.price}}</p>
              </div>
              <div class="coupon-des">
                <p>元优惠卷</p>
                <div>
                  满
                  <i style="color:rgba(254, 168, 53, 1)">{{item.threshold_price}}</i>
                  元可用
                </div>
              </div>
            </div>
            <div class="flex-right">
              <p>有效期至</p>
              <p class="time">{{item.expire_time}}</p>
              <div class="submit">立即使用</div>
            </div>
          </div>
          <div class="null-coupon-wrp" v-if="!coupons.unused.length>=1">
            <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt>
            <p>无可用优惠券</p>
          </div>
        </scroll-view>
      </swiper-item>
      <swiper-item class="coupon-list">
        <scroll-view class="coupon_scroll" scroll-y="true">
          <div class="coupon-item" v-for="(item,index) in coupons.has_used" :key="index">
            <div class="flex-left">
              <div class="coupon-price">
                <i>¥</i>
                <p>{{item.price}}</p>
              </div>
              <div class="coupon-des">
                <p>{{item.price}}元优惠卷</p>
                <div>
                  满
                  <i>{{item.threshold_price}}</i>
                  元可用
                </div>
              </div>
            </div>
            <div class="flex-right">
              <p>有效期至</p>
              <p class="time">{{item.expire_time}}</p>
              <div class="submit" style="background: #B2B2B2; box-shadow:none;">已使用</div>
            </div>
          </div>
          <div class="null-coupon-wrp" v-if="!coupons.has_used.length>=1">
            <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt>
            <p>暂无已用优惠券</p>
          </div>
        </scroll-view>
      </swiper-item>
      <swiper-item class="coupon-list">
        <scroll-view class="coupon_scroll" scroll-y="true">
          <div class="coupon-item" v-for="(item,index) in coupons.expired" :key="index">
            <div class="flex-left">
              <div class="coupon-price" style="color:#B2B2B2">
                <i>¥</i>
                <p>{{item.price}}</p>
              </div>
              <div class="coupon-des">
                <p>{{item.price}}元优惠卷</p>
                <div>
                  满
                  <i>{{item.threshold_price}}</i>
                  元可用
                </div>
              </div>
            </div>
            <div class="flex-right">
              <p>有效期至</p>
              <p class="time">{{item.expire_time}}</p>
              <div class="submit" style="background: #B2B2B2; box-shadow:none;">过期</div>
            </div>
          </div>
          <div class="null-coupon-wrp" v-if="!coupons.expired.length>=1">
            <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt>
            <p>暂无已过期优惠券</p>
          </div>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupons: {
        unused: [],
        has_used: [],
        expired: []
      },
      activeIndex: 0,
      currentTab: 0,
      status: 'unused',
      tabs: [
        {
          name: '可使用',
          type: '0',
          checked: true
        },
        {
          name: '已使用',
          type: '1',
          checked: true
        },
        {
          name: '已过期',
          type: '2',
          checked: true
        }
      ],
      winWidth: 0,
      winHeight: 0,
      navbarSliderClass: ''
    }
  },
  computed: {
    contentHeight () {
      return this.winHeight + 'px'
    }
  },
  methods: {
    toHome () {
      wx.switchTab({
        url: `../index/main`
      })
    },
    getCoupon (status) {
      this.$http
        .post('/myCoupons', {
          status
        })
        .then(res => {
          wx.stopPullDownRefresh()
          this.coupons[this.status] = res.data
        })
    },
    toggle (index) {
      this.currentId = index
    },
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
      this.currentTab = this.activeIndex
    },
    swiperChange (e) {
      this.currentTab = e.mp.detail.current
      this.activeIndex = this.currentTab
      this.status =
        this.activeIndex === 0
          ? 'unused'
          : this.activeIndex === 1
            ? 'has_used'
            : 'expired'
      this.getCoupon(this.status)
    },
    onAnimationfinish () {}
  },
  onPullDownRefresh () {
    this.getCoupon(this.status)
  },
  mounted () {
    this.getCoupon(this.status)
    var res = wx.getSystemInfoSync()
    this.winWidth = res.windowWidth
    this.winHeight = res.windowHeight
  },
  watch: {
    activeIndex: {
      handler (newVal, oldVal) {
        this.navbarSliderClass = `navbar_slider_${newVal}`
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

