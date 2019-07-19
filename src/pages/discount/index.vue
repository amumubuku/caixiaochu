<template>
  <div class="discount">
        <navigation-bar :title="'9.9元专区'"
            :navBackgroundColor="'#fff'"
            :titleColor="'#000'"
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
    <banner :banner="bannerData" />
    <div class="discount-wrp">
      <goodlist :goods="goods" />
    </div>
    <div class="null-coupon-wrp" v-if="goods.length<1">
      <img src="https://img.icaixiaochu.com/3CdMibRjn1kKjMMA.png" alt />
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
      bannerData: []
    }
  },
  components: {
    banner,
    goodlist,
    navigationBar
  },
  methods: {
    getNewGoods () {
      this.$http.get('/getRecommendGoods').then(res => {
        this.goods = res.data
      })
      this.$http.get('getSlideShow').then(res => {
        this.bannerData = res.data
      })
    }
  },
  mounted () {
    this.getNewGoods()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '9.9元专区',
      path: 'pages/discount/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

