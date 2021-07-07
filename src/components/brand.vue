<template>
  <div class="brand">
    <div class="brand-container">
      <div class="brand-item">
        <img src="https://img.icaixiaochu.com/home-icon2.png" alt class="icon" />
        <p>新鲜食材</p>
      </div>
      <div class="brand-item">
        <img src="https://img.icaixiaochu.com/home-icon1.png" alt class="icon" />
        <p>便捷切配</p>
      </div>
      <div class="brand-item">
        <img src="https://img.icaixiaochu.com/home-icon.png" alt class="icon" />
        <p>3km配送</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
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
    padding: 0 28px;
    box-sizing: border-box;
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
        width: 12px;
        height: 12px;
        margin-right: 3px;
      }
      p {
        font-size: 11px;
        font-weight: 500;
        line-height: 16px;
        color: rgba(248, 117, 95);
      }
    }
  }
}
</style>
