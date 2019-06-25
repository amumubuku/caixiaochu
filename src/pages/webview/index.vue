<template>
  <div class="webview">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = this.$root.$mp.query.url || 'https://www.baidu.com'
  },
  methods: {}
}
</script>
<style lang="less">
</style>
