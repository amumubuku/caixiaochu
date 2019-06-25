<template>
  <form report-submit @submit="uploadFormId">
    <button form-type="submit">
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    async uploadFormId (e) {
      if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
        let formId = e.target.formId
        if (formId === 'the formId is a mock one') {
          return false
        }
        this.$http
          .post('/collectForm', {
            formid: formId
          })
          .then(res => {
            if (res.status) {
              console.log('收集用户formid成功' + new Date().getTime())
            }
          })
      }
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
button {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
}
button::after {
  border: none;
}
</style>
