<template>
  <div class="vip">
    <div class="vip-wrp">
      <div class="vip-info">
        <div class="vip-header">
          <div class="vip-icon">
            <div class="login-btn" v-if="!user">
              <button
                class="login"
                type="primary"
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                lang="zh_CN"
              >登录</button>
            </div>

            <div class="user-icon" v-if="user">
              <img :src="user.avatar_url" alt class="vip-icon">
            </div>
          </div>
          <div class="vip-info-box" v-if="user">
            <div class="vip-content">
              <span class="vip-name" v-if="user">{{user.nick_name}}</span>
              <span class="member-user" v-if="user.is_vip">优享会员</span>
              <span class="or-user" v-if="!user.is_vip">普通用户</span>
            </div>
            <p v-if="user.is_vip">{{user.vip_end_time}}会员到期</p>
            <p v-if="!user.is_vip">还需消费{{100 - user.money_at}}元可成为会员</p>
          </div>
        </div>
        <div class="content-wrp">
          <div class="content">
            <div class="flex-left">
              <div class="icon">
                <img src="http://p2.icaixiaochu.com/vip.png" alt>
              </div>
              <div class="text">
                <img src="http://p2.icaixiaochu.com/kgfnJevFOddGq8Mu.png" alt>
              </div>
            </div>
            <div class="flex-right" @click="showVippopup">
              <p>优享会员说明</p>
              <div class="icon">
                <img src="http://p2.icaixiaochu.com/doubt1.png" alt class="doubt" mode="aspectFill">
              </div>
            </div>
          </div>
          <div class="vip-welfare">
            <div class="welfare-top">
              <div class="welfare-top-row">
                <p v-if="user.is_vip">
                  会员期间为您节省
                  <span style="color:#FF6304">{{user.money_save}}</span> 元
                </p>
                <p v-if="!user.is_vip">成为优享会员，享受会员特权</p>
              </div>
              <img src="http://p2.icaixiaochu.com/more.png" alt>
            </div>
            <div class="welfare-list">
              <div class="welfate-item" @click="toggle(0)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/pg31a0h84k66x5rq.png" alt mode="scaleToFill">
                </div>
                <span class="text">会员专享价</span>
              </div>
              <div class="welfate-item" @click="toggle(1)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/0x8v901gtbqjs08t.png" alt>
                </div>
                <span class="text">优享会员日</span>
              </div>
              <div class="welfate-item" @click="toggle(2)">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/bv0oky5pw0ht4t0f.png" alt>
                </div>
                <span class="text">积分加倍</span>
              </div>
              <div class="welfate-item">
                <div class="item-icon">
                  <img src="http://p2.icaixiaochu.com/lhv7tdc1058dx3ta.png" alt>
                </div>
                <span class="text">期待更多</span>
              </div>
            </div>
          </div>
          <div class="welfare-but">
            <div class="welfare-left">
              <p>查看积分情况</p>
            </div>
            <div class="welfare-right" @click="interPopup">
              <img src="http://p2.icaixiaochu.com/more.png" alt class="icon">
            </div>
          </div>
        </div>
      </div>
      <div class="vip-content">
        <div class="head">
          <div class="title">
            <img src="http://p2.icaixiaochu.com/tg0imhdrs23x4uda.png"  mode="aspectFit" alt >
          </div>
          <p>省时省力</p>
        </div>
        <goodlist :goods="vipGood"/>
      </div>
      <div class="vip-more" @click="showMore">
        <p>查看更多</p>
        <img src="http://p2.icaixiaochu.com/more.png" alt>
      </div>
      <div class="card-wrp">
        <div class="card-item">
          <div class="head">
            <div class="title">
              <img src="http://p2.icaixiaochu.com/vip-icon23.png" mode="aspectFit" alt >
            </div>
            <p>专属购物节</p>
          </div>
          <div class="card-content">
            <img src="http://p2.icaixiaochu.com/vip-pic2.png" mode="aspectFit" alt>
          </div>
        </div>
        <div class="card-item">
          <div class="head">
            <div class="title">
              <img src="http://p2.icaixiaochu.com/vip-icon22.png" style="width:78px;" mode="aspectFit" alt>
             
            </div>
            <p>轻松兑商品</p>
          </div>
          <div class="card-content">
            <img src="http://p2.icaixiaochu.com/vip-pic1.png" mode="aspectFit" alt >
          </div>
        </div>
      </div>
    </div>
    <popup ref="vipPopup" type="center">
      <div class="bg-cred">
        <img src="http://p2.icaixiaochu.com/hongbao.png" alt>
      </div>
      <div class="vip-popup">
        <div class="bg">
          <img src="http://p2.icaixiaochu.com/huiyuanshuoming.png" alt>
        </div>
        <h3>关于有效期：</h3>
        <p>
          消费满100元以后即可成为优享会员，满足条件
          后次日起开始计算，3个月为一个周期清算。
        </p>
      </div>
    </popup>
    <popup ref="integPopup" type="center" >
      <div class="coupon-price">
        <div class="top">
          <p>自你{{user.vip_start_time}}成为会员</p>
          <div class="bg">
            <img src="http://p2.icaixiaochu.com/huiyuanshuoming.png" alt mode="aspectFit">
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
    ...mapGetters(['user', 'cartInfos'])
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
    showVippopup () {
      this.$refs.vipPopup.toggle('show')
    },
    interPopup () {
      if (this.user.is_vip) {
        this.$refs.integPopup.toggle('show')
        return
      }
      wx.showToast({
        title: '你还不是会员',
        icon: 'none',
        duration: 2000
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
  mounted () {
    this.getVipgoods()
    this.vipStart = this.user.vip_start_time.split('-')
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

