<template>
  <div class="vip">
    <div class="vip-wrp">
      <div class="vip-card">
        <div class="card-wrp">
          <div class="vip-card-head">
            <div class="vip-icon">
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
                <div class="user-icon" v-if="user" :class="user.is_vip? '.user-bg':'.vip-user-bg'">
                  <img :src="user.avatar_url" alt class="user-cover" />
                  <img v-if="user.is_vip" class="vip-user-tag" src="https://img.icaixiaochu.com/%E8%B5%84%E6%BA%90%201@3x@2x.png" alt="">
                </div>
              </div>
              <div class="vip-info-box">
                <div class="vip-content" v-if="user">
                  <p class="vip-name" v-if="user">{{user.nick_name}}</p>

                  <div class="member-user" v-if="user.is_vip">
                    <img src="https://img.icaixiaochu.com/%E7%9F%A9%E5%BD%A2%20113%20%E6%8B%B7%E8%B4%9D@2x.png" alt="">
                  </div>
                  <div class="or-user" v-if="!user.is_vip">
                    <img src="https://img.icaixiaochu.com/11%E5%BD%A2%203%20%E6%8B%B7%E8%B4%9D@2x.png" alt="">
                  </div>
                </div>
                <p v-else>点击头像登录</p>
              </div>
            </div>
            <div class="card-flex-msg" @click="toggleVipModal">
              <p>优享会员说明</p>
              <img src="http://p2.icaixiaochu.com/%E7%BB%84%201495@3x.png" alt />
            </div>
          </div>
          <div class="vip-card-footer">
            <div
              class="progress-tag"
              :style="{transform: 'translate3d('+ (progressBar) + 'rpx, -22rpx, 0)'}"
            >
              <P>{{user.money_at > 999? '999+': ~~(user.money_at)}}</P>
              <div class="tag"></div>
            </div>
            <div class="vip-progress-wrp">
              <div class="progress-bar" :style="{width:progressWidth + 'rpx'}"></div>
              <div class="progress-end-msg"></div>
            </div>

            <div class="vip-state-msg">
              <div class="msg-flex-left">
                <p v-if="user.is_vip">{{user.vip_end_time}}会员到期</p>
                <p v-else>还需消费{{!user.is_vip ?(~~(user.vip_price_at - user.money_at)):300}}元可成为会员</p>
              </div>
              <div class="msg-flex-right">
                <span>{{user.vip_price_at}}</span>
                <p>优享会员</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vip-content-wrp">
 <div class="vip-info">
        <div class="content-wrp">
          <div class="vip-welfare">
            <div class="welfare-top">
              <div class="vip-row-left">
                <p>小厨VIP特权</p>
                <div class="tag-icon"></div>
              </div>
              <div class="vip-row-right" @click="interPopup">
                <p v-if="user.is_vip">
                  会员期间为您节省
                  <span
                    style="color:#FF6304"
                  >{{user.money_save >999? '999+' :user.money_save}}</span> 元
                </p>
                <p v-if="!user.is_vip">成为优享会员，享受会员特权</p>
                <img src="http://p2.icaixiaochu.com/more.png" alt class="icon" />
              </div>
            </div>
            <div class="welfare-list">
              <div class="welfate-item" @click="toggle(0)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/3@2x%20%281%29.png" alt mode="scaleToFill" />
                </div>
                <span class="text">会员专享价</span>
                <div class="item-tag-icon">hot</div>
              </div>
              <div class="welfate-item" @click="toggle(1)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/1@2x.png" alt />
                </div>
                <span class="text">优享会员日</span>
              </div>
              <div class="welfate-item" @click="toggle(2)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/4@2x.png" alt />
                </div>
                <span class="text">积分加倍</span>
              </div>
              <div class="welfate-item">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/2@2x.png" alt />
                </div>
                <span class="text">期待更多</span>
              </div>
            </div>
          </div>
          <div class="welfare-but" @click="jumpScore">
            <div class="welfare-left">
              <p>查看积分情况</p>
            </div>
            <div class="welfare-right">
              <img src="http://p2.icaixiaochu.com/more.png" alt class="icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="vip-goods">
        <div class="head">
          <div class="title">
            <img src="http://p2.icaixiaochu.com/tg0imhdrs23x4uda.png" mode="aspectFit" alt />
          </div>
          <p>省时省力</p>
        </div>
        <goodlist :goods="vipGood" />
        <div class="vip-more" @click="showMore">
          <p>查看更多</p>
          <img src="http://p2.icaixiaochu.com/more.png" alt />
        </div>
      </div>

      <div class="card-wrp">
        <div class="card-item">
          <div class="head">
            <div class="title">
              <img src="http://p2.icaixiaochu.com/vip-icon23.png" mode="aspectFit" alt />
            </div>
            <p>专属购物节</p>
          </div>
          <div class="card-content">
            <img
              src="https://img.icaixiaochu.com/%E7%BB%84%201605@3x.png"
              alt
            />
          </div>
        </div>
        <div class="card-item">
          <div class="head">
            <div class="title">
              <img
                src="http://p2.icaixiaochu.com/vip-icon22.png"
                style="width:78px;"
                mode="aspectFit"
                alt
              />
            </div>
            <p>轻松兑商品</p>
          </div>
          <div class="card-content">
            <img src="https://img.icaixiaochu.com/%E7%BB%84%201572@3x.png" alt />
          </div>
        </div>
      </div>
      </div>
     
    </div>
    <popup ref="vipModal" type="center" className="vip-des-wrp">
      <div class="vip-modal">
        <div class="card-bg"></div>
        <div class="vip-modal-content">
          <div class="bg">
            <img src="http://p2.icaixiaochu.com/huiyuanshuoming.png" alt />
          </div>
          <h3>关于有效期：</h3>
          <p>
            消费满{{user.vip_price_at}}元以后即可成为优享会员，满足条件
            后次日起开始计算，3个月为一个周期清算。
          </p>
        </div>
        <div class="vip-modal-footer" @click="toggleVipModal">我知道了</div>
      </div>
    </popup>
    <popup ref="integPopup" type="center" className="couponModal">
      <div class="vip-modal">
        <div class="card-bg"></div>
        <div class="vip-modal-content">
          <div class="head-content">
            <p>自你{{user.vip_start_time}}成为会员</p>
            <div class="bg">
              <img
                src="https://img.icaixiaochu.com/%E4%BC%9A%E5%91%98%E6%9C%9F%E9%97%B4%E5%B7%B2%E4%B8%BA%E6%82%A8%E8%8A%82%E7%9C%81@2x.png"
                alt
              />
            </div>
            <h3 class="my-coupon-price">¥{{user.money_save}}</h3>
          </div>
          <div class="footer-content">
            <div class="footer-left">
              <p class="p1">会员专享价</p>
              <p class="p2">大量商品享折扣</p>
            </div>
            <div class="footer-right">¥{{user.money_save}}</div>
          </div>
        </div>
        <div class="vip-modal-footer" @click="interPopup">我知道了</div>
      </div>
    </popup>
  </div>
