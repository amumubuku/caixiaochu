<template>
  <div class="score">
    <div class="score-head">
      <div class="score-left">
        <div class="score-user">
          <div class="user-icon">
             <img :src="user.avatar_url" alt="">
          </div>
          <i>{{user.nick_name}}</i>
        </div>
        <div class="score-num">我的积分：{{user.points || 0}}积分</div>
      </div>
      <div class="score-right">
        <div class="medal">
          <img src="http://p2.icaixiaochu.com/4jcDjmhG95pNHqya3oNg.png" alt="">
        </div>
      </div>
    </div>
    <div class="score-content">
      <div class="score-shop-list">
        <div class="shop-top">
          <div class="shop-item-1">
            <div class="shop-cover"></div>
            <div class="shop-wrp">
              <div class="title">菜小厨帆布袋</div>
              <div class="info">
                <div class="price">222</div>
                <div class="score-">积分</div>
              </div>
            </div>
          </div>
          <div class="shop-item-2">
            <div class="shop-cover"></div>
            <div class="shop-wrp">
              <div class="title">菜小厨帆布袋</div>
              <div class="info">
                <div class="price">222</div>
                <div class="score-">积分</div>
              </div>
            </div>
          </div>
        </div>
        <div class="shop-fot-list">
          <div class="shop-item">
            <div class="shop-cover"></div>
            <div class="shop-wrp">
              <div class="title">菜小厨帆布袋</div>
              <div class="info">
                <div class="price" style="color: #F52D3C">222</div>
                <div class="score">积分</div>
              </div>
            </div>
          </div>
          <div class="shop-item">
            <div class="shop-cover"></div>
            <div class="shop-wrp">
              <div class="title">菜小厨帆布袋</div>
              <div class="info">
                <div class="price" style="color: #F52D3C">222</div>
                <div class="score">积分</div>
              </div>
            </div>
          </div>
          <div class="shop-item">
            <div class="shop-cover"></div>
            <div class="shop-wrp">
              <div class="title">菜小厨帆布袋</div>
              <div class="info">
                <div class="price" style="color: #F52D3C">222</div>
                <div class="score">积分</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  components: {},
  data () {
    return {}
  },
  methods: {
    fetchPointsGoods () {
      this.$http.post('/fetchPointsGoods').then(res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
    this.fetchPointsGoods()
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

