<template>
  <div class="member">
         <navigation-bar :title="'会员专区'"
            :navBackgroundColor="'#fff'"
            :titleColor="'#000'"
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
      <banner :banner="banner"/>
      <div class="member-wrp">
      <recommend :goods="goods"/>
      </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import recommend from '@/components/recommend'
import navigationBar from '@/components/navigationBar.vue'
export default {
  data () {
    return {
      goods: [],
      banner: []
    }
  },
  components: {
    banner,
    recommend,
    navigationBar
  },
  methods: {
    getVipgoods () {
      this.$http.get('/getVipGoods').then(res => {
        this.goods = res.data
      })
    },
    getBnaner () {
      this.$http.get('getSlideShow').then(res => {
        this.banner = res.data
      })
    }
  },
  mounted () {
    this.getVipgoods()
    this.getBnaner()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '会员专区',
      path: 'pages/member/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import './style.less';

</style>

