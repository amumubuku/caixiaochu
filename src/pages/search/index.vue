<template>
  <div class="search">
    <div class="search-wrp">
      <div class="input-container">
        <div class="search-box">
          <img src="https://img.icaixiaochu.com/search-icon.png" alt class="search-icon">
          <input
            type="text"
            v-model="keyWords"
            :placeholder="text"
            confirm-type="search"
            @focus="empty"
            @confirm="search(keyWords)"
          >
          <div  @click="empty"
            v-if="keyWords"
            class="remove-icon extend">
            <img src="https://img.icaixiaochu.com/empty-icon.png" alt=""></div>
        </div>
      </div>
      <div class="search-contain" v-show="searchResult.length <= 0">
        <div class="search-history header" v-if="hitory.length >= 1">
          <text>历史搜索</text>
          <img src="http://p2.icaixiaochu.com/delete.png" alt @click="clearHistory">
        </div>
        <div class="content">
          <div class="hot-item" v-for="(item, index) in hitory" :key="index" @click="search(item)">
            {{item}}
          </div>
        </div>
        <div class="content"></div>
        <div class="search-hot header">
          <text>热门搜索</text>
        </div>
        <div class="content">
          <div
            class="hot-item"
            v-for="(item, index) in searchHot"
            :key="index"
            @click="search(item)"
          >{{item}}</div>
        </div>
      </div>
      <div class="search-result" v-show="searchResult.length >= 1">
        <scroll-view class="search-scroll" scroll-y="true">
          <goodlist :goods="searchResult"/>
        </scroll-view>
      </div>
      <div class="search-null" v-if="searchState">
        <scroll-view class="search-scroll" scroll-y="true">
          <div class="scroll-content">
            <img src="https://img.icaixiaochu.com/DCMMpzKdEogCSdeO.png" alt>
            <span>抱歉，没有找到相关商品</span>
            <span>您可以换个词试试</span>
            <div class="recommend-wrp">
              <recommend :goods="recommendGoods"/>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import recommend from '@/components/recommend'
import goodlist from '@/components/goodlist'
import { mapGetters, mapActions } from 'vuex'
import subTitle from '@/components/sub-title'
import { dobounce } from '../../utils/util'
export default {
  components: {
    recommend,
    subTitle,
    goodlist
  },
  computed: {
    ...mapGetters(['hitory'])
  },
  data () {
    return {
      text: '搜索商品',
      keyWords: '',
      searchHot: [],
      searchResult: [],
      recommendGoods: [],
      searchState: false
    }
  },
  methods: {
    empty () {
      this.searchState = false
      this.keyWords = ''
      this.searchResult = []
    },
    getsearchHot () {
      this.$http.get('/getSearchLog').then(res => {
        this.searchHot = res.data.hot_log
      })
    },

    clearHistory () {
      this.clearSearchHitory()
    },
    recommend () {
      this.$http.get('/fetchHotGoods').then(res => {
        this.recommendGoods = res.data
      })
    },
    search (item) {
      this.keyWords = item
      if (this.keyWords === '') {
        wx.showToast({
          title: '请输入关键字',
          icon: 'none',
          duration: 3000
        })
        return
      }
      this.$http
        .get('/keySearch', { content: this.keyWords, page: 1 })
        .then(res => {
          if (!res.data || res.data.length < 1) {
            this.searchState = true
            this.recommend()
          } else {
            this.searchState = false
            this.saveSearchHitory(this.keyWords)
            this.searchResult = res.data
          }
        })
    },

    ...mapActions([
      'saveSearchHitory',
      'clearSearchHitory',
      'deleteSearchHitory'
    ])
  },
  mounted () {
    this.getsearchHot()
    this.$watch(
      'keyWords',
      dobounce(newVal => {
        if (!newVal) return
        this.search(newVal)
      }, 500)
    )
  }
}
</script>
<style lang="less" scoped>
@import "./style";
</style>
