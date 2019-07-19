<template>
  <div class="brand">
    <div class="brand-container">
      <div class="brand-item">
          <img src="http://p2.icaixiaochu.com/enter.png" alt="" class="icon">
          <p>新鲜食材</p>
      </div>
      <div class="brand-item">
          <img src="http://p2.icaixiaochu.com/enter.png" alt="" class="icon">
          <p>10:00-21:00</p>
      </div>
      <div class="brand-item">
          <img src="http://p2.icaixiaochu.com/enter.png" alt="" class="icon">
          <p>3km范围配送</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      'default': []
    }
  }
}
</script>
<style lang="less" scoped>
 .brand {
     height: 44px;
     width: 100%;
     background-color: #fff;
     .brand-container {
        width: 93%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
        .brand-item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            .icon {
              width: 22px;
              height: 22px;
            }
            p {
                font-size: 13px;
                color:rgba(112,112,112,1);
                font-weight:400;
                line-height: 24px;
            }
        }
     }
 }
</style>
