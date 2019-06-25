<template>
  <div class="search">
    <div class="search-wrp" @click="toSearchPage">
      <img src="http://p2.icaixiaochu.com/search.png" alt>
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
    navtodetail (item) {
      // 商品详情页跳
      console.log(item)
    },
    toSearchPage () {
      // 跳转到搜索页面
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.search {
  height: 30px;
  width: 100%;
  padding: 12px 0;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #F3F3F3;
  z-index: 2;
  background: #fff;
  .search-wrp {
    margin: 0 16px;
    background: rgba(238, 238, 238, 1);
    border-radius: 18px;
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 7px;
    img {
      width: 17px;
      height: 17px;
    }
    span {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 17px;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>
