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
                <div class="user-icon" v-if="user">
                  <img :src="user.avatar_url" alt class="vip-icon" />
                </div>
              </div>
              <div class="vip-info-box">
                <div class="vip-content" v-if="user">
                  <span class="vip-name" v-if="user">{{user.nick_name}}</span>
                  <span class="member-user" v-if="user.is_vip">优享会员</span>
                  <span class="or-user" v-if="!user.is_vip">普通用户</span>
                </div>
                <p v-else>未登录</p>
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
              :style="{transform: 'translate3d('+ (progressBar) + 'px, -11px, 0px)'}"
            >
              <P>{{~~(user.money_at > 300? '300+': user.money_at)}}</P>
              <div class="tag"></div>
            </div>
            <div class="vip-progress-wrp">
              <div class="progress-bar" :style="{width:progressWidth + 'px'}"></div>
              <div class="progress-end-msg"></div>
            </div>

            <div class="vip-state-msg">
              <div class="msg-flex-left">
                <p v-if="user.is_vip">{{user.vip_end_time}}会员到期</p>
                <p v-else>还需消费{{!user.is_vip ?(~~user.vip_price_at - user.money_at):300}}元可成为会员</p>
              </div>
              <div class="msg-flex-right">
                <span>{{user.vip_price_at}}</span>
                <p>优享会员</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vip-info">
        <div class="content-wrp">
          <div class="vip-welfare">
            <div class="welfare-top">
              <div class="vip-row-left">
                <p>小厨VIP特权</p>
                <div class="tag-icon"></div>
              </div>
              <div class="vip-row-right">
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
              src="https://img.icaixiaochu.com/2.0%E4%BC%9A%E5%91%98%20%E2%80%93%204@3x@2x.png"
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
            <img src="https://img.icaixiaochu.com/%E5%8F%8C%E5%80%8D%E7%A7%AF%E5%88%86@2x.png" alt />
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
    <popup ref="integPopup" type="center">
      <div class="coupon-price">
        <div class="top">
          <p>自你{{user.vip_start_time}}成为会员</p>
          <div class="bg">
            <img src="http://p2.icaixiaochu.com/huiyuanshuoming.png" alt mode="aspectFit" />
          </div>
          <p class="my-coupon-price">¥{{user.money_save}}</p>
        </div>
        <div class="footer">
          <div class="footer-left">
            <p>会员专享价</p>
            <p style="color:rgba(130,96,8,.5);font-size:12px;">大量商品享低价</p>
          </div>
          <div class="footer-right">¥{{user.money_save}}</div>
        </div>
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
      return percent > 1 ? 315 - (38 + 7) : percent * 315 - 7
    },
    progressWidth () {
      console.log(!this.user)
      if (!this.user) return 0
      let percent = this.user.money_at / this.user.vip_price_at
      return percent > 1 ? 315 : percent * 315
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