</template>

<script>
import goodlist from '@/components/goodlist'
import popup from '@/components/popup'
import subTitle from '@/components/sub-title'
import { mapGetters, mapActions } from 'vuex'
import user from '@/services/user'
export default {
  data () {
    return {
      vipGood: [],
      vipStart: []
    }
  },
  components: {
    goodlist,
    popup,
    subTitle
  },
  computed: {
    ...mapGetters(['user', 'cartInfos']),
    progressBar () {
      if (!this.user) return 0
      let percent = this.user.money_at / this.user.vip_price_at
      return percent >= 289 / 315 ? (289 * 2) : (percent * 280) * 2
    },
    progressWidth () {
      if (!this.user) return 0
      let percent = this.user.money_at / this.user.vip_price_at
      return percent > 1 ? 315 * 2 : (percent * (315 - 18)) * 2
    }
  },
  methods: {
    getUserInfo (e) {
      if (e.mp.detail.userInfo) {
        let { encryptedData, iv } = e.mp.detail
        user.loginByWeixin(iv, encryptedData).then(res => {
          if (res.user) {
            this.setUser(res.user)
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
    jumpScore () {
      wx.navigateTo({
        url: `../myscore/main`
      })
    },
    getVipgoods () {
      this.$http.get('/getVipGoods', { type: 'limit' }).then(res => {
        this.vipGood = res.data
      })
    },
    showMore () {
      wx.navigateTo({
        url: `../member/main`
      })
    },
    toggle (index) {
      wx.navigateTo({
        url: `../privileges/main?curIndex=${index}`
      })
    },
    toggleVipModal () {
      this.$refs.vipModal.toggle()
    },
    interPopup () {
      this.$refs.integPopup.toggle()
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
  mounted () {
    this.getVipgoods()
  },
  onPullDownRefresh () {
    this.getUserData()
  },
  onShow () {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      this.getUserData()
    }
  }
}
</script>
<style lang="less" scope>
@import "./style.less";
</style>

