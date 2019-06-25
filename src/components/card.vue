<template>
  <div class="item">
    <div class="card">
      <!-- banner图片 -->
      <div class="img_wrap">
        <image class="item_image" :src="data.coverImg"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.item{
  height: 890rpx;
  position: relative;
  .card{
    position: absolute;
    width: 625rpx;
    height: 811rpx;
    background: #fff;
    border-radius: 7rpx;
  }
}

/* 当前 swiper-item*/
.active_item .card{
  opacity: 1;
}
/* banner */
.img_wrap{
  position: relative;
  /* 图片 */
  .item_image{
    display: block;
    width: 100%;
    height: 156px;
    border-radius: 12rpx;
    z-index: 5;
    opacity: 0.7;
  }
}

/* 标题出处 */
.title_wrap{
  width: 560rpx;
  height: 100rpx;
  margin: 0 auto;
  // padding-left: 130rpx;
  box-sizing: border-box;
  color: #b99c6d;
  border-bottom: 2rpx dotted #e4dcce;
  .title{
    position: relative;
    font-size: 30rpx;
    line-height: 35rpx;
    height: 70rpx;
    padding-top: 30rpx;
    overflow: hidden;
  }
}
// 描述
.desc{
  width: 554rpx;
  height: 140rpx;
  margin: 0 auto;
  color:#666666;
  font-size: 24rpx;
  line-height: 28rpx;
  overflow: hidden;
  margin-top: 21rpx;
  text-align: justify;
}
</style>
