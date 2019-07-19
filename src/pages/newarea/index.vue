<template>
  <div class="newarea">
     <navigation-bar :title="'新品推荐'"
            :navBackgroundColor="'#fff'"
            :titleColor="'#000'"
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
    <banner :banner="banner"/>
    <div class="newarea-wrp">
      <goodlist :goods="goods"/>
    </div>
    <div class="null-coupon-wrp" v-if="!goods.length>=1">
      <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt>
      <p>商品筹备中,敬请期待</p>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import goodlist from '@/components/goodlist'
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
    goodlist,
    navigationBar
  },
  methods: {
    getMember () {
      this.$http.get('/getNewGoods').then(res => {
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
    this.getMember()
    this.getBnaner()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '新品推荐',
      path: 'pages/newarea/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

