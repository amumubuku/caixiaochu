<template>
  <div class="member">
      <banner :banner="banner"/>
      <div class="member-wrp">
      <goodlist :goods="goods"/>
      </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import goodlist from '@/components/goodlist'
export default {
  data () {
    return {
      goods: [],
      banner: []
    }
  },
  components: {
    banner,
    goodlist
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
  }
}
</script>
<style lang="less" scoped>
@import './style.less';

</style>

