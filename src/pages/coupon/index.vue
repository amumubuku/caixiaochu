<template>
  <div class="coupon">
    <banner :banner="banner"/>
    <div class="null-coupon-wrp" v-if="!coupons.length>=1">
      <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt>
      <p>暂无可领取优惠券</p>
    </div>
    <div class="coupon-list">
      <div class="coupon-item" v-for="(item,index) in coupons" :key="index">
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
          <p class="time">{{item.expired_time}}</p>
          <div class="submit" @click="getCoupon(item)">领取</div>
        </div>
      </div>
    </div>
    <div class="my-coupon" @click="myCoupon">我的优惠劵</div>
  </div>
</template>

<script>
import banner from '@/components/banner'
export default {
  data () {
    return {
      coupons: [],
      banner: []
    }
  },
  components: {
    banner
  },
  onShow () {
    this.getAllcoupon()
  },
  methods: {
    getAllcoupon () {
      this.$http.post('/fetchCoupons').then(res => {
        if (res.status === 1) {
          this.coupons = res.data
        }
      })
    },
    getBnaner () {
      this.$http.get('getSlideShow').then(res => {
        this.banner = res.data
      })
    },
    myCoupon () {
      wx.navigateTo({
        url: `../mycoupon/main`
      })
    },
    getCoupon (item) {
      this.$http
        .post('/getCoupons', {
          coupon_id: item.id
        })
        .then(res => {
          if (res.status === 1) {
            wx.showToast({
              title: '领取优惠劵成功',
              icon: 'success',
              duration: 3000
            })
            this.getAllcoupon()
          } else {
            wx.showToast({
              title: res.info,
              icon: 'none',
              duration: 3000
            })
          }
        })
    }
  },
  mounted () {
    this.getBnaner()
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

