<template>
  <div class="order">
    <div class="order-wrp">
      <div class="order-address">
        <div class="address-content">
          <div class="switch-fuc">
            <div :class="curSwitch?'switch-state' : 'switch-state active'" @click="changState(0)">
              <span>外卖配送</span>
              <i class="tag-icon" v-show="!curSwitch"></i>
            </div>
            <div :class="curSwitch?'switch-state active' : 'switch-state '" @click="changState(1)">
              <span>到店自取</span>
              <i class="tag-icon" v-show="curSwitch"></i>
            </div>
          </div>
          <div class="address-info" @click="selectAddress" v-if="!curSwitch">
            <div class="address-des" v-if="defaultAddress">
              <div class="order-icon">
                <img src="https://img.icaixiaochu.com/order-icon.png" alt />
              </div>
              <div class="addr-content">
                <div class="address-title">
                  <div class="name">{{defaultAddress.name}}</div>
                  <div class="phone">{{defaultAddress.tel}}</div>
                </div>
                <div class="but">{{defaultAddress.city}}{{defaultAddress.address}}</div>
              </div>
            </div>
            <div class="select-address" v-if="!defaultAddress">
              <div class="order-icon">
                <img src="https://img.icaixiaochu.com/order-icon.png" alt />
              </div>
              <p>去添加收货地址</p>
            </div>
            <div class="more">
              <img src="http://p2.icaixiaochu.com/more.png" alt />
            </div>
          </div>
          <div class="map" v-if="curSwitch">
            <div class="head-wrp">
              <img src="http://p2.icaixiaochu.com/location.png" alt />
              <p>广州市南沙区双山大道3号121号房</p>
            </div>
            <div class="content-wrp">
              <div class="map-bg">
                <img src="https://img.icaixiaochu.com/map-img.png" alt />
              </div>
              <div class="map-icon" @click="previewImage">
                <img src="https://img.icaixiaochu.com/map-icon.png" alt />
                <span>查看地图</span>
              </div>
            </div>
            <div class="fot-wrp">
              <div class="fot-wrp-left">
                <div class="box-time">
                  <p class="text1">{{delivery_time}}</p>
                  <p class="text2">自取时间</p>
                </div>
                <div class="more" @click="selectTime">
                  <img src="http://p2.icaixiaochu.com/more.png" alt />
                </div>
              </div>
              <div class="fot-wrp-right">
                <div class="box-phone">
                  <input type="text" v-model="tel" placeholder="手机号" />
                  <p class="text2">预留电话</p>
                </div>
                <div class="more">
                  <img src="http://p2.icaixiaochu.com/more.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shop-content">
        <div class="shop-wrp">
          <div class="shop-head">
            <div class="shop-title">商品信息</div>
            <div class="service" @click="selectTime" v-if="!curSwitch">
              <p>立即配送（预计{{delivery_time}}送达）</p>
              <img src="http://p2.icaixiaochu.com/more.png" alt />
            </div>
          </div>
          <collapse :selected="true" :goods="goods"></collapse>
        </div>
      </div>
      <div class="good-info">
        <div class="shop-count small">
          <p class="label">商品总价</p>
          <p>¥{{total}}</p>
        </div>
        <div class="shop-count small" @click="selectCoupons">
          <p class="label">优惠劵</p>
          <div class="select-coupon">
            <p style="color:#FF6304">¥{{conponData ? -conponData.price : 0 }}</p>
            <img src="http://p2.icaixiaochu.com/more.png" alt />
          </div>
        </div>
        <div class="shop-count small">
          <p class="label">配送费</p>
          <p>¥{{curSwitch ? 0: goodTotal >= delivery.price_shipping_out? 0: fee }}</p>
        </div>
      </div>
      <div class="note">
        <span>订单备注</span>
        <input type="text" v-model="remark" placeholder="可输入备注，最多50字" maxlength="40" />
      </div>
    </div>

    <div class="submit">
      <div class="submit-left">
        <div class="count">
          <div class="price-count">
            <span style="color:#000000;padding-right:2px;">合计</span>
            <i style="font-size:11px;">¥</i>
            {{price <= 0.01? 0.01:price }}
          </div>
          <div class="price-coupon">
            已减：
            <i style="font-size:11px;">¥</i>
            {{couponTotal}}
          </div>
        </div>
      </div>
      <div class="submit-right">
        <div class="order-num extend" @click="subOrder">
          <form-button></form-button>立即支付
        </div>
      </div>
    </div>
    <popup ref="seleceNow" type="bottom" className="seleceTime">
      <div class="time-wrp">
        <div class="top">
          选择送达时间
          <div class="cancel" @click="hideSelect">
             <img src="https://img.icaixiaochu.com/cancel.png" alt="">
          </div>
        </div>
        <div class="content">
          <div class="month">{{month}}</div>
          <div class="time-list" v-if="timelist">
            <picker-view class="picker-view" @change="changTime"  indicator-class="picker-box" indicator-style="color: #FEBC65;">
              <picker-view-column>
                <div v-for="(item, index) in timelist" :key="index"><span style="line-height: 34px">{{item}}</span></div>
              </picker-view-column>
            </picker-view>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Collapse from '@/components/collapse'
