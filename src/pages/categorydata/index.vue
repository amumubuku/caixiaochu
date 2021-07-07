<template>
  <div class="skulist">
    <searchnav :text="keyWords" />
    <div class="skulist-wrp">
      <scroll-view class="category-list" scroll-y="true" style="height:100%;">
        <div
          :class="currentId == item.id ? 'active category-item' : 'category-item'"
          v-for="(item, index) of navList"
          :key="index"
          @click="switchCate(item)"
        >
          <div class="category-item-flag" v-if="currentId == item.id"></div>
          <p>{{item.title}}</p>
        </div>
      </scroll-view>
      <div class="goood-container">
        <category-list :goods="categoryListData" v-if="categoryListData.length>=1 && loading"></category-list>
        <div class="goods-null"  v-else>
          <img src="https://img.icaixiaochu.com/1@2x.png" mode="aspectFit" alt />
          <p>商品筹备中</p>
        </div>
      </div>
      <div class="card-icon" @click="toShop">
        <img src="http://img.icaixiaochu.com/cardIcon.png" alt />
        <div class="num-wrp" v-if="cartInfos.num !=0">{{cartInfos.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import searchnav from '@/components/searchnav'
import CategoryList from '@/components/categorylist'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: [],
      currentId: '',
      navList: [],
      keyWords: '搜索商品',
      categoryListData: [],
      parent_id: 1,
      loading: false
    }
  },
  components: {
    searchnav,
    CategoryList
  },
  computed: {
    ...mapGetters(['cartInfos'])
  },
  onUnload () {
    this.categoryListData = []
  },
  methods: {
    getCatalogList () {
      this.$http
        .get('/getChildrenCategory', {
          parent_id: this.parent_id
        })
        .then(res => {
          this.navList = res.data
          if (res.data < 1) return false
          this.currentId = this.currentId || res.data[0].id
          this.getCurGoodData()
        })
    },
    switchCate (item) {
      if (this.currentId === item.id) {
        return false
      }
      this.currentId = item.id
      this.getCurGoodData()
    },
    getCurGoodData (id) {
      this.$http
        .get('/getCategoryGoods', {
          category_id: this.currentId
        })
        .then(res => {
          this.categoryListData = res.data
          this.loading = true
        })
    },
    toShop () {
      wx.switchTab({
        url: '../cart/main'
      })
    }
  },
  mounted () {
    this.skuitem = []
    this.navList = []
    this.parent_id = this.$root.$mp.query.id
    this.currentId = this.$root.$mp.query.currentId || ''
    this.getCatalogList()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '新品推荐',
      path: `pages/categorydata/main?id=${this.parent_id}&currentId=${this.currentId}`
    }
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>
