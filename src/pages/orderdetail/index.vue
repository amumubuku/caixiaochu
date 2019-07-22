<template>
  <div class="order-wrp" v-if="orderDetail">
    <navigation-bar
      :title="'订单详情'"
      :navBackgroundColor="'#fff'"
      :titleColor="'#000'"
      :back-visible="true"
      :home-path="'/pages/index/main'"
    ></navigation-bar>
    <div class="order-state">
      <div class="order-icon">
        <img :src="orderIcon" alt />
      </div>
      <p>{{orderDetail.status == 0? '待支付':orderDetail.status == 1? '已支付,等待买家发货':orderDetail.status == 2? '待收货': orderDetail.status == 3?'已完成':orderDetail.status == 4? '商家已接单':'已取消'}}</p>
    </div>
    <div class="address-info" v-if="!orderDetail.delivery_type">
      <div class="address-des">
        <div class="order-icon">
          <img src="https://img.icaixiaochu.com/order-icon.png" alt />
        </div>
        <div class="addr-content">
          <div class="address-title">
            <div class="name">{{orderDetail.extends.shipping_name}}</div>
            <div class="phone">{{orderDetail.extends.tel}}</div>
          </div>
          <div class="but">{{orderDetail.extends.city}}{{orderDetail.extends.address}}</div>
        </div>
      </div>
    </div>

    <div class="map" v-if="orderDetail.delivery_type">
      <div class="head-wrp">
        <img src="http://p2.icaixiaochu.com/location.png" alt />
        <p>{{orderDetail.address}}</p>
      </div>
      <div class="content-wrp">
        <div class="refund-state" v-if="orderDetail.refund" :style="{background:refundState}"  @click="refundedDetail">
          <p class="refund-text">退款详情：{{refundText}}</p>
          <img src="https://img.icaixiaochu.com/more-icon.png" alt />
        </div>
        <div class="map-bg">
          <img src="https://img.icaixiaochu.com/map-img.png" alt />
        </div>
        <div class="map-icon" @click="previewImage">
          <img src="https://img.icaixiaochu.com/map-icon.png" alt />
          <span>查看地图</span>
        </div>
        <div class="token" @click="previewImage">
          <span>取餐号码：{{orderDetail.number}}</span>
        </div>
      </div>
      <div class="fot-wrp">
        <div class="fot-wrp-left">
          <div class="box-time">
            <p class="text1">{{orderDetail.extends.delivery_time}}</p>
            <p class="text2">自取时间</p>
          </div>
        </div>
        <div class="fot-wrp-right">
          <div class="box-phone">
            <p class="text1">{{orderDetail.extends.tel}}</p>
            <p class="text2">预留电话</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="refunded"
      @click="refundedDetail"
      v-if="orderDetail.refund && !orderDetail.delivery_type"
    >
      <p>退款详情</p>
      <div>
        <span :class="{color:refundState}">{{refundText}}</span>
        <img src="https://img.icaixiaochu.com/more.png" alt />
      </div>
      <div class="tag-icon"></div>
    </div>
    <div class="shop-content">
      <div class="shop-wrp">
        <div class="shop-head">
          <div class="shop-title">商品信息</div>
          <div class="service" @click="selectTime" v-if="!orderDetail.delivery_type" >
            <p>立即配送(预计{{orderDetail.extends.delivery_time}}送达)</p>
          </div>
        </div>
        <collapse :selected="true" :goods="orderDetail.goods"></collapse>
      </div>
    </div>
    <div class="order-id">
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
        <p>¥{{orderDetail.money_pay - orderDetail.extends.shipping_fee}}</p>
      </div>
      <div class="shop-count small">
        <p>优惠劵</p>
        <div class="select-coupon">
          <p>¥{{-orderDetail.extends.coupon_money ? -orderDetail.extends.coupon_money :0}}</p>
        </div>
      </div>

      <div class="shop-count small">
        <p>配送费</p>
        <p>¥{{orderDetail.extends.shipping_fee}}</p>
      </div>
      <div class="shop-count small">
        <p></p>
        <p>合计 ¥{{orderDetail.money_pay}}</p>
      </div>
    </div>
    <div class="note">
      订单备注
      <span
        style="color:rgba(0,0,0,.5);padding-left:22px;"
      >{{orderDetail.extends.remark ? orderDetail.extends.remark :'无'}}</span>
    </div>
    <div class="prompt-msg">如果收到的商品出现质量、错发、漏发等情况可联系客服</div>
    <div class="order-fuc-wrp">
      <div class="kefu-btn" v-if="(orderDetail.refund && orderDetail.refund.refund_status > 1) || orderDetail.status ===5 || orderDetail.status ===3">
        <button open-type="contact">联系客服</button>
      </div>
      <div class="order-wrp-state" v-else>
        <div
          class="order-tag"
          @click="cancelRefunded"
          v-if="(orderDetail.refund && orderDetail.refund.refund_status===0) && orderDetail.status"
        >撤销退款申请
        </div>
        <div class="order-tag" @click="orderHandle" v-else>{{orderDetail.status && orderDetail.status !=5?'申请退款':'取消订单'}}</div>
        <div class="fnc-btn">
          <div class="parment"  @click="payment" v-if="orderDetail.status ===0">
            <p>去支付</p>
            <img src="https://img.icaixiaochu.com/more-icon.png" alt />
          </div>
          <button open-type="contact" v-else>联系客服</button>
        </div>
      </div>
    </div>
    <popup ref="couponList" type="center" className="coupon-box">
      <div class="coupon-wrp">
        <div class="coupon-title">— 可用优惠券 —</div>
        <div class="coupon-list">
          <div class="coupon-item" v-for="(item,index) in coupons" :key="index">
            <div class="flex-left">
              <div class="coupon-price">
                <i style="font-size:13px;">¥</i>
                <p>{{item.price}}</p>
              </div>
              <div class="coupon-des">
                <p>元优惠卷</p>
                <div>
                  满
                  <i style="color:#FF6304;">{{item.threshold_price}}</i>
                  元可用
                </div>`
              </div>
            </div>
            <div class="flex-right">
              <p>有效期至</p>
              <p class="time">{{item.expire_time}}</p>
              <div class="submit" @click="userCoupon(item)">领取</div>
            </div>
          </div>
        </div>
        <div class="coupon-bg">
          <img src="https://img.icaixiaochu.com/coupon-bg.png" alt />
        </div>
      </div>
    </popup>
    <popup ref="optOnCancel" type="bottom" className="opt-oncancel">
      <div class="options-list">
        <div class="opt-item" v-for="(item, index) in causes" :key="index" @click="selectCause(item)">{{item.title}}</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </popup>
  </div>
</template>
<script>
import Collapse from '@/components/collapse'
import popup from '@/components/popup'
import navigationBar from '@/components/navigationBar.vue'
export default {
  components: { Collapse, navigationBar, popup },
  data () {
    return {
      orderId: '',
      orderDetail: '',
      fee: '',
      causes: [],
      causeId: '',
      causeTitle: '',
      coupons: [
        {
          coupon_id: 4,
          expire_time: '2019-06-27',
          id: 5,
          is_used: 1,
          price: 30,
          threshold_price: '0.00',
          time_create: 1559269705,
          time_used: 1560338581,
          title: '新人优惠卷'
        },
        {
          coupon_id: 4,
          expire_time: '2019-06-27',
          id: 5,
          is_used: 1,
          price: 30,
          threshold_price: '0.00',
          time_create: 1559269705,
          time_used: 1560338581,
          title: '新人优惠卷'
        }
      ]
    }
  },

  computed: {
    orderIcon () {
      let orderState = this.orderDetail.status
      return orderState === 0 ? 'http://p2.icaixiaochu.com/3q60ua1hd1r4Hczi.png' : orderState === 1 ? 'http://p2.icaixiaochu.com/pJhA7sAoC5bZEqab.png' : orderState === 2 ? 'http://p2.icaixiaochu.com/peisongzhong.png' : orderState === 3 ? 'http://p2.icaixiaochu.com/PZAElTLByI7WZW6d.png' : orderState === 4 ? 'http://p2.icaixiaochu.com/pJhA7sAoC5bZEqab.png' : 'http://p2.icaixiaochu.com/cancel.png'
    },
    refundState () {
      if (!this.orderDetail.refund) {
        return ''
      }
      let state = this.orderDetail.refund.refund_status
      return state === 0
        ? '#F5C27C'
        : state === 1
          ? '#73C0F6'
          : state === 2
            ? '#F07881'
            : ''
    },
    refundText () {
      if (!this.orderDetail.refund) {
        return ''
      }
      let state = this.orderDetail.refund.refund_status
      return state === 0
        ? '等待商家处理'
        : state === 1
          ? '退款成功'
          : state === 2
            ? '商家拒绝退款'
            : '自主撤销申请'
    }
  },
  methods: {
    previewImage () {
      wx.previewImage({
        current: 'https://img.icaixiaochu.com/address-map.png', // 当前显示图片的http链接
        urls: ['https://img.icaixiaochu.com/address-map.png'] // 需要预览的图片http链接列表
      })
    },
    selectCause (item) {
      this.causeId = item.id
      this.causeTitle = item.title
      this.$http.post('/cancelUnpayOrder', {cancel_id: this.causeId, order_id: this.orderId}).then(res => {
        if (res.status) {
          wx.navigateBack({ changed: true })
        }
      })
    },
    orderHandle () {
      if (this.orderDetail.status) {
        wx.navigateTo({
          url: `../refunded/main?id=${this.orderId}`,
          success: result => {},
          fail: () => {},
          complete: () => {}
        })
      } else {
        this.$http.post('/getCancelCause').then(res => {
          this.causes = res.data
          this.$refs.optOnCancel.toggle('show')
        })
      }
    },
    refundedDetail () {
      wx.navigateTo({
        url: `../refundeddetail/main?id=${this.orderId}`,
        success: result => {},
        fail: () => {},
        complete: () => {}
      })
    },
    cancelRefunded () {
      let _this = this
      let refundId = this.orderDetail.refund.refund_id
      wx.showModal({
        title: '确认撤销退款申请',
        content: '撤销后，将无法再次申请',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#797979',
        confirmText: '确定',
        confirmColor: '#FEA835',
        success: result => {
          if (result.confirm) {
            _this.$http
              .post('/repealApply', { refund_id: refundId })
              .then(res => {
                _this.getOrderDetail()
              })
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
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
    cancel () {
      this.$refs.optOnCancel.toggle('hide')
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
      console.log(1)
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
              this.getOrderDetail()
            },
            fail: function (res) {
              // wx.navigateTo({
              //   url: `../myorder/main?currentId=1`
              // })
            }
          })
        })
    },
    getOrderDetail () {
      this.$http.post('/orderDetail', { order_id: this.orderId }).then(res => {
        this.orderDetail = res.data
        wx.stopPullDownRefresh()
      })
    }
  },
  onShow () {
    this.orderId = this.$root.$mp.query.id
    this.getOrderDetail()
    setTimeout(() => {
      // this.$refs.couponList.toggle('show')
    }, 240)
  },
  onPullDownRefresh () {
    this.getOrderDetail()
  },
  onUnload () {
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 2]
    var url = currentPage.route
    if (url === 'pages/order/main') {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>
<style lang="less" >
@import "./style.less";
</style>
