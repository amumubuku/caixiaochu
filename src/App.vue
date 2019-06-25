<script>
import { mapActions, mapGetters } from 'vuex'
import util from '@/utils/util'
import user from '@/services/user'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    if (!wx.getStorageSync('userInfo') && !wx.getStorageSync('token')) {
      util.getUserInfo().then(res => {
        user.loginByWeixin(res.iv, res.encryptedData).then(res => {
          if (res.user) {
            this.setUser(res.user)
            wx.navigateBack({ changed: true })
          }
        })
      })
    } else {
      this.InfoCart()
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartInfos'])
  },
  methods: {
    ...mapActions(['setUser', 'InfoCart'])
  }
}
</script>

<style>
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page {
  background-color: #fff;
  font-family: PingFang SC;
}
button {
  background-color: #fff;
}
button::after {
  border: none;
}

</style>
