<template>
  <div class="feedback">
    <div class="centent" v-if="!isSuccess">
      <textarea
        placeholder="请输入您的宝贵意见，我们将为您不断改进"
        auto-focus
        fixed="true"
        v-model="text"
        class="text"
        maxlength="5000"
      />
    </div>

    <div class="isSuccess" v-if="isSuccess">
      <img src="https://img.icaixiaochu.com/G84XO8i0zMcZvyt5.png" alt>
      <p>意见反馈成功</p>
    </div>
    <form @submit="submit" report-submit="true">
      <div class="btn">
        <p class="submit" @click="submit">{{submitText}}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      isSuccess: false,
      submitText: '提交'
    }
  },
  methods: {
    submit () {
      if (this.isSuccess) {
        wx.navigateBack({ changed: true })
        return
      }

      if (this.text === '') {
        wx.showModal({
          content: '你还未输入意见',
          showCancel: false,
          confirmColor: '#FEA835'
        })
        return
      }
      this.$http.post('submitOpinion', { content: this.text }).then(res => {
        if (res.status === 1) {
          this.isSuccess = true
          this.submitText = '完成'
          this.text = ''
        } else {
          wx.showModal({
            content: res.info,
            showCancel: false,
            confirmColor: '#FEA835'
          })
        }
      })
    }
  },
  mounted () {
    console.log(this.$data)
    this.$data = {
      text: '',
      isSuccess: false,
      submitText: '提交'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

