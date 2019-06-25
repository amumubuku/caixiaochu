<template>
 <div class="head">
    <div class="title">{{info.title}}</div>
    <p>{{info.sec}}</p>
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
    info: {
      type: Object,
      default: {
        title: '菜小厨',
        sec: '乐享生活'
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.head {
  display: flex;
  padding-left: 16px;
  align-items: center;
  padding-bottom: 18px;
  .title {
    font-size: 19px;
    font-weight: bold;
    line-height: 26px;
    color: rgba(64, 64, 64, 0.87);
    padding-right: 5px;
  }

  p {
    font-size: 13px;
    font-weight: 500;
    line-height: 12px;
    color: rgba(64, 64, 64, 0.49);
    padding-left: 5px;
    border-left: 1px solid #707070;
  }
}
</style>
