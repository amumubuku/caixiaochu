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
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (!res.hasUpdate) return
        console.info('检测到版本更新....')
      })

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
        console.error('新版本下载失败')
      })
    }
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
    wx.getSystemInfo({
      success: result => {
        if (result.model.search('iPhone X') != -1) {
          wx.setStorageSync('isIPX', true)
        }
        wx.setStorageSync('model', result.model)
      },
      fail: () => {},
      complete: () => {}
    })

    this.$http.post('/getNotice').then(res => {
      if (res.data.is_show) {
        wx.showModal({
          title: '',
          content: res.data.notice_str,
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#FEA835',
          success: result => {},
          fail: () => {},
          complete: () => {}
        })
      }
    })
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
