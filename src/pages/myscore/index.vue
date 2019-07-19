<template>
  <div class="score">
    <div class="score-head">
      <div class="score-left">
        <div class="score-user">
          <div class="user-icon">
            <img :src="user.avatar_url" alt>
          </div>
          <i>{{user.nick_name}}</i>
        </div>
        <div class="score-num">我的积分：{{user.points || 0}}积分</div>
      </div>
      <div class="score-right">
        <div class="medal">
          <img src="http://p2.icaixiaochu.com/4jcDjmhG95pNHqya3oNg.png" alt>
        </div>
      </div>
    </div>
    <div class="score-list" v-if="goods.length>=1">
      <sub-title :info="{'title': '积分兑换','sec': '收藏控福利'}"></sub-title>
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
    <div class="score-null" v-if="!goods.length>=1">
      <img src="https://img.icaixiaochu.com/ahFMbSbGw3kp9san.png" alt>
      <p>暂无可兑换商品</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import subTitle from '@/components/sub-title'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  components: { subTitle },
  data () {
    return {
      goods: []
    }
  },
  methods: {
    fetchPointsGoods () {
      this.$http.post('/fetchPointsGoods').then(res => {
        this.goods = res.data
      })
    }
  },
  mounted () {
    this.fetchPointsGoods()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '我的积分',
      path: 'pages/myscore/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