import popup from '@/components/popup'
import formButton from '@/components/form-button'
// import {time} from '@/utils/index'
export default {
  data () {
    return {
      month: '',
      fee: 0,
      address: '',
      goodTotal: '',
      price: '',
      remark: '',
      curSwitch: 0,
      tel: '',
      timelist: '',
      delivery: '',
      delivery_time: ''
    }
  },
  computed: {
    total () {
      let total = 0
      let couponPrice = this.conponData ? this.conponData.price : 0
      let fee = this.curSwitch
        ? 0
        : this.goodTotal >= this.delivery.price_shipping_out
          ? 0
          : this.fee
      this.goods.forEach(element => {
        total += element.number * element.real_price
      })
      this.price = (total - couponPrice + ~~fee).toFixed(2)
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
    this.getDefaultAddress()
    this.UseCoupon()
    this.DeliveryInfo()
  },
  methods: {
    changTime (value) {
      let index = value.mp.detail.value[0]
      this.delivery_time = this.timelist[index]
    },
    DeliveryInfo () {
      this.$http.post('/getPriceSend').then(res => {
        this.delivery = res.data
        if (this.goodTotal < this.delivery.price_send) {
          this.curSwitch = 1
        }
      })
    },
    previewImage () {
      wx.previewImage({
        current: 'https://img.icaixiaochu.com/map-img.png', // 当前显示图片的http链接
        urls: ['https://img.icaixiaochu.com/map-img.png'] // 需要预览的图片http链接列表
      })
    },

    changState (e) {
      this.curSwitch = e
    },
    selectCoupons () {
      wx.navigateTo({
        url: `../coupons/main?total=${this.goodTotal}`
      })
    },
    getShippingFee () {
      this.$http.get('/getShippingFee').then(res => {
        this.fee = res.data
      })
    },
    hideSelect () {
      this.$refs.seleceNow.toggle('hide')
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
    getDefaultAddress () {
      this.$http.post('/getDefaultAddress').then(res => {
        this.setDefaultAddress(res.data)
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
      var nowMonth = date.getMonth() + 1
      var strDate = date.getDate()
      this.month = `${nowMonth}- ${strDate}`
      this.$http.post('/getStoreTime').then(res => {
        this.timelist = res.data
        this.$refs.seleceNow.toggle('show')
      })
    },
    ...mapMutations({
      setCoupondata: 'SET_COUPONDATA',
      setGoods: 'SET_GOODS',
      setDefaultAddress: 'SET_DfAD'
    }),
    subOrder () {
      if (this.goodTotal <= this.delivery.price_send) {
        wx.showModal({
          title: '',
          content: `不满${this.delivery.price_send}元起送价, 不支持配送`,
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#FEA835',
          success: result => {},
          fail: () => {},
          complete: () => {}
        })
        return false
      }
      let phone = this.tel
      if (this.defaultAddress) {
        if (this.curSwitch) {
          if (!/^1[3456789]\d{9}$/.test(phone)) {
            wx.showToast({
              title: '请填写正确的手机号',
              icon: 'none',
              duration: 2000
            })
            return false
          }
        }
        this.$http
          .post('/createOrder', {
            address_id: this.defaultAddress.id,
            coupon_id: this.conponData ? this.conponData.id : 0,
            goods: JSON.stringify(this.goods),
            delivery_time: this.delivery_time,
            remark: this.remark ? this.remark : ' ',
            delivery_type: this.curSwitch,
            tel: phone
          })
          .then(res => {
            var orderId = res.data.order_id
            let result = res.data
            wx.requestPayment({
              timeStamp: result.timeStamp.toString(),
              nonceStr: result.nonceStr,
              package: result.package,
              signType: 'MD5',
              paySign: result.paySign,
              success: function (res) {
                wx.navigateTo({
                  url: `../orderdetail/main?id=${orderId}`
                })
              },
              fail: function (res) {
                wx.navigateTo({
                  url: `../orderdetail/main?id=${orderId}`
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
