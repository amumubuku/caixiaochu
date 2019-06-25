<template>
  <div class="newarea">
    <banner :banner="banner"/>
    <div class="newarea-wrp">
      <recommend :goods="goodlist"/>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils'
import banner from '@/components/banner'
import recommend from '@/components/recommend'
export default {
  data () {
    return {
      goodlist: [],
      banner: []
    }
  },
  components: {
    banner,
    recommend
  },
  methods: {
    getMember () {
      this.$http.get('/getNewGoods').then(res => {
        this.goodlist = res.data
      })
    }
  },
  mounted () {
    var _this = this
    this.getMember()
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'http://47.107.106.66:9527/login', // 仅为示例，并非真实的接口地址
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              _this.openid = res.data.openid
            }
          })
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>

