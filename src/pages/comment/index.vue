<template>
  <div class="comment">
    <div class="comment-content">
      <p class="text">本次订单已完成</p>
      <p class="order-leva">请为该笔订单打分</p>
      <div class="comments-level">
        <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
        <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
        <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
        <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
        <img src="https://img.icaixiaochu.com/%E6%98%9F_%E5%AE%9E@2x.png" alt />
      </div>
      <div class="centent" v-if="!isSuccess">
        <textarea
          placeholder="写下您对这笔交易的评价吧~"
          auto-focus
          fixed="true"
          v-model="text"
          class="text"
          maxlength="5000"
        />
      </div>
    </div>
    <div class="comment-imgs">
      <p>相关截图（选填）</p>
    </div>
    <div class="submit">提交</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},

  mounted () {}
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

