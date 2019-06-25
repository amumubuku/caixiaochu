<template>
  <div class="coupons">
    <div class="unuse-coupon" @click="unCoupon">
      <p>不使用优惠劵</p>
      <p class="circle"></p>
    </div>
    <p class="title">
      <i style="padding-right: 5px;">!</i>
      优惠劵不能同时使用多个</p>
    <div class="coupon-list">
      <div class="coupon-item" v-for="(item,index) in coupons" :key="index">
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
        <div class="submit" @click="userCoupon(item)">使用</div>
      </div>
    </div>
     <div class="null-coupon-wrp" v-if="!coupons.length>=1">
      <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA" alt>
      <p>无可用优惠券</p>
    </div>
    </div>
    
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      coupons: [],
      total: 1
    }
  },
  methods: {
    async UseCoupon () {
      this.$http
        .post('/getAbleUseCou', {
          price: this.total
        })
        .then(res => {
          this.coupons = res.data
        })
    },
    unCoupon () {
      this.setCoupondata('')
      wx.navigateBack({ changed: true })
    },
    userCoupon (item) {
      this.setCoupondata(item)
      wx.navigateBack({ changed: true })
    },
    ...mapMutations({
      setCoupondata: 'SET_COUPONDATA'
    })
  },
  mounted () {
    this.total = this.$root.$mp.query.total
    this.UseCoupon()
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

