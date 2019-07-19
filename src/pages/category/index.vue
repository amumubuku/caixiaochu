<template>
  <div class="category">
    <searchnav :text="keyWords" />
    <div class="category-wrp">
      <div
        class="item"
        v-for="(item, index) in caregorys"
        :key="index"
        @click="navToskudetail(item)"
      >
        <div class="category-flex-left">
          <text class="category-text">{{item.title}}</text>
          <text class="category-des">{{item.description}}</text>
        </div>
        <img :src="item.image" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setTabBarBadge } from '@/utils'
import searchnav from '@/components/searchnav'

export default {
  components: {
    searchnav
  },
  data () {
    return {
      caregorys: [],
      keyWords: '请输入关键字'
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartInfos'])
  },
  onShow () {
    if (this.cartInfos.num >= 1) {
      setTabBarBadge(`${this.cartInfos.num}`)
    } else {
      wx.removeTabBarBadge({
        index: 3
      })
    }
  },
  methods: {
    getCategorys () {
      this.$http.get('/getCategory').then(res => {
        this.caregorys = res.data
      })
    },
    navToskudetail (item) {
      var caregoryId = item.id
      wx.navigateTo({
        url: `../categorydata/main?id=${caregoryId}`
      })
    }
  },
  mounted () {
    this.getCategorys()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '分类',
      path: 'pages/category/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

