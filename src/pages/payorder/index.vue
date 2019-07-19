<template>
  <div class="order-detail" v-if="orderDetail">
    <div class="order-state">
      <div class="order-icon">
        <img src="http://p2.icaixiaochu.com/3q60ua1hd1r4Hczi.png" alt>
      </div>
      <p>{{orderDetail.status == 0? '待支付':orderDetail.status == 1? '待配送':orderDetail.status == 2? '待收货': '已完成'}}</p>
    </div>
    <div class="order-address">
      <div class="address-content">
        <div class="top">收货地址</div>
        <div class="address-info">
          <div class="address-des">
            <div class="address-title">
              <div class="name">{{orderDetail.extends.shipping_name}}</div>
              <div class="phone">{{orderDetail.extends.tel}}</div>
            </div>
            <div class="but">{{orderDetail.extends.city}}{{orderDetail.extends.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="note">备注: {{orderDetail.extends.remark ? orderDetail.extends.remark :'无'}}</div>
    <div class="shop-content">
      <div class="shop-wrp">
        <div class="shop-head">
          <div class="shop-title">商品信息</div>
          <div class="service" @click="selectTime">
            <p>立即配送(预计{{orderDetail.extends.delivery_time}}送达)</p>
          </div>
        </div>
        <collapse :selected="true" :goods="orderDetail.goods"></collapse>
      </div>
    </div>
    <div class="order-wrp">
      <div class="order-content">
        <div class="order-head">订单信息</div>
        <div class="order-info">
          <div class="order-no">订单号: {{orderDetail.order_no}}</div>
          <div class="time">创建时间: {{orderDetail.time_create}}</div>
        </div>
      </div>
    </div>
    <div class="good-info">
      <div class="shop-count small">
        <p>商品总价</p>
        <p>¥{{orderDetail.money_pay}}</p>
      </div>
      <div class="shop-count small">
        <p>优惠劵</p>
        <div class="select-coupon">
          <p>¥{{-orderDetail.extends.coupon_money ? -orderDetail.extends.coupon_money :0}}</p>
          <img src="http://p2.icaixiaochu.com/more.png" alt>
        </div>
      </div>
      <div class="shop-count small">
        <p>配送费</p>
        <p>¥{{fee}}</p>
      </div>
    </div>
    <div class="oder-kefu">如果收到的商品出现质量、错发、漏发等情况可联系客服</div>
    <div class="payment-wrp">
      <div class="unpayment" @click="cancelOrder">取消订单</div>
      <div class="payment" @click="payment">支付</div>
    </div>
  </div>
</template>
<script>
import Collapse from '@/components/collapse'
export default {
  components: { Collapse },
  data () {
    return {
      orderId: '',
      orderDetail: '',
      fee: ''
    }
  },
  methods: {
    getOrders (status) {
      this.$http
        .post('/myOrders', {
          status
        })
        .then(res => {
          wx.stopPullDownRefresh()
          this.order = res.data
        })
    },
    toggle (index) {
      this.currentId = index
    },
    async getShippingFee () {
      this.$http.post('/getShippingFee').then(res => {
        this.fee = res.data
      })
    },
    cancelOrder (item) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确定取消订单?',
        success (res) {
          if (res.confirm) {
            _this.$http.post('/cancelUnpayOrder', {order_id: _this.orderId}).then(res => {
              if (res.status === 1) {
              }
              wx.navigateBack({ changed: true })
            })
          } else if (res.cancel) {
          }
        }
      })
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
          ? 'all'
          : this.activeIndex === 1
            ? 'unPay'
            : this.activeIndex === 2
              ? 'unShipping'
              : this.activeIndex === 3
                ? 'shipping'
                : 'finish'
      this.getOrders(this.status)
    },
    onAnimationfinish () {},
    payment () {
      this.$http
        .post('/repay', {
          order_id: this.orderDetail.order_id
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
              wx.navigateBack({ changed: true })
            },
            fail: function (res) {
              wx.navigateTo({
                url: `../myorder/main?currentId=1`
              })
            }
          })
        })
    },
    getOrderDetail () {
      this.$http.post('/orderDetail', { order_id: this.orderId }).then(res => {
        this.orderDetail = res.data
      })
    }
  },
  mounted () {
    this.orderId = this.$root.$mp.query.id
    this.getOrderDetail()
    this.getShippingFee()
  },
  onPullDownRefresh () {
    this.getcoupon(this.status)
  }
}
</script>
<style lang="less" >
@import "./style.less";
</style>
