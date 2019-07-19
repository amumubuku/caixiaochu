<template>
  <div class="my">
    <div class="user">
      <div class="user-wrp">
        <div class="user-content">
          <div class="login-btn" v-if="!user">
              <button class="login" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN">登录</button>
              
          </div>
          <div class="user-flex-left" v-if="user">
            <img :src="user.avatar_url" alt>
          </div>
          <div class="user-flex-right" v-if="user">
            <div class="username">
              <span class="vip-name" >{{user.nick_name}}</span>
              <span class="vip-flex" v-if="user.is_vip">优享会员</span>
               <span class="or-user" v-if="!user.is_vip">普通用户</span>
            </div>
            <div class="vip-titme" v-if="user.is_vip">{{user.vip_end_time}}会员到期</div>
            <p v-if="!user.is_vip">还需消费<span style="color:#FF150A;font-size:13px;">{{~~user.vip_price_at - user.money_at}}</span>元可成为会员</p>
          </div>
        </div>
        <div class="vip-box">
          <div class="vip-head">
            <img src="http://p2.icaixiaochu.com/my-icon4.png" alt>
            <div>
              <img src="http://p2.icaixiaochu.com/685675@2x.png" alt>
            </div>
          </div>
          <div class="icon-list">
            <div class="icon-wrp">
              <div class="icon-item">
                <img src="http://p2.icaixiaochu.com/Fapjmoe49dgo4GP3.png" mode="aspectFit" alt>
              </div>
              <div class="icon-item" data-type="1">
                <img src="https://img.icaixiaochu.com/3453453@2x%20%282%29.png" mode="aspectFit" alt>
              </div>
              <div class="icon-item" data-type="2">
                <img src="http://p2.icaixiaochu.com/78@2x.png" style="heigth:17px" mode="aspectFit" alt>
              </div>
            </div>
            <div class="icon-item">
              <img src="http://p2.icaixiaochu.com/567575@2x.png"  mode="aspectFit" alt>
            </div>
          </div>
        </div>
      </div>
      <img src="https://j-image.missfresh.cn/img_20181119155803745.png" alt class="line">
    </div>
    <div class="order">
      <div class="order-head">
        <div class="flex-left">
          <p>我的订单</p>
        </div>
        <div class="flex-right" @click="toOrder(0)">
          <p>全部订单</p>
          <img src="http://p2.icaixiaochu.com/more.png" alt>
        </div>
      </div>
      <div class="order-list">
        <div class="list-item" @click="toOrder(1)">
          <div class="item-icon">
            <img
              src="http://p2.icaixiaochu.com/my-icon5.png"
              mode="aspectFit"
              alt
              style="width: 34px; height: 26px"
            >
          </div>
          <span class="text">待支付</span>
          <i class="state-icon" v-if="orderState.unPay>0">{{orderState.unPay}}</i>
        </div>
        <div class="list-item" @click="toOrder(2)">
          <div class="item-icon">
            <img
              src="http://p2.icaixiaochu.com/my-icon3.png"
              mode="aspectFit"
              alt
              style="width: 26px; height: 34px"
            >
          </div>
          <span class="text">待配送</span>
          <i class="state-icon" v-if="orderState.unShipping>0">{{orderState.unShipping}}</i>
        </div>
        <div class="list-item" @click="toOrder(3)">
          <div class="item-icon">
            <img
              src="http://p2.icaixiaochu.com/my-icon1.png"
              mode="aspectFit"
              alt
              style="width: 34px; height: 26px"
            >
          </div>
          <span class="text">待收货</span>
          <i class="state-icon" v-if="orderState.shipping>0">{{orderState.shipping}}</i>
        </div>
        <div class="list-item" @click="toOrder(4)">
          <div class="item-icon">
            <img
              src="http://p2.icaixiaochu.com/my-icon14.png"
              mode="aspectFit"
              alt
              style="width: 28px; height: 34px"
            >
          </div>
          <span class="text">已完成</span>
          <i class="state-icon" v-if="orderState.finish>0">{{orderState.finish}}</i>
        </div>
      </div>
    </div>
    <div class="my-assets">
      <div class="order-head">
        <div class="flex-left">
          <p>我的资产</p>
        </div>
      </div>
      <div class="assets-wrp">
        <div class="wrp-left" @click="myCoupon">
          <div class="coupon-info">
            <p class="text-left"><span style="font-size:21px;">{{coupontCount}}</span>张</p>
            <p>优惠劵</p>
          </div>
          <img src="http://p2.icaixiaochu.com/coupon-card.png" alt>
        </div>
        <div class="wrp-right" @click="socre">
          <div class="socre-info">
            <p class="text-left"><span style="font-size:21px;">{{user.points || 0}}</span>分</p>
            <p>积分兑换</p>
          </div>
          <img src="http://p2.icaixiaochu.com/Integral.png" alt>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="service-head">
        <div class="flex-left">
          <p>我的服务</p>
        </div>
      </div>
      <div class="service-list">
        <div class="list-item" @click="toAddress">
          <div class="item-icon">
            <img
              src="http://p2.icaixiaochu.com/shipping.png"
              mode="aspectFit"
              alt
              style="width: 40px; height: 40px"
            >
            <span class="text">收货地址</span>
          </div>
        </div>
        <div class="list-item">
          <button open-type="contact">
            <img src="http://p2.icaixiaochu.com/my-icon7.png" alt style="width: 40px; height: 40px">
            <span>联系客服</span>
          </button>
        </div>
        <div class="list-item" @click="feedbook">
          <div class="item-icon">
            <img src="http://p2.icaixiaochu.com/opinion.png" alt style="width: 40px; height: 40px">
            <span class="text">意见反馈</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import util from '@/utils/util'
import user from '@/services/user'
export default {
  data () {
    return {
      orderState: [],
      coupontCount: 0
    }
  },
  computed: {
    ...mapGetters(['user', 'cartInfos'])
  },
  methods: {
    getUserInfo (e) {
      if (e.mp.detail.userInfo) {
        let { encryptedData, iv } = e.mp.detail
        user.loginByWeixin(iv, encryptedData).then(res => {
          if (res.user) {
            this.setUser(res.user)
            this.getOrderNum()
            this.getConpons()
            this.InfoCart()
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        // 用户按了拒绝按钮
      }
    },
    toOrder (index) {
      util.checkLogin(`../myorder/main?activeIndex=${index}`)
    },
    feedbook () {
      util.checkLogin(`../feedback/main`)
    },
    toAddress () {
      util.checkLogin(`../myaddress/main`)
    },
    socre () {
      util.checkLogin(`../myscore/main`)
    },
    myCoupon () {
      util.checkLogin(`../mycoupon/main`)
    },
    getOrderNum () {
      this.$http.post('/getOrderNum').then(res => {
        this.orderState = res.data
      })
    },
    getConpons () {
      this.$http.post('/myCouponsCounts').then(res => {
        this.coupontCount = res.data.counts
      })
    },
    getUserData () {
      if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
        this.$http.post('/getUserInfo').then(res => {
          if (res.status) {
            this.setUser(res.data)
          }
          wx.stopPullDownRefresh()
        })
      } else {
        wx.stopPullDownRefresh()
      }
    },
    ...mapActions(['setUser', 'InfoCart'])
  },
  onPullDownRefresh () {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      this.getOrderNum()
      this.getConpons()
    }
    this.getUserData()
  },
  onShow () {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      this.$http.post('/getUserInfo').then(res => {
        if (res.status) {
          this.setUser(res.data)
        }
      })
      this.getOrderNum()
      this.getConpons()
    }
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>

