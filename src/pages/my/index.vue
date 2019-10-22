<template>
  <div class="my">
    <div class="head">
      <div
        class="title"
        :style="{height: titleBarHeight + 'px',paddingTop: statusBarHeight + 'px',lineHeight: titleBarHeight + 'px'}"
      >我的</div>
      <div class="user-info">
        <div class="user-cover">
          <div class="login-btn" v-if="!user">
            <button
              class="login"
              type="primary"
              open-type="getUserInfo"
              @getuserinfo="getUserInfo"
              lang="zh_CN"
            >
              <img src="https://img.icaixiaochu.com/login-logo.png" alt />
            </button>
          </div>
          <img :src="user.avatar_url" v-else alt />
        </div>
        <div></div>
        <div class="user-content">
          <p v-if="!user">点击头像登录</p>
          <div class="user-box" v-else>
            <div class="user-name">
            <span class="name">{{user.nick_name}}</span>
            <span class="user-tag">{{user.is_vip ? '优享会员' : '普通用户'}}</span>
          </div>
          <div class="progress-wrp">
            <div class="progress-inner">
              <div class="progress-bar" :style="{width:progressWidth + 'rpx'}"></div>
              <div class="progress-thumb"></div>
            </div>
            <p>{{~~user.money_at}}/{{~~user.vip_price_at}}</p>
            <div class="img-icon">
              <img src="https://img.icaixiaochu.com/%E9%97%AE%E5%8F%B7@2x.png" alt />
              <div class="msg-tag" v-if="!user.is_vip">
                <p>还需{{~~(user.vip_price_at - user.money_at)}}元成为会员</p>
                <span></span>
              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
      <div class="footer">
        <div class="background" v-if="!user.is_vip">
          <img src="https://img.icaixiaochu.com/vip-des.png" alt />
        </div>
        <div class="vip-bg" v-if="user.is_vip">
          <img
            class="bg-tag"
            src="https://img.icaixiaochu.com/%E4%BC%98%E4%BA%AB%E4%BC%9A%E5%91%98%20_%20@2x.png"
            alt
          />
          <p>{{user.money_save}}</p>
          <img class="tag-icon" src="https://img.icaixiaochu.com/%E5%85%83@2x.png" alt />
        </div>
        <div class="icon" @click="toggle(0)">
          <img src="https://img.icaixiaochu.com/my-more-icon.png" alt />
        </div>
      </div>
    </div>
    <div class="my-wrp">
      <div class="order">
        <div class="order-head">
          <div class="icon">
            <img src="https://img.icaixiaochu.com/%E7%BB%84%201597@3x.png" alt />
          </div>
          <div class="content">
            <p class="title">我的订单</p>
            <div class="all-order" @click="toOrder(0)">
              <p>全部订单</p>
              <img src="http://p2.icaixiaochu.com/more.png" alt />
            </div>
          </div>
        </div>
        <div class="order-list">
          <div class="list-item" @click="toOrder(1)">
            <div class="item-icon">
              <img
                src="https://img.icaixiaochu.com/1233.png"
                mode="aspectFit"
                alt
                style="width: 34px; height: 26px"
              />
            </div>
            <span class="text">待支付</span>
            <i class="state-icon" v-if="orderState.unPay>0">{{orderState.unPay}}</i>
          </div>
          <div class="list-item" @click="toOrder(2)">
            <div class="item-icon">
              <img
                src="https://img.icaixiaochu.com/2@2x%20%281%29.png"
                mode="aspectFit"
                alt
                style="width: 26px; height: 34px"
              />
            </div>
            <span class="text">待配送</span>
            <i class="state-icon" v-if="orderState.unShipping>0">{{orderState.unShipping}}</i>
          </div>
          <div class="list-item" @click="toOrder(3)">
            <div class="item-icon">
              <img
                src="https://img.icaixiaochu.com/3@2x%20%282%29.png"
                mode="aspectFit"
                alt
                style="width: 34px; height: 26px"
              />
            </div>
            <span class="text">待收货</span>
            <i class="state-icon" v-if="orderState.shipping>0">{{orderState.shipping}}</i>
          </div>
          <div class="list-item" @click="toOrder(4)">
            <div class="item-icon">
              <img
                src="https://img.icaixiaochu.com/4@2x%20%281%29.png"
                mode="aspectFit"
                alt
                style="width: 34px; height: 26px"
              />
            </div>
            <span class="text">待评价</span>
          </div>
          <div class="list-item" @click="service">
            <div class="item-icon">
              <img
                src="https://img.icaixiaochu.com/order-icon-v1.png"
                mode="aspectFit"
                alt
                style="width: 28px; height: 34px"
              />
            </div>
            <span class="text">售后/退款</span>
          </div>
        </div>
      </div>
      <div class="my-assets">
        <div class="order-head">
          <div class="icon">
            <img src="https://img.icaixiaochu.com/%E7%BB%84%201591@3x.png" alt />
          </div>
          <div class="flex-left">
            <p>我的资产</p>
          </div>
        </div>
        <div class="assets-wrp">
          <div class="wrp-left" @click="myCoupon">
            <div class="coupon-info">
              <p class="text-left">
                <span style="font-size:21px;">{{coupontCount}}</span>张
              </p>
              <p>优惠劵</p>
            </div>
            <img src="http://p2.icaixiaochu.com/coupon-card.png" alt />
          </div>
          <div class="wrp-right" @click="socre">
            <div class="socre-info">
              <p class="text-left">
                <span style="font-size:21px;">{{user.points || 0}}</span>分
              </p>
              <p>积分兑换</p>
            </div>
            <img src="http://p2.icaixiaochu.com/Integral.png" alt />
          </div>
        </div>
      </div>
      <div class="service">
        <div class="service-list">
          <div class="service-item" @click="toAddress">
            <div class="icon">
              <img src="http://p2.icaixiaochu.com/shipping.png" mode="aspectFit" alt />
            </div>
            <div class="content">
              <p>收货地址</p>
              <img src="http://p2.icaixiaochu.com/more.png" alt />
            </div>
          </div>
          <div class="service-item">
            <div class="icon">
              <img src="http://p2.icaixiaochu.com/my-icon7.png" alt />
            </div>
            <div class="content">
              <button open-type="contact">
                <p>联系客服</p>
                <img src="http://p2.icaixiaochu.com/more.png" alt />
              </button>
            </div>
          </div>
          <div class="service-item" @click="feedbook">
            <div class="icon">
              <img src="http://p2.icaixiaochu.com/opinion.png" alt />
            </div>
            <div class="content">
              <p class="text">意见反馈</p>
              <img src="http://p2.icaixiaochu.com/more.png" alt />
            </div>
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
      coupontCount: 0,
      statusBarHeight: '',
      titleBarHeight: '',
      navBarHeight: '',
      platform: '',
      model: '',
      brand: '',
      system: '',
      diffCustom: true
    }
  },
  computed: {
    ...mapGetters(['user', 'cartInfos']),
    progressWidth () {
      if (!this.user) return 0
      let percent = this.user.money_at / this.user.vip_price_at
      return percent > 1 ? 113 * 2 : percent * (115 - 3) * 2
    },
    paddingTop () {
      return (
        (this.statusBarHeight + (this.titleBarHeight / 2 - 12)) * 2 + 'rpx'
      )
    }
  },
  beforeMount () {
    const self = this
    wx.getSystemInfo({
      success (system) {
        self.statusBarHeight = system.statusBarHeight
        self.platform = system.platform

        let platformReg = /ios/i
        if (platformReg.test(system.platform)) {
          self.titleBarHeight = 44
        } else {
          self.titleBarHeight = 48
        }

        self.navBarHeight = self.statusBarHeight + self.titleBarHeight
      }
    })
  },
  methods: {
    toggle (index) {
      wx.navigateTo({
        url: `../privileges/main?curIndex=${index}`
      })
    },
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
    service () {
      wx.navigateTo({
        url: '../service/main',
        success: result => {},
        fail: () => {},
        complete: () => {}
      })
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

