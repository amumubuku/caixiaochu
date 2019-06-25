<template>
  <div class="login">
    <img src="http://p2.icaixiaochu.com/maxlogo.png" alt="">
     <button class="login-btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN">微信用户一键登录</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import user from '@/services/user'
export default {
  data () {
    return {
      coupons: []
    }
  },
  methods: {
    getUserInfo (e) {
      if (e.mp.detail.userInfo) {
        let { encryptedData, iv } = e.mp.detail
        user.loginByWeixin(iv, encryptedData).then(res => {
          if (res.user) {
            this.setUser(res.user)
            wx.navigateBack({ changed: true })
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
    ...mapActions(['setUser'])
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

