<template>
  <div class="skulist">
    <searchnav :text="keyWords"/>
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
        <skulist :goods="skuitem" v-if="skuitem.length>=1"/>
           <div class="goods-null" v-else>
          <img src="https://img.icaixiaochu.com/1@2x%20%281%29.png" alt>
          <p>暂无商品发布</p>
        </div>
      </div>
      <div class="card-icon" @click="toShop">
        <img src="http://img.icaixiaochu.com/cardIcon.png" alt>
        <div class="num-wrp" v-if="cartInfos.num !=0">{{cartInfos.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import searchnav from '@/components/searchnav'
import skulist from '@/components/skulist'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: [],
      currentId: '',
      navList: [],
      keyWords: '请输入关键字',
      skuitem: [],
      parent_id: 1
    }
  },
  components: {
    searchnav,
    skulist
  },
  computed: {
    ...mapGetters(['cartInfos'])
  },
  methods: {
    getCatalogList () {
      this.$http
        .get('/getChildrenCategory', {
          parent_id: this.parent_id
        })
        .then(res => {
          this.navList = res.data
          this.currentId = res.data[0].id
          this.getCurrentSku(res.data[0].id)
        })
    },
    navtodetail (item) {
      console.log(item)
      // var goodsId = item.good_id
      // wx.navigateTo({
      //   url: `../goods/main?id=${goodsId}`
      // })
    },
    switchCate (item) {
      var currentID = item.id
      if (this.currentId === currentID) {
        return false
      }
      this.getCurrentSku(currentID)
      this.currentId = item.id
    },
    getCurrentSku (id) {
      this.$http
        .get('/getCategoryGoods', {
          category_id: id
        })
        .then(res => {
          this.skuitem = res.data
        })
    },
    toShop () {
      wx.switchTab({
        url: '../shop/main'
      })
    }
  },
  mounted () {
    this.skuitem = []
    this.navList = []
    this.parent_id = this.$root.$mp.query.id
    this.getCatalogList()
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>
