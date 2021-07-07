<template>
  <div class="search">
    <div class="search-wrp" @click="toSearchPage">
      <img src="https://img.icaixiaochu.com/search-icon.png" alt />
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    toSearchPage () {
      wx.navigateTo({
        url: `../search/main`
      })
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.search {
  height: 30px;
  width: 100%;
  padding: 10px 0;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f3f3f3;
  z-index: 2;
  background: #fff;
  .search-wrp {
    margin: 0 16px;
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 4px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    span {
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      color: rgba(0, 0, 0, 0.5s);
    }
  }
}
</style>
