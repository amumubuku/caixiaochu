<template>
  <div class="order">
    <div class="order-address">
      <div class="address-content">
        <div class="top">收货地址</div>
        <div class="address-info" @click="selectAddress">
          <div class="address-des" v-if="defaultAddress">
            <div class="address-title">
              <div class="name">{{defaultAddress.name}}</div>
              <div class="phone">{{defaultAddress.tel}}</div>
            </div>
            <div class="but">{{defaultAddress.city}}{{defaultAddress.address}}</div>
          </div>
          <div class="select-address" v-if="!defaultAddress">
            <img src="http://p2.icaixiaochu.com/location.png" alt>
            <p>去添加收货地址</p>
          </div>
          <div class="more">
            <img src="http://p2.icaixiaochu.com/more.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-content">
      <div class="shop-wrp">
        <div class="shop-head">
          <div class="shop-title">商品信息</div>
          <div class="service" >
            <p>立即配送（预计{{curTime[1]}}送达）</p>
            <!-- <img src="http://p2.icaixiaochu.com/more.png" alt> -->
          </div>
        </div>
        <collapse :selected="true" :goods="goods"></collapse>
      </div>
    </div>
    <div class="good-info">
      <div class="shop-count small">
        <p>商品总价</p>
        <p>¥{{total}}</p>
      </div>
      <div class="shop-count small" @click="selectCoupons">
        <p>优惠劵</p>
        <div class="select-coupon">
          <p style="color:#FF6304">¥{{conponData ? -conponData.price : 0 }}</p>
          <img src="http://p2.icaixiaochu.com/more.png" alt>
        </div>
      </div>
      <div class="shop-count small">
        <p>配送费</p>
        <p>¥{{fee}}</p>
      </div>
    </div>
    <div class="note">
      <span>订单备注</span>
      <input type="text" v-model="remark" placeholder="可输入备注，最多50字" maxlength="50">
    </div>
    <div class="submit">
      <div class="submit-left"></div>
      <div class="submit-right">
        <div class="count">
          <div class="price-count">合计：{{price <= 0.01? 0.01:price}}</div>
          <div class="price-coupon">已优惠：¥{{couponTotal}}</div>
        </div>
        <div class="order-num extend" @click="subOrder">
          <form-button></form-button>
          结算({{goodNum}})
        </div>
      </div>
    </div>
    <popup ref="seleceNow" type="bottom">
      <div class="time-wrp">
        <div class="content">
          <div class="month">{{month}}</div>
          <div class="time-list">
            <picker-view class="picker-view">
              <picker-view-column>
                <div v-for="(item, index) in timelist" :key="index">{{index}}</div>
              </picker-view-column>
            </picker-view>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
// import { get } from '../../utils'
import { mapGetters, mapMutations } from 'vuex'
import Collapse from '@/components/collapse'
import popup from '@/components/popup'
import formButton from '@/components/form-button'
import { time } from '@/utils/index'
// import {time} from '@/utils/index'
export default {
  data () {
    return {
      month: '',
      fee: 0,
      address: '',
      goodTotal: '',
      price: '',
      curTime: [],
      remark: ''
    }
  },
  computed: {
    total () {
      let total = 0
      let couponPrice = this.conponData ? this.conponData.price : 0
      this.goods.forEach(element => {
        total += element.number * element.real_price
      })
      this.price = (total - couponPrice + ~~this.fee).toFixed(2)
      this.goodTotal = total
      return total.toFixed(2)
    },
    couponTotal () {
      let total = 0
      this.goods.forEach(element => {
        total += (element.price - element.real_price) * element.number
      })
      return (total + (this.conponData ? this.conponData.price : 0)).toFixed(2)
    },
    goodNum () {
      let num = 0
      this.goods.forEach(element => {
        num += element.number
      })
      return num
    },
    ...mapGetters(['data', 'goods', 'defaultAddress', 'conponData'])
  },
  components: {
    Collapse,
    popup,
    formButton
  },
  onUnload () {
    this.setGoods([])
  },
  mounted () {
    this.getShippingFee()
    this.getAddress()
    this.UseCoupon()
    this.curTime = time()
  },
  methods: {
    selectCoupons () {
      wx.navigateTo({
        url: `../coupons/main?total=${this.goodTotal}`
      })
    },
    getAddress () {
      this.$http.get('/getShippingFee').then(res => {
        this.fee = res.data
      })
    },
    UseCoupon () {
      this.$http
        .post('/getAbleUseCou', {
          price: this.total
        })
        .then(res => {
          if (res.data.length >= 1) {
            this.setCoupondata(res.data[0])
          }
          this.setCoupondata('')
        })
    },
    getShippingFee () {
      this.$http.post('/getAddress').then(res => {
        this.address = res.data
      })
    },
    timeFormat (param) {
      return param < 10 ? '0' + param : param
    },
    selectAddress () {
      wx.navigateTo({
        url: `../myaddress/main`
      })
    },
    selectTime () {
      var date = new Date()
      var Month = date.getMonth() + 1
      var Day = date.getDate()
      this.month = `${this.timeFormat(Month)}-${Day}`
      this.$refs.seleceNow.toggle('show')
    },
    ...mapMutations({
      setCoupondata: 'SET_COUPONDATA',
      setGoods: 'SET_GOODS'
    }),
    subOrder () {
      if (this.defaultAddress) {
        this.$http
          .post('/createOrder', {
            address_id: this.defaultAddress.id,
            coupon_id: this.conponData ? this.conponData.id : 0,
            goods: JSON.stringify(this.goods),
            delivery_time: this.curTime[1],
            remark: this.remark ? this.remark : ' '
          })
          .then(res => {
            let result = res.data
            wx.requestPayment({
              timeStamp: result.timeStamp.toString(),
              nonceStr: result.nonceStr,
              package: result.package,
              signType: 'MD5',
              paySign: result.paySign,
              success: function (res) {
                wx.navigateTo({
                  url: `../myorder/main?activeIndex=0`
                })
              },
              fail: function (res) {
                wx.navigateTo({
                  url: `../myorder/main?activeIndex=1`
                })
              }
            })
          })
      } else {
        setTimeout(() => {
          wx.showToast({
            title: '请选择收货地址',
            icon: 'none',
            duration: 2000
          })
        }, 150)
      }
    }
  }
}
</script>
<style lang="less">
@import "./style";
</style>
